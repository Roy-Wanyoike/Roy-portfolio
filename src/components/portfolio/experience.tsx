"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Sparkles, Zap } from "lucide-react";
import { experiences } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./reveal";

// Company initials for the timeline avatars
function companyInitials(company: string): string {
  return company
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

// Local join-class helper (avoids extra import churn)
function cnExp(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Experience() {
  return (
    <section id="experience" className="section-pad relative scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              A track record of{" "}
              <span className="text-gradient">building &amp; advocating</span>
            </>
          }
          description="From student leader to professional engineer — here's the journey so far."
        />

        <div className="mt-12 relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.role}-${exp.period}`} delay={i * 0.1}>
                <div className="relative pl-12 sm:pl-16">
                  {/* Node */}
                  <div className="absolute left-0 top-1.5">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                      className="relative flex size-8 sm:size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20"
                    >
                      <Briefcase className="size-4 sm:size-5" />
                      {exp.current ? (
                        <span className="absolute -top-1 -right-1 flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                        </span>
                      ) : null}
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cnExp(
                      "glass rounded-2xl p-5 sm:p-6 transition-colors",
                      exp.current
                        ? "border-primary/30 hover:border-primary/50"
                        : "hover:border-primary/30",
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          aria-hidden="true"
                          className="hidden sm:flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/20 font-display text-sm font-bold text-primary"
                        >
                          {companyInitials(exp.company)}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground flex flex-wrap items-center gap-2">
                            {exp.role}
                            {exp.current ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                                <Zap className="size-2.5" />
                                Current
                              </span>
                            ) : null}
                          </h3>
                          <p className="text-sm text-primary font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-xs font-medium text-foreground">
                          {exp.period}
                        </span>
                        <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                          <Sparkles className="size-3.5 text-primary mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
