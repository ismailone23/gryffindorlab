import { PixelIcon } from "@/components/pixel-icon";

export const serviceList = [
  {
    name: "Website development",
    makes: "CI/CD and cloud deploys · APIs and databases · LLM integrations",
  },
  {
    name: "Video editing",
    makes: "Cuts and pacing · Colour and sound · Captions",
  },
  { name: "Animation", makes: "Motion graphics · Logo animation · Explainers" },
  {
    name: "Graphic design",
    makes: "Layouts and print · Social assets · Pitch decks",
  },
  { name: "Branding", makes: "Logos · Identity systems · Brand guidelines" },
  {
    name: "Illustration",
    makes: "Editorial pieces · Product art · Custom icons",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white px-(--gutter) py-30 text-[#0a0a0a]"
    >
      <div className="mx-auto max-w-360">
        <h2 id="services-heading" className="section-title">
          What we do
        </h2>
        <ul className="m-0 mt-12 grid list-none gap-2 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {serviceList.map((item, i) => (
            <li
              key={item.name}
              data-reveal
              style={{ "--i": i % 3 } as React.CSSProperties}
              className="group flex min-h-[clamp(240px,22vw,320px)] flex-col justify-between bg-[#0a0a0a] p-[clamp(20px,2vw,28px)] text-[#ededed] transition-colors duration-300 hover:bg-[#151515]"
            >
              <PixelIcon name={item.name} />
              <div>
                <h3 className="text-[clamp(24px,2vw,30px)] leading-tight font-medium tracking-[-0.03em]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[15px] leading-snug text-[#a3a3a3]">
                  {item.makes}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
