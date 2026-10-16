import { useRef, useState, type PointerEvent } from "react";
import { Pause, Play } from "lucide-react";

export function Showcase() {
  const artboard = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    artboard.current?.style.setProperty("--tilt-x", `${-y * 5}deg`);
    artboard.current?.style.setProperty("--tilt-y", `${x * 5}deg`);
  }

  function resetTilt() {
    artboard.current?.style.setProperty("--tilt-x", "0deg");
    artboard.current?.style.setProperty("--tilt-y", "0deg");
  }

  const motion = playing
    ? "[animation-play-state:running]"
    : "[animation-play-state:paused]";

  return (
    <div
      className="hero-artwork min-w-0 perspective-[1100px] min-[901px]:pt-5"
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
    >
      <div
        ref={artboard}
        data-hero-artboard
        data-nav-surface="dark"
        className="relative isolate aspect-[1.04] overflow-hidden rounded-[5px] bg-ring p-4 text-background transform-[rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] transition-transform duration-650 ease-out motion-reduce:transform-none min-[901px]:p-6"
      >
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="font-(family-name:--display) text-base font-semibold">
            The work.
          </span>
          <span>Video / Web / Design</span>
        </div>

        <div className="absolute inset-x-4 top-14.5 bottom-18 overflow-hidden min-[901px]:inset-x-6 min-[901px]:top-17.25 min-[901px]:bottom-21">
          <div
            role="img"
            aria-label="Edit. Build. Design. Video editing, website development, and graphic design."
            className="absolute inset-0 flex flex-col justify-center px-3 font-(family-name:--display) text-[clamp(42px,15vw,106px)] leading-[0.89] font-semibold tracking-[-0.04em] min-[901px]:text-[clamp(65px,7.3vw,116px)]"
          >
            <span className="block overflow-hidden pb-[0.07em]">
              <span
                aria-hidden="true"
                className={`block w-fit animate-[kinetic-type_9s_var(--ease-out)_infinite_both] motion-reduce:animate-none ${motion}`}
              >
                edit.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.07em]">
              <span
                aria-hidden="true"
                className={`block w-fit font-light animate-[kinetic-type_9s_var(--ease-out)_infinite_both] [animation-delay:0.12s] motion-reduce:animate-none ${motion}`}
              >
                build.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.07em]">
              <span
                aria-hidden="true"
                className={`block w-fit animate-[kinetic-type_9s_var(--ease-out)_infinite_both] [animation-delay:0.24s] motion-reduce:animate-none ${motion}`}
              >
                design.
              </span>
            </span>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center gap-4 min-[901px]:inset-x-6 min-[901px]:bottom-6">
          <button
            type="button"
            aria-label={playing ? "Pause motion study" : "Play motion study"}
            aria-pressed={playing}
            onClick={() => setPlaying(!playing)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/40 bg-transparent text-background transition-colors duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background motion-reduce:hidden"
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-3.25" />
            ) : (
              <Play aria-hidden="true" className="size-3.25" />
            )}
          </button>
          <span
            aria-hidden="true"
            className="h-0.5 flex-1 overflow-hidden bg-white/25 motion-reduce:hidden"
          >
            <span
              className={`block h-full origin-left bg-background animate-[film-progress_9s_linear_infinite_paused] motion-reduce:animate-none ${motion}`}
            />
          </span>
          <span className="min-w-14.5 text-xs motion-reduce:hidden">
            {playing ? "In motion" : "Press play"}
          </span>
          <span className="hidden text-xs motion-reduce:block">
            Motion paused for your viewing preference
          </span>
        </div>
      </div>
    </div>
  );
}
