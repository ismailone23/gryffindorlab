"use client";

import { useState } from "react";

// Add approved client quotes here; nothing is written on a client's behalf.
const quotes: { text: string; who: string; org: string }[] = [];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      className="bg-white px-(--gutter) py-30 text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2 id="voices-heading" className="section-title">
          Client voices
        </h2>
        <div className="mt-10 flex flex-wrap items-end gap-x-16 gap-y-8">
          <blockquote className="reveal m-0 min-h-[3.2em] flex-[3_1_560px] text-[clamp(32px,3.8vw,56px)] leading-[1.06] font-medium tracking-[-0.045em]">
            {quote ? `“${quote.text}”` : "Their words go here once they approve them."}
          </blockquote>
          {quote && (
            <div className="flex flex-[1_1_240px] flex-col gap-5">
              <p className="m-0 text-[15px]">
                <span className="font-medium">{quote.who}</span>
                <br />
                <span className="text-[#8a8a8a]">{quote.org}</span>
              </p>
              {quotes.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous quote"
                    onClick={() => setIndex((index + quotes.length - 1) % quotes.length)}
                    className="size-11 rounded-full border border-[#e0e0e0] text-lg"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next quote"
                    onClick={() => setIndex((index + 1) % quotes.length)}
                    className="size-11 rounded-full bg-[#0a0a0a] text-lg text-white"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
