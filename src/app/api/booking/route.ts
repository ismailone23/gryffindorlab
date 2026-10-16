import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { availableTimes, bookingUrl, createBooking } from "@/lib/calendly";
import { bookingEmail } from "@/lib/booking-email";
import { isSameOrigin } from "@/lib/request-origin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ error: "Expected JSON." }, { status: 415 });
  if (Number(request.headers.get("content-length")) > 2048) return Response.json({ error: "Request is too long." }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 2048) throw new Error("Invalid payload");
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid payload");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Please check your details." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const timezone = typeof body.timezone === "string" ? body.timezone : "";
  const startTime = typeof body.startTime === "string" ? body.startTime : "";
  const start = new Date(startTime);
  const zones = Intl.supportedValuesOf("timeZone");
  if (name.length < 1 || name.length > 100 || /[\r\n]/.test(name) ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !["UTC", ...zones].includes(timezone) || !/^\d{4}-\d{2}-\d{2}T/.test(startTime) ||
    Number.isNaN(start.getTime()) || start.getTime() < Date.now() + 60_000 ||
    start.getTime() > Date.now() + 90 * 86400000) {
    return Response.json({ error: "Please check your details and choose another time." }, { status: 400 });
  }
  const accessToken = process.env.CALENDLY_ACCESS_TOKEN || process.env.CALENDLY_API_KEY;
  if (!accessToken || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json({ error: "Online booking is not configured yet. Please book on Calendly.", bookingUrl }, { status: 503 });
  }

  try {
    // The reverse proxy must overwrite x-forwarded-for; hash it before using it as a Redis key.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || email.toLowerCase();
    const key = createHmac("sha256", accessToken).update(ip).digest("hex");
    const limiter = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, "1 h"), prefix: "gryffindorlab:booking" });
    const limit = await limiter.limit(key);
    if (limit.reason === "timeout") throw new Error("Limiter unavailable");
    if (!limit.success) return Response.json({ error: "Too many attempts. Please try again later." }, { status: 429 });

    const checked = await availableTimes(new Date(start.getTime() - 1000), new Date(start.getTime() + 1000));
    if (!checked.includes(start.toISOString())) return Response.json({ error: "That time is no longer available. Please choose another." }, { status: 409 });
    const status = await createBooking(start.toISOString(), name, email, timezone);
    if (status === 200 || status === 201) {
      let confirmationSent = false;
      if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: [email],
            replyTo: "info@gryffindorlab.com",
            ...bookingEmail(name, start.toISOString(), timezone),
          });
          confirmationSent = !error;
        } catch { /* Booking has succeeded even if the extra email has not. */ }
      }
      return Response.json({ booked: true, confirmationSent });
    }
    if (status === 409 || status === 422) return Response.json({ error: "That time could not be booked. Please choose another." }, { status: 409 });
    console.warn("Calendly rejected the booking request", { status });
    if (status === 403) return Response.json({ error: "Booking failed. Please try Calendly directly.", bookingUrl }, { status: 502 });
    if (status === 401) return Response.json({ error: "Calendly booking access has expired. Please book directly on Calendly.", bookingUrl }, { status: 502 });
    if (status === 400) return Response.json({ error: "Calendly could not accept this event’s booking details. Please book directly on Calendly.", bookingUrl }, { status: 502 });
    return Response.json({ error: "Booking failed. Please try Calendly directly.", bookingUrl }, { status: 502 });
  } catch {
    return Response.json({ error: "Booking is temporarily unavailable. Please try Calendly directly.", bookingUrl }, { status: 503 });
  }
}
