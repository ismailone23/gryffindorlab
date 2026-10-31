"use client";

import { useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Hero } from "@/components/hero";
import { Mark } from "@/components/mark";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { ProjectBrief } from "@/components/project-brief";
import { Testimonials } from "@/components/testimonials";
import { SiteHeader } from "@/components/site-header";
import { ContactFinale } from "@/components/contact-finale";
import { SiteFooter } from "@/components/site-footer";

// Eased mouse-wheel scrolling. Touch, keyboard and scrollbar stay native.
function useSmoothWheel() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let target = scrollY;
    let current = target;
    let frame = 0;
    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) current = target;
      scrollTo({ top: current, behavior: "instant" });
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      // leave scrollable boxes (dialog, time list, textareas) to the browser
      if ((event.target as Element).closest("[role=dialog], textarea, [data-radix-scroll-area-viewport]")) return;
      event.preventDefault();
      if (!frame) current = target = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      target = Math.max(0, Math.min(max, target + event.deltaY * (event.deltaMode === 1 ? 32 : 1)));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("wheel", onWheel);
    };
  }, []);
}

export default function App() {
  useSmoothWheel();

  return (
    <Dialog>
      <a
        href="#main"
        className="fixed top-3 left-4 z-70 translate-y-[-160%] bg-foreground px-4 py-3 text-background focus:translate-y-0"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Services />
        <Work />

        <section
          aria-label="Studio"
          className="relative overflow-hidden bg-black px-(--gutter) py-30 text-center"
        >
          <div aria-hidden="true" className="statement-glow absolute top-0 left-1/2 h-160 w-225 -translate-x-1/2" />
          <div aria-hidden="true" className="float relative mx-auto size-65 perspective-[1000px]">
            <div className="turn absolute inset-0 transform-3d">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Mark
                  key={i}
                  stroke={i === 0 ? "var(--orange)" : `rgb(252 103 73 / ${0.5 - i * 0.07})`}
                  className={`absolute inset-0 size-full ${i === 0 ? "drop-shadow-[0_0_6px_var(--orange)]" : ""}`}
                  style={{ transform: `translateZ(${-i * 14}px)` }}
                />
              ))}
            </div>
          </div>
          <h2 className="reveal relative mx-auto mt-10 max-w-205 text-[clamp(40px,4.8vw,72px)] leading-[1.02] font-medium tracking-[-0.05em]">
            Good ideas deserve to go somewhere
          </h2>
          <a href="#services" className="relative mt-7 inline-block border-b border-(--orange) pb-0.5 text-(--orange)">
            See what we do
          </a>
        </section>

        <Testimonials />
        <ContactFinale />
      </main>
      <SiteFooter />
      <ProjectBrief dark />
    </Dialog>
  );
}
