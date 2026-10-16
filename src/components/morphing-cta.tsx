"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

type Phase = "hero" | "compact" | "docked" | "merged";

export function MorphingCta() {
  const anchor = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("hero");

  useEffect(() => {
    const anchorElement = anchor.current;
    const buttonElement = button.current;
    const contact = document.getElementById("contact");
    if (!anchorElement || !buttonElement || !contact) return;

    let currentPhase: Phase = "hero";
    let away = anchorElement.getBoundingClientRect().bottom <= 0;
    let timer: number | undefined;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function changePhase(next: Phase) {
      currentPhase = next;
      setPhase(next);
    }

    function positionAtHero(keepVisible = false) {
      const rect = anchorElement!.getBoundingClientRect();
      const top = keepVisible
        ? Math.min(
            Math.max(16, rect.top),
            Math.max(16, window.innerHeight - 80),
          )
        : Math.max(16, rect.top);
      buttonElement!.style.setProperty("--cta-top", `${top}px`);
      buttonElement!.style.setProperty(
        "--cta-right",
        `${window.innerWidth - rect.right}px`,
      );
    }

    function sync() {
      frame = 0;
      const nextAway = anchorElement!.getBoundingClientRect().bottom <= 0;
      const contactTop = contact!.getBoundingClientRect().top;

      if (nextAway && contactTop <= window.innerHeight - 80) {
        window.clearTimeout(timer);
        if (
          contactTop <= window.innerHeight * 0.35 &&
          currentPhase !== "merged"
        )
          changePhase("merged");
        else if (
          contactTop > window.innerHeight * 0.35 &&
          currentPhase !== "docked"
        )
          changePhase("docked");
        away = true;
        return;
      }

      if (currentPhase === "merged") changePhase("docked");

      if (nextAway !== away) {
        away = nextAway;
        window.clearTimeout(timer);

        if (away) {
          positionAtHero(true);
          changePhase(reduced.matches ? "docked" : "compact");
          if (!reduced.matches)
            timer = window.setTimeout(() => changePhase("docked"), 360);
        } else {
          positionAtHero();
          changePhase(reduced.matches ? "hero" : "compact");
          if (!reduced.matches)
            timer = window.setTimeout(() => changePhase("hero"), 700);
        }
      } else if (!away && currentPhase !== "docked") {
        positionAtHero();
      }
    }

    function scheduleSync() {
      if (!frame) frame = window.requestAnimationFrame(sync);
    }

    function onResize() {
      positionAtHero(away);
      scheduleSync();
    }

    buttonElement.style.setProperty(
      "--cta-open-width",
      `${buttonElement.offsetWidth}px`,
    );
    buttonElement.style.setProperty(
      "--cta-open-height",
      `${buttonElement.offsetHeight}px`,
    );
    positionAtHero(away);
    if (away) changePhase("docked");
    setReady(true);
    sync();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <span
      ref={anchor}
      className="mt-6.25 block h-13.5 w-48 min-[901px]:mt-8 min-[901px]:h-14.5"
    >
      <DialogTrigger asChild>
        <Button
          ref={button}
          type="button"
          aria-label="Start now"
          data-ready={ready}
          data-phase={phase}
          tabIndex={phase === "merged" ? -1 : undefined}
          className="start-now-button group relative h-13.5 w-48 overflow-hidden rounded-full bg-foreground p-0 text-background shadow-none hover:bg-ring min-[901px]:h-14.5"
        >
          <span className="start-now-label absolute left-5.5 text-lg">
            Start now
          </span>
          <span className="start-now-icon absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 min-[901px]:size-9.75">
            <ArrowUpRight
              aria-hidden="true"
              className="start-now-arrow size-4.75"
            />
            <img
              src="/favicon.svg"
              width="32"
              height="32"
              alt=""
              aria-hidden="true"
              className="start-now-mark absolute size-8"
            />
          </span>
        </Button>
      </DialogTrigger>
    </span>
  );
}
