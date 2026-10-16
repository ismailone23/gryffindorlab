"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "@/components/booking-calendar";

const bookingUrl = "https://calendly.com/gryffindorlab-info/30min";

export function ContactFinale({
  onStartProject,
}: {
  onStartProject: () => void;
}) {
  const emblem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = emblem.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      element.dataset.animated = "true";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.animated = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="contact-finale"
      data-nav-surface="dark"
      aria-labelledby="contact-heading"
    >
      <div className="contact-landing">
        <div className="contact-landing-content">
          <div
            ref={emblem}
            className="contact-emblem"
            data-animated="false"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 64 64"
              fill="none"
              className="w-full"
              aria-hidden="true"
            >
              <g
                transform="rotate(-15 32 32)"
                stroke="currentColor"
                strokeWidth=".65"
                opacity=".8"
              >
                <circle cx="23" cy="23" r="8" />
                <rect x="33" y="15" width="16" height="16" />
                <rect x="15" y="33" width="16" height="16" />
                <circle cx="41" cy="41" r="8" />
              </g>
            </svg>
          </div>
          <h2
            id="contact-heading"
            className="mx-auto mt-2 max-w-250 font-(family-name:--display) text-[clamp(44px,7vw,100px)] leading-[.98] font-semibold tracking-[-.04em] text-balance"
          >
            Tell us what you’re building
            <span className="text-[#aa8bf7]">.</span>
          </h2>
          <p className="mt-6 text-base text-[#c8c0d2] min-[901px]:text-lg">
            Start with an idea, or find a time to talk.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <DialogTrigger asChild>
              <Button
                onClick={onStartProject}
                className="group h-13.5 gap-5 rounded-full bg-(--paper) pr-2 pl-6 text-base text-(--ink) hover:bg-(--soft)"
              >
                Start a project
                <span className="grid size-9 place-items-center rounded-full bg-(--ink) text-(--paper)">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Button>
            </DialogTrigger>
            <a
              href="#book-a-call"
              onClick={(event) => {
                event.preventDefault();
                window.history.pushState(null, "", "#book-a-call");
                document
                  .getElementById("book-a-call")
                  ?.scrollIntoView({ behavior: "instant", block: "start" });
              }}
              className="group inline-flex h-13.5 items-center gap-5 rounded-full border border-white/35 pr-2 pl-6 text-base text-(--paper) transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--paper)"
            >
              Book a call
              <span className="grid size-9 place-items-center rounded-full bg-white/12">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-290 px-6 pt-12 pb-32 min-[901px]:pt-16 min-[901px]:pb-28">
        <BookingCalendar />
        <a
          className="mx-auto mt-7 block w-fit text-sm text-[#c8c0d2] underline decoration-white/40 underline-offset-4 hover:text-(--paper) hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--paper)"
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open booking on Calendly ↗
        </a>
      </div>
    </section>
  );
}
