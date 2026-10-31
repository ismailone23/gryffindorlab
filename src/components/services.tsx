"use client";

import { useState } from "react";

// shortcut: stock photos stand in for real work, swap them in public/images when projects ship
const list = [
  { name: "Website development", img: "/images/web.jpg", alt: "Laptop on a café table" },
  { name: "Web design", img: "/images/illustration.jpg", alt: "Wireframe sketches in a notebook" },
  { name: "Video editing", img: "/images/video.jpg", alt: "Film camera resting on piano keys" },
  { name: "Animation", img: "/images/animation.jpg", alt: "Desk with monitor and drawing tablet" },
  { name: "Graphic design", img: "/images/design.jpg", alt: "Open design book with logo studies" },
  { name: "Branding", img: "/images/branding.jpg", alt: "Branded print goods on a table" },
  { name: "Illustration", img: "/images/illustration.jpg", alt: "Sketchbook pages" },
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white px-(--gutter) py-30 text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2 id="services-heading" className="section-title">
          What we do
        </h2>
        <div className="mt-14 flex flex-wrap items-start gap-x-16 gap-y-12">
          <div className="reveal aspect-[1.15] min-w-0 flex-[1_1_440px] overflow-hidden rounded bg-[#f2f2f2]">
            <img src={list[active].img} alt={list[active].alt} className="size-full object-cover" />
          </div>
          <ul className="m-0 flex-[1_1_520px] list-none p-0">
            {list.map((item, i) => (
              <li key={item.name}>
                <button
                  type="button"
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`text-left text-[clamp(40px,5vw,76px)] leading-[1.02] font-medium tracking-[-0.05em] transition-[color,transform] duration-450 ease-(--ease-out) hover:text-[#0a0a0a] ${
                    active === i ? "translate-x-8 text-[#0a0a0a]" : "text-[#c4c4c4]"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
