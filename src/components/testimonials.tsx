"use client";

import { WordReveal, useScrollWordReveal } from "@/components/word-reveal";

const pendingStories = [
  "Real words, when they’re ready.",
  "Their take on the work belongs here.",
  "Nothing written on a client’s behalf.",
];

function TestimonialSlot({ text }: { text: string }) {
  return (
    <article className="flex min-h-62 flex-col justify-between rounded-[5px] bg-(--soft) p-7 min-[901px]:min-h-68 min-[901px]:p-9">
      <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <span aria-hidden="true" className="size-2 rounded-full bg-(--orange)" />
        Testimonial pending
      </span>
      <div>
        <p className="m-0 max-w-105 font-(family-name:--display) text-[clamp(24px,2.15vw,32px)] leading-[1.18] font-semibold tracking-[-0.035em]">
          {text}
        </p>
        <p className="mt-6 mb-0 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          Quote and attribution will be added with permission.
        </p>
      </div>
    </article>
  );
}

export function Testimonials() {
  const heading = useScrollWordReveal();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-border bg-background py-22 text-foreground min-[901px]:py-32"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
        <div className="flex flex-col gap-5 min-[901px]:flex-row min-[901px]:items-end min-[901px]:justify-between min-[901px]:gap-10">
          <h2
            ref={heading}
            id="testimonials-heading"
            className="m-0 font-(family-name:--display) text-[clamp(46px,6.2vw,88px)] leading-none font-semibold tracking-[-0.04em]"
          >
            <WordReveal text="Client voices." accentDot />
          </h2>
          <p className="m-0 max-w-88 text-sm leading-[1.7] text-muted-foreground min-[901px]:pb-1">
            A place for real feedback. We’ll share clients’ words when they
            approve them.
          </p>
        </div>

        <div className="mt-12 grid gap-5 min-[901px]:mt-16 min-[901px]:grid-cols-[.9fr_1.1fr] min-[901px]:gap-6">
          <div className="grid gap-5 min-[901px]:gap-6">
            <TestimonialSlot text={pendingStories[0]} />
            <div
              data-nav-surface="orange"
              className="relative flex min-h-75 flex-col justify-end overflow-hidden rounded-[5px] bg-(--orange) p-7 text-(--ink) min-[901px]:min-h-85 min-[901px]:p-9"
            >
              <svg
                viewBox="0 0 560 330"
                className="absolute inset-x-0 top-0 h-[calc(100%-72px)] w-full"
                aria-hidden="true"
              >
                <g transform="rotate(-15 280 165)" fill="currentColor">
                  <circle cx="190" cy="92" r="48" />
                  <rect x="300" y="44" width="96" height="96" />
                  <rect x="142" y="190" width="96" height="96" />
                  <circle cx="348" cy="238" r="48" />
                </g>
              </svg>
              <p className="relative m-0 border-t border-black/40 pt-4 text-sm">
                Client portrait or project still · pending
              </p>
            </div>
          </div>
          <div className="grid gap-5 min-[901px]:gap-6 min-[901px]:pt-16">
            <TestimonialSlot text={pendingStories[1]} />
            <TestimonialSlot text={pendingStories[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
