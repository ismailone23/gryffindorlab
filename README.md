# Gryffindorlab

A responsive agency homepage for video editing, website development, and graphic design. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. The homepage is prerendered to HTML for search engines, with artwork and the dialog hydrated for interaction.

## Run

```sh
npm install
npm run dev
```

```sh
npm run build
npm run lint
```

## Hero interactions

- The borderless fixed header has section links to Services, Work, and Voices on desktop. At 1100px and below it shows only the brand and “Let’s talk.” It slips away on downward scroll, returns on upward scroll or keyboard focus, and adjusts each control's contrast to the surface behind it.
- On page load, the shared mark appears at the center of the hero, travels to the right-hand artwork, then expands to its full panel size. The header stays offscreen during this transition and drops in from above when the left-hand text begins to appear. The introduction is skipped for reduced motion and never blocks interaction.
- Nine-second “edit. build. design.” kinetic typography sequence, with pause/play and no caption below the artwork.
- One focused kinetic typography artwork. No tabs or secondary studies.
- Subtle pointer-responsive artwork and deliberate entrance transitions.
- The hero “Start now” action is one in-flow button that shrinks into the shared mark as its position nears the top edge, then travels to the bottom-right. On the way back it stays docked while scrolling, returns as a circle only when its original slot is fully visible, and expands in that slot. Reduced motion switches states without travel.
- Reduced-motion support, self-hosted fonts, and a responsive project-brief dialog.
- Project brief uses shadcn/ui Select for service selection; the navbar and favicon share the same SVG mark.

## Services

The service copy sits beside one large motion piece made from the same four geometric forms as the Gryffindorlab mark. The shapes retain their orange fill, with paper-colored dots inside that gently move away from a desktop pointer, then settle back; touch and reduced-motion visitors see still dots. The shape sequence plays when first seen and replays after leaving the viewport and scrolling down into it again—not when scrolling back up from below. Reduced-motion preferences skip the transition. All service copy remains visible without JavaScript. No portfolio pieces are shown until the agency supplies its real design work.

## Work previews

The full-viewport, endlessly moving work strip uses lazy-loaded copies of the shared logo in place of project imagery. It starts once 1% of its card row is visible, eases to a stop on hover or keyboard focus, pauses when offscreen or when the tab is hidden, and smoothly resumes; reduced-motion users can scroll it manually. Six distinct categories reflect the user's reference, not a list of verified services or completed projects. Every card links to a statically exported `/case-studies/[slug]/` placeholder page, marked `noindex` until real case studies are ready. Replace entries in `src/lib/work.ts` and the placeholder pages when actual projects can be published.

## Client voices

The staggered testimonial layout uses the site's warm-paper palette and consistent 5px corners. Its three slots and brand-geometry tile are intentionally marked pending. No reviews, ratings, client names, or portraits have been invented. Replace the slots and tile in `src/components/testimonials.tsx` when approved client quotes, attribution, and imagery are available.

## Closing contact

The final dark section presents the contact invitation without a decorative logo or glow. The section itself is the only black surface; no separate overlay covers the testimonials. The floating hero button yields to the section actions on entry. The header adapts to the surface beneath it. “Start a project” opens the existing Resend-backed form in a dark treatment here; other triggers keep its warm-paper treatment. “Book a call” opens a three-column black booking panel: event and selectable timezone, live Calendly dates, then available times and name/email confirmation. No iframe, nested border, or third-party cookie label is present. Calendly provides every real slot and accepts the booking through its server-side API. If API access is unavailable, the calendar shows an honest error and offers the direct Calendly link. Reduced-motion and no-JavaScript visitors retain that link.

### Calendly booking setup

The custom calendar needs a **Calendly Standard-or-higher plan** to create bookings. Add `CALENDLY_ACCESS_TOKEN` or `CALENDLY_API_KEY` (a Personal Access Token from the account that owns `https://calendly.com/gryffindorlab-info/30min`) to `.env.local` and to your deployment's server-side secrets. Grant the token `users:read` (to find the account), `event_types:read` (to find the event and its availability), and `scheduled_events:write` (to book invitees). Do **not** prefix it with `NEXT_PUBLIC_`, paste it into chat, or commit it. The server finds that event type from the account; `CALENDLY_EVENT_TYPE_URI` may be set to the matching `https://api.calendly.com/event_types/...` URI if automatic discovery is unavailable. Keep `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` configured for booking rate limits. For the additional branded confirmation email, configure the existing `RESEND_API_KEY` and verified `RESEND_FROM_EMAIL` as described below. Restart the server after setting secrets.

