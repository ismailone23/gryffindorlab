"use client";

import { useState } from "react";
import Link from "next/link";
import { workCategories } from "@/lib/work";

// shortcut: stock photos until real project images exist
const images: Record<(typeof workCategories)[number]["slug"], string[]> = {
  design: ["design", "branding", "illustration"],
  branding: ["branding", "design", "web"],
  illustration: ["illustration", "design", "animation"],
  animation: ["animation", "video", "web"],
  "web-design": ["web", "illustration", "animation"],
  "video-editing": ["video", "animation", "web"],
};

export function Work() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" aria-labelledby="work-heading" className="bg-white pb-30 text-[#0a0a0a]">
      <div className="mx-auto max-w-[1440px] px-(--gutter) pb-10">
        <h2 id="work-heading" className="section-title">
          Selected work
        </h2>
      </div>
      {workCategories.map((work, i) => (
        <div key={work.slug} className="border-t border-[#e6e6e6]">
          <button
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
            className={`flex w-full items-center justify-between gap-4 px-(--gutter) py-6 text-left text-[clamp(32px,3.4vw,52px)] leading-[1.05] font-medium tracking-[-0.045em] transition-colors hover:text-[#0a0a0a] ${
              open === i ? "text-[#0a0a0a]" : "text-[#8a8a8a]"
            }`}
          >
            {work.name}
            <span aria-hidden="true" className="text-[28px] font-light">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div>
              <div className="grid h-[clamp(220px,26vw,380px)] grid-cols-[.8fr_1fr_1fr] gap-2">
                {images[work.slug].map((name) => (
                  <img key={name} src={`/images/${name}.jpg`} alt="" className="size-full object-cover" />
                ))}
              </div>
              <div className="mx-auto max-w-[1440px] px-(--gutter) pt-7 pb-10">
                <Link
                  href={`/case-studies/${work.slug}/`}
                  className="border-b border-current pb-0.5 text-[17px] font-medium"
                >
                  See the {work.name.toLowerCase()} case study
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="border-t border-[#e6e6e6]" />
    </section>
  );
}
