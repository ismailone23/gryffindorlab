# Gryffindorlab

A responsive agency hero for video editing, website development, and graphic design. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Run

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
npm run lint
```

## Hero interactions

- Nine-second “edit. build. design.” kinetic typography sequence, with pause/play and no caption below the artwork.
- One focused kinetic typography artwork. No tabs or secondary studies.
- Subtle pointer-responsive artwork and deliberate entrance transitions.
- Reduced-motion support, self-hosted fonts, and a responsive project-brief dialog.
- Project brief uses shadcn/ui Select for service selection; the navbar and favicon share the same SVG mark.

## Contact setup

Copy `.env.example` to `.env.local` and set `VITE_CONTACT_EMAIL` to the agency's real email address, then restart/rebuild. The form prepares an email in the visitor's email app. With no address configured, it downloads a text brief to the visitor's device and clearly states that nothing has been sent.

## Files

- `src/App.tsx` — header and hero
- `src/components/showcase.tsx` — the single kinetic typography artwork
- `src/components/project-brief.tsx` — project brief and email/download handoff
- `src/index.css` — shared tokens, browser defaults, and animation keyframes; component/layout styles live in Tailwind classes
- `src/components/ui/` — shadcn/ui primitives
- `PRODUCT.md`, `DESIGN.md` — product context and implemented design system

## Design source

Stitch project: https://stitch.withgoogle.com/projects/11404951037040707372

The studio-poster direction was approved by the user, then narrowed to the single kinetic typography artwork shown in the hero. Stitch informed the initial visual exploration; no generated image ships in the final hero. Typography is self-hosted through Fontsource. The approved direction and implementation evidence are recorded in `.impeccable/`.

Vite uses polling in this workspace because the host's file-watcher limit was reached.
