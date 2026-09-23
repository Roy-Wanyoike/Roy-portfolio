import type { MetadataRoute } from "next";

// PWA manifest — Next serves this at /manifest.webmanifest and injects
// <link rel="manifest"> automatically. Colors match the site brand
// (emerald oklch(0.55 0.13 165) accent, oklch(0.14 0.015 175) dark bg).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Royford Wanyoike Wamaitha — Software Engineer",
    short_name: "Roy Wanyoike",
    description:
      "Nairobi-based Software Engineer & Quickbase Solutions Engineer — portfolio, projects, writing and talks.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#040b09",
    theme_color: "#00885e",
    lang: "en",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
