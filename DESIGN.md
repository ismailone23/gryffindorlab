---
name: Gryffindorlab
description: A clean typographic studio poster with one orange motion-graphics study.
colors:
  paper: "#f8f2ef"
  ink: "#242127"
  muted: "#655e5b"
  soft: "#f1e2db"
  rule: "#ddcec7"
  orange: "#fc6749"
  orange-deep: "#b73721"
  field-border: "#c9b6ad"
  contact-dark: "#000000"
  contact-panel: "#171210"
  contact-border: "#755b52"
  contact-placeholder: "#bdaba3"
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
    backgroundColor: "{colors.orange-deep}"
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
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.artboard}"
  project-dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
---

# Design System: Gryffindorlab

## Overview

**Creative North Star: "Studio poster"**

This identity pairs warm paper, oversized near-black lettering, and a single saturated orange motion graphic. The language is open and deliberate, not an assemblage of cards or effects. The first surface is one hero with an authored edit / build / design loop, tying the artwork to the agency's three services; it has no service tabs or extra sections.

**Key Characteristics:**
- One expressive artwork against generous quiet space.
- Bricolage Grotesque display, Manrope body and controls; both are bundled locally.
- Carefully timed entrances; the artwork alone carries sustained motion.
- Next.js statically prerenders the hero for SEO; Tailwind CSS utilities implement composition, controls, and responsive behavior; `src/index.css` holds tokens, base browser treatments, and animation keyframes.

## Colors

### Primary
- **Orange** (`orange`): motion-study field, mark, and punctuation. Use deeper orange for light-surface focus and button hovers to preserve contrast.
- **Contact dark** (`contact-dark`): the user-requested closing field has no decorative mark or glow; the rest of the page keeps its warm paper.

### Neutral
- **Warm paper** (`paper`): page and dialog ground, reversed text on dark buttons.
- **Ink** (`ink`): headlines, wordmark and resting actions.
- **Muted ink** (`muted`): supporting copy.
- **Soft warm neutral** (`soft`): shadcn secondary surface alias.
- **Rule** (`rule`): restrained separators between content sections, not under the floating header.
- **Field border** (`field-border`): the project-brief fields.

**The Orange Punctuation Rule.** Resting copy and actions stay in ink; orange carries the one artwork and precise emphasis.

## Typography

**Display:** Bricolage Grotesque Variable, weight 600 with tight tracking (-0.04em). The hero scales from a 48–60px clamp on small phones to a 76–136px clamp on desktop. The kinetic artwork uses solid lettering throughout; the lighter-weight “build.” line supplies contrast without a fragile stroke outline.

**Body:** Manrope Variable; explanatory text has a short 370–400px measure. Quiet metadata and field labels are visually secondary. The main actions use sentence case, not tracked uppercase. Both families are loaded from Fontsource rather than remote CSS.

**The Two Voices Rule.** Keep display expressive and text/control copy calm; don't add a third type personality just to signal creativity.

## Layout

The centered shell has a 1680px maximum. Above 900px, the hero is an asymmetric 1.32fr / 1fr grid; at 1100px and below, it tightens to 1.25fr / 1fr. At 900px and below, copy and CTA stack ahead of the artboard. The artboard stays at a 1.04 aspect ratio. At 390px and below, typography and the navigation tighten without horizontal scrolling. The borderless fixed header shows the mark, wordmark, centered section links, and a contact action on wide screens. At 1100px and below, it shows only the brand and “Let’s talk” in one row; at 360px and below, the mark alone keeps the full contact label legible. The full-width work strip uses generous project preview tiles (up to 400px wide on desktop) while remaining horizontally browsable on mobile.

The project-brief dialog has a 560px maximum width and scrolls within the viewport. Two form columns stack at 390px and below. The actual breakpoint and sizing rules are authored in Tailwind utilities in the components.

## Elevation & Depth

