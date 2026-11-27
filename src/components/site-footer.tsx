import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";

const socials = [
  ["Facebook", Facebook],
  ["LinkedIn", Linkedin],
  ["Instagram", Instagram],
] as const;

// figlet "ANSI Regular", same block font as the hero headline; the trailing "██" is the orange full stop.
const wordmark = [
  " ██████  ██████  ██    ██ ███████ ███████ ██ ███    ██ ██████   ██████  ██████  ██       █████  ██████",
  "██       ██   ██  ██  ██  ██      ██      ██ ████   ██ ██   ██ ██    ██ ██   ██ ██      ██   ██ ██   ██",
  "██   ███ ██████    ████   █████   █████   ██ ██ ██  ██ ██   ██ ██    ██ ██████  ██      ███████ ██████",
  "██    ██ ██   ██    ██    ██      ██      ██ ██  ██ ██ ██   ██ ██    ██ ██   ██ ██      ██   ██ ██   ██",
  " ██████  ██   ██    ██    ██      ██      ██ ██   ████ ██████   ██████  ██   ██ ███████ ██   ██ ██████ ",
];

export function SiteFooter() {
  return (
    <footer className="bg-black px-(--gutter) pt-16 pb-10 text-[#8a8a8a]">
      <div className="mx-auto max-w-360">
        {/* @container: the block art scales to the column width (106 columns incl. the full stop). */}
        <div aria-hidden="true" className="@container">
          <pre className="m-0 font-mono text-[calc(100cqw/64)] leading-none text-[#ededed]">
            {wordmark.map((row, i) => (
              <span key={i} className="block">
                {row}
                {i === wordmark.length - 1 && (
                  <span className="text-ring">██</span>
                )}
              </span>
            ))}
          </pre>
        </div>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 text-sm">
          <div className="grid gap-3">
            <address className="flex items-center gap-2 text-base text-[#ededed] not-italic">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-ring" />
              Suvastu Rialto Tower, Level-7, Dhanmondi 4A
            </address>
            <span>
              © {new Date().getFullYear()} Gryffindorlab · Creative studio in
              Bangladesh
            </span>
          </div>
          {/* shortcut: logos only, no profile links yet; wrap each in <a href> once the URLs exist. */}
          <ul className="m-0 flex list-none gap-5 p-0 text-[#ededed]">
            {socials.map(([label, Icon]) => (
              <li key={label}>
                <Icon role="img" aria-label={label} className="size-5" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
