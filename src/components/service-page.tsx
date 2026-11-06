import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { services, type Service } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import {
  breadcrumbJsonLd,
  breadcrumbs,
  faqJsonLd,
  jsonLdString,
  serviceJsonLd,
} from "@/lib/schema";

const stepNames = ["Brief", "Plan", "Make", "Review", "Launch"];
const h2 =
  "m-0 font-(family-name:--display) text-[clamp(28px,3vw,40px)] leading-[1.1] font-medium tracking-[-0.04em]";
const body =
  "m-0 max-w-3xl text-base leading-[1.75] text-muted-foreground min-[901px]:text-lg";
const link =
  "rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function PageHeader() {
  return (
    <header className="flex h-21.5 items-center justify-between border-b border-border min-[901px]:h-26.5">
      <Link
        href="/"
        aria-label="Gryffindorlab home"
        className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <Image
          src="/favicon.png"
          width={40}
          height={40}
          alt=""
          className="size-9 min-[901px]:size-10"
        />
        <span className="font-(family-name:--display) text-lg font-semibold tracking-[-0.035em]">
          Gryffindorlab<span className="text-ring">.</span>
        </span>
      </Link>
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to work
      </Link>
    </header>
  );
}

export function ServicePage({ service }: { service: Service }) {
  const crumbs = breadcrumbs(service);
  const study = caseStudies[service.slug];
  const studyRows = [
    ["Client", study.client],
    ["Challenge", study.challenge],
    ["Approach", study.approach],
    ["Result", study.result],
  ].filter(([, text]) => text);
  const schemas = [
    serviceJsonLd({ ...service, name: service.h1 }),
    faqJsonLd(service.faqs),
    breadcrumbJsonLd(crumbs),
  ];

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
            {crumbs.map((c, i) => (
              <li key={c.name} className="flex gap-2">
                {i < crumbs.length - 1 ? (
                  <Link
                    href={c.url.replace(
                      /^https:\/\/www\.gryffindorlab\.com/,
                      "",
                    )}
                    className={link}
                  >
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page">{c.name}</span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 grid items-center gap-12 min-[901px]:grid-cols-[1.1fr_1fr] min-[901px]:gap-20">
          <div>
            <h1 className="m-0 font-(family-name:--display) text-[clamp(40px,5.4vw,84px)] leading-none font-semibold tracking-[-0.04em]">
              {service.h1}
              <span className="text-ring">.</span>
            </h1>
            <div className="mt-7 grid gap-4">
              {service.intro.map((p) => (
                <p key={p} className={body}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <Image
            src={service.image}
            alt={service.imageAlt}
            width={960}
            height={750}
            priority
            sizes="(min-width: 901px) 45vw, 100vw"
            className="h-auto w-full rounded-[5px]"
          />
        </div>

        <div className="mt-24 grid gap-20">
          <section aria-labelledby="included">
            <h2 id="included" className={h2}>
              What&apos;s included
            </h2>
            <ul className="m-0 mt-8 grid list-none gap-x-10 gap-y-6 p-0 min-[901px]:grid-cols-2">
              {service.included.map((item) => (
                <li key={item.title} className="border-t border-border pt-4">
                  <h3 className="m-0 text-xl font-medium tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 mb-0 text-base leading-[1.7] text-muted-foreground">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="process">
            <h2 id="process" className={h2}>
              Our process for {service.name.toLowerCase()}
            </h2>
            <ol className="m-0 mt-8 grid list-none gap-6 p-0 min-[901px]:grid-cols-5">
              {service.process.map((text, i) => (
                <li key={stepNames[i]} className="border-t border-border pt-4">
                  <h3 className="m-0 text-2xl font-medium tracking-[-0.03em]">
                    {stepNames[i]}
                  </h3>
                  <p className="mt-2 mb-0 text-base leading-[1.7] text-muted-foreground">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {service.gallery && (
            <section aria-labelledby="gallery">
              <h2 id="gallery" className={h2}>Selected work</h2>
              <div className="mt-8 columns-1 gap-6 min-[640px]:columns-2 min-[1100px]:columns-3">
                {service.gallery.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="mb-6 h-auto w-full break-inside-avoid rounded-[5px]"
                  />
                ))}
              </div>
            </section>
          )}

          {service.projects && (
            <section aria-labelledby="projects">
              <h2 id="projects" className={h2}>Selected work</h2>
              {service.projects.map((project) => (
                <div key={project.name} className="mt-12">
                  <h3 className="m-0 text-2xl font-medium tracking-[-0.03em]">{project.name}</h3>
                  <p className={`${body} mt-2`}>{project.summary}</p>
                  <p className="mt-2 mb-0 text-base">
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className={link}>
                      Visit the live site
                    </a>
                  </p>
                  <ul className="m-0 mt-6 grid list-none gap-x-6 gap-y-8 p-0 min-[760px]:grid-cols-2">
                    {project.shots.map((shot) => (
                      <li key={shot.src}>
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={1200}
                          height={750}
                          sizes="(min-width: 760px) 45vw, 100vw"
                          className="h-auto w-full rounded-[5px] border border-border"
                        />
                        <p className="mt-3 mb-0 text-sm leading-[1.6] text-muted-foreground">{shot.caption}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {service.videos && (
            <section aria-labelledby="videos">
              <h2 id="videos" className={h2}>Video work</h2>
              <ul className="m-0 mt-8 grid list-none gap-6 p-0 min-[901px]:grid-cols-3">
                {service.videos.map((v) => (
                  <li key={v.id}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      loading="lazy"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="aspect-video w-full rounded-[5px] border-0"
                    />
                    <p className="mt-3 mb-0 text-sm leading-[1.6] text-muted-foreground">{v.title}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="tools">
            <h2 id="tools" className={h2}>
              Tools &amp; tech we use
            </h2>
            <ul className="m-0 mt-8 flex list-none flex-wrap gap-3 p-0">
              {service.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-border px-4 py-2 text-sm"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="audience">
            <h2 id="audience" className={h2}>
              Who it&apos;s for
            </h2>
            <ul className="m-0 mt-8 grid list-none gap-x-10 gap-y-6 p-0 min-[901px]:grid-cols-2">
              {service.audience.map((item) => (
                <li key={item.title} className="border-t border-border pt-4">
                  <h3 className="m-0 text-xl font-medium tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 mb-0 text-base leading-[1.7] text-muted-foreground">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {studyRows.length > 0 && (
            <section aria-labelledby="case-study">
              <h2 id="case-study" className={h2}>
                Case study
              </h2>
              <dl className="m-0 mt-8 grid gap-6">
                {studyRows.map(([label, text]) => (
                  <div key={label} className="border-t border-border pt-4">
                    <dt className="text-sm font-semibold text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="m-0 mt-2 max-w-3xl text-base leading-[1.7]">
                      {text}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section aria-labelledby="faq">
            <h2 id="faq" className={h2}>
              Frequently asked questions
            </h2>
            <div className="mt-8 max-w-3xl">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-t border-border py-5">
                  <h3 className="m-0 text-xl font-medium tracking-[-0.02em]">
                    {f.q}
                  </h3>
                  <p className="mt-2 mb-0 text-base leading-[1.7] text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="cta"
            className="border-t border-border pt-12"
          >
            <h2 id="cta" className={h2}>
              Ready to start?
            </h2>
            <p className={`${body} mt-4`}>
              Tell us what you need. We reply with next steps and a quote.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold">
              <Link href="/#book-a-call" className={link}>
                Book a call
              </Link>
              <Link href="/#contact" className={link}>
                Send a brief
              </Link>
            </div>
            <p className="mt-10 mb-0 text-sm text-muted-foreground">
              Related services
            </p>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-8 gap-y-3 p-0 text-base font-semibold">
              {service.related.map((slug) => (
                <li key={slug}>
                  <Link href={`/case-studies/${slug}`} className={link}>
                    {services[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