The page is flat: scale and spacing provide hierarchy. The artboard has mouse-only tilt bounded at ±2.5 degrees, eased with `cubic-bezier(.22, 1, .36, 1)`; it resets on pointer leave. The project dialog alone uses a soft 0 24px 80px #32201730 shadow above its overlay.

**The Flat Page Rule.** Reserve elevation for the dialog; do not wrap content in floating cards.

## Shapes

The artboard and form fields have a small 5px corner; the dialog has a softer 12px corner. Contact, project and submit actions are pills with circular arrow/play enclosures. Icons use Lucide SVGs, not Unicode stand-ins.

## Components

### Navigation
The home-linked orange SVG mark moves gently on hover; the exact same SVG is used as the favicon. The wordmark carries an understated studio descriptor, hidden on narrow phones so it does not wrap. The centered pill links only to real sections (Services, Work, Voices) on desktop. During the mark's move to the artboard, the header stays above the viewport; it drops in when the left-hand text starts appearing. Reduced motion, no JavaScript, or early keyboard focus shows it immediately. The fixed header hides on downward scroll, returns on upward scroll or keyboard focus, and samples the surface beneath each control so the pill, brand and contact action remain legible on the orange artboard as well as warm paper. A focus-revealed skip link goes directly to the hero. The contact action opens the shadcn dialog.

### Buttons and form
The dark hero action turns deep orange and lifts 2px on hover. The project-form submit is a full-width monochrome pill; its “Send your idea” label and arrow stay centered and unchanged after submission. Native text/email inputs, textarea, and the shadcn Select use neutral focus feedback. Browser-autofilled inputs retain the dialog's light or dark ground. Field text is 15px, field labels 14px, supporting dialog copy 14px; artwork labels are at least 12px. The dialog uses shadcn focus management and Escape dismissal. The form sends plain-text project details through a server-only Resend endpoint protected by Redis rate limits. A clear status appears above the button after acceptance by Resend, or offers retry or direct email on failure.

### Motion artwork
The lone orange artboard contains three staggered lines reading “edit. build. design.”, explicitly corresponding to video editing, website development, and graphic design. Native CSS `kinetic-type` and `film-progress` run over 9 seconds. Pause/play controls the animation play state, with `aria-pressed` and a contrasting ink-colored focus outline. There is no caption below the artboard. Reduced-motion preferences disable animations, retain the readable still composition, and replace playback controls with a truthful status. Headline entrance lasts 1.05s, details 1.1s, artboard entrance 1.25s. All are disabled for reduced motion.

### Closing invitation
The black closing section scrolls into view as one continuous field, without a decorative mark or glow. The invitation, project action, and booking link remain centered and accessible. The header adapts to the actual surface beneath it. The project dialog adopts a dark neutral treatment when opened against dark surfaces, while triggers on paper keep the light dialog. The booking surface is one compact ruled black panel with three columns: Gryffindorlab details and a searchable shadcn timezone combobox, a shadcn-button calendar of real Calendly availability, and understated shadcn time buttons within a dark shadcn ScrollArea leading into a name/email confirmation form. It stacks on mobile and jumps straight to dates. Server-side Calendly APIs retrieve available times and create bookings; Resend sends an additional branded email only after Calendly accepts a booking. No iframe, nested border, fake dates, cookie label, or invented staff. Keep the external Calendly fallback when APIs are unavailable.

## Do's and Don'ts

### Do:
- **Do** lead with clear words, a project action, and one authored visual.
- **Do** keep the artwork pausable and its focus visible on orange.
- **Do** use responsive Tailwind classes for layout and component styling; reserve CSS for shared tokens and custom keyframes.

### Don't:
- **Don't** bring back tabs, secondary studies, a service strip, or extra hero cards without a new brief.
- **Don't** claim the studio artwork is commissioned client work.
- **Don't** claim the brief was delivered if Resend rejected it or the server is not configured.
