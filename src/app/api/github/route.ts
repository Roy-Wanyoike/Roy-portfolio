import { NextResponse } from "next/server";

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60; // 1 hour — friendly to GitHub rate limits

type GithubSnapshot = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  recentEvents: GithubEvent[];
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

async function fetchGithub(): Promise<GithubSnapshot> {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: ghHeaders(),
      cache: "no-store",
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`,
      { headers: ghHeaders(), cache: "no-store" }
    ),
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`, {
      headers: ghHeaders(),
      cache: "no-store",
    }),
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
  if (eventsRes.ok) {
    try {
      const events = (await eventsRes.json()) as Parameters<typeof humanizeEvent>[0][];
      recentEvents = events
        .map(humanizeEvent)
        .filter((e): e is GithubEvent => e !== null)
        .slice(0, 5);
    } catch {
      recentEvents = [];
    }
  }

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
    cache = { data, ts: Date.now() };
    return NextResponse.json(
      { ok: true, cached: false, ...data },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } catch {
    // Graceful degradation: client keeps its static fallback values
    return NextResponse.json(
      { ok: false, error: "GitHub is unavailable right now." },
      { status: 200 }
    );
  }
}
