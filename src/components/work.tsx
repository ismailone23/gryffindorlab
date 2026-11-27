import Link from "next/link";
import { workCategories } from "@/lib/work";

type Slug = (typeof workCategories)[number]["slug"];

const clips: Record<Slug, { img: string; makes: string[] }> = {
  design: {
    img: "/work/tile-design.webp",
    makes: ["Layouts and print", "Social assets", "Pitch decks"],
  },
  branding: {
    img: "/work/tile-branding.webp",
    makes: ["Logos", "Identity systems", "Brand guidelines"],
  },
  "product-development": {
    img: "/work/tile-product.webp",
    makes: ["MVPs", "AI features", "Launch and iteration"],
  },
  "web-design": {
    img: "/work/tile-web.webp",
    makes: [
      "CI/CD and cloud deploys",
      "APIs and databases",
      "LLM integrations",
    ],
  },
  "video-editing": {
    img: "/work/tile-video.webp",
    makes: ["Cuts and pacing", "Colour and sound", "Captions"],
  },
};

const COLS = 16;
const ROWS = 12; // 16x12 square cells on a 4:3 picture
// Deterministic 0..17 per cell (same on server and client), scattered so cells light in no visible order.
const scatter = (i: number) =>
  Math.floor(((((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1) * 18);

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-white py-30 text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-360 px-(--gutter)">
        <h2 id="work-heading" className="section-title">
          Selected work<span className="text-ring">.</span>
        </h2>
      </div>
      <ul className="mx-auto mt-12 grid max-w-360 list-none gap-x-6 gap-y-12 px-(--gutter) min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {workCategories.map((work, i) => (
          <li
            key={work.slug}
            data-reveal
            style={{ "--i": i % 3 } as React.CSSProperties}
          >
            <Link
              href={`/case-studies/${work.slug}/`}
              aria-label={`${work.name} case study`}
              className="group block outline-offset-4"
            >
              <span className="relative block aspect-4/3 overflow-hidden bg-[#0a0a0a] ring-1 ring-black/10 transition-transform duration-150 ease-out group-active:scale-[0.98] motion-reduce:transition-none">
                <img
                  src={clips[work.slug].img}
                  alt={`${work.name} project preview`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-(--ease-out) motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.04]"
                />
                {/* LED panel: cells switch on one by one over the picture on hover (.led in index.css). */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid grid-cols-16 grid-rows-12 gap-0.5 [@media(hover:none)]:hidden"
                >
                  {Array.from({ length: COLS * ROWS }, (_, i) => (
                    <span
                      key={i}
                      className="led"
                      style={
                        { "--d": `${scatter(i) * 16}ms` } as React.CSSProperties
                      }
                    />
                  ))}
                </span>
                <span
                  aria-hidden="true"
                  className="led-text absolute inset-0 grid place-items-center text-[clamp(18px,1.6vw,24px)] font-medium text-[#ededed] [@media(hover:none)]:hidden"
                >
                  View case study →
                </span>
              </span>
              <span className="mt-5 block text-[clamp(22px,2vw,28px)] leading-tight font-medium tracking-[-0.03em]">
                {work.name}
                <span className="text-ring">.</span>
              </span>
              <span className="mt-2 block text-[15px] text-[#5c5c5c]">
                {clips[work.slug].makes.join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
