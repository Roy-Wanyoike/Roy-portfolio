import { NextResponse } from "next/server";

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60; // 1 hour — friendly to GitHub rate limits

type GithubSnapshot = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  recentEvents: GithubEvent[];
  activityWeeks: { weekStart: string; count: number }[];
  fetchedAt: string;
};

type GithubEvent = {
  type: string;
  repo: string;
  detail: string;
  date: string;
};

// In-memory cache (per server instance) — avoids hammering the GitHub API
let cache: { data: GithubSnapshot; ts: number } | null = null;

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

function humanizeEvent(e: {
  type: string;
  repo: { name: string };
  payload?: { commits?: unknown[]; ref_type?: string; ref?: string; action?: string };
  created_at: string;
}): GithubEvent | null {
  const repo = e.repo.name.replace("Roy-Wanyoike/", "");
  const date = e.created_at;
  switch (e.type) {
    case "PushEvent": {
      const n = e.payload?.commits?.length ?? 1;
      return { type: "push", repo, detail: `pushed ${n} commit${n > 1 ? "s" : ""}`, date };
    }
    case "CreateEvent":
      return {
        type: "create",
        repo,
        detail: `created ${e.payload?.ref_type ?? "repo"}${e.payload?.ref ? ` (${e.payload.ref})` : ""}`,
        date,
      };
    case "ReleaseEvent":
      return { type: "release", repo, detail: "published a release", date };
    case "PublicEvent":
      return { type: "open-source", repo, detail: "made the repo public", date };
    case "ForkEvent":
      return { type: "fork", repo, detail: "forked a repository", date };
    default:
      return null;
  }
}

async function fetchWeeklyCommits(): Promise<
  { weekStart: string; count: number }[]
> {
  const WEEKS = 26;
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  // 26 rolling 7-day buckets, the last one ending "now"
  const weeks = Array.from({ length: WEEKS }, (_, i) => {
    const end = now - (WEEKS - 1 - i) * weekMs;
    return { start: new Date(end - weekMs), end: new Date(end) };
  });

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const counts: number[] = new Array(WEEKS).fill(0);

  // Fetch in small waves with a pause between them — 26 simultaneous search
  // requests would risk GitHub's secondary rate limits; per-week failure → 0.
  // 3 waves ≈ 5-6s cold — stays clear of Vercel's ~10s function budget.
  const WAVE = 9;
  const PAUSE_MS = 1500;
  for (let i = 0; i < WEEKS; i += WAVE) {
    const slice = weeks.slice(i, i + WAVE);
    const waveCounts = await Promise.all(
      slice.map(async ({ start, end }) => {
        try {
          const q = `author:${GITHUB_USER} author-date:${fmt(start)}..${fmt(end)}`;
          const res = await fetch(
            `https://api.github.com/search/commits?q=${encodeURIComponent(q)}&per_page=1`,
            { headers: ghHeaders(), cache: "no-store" }
          );
          if (!res.ok) return 0;
          const data = (await res.json()) as { total_count?: number };
          return data.total_count ?? 0;
        } catch {
          return 0; // best-effort: a failed week just renders as empty
        }
      })
    );
    waveCounts.forEach((c, j) => {
      counts[i + j] = c;
    });
    if (i + WAVE < WEEKS) {
      await new Promise((r) => setTimeout(r, PAUSE_MS));
    }
  }

  return weeks.map((w, i) => ({ weekStart: w.start.toISOString(), count: counts[i] }));
}

async function fetchGithub(): Promise<GithubSnapshot> {
  const [userRes, reposRes, ...eventsResList] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: ghHeaders(),
      cache: "no-store",
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`,
      { headers: ghHeaders(), cache: "no-store" }
    ),
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`, {
      headers: ghHeaders(),
      cache: "no-store",
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=2`,
      { headers: ghHeaders(), cache: "no-store" }
    ),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=3`,
      { headers: ghHeaders(), cache: "no-store" }
    ),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API error: ${userRes.status}/${reposRes.status}`);
  }
  const user = (await userRes.json()) as {
    public_repos: number;
    followers: number;
  };
  const repos = (await reposRes.json()) as {
    stargazers_count: number;
    language: string | null;
  }[];

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

  // Recent public activity (best-effort — never blocks the rest of the snapshot)
  let recentEvents: GithubEvent[] = [];
  if (eventsResList[0].ok) {
    try {
      const events = (await eventsResList[0].json()) as Parameters<
        typeof humanizeEvent
      >[0][];
      recentEvents = events
        .map(humanizeEvent)
        .filter((e): e is GithubEvent => e !== null)
        .slice(0, 5);
    } catch {
      recentEvents = [];
    }
  }

  // 12-week commit pulse — real per-week commit totals via the commit search API.
  // Each week is one cheap per_page=1 request; total_count is exact even >100.
  const activityWeeks = await fetchWeeklyCommits();

  const langCount = new Map<string, number>();
  for (const r of repos) {
    if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
  }
  const topLanguages = [...langCount.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLanguages,
    recentEvents,
    activityWeeks,
    fetchedAt: new Date().toISOString(),
  };
}

export async function GET() {
  // Serve from cache when fresh
  if (cache && Date.now() - cache.ts < TTL_MS) {
    return NextResponse.json(
      { ok: true, cached: true, ...cache.data },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  }

  try {
    const data = await fetchGithub();
    // Throttle guard: if a refresh returns all-zero activity (GitHub search
    // secondary limit), keep the last known-good weeks instead of caching zeros.
    const hadGood = cache?.data.activityWeeks?.some((w) => w.count > 0) ?? false;
    const gotBad = !data.activityWeeks.some((w) => w.count > 0);
    if (hadGood && gotBad) {
      data.activityWeeks = cache!.data.activityWeeks;
    }
    cache = { data, ts: Date.now() };
    return NextResponse.json(
      { ok: true, cached: false, ...data },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } catch {
    // Graceful degradation: client keeps its static fallback values.
    // If we have any previous good data, serve it stale instead of failing.
    if (cache) {
      return NextResponse.json(
        { ok: true, cached: true, stale: true, ...cache.data },
        { headers: { "Cache-Control": "public, max-age=60" } }
      );
    }
    return NextResponse.json(
      { ok: false, error: "GitHub is unavailable right now." },
      { status: 200 }
    );
  }
}
