"use client";

import { useEffect, useRef, useState, type CSSProperties, type TransitionEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

type Phase = "hero" | "compact" | "docked" | "merged";
type Position = { top: number; left: number; width: number; height: number };

export function MorphingCta() {
  const anchor = useRef<HTMLSpanElement>(null);
  const active = useRef(false);
  const currentPhase = useRef<Phase>("hero");
  const returning = useRef(false);
  const [floating, setFloating] = useState(false);
  const [phase, setPhase] = useState<Phase>("hero");
  const [rebasing, setRebasing] = useState(false);
  const [origin, setOrigin] = useState<Position>({ top: 0, left: 0, width: 192, height: 56 });

  useEffect(() => {
    const home = anchor.current;
    const contact = document.getElementById("contact");
    if (!home || !contact) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let first = 0;
    let second = 0;
    let timer = 0;
    let direction: "out" | "back" | "idle" = "idle";
    const threshold = () => window.innerWidth <= 900 ? 100 : 120;
    const contactVisible = () => contact.getBoundingClientRect().top <= window.innerHeight * 0.35;

    function changePhase(next: Phase) {
      currentPhase.current = next;
      setPhase(next);
    }

    function measure(rect: DOMRect, clampToScreen = false) {
      setOrigin({
        top: clampToScreen ? Math.max(16, Math.min(rect.top, window.innerHeight - 80)) : rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }

    function cancelSequence() {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    }

    function afterMount(callback: () => void) {
      first = window.requestAnimationFrame(() => {
        second = window.requestAnimationFrame(callback);
      });
    }

    function depart(rect: DOMRect) {
      cancelSequence();
      direction = "out";
      returning.current = false;
      if (contactVisible()) {
        setRebasing(false);
        measure(rect, true);
        changePhase("merged");
        active.current = true;
        setFloating(true);
        direction = "idle";
        return;
      }

      const stillOnScreen = rect.bottom > 0;
      const reversing = active.current;
      setRebasing(!stillOnScreen || reversing);
      measure(rect, true);
      // A jump past the hero starts as a circle at the top edge, never a
      // full-size button stranded above the headline.
      changePhase(!reversing && stillOnScreen ? "hero" : "compact");
      active.current = true;
      setFloating(true);

      if (reduced.matches) {
        changePhase("docked");
        direction = "idle";
        return;
      }

      afterMount(() => {
        if (direction !== "out") return;
        setRebasing(false);
        changePhase("compact");
        timer = window.setTimeout(() => {
          if (direction !== "out") return;
          changePhase("docked");
          direction = "idle";
        }, 360);
      });
    }

    function returnHome(rect: DOMRect) {
      cancelSequence();
      direction = "back";
      returning.current = true;
      if (reduced.matches) {
        active.current = false;
        setFloating(false);
        direction = "idle";
        returning.current = false;
        return;
      }

      if (currentPhase.current === "hero" || currentPhase.current === "compact") {
        measure(rect);
        if (currentPhase.current === "hero") {
          active.current = false;
          setFloating(false);
          direction = "idle";
          returning.current = false;
        } else {
          changePhase("hero");
        }
        return;
      }

      // While docked, the translate compensates for this new origin. Move the
      // circle back to the *current* hero position, then expand it there.
      setRebasing(true);
      changePhase("docked");
      measure(rect);
      afterMount(() => {
        if (direction !== "back") return;
        setRebasing(false);
        first = window.requestAnimationFrame(() => {
          second = window.requestAnimationFrame(() => {
            if (direction !== "back") return;
            changePhase("compact");
          });
        });
      });
    }

    function sync() {
      frame = 0;
      const rect = home!.getBoundingClientRect();
      const homeVisible = rect.top > threshold() && rect.bottom <= window.innerHeight - 16;

      if (!active.current) {
        if (rect.top <= threshold()) depart(rect);
        return;
      }

      if (contactVisible()) {
        cancelSequence();
        direction = "idle";
        returning.current = false;
        if (currentPhase.current !== "merged") changePhase("merged");
        return;
      }

      if (homeVisible) {
        if (direction === "back") measure(rect);
        else {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => {
            const current = home!.getBoundingClientRect();
            if (current.top > threshold() && current.bottom <= window.innerHeight - 16) {
              returnHome(current);
            }
          }, 140);
        }
      } else if (direction === "back") {
        cancelSequence();
        direction = "idle";
        returning.current = false;
        setRebasing(false);
        changePhase("docked");
      } else if (rect.top <= threshold()) {
        if (currentPhase.current === "merged") changePhase("docked");
      }
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(sync);
    }

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
      cancelSequence();
    };
  }, []);

  function finishReturn(event: TransitionEvent<HTMLButtonElement>) {
    if (event.target !== event.currentTarget || !["width", "top", "left", "transform"].includes(event.propertyName)) return;
    const target = anchor.current?.getBoundingClientRect();
    const actual = event.currentTarget.getBoundingClientRect();
    if (
      returning.current && currentPhase.current === "compact" && target &&
      target.bottom <= window.innerHeight - 16 &&
      Math.abs(actual.top - target.top) < 2 &&
      Math.abs(actual.left - target.left) < 2 &&
      Math.abs(actual.width - 56) < 2
    ) {
      currentPhase.current = "hero";
      setPhase("hero");
      return;
    }
    if (
      currentPhase.current === "hero" && target &&
      Math.abs(actual.top - target.top) < 2 &&
      Math.abs(actual.left - target.left) < 2 &&
      Math.abs(actual.width - target.width) < 2
    ) {
      active.current = false;
      setFloating(false);
      returning.current = false;
    }
  }

  return (
    <span ref={anchor} className="mt-6.25 block h-13.5 w-48 min-[901px]:mt-8 min-[901px]:h-14.5">
      <DialogTrigger asChild>
        <Button
          type="button"
          aria-label="Start now"
          aria-hidden={phase === "merged"}
          tabIndex={phase === "merged" ? -1 : undefined}
          data-floating={floating}
          data-phase={phase}
          data-rebasing={rebasing}
          onTransitionEnd={finishReturn}
          style={{
            "--cta-start-top": `${origin.top}px`,
            "--cta-start-left": `${origin.left}px`,
            "--cta-open-width": `${origin.width}px`,
            "--cta-open-height": `${origin.height}px`,
          } as CSSProperties}
          className="start-now-button group relative h-13.5 w-48 overflow-hidden rounded-full bg-foreground p-0 text-background shadow-none hover:bg-[#dedede] min-[901px]:h-14.5"
        >
          <span className="start-now-label absolute left-5.5 text-lg">Start now</span>
          <span className="start-now-icon absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-black/25 transition-colors duration-300 min-[901px]:size-9.75">
            <ArrowUpRight aria-hidden="true" className="start-now-arrow size-4.75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <img src="/favicon.svg" width="32" height="32" alt="" aria-hidden="true" className="start-now-mark absolute size-8" />
          </span>
        </Button>
      </DialogTrigger>
    </span>
  );
}
