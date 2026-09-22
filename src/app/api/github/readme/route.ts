import { NextRequest, NextResponse } from "next/server";

/**
 * README excerpt per project modal — fetches the repo README via the GitHub REST API
 * (raw accept header) and distills the first meaningful prose paragraph.
 *
 * Hygiene: strict slug regex, 6h in-memory cache, GITHUB_TOKEN support,
 * graceful {ok:false} so the modal block simply stays hidden on any failure.
 */

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60 * 6; // 6 hours — READMEs change rarely
const MAX_CACHE = 60;
const MAX_LEN = 380;

const cache = new Map<string, { excerpt: string; ts: number }>();

function ghHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.raw+json",
    "User-Agent": "roy-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

/** A line made entirely of links/badges + separators (anchor nav rows, badge rows). */
const LINK_ONLY_LINE =
  /^\s*(?:\[(?:[^\]]*)\]\([^)]*\)|!\[[^\]]*\]\([^)]*\))(?:\s*(?:·|—|\||,|\/)?\s*(?:\[(?:[^\]]*)\]\([^)]*\)|!\[[^\]]*\]\([^)]*\)))*\s*$/;

function isTitleLike(s: string): boolean {
  // Short, no sentence punctuation — likely a redundant title/tagline
  return s.length < 60 && !/[.!?;:]$/.test(s.replace(/\s+/g, " ").trim());
}

function excerptFrom(raw: string): string | null {
  let md = raw
    .replace(/\r\n/g, "\n")
    // front matter
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    // HTML comments
    .replace(/<!--[\s\S]*?-->/g, "")
    // fenced code blocks
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");

  // <img> tags out; <br> becomes a newline; then strip remaining tags
  md = md
    .replace(/<img[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  const lines = md.split("\n").filter((line) => {
    const t = line.trim();
    if (!t) return true; // keep blank lines as paragraph separators
    if (LINK_ONLY_LINE.test(t)) return false; // badge rows / anchor nav
    if (t.startsWith("|")) return false; // table rows
    if (t.startsWith("#")) return false; // headings (name/tagline already in modal)
    if (/(shields\.io|badgen|circleci|travis-ci)/i.test(t)) return false;
    return true;
  });

  // Inline images (badges) out, links to their text, reference defs out
  let text = lines
    .join("\n")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    .replace(/^\s*\[[^\]]*\]:\s*\S+.*$/gm, "");

  // Markdown decoration → plain text
  text = text
    .replace(/^(\s*)>+\s?/gm, "$1")
    .replace(/^(\s*)[-*+]\s+/gm, "$1")
    .replace(/^(\s*)\d+\.\s+/gm, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1");

  // First meaningful prose paragraph
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => {
      if (p.length < 80) return false; // skip taglines/one-liners
      if ((p.match(/·/g) ?? []).length >= 3) return false; // feature keyword rows
      if ((p.match(/→/g) ?? []).length >= 3 && p.length < 160) return false; // pipeline taglines
      if (/^[A-Z0-9 /&+.-]+$/.test(p) && p.length < 120) return false;
      return true;
    });

  const pick = paragraphs[0];
  if (!pick) return null;
  if (pick.length <= MAX_LEN) return pick;
  const cut = pick.slice(0, MAX_LEN);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get("repo")?.trim() ?? "";

  if (!repo || !/^[A-Za-z0-9._-]{1,100}$/.test(repo)) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid repo parameter." },
      { status: 400 }
    );
  }

  const key = repo.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL_MS) {
    return NextResponse.json(
      { ok: true, cached: true, repo, excerpt: hit.excerpt },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(repo)}/readme`,
      { headers: ghHeaders(), cache: "no-store", signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: `GitHub API error: ${res.status}` });
    }

    const raw = await res.text();
    const excerpt = excerptFrom(raw);
    if (!excerpt) {
      return NextResponse.json({ ok: true, repo, excerpt: null });
    }

    if (cache.size >= MAX_CACHE) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0][0];
      cache.delete(oldest);
    }
    cache.set(key, { excerpt, ts: Date.now() });

    return NextResponse.json(
      { ok: true, cached: false, repo, excerpt },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "GitHub unavailable." });
  }
}
