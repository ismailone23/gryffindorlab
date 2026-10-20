import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { availableTimes, bookingUrl } from "@/lib/calendly";

export const runtime = "nodejs";

// An instance-local cache prevents repeated public page views from hammering Calendly.
const cache = new Map<string, { expires: number; times: string[] }>();

export async function GET(request: Request) {
  const month = new URL(request.url).searchParams.get("month") || "";
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return Response.json({ error: "Invalid month." }, { status: 400 });

  const [year, index] = month.split("-").map(Number);
  const first = Date.UTC(year, index - 1, 1);
  const now = Date.now();
  const last = Date.UTC(year, index, 1);
  // Local month boundaries can differ from UTC by a day.
  if (last + 86400000 <= now || first - 86400000 > now + 90 * 86400000) {
    return Response.json({ error: "Choose a date within the next 90 days." }, { status: 400 });
  }

  const accessToken = process.env.CALENDLY_ACCESS_TOKEN || process.env.CALENDLY_API_KEY;
  if (!accessToken || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json({ error: "Live availability is not connected yet.", bookingUrl }, { status: 503 });
  }
  const cached = cache.get(month);
  if (cached && cached.expires > now) {
    // ponytail: filter aging slots on read; a one-minute cache needn't return past times.
    return Response.json({ times: cached.times.filter((time) => Date.parse(time) > now + 60_000) });
  }
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
    const key = createHmac("sha256", accessToken).update(ip).digest("hex");
    const limiter = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.fixedWindow(20, "1 h"), prefix: "gryffindorlab:availability" });
    const limit = await limiter.limit(key);
    if (limit.reason === "timeout") throw new Error("Limiter unavailable");
    if (!limit.success) return Response.json({ error: "Too many requests. Please try again later.", bookingUrl }, { status: 429 });
    // Include boundary days so visitors in any time zone see their local month correctly.
    const start = new Date(Math.max(now + 60_000, first - 86400000));
    const end = new Date(Math.min(last + 86400000, now + 91 * 86400000));
    const times = await availableTimes(start, end);
    cache.set(month, { times, expires: now + 60_000 });
    if (cache.size > 5) cache.delete(cache.keys().next().value!);
    return Response.json({ times: times.filter((time) => Date.parse(time) > Date.now() + 60_000) });
  } catch {
    return Response.json({ error: "Live availability is unavailable. Please book directly on Calendly.", bookingUrl }, { status: 503 });
  }
}
