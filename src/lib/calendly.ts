const api = "https://api.calendly.com";
export const bookingUrl = "https://calendly.com/gryffindorlab-info/30min";

type EventType = { uri: string; scheduling_url: string; active: boolean };
type Slot = { start_time: string; status: string };

let resolvedEvent: { token: string; uri: string } | undefined;

export function calendlyToken() {
  const value = process.env.CALENDLY_API_KEY;
  if (!value) throw new Error("Calendly is not configured");
  return value;
}

async function calendly(path: string, init?: RequestInit) {
  const response = await fetch(`${api}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${calendlyToken()}`, ...init?.headers },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Calendly request failed: ${response.status}`);
  return response.json();
}

export async function eventTypeUri() {
  const configured = process.env.CALENDLY_EVENT_TYPE_URI;
  if (configured) {
    if (!/^https:\/\/api\.calendly\.com\/event_types\/[\w-]+$/.test(configured)) throw new Error("Invalid event type URI");
    return configured;
  }

  const accessToken = calendlyToken();
  if (resolvedEvent?.token === accessToken) return resolvedEvent.uri;
  const user = await calendly("/users/me") as { resource: { uri: string } };
  let page: string | null = `/event_types?user=${encodeURIComponent(user.resource.uri)}&active=true&count=100`;
  while (page) {
    const result = await calendly(page) as { collection: EventType[]; pagination: { next_page: string | null } };
    const match = result.collection.find((event) => event.active && event.scheduling_url.replace(/\/$/, "") === bookingUrl);
    if (match) {
      resolvedEvent = { token: accessToken, uri: match.uri };
      return match.uri;
    }
    // Calendly supplies a full URL; only follow its own API host.
    const next: string | null = result.pagination.next_page;
    page = next && new URL(next).origin === api ? new URL(next).pathname + new URL(next).search : null;
  }
  throw new Error("The configured Calendly account does not own the booking event");
}

export async function availableTimes(start: Date, end: Date): Promise<string[]> {
  const uri = await eventTypeUri();
  const windows: Promise<string[]>[] = [];
  for (let cursor = start.getTime(); cursor < end.getTime(); cursor += 7 * 86400000) {
    const from = new Date(cursor).toISOString();
    const to = new Date(Math.min(cursor + 7 * 86400000, end.getTime())).toISOString();
    const params = new URLSearchParams({ event_type: uri, start_time: from, end_time: to });
    windows.push(calendly(`/event_type_available_times?${params}`)
      .then((result: { collection: Slot[] }) => result.collection
        .filter((slot) => slot.status === "available")
        .map((slot) => new Date(slot.start_time).toISOString())));
  }
  return [...new Set((await Promise.all(windows)).flat())].sort();
}

export async function createBooking(startTime: string, name: string, email: string, timezone: string) {
  const uri = await eventTypeUri();
  const { resource: event } = await calendly(new URL(uri).pathname) as {
    resource: { locations?: { kind: string }[]; pooling_type?: string | null };
  };
  const locations = event.locations || [];
  if (locations.length > 1 && event.pooling_type !== "round_robin") throw new Error("The event has multiple meeting locations");
  const kind = locations[0]?.kind;
  const supportedConferences = ["google_conference", "zoom_conference", "microsoft_teams_conference", "webex_conference", "gotomeeting_conference"];
  if (kind && !supportedConferences.includes(kind) && event.pooling_type !== "round_robin") {
    throw new Error("The event location needs selection on Calendly");
  }
  const response = await fetch(`${api}/invitees`, {
    method: "POST",
    headers: { Authorization: `Bearer ${calendlyToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: uri,
      start_time: startTime,
      invitee: { name, email, timezone },
      ...(kind && event.pooling_type !== "round_robin" ? { location: { kind } } : {}),
    }),
    cache: "no-store",
  });
  return response.status;
}
