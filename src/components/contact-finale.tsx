"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { BookingCalendar } from "@/components/booking-calendar";

const bookingUrl = "https://calendly.com/gryffindorlab-info/30min";

export function ContactFinale() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-black px-(--gutter) pt-30 pb-16 text-(--paper)"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-x-14 gap-y-8">
          <div className="min-w-0 flex-[1_1_520px]">
            <h2
              data-reveal
              id="contact-heading"
              className="m-0 text-[clamp(44px,5.4vw,80px)] leading-none font-medium tracking-[-0.05em]"
            >
              Tell us what you’re building<span className="text-(--orange)">.</span>
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-5 max-w-105 text-[17px] text-[#a3a3a3]">
              Start with an idea, or find a time to talk below.
            </p>
          </div>
          <div data-reveal style={{ "--i": 2 } as React.CSSProperties} className="flex flex-wrap items-center gap-7">
            <DialogTrigger asChild>
              <button type="button" className="white-button h-13 rounded-[10px] px-6 text-[17px]">
                Start a project
              </button>
            </DialogTrigger>
            <a href="mailto:info@gryffindorlab.com" className="border-b border-[#333] pb-1 text-lg">
              info@gryffindorlab.com
            </a>
          </div>
        </div>

        <div className="mt-14">
          <BookingCalendar />
          <a
            className="mx-auto mt-7 block w-fit text-sm text-muted-foreground underline decoration-white/40 underline-offset-4 hover:text-(--paper) hover:decoration-white"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open booking on Calendly ↗
          </a>
        </div>
      </div>
    </section>
  );
}
