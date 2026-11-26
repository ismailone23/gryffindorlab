import Image from "next/image";
import Link from "next/link";
import { services, type Service } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import {
  breadcrumbJsonLd,
  breadcrumbs,
  faqJsonLd,
  jsonLdString,
  serviceJsonLd,
} from "@/lib/schema";

const stepNames = ["Brief", "Plan", "Make", "Review", "Launch"];
export const h1 =
  "m-0 font-(family-name:--font-pixel) text-[clamp(34px,4.2vw,64px)] leading-[1.05] font-normal text-balance";
const h2 =
  "m-0 font-(family-name:--display) text-[clamp(28px,3vw,40px)] leading-[1.1] font-medium tracking-[-0.04em]";
export const btn =
  "white-button h-12 rounded-[10px] px-6 text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
export const ghostBtn =
  "inline-flex h-12 items-center rounded-[10px] border border-border px-6 text-base font-medium transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
export const quietLink =
  "rounded-sm transition-colors hover:text-ring focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

// Same floating nav as the homepage; the spacer keeps content clear of the fixed header.
export function PageHeader() {
  return (
    <>
      <SiteHeader />
      <Reveal />
      <div aria-hidden="true" className="h-24 min-[901px]:h-28" />
    </>
  );
}

// Left: section heading; right: its content. Used by every block below the work.
function Row({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      data-reveal
      className="grid gap-6 min-[901px]:grid-cols-[1fr_2fr] min-[901px]:gap-16"
    >
      <h2 id={id} className={h2}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

const pixelTitle =
  "m-0 font-(family-name:--font-pixel) font-normal leading-none";
const caption = "mt-3 mb-0 text-sm leading-[1.5] text-muted-foreground";

export function ServicePage({ service }: { service: Service }) {
  const crumbs = breadcrumbs(service);
  const study = caseStudies[service.slug];
  const schemas = [
    serviceJsonLd({ ...service, name: service.h1 }),
    faqJsonLd(service.faqs),
    breadcrumbJsonLd(crumbs),
  ];
  const facts = [
    [
      "Work",
      service.projects?.map((p) => p.name).join(", ") ||
        study.client.split(",")[0],
    ],
    ["Tools", service.tools.slice(0, 3).join(", ")],
    ["Based in", "Dhaka, working worldwide"],
  ].filter(([, v]) => v);

  return (
    <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
      {schemas.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
        />
      ))}
      <PageHeader />

      <main className="py-10 min-[901px]:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
            <li className="flex gap-2">
              <Link href="/case-studies" className={quietLink}>
                Case studies
              </Link>
              <span aria-hidden="true">/</span>
            </li>
            <li aria-current="page" className="text-foreground/80">
              {service.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid items-end gap-12 min-[901px]:grid-cols-[1.4fr_1fr] min-[901px]:gap-16">
          <div>
            <h1 className={`${h1} min-[901px]:text-[clamp(56px,6vw,104px)]`}>
              {service.name}
              <span className="text-ring">.</span>
            </h1>
            <p className="mt-7 mb-0 max-w-2xl text-lg leading-[1.5] text-foreground/80 min-[901px]:text-xl">
              {service.intro[0]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#book-a-call" className={btn}>
                Book a call
              </Link>
              <Link href="/#contact" className={ghostBtn}>
                Send a brief
              </Link>
            </div>
          </div>
          <dl className="m-0 border-b border-white/10 text-base">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-t border-white/10 py-4 min-[640px]:flex min-[640px]:justify-between min-[640px]:gap-6"
              >
                <dt className="shrink-0 text-muted-foreground">{label}</dt>
                <dd className="m-0 min-[640px]:text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Pages with projects lead with their own shots instead. */}
        {!service.projects && (
          <Image
            src={service.image}
            alt={service.imageAlt}
            width={960}
            height={750}
            priority
            sizes="100vw"
            className="mt-20 aspect-16/10 w-full rounded-2xl object-cover"
          />
        )}

        <div className="mt-24 grid gap-32">
          {service.projects?.map((project) => (
            <section
              key={project.name}
              aria-label={project.name}
              data-reveal
              className="grid gap-12"
            >
              <div className="grid gap-6 min-[901px]:grid-cols-[1fr_2fr] min-[901px]:gap-16">
                <div>
                  <p className="m-0 text-sm text-muted-foreground">Project</p>
                  <h2
                    className={`${pixelTitle} mt-3 text-[clamp(28px,3vw,40px)]`}
                  >
                    {project.name}
                    <span className="text-ring">.</span>
                  </h2>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${quietLink} mt-5 inline-block text-base font-medium text-foreground`}
                  >
                    Visit the live site ↗
                  </a>
                </div>
                <p className="m-0 text-lg leading-[1.6] text-foreground/80 min-[901px]:text-xl">
                  {project.summary}
                </p>
              </div>
              {/* Pairs; with an odd count the first shot spans the row so none is left alone. */}
              <ul className="m-0 grid list-none gap-x-6 gap-y-10 p-0 min-[760px]:grid-cols-2 min-[760px]:[&>li:first-child:nth-last-child(odd)]:col-span-2">
                {project.shots.map((shot) => (
                  <li key={shot.src}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1200}
                      height={750}
                      sizes="(min-width: 760px) 50vw, 100vw"
                      className="h-auto w-full rounded-xl border border-white/10"
                    />
                    <p className={caption}>{shot.caption}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {service.gallery && (
            <section aria-label="Selected work">
              <div className="columns-1 gap-6 min-[640px]:columns-2 min-[1100px]:columns-3">
                {service.gallery.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="mb-6 h-auto w-full break-inside-avoid rounded-xl"
                  />
                ))}
              </div>
            </section>
          )}

          {service.videos && (
            <section aria-label="Video work">
              <ul className="m-0 grid list-none gap-6 p-0 min-[901px]:grid-cols-3">
                {service.videos.map((v) => (
                  <li key={v.id}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      loading="lazy"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="aspect-video w-full rounded-xl border-0"
                    />
                    <p className={caption}>{v.title}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {study.result && (
            <section
              aria-labelledby="case-study"
              data-reveal
              className="grid gap-8 border-t border-white/10 pt-12 min-[901px]:grid-cols-[1fr_2fr] min-[901px]:gap-16"
            >
              <div>
                <p className="m-0 text-sm text-muted-foreground">Case study</p>
                <h2
                  id="case-study"
                  className={`${pixelTitle} mt-3 text-[clamp(24px,2.6vw,36px)]`}
                >
                  Result<span className="text-ring">.</span>
                </h2>
                <p className="mt-3 mb-0 text-base text-muted-foreground">
                  {study.client}
                </p>
              </div>
              <div>
                <p className="m-0 text-[clamp(22px,2.2vw,32px)] leading-[1.3] font-medium tracking-[-0.02em]">
                  {study.result}
                </p>
                <div className="mt-12 grid gap-10 min-[760px]:grid-cols-2">
                  {(
                    [
                      ["Challenge", study.challenge],
                      ["Approach", study.approach],
                    ] as const
                  )
                    .filter(([, text]) => text)
                    .map(([label, text]) => (
                      <div
                        key={label}
                        className="border-t border-white/10 pt-4"
                      >
                        <h3 className="m-0 text-sm font-medium text-muted-foreground">
                          {label}
                        </h3>
                        <p className="mt-3 mb-0 text-base leading-[1.65] text-foreground/80">
                          {text}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

          <Row id="included" title="What you get">
            <ul className="m-0 grid list-none gap-x-10 p-0 min-[760px]:grid-cols-2">
              {service.included.map((item) => (
                <li key={item.title} className="border-t border-white/10 py-4">
                  <h3 className="m-0 text-base font-medium">{item.title}</h3>
                  <p className="mt-1 mb-0 text-base leading-[1.6] text-muted-foreground">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </Row>

          <Row id="process" title="How it runs">
            <ol className="m-0 grid list-none gap-5 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-5">
              {service.process.map((text, i) => (
                <li
                  key={stepNames[i]}
                  className={`border-t-2 pt-4 border-white/10`}
                >
                  <h3 className={`${pixelTitle} text-lg`}>{stepNames[i]}</h3>
                  <p className="mt-2 mb-0 text-sm leading-[1.55] text-muted-foreground">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </Row>

          <Row id="audience" title="Who it's for">
            <ul className="m-0 grid list-none gap-x-10 p-0 min-[760px]:grid-cols-2">
              {service.audience.map((item) => (
                <li key={item.title} className="border-t border-white/10 py-4">
                  <h3 className="m-0 text-base font-medium">{item.title}</h3>
                  <p className="mt-1 mb-0 text-base leading-[1.6] text-muted-foreground">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </Row>

          <Row id="tools" title="Built with">
            <p className="m-0 text-lg leading-[1.8] text-foreground/80">
              {service.tools.join(" · ")}
            </p>
          </Row>

          <Row id="faq" title="Questions">
            {service.faqs.map((f) => (
              <details
                key={f.q}
                className="group border-t border-white/10 py-5"
              >
                <summary className="flex cursor-pointer list-none justify-between gap-4 rounded-sm text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 mb-0 text-base leading-[1.65] text-foreground/80">
                  {f.a}
                </p>
              </details>
            ))}
          </Row>

          <section
            aria-labelledby="cta"
            data-reveal
            className="flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-16"
          >
            <div>
              <h2 id="cta" className={h2}>
                Have a project in mind?
              </h2>
              <p className="mt-3 mb-0 text-lg text-foreground/80">
                Tell us what you need. We reply with next steps and a quote.
              </p>
              <p className="mt-7 mb-0 text-base text-muted-foreground">
                Related:{" "}
                {service.related.map((slug, i) => (
                  <span key={slug}>
                    {i > 0 && " · "}
                    <Link href={`/case-studies/${slug}`} className={quietLink}>
                      {services[slug].name}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#book-a-call" className={btn}>
                Book a call
              </Link>
              <Link href="/#contact" className={ghostBtn}>
                Send a brief
              </Link>
            </div>
          </section>
        </div>
      </main>
      <div className="-mx-6 min-[901px]:-mx-[clamp(32px,4.4vw,80px)]">
        <SiteFooter />
      </div>
    </div>
  );
}
