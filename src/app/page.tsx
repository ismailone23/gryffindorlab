import App from "@/App";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { serviceList } from "@/components/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gryffindorlab | Creative Studio",
    description:
      "Gryffindorlab is a creative studio in Bangladesh: web design and website development, video editing, graphic design, branding and animation for clients worldwide.",
    siteName: "Gryffindorlab",
    locale: "en_US",
    type: "website",
    url: siteUrl + "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gryffindorlab — Good ideas. Made real.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gryffindorlab",
  url: siteUrl,
  logo: siteUrl + "/favicon.png",
  email: "info@gryffindorlab.com",
  image: siteUrl + "/og-image.png",
  description:
    "Gryffindorlab is a creative studio in Bangladesh: web design and website development, video editing, graphic design, branding and animation for clients worldwide.",
  address: { "@type": "PostalAddress", addressCountry: "BD" },
  areaServed: ["Bangladesh", "Worldwide"],
  knowsAbout: [
    "Web design",
    "Web development",
    "Video editing",
    "Graphic design",
    "Branding",
    "Animation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative services",
    itemListElement: serviceList.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.makes,
        areaServed: "Bangladesh",
      },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <App />
    </>
  );
}
