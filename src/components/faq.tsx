// shortcut: the "one service" and "cost" answers are assumed wording, confirm with the studio before launch.
const faqs = [
  {
    q: "What do you work on?",
    a: "Video editing, website development, graphic design, branding, animation and illustration.",
  },
  {
    q: "How do we start?",
    a: "Book a 30-minute call below, or send a short brief with Start a project. Either way we reply with next steps.",
  },
  {
    q: "Can you take on just one part, like only the edit?",
    a: "Yes. Each service can be booked on its own, or combined into one project with one team.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on the scope. We share a quote after the first conversation, before any work starts.",
  },
  {
    q: "What do I get at the end?",
    a: "The finished work in the formats you need, whether that is a live website, exported video files or print and web ready artwork.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white px-(--gutter) pb-30 text-[#0a0a0a]"
    >
      <div className="mx-auto grid max-w-360 gap-10 min-[1100px]:grid-cols-[1fr_2fr]">
        <h2 id="faq-heading" className="section-title">
          Questions
        </h2>
        <div className="border-b border-[#e6e6e6]">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="group border-t border-[#e6e6e6]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[clamp(20px,1.8vw,26px)] font-medium tracking-[-0.03em] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-[24px] font-light text-[#8a8a8a] transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="m-0 max-w-160 pb-6 text-[17px] leading-[1.55] text-[#6b6b6b]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
