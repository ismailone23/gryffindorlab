"use client";

import type { PointerEvent } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  function moveHighlight(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--cursor-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--cursor-y",
      `${event.clientY - rect.top}px`,
    );
  }

  return (
    <footer
      className="relative z-31 bg-black text-(--paper)"
      data-nav-surface="dark"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
        <div className="grid gap-12 border-t border-white/20 pt-10 pb-20 min-[901px]:grid-cols-[minmax(0,1fr)_auto_auto] min-[901px]:gap-[clamp(48px,7vw,120px)] min-[901px]:pt-14 min-[901px]:pb-28">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.16em] text-ring uppercase">
              Gryffindorlab / Creative studio
            </p>
            <p className="max-w-105 font-(family-name:--display) text-[clamp(24px,3vw,42px)] leading-[1.15] font-medium tracking-[-0.035em]">
              Good ideas deserve to go somewhere.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-3 text-sm min-[901px]:pt-1"
          >
            <span className="mb-2 text-xs text-[#b0b0b0]">Explore</span>
            <a href="#services" className="transition-colors hover:text-ring">
              Services
            </a>
            <a href="#work" className="transition-colors hover:text-ring">
              Work
            </a>
            <a
              href="#testimonials"
              className="transition-colors hover:text-ring"
            >
              Voices
            </a>
            <a href="#contact" className="transition-colors hover:text-ring">
              Contact
            </a>
          </nav>

          <div className="flex flex-col items-start gap-3 text-sm min-[901px]:pt-1">
            <span className="mb-2 text-xs text-[#b0b0b0]">
              Have something in mind?
            </span>
            <a
              href="mailto:info@gryffindorlab.com"
              className="group inline-flex items-center gap-2 break-all transition-colors hover:text-ring"
            >
              info@gryffindorlab.com
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#book-a-call"
              className="transition-colors hover:text-ring"
            >
              Book a call
            </a>
          </div>
        </div>

        <a
          href="#main"
          aria-label="Gryffindorlab — back to top"
          onPointerEnter={moveHighlight}
          onPointerMove={moveHighlight}
          className="footer-wordmark relative block w-fit max-w-full font-(family-name:--display) text-[clamp(35px,10vw,170px)] leading-[0.9] font-semibold tracking-[-0.065em] focus-visible:text-ring"
        >
          <span>
            Gryffindorlab<span className="text-ring">.</span>
          </span>
          <span
            aria-hidden="true"
            className="footer-wordmark-highlight absolute inset-0 text-ring"
          >
            Gryffindorlab.
          </span>
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-white/20 py-6 text-xs text-[#b0b0b0] min-[901px]:mt-12">
          <span>
            © {new Date().getFullYear()} Gryffindorlab. Made with intention.
          </span>
          <a
            href="#main"
            className="inline-flex items-center gap-2 text-(--paper) transition-colors hover:text-ring"
          >
            Back to top <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
