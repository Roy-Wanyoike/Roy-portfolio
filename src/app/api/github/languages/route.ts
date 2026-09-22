import { NextRequest, NextResponse } from "next/server";
import { languageColors } from "@/lib/portfolio-data";

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60 * 6; // 6 hours — repo languages change rarely
const MAX_CACHE = 60;

type LangSlice = { name: string; pct: number; color: string };

// In-memory cache per repo slug (per server instance)
const cache = new Map<string, { data: LangSlice[]; ts: number }>();

function ghHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "roy-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get("repo")?.trim() ?? "";

  // Strict allow-list — only the repo shapes that exist in the portfolio data
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
      { ok: true, cached: true, repo, languages: hit.data },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(repo)}/languages`,
      { headers: ghHeaders(), cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `GitHub API error: ${res.status}` },
        { status: 200 }
      );
    }
    const bytes = (await res.json()) as Record<string, number>;
    const total = Object.values(bytes).reduce((a, b) => a + b, 0);
    if (!total) {
      return NextResponse.json({ ok: true, repo, languages: [] });
    }

    const languages: LangSlice[] = Object.entries(bytes)
      .map(([name, b]) => ({
        name,
        pct: Math.round((b / total) * 1000) / 10,
        color: languageColors[name] ?? "#8b949e",
      }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 6);

    if (cache.size >= MAX_CACHE) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0][0];
      cache.delete(oldest);
    }
    cache.set(key, { data: languages, ts: Date.now() });

    return NextResponse.json(
      { ok: true, cached: false, repo, languages },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  } catch {
    // Graceful degradation: client simply hides the language bar
    return NextResponse.json(
      { ok: false, error: "GitHub is unavailable right now." },
      { status: 200 }
    );
  }
}
