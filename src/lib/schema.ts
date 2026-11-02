import { siteUrl } from "@/lib/site";

type Faq = { q: string; a: string };

export const pageUrl = (slug: string) => `${siteUrl}/case-studies/${slug}`;

export const serviceJsonLd = (s: {
  slug: string;
  name: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description,
  url: pageUrl(s.slug),
  provider: { "@type": "Organization", name: "Gryffindorlab", url: siteUrl },
  areaServed: ["Bangladesh", "Worldwide"],
});

export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const breadcrumbs = (s: { slug: string; name: string }) => [
  { name: "Home", url: siteUrl + "/" },
  { name: "Case studies", url: siteUrl + "/case-studies" },
  { name: s.name, url: pageUrl(s.slug) },
];

export const breadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

// "<" escaped so copy can never close the script tag.
export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
