import { NextRequest, NextResponse } from "next/server";

/**
 * Per-repo activity metadata for project modals — pushes `pushed_at` (last real
 * activity on the default branch) so recruiters can see a project is alive.
 * Minimal repo fetch, 6h cache, GITHUB_TOKEN support, graceful {ok:false}.
 */

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const MAX_CACHE = 60;

type RepoMeta = { pushedAt: string; archived: boolean };

const cache = new Map<string, { data: RepoMeta; ts: number }>();

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
      { ok: true, cached: true, repo, ...hit.data },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(repo)}`,
      { headers: ghHeaders(), cache: "no-store", signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: `GitHub API error: ${res.status}` });
    }

    const json = (await res.json()) as {
      pushed_at?: string;
      archived?: boolean;
    };
    if (!json.pushed_at) {
      return NextResponse.json({ ok: false, error: "No pushed_at in response." });
    }

    const data: RepoMeta = {
      pushedAt: json.pushed_at,
      archived: Boolean(json.archived),
    };

    if (cache.size >= MAX_CACHE) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0][0];
      cache.delete(oldest);
    }
    cache.set(key, { data, ts: Date.now() });

    return NextResponse.json(
      { ok: true, cached: false, repo, ...data },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "GitHub unavailable." });
  }
}
