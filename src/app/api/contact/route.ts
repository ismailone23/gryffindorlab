import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { services } from "@/lib/services";
import { isSameOrigin } from "@/lib/request-origin";
import { readLimitedBody } from "@/lib/read-limited-body";

export const runtime = "nodejs";

const allowedServices = new Set(["A bit of everything", ...services.map((service) => service.name)]);
const failure = { error: "We couldn’t send your idea. Please try again or email info@gryffindorlab.com." };

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Expected a JSON request." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > 8192) {
    return Response.json({ error: "Message is too long." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await readLimitedBody(request, 8192);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid form");
    body = parsed as Record<string, unknown>;
  } catch (error) {
    return error instanceof RangeError
      ? Response.json({ error: "Message is too long." }, { status: 413 })
      : Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  // Quietly accept bot submissions without emailing anyone.
  if (body.website) return new Response(null, { status: 204 });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service : "";
  const idea = typeof body.idea === "string" ? body.idea.trim() : "";
  if (
    name.length < 1 || name.length > 100 || /[\r\n]/.test(name) ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !allowedServices.has(service) || idea.length < 10 || idea.length > 2500
  ) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json(failure, { status: 503 });
  }

  try {
    // Trust forwarded IPs only behind a reverse proxy that overwrites this header.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || email.toLowerCase();
    const identifier = createHmac("sha256", apiKey).update(ip).digest("hex");
    // ponytail: these HTTP clients are cheap; add caching only if profiling warrants it.
    const redis = Redis.fromEnv();
    const limiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 h"), prefix: "gryffindorlab:contact:visitor" });
    const globalLimiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(100, "1 d"), prefix: "gryffindorlab:contact:all" });
    const perVisitor = await limiter.limit(identifier);
    if (perVisitor.reason === "timeout") throw new Error("Rate limit unavailable");
    if (!perVisitor.success) {
      return Response.json({ error: "Too many requests. Please try again later." }, {
        status: 429,
        headers: { "Retry-After": String(Math.max(1, Math.ceil((perVisitor.reset - Date.now()) / 1000))) },
      });
    }
    const overall = await globalLimiter.limit("all");
    if (overall.reason === "timeout") throw new Error("Rate limit unavailable");
    if (!overall.success) {
      return Response.json({ error: "The contact form is busy. Please try again later." }, {
        status: 429,
        headers: { "Retry-After": String(Math.max(1, Math.ceil((overall.reset - Date.now()) / 1000))) },
      });
    }
  } catch {
    // Fail closed rather than send unmetered email if the shared limiter is unavailable.
    return Response.json(failure, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [process.env.CONTACT_TO_EMAIL || "info@gryffindorlab.com"],
      replyTo: email,
      subject: `New project idea from ${name}`,
      text: `A new project idea for Gryffindorlab\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nThe idea:\n${idea}`,
    });
    if (error) return Response.json(failure, { status: 502 });
    return Response.json({ sent: true });
  } catch {
    return Response.json(failure, { status: 502 });
  }
}
