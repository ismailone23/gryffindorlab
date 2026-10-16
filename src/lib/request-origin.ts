export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const submitted = new URL(origin);
    if (submitted.origin !== origin || !["http:", "https:"].includes(submitted.protocol)) return false;
    if (submitted.origin === new URL(request.url).origin) return true;

    // Behind a proxy, request.url may use an internal address while Host stays public.
    const host = request.headers.get("host");
    return !!host && submitted.host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}
