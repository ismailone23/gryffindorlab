"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

// shortcut: step wording describes a typical project; adjust to how the studio really runs before launch.
const steps = [
  {
    name: "Brief",
    text: "A 30-minute call or a short form. You share the idea, who it's for and when you need it.",
  },
  {
    name: "Plan",
    text: "We agree on scope and timeline in writing before any work starts.",
  },
  {
    name: "Make",
    text: "We design, edit or build, and share progress as it takes shape.",
  },
  {
    name: "Review",
    text: "You give feedback on real drafts, and we refine from there.",
  },
  {
    name: "Launch",
    text: "You get the final files, the live site or the exported video, ready to use.",
  },
];

// Sampled sine paths. Desktop: peaks under steps 1/3/5 (x = 0.1, 0.5, 0.9), troughs under 2/4.
// Every step sits on a whole quarter period, so the fraction of the line drawn equals x there.
const points = (fn: (t: number) => [number, number]) =>
  Array.from({ length: 201 }, (_, i) =>
    fn(i / 200)
      .map((v) => v.toFixed(2))
      .join(" "),
  ).join(" L ");
const across =
  "M " +
  points((t) => [
    t * 1000,
    50 - 46 * Math.cos((2 * Math.PI * (t - 0.1)) / 0.4),
  ]);
const down =
  "M " + points((t) => [12 + 9 * Math.sin(2 * Math.PI * 2.5 * t), t * 1000]);

// The black copy is revealed with a clip (left to right, or top to bottom on phones), not a dash:
// dashes break with non-scaling-stroke on a stretched viewBox and repeat along the curve.
function Wave({
  d,
  progress,
  className,
  viewBox,
  vertical = false,
}: {
  d: string;
  progress: number;
  className: string;
  viewBox: string;
  vertical?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d={d}
        fill="none"
        stroke="#e6e6e6"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        style={{
          clipPath: vertical
            ? `inset(0 0 ${(1 - progress) * 100}% 0)`
            : `inset(0 ${(1 - progress) * 100}% 0 0)`,
        }}
      />
    </svg>
  );
}

export function Process() {
  const road = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: road,
    offset: ["start 0.85", "end 0.7"],
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setProgress);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white px-(--gutter) py-30 text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-360">
        <h2 id="process-heading" className="section-title">
          How we work
        </h2>
        <ol
          ref={road}
          className="relative m-0 mt-14 flex list-none flex-col gap-12 p-0 pl-12 min-[1100px]:grid min-[1100px]:grid-cols-5 min-[1100px]:grid-rows-[auto_140px_auto] min-[1100px]:gap-x-8 min-[1100px]:gap-y-6 min-[1100px]:pl-0"
        >
          <Wave
            vertical
            d={down}
            progress={progress}
            viewBox="0 0 24 1000"
            className="absolute top-0 left-0 h-full w-6 min-[1100px]:hidden"
          />
          <Wave
            d={across}
            progress={progress}
            viewBox="0 0 1000 100"
            className="col-span-5 row-start-2 hidden h-full w-full min-[1100px]:block"
          />
          {steps.map((step, i) => {
            const on = progress >= (i + 0.5) / steps.length - 0.02;
            const top = i % 2 === 0;
            return (
              <li
                key={step.name}
                data-reveal
                style={
                  { gridColumnStart: i + 1, "--i": i } as React.CSSProperties
                }
                className={`min-[1100px]:text-center ${top ? "min-[1100px]:row-start-1 min-[1100px]:self-end" : "min-[1100px]:row-start-3"}`}
              >
                <h3
                  className={`text-[28px] leading-none font-medium tracking-[-0.04em] transition-colors duration-300 ${
                    on ? "text-[#0a0a0a]" : "text-[#8a8a8a]"
                  }`}
                >
                  {step.name}
                  {i === steps.length - 1 && (
                    <span className={on ? "text-ring" : ""}>.</span>
                  )}
                </h3>
                <p className="mt-3 max-w-72 text-[16px] leading-normal text-[#6b6b6b] min-[1100px]:mx-auto">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
