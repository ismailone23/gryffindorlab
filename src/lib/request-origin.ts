export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const submitted = new URL(origin);
    if (submitted.origin !== origin || !["http:", "https:"].includes(submitted.protocol)) return false;
    if (submitted.origin === new URL(request.url).origin) return true;

    // Behind a proxy, request.url may use an internal address while Host stays public.
    const host = request.headers.get("host");
    // ponytail: the edge must overwrite forwarded protocol, just as it does forwarded IPs.
    const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || new URL(request.url).protocol.slice(0, -1);
    return !!host && submitted.host.toLowerCase() === host.toLowerCase() && submitted.protocol === `${protocol}:`;
  } catch {
    return false;
  }
}
