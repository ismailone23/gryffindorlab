import Link from "next/link";
import { workCategories } from "@/lib/work";

type Slug = (typeof workCategories)[number]["slug"];

const clips: Record<Slug, { img: string; makes: string[] }> = {
  design: {
    img: "/work/tile-design.jpg",
    makes: ["Layouts and print", "Social assets", "Pitch decks"],
  },
  branding: {
    img: "/work/tile-branding.jpg",
    makes: ["Logos", "Identity systems", "Brand guidelines"],
  },
  illustration: {
    img: "/work/tile-gultu.jpg",
    makes: ["Editorial pieces", "Product art", "Custom icons"],
  },
  animation: {
    img: "/work/tile-animation.jpg",
    makes: ["Motion graphics", "Logo animation", "Explainers"],
  },
  "web-design": {
    img: "/work/tile-web.jpg",
    makes: [
      "CI/CD and cloud deploys",
      "APIs and databases",
      "LLM integrations",
    ],
  },
  "video-editing": {
    img: "/work/tile-video.jpg",
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
      className="bg-white pt-30 text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-360 px-(--gutter)">
        <h2 id="work-heading" className="section-title">
          Selected work<span className="text-ring">.</span>
        </h2>
      </div>
      <ul className="m-0 mt-12 grid list-none p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {workCategories.map((work, i) => (
          <li
            key={work.slug}
            data-reveal
            style={{ "--i": i % 3 } as React.CSSProperties}
          >
            <Link
              href={`/case-studies/${work.slug}/`}
              aria-label={`${work.name} case study`}
              className="group relative block aspect-4/3 overflow-hidden bg-[#0a0a0a] -outline-offset-4"
            >
              <img
                src={clips[work.slug].img}
                alt={`${work.name} project preview`}
                className="size-full object-cover"
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
              <span className="led-text absolute inset-x-0 bottom-0 flex flex-col gap-2 p-[clamp(20px,2.4vw,32px)] text-[#ededed] [@media(hover:none)]:bg-black/75">
                <span className="font-(family-name:--font-pixel) text-[clamp(22px,2.2vw,32px)] leading-none">
                  {work.name}
                  <span className="text-ring">.</span>
                </span>
                <span className="text-[15px] text-[#bdbdbd]">
                  {clips[work.slug].makes.join(" · ")}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
