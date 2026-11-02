import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { serviceSlugs } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl + "/", priority: 1, changeFrequency: "monthly" },
    {
      url: siteUrl + "/case-studies",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    ...serviceSlugs.map((slug) => ({
      url: `${siteUrl}/case-studies/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];
}
