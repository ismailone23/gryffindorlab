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
        <div className="mt-10 font-(family-name:--font-pixel) text-[13px]">
          <span>
            © {new Date().getFullYear()} Gryffindorlab · Creative studio in
            Bangladesh
          </span>
        </div>
      </div>
    </footer>
  );
}
