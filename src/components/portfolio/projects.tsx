"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Terminal,
  FolderGit2,
  BookOpen,
  Clock3,
  Globe,
} from "lucide-react";
import { projects, projectLanguages, languageColors, type Project } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type LangSlice = { name: string; pct: number; color: string };
type PreviewState = "loading" | "ok" | "error";
type RepoMeta = { pushedAt: string; archived: boolean };

/** Honest freshness label from the repo's real pushed_at — no fabrication. */
function updatedLabel(iso: string): string | null {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  const days = Math.floor((Date.now() - t) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 18) return `${months}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

function repoSlug(p: Project): string | null {
  try {
    const parts = p.href.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];
    return /^[A-Za-z0-9._-]+$/.test(slug) ? slug : null;
  } catch {
    return null;
  }
}

/** GitHub's social-preview OG image — always available for public repos. */
function repoPreviewUrl(slug: string): string {
  return `https://opengraph.githubassets.com/1/Roy-Wanyoike/${slug}`;
}

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
  Production:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  "In Development":
    "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Learning: "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
};

function StatusDot({ status }: { status: string }) {
  const color =
    status === "Production"
      ? "bg-emerald-500 dark:bg-emerald-400"
      : status === "In Development"
        ? "bg-amber-500 dark:bg-amber-400"
        : "bg-sky-500 dark:bg-sky-400";
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

function LanguageDot({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block size-2.5 rounded-full ring-1 ring-black/10 dark:ring-white/20"
        style={{ backgroundColor: languageColors[name] ?? "#8b949e" }}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}

function ProjectCard({
  project,
  featured,
  pushedAt,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  pushedAt?: string;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      aria-label={`View details of ${project.name}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col w-full text-left glass rounded-2xl hover:border-primary/40 transition-colors overflow-hidden cursor-pointer",
        featured ? "p-6 sm:p-7" : "p-6",
      )}
    >
      {/* Cursor spotlight — emerald radial glow that tracks the pointer */}
      <span className="card-spotlight" aria-hidden="true" />
      {/* Gradient top hairline sweeps in on hover */}
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      {/* Decorative gradient */}
      <div className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shrink-0 group-hover:scale-105 transition-transform",
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
              <Star className="size-3 text-amber-500 dark:text-amber-400" />
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
        <span className="text-xs text-muted-foreground flex items-center gap-2">
          {projectLanguages[project.name] ? (
            <LanguageDot name={projectLanguages[project.name]} />
          ) : null}
          {project.year ? (
            <span className="font-mono flex items-center gap-1">
              <CalendarDays className="size-3" />
              {project.year}
            </span>
          ) : null}
          {pushedAt ? (
            <span
              className="hidden sm:inline-flex font-mono items-center gap-1 text-[11px] text-muted-foreground/80"
              title={
                "Last push: " +
                new Date(pushedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }
            >
              <Clock3 className="size-3 text-emerald-600 dark:text-emerald-400" />
              {updatedLabel(pushedAt)}
            </span>
          ) : null}
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-medium">
          {project.liveUrl ? (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
              title="Live deployment available — open the details to try it"
            >
              <Globe className="size-3" />
              Live
            </span>
          ) : null}
          Details
          <ArrowUpRight className="size-3" />
        </span>
      </div>
    </motion.button>
  );
}

function ProjectDetailModal({
  project,
  pushedAt,
  onClose,
}: {
  project: Project | null;
  pushedAt?: string;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg gap-0 rounded-2xl border-primary/20 bg-card/95 p-0 shadow-2xl backdrop-blur-xl overflow-hidden max-h-[85vh] overflow-y-auto"
        showCloseButton
      >
        {project ? (
          <ProjectModalBody
            key={project.name}
            project={project}
            pushedAt={pushedAt}
            onClose={onClose}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Remounts per project (keyed by name above) so language-fetch state
 * resets cleanly without sync setState in effects.
 */
function ProjectModalBody({
  project,
  pushedAt,
  onClose,
}: {
  project: Project;
  pushedAt?: string;
  onClose: () => void;
}) {
  const slug = repoSlug(project);
  const [langSlices, setLangSlices] = useState<LangSlice[] | null>(null);
  const [langLoading, setLangLoading] = useState<boolean>(!!slug);
  const [readme, setReadme] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState<boolean>(!!slug);
  // Seeded from the snapshot map when available — skips the per-open fetch
  const [meta, setMeta] = useState<RepoMeta | null>(
    pushedAt ? { pushedAt, archived: false } : null,
  );
  const [preview, setPreview] = useState<PreviewState>("loading");
  const { toast } = useToast();

  const cloneCommand = slug
    ? `git clone https://github.com/Roy-Wanyoike/${slug}.git`
    : null;

  const copyClone = useCallback(async () => {
    if (!cloneCommand) return;
    try {
      await navigator.clipboard.writeText(cloneCommand);
      toast({ title: "Clone command copied", description: cloneCommand });
    } catch {
      // Legacy fallback — Safari without focus, non-secure contexts, older browsers
      try {
        const ta = document.createElement("textarea");
        ta.value = cloneCommand;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) {
          toast({ title: "Clone command copied", description: cloneCommand });
          return;
        }
        throw new Error("execCommand returned false");
      } catch {
        toast({
          title: "Copy blocked by browser",
          description: "Run manually: " + cloneCommand,
        });
      }
    }
  }, [cloneCommand, toast]);

  // Live language breakdown — fetched per repo when the modal opens
  useEffect(() => {
    if (!slug) return;
    const ctrl = new AbortController();
    fetch(`/api/github/languages?repo=${encodeURIComponent(slug)}`, {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data: { ok?: boolean; languages?: LangSlice[] }) => {
        if (data?.ok && Array.isArray(data.languages) && data.languages.length > 0) {
          setLangSlices(data.languages);
        }
      })
      .catch(() => {
        /* aborted or failed — bar simply stays hidden */
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLangLoading(false);
      });
    return () => ctrl.abort();
  }, [slug]);

  // README excerpt — first meaningful prose paragraph, distilled server-side
  useEffect(() => {
    if (!slug) return;
    const ctrl = new AbortController();
    fetch(`/api/github/readme?repo=${encodeURIComponent(slug)}`, {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data: { ok?: boolean; excerpt?: string | null }) => {
        if (data?.ok && typeof data.excerpt === "string" && data.excerpt.length > 0) {
          setReadme(data.excerpt);
        }
      })
      .catch(() => {
        /* aborted or failed — block simply stays hidden */
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setReadmeLoading(false);
      });
    return () => ctrl.abort();
  }, [slug]);

  // Repo activity — real pushed_at for the "Updated" chip (skipped when the
  // snapshot map already provided it)
  useEffect(() => {
    if (pushedAt || !slug) return;
    const ctrl = new AbortController();
    fetch(`/api/github/repo-meta?repo=${encodeURIComponent(slug)}`, {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data: { ok?: boolean; pushedAt?: string; archived?: boolean }) => {
        if (data?.ok && typeof data.pushedAt === "string") {
          setMeta({ pushedAt: data.pushedAt, archived: Boolean(data.archived) });
        }
      })
      .catch(() => {
        /* chip simply stays hidden */
      });
    return () => ctrl.abort();
  }, [slug, pushedAt]);

  return (
    <div className="relative">
            {/* Ambient header glow */}
            <div className="absolute -top-20 -right-16 size-44 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <span
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
              aria-hidden="true"
            />

            <div className="relative p-6 pb-5">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary border border-primary/25 shrink-0">
                  <span className="font-display text-xl font-bold">
                    {project.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle asChild>
                    <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
                      {project.name}
                    </h3>
                  </DialogTitle>
                  <p className="mt-0.5 text-sm text-primary font-medium">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Repository social preview (GitHub OG image, 2:1) */}
              {slug ? (
                <div
                  className="group/preview relative mt-4 aspect-[2/1] overflow-hidden rounded-xl border border-border/60 bg-muted/50"
                  data-preview-state={preview}
                >
                  {preview === "loading" ? (
                    <div
                      className="absolute inset-0 animate-shimmer"
                      role="status"
                      aria-label="Loading repository preview"
                    />
                  ) : null}
                  <img
                    src={repoPreviewUrl(slug)}
                    alt={`${project.name} — repository preview image`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onLoad={() => setPreview("ok")}
                    onError={() => setPreview("error")}
                    className={cn(
                      "h-full w-full object-cover object-top transition-[opacity,transform] duration-700 group-hover/preview:scale-[1.03]",
                      preview === "ok"
                        ? "opacity-100"
                        : "absolute inset-0 opacity-0",
                    )}
                  />
                  {/* gradient hairline + inset ring */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/10"
                    aria-hidden="true"
                  />
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/90 backdrop-blur-sm transition-colors hover:bg-black/80"
                  >
                    <FolderGit2 className="size-3" />
                    Roy-Wanyoike/{slug}
                  </a>
                </div>
              ) : null}

              {/* Meta chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {project.category}
                </span>
                {project.status ? (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      statusStyles[project.status] ??
                        "bg-muted text-muted-foreground border-border",
                    )}
                  >
                    <StatusDot status={project.status} />
                    {project.status}
                  </span>
                ) : null}
                {project.year ? (
                  <span className="inline-flex items-center gap-1 rounded-full glass px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                    <CalendarDays className="size-3" />
                    {project.year}
                  </span>
                ) : null}
                {meta ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
                    title={
                      "Last push to the default branch: " +
                      new Date(meta.pushedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                  >
                    <Clock3 className="size-3" />
                    Updated {updatedLabel(meta.pushedAt) ?? "recently"}
                  </span>
                ) : null}
                {projectLanguages[project.name] ? (
                  <span className="inline-flex items-center rounded-full glass px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    <LanguageDot name={projectLanguages[project.name]} />
                  </span>
                ) : null}
                {project.stars ? (
                  <span className="inline-flex items-center gap-1 rounded-full glass px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    <Star className="size-3 text-amber-500 dark:text-amber-400" />
                    {project.stars}
                  </span>
                ) : null}
                {project.forks ? (
                  <span className="inline-flex items-center gap-1 rounded-full glass px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    <GitFork className="size-3" />
                    {project.forks}
                  </span>
                ) : null}
              </div>

              {project.impact ? (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-2.5">
                  <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              ) : null}

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* README excerpt (fetched live from the repo, distilled server-side) */}
              {readmeLoading && slug ? (
                <div
                  className="mt-4 space-y-1.5"
                  role="status"
                  aria-label="Loading README excerpt"
                >
                  <div className="h-3 w-24 overflow-hidden rounded bg-muted/70">
                    <div className="animate-shimmer h-full w-full" />
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded bg-muted/70">
                    <div className="animate-shimmer h-full w-full" />
                  </div>
                  <div className="h-3 w-4/5 overflow-hidden rounded bg-muted/70">
                    <div className="animate-shimmer h-full w-full" />
                  </div>
                </div>
              ) : readme ? (
                <div className="mt-4 rounded-r-xl border-l-2 border-primary/40 bg-muted/30 py-2.5 pl-3.5 pr-3">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    <BookOpen className="size-3 text-primary" />
                    From the README
                  </p>
                  <p className="mt-1.5 line-clamp-4 text-[13px] leading-relaxed text-muted-foreground">
                    {readme}
                  </p>
                  <a
                    href={`${project.href}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary/90 hover:text-primary transition-colors"
                  >
                    Read it in context
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted/60 border border-border/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Live language breakdown (GitHub bytes API, cached server-side) */}
              {langLoading ? (
                <div
                  className="mt-5"
                  role="status"
                  aria-label="Loading language breakdown"
                >
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/70">
                    <div className="animate-shimmer h-full w-full" />
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Fetching live language breakdown…
                  </p>
                </div>
              ) : langSlices ? (
                <div className="mt-5">
                  <div
                    className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted/70"
                    role="img"
                    aria-label={
                      "Language breakdown: " +
                      langSlices.map((l) => `${l.name} ${l.pct}%`).join(", ")
                    }
                  >
                    {langSlices.map((l) => (
                      <span
                        key={l.name}
                        className="h-full first:rounded-l-full last:rounded-r-full transition-[width] duration-700"
                        style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {langSlices.map((l) => (
                      <span
                        key={l.name}
                        className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"
                      >
                        <span
                          className="inline-block size-2 rounded-full ring-1 ring-black/10 dark:ring-white/20"
                          style={{ backgroundColor: l.color }}
                          aria-hidden="true"
                        />
                        {l.name}
                        <span className="font-mono tabular-nums">{l.pct}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 flex-1 min-w-36 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                  >
                    Live demo
                    <Globe className="size-4" />
                  </a>
                ) : null}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-10 flex-1 min-w-36 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors",
                    project.liveUrl
                      ? "glass text-foreground hover:text-primary hover:border-primary/40"
                      : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
                  )}
                >
                  View repository
                  <ExternalLink className="size-4" />
                </a>
                {cloneCommand ? (
                  <button
                    type="button"
                    onClick={copyClone}
                    aria-label="Copy git clone command"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl glass px-3.5 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <Terminal className="size-4" />
                    Clone
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl glass px-4 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  // slug → last push timestamp, from the shared GitHub snapshot (1 map, 0 extra calls)
  const [activity, setActivity] = useState<Record<string, string> | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // GitHub snapshot → freshness map for cards + modal seeding
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/github", { signal: ctrl.signal })
      .then((r) => r.json())
      .then(
        (d: { ok?: boolean; repoActivity?: { name: string; pushedAt: string }[] }) => {
          if (!d?.ok || !Array.isArray(d.repoActivity)) return;
          const map: Record<string, string> = {};
          for (const r of d.repoActivity) map[r.name.toLowerCase()] = r.pushedAt;
          setActivity(map);
        },
      )
      .catch(() => {
        /* freshness labels simply stay hidden */
      });
    return () => ctrl.abort();
  }, []);

  const pushedAtFor = (p: Project): string | undefined => {
    const slug = repoSlug(p);
    return slug && activity ? activity[slug.toLowerCase()] : undefined;
  };

  // Command palette → open a specific project's modal
  useEffect(() => {
    const onOpenProject = (e: Event) => {
      const name = (e as CustomEvent<{ name?: string }>).detail?.name;
      if (!name) return;
      const p = projects.find((proj) => proj.name === name);
      if (p) setSelected(p);
    };
    window.addEventListener("roy:open-project", onOpenProject);
    return () => window.removeEventListener("roy:open-project", onOpenProject);
  }, []);

  // Skill cards → jump here with a tag applied to the search box
  useEffect(() => {
    const onFilter = (e: Event) => {
      const q = (e as CustomEvent<{ query?: string }>).detail?.query;
      if (!q) return;
      setFilter("All");
      setQuery(q);
      setShowAll(true);
    };
    window.addEventListener("roy:filter-projects", onFilter);
    return () => window.removeEventListener("roy:filter-projects", onFilter);
  }, []);

  // Track recently-viewed projects for the command palette (localStorage = external system)
  useEffect(() => {
    if (!selected) return;
    try {
      const raw = window.localStorage.getItem("roy:recent-projects");
      const arr: string[] = raw ? JSON.parse(raw) : [];
      const next = [selected.name, ...arr.filter((n) => n !== selected.name)].slice(0, 3);
      window.localStorage.setItem("roy:recent-projects", JSON.stringify(next));
    } catch {
      /* private mode / storage unavailable — recents stay empty */
    }
  }, [selected]);

  // Keyboard shortcut: "/" focuses search (when not typing in a field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
  const gridPool = showFeatured
    ? filtered.filter((p) => !featuredNames.has(p.name))
    : filtered;
  const visible = showAll ? gridPool : gridPool.slice(0, PAGE_SIZE);
  const hasMore = gridPool.length > PAGE_SIZE;

  return (
    <section id="projects" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-emerald-950/10 to-background dark:via-emerald-950/10" />
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowAll(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && query) {
                    e.stopPropagation();
                    setQuery("");
                  }
                }}
                placeholder="Search projects, stacks, tags…"
                aria-label="Search projects"
                aria-keyshortcuts="/"
                className="w-full h-11 rounded-full glass pl-10 pr-14 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-4" />
                </button>
              ) : (
                <kbd
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border/70 bg-muted/60 px-1 font-sans text-[10px] font-semibold text-muted-foreground select-none"
                  title="Press / to search"
                >
                  /
                </kbd>
              )}
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
                    <ProjectCard project={p} featured pushedAt={pushedAtFor(p)} onOpen={setSelected} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        ) : null}

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.name} project={p} pushedAt={pushedAtFor(p)} onOpen={setSelected} />
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

      <ProjectDetailModal
        project={selected}
        pushedAt={selected ? pushedAtFor(selected) : undefined}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
