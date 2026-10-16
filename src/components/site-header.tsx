"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export function SiteHeader({ onStartProject }: { onStartProject: (dark: boolean) => void }) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element) return;

    let previousY = window.scrollY;
    let movement = 0;
    let frame = 0;

    function update() {
      frame = 0;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      previousY = currentY;

      if (currentY < 90) {
        element!.dataset.hidden = "false";
        movement = 0;
      } else if (Math.abs(delta) > 0) {
        movement = Math.sign(delta) === Math.sign(movement) ? movement + delta : delta;
        if (Math.abs(movement) > 12) {
          element!.dataset.hidden = String(movement > 0);
          movement = 0;
        }
      }

      const intro = document.querySelector<HTMLElement>(".hero-intro");
      const introRect = intro?.getBoundingClientRect();
      const introVisible = intro && getComputedStyle(intro).opacity !== "0";

      for (const control of element!.querySelectorAll<HTMLElement>("[data-nav-control]")) {
        const rect = control.getBoundingClientRect();
        const sampleY = rect.top + rect.height * (control.matches("nav") ? 0.5 : 0.8) - element!.getBoundingClientRect().top;
        const sampleX = rect.left + rect.width / 2;
        const covered = introVisible && introRect && sampleX >= introRect.left && sampleX <= introRect.right && sampleY >= introRect.top && sampleY <= introRect.bottom;
        const below = document.elementsFromPoint(sampleX, sampleY)
          .find((candidate) => !element!.contains(candidate) && candidate !== element);
        control.dataset.surface = !covered && below?.closest('[data-nav-surface="dark"]') ? "dark" : "light";
      }
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={header} className="site-header" data-hidden="false" aria-label="Site header">
      <div className="site-header-inner">
        <Link
          href="/"
          data-nav-control
          aria-label="Gryffindorlab home"
          className="site-header-brand group inline-flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring min-[901px]:gap-3"
        >
          <img
            src="/favicon.svg"
            width="40"
            height="40"
            alt=""
            aria-hidden="true"
            className="site-header-mark size-9 shrink-0 rounded-sm transition-transform duration-500 ease-out group-hover:-rotate-6 min-[901px]:size-10"
          />
          <span className="flex flex-col justify-center max-[360px]:hidden">
            <span className="font-(family-name:--display) text-[18px] leading-none font-semibold tracking-[-0.035em] min-[901px]:text-[23px]">
              Gryffindorlab<span className="site-header-dot">.</span>
            </span>
            <span className="site-header-description mt-1.5 text-xs leading-none tracking-[0.02em] max-[480px]:hidden">
              Independent creative studio
            </span>
          </span>
        </Link>

        <nav data-nav-control className="site-header-nav" aria-label="Main navigation">
          <Link href="#services">Services</Link>
          <Link href="#work">Work</Link>
          <Link href="#testimonials">Voices</Link>
        </nav>

        <DialogTrigger asChild>
          <Button data-nav-control onClick={(event) => onStartProject(event.currentTarget.dataset.surface === "dark")} className="site-header-contact group h-11 shrink-0 gap-3 rounded-full py-1.5 pr-1.5 pl-4 text-base shadow-none min-[901px]:h-12.5 min-[901px]:gap-5 min-[901px]:pl-5">
            <span>Let’s talk</span>
            <span className="site-header-contact-icon grid size-8 place-items-center rounded-full min-[901px]:size-9">
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Button>
        </DialogTrigger>
      </div>
    </header>
  );
}
