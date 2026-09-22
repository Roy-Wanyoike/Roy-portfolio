import { writing, profile } from "@/lib/portfolio-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://roy-portfolio-roywanyoikes-projects.vercel.app";

function escapeXml(value: string): string {
  return value.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c] ?? c,
  );
}

/**
 * RSS 2.0 feed of Roy's writing artifacts (repos, articles, gists, programmes).
 * Served at /feed.xml. Items without an external href link back to the
 * writing section on the site. Per-item pubDate is intentionally omitted —
 * the source data has no verified publication dates (we never fabricate).
 */
export async function GET() {
  const items = writing
    .map((w) => {
      const link = w.href ?? `${SITE_URL}/#writing`;
      return `    <item>
      <title>${escapeXml(w.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="${w.href ? "true" : "false"}">${escapeXml(link)}</guid>
      <description>${escapeXml(w.description)}</description>
      <category>${escapeXml(w.kind)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profile.name)} — Writing &amp; Notes</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(
      `Articles, guides and open-source writing by ${profile.name} — ${profile.title} based in ${profile.location}.`,
    )}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
