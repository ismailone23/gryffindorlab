"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Hero } from "@/components/hero";
import { StartHere, ANY_SERVICE } from "@/components/start-here";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Faq } from "@/components/faq";
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
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY))
        return;
      // leave scrollable boxes (dialog, time list, textareas) to the browser
      if (
        (event.target as Element).closest(
          "[role=dialog], textarea, [data-radix-scroll-area-viewport]",
        )
      )
        return;
      event.preventDefault();
      if (!frame) current = target = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      target = Math.max(
        0,
        Math.min(max, target + event.deltaY * (event.deltaMode === 1 ? 32 : 1)),
      );
      if (!frame) frame = requestAnimationFrame(tick);
    };
    addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("wheel", onWheel);
    };
  }, []);
}

// Fade-and-rise for headings and [data-reveal] blocks as they enter (styles in index.css).
// The hidden state only applies once this runs, so content stays visible without JS.
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".section-title, [data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.documentElement.classList.add("js-reveal");
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useSmoothWheel();
  useReveal();
  // Service the brief opens with; set by the "Where should your idea go?" choices, reset on close.
  const [service, setService] = useState(ANY_SERVICE);

  return (
    <Dialog onOpenChange={(open) => !open && setService(ANY_SERVICE)}>
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
        <Process />
        <Work />

        <StartHere onPick={setService} />

        <Testimonials />
        <Faq />
        <ContactFinale />
      </main>
      <SiteFooter />
      <ProjectBrief dark service={service} />
    </Dialog>
  );
}
