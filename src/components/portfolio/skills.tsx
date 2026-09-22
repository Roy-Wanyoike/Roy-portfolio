"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { skillCategories, projects, type SkillCategory } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";

// One honest, high-signal search tag per skill pillar (counts computed live below)
const relatedTags: Record<string, string> = {
  Frontend: "Next.js",
  "Backend & Databases": "Go",
  "Architecture & Realtime": "WebSocket",
  "AI & Data": "AI",
  "Low-Code & Platforms": "API",
};

function matchesTag(
  p: (typeof projects)[number],
  q: string,
): boolean {
  return (
    p.name.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q)) ||
    (p.impact?.toLowerCase().includes(q) ?? false)
  );
}

/** Ticks from 0 to `target` once the element scrolls into view. */
function CountUp({ target, duration = 1100 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic for a satisfying settle
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}%
    </span>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">
          <CountUp target={level} />
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-muted/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/80 via-primary to-emerald-400/80"
        >
          <div className="absolute inset-0 animate-shimmer rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}

function CategoryCard({ category, related }: { category: SkillCategory; related?: { tag: string; count: number } }) {
  const Icon = category.icon;
  const jumpToProjects = () => {
    if (!related) return;
    window.dispatchEvent(
      new CustomEvent("roy:filter-projects", { detail: { query: related.tag } }),
    );
    document
      .querySelector("#projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <RevealItem>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="group relative h-full glass rounded-2xl p-6 hover:border-primary/40 transition-colors overflow-hidden"
      >
        {/* Cursor spotlight — matches project cards */}
        <span className="card-spotlight" aria-hidden="true" />
        {/* Gradient top hairline on hover */}
        <span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-3 mb-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
            <Icon className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {category.title}
          </h3>
        </div>
        <div className="relative space-y-4">
          {category.skills.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={0.1 + i * 0.05} />
          ))}
        </div>
        {related && related.count > 0 ? (
          <div className="relative mt-5 pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={jumpToProjects}
              aria-label={`Show ${related.count} projects matching ${related.tag}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Explore {related.count} {related.tag} projects
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        ) : null}
      </motion.div>
    </RevealItem>
  );
}

export function Skills() {
  const related = useMemo(() => {
    const map = new Map<string, { tag: string; count: number }>();
    for (const [title, tag] of Object.entries(relatedTags)) {
      const q = tag.toLowerCase();
      const count = projects.filter((p) => matchesTag(p, q)).length;
      if (count > 0) map.set(title, { tag, count });
    }
    return map;
  }, []);

  return (
    <section id="skills" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title={
            <>
              The tools I use to{" "}
              <span className="text-gradient">build &amp; ship</span>
            </>
          }
          description="Six skill pillars — from low-code enterprise platforms and Go systems programming to event-driven architecture and AI agent infrastructure."
          align="center"
        />

        <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <CategoryCard
              key={cat.title}
              category={cat}
              related={related.get(cat.title)}
            />
          ))}
        </RevealGroup>

        {/* Tech cloud */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {[
              "React", "Next.js 16", "TypeScript", "Node.js", "Go", "Rust (learning)",
              "Python", "PostgreSQL", "Redis", "Prisma", "Temporal.io", "WebSocket / SSE",
              "Angular", "Vue 3", "Svelte", "Event-Driven Architecture", "DDD",
              "Quickbase", "Quickbase Pipelines", "Power Automate", "Workday HCM",
              "AI Agents", "LLM Integration", "RAG", "ETL / Airflow", "Playwright",
              "Docker", "CI/CD", "Vercel", "Supabase", "M-Pesa / Daraja", "Stripe",
              "Tailwind CSS", "shadcn/ui", "Framer Motion", "Git / GitHub",
              "Technical Writing", "Public Speaking", "Tableau", "HIPAA",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full glass px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
