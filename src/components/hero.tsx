"use client";

import { useEffect, useState } from "react";
import { DialogTrigger } from "@/components/ui/dialog";

const stages = ["Brief", "Plan", "Make", "Review", "Launch"];

export function Hero() {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setStage((s) => (s + 1) % stages.length), 2600);
    return () => clearInterval(timer);
  }, [auto]);

  const layer = (on: boolean) =>
    `builder-layer absolute inset-6 grid grid-cols-2 grid-rows-[1fr_auto] gap-4 ${on ? "opacity-100" : "scale-[.98] opacity-0"}`;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[max(760px,100svh)] items-center overflow-hidden px-(--gutter) pt-30 pb-18"
    >
      <div
        aria-hidden="true"
        className="hero-glow absolute top-[5%] right-[-15%] h-full w-3/4"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-14">
        <div className="min-w-0 flex-[1_1_420px]">
          <h1
            id="hero-heading"
            className="m-0 text-[clamp(52px,6.4vw,104px)] leading-[.95] font-medium tracking-[-0.055em]"
          >
            <span className="rise block">Good ideas,</span>
            <span className="rise block [animation-delay:.1s]">
              made real<span className="text-(--orange)">.</span>
            </span>
          </h1>
          <p className="rise mt-6 max-w-110 text-lg leading-[1.45] text-[#a3a3a3] [animation-delay:.22s]">
            An independent studio for video editing, websites and graphic design. One small team, from first cut to final file.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-7 [animation-delay:.34s]">
            <DialogTrigger asChild>
              <button type="button" className="white-button h-13 rounded-[10px] px-6 text-[17px]">
                Start a project
              </button>
            </DialogTrigger>
            <a href="#book-a-call" className="border-b border-current pb-0.5 text-[17px] text-[#e6e6e6]">
              Book a 30-min call
            </a>
          </div>
        </div>

        {/* A small site built stage by stage along the timeline */}
        <div aria-hidden="true" className="rise min-w-0 max-w-190 flex-[1.25_1_560px] [animation-delay:.46s]">
          <div className="float rounded-[18px] border border-[#1f1f1f] bg-[#0e0e0e] p-3 shadow-[0_40px_100px_#0009]">
            <div className="overflow-hidden rounded-[10px] bg-(--paper) text-[#0a0a0a]">
              <div className="flex h-8.5 items-center gap-1.5 bg-[#e6e6e6] px-3">
                <span className="size-2.25 rounded-full bg-[#c4c4c4]" />
                <span className="size-2.25 rounded-full bg-[#c4c4c4]" />
                <span className="size-2.25 rounded-full bg-[#c4c4c4]" />
                <span className="ml-3 flex h-5 flex-1 items-center gap-2 rounded-md bg-(--paper) px-2.5 text-[11px] text-[#6b6b6b]">
                  <span className={`size-1.75 rounded-full transition-colors duration-400 ${stage === 4 ? "bg-[#3fb950]" : "bg-[#c4c4c4]"}`} />
                  cornertable.cafe
                </span>
              </div>

              <div className="relative h-[clamp(260px,26vw,360px)]">
                <div className={layer(stage === 0)}>
                  <div className="rounded-lg border-[1.5px] border-dashed border-[#bdbdbd]" />
                  <div className="rounded-lg border-[1.5px] border-dashed border-[#bdbdbd]" />
                  <div className="col-span-2 h-16 rounded-lg border-[1.5px] border-dashed border-[#bdbdbd]" />
                </div>

                <div className={layer(stage === 1)}>
                  <div className="flex flex-col justify-center gap-3">
                    <span className="h-6.5 w-4/5 rounded-md bg-[#d4d4d4]" />
                    <span className="h-6.5 w-3/5 rounded-md bg-[#d4d4d4]" />
                    <span className="h-2 w-[90%] rounded bg-[#e0e0e0]" />
                    <span className="h-2 w-[70%] rounded bg-[#e0e0e0]" />
                    <span className="h-8 w-27.5 rounded-lg bg-[#c4c4c4]" />
                  </div>
                  <div className="rounded-lg bg-[#dcdcdc]" />
                  <div className="col-span-2 grid h-16 grid-cols-3 gap-3">
                    <span className="rounded-lg bg-[#e0e0e0]" />
                    <span className="rounded-lg bg-[#e0e0e0]" />
                    <span className="rounded-lg bg-[#e0e0e0]" />
                  </div>
                </div>

                <div className={layer(stage >= 2)}>
                  <div className="flex flex-col justify-center gap-3">
                    <span className="text-[clamp(28px,2.8vw,40px)] leading-[.95] font-medium tracking-[-0.05em]">
                      Corner
                      <br />
                      Table<span className="text-(--orange)">.</span>
                    </span>
                    <span className="text-xs leading-snug text-[#6b6b6b]">
                      Coffee, pastries and a table by the window. Book yours online.
                    </span>
                    <span className="flex gap-2 text-xs">
                      <span className="rounded-lg bg-[#0a0a0a] px-3.5 py-2 text-white">Book a table</span>
                      <span className="rounded-lg border border-[#c4c4c4] px-3.5 py-2">Menu</span>
                    </span>
                  </div>
                  <img src="/images/web.jpg" alt="" className="size-full rounded-lg object-cover" />
                  <div className="col-span-2 grid h-16 grid-cols-3 gap-3">
                    <img src="/images/design.jpg" alt="" className="size-full rounded-lg object-cover" />
                    <span className="rounded-lg bg-(--orange)" />
                    <img src="/images/branding.jpg" alt="" className="size-full rounded-lg object-cover" />
                  </div>
                </div>

                {stage === 3 && (
                  <>
                    <span className="pin absolute top-[22%] left-[34%] size-6.5 rounded-[50%_50%_50%_4px] border-2 border-white bg-(--orange) shadow-lg" />
                    <span className="pin absolute top-[48%] right-[18%] size-6.5 rounded-[50%_50%_50%_4px] border-2 border-white bg-[#0a0a0a] shadow-lg [animation-delay:.15s]" />
                  </>
                )}
              </div>
            </div>

            <div className="relative mt-3">
              <div className="mb-1.5 h-2.5 bg-[repeating-linear-gradient(90deg,#2a2a2a_0_1px,transparent_1px_12px)]" />
              <div className="grid grid-cols-5 gap-1">
                {stages.map((name, i) => (
                  <button
                    key={name}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      setStage(i);
                      setAuto(false);
                    }}
                    className={`h-10 rounded-lg border text-[13px] transition-colors duration-400 ${
                      i === stage
                        ? "border-(--orange) bg-[#fc674929] text-white"
                        : i < stage
                          ? "border-[#262626] bg-[#1c1c1c] text-[#bdbdbd]"
                          : "border-[#222] text-[#6b6b6b]"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <span
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-(--orange) transition-[left] duration-700 ease-(--ease-out)"
                style={{ left: `calc(${((stage + 0.5) / stages.length) * 100}% - 1px)` }}
              >
                <span className="absolute top-0 -left-1.25 h-2.5 w-3 bg-(--orange) [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
