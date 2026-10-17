"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { workCategories } from "@/lib/work";
import { WordReveal, useScrollWordReveal } from "@/components/word-reveal";

export function WorkSlider() {
  const strip = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const heading = useScrollWordReveal();

  useEffect(() => {
    const stripElement = strip.current;
    const trackElement = track.current;
    const firstSetElement = firstSet.current;
    if (
      !stripElement ||
      !trackElement ||
      !firstSetElement ||
      !("IntersectionObserver" in window)
    )
      return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let touchHeld = false;
    let touchTimer: number | undefined;
    let frame = 0;
    let lastTime = 0;
    let offset = 0;
    let speed = 0;
    let targetSpeed = 0;
    let distance = firstSetElement.offsetWidth + 20;

    function tick(time: number) {
      frame = 0;
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      speed += (targetSpeed - speed) * (1 - Math.exp(-elapsed / 260));

      if (targetSpeed === 0 && Math.abs(speed) < 0.08) {
        speed = 0;
        trackElement!.style.willChange = "auto";
        return;
      }

      offset = (offset + (speed * elapsed) / 1000) % distance;
      trackElement!.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = window.requestAnimationFrame(tick);
    }

    function updatePlayback() {
      targetSpeed =
        visible &&
        !document.hidden &&
        !reduced.matches &&
        !touchHeld &&
        !stripElement!.matches(":hover") &&
        !stripElement!.contains(document.activeElement)
          ? 42
          : 0;

      if (!frame && (targetSpeed > 0 || speed > 0.08)) {
        lastTime = 0;
        trackElement!.style.willChange = "transform";
        frame = window.requestAnimationFrame(tick);
      }
    }

    function onReducedMotionChange() {
      stripElement!.dataset.animated = String(!reduced.matches);
      if (reduced.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        speed = 0;
        offset = 0;
        trackElement!.style.transform = "";
        trackElement!.style.willChange = "auto";
      }
      updatePlayback();
    }

    function onResize() {
      distance = firstSetElement!.offsetWidth + 20;
      offset %= distance;
      trackElement!.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "touch") return;
      window.clearTimeout(touchTimer);
      touchHeld = true;
      speed = 0;
      window.cancelAnimationFrame(frame);
      frame = 0;
      updatePlayback();
    }

    function onPointerUp(event: PointerEvent) {
      if (event.pointerType !== "touch") return;
      touchTimer = window.setTimeout(() => {
        touchHeld = false;
        updatePlayback();
      }, 900);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.01;
        updatePlayback();
      },
      { threshold: 0.01 },
    );

    stripElement.dataset.animated = String(!reduced.matches);
    observer.observe(stripElement);
    stripElement.addEventListener("mouseenter", updatePlayback);
    stripElement.addEventListener("mouseleave", updatePlayback);
    stripElement.addEventListener("focusin", updatePlayback);
    stripElement.addEventListener("focusout", updatePlayback);
    stripElement.addEventListener("pointerdown", onPointerDown);
    stripElement.addEventListener("pointerup", onPointerUp);
    stripElement.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("visibilitychange", updatePlayback);
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", onReducedMotionChange);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(touchTimer);
      stripElement.removeEventListener("mouseenter", updatePlayback);
      stripElement.removeEventListener("mouseleave", updatePlayback);
      stripElement.removeEventListener("focusin", updatePlayback);
      stripElement.removeEventListener("focusout", updatePlayback);
      stripElement.removeEventListener("pointerdown", onPointerDown);
      stripElement.removeEventListener("pointerup", onPointerUp);
      stripElement.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("visibilitychange", updatePlayback);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t border-border pt-20 pb-28 min-[901px]:pt-28 min-[901px]:pb-36"
    >
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-6 min-[901px]:flex-row min-[901px]:items-end min-[901px]:justify-between min-[901px]:px-[clamp(32px,4.4vw,80px)]">
        <h2
          ref={heading}
          id="work-heading"
          className="m-0 font-(family-name:--display) text-[clamp(46px,6.2vw,88px)] leading-none font-semibold tracking-[-0.04em]"
        >
          <WordReveal text="Work in progress." accentDot />
        </h2>
        <p className="m-0 max-w-72 text-sm leading-relaxed text-muted-foreground min-[901px]:pb-1">
          Project previews. Real case studies coming soon.
        </p>
      </div>

      <div
        ref={strip}
        className="work-strip mt-12 w-full overflow-x-auto min-[901px]:mt-16"
        aria-label="Work categories"
      >
        <div ref={track} className="flex w-max gap-5 pb-2">
          {[0, 1, 2, 3].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? firstSet : undefined}
              className="flex shrink-0 gap-5"
              aria-hidden={copy > 0}
            >
              {workCategories.map((work, index) => (
                <Link
                  key={work.slug}
                  href={`/case-studies/${work.slug}/`}
                  prefetch={false}
                  tabIndex={copy > 0 ? -1 : undefined}
                  aria-label={`View ${work.name} case study preview`}
                  className="group block w-[clamp(290px,28vw,400px)] shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span
                    className={`flex aspect-[1.28] items-center justify-center rounded-[5px] ${index % 5 === 0 ? "bg-[#303030]" : "bg-(--soft)"} transition-colors duration-300 group-hover:bg-[#363636] group-focus-visible:bg-[#363636]`}
                  >
                    <img
                      src="/favicon.svg"
                      width="112"
                      height="112"
                      loading="lazy"
                      decoding="async"
                      alt=""
                      className="size-32 min-[901px]:size-36"
                    />
                  </span>
                  <span className="mt-3 block font-(family-name:--display) text-base font-semibold leading-tight text-foreground">
                    {work.name}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    Case study preview
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
