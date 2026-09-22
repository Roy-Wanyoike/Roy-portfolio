import { NextRequest, NextResponse } from "next/server";

/**
 * Per-day GitHub contribution calendar (53 weeks) via GraphQL contributionsCollection.
 * Feeds the GitHub-style heatmap in the About section.
 *
 * Resilience (lessons from the Task-8 throttle guard):
 *  - 1h in-memory cache absorbs repeat visits and shields the GraphQL rate limit.
 *  - Stale-on-error: a transient GitHub outage serves last-known-good data.
 *  - All-zero guard: a degraded/partial response never overwrites good cached data.
 */

const GITHUB_USER = "Roy-Wanyoike";
const TTL_MS = 1000 * 60 * 60; // 1 hour — calendar changes at most daily
const MAX_WEEKS = 53;

type Day = { date: string; count: number };
type Week = { days: Day[] };
type Calendar = { total: number; weeks: Week[]; busiest: number };

const cache: { data: Calendar | null; ts: number } = { data: null, ts: 0 };

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

export async function GET(_request: NextRequest) {
  const now = Date.now();

  if (cache.data && now - cache.ts < TTL_MS) {
    return NextResponse.json(
      { ok: true, cached: true, ...cache.data },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "roy-portfolio",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USER } }),
      cache: "no-store",
      // Keep under Vercel's function budget even on a slow GitHub round-trip
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);

    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number;
              weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
            };
          };
        };
      };
      errors?: unknown;
    };

    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal || !Array.isArray(cal.weeks) || cal.weeks.length === 0) {
      throw new Error("Empty contribution calendar");
    }

    const weeks: Week[] = cal.weeks.slice(-MAX_WEEKS).map((w) => ({
      days: (w.contributionDays ?? []).map((d) => ({
        date: d.date,
        count: d.contributionCount ?? 0,
      })),
    }));

    const total =
      cal.totalContributions ||
      weeks.reduce((a, w) => a + w.days.reduce((x, d) => x + d.count, 0), 0);
    const busiest = weeks.reduce(
      (a, w) => Math.max(a, ...w.days.map((d) => d.count)),
      0
    );

    const data: Calendar = { total, weeks, busiest };

    // Throttle/degradation guard: never cache an all-zero calendar over good data
    const previousNonEmpty = cache.data && cache.data.total > 0;
    if (!(total === 0 && previousNonEmpty)) {
      cache.data = data;
      cache.ts = now;
    }

    return NextResponse.json(
      { ok: true, cached: false, ...data },
      { headers: { "Cache-Control": "public, max-age=600" } }
    );
  } catch {
    // Stale-on-error: serve last-known-good calendar if we have one
    if (cache.data) {
      return NextResponse.json(
        { ok: true, cached: true, stale: true, ...cache.data },
        { headers: { "Cache-Control": "public, max-age=120" } }
      );
    }
    // Graceful degradation: client hides the heatmap entirely
    return NextResponse.json({ ok: false });
  }
}
