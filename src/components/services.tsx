"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";
import { WordReveal, useScrollWordReveal } from "@/components/word-reveal";

const descriptions = {
  video: "Editing and pacing that bring the story in your footage into focus.",
  web: "Structure, development, and detail for a clear, responsive website.",
  design: "Typography, layouts, and graphics with a consistent point of view.",
} satisfies Record<(typeof services)[number]["id"], string>;

const positions = [
  [
    [74, 280],
    [210, 280],
    [346, 280],
    [482, 280],
  ],
  [
    [170, 170],
    [390, 170],
    [390, 390],
    [170, 390],
  ],
  [
    [170, 170],
    [390, 170],
    [170, 390],
    [390, 390],
  ],
] as const;

export function Services() {
  const artwork = useRef<HTMLDivElement>(null);
  const heading = useScrollWordReveal();
  const [phase, setPhase] = useState(0);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (!artwork.current || !("IntersectionObserver" in window)) return;
    let gridTimer: number | undefined;
    let markTimer: number | undefined;
    let lastScrollY = window.scrollY;
    let direction: "up" | "down" = "down";
    let outside = true;
    let hasPlayed = false;

    function clearTimers() {
      window.clearTimeout(gridTimer);
      window.clearTimeout(markTimer);
    }

    function trackScroll() {
      const nextY = window.scrollY;
      if (nextY !== lastScrollY)
        direction = nextY > lastScrollY ? "down" : "up";
      lastScrollY = nextY;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          outside = true;
          clearTimers();
          if (hasPlayed) {
            setMoving(false);
            setPhase(
              entry.boundingClientRect.top >=
                (entry.rootBounds?.bottom ?? window.innerHeight)
                ? 0
                : 2,
            );
          }
          return;
        }

        if (!outside || entry.intersectionRatio < 0.35) return;
        outside = false;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          hasPlayed = true;
          setMoving(false);
          setPhase(2);
          return;
        }

        if (!hasPlayed || direction === "down") {
          hasPlayed = true;
          setMoving(false);
          setPhase(0);
          gridTimer = window.setTimeout(() => {
            setMoving(true);
            setPhase(1);
          }, 550);
          markTimer = window.setTimeout(() => setPhase(2), 1900);
        } else {
          setMoving(false);
          setPhase(2);
        }
      },
      { threshold: [0, 0.35] },
    );

    window.addEventListener("scroll", trackScroll, { passive: true });
    observer.observe(artwork.current);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", trackScroll);
      clearTimers();
    };
  }, []);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-border pt-20 pb-28 min-[901px]:pt-28 min-[901px]:pb-40"
    >
      <h2
        ref={heading}
        id="services-heading"
        className="m-0 pr-16 font-(family-name:--display) text-[clamp(46px,6.2vw,88px)] leading-none font-semibold tracking-[-0.04em] min-[901px]:pr-0"
      >
        <WordReveal text="What we make." accentDot />
      </h2>

      <div className="mt-12 grid items-start gap-12 min-[901px]:mt-16 min-[901px]:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] min-[901px]:gap-[clamp(60px,8vw,140px)]">
        <div
          ref={artwork}
          data-phase={phase}
          className="mx-auto w-full max-w-130 min-[901px]:sticky min-[901px]:top-14"
          role="img"
          aria-label="Four violet shapes move from a line to a grid, then form the Gryffindorlab mark"
        >
          <svg
            viewBox="0 0 560 560"
            className="block h-auto w-full overflow-visible text-ring"
            aria-hidden="true"
          >
            <g
              className={`origin-center duration-[800ms] ease-out ${moving ? "transition-transform" : "transition-none"}`}
              style={{
                transform: phase === 2 ? "rotate(-15deg)" : "rotate(0deg)",
              }}
            >
              {positions[phase].map(([x, y], index) => (
                <g
                  key={index}
                  className={`duration-[800ms] ease-out ${moving ? "transition-transform" : "transition-none"}`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {index === 0 || index === 3 ? (
                    <circle r="66" fill="currentColor" />
                  ) : (
                    <rect
                      x="-66"
                      y="-66"
                      width="132"
                      height="132"
                      fill="currentColor"
                    />
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="grid gap-11 min-[901px]:gap-20 min-[901px]:pt-2">
          {services.map((service) => (
            <div key={service.id}>
              <h3 className="m-0 font-(family-name:--display) text-[clamp(36px,3.7vw,56px)] leading-[1.04] font-semibold tracking-[-0.04em] max-[390px]:text-[34px]">
                {service.name}
              </h3>
              <p className="mt-4 mb-0 max-w-95 text-base leading-[1.7] text-muted-foreground min-[901px]:mt-5 min-[901px]:text-lg">
                {descriptions[service.id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
