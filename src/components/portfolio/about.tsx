"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code2, Heart, Lightbulb, Users } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./reveal";

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
