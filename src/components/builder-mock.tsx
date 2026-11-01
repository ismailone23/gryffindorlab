"use client";

// Parked: the website-builder mock that used to sit on the right of the hero.
// Not rendered anywhere right now; drop <BuilderMock /> back into a layout to use it.
import { useEffect, useState } from "react";

const stages = ["Brief", "Plan", "Make", "Review", "Launch"];

export function BuilderMock() {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setStage((s) => (s + 1) % stages.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [auto]);

  const layer = (on: boolean) =>
    `builder-layer absolute inset-6 grid grid-cols-2 grid-rows-[1fr_auto] gap-4 ${on ? "opacity-100" : "scale-[.98] opacity-0"}`;

  return (
    <div
      aria-hidden="true"
      className="rise min-w-0 max-w-190 flex-[1.25_1_560px] [animation-delay:.46s]"
    >
      <div className="rounded-[18px] border border-[#1f1f1f] bg-[#0e0e0e] p-3 shadow-[0_40px_100px_#0009]">
        <div className="overflow-hidden rounded-[10px] bg-(--paper) text-[#0a0a0a]">
          <div className="flex h-8.5 items-center gap-1.5 bg-[#e6e6e6] px-3">
            <span className="size-2.25 rounded-full bg-[#c4c4c4]" />
            <span className="size-2.25 rounded-full bg-[#c4c4c4]" />
            <span className="size-2.25 rounded-full bg-[#c4c4c4]" />
            <span className="ml-3 flex h-5 flex-1 items-center gap-2 rounded-md bg-(--paper) px-2.5 text-[11px] text-[#6b6b6b]">
              <span
                className={`size-1.75 rounded-full transition-colors duration-400 ${stage === 4 ? "bg-[#3fb950]" : "bg-[#c4c4c4]"}`}
              />
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
                <span className="text-[clamp(28px,2.8vw,40px)] leading-[.95] font-medium tracking-tighter">
                  Corner
                  <br />
                  Table<span className="text-ring">.</span>
                </span>
                <span className="text-xs leading-snug text-[#6b6b6b]">
                  Coffee, pastries and a table by the window. Book yours online.
                </span>
                <span className="flex gap-2 text-xs">
                  <span className="rounded-lg bg-[#0a0a0a] px-3.5 py-2 text-white">
                    Book a table
                  </span>
                  <span className="rounded-lg border border-[#c4c4c4] px-3.5 py-2">
                    Menu
                  </span>
                </span>
              </div>
              <img
                src="/images/web.jpg"
                alt=""
                className="size-full rounded-lg object-cover"
              />
              <div className="col-span-2 grid h-16 grid-cols-3 gap-3">
                <img
                  src="/images/design.jpg"
                  alt=""
                  className="size-full rounded-lg object-cover"
                />
                <span className="rounded-lg bg-ring" />
                <img
                  src="/images/branding.jpg"
                  alt=""
                  className="size-full rounded-lg object-cover"
                />
              </div>
            </div>

            {stage === 3 && (
              <>
                <span className="pin absolute top-[22%] left-[34%] size-6.5 rounded-[50%_50%_50%_4px] border-2 border-white bg-ring shadow-lg" />
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
                    ? "border-ring bg-[#fc674929] text-white"
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
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-ring transition-[left] duration-700 ease-out"
            style={{
              left: `calc(${((stage + 0.5) / stages.length) * 100}% - 1px)`,
            }}
          >
            <span className="absolute top-0 -left-1.25 h-2.5 w-3 bg-ring [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          </span>
        </div>
      </div>
    </div>
  );
}
