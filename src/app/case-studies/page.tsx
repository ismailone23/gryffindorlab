import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, btn, ghostBtn, h1 } from "@/components/service-page";
import { SiteFooter } from "@/components/site-footer";
import { services, serviceSlugs, type ServiceSlug } from "@/content/services";
import { breadcrumbJsonLd, jsonLdString, pageUrl } from "@/lib/schema";
import { siteUrl } from "@/lib/site";

const url = siteUrl + "/case-studies";
const title = "Case Studies and Services in Bangladesh | Gryffindorlab";
const description =
  "Explore Gryffindorlab services and case studies: web development, video editing, graphic design, branding, animation and illustration from Dhaka, Bangladesh.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Gryffindorlab",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gryffindorlab — Good ideas. Made real.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

const schemas = [
  breadcrumbJsonLd([
    { name: "Home", url: siteUrl + "/" },
    { name: "Case studies", url },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: serviceSlugs.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: services[slug].h1,
      url: pageUrl(slug),
    })),
  },
];

// The service with real client projects leads; the rest follow as a grid.
const featured = serviceSlugs.find((slug) => services[slug].projects);
const rest = serviceSlugs.filter((slug) => slug !== featured);
const makes = (slug: ServiceSlug) =>
  services[slug].included
    .slice(0, 3)
    .map((i) => i.title)
    .join(" · ");
// Image sits in a hairline frame; it eases up slightly on hover, only for real pointers.
const frame =
  "relative block overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-white/10 after:ring-inset";
const zoom =
  "aspect-4/3 w-full object-cover transition-transform duration-700 ease-(--ease-out) motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03]";
const focus =
  "rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function CaseStudies() {
  const f = featured && services[featured];
  return (
    <div className="mx-auto w-full max-w-420 px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
      {schemas.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
        />
      ))}
      <PageHeader />
      <main className="py-10 min-[901px]:py-16">
        <div className="grid items-end gap-8 border-b border-white/10 pb-12 min-[901px]:grid-cols-2">
          <h1 className={`${h1} min-[901px]:text-[clamp(56px,6vw,96px)]`}>
            Case studies<span className="text-ring">.</span>
          </h1>
          <p className="m-0 max-w-xl text-lg leading-[1.55] text-foreground/80 min-[901px]:justify-self-end min-[901px]:text-xl">
            Six things we make at our studio in Dhaka, Bangladesh. Each page
            shows our work, what you get and how a job runs from brief to
            launch.
          </p>
        </div>

        {f && (
          <Link
            href={`/case-studies/${f.slug}`}
            className={`group mt-16 grid items-center gap-8 min-[901px]:grid-cols-[1.6fr_1fr] min-[901px]:gap-12 ${focus}`}
          >
            <span className={frame}>
              <Image
                src={f.image}
                alt={f.imageAlt}
                width={960}
                height={750}
                priority
                sizes="(min-width: 901px) 60vw, 100vw"
                className={zoom}
              />
            </span>
            <div className="grid gap-5">
              <p className="m-0 text-sm text-muted-foreground">
                Featured · {f.projects!.length} projects
              </p>
              <h2 className="m-0 text-[clamp(32px,3.2vw,44px)] leading-[1.05] font-medium tracking-[-0.04em]">
                {f.name}
                <span className="text-ring">.</span>
              </h2>
              <p className="m-0 text-lg leading-[1.6] text-foreground/80">
                {f.projects!.map((p) => p.name).join(" and ")}. {f.intro[0]}
              </p>
              <p className="m-0 text-sm text-muted-foreground">
                {makes(f.slug)}
              </p>
              <span className="mt-2 font-medium transition-colors group-hover:text-ring">
                Read the case study →
              </span>
            </div>
          </Link>
        )}

        <ul className="m-0 mt-24 grid list-none gap-x-6 gap-y-14 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {rest.map((slug, i) => {
            const s = services[slug];
            return (
              <li
                key={slug}
                data-reveal
                style={{ "--i": i % 3 } as React.CSSProperties}
              >
                <Link
                  href={`/case-studies/${slug}`}
                  className={`group grid gap-4 ${focus}`}
                >
                  <span className={frame}>
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      width={960}
                      height={750}
                      sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className={zoom}
                    />
                  </span>
                  <span className="flex items-baseline justify-between gap-4">
                    <h2 className="m-0 text-[clamp(22px,2vw,26px)] leading-[1.05] font-medium tracking-[-0.04em] transition-colors group-hover:text-ring">
                      {s.name}
                      <span className="text-ring">.</span>
                    </h2>
                  </span>
                  <p className="m-0 text-base leading-normal text-muted-foreground">
                    {makes(slug)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <section className="mt-32 flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-16">
          <div>
            <h2 className="m-0 font-(family-name:--display) text-[clamp(28px,3vw,40px)] leading-[1.1] font-medium tracking-[-0.04em]">
              Have a project in mind?
            </h2>
            <p className="mt-4 mb-0 text-base text-muted-foreground min-[901px]:text-lg">
              Tell us what you need. We reply with next steps and a quote.
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
      </main>
      <div className="-mx-6 min-[901px]:-mx-[clamp(32px,4.4vw,80px)]">
        <SiteFooter />
      </div>
    </div>
  );
}
