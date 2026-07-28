"use client";

import { motion } from "framer-motion";
import { skillCategories, type SkillCategory } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground tabular-nums">{level}%</span>
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

function CategoryCard({ category }: { category: SkillCategory }) {
  const Icon = category.icon;
  return (
    <RevealItem>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group h-full glass rounded-2xl p-6 hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:scale-110 transition-transform">
            <Icon className="size-5" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {category.title}
          </h3>
        </div>
        <div className="space-y-4">
          {category.skills.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={0.1 + i * 0.05} />
          ))}
        </div>
      </motion.div>
    </RevealItem>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title={
            <>
              The tools I use to{" "}
              <span className="text-gradient">build &amp; support</span>
            </>
          }
          description="From low-code enterprise platforms to modern JavaScript frameworks and the support tooling that keeps them healthy."
          align="center"
        />

        <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <CategoryCard key={cat.title} category={cat} />
          ))}
        </RevealGroup>

        {/* Tech cloud */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {[
              "React", "Next.js", "NextAuth", "Node.js", "TypeScript", "JavaScript",
              "Angular", "Vue.js", "Svelte", "Svelte Native", "Python", "Quickbase",
              "Quickbase API", "Playwright", "Bug Triage", "Runbooks", "Incident Response",
              "Git", "GitHub", "Tailwind CSS", "REST APIs", "Data Engineering",
              "Tableau", "DevOps", "CI/CD", "Technical Writing",
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
