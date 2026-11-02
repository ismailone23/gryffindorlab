import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { services, serviceSlugs, type ServiceSlug } from "@/content/services";
import { pageUrl } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) return {};
  const title = `${service.name} Services in Bangladesh | Gryffindorlab`;
  const url = pageUrl(slug);
  return {
    title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: service.description,
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
      description: service.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) notFound();
  return <ServicePage service={service} />;
}
