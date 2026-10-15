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

- Nine-second “edit. build. design.” kinetic typography sequence, with pause/play and no caption below the artwork.
- One focused kinetic typography artwork. No tabs or secondary studies.
- Subtle pointer-responsive artwork and deliberate entrance transitions.
- The hero “Start now” action shrinks into the shared mark once its original position scrolls out above the screen, then travels to the bottom-right; it reverses when that position returns. It remains the same dialog trigger throughout, and reduced motion switches states without travel.
- Reduced-motion support, self-hosted fonts, and a responsive project-brief dialog.
- Project brief uses shadcn/ui Select for service selection; the navbar and favicon share the same SVG mark.

## Services

The service copy sits beside one large motion piece made from the same four geometric forms as the Gryffindorlab mark. The shapes retain their violet fill, with paper-colored dots inside that gently move away from a desktop pointer, then settle back; touch and reduced-motion visitors see still dots. The shape sequence plays when first seen and replays after leaving the viewport and scrolling down into it again—not when scrolling back up from below. Reduced-motion preferences skip the transition. All service copy remains visible without JavaScript. No portfolio pieces are shown until the agency supplies its real design work.

## Work previews

The full-viewport, endlessly moving work strip uses lazy-loaded copies of the shared logo in place of project imagery. It starts once 1% of its card row is visible, eases to a stop on hover or keyboard focus, pauses when offscreen or when the tab is hidden, and smoothly resumes; reduced-motion users can scroll it manually. Six distinct categories reflect the user's reference, not a list of verified services or completed projects. Every card links to a statically exported `/case-studies/[slug]/` placeholder page, marked `noindex` until real case studies are ready. Replace entries in `src/lib/work.ts` and the placeholder pages when actual projects can be published.

## Client voices

The staggered testimonial layout uses the site's lilac-paper palette and consistent 5px corners. Its three slots and brand-geometry tile are intentionally marked pending. No reviews, ratings, client names, or portraits have been invented. Replace the slots and tile in `src/components/testimonials.tsx` when approved client quotes, attribution, and imagery are available.

## Contact setup

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_EMAIL` to the agency's real email address, then restart/rebuild. The form prepares an email in the visitor's email app. With no address configured, it downloads a text brief to the visitor's device and clearly states that nothing has been sent. The address is embedded in the client bundle; do not use a private address here.

## Deployment and SEO

`npm run build` writes a static site to `out/`; deploy that folder to any static host. Page title, description, and Open Graph text are supplied in `src/app/layout.tsx`. Add a canonical URL, sitemap, and social preview image once the production domain and image are known. No server-side API or form submission is required.

## Files

- `src/app/layout.tsx` — document, fonts, and metadata
- `src/app/page.tsx` — statically rendered homepage
- `src/App.tsx` — interactive header and hero
- `src/components/showcase.tsx` — the single kinetic typography artwork
- `src/components/morphing-cta.tsx` — hero-to-floating contact action
- `src/components/services.tsx` — service descriptions and the brand-geometry motion piece
- `src/components/work-slider.tsx` — moving category previews and links to placeholder case studies
- `src/components/testimonials.tsx` — pending testimonial layout without fabricated client claims
- `src/lib/work.ts` — preview categories and case-study slugs
- `src/app/case-studies/[slug]/page.tsx` — statically generated placeholder pages
- `src/components/project-brief.tsx` — project brief and email/download handoff
- `src/index.css` — shared tokens, browser defaults, and animation keyframes; component/layout styles live in Tailwind classes
- `src/components/ui/` — shadcn/ui primitives
- `PRODUCT.md`, `DESIGN.md` — product context and implemented design system

## Design source

Stitch project: https://stitch.withgoogle.com/projects/11404951037040707372

The studio-poster direction was approved by the user, then narrowed to the single kinetic typography artwork shown in the hero. Stitch informed the initial visual exploration; no generated image ships in the final hero. Typography is self-hosted through Fontsource. The approved direction and implementation evidence are recorded in `.impeccable/`.
