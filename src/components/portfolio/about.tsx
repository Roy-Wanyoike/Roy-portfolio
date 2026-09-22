"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Github,
  Heart,
  Lightbulb,
  Star,
  Users,
  GitFork,
  Radio,
  CalendarDays,
  Flame,
} from "lucide-react";
import { profile, githubStats } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./reveal";

type GithubLive = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  recentEvents: { type: string; repo: string; detail: string; date: string }[];
  activityWeeks?: { weekStart: string; count: number }[];
};

type HeatmapDay = { date: string; count: number };
type HeatmapData = {
  total: number;
  busiest: number;
  weeks: { days: HeatmapDay[] }[];
};

function cnLive(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

// Local copy for the live language chips (avoids importing the full map)
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00ADD8",
  Python: "#3572A5",
  CSS: "#563d7c",
  Shell: "#89e051",
  HTML: "#e34c26",
  Rust: "#dea584",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function useGithubLive() {
  const [live, setLive] = useState<GithubLive | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d?.ok) {
          setLive({
            publicRepos: d.publicRepos,
            followers: d.followers,
            totalStars: d.totalStars,
            topLanguages: d.topLanguages ?? [],
            recentEvents: d.recentEvents ?? [],
            activityWeeks: d.activityWeeks ?? [],
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return live;
}

// 26-week commit activity — GitHub-style intensity chart from live commit-search data
function CommitActivity({ weeks }: { weeks: { weekStart: string; count: number }[] }) {
  if (!weeks || weeks.length === 0) return null;
  const max = Math.max(1, ...weeks.map((w) => w.count));
  const total = weeks.reduce((a, w) => a + w.count, 0);
  if (total === 0) return null;

  // Intensity tiers (GitHub-like): quiet weeks stay visible next to burst weeks
  const tier = (count: number): string => {
    if (count === 0) return "bg-muted/50";
    const r = count / max;
    if (r < 0.08) return "bg-primary/35";
    if (r < 0.3) return "bg-primary/60";
    if (r < 0.65) return "bg-primary/85";
    return "bg-primary";
  };

  // Month ticks: label the first week of each new month
  const monthLabel = (i: number): string | null => {
    const d = new Date(weeks[i].weekStart);
    if (i === 0) return d.toLocaleDateString(undefined, { month: "short" });
    const prev = new Date(weeks[i - 1].weekStart);
    return d.getMonth() !== prev.getMonth()
      ? d.toLocaleDateString(undefined, { month: "short" })
      : null;
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Commit activity · 26 weeks
        </p>
        <p className="text-[10px] tabular-nums text-muted-foreground/70">
          {total.toLocaleString()} commits
        </p>
      </div>
      <div
        className="flex items-end justify-between gap-[3px] h-10"
        role="img"
        aria-label={`GitHub commits over the last 26 weeks, ${total} total, peak week ${max}`}
      >
        {weeks.map((w, i) => {
          // sqrt scale — low-activity weeks stay visible next to bursts
          const h = Math.max(8, Math.round(Math.sqrt(w.count / max) * 100));
          return (
            <motion.span
              key={w.weekStart}
              initial={{ scaleY: 0, opacity: 0.4 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.012, ease: [0.22, 1, 0.36, 1] }}
              title={`Week of ${new Date(w.weekStart).toLocaleDateString(undefined, { month: "short", day: "numeric" })}: ${w.count} commit${w.count === 1 ? "" : "s"}`}
              className={cnLive(
                "flex-1 max-w-5 origin-bottom rounded-t-[3px] transition-all duration-300 hover:brightness-125 hover:saturate-150",
                tier(w.count),
                w.count > 0 ? "shadow-[inset_0_1px_0_oklch(1_0_0/0.18)]" : "",
              )}
              style={{ height: `${h}%`, minHeight: 2 }}
            />
          );
        })}
      </div>
      {/* Month ticks — same flex rhythm as the bars above */}
      <div className="mt-1 flex justify-between gap-[3px]" aria-hidden="true">
        {weeks.map((w, i) => {
          const label = monthLabel(i);
          return (
            <span
              key={`m-${w.weekStart}`}
              className="flex-1 max-w-5 text-center text-[9px] leading-none text-muted-foreground/60"
            >
              {label ?? ""}
            </span>
          );
        })}
      </div>
      {/* Intensity legend */}
      <div className="mt-1.5 flex items-center justify-end gap-1" aria-hidden="true">
        <span className="text-[9px] text-muted-foreground/60">Less</span>
        {["bg-muted/50", "bg-primary/35", "bg-primary/60", "bg-primary/85", "bg-primary"].map(
          (c) => (
            <span key={c} className={cnLive("size-2 rounded-[2px]", c)} />
          ),
        )}
        <span className="text-[9px] text-muted-foreground/60">More</span>
      </div>
    </div>
  );
}

// Per-day GitHub contribution calendar (53 weeks) — official GitHub-style heatmap,
// fed by /api/github/heatmap (GraphQL contributionsCollection, cached server-side).
function ContributionHeatmap() {
  const [data, setData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(true);
  // Styled tooltip state — coordinates are relative to the CARD (the tooltip
  // renders at card level so the taller week-sparkline never clips inside the
  // 95px-tall grid/scroll container)
  const cardRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{
    x: number;
    y: number;
    count: number;
    date: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/heatmap")
      .then((r) => r.json())
      .then((d: (HeatmapData & { ok?: boolean }) | { ok: false }) => {
        if (
          !cancelled &&
          d?.ok &&
          Array.isArray((d as HeatmapData).weeks) &&
          (d as HeatmapData).weeks.length > 0
        ) {
          setData(d as HeatmapData);
        }
      })
      .catch(() => {
        /* heatmap simply stays hidden on failure */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div
        className="mt-10 glass rounded-2xl p-5"
        role="status"
        aria-label="Loading contribution heatmap"
      >
        <div className="h-4 w-56 rounded bg-muted/70" />
        <div className="mt-4 h-[104px] w-full overflow-hidden rounded-xl bg-muted/50">
          <div className="animate-shimmer h-full w-full" />
        </div>
      </div>
    );
  }
  if (!data) return null;

  const { weeks, total, busiest } = data;
  if (total === 0) return null;

  // Data-adaptive tiers (GitHub-style quartiles over non-zero days) — robust
  // against single-day bursts (e.g. a 594-commit bulk-push day) that would
  // flatten every normal day into one tier with max-relative scaling.
  const counts = weeks
    .flatMap((w) => w.days.map((d) => d.count))
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  const at = (p: number): number =>
    counts.length > 0
      ? counts[Math.min(counts.length - 1, Math.floor(p * counts.length))]
      : 1;
  const t1 = at(0.25);
  const t2 = at(0.5);
  const t3 = at(0.78);
  const tier = (count: number): string => {
    if (count === 0) return "bg-muted/50";
    if (count <= t1) return "bg-primary/35";
    if (count <= t2) return "bg-primary/60";
    if (count <= t3) return "bg-primary/85";
    return "bg-primary";
  };

  const monthLabel = (i: number): string | null => {
    const d0 = weeks[i]?.days?.[0]?.date;
    if (!d0) return null;
    const d = new Date(d0 + "T00:00:00");
    if (i === 0) return d.toLocaleDateString(undefined, { month: "short" });
    const p0 = weeks[i - 1]?.days?.[0]?.date;
    const prev = p0 ? new Date(p0 + "T00:00:00") : d;
    return d.getMonth() !== prev.getMonth()
      ? d.toLocaleDateString(undefined, { month: "short" })
      : null;
  };

  const days = weeks.reduce((a, w) => a + w.days.length, 0);

  // Streak + activity stats — computed from the real calendar data
  const flatDays = weeks.flatMap((w) => w.days);
  const activeDays = flatDays.filter((d) => d.count > 0).length;
  let longestStreak = 0;
  let run = 0;
  for (const d of flatDays) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > longestStreak) longestStreak = run;
  }
  let currentStreak = 0;
  for (let i = flatDays.length - 1; i >= 0 && flatDays[i].count > 0; i--) {
    currentStreak++;
  }
  const activityPct = days > 0 ? Math.round((activeDays / days) * 100) : 0;

  // Event-delegated tooltip: one set of handlers for all 367 cells
  const onGridOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-date]");
    const card = cardRef.current;
    if (!cell || !card) return;
    const cellRect = cell.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    // x relative to the card, clamped so the tooltip never leaves it
    const x = Math.min(
      Math.max(cellRect.left - cardRect.left + cellRect.width / 2, 90),
      cardRect.width - 90,
    );
    const y = cellRect.top - cardRect.top;
    const date = cell.dataset.date ?? "";
    const count = Number(cell.dataset.count ?? 0);
    setTip({ x, y, count, date });
  };

  const tipDate = tip
    ? new Date(tip.date + "T00:00:00").toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // The hovered day's whole week — feeds the mini sparkline in the tooltip
  const tipWeek = tip
    ? weeks.find((w) => w.days.some((d) => d.date === tip.date))?.days ?? null
    : null;

  return (
    <Reveal delay={0.1}>
      <div
        ref={cardRef}
        className="group relative mt-10 glass rounded-2xl p-5 hover:border-primary/40 transition-colors overflow-hidden"
        id="heatmap"
      >
        <div className="absolute -top-16 -right-10 size-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          aria-hidden="true"
        />

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CalendarDays className="size-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Contribution activity
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-400">
            <Radio className="size-2.5 animate-pulse" />
            Live
          </span>
          <p className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="tabular-nums">
              <span className="font-semibold text-foreground">{total.toLocaleString()}</span>{" "}
              contributions · last 12 months
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 tabular-nums">
              <Flame className="size-3.5 text-amber-500 dark:text-amber-400" />
              busiest day {busiest}
            </span>
          </p>
        </div>

        {/* Streak / activity stats — computed live from the real calendar */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            {
              label: "Active days",
              value: `${activityPct}%`,
              sub: `${activeDays} of ${days}`,
            },
            {
              label: "Longest streak",
              value: `${longestStreak}d`,
              sub: "consecutive days",
            },
            {
              label: "Current streak",
              value: `${currentStreak}d`,
              sub: currentStreak > 0 ? "keep it going" : "ship something today",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-muted/40 border border-border/50 px-2.5 py-2 text-center hover:border-primary/30 transition-colors"
            >
              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                {s.label}
              </p>
              <p className="font-display text-base font-bold text-gradient leading-tight tabular-nums">
                {s.value}
              </p>
              <p className="text-[9px] text-muted-foreground/70">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto scrollbar-thin pb-1">
          <div className="flex w-fit min-w-[640px] mx-auto">
            <div className="min-w-0">
              {/* Month labels — aligned over the week columns */}
              <div className="mb-1 flex gap-[3px] pl-[34px]" aria-hidden="true">
                {weeks.map((_, i) => {
                  const label = monthLabel(i);
                  return (
                    <span
                      key={`m-${i}`}
                      className="w-[9px] shrink-0 whitespace-nowrap text-[9px] leading-none text-muted-foreground/60 sm:w-[11px]"
                    >
                      {label ?? ""}
                    </span>
                  );
                })}
              </div>

              <div
                className="relative flex gap-[3px]"
                role="img"
                aria-label={`GitHub contribution calendar for the last 12 months: ${total.toLocaleString()} contributions across ${days} days, busiest day ${busiest} contributions, active on ${activeDays} days.`}
                onMouseOver={onGridOver}
                onMouseLeave={() => setTip(null)}
              >
                {/* Weekday gutter */}
                <div
                  className="flex w-[31px] shrink-0 flex-col gap-[3px]"
                  aria-hidden="true"
                >
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((label, r) => (
                    <span
                      key={r}
                      className="flex h-[9px] items-center justify-end pr-1.5 text-[8px] leading-none text-muted-foreground/60 sm:h-[11px]"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {weeks.map((w, ci) => (
                  <motion.div
                    key={`w-${ci}`}
                    className="flex flex-col gap-[3px]"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(ci * 0.008, 0.4),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {w.days.map((d) => (
                      <span
                        key={d.date}
                        data-date={d.date}
                        data-count={d.count}
                        aria-hidden="true"
                        className={cnLive(
                          "size-[9px] rounded-[2px] ring-1 ring-inset ring-black/[0.04] transition-transform duration-150 hover:scale-125 hover:ring-primary/60 sm:size-[11px]",
                          tier(d.count),
                        )}
                      />
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Styled tooltip — replaces native title, follows the hovered cell.
            A direct child of the CARD (positioned against it via card-relative
            coords) so the week-sparkline popover never clips inside the
            scroll container, with a 7-day week sparkline. */}
        <AnimatePresence>
          {tip ? (
            <HeatTooltip key="heat-tip" tip={tip} date={tipDate} week={tipWeek} />
          ) : null}
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-between gap-2">
          <a
            href={`https://github.com/${githubStats.handle}?tab=overview&from=${weeks[0]?.days?.[0]?.date ?? ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/70 hover:text-primary transition-colors"
          >
            View on GitHub →
          </a>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="text-[9px] text-muted-foreground/60">Less</span>
            {["bg-muted/50", "bg-primary/35", "bg-primary/60", "bg-primary/85", "bg-primary"].map(
              (c) => (
                <span key={c} className={cnLive("size-2 rounded-[2px]", c)} />
              ),
            )}
            <span className="text-[9px] text-muted-foreground/60">More</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// Tooltip body for the contribution heatmap — includes a 7-day week sparkline
// (hovered day highlighted) + week total. Direct child of the card; always
// floats ABOVE the cell (cells sit mid-card, so there is always room).
function HeatTooltip({
  tip,
  date,
  week,
}: {
  tip: { x: number; y: number; count: number; date: string };
  date: string | null;
  week: HeatmapDay[] | null;
}) {
  const weekTotal = week?.reduce((a, d) => a + d.count, 0) ?? 0;
  const maxWeek = Math.max(1, ...(week?.map((d) => d.count) ?? [1]));
  return (
    <motion.div
      initial={{ opacity: 0, y: 3, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 3, scale: 0.96 }}
      transition={{ duration: 0.13, ease: "easeOut" }}
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+9px)] whitespace-nowrap rounded-xl border border-border/70 bg-popover/95 px-3 py-2 shadow-lg backdrop-blur-md"
      style={{ left: tip.x, top: tip.y }}
      role="status"
    >
      <p className="text-[11px] font-semibold leading-tight text-foreground tabular-nums">
        {tip.count === 0
          ? "No contributions"
          : `${tip.count} contribution${tip.count === 1 ? "" : "s"}`}
      </p>
      <p className="text-[10px] leading-tight text-muted-foreground">{date}</p>
      {week ? (
        <>
          <div className="mt-1.5 flex items-end gap-[2px]" aria-hidden="true">
            {week.map((d) => (
              <span
                key={d.date}
                className={cnLive(
                  "w-[7px] rounded-[1.5px]",
                  d.date === tip.date
                    ? "bg-primary"
                    : d.count > 0
                      ? "bg-primary/40"
                      : "bg-muted/60",
                )}
                style={{
                  height:
                    d.count > 0
                      ? Math.max(3, Math.round((d.count / maxWeek) * 14))
                      : 2,
                }}
              />
            ))}
          </div>
          <p className="mt-1 text-[9px] leading-none text-muted-foreground/70 tabular-nums">
            week total {weekTotal}
          </p>
        </>
      ) : null}
      <span
        className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-border/70"
        aria-hidden="true"
      />
    </motion.div>
  );
}

const pillars = [
  {
    icon: Code2,
    title: "Craft",
    description:
      "Clean, tested, maintainable code across the full stack — from low-code enterprise apps to bespoke React/Node services.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Active Qrew community member, conference speaker, and open-source contributor with 100+ public repos.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    description:
      "Always learning — from Quickbase ESP to React Server Components to DevOps practices and data engineering.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description:
      "I build for real users first. Mentoring junior devs and advocating for great DX is core to how I work.",
  },
];

const facts = [
  "Based in Nairobi, Kenya (remote-friendly)",
  "3+ years building, debugging & supporting full-stack apps",
  "Quickbase Professional Builder certified",
  "Healthcare domain — HIPAA-compliant clinical solutions",
  "20+ conference talks (Angular · Next.js · API Security)",
  "Author of 'Beyond Data Risk' technical article",
];

export function About() {
  const live = useGithubLive();
  const repos = live?.publicRepos ?? githubStats.publicRepos;
  const followers = live?.followers ?? githubStats.followers;
  const stars = live?.totalStars;

  return (
    <section id="about" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-dots opacity-30" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: heading + bio */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About Me"
              title={
                <>
                  Building software with{" "}
                  <span className="text-gradient">craft, empathy</span> &amp; curiosity
                </>
              }
            />

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {profile.longSummary.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {facts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: pillar cards */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="grid sm:grid-cols-2 gap-4">
                {pillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      className="group relative glass rounded-2xl p-5 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {p.description}
                      </p>
                      <div className="absolute -bottom-px left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href={`https://github.com/${githubStats.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 block glass rounded-2xl p-5 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Github className="size-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      GitHub Snapshot
                    </span>
                    {live ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-400">
                        <Radio className="size-2.5 animate-pulse" />
                        Live
                      </span>
                    ) : null}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    @{githubStats.handle}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-muted/40 border border-border/50 py-3 hover:border-primary/30 transition-colors">
                    <p className="font-display text-xl font-bold text-gradient">
                      {repos}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Public repos</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 border border-border/50 py-3 hover:border-primary/30 transition-colors">
                    <p className="font-display text-xl font-bold text-gradient">
                      {followers}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Followers</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 border border-border/50 py-3 hover:border-primary/30 transition-colors">
                    {stars !== undefined ? (
                      <>
                        <p className="font-display text-xl font-bold text-gradient inline-flex items-center gap-1">
                          <Star className="size-4 text-amber-400" />
                          {stars}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Total stars</p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-xl font-bold text-gradient inline-flex items-center gap-1">
                          <Star className="size-4 text-amber-400" />
                          33
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Top repo ★</p>
                      </>
                    )}
                  </div>
                </div>
                {live?.topLanguages && live.topLanguages.length > 0 ? (
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {live.topLanguages.map((l) => (
                      <span
                        key={l.name}
                        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"
                      >
                        <span
                          className="inline-block size-2 rounded-full ring-1 ring-white/20"
                          style={{
                            backgroundColor:
                              LANG_COLORS[l.name] ?? "#8b949e",
                          }}
                          aria-hidden="true"
                        />
                        {l.name}
                        <span className="tabular-nums text-[10px] opacity-70">
                          ×{l.count}
                        </span>
                      </span>
                    ))}
                  </div>
                ) : null}
                {live?.activityWeeks && live.activityWeeks.length > 0 &&
                 live.activityWeeks.some((w) => w.count > 0) ? (
                  <CommitActivity weeks={live.activityWeeks} />
                ) : null}
                {live?.recentEvents && live.recentEvents.length > 0 ? (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Recent activity
                    </p>
                    {live.recentEvents.slice(0, 4).map((ev, i) => (
                      <div
                        key={`${ev.repo}-${ev.date}-${i}`}
                        className="flex items-center gap-2 text-[11px] text-muted-foreground"
                      >
                        <span
                          className={cnLive(
                            "inline-block size-1.5 rounded-full shrink-0",
                            ev.type === "push"
                              ? "bg-primary"
                              : ev.type === "create"
                                ? "bg-amber-400"
                                : "bg-teal-400",
                          )}
                          aria-hidden="true"
                        />
                        <span className="font-medium text-foreground/90 truncate max-w-[9rem]">
                          {ev.repo}
                        </span>
                        <span className="truncate">{ev.detail}</span>
                        <span className="ml-auto shrink-0 tabular-nums opacity-60">
                          {relativeTime(ev.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GitFork className="size-3.5" />
                  Shipping across fintech, civic tech, AI infrastructure &amp; open source
                </p>
              </a>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-4 glass rounded-2xl p-5">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{profile.tagline}.&rdquo;
                </p>
                <p className="mt-2 text-xs font-medium text-foreground">
                  — {profile.name}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Full-width GitHub contribution heatmap (per-day, GraphQL) */}
        <ContributionHeatmap />
      </div>
    </section>
  );
}
