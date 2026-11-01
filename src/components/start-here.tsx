import { DialogTrigger } from "@/components/ui/dialog";
import { PixelIcon } from "@/components/pixel-icon";
import { services } from "@/lib/services";

export const ANY_SERVICE = "A bit of everything";

// Each choice opens the project brief with that service already picked.
const choices = [
  ...services.map((s) => ({
    service: s.name,
    icon: {
      web: "Website development",
      video: "Video editing",
      design: "Graphic design",
    }[s.id],
  })),
  { service: ANY_SERVICE, icon: "Branding" },
];

export function StartHere({ onPick }: { onPick: (service: string) => void }) {
  return (
    <section
      aria-labelledby="start-heading"
      className="bg-black px-(--gutter) py-30 text-[#ededed]"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2 id="start-heading" className="section-title">
          Where should your idea go<span className="text-(--orange)">?</span>
        </h2>
        <p
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-4 text-[17px] text-[#a3a3a3]"
        >
          Pick a starting point and we&apos;ll open a short brief for it.
        </p>
        <ul className="m-0 mt-12 grid list-none gap-2 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {choices.map((choice, i) => (
            <li
              key={choice.service}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <DialogTrigger asChild>
                <button
                  type="button"
                  onClick={() => onPick(choice.service)}
                  className="group flex min-h-56 w-full flex-col justify-between bg-[#111] p-7 text-left transition-colors duration-300 hover:bg-[#1a1a1a]"
                >
                  <PixelIcon name={choice.icon} />
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-[clamp(24px,2vw,30px)] leading-tight font-medium tracking-[-0.03em]">
                      {choice.service}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[24px] text-[#6b6b6b] transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-(--orange)"
                    >
                      →
                    </span>
                  </span>
                </button>
              </DialogTrigger>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
