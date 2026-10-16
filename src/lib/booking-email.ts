function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function bookingEmail(name: string, startTime: string, timezone: string) {
  const when = new Intl.DateTimeFormat("en", { timeZone: timezone, weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(startTime));
  const safeName = escapeHtml(name);
  const safeWhen = escapeHtml(when);
  const safeZone = escapeHtml(timezone.replaceAll("_", " "));
  return {
    subject: "Your Gryffindorlab call is booked",
    text: `Hi ${name},\n\nYour 30-minute call with Gryffindorlab is booked for ${when} (${timezone}).\n\nWeb conferencing details will be provided by Calendly. We look forward to hearing what you're building.\n\nGryffindorlab\ninfo@gryffindorlab.com`,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f1eef5;font-family:Arial,sans-serif;color:#242127"><div style="max-width:600px;margin:0 auto;padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#0b0a0e;border-radius:12px"><tr><td style="padding:40px 36px 24px;color:#f1eef5"><p style="margin:0 0 52px;font-size:16px;font-weight:700">Gryffindorlab<span style="color:#aa8bf7">.</span></p><h1 style="margin:0;font-size:42px;line-height:1.08;letter-spacing:-.04em;font-weight:700">It’s on the calendar<span style="color:#aa8bf7">.</span></h1><p style="margin:20px 0 0;color:#c8c0d2;font-size:16px;line-height:1.65">Hi ${safeName}, we’re looking forward to hearing what you’re building.</p></td></tr><tr><td style="padding:0 36px 36px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #62586d;border-bottom:1px solid #62586d"><tr><td style="padding:22px 0 8px;color:#c8c0d2;font-size:12px;letter-spacing:.08em;text-transform:uppercase">Your call</td></tr><tr><td style="padding:0 0 14px;color:#f1eef5;font-size:20px;font-weight:700;line-height:1.4">${safeWhen}</td></tr><tr><td style="padding:0 0 22px;color:#c8c0d2;font-size:14px;line-height:1.6">30 minutes · ${safeZone}<br>Web conferencing details will be provided by Calendly.</td></tr></table><p style="margin:26px 0 0;color:#c8c0d2;font-size:14px;line-height:1.6">See you soon,<br><strong style="color:#f1eef5">Gryffindorlab</strong></p></td></tr></table><p style="margin:20px 0;color:#65616b;font-size:12px;line-height:1.6;text-align:center">Questions? Reply to this email or write to info@gryffindorlab.com.</p></div></body></html>`,
  };
}
