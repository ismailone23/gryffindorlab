"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import PerspectiveTunnelHero, {
  type TunnelItem,
} from "@/components/ui/perspective-tunnel-hero";

// shortcut: stock photos until real project images exist
const tunnelItems: TunnelItem[] = [
  { src: "/images/web.jpg", title: "Website development" },
  { src: "/images/video.jpg", title: "Video editing" },
  { src: "/images/design.jpg", title: "Graphic design" },
  { src: "/images/branding.jpg", title: "Branding" },
  { src: "/images/animation.jpg", title: "Animation" },
  { src: "/images/illustration.jpg", title: "Illustration" },
];

// figlet "ANSI Regular" font (pure pixel blocks), generated once.
// Each "made real." row is [text, period part] so the period can be orange.
const goodIdeas = [
  " ██████   ██████   ██████  ██████      ██ ██████  ███████  █████  ███████",
  "██       ██    ██ ██    ██ ██   ██     ██ ██   ██ ██      ██   ██ ██",
  "██   ███ ██    ██ ██    ██ ██   ██     ██ ██   ██ █████   ███████ ███████",
  "██    ██ ██    ██ ██    ██ ██   ██     ██ ██   ██ ██      ██   ██      ██",
  " ██████   ██████   ██████  ██████      ██ ██████  ███████ ██   ██ ███████ ▄█",
].join("\n");
const madeReal: [string, string][] = [
  ["███    ███  █████  ██████  ███████     ██████  ███████  █████  ██", ""],
  ["████  ████ ██   ██ ██   ██ ██          ██   ██ ██      ██   ██ ██", ""],
  ["██ ████ ██ ███████ ██   ██ █████       ██████  █████   ███████ ██", ""],
  ["██  ██  ██ ██   ██ ██   ██ ██          ██   ██ ██      ██   ██ ██", ""],
  [
    "██      ██ ██   ██ ██████  ███████     ██   ██ ███████ ██   ██ ███████ ",
    "██",
  ],
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <PerspectiveTunnelHero items={tunnelItems}>
        {/* @container: the ASCII scales with the column so it never overflows */}
        <h1 id="hero-heading" className="@container m-0 w-[min(640px,100%)]">
          <span className="sr-only">Good ideas, made real.</span>
          <pre
            aria-hidden="true"
            className="m-0 text-left font-mono text-[min(calc(100cqw/46),18px)] leading-none text-[#ededed]"
          >
            <span className="rise block">{goodIdeas}</span>
            <span className="rise mt-[1em] block [animation-delay:.1s]">
              {madeReal.map(([text, dot], i) => (
                <span key={i} className="block">
                  {text}
                  <span className="text-ring">{dot}</span>
                </span>
              ))}
            </span>
          </pre>
        </h1>
        <p className="rise mx-auto mt-6 max-w-110 text-lg leading-[1.45] text-[#a3a3a3] [animation-delay:.22s]">
          An independent creative studio for web design and development, video
          editing and graphic design. One small team, from first cut to final
          file.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-7 [animation-delay:.34s]">
          <DialogTrigger asChild>
            <button
              type="button"
              className="white-button h-13 rounded-[10px] px-6 text-[17px]"
            >
              Start a project
            </button>
          </DialogTrigger>
          <a
            href="#book-a-call"
            className="border-b border-current pb-0.5 text-[17px] text-[#e6e6e6]"
          >
            Book a 30-min call
          </a>
        </div>
      </PerspectiveTunnelHero>
    </section>
  );
}
