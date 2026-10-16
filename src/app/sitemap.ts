import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview-only case studies remain noindex until real projects are published.
  return [{ url: siteUrl + "/", priority: 1, changeFrequency: "monthly" }];
}
