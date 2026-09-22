"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Star,
  GitFork,
  ExternalLink,
  Sparkles,
  Search,
  X,
  Flame,
  CalendarDays,
} from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Platform",
  "Fintech",
  "AI & Data",
  "Open Source",
  "App",
  "Learning",
] as const;
type Category = (typeof categories)[number];

const PAGE_SIZE = 9;

const statusStyles: Record<string, string> = {
  Production: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "In Development": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Learning: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

function StatusDot({ status }: { status: string }) {
  const color =
    status === "Production"
      ? "bg-emerald-400"
      : status === "In Development"
        ? "bg-amber-400"
        : "bg-sky-400";
  return (
    <span className="relative flex size-1.5">
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          color,
        )}
      />
      <span className={cn("relative inline-flex size-1.5 rounded-full", color)} />
    </span>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col glass rounded-2xl hover:border-primary/40 transition-colors overflow-hidden",
        featured ? "p-6 sm:p-7" : "p-6",
      )}
    >
      {/* Decorative gradient */}
      <div className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shrink-0",
              featured ? "size-13 p-3" : "size-12",
            )}
          >
            <span className="font-display text-lg font-bold">
              {project.name.charAt(0)}
            </span>
          </div>
          {project.status ? (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                statusStyles[project.status] ?? "bg-muted text-muted-foreground border-border",
              )}
            >
              <StatusDot status={project.status} />
              {project.status}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {project.stars ? (
            <span className="inline-flex items-center gap-1 rounded-full glass px-2 py-0.5 text-xs text-muted-foreground">
              <Star className="size-3 text-amber-400" />
              {project.stars}
            </span>
          ) : null}
          {project.forks ? (
            <span className="inline-flex items-center gap-1 rounded-full glass px-2 py-0.5 text-xs text-muted-foreground">
              <GitFork className="size-3" />
              {project.forks}
            </span>
          ) : null}
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {project.category}
          </span>
        </div>
      </div>

      <div className="relative flex-1">
        <h3
          className={cn(
            "font-display font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1",
            featured ? "text-xl" : "text-lg",
          )}
        >
          <span className="truncate">{project.name}</span>
          <ArrowUpRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
        </h3>
        <p className="mt-1 text-sm text-primary font-medium">{project.tagline}</p>

        {/* Impact line — metrics up top, scannable in 3 seconds */}
        {project.impact ? (
          <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-foreground bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1.5">
            <Sparkles className="size-3.5 text-primary mt-0.5 shrink-0" />
            <span className="leading-relaxed">{project.impact}</span>
          </p>
        ) : null}

        <p
          className={cn(
            "mt-3 text-sm text-muted-foreground leading-relaxed",
            featured ? "line-clamp-3" : "line-clamp-3",
          )}
        >
          {project.description}
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
          {project.year ? (
            <>
              <CalendarDays className="size-3" />
              {project.year}
            </>
          ) : (
            "github.com/Roy-Wanyoike"
          )}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
          View repo
          <ExternalLink className="size-3" />
        </span>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.impact?.toLowerCase().includes(q) ?? false),
    );
  }, [query]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? searched
        : searched.filter((p) => p.category === filter),
    [filter, searched],
  );

  const featured = useMemo(
    () => searched.filter((p) => p.featured).slice(0, 3),
    [searched],
  );
  const featuredNames = useMemo(
    () => new Set(featured.map((p) => p.name)),
    [featured],
  );

  const showFeatured = filter === "All" && !query && featured.length === 3;

  // Avoid duplicates: hide showcased projects from the main grid in default view
  const visible = (
    showAll ? filtered : filtered.slice(0, PAGE_SIZE)
  ).filter((p) => !showFeatured || !featuredNames.has(p.name));
  const hasMore = filtered.length > PAGE_SIZE;

  return (
    <section id="projects" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-emerald-950/10 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              {projects.length}+ open-source &amp;{" "}
              <span className="text-gradient">side projects</span>
            </>
          }
          description="From payment switches and AI contact-center operating systems to CSS frameworks and data pipelines — a selection of what I've been building."
          align="center"
        />

        {/* Search + filter toolbar */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowAll(true);
                }}
                placeholder="Search projects, stacks, tags…"
                aria-label="Search projects"
                className="w-full h-11 rounded-full glass pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => {
                const count =
                  c === "All" ? projects.length : (counts.get(c) ?? 0);
                if (c !== "All" && count === 0) return null;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                      filter === c
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "glass text-muted-foreground hover:text-foreground hover:border-primary/30",
                    )}
                  >
                    {c}
                    <span
                      className={cn(
                        "ml-1.5 text-xs tabular-nums",
                        filter === c
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground/70",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Featured showcase — first impression */}
        {showFeatured ? (
          <Reveal delay={0.15}>
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4 justify-center">
                <Flame className="size-4 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Featured Work
                </h3>
              </div>
              <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((p) => (
                  <RevealItem key={`feat-${p.name}`}>
                    <ProjectCard project={p} featured />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        ) : null}

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </AnimatePresence>
        </RevealGroup>

        {filtered.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground">
            <p className="text-sm">
              No projects match &ldquo;{query}&rdquo;
              {filter !== "All" ? ` in ${filter}` : ""}. Try a different search.
            </p>
          </div>
        ) : null}

        {hasMore ? (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              {showAll
                ? "Show less"
                : `Show all ${filtered.length} projects`}
              <ArrowUpRight
                className={cn("size-4 transition-transform", showAll && "rotate-90")}
              />
            </button>
          </div>
        ) : null}

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href="https://github.com/Roy-Wanyoike?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              See all 110 repositories on GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
