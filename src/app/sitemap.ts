import type { MetadataRoute } from "next";

const SITE_URL = "https://roy-portfolio-roywanyoikes-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