The calendar never invents availability. The server checks the selected slot again before creating a Calendly invitee, and sends the event type’s single supported conferencing location (for example, Google Meet) as required by Calendly. Events with multiple location choices or unsupported location requirements must use the direct Calendly link rather than guessing. It only reports success after Calendly accepts the booking; Resend is attempted afterward, so an email failure does not falsely report a booking failure. Meeting links and standard Calendly notifications remain controlled by the Calendly event settings. The direct Calendly link remains available if the API or Redis is unavailable. The email is **not** tested by creating a real booking during development.

## Contact setup

This site needs a Next.js server deployment (not a static `out/` export) for `POST /api/contact`. The shadcn/Tailwind project form sends a plain-text email to `info@gryffindorlab.com` via Resend, using the visitor's address as `replyTo`. It only shows success after Resend accepts the message. On failure, visitors get a retry message and a direct mailto fallback. No credentials go to the browser.

1. Verify `gryffindorlab.com` in Resend and configure its DNS records. Use a sender address on that verified domain.
2. Create a Resend API key and an Upstash Redis database. Copy `.env.example` to `.env.local`, fill in `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN`. `CONTACT_TO_EMAIL` defaults to `info@gryffindorlab.com` if omitted. Set the same server-side variables on the deployment platform; keep them out of git and do not prefix them with `NEXT_PUBLIC_`.
3. Restart the Next.js server. If Resend or Redis is unconfigured or Redis is unavailable, the endpoint fails closed instead of claiming delivery or sending unmetered emails.

The route validates content and origin, ignores a hidden honeypot field, and uses Redis-backed rate limits: **3 requests per visitor per hour**, plus **100 requests site-wide per day**. Configure your hosting edge to overwrite `x-forwarded-for` for IP-based limits and `x-forwarded-proto` for origin checks behind a TLS-terminating proxy. Review limits as real traffic arrives.

## Deployment and SEO

Deploy with a Node.js-compatible Next.js host so the contact API remains available; `npm run build` creates a Next.js server build, **not** a deployable static `out/` directory. The canonical homepage URL is `https://www.gryffindorlab.com/`. `src/app/sitemap.ts` lists only the published homepage, and `src/app/robots.ts` points to it while excluding the API. Placeholder case-study pages remain `noindex` and are intentionally absent from the sitemap. The homepage includes accurate title, description, Open Graph/Twitter image, and organization structured data. The site's main document hides its vertical scrollbar without disabling scrolling.

## Files

- `src/app/layout.tsx` — document, fonts, and metadata
- `src/app/page.tsx` — statically rendered homepage
- `src/App.tsx` — homepage composition and hero
- `src/components/site-header.tsx` — adaptive scroll-aware navigation
- `src/components/contact-finale.tsx` — closing contact and booking placement
- `src/components/booking-calendar.tsx` — shadcn-based booking calendar and confirmation form
- `src/app/api/booking/` — server-only Calendly availability, booking, and Resend confirmation
- `src/components/showcase.tsx` — the single kinetic typography artwork
- `src/components/morphing-cta.tsx` — hero-to-floating contact action
- `src/components/services.tsx` — service descriptions and the brand-geometry motion piece
- `src/components/work-slider.tsx` — moving category previews and links to placeholder case studies
- `src/components/testimonials.tsx` — pending testimonial layout without fabricated client claims
- `src/lib/work.ts` — preview categories and case-study slugs
- `src/app/case-studies/[slug]/page.tsx` — statically generated placeholder pages
- `src/components/project-brief.tsx` — project form and send/error feedback
- `src/app/api/contact/route.ts` — validated Resend submission and Redis rate limits
- `src/app/sitemap.ts`, `src/app/robots.ts` — crawl directives for the production domain
- `src/index.css` — shared tokens, browser defaults, and animation keyframes; component/layout styles live in Tailwind classes
- `src/components/ui/` — shadcn/ui primitives
- `PRODUCT.md`, `DESIGN.md` — product context and implemented design system

## Design source

Stitch project: https://stitch.withgoogle.com/projects/11404951037040707372

The studio-poster direction was approved by the user, then narrowed to the single kinetic typography artwork shown in the hero. Stitch informed the initial visual exploration; no generated image ships in the final hero. Typography is self-hosted through Fontsource. The approved direction and implementation evidence are recorded in `.impeccable/`.
