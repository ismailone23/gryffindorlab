import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/service-page";
import { services, serviceSlugs } from "@/content/services";
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gryffindorlab — Good ideas. Made real." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
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

const link = "rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function CaseStudies() {
  return (
    <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
      {schemas.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />
      ))}
      <PageHeader />
      <main className="py-10 min-[901px]:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
            <li className="flex gap-2">
              <Link href="/" className={link}>Home</Link>
              <span aria-hidden="true">/</span>
            </li>
            <li aria-current="page">Case studies</li>
          </ol>
        </nav>
        <h1 className="m-0 mt-10 font-(family-name:--display) text-[clamp(40px,5.4vw,84px)] leading-[1] font-semibold tracking-[-0.04em]">
          Case Studies and Services in Bangladesh<span className="text-ring">.</span>
        </h1>
        <p className="mt-7 mb-0 max-w-3xl text-base leading-[1.75] text-muted-foreground min-[901px]:text-lg">
          Gryffindorlab is a creative studio in Dhaka, Bangladesh. Pick a service to see what we make, how we work and
          the questions clients ask most. Real client case studies will appear on each page as they are published.
        </p>
        <ul className="m-0 mt-14 grid list-none gap-10 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {serviceSlugs.map((slug) => {
            const s = services[slug];
            return (
              <li key={slug}>
                <Link href={`/case-studies/${slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    width={960}
                    height={750}
                    sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="h-auto w-full rounded-[5px]"
                  />
                  <h2 className="m-0 mt-4 text-2xl font-medium tracking-[-0.03em] group-hover:underline">{s.name}</h2>
                  <p className="mt-2 mb-0 text-base leading-[1.7] text-muted-foreground">{s.intro[0]}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-16 mb-0 text-base font-semibold">
          <Link href="/#book-a-call" className={link}>Book a call</Link>
          <span className="mx-4" aria-hidden="true">·</span>
          <Link href="/#contact" className={link}>Send a brief</Link>
        </p>
      </main>
    </div>
  );
}
