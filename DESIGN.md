---
name: Gryffindorlab
description: A clean typographic studio poster with one violet motion-graphics study.
colors:
  paper: "#f1eef5"
  ink: "#242127"
  muted: "#65616b"
  soft: "#e7e1ef"
  rule: "#d6d0dc"
  violet: "#6845d6"
  field-border: "#bdb4c7"
typography:
  display:
    fontFamily: '"Bricolage Grotesque Variable", sans-serif'
    fontSize: "clamp(76px, 8.5vw, 136px)"
    fontWeight: 600
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  motion-display:
    fontFamily: '"Bricolage Grotesque Variable", sans-serif'
    fontSize: "clamp(65px, 7.3vw, 116px)"
    fontWeight: 600
    lineHeight: 0.89
    letterSpacing: "-0.04em"
  body:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(16px, 1.22vw, 19px)"
    fontWeight: 450
    lineHeight: 1.75
  label:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "14px"
    fontWeight: 600
rounded:
  artboard: "5px"
  dialog: "12px"
  pill: "9999px"
spacing:
  page-gutter: "clamp(24px, 4.4vw, 80px)"
  artwork-inset: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "58px"
  button-primary-hover:
    backgroundColor: "{colors.violet}"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "48px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.artboard}"
  motion-artboard:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.paper}"
    rounded: "{rounded.artboard}"
  project-dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
---

# Design System: Gryffindorlab

## Overview

**Creative North Star: "Studio poster"**

This identity pairs pale lilac paper, oversized near-black lettering, and a single saturated violet motion graphic. The language is open and deliberate, not an assemblage of cards or effects. The first surface is one hero with an authored edit / build / design loop, tying the artwork to the agency's three services; it has no service tabs or extra sections.

**Key Characteristics:**
- One expressive artwork against generous quiet space.
- Bricolage Grotesque display, Manrope body and controls; both are bundled locally.
- Carefully timed entrances; the artwork alone carries sustained motion.
- Tailwind CSS utilities implement composition, controls, and responsive behavior; `src/index.css` holds tokens, base browser treatments, and animation keyframes.

## Colors

### Primary
- **Violet** (`violet`): motion-study field, mark, punctuation, hover and focus feedback. It is a surface at artwork scale, not a glow.

### Neutral
- **Lilac paper** (`paper`): page and dialog ground, reversed text on dark buttons and violet.
- **Ink** (`ink`): headlines, wordmark and resting actions.
- **Muted ink** (`muted`): supporting copy.
- **Soft lilac** (`soft`): shadcn secondary surface alias.
- **Rule** (`rule`): hairline under navigation.
- **Field border** (`field-border`): the project-brief fields.

**The Violet Punctuation Rule.** Resting copy and actions stay in ink; violet carries the one artwork and precise emphasis.

## Typography

**Display:** Bricolage Grotesque Variable, weight 600 with tight tracking (-0.04em). The hero scales from a 48–60px clamp on small phones to a 76–136px clamp on desktop. The kinetic artwork uses solid lettering throughout; the lighter-weight “build.” line supplies contrast without a fragile stroke outline.

**Body:** Manrope Variable; explanatory text has a short 370–400px measure. Quiet metadata and field labels are visually secondary. The main actions use sentence case, not tracked uppercase. Both families are loaded from Fontsource rather than remote CSS.

**The Two Voices Rule.** Keep display expressive and text/control copy calm; don't add a third type personality just to signal creativity.

## Layout

The centered shell has a 1680px maximum. Above 900px, the hero is an asymmetric 1.32fr / 1fr grid; at 1100px and below, it tightens to 1.25fr / 1fr. At 900px and below, copy and CTA stack ahead of the artboard. The artboard stays at a 1.04 aspect ratio. At 390px and below, typography and the navigation tighten without horizontal scrolling. The header pairs a violet letter mark and two-line wordmark with a small desktop service descriptor and a dark contact action. It is not a service navigation.

The project-brief dialog has a 560px maximum width and scrolls within the viewport. Two form columns stack at 390px and below. The actual breakpoint and sizing rules are authored in Tailwind utilities in the components.

## Elevation & Depth

The page is flat: scale, spacing, and the header hairline provide hierarchy. The artboard has mouse-only tilt bounded at ±2.5 degrees, eased with `cubic-bezier(.22, 1, .36, 1)`; it resets on pointer leave. The project dialog alone uses a soft 0 24px 80px #20152e30 shadow above its overlay.

**The Flat Page Rule.** Reserve elevation for the dialog; do not wrap content in floating cards.

## Shapes

The artboard and form fields have a small 5px corner; the dialog has a softer 12px corner. Contact, project and submit actions are pills with circular arrow/play enclosures. Icons use Lucide SVGs, not Unicode stand-ins.

## Components

### Navigation
The home-linked violet SVG mark moves gently on hover; the exact same SVG is used as the favicon. The wordmark carries an understated studio descriptor, hidden on narrow phones so it does not wrap. The desktop-only service words are noninteractive context, not disguised links. A focus-revealed skip link goes directly to the hero. The contact action opens the shadcn dialog.

### Buttons and form
The dark hero action turns violet and lifts 2px on hover. The form submit is a full-width dark pill with a violet hover. Fields are labeled native text/email inputs and textarea with a violet 2px focus outline. The service picker is a shadcn Select within the shadcn Dialog, keyboard-accessible and included in the downloaded brief. Field text is 15px, field labels 14px, supporting dialog copy 14px; artwork labels and captions are at least 12px. The dialog uses shadcn focus management and Escape dismissal. Until a real `VITE_CONTACT_EMAIL` is supplied, submitting downloads a brief and explicitly says nothing was sent; when provided, it prepares an email rather than claiming server submission.

### Motion artwork
The lone violet artboard contains three staggered lines reading “edit. build. design.”, explicitly corresponding to video editing, website development, and graphic design. Native CSS `kinetic-type` and `film-progress` run over 9 seconds. Pause/play controls the animation play state, with `aria-pressed` and a contrasting paper-colored focus outline. There is no caption below the artboard. Reduced-motion preferences disable animations, retain the readable still composition, and replace playback controls with a truthful status. Headline entrance lasts 1.05s, details 1.1s, artboard entrance 1.25s. All are disabled for reduced motion.

## Do's and Don'ts

### Do:
- **Do** lead with clear words, a project action, and one authored visual.
- **Do** keep the artwork pausable and its focus visible on violet.
- **Do** use responsive Tailwind classes for layout and component styling; reserve CSS for shared tokens and custom keyframes.

### Don't:
- **Don't** bring back tabs, secondary studies, a service strip, or extra hero cards without a new brief.
- **Don't** claim the studio artwork is commissioned client work.
- **Don't** claim the downloadable brief was submitted to the agency.
