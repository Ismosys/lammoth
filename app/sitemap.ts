import type { MetadataRoute } from "next";
import { releases } from "@/content/releases";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/music", "/archives", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const releaseRoutes = releases.map((r) => ({
    url: `${site.url}/music/${r.slug}`,
    lastModified: new Date(r.releaseDate),
    changeFrequency: "yearly" as const,
    priority: r.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...releaseRoutes];
}
