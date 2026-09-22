import { NextResponse } from "next/server";

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60; // 1 hour — friendly to GitHub rate limits

type GithubSnapshot = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  fetchedAt: string;
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

async function fetchGithub(): Promise<GithubSnapshot> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: ghHeaders(),
      cache: "no-store",
    }),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`,
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
