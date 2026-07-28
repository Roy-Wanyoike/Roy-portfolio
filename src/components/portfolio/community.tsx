"use client";

import { motion } from "framer-motion";
import { Heart, Users2, Shield, GraduationCap, BookOpen } from "lucide-react";
import { community, education, publications } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./reveal";

export function Community() {
  return (
    <section id="community" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Community & Beyond"
          title={
            <>
              Giving back, <span className="text-gradient">teaching &amp; writing</span>
            </>
          }
          description="Volunteering, mentoring, and the credentials that round out the picture."
        />

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {/* Volunteering */}
          <Reveal className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <Heart className="size-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Volunteering &amp; Mentorship
                </h3>
              </div>
              <div className="space-y-4">
                {community.map((c, i) => (
                  <motion.div
                    key={c.org}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative pl-5 border-l-2 border-primary/30 hover:border-primary/60 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className="font-medium text-foreground">
                        {c.role} <span className="text-primary">· {c.org}</span>
                      </p>
                      <span className="text-xs text-muted-foreground">{c.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {c.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.location}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Education + Publications */}
          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="size-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Education
                  </h3>
                </div>
                <p className="font-medium text-foreground">{education.degree}</p>
                <p className="text-sm text-primary">{education.school}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{education.period} · {education.location}</span>
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 font-semibold text-primary">
                    GPA {education.gpa}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="size-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Publications
                  </h3>
                </div>
                {publications.map((p) => (
                  <div key={p.title}>
                    <p className="font-medium text-foreground">&ldquo;{p.title}&rdquo;</p>
                    <p className="text-xs text-primary font-medium mt-0.5">{p.type}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
