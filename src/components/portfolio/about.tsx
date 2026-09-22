"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

// 12-week activity pulse — tiny bar sparkline from live GitHub events
function ActivityPulse({ weeks }: { weeks: { weekStart: string; count: number }[] }) {
  if (!weeks || weeks.length === 0) return null;
  const max = Math.max(1, ...weeks.map((w) => w.count));
  const total = weeks.reduce((a, w) => a + w.count, 0);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          12-week commit pulse
        </p>
        <p className="text-[10px] tabular-nums text-muted-foreground/70">
          {total} commits · 12 wks
        </p>
      </div>
      <div className="flex items-end justify-between gap-[3px] h-8" role="img" aria-label={`GitHub commits over the last 12 weeks, ${total} total`}>
        {weeks.map((w, i) => {
          // sqrt scale — keeps low-activity weeks visible next to burst weeks
          const h = Math.max(10, Math.round(Math.sqrt(w.count / max) * 100));
          const isLast = i === weeks.length - 1;
          return (
            <span
              key={w.weekStart}
              title={`Week of ${new Date(w.weekStart).toLocaleDateString(undefined, { month: "short", day: "numeric" })}: ${w.count} commits`}
              className={cnLive(
                "flex-1 max-w-6 rounded-t-sm transition-all duration-300 hover:opacity-100",
                isLast ? "bg-primary" : "bg-primary/50 hover:bg-primary/80",
              )}
              style={{ height: `${h}%`, minHeight: w.count > 0 ? undefined : 2 }}
            />
          );
        })}
      </div>
    </div>
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
                  <ActivityPulse weeks={live.activityWeeks} />
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
      </div>
    </section>
  );
}
