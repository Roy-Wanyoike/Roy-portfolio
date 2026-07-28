"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, GitFork, ExternalLink, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const categories = ["All", "Open Source", "App", "Tool", "Learning"] as const;

function ProjectCard({ project }: { project: Project }) {
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
      className="group relative flex flex-col glass rounded-2xl p-6 hover:border-primary/40 transition-colors overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20">
          <span className="font-display text-lg font-bold">
            {project.name.charAt(0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
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
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
          {project.name}
          <ArrowUpRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </h3>
        <p className="mt-1 text-sm text-primary font-medium">{project.tagline}</p>

        {/* Impact line — metrics up top, scannable in 3 seconds */}
        {project.impact ? (
          <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-foreground bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1.5">
            <Sparkles className="size-3.5 text-primary mt-0.5 shrink-0" />
            <span className="leading-relaxed">{project.impact}</span>
          </p>
        ) : null}

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
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
        <span className="text-xs text-muted-foreground font-mono">
          github.com/Roy-Wanyoike
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
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-emerald-950/10 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Open-source &amp; <span className="text-gradient">side projects</span>
            </>
          }
          description="A selection of repositories I've built or contributed to — from technical writing resources to realtime chat apps."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  filter === c
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <RevealGroup className="mt-10">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </RevealGroup>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href="https://github.com/Roy-Wanyoike?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              See all 108 repositories on GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
