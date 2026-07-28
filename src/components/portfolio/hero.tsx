"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  FileText,
  MapPin,
  Sparkles,
  Target,
  CheckCircle2,
} from "lucide-react";
import { profile, socials, impactMetrics } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Typewriter } from "./typewriter";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] size-[40rem] rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute top-[20%] right-[-10%] size-[35rem] rounded-full bg-emerald-500/10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-15%] left-[30%] size-[30rem] rounded-full bg-teal-500/10 blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for new opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="block text-foreground">Hi, I&apos;m</span>
              <span className="block text-gradient mt-1">
                {profile.firstName} {profile.lastName}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 flex items-center gap-2 text-lg sm:text-2xl text-muted-foreground font-display font-medium"
            >
              <Sparkles className="size-5 text-primary shrink-0" />
              <Typewriter words={profile.roles} />
            </motion.div>

            {/* USP — recruiter elevator pitch, first thing they read after the name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-foreground leading-relaxed font-medium"
            >
              {profile.usp}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
              {profile.summary}
            </motion.p>

            {/* Core stack — quick-scan tech badges recruiters look for */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {profile.coreStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg glass px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Open to — clear role targeting (recruiters want intent) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mt-5 flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Target className="size-4 text-primary mt-0.5 shrink-0" />
              <span>
                <span className="text-foreground font-medium">Open to:</span>{" "}
                {profile.openTo.join(" · ")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 px-6"
              >
                View My Work
                <ArrowDown className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-6 glass border-white/10 hover:bg-white/5"
              >
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4" />
                  View Résumé
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-12 px-6 text-muted-foreground hover:text-foreground"
              >
                Get in touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="size-4 text-primary" />
              {profile.location}
              <span className="mx-1.5">·</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-primary" />
                Remote-friendly
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.66 }}
              className="mt-6 flex items-center gap-3"
            >
              {socials.slice(0, 6).map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex size-11 items-center justify-center rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5"
                  >
                    <Icon className="size-[18px]" />
                    <span className="absolute -inset-0.5 -z-10 rounded-xl bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right: real photo */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-sm"
            >
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 via-emerald-500/10 to-teal-500/20 blur-2xl" />
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary/40 to-transparent opacity-50" />

              <div className="relative aspect-square rounded-[2rem] overflow-hidden glass-strong p-2">
                <div className="relative size-full rounded-[1.6rem] overflow-hidden bg-gradient-to-br from-primary/20 to-background">
                  <Image
                    src="/images/roy-photo.jpg"
                    alt={`Photo of ${profile.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover object-center"
                  />
                  {/* Stronger dark gradient at bottom for legible text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Name plate — solid dark backdrop for WCAG contrast */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/70 backdrop-blur-md px-3.5 py-2.5 border border-white/15">
                    <p className="font-display text-sm font-bold text-white leading-tight">
                      {profile.name}
                    </p>
                    <p className="text-[11px] text-white/80 mt-0.5">{profile.title}</p>
                  </div>
                </div>
              </div>

              {/* Floating badge: Quickbase — solid dark backdrop */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -left-4 sm:-left-8 top-12 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                    QB
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-white">Quickbase</p>
                    <p className="text-[10px] text-white/70">Pro Builder</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge: open source — solid dark backdrop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-4 sm:-right-8 bottom-24 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 p-3 shadow-xl"
              >
                <div className="leading-tight">
                  <p className="text-xl font-bold font-display text-white">100+</p>
                  <p className="text-[10px] text-white/70">Public repos</p>
                </div>
              </motion.div>

              {/* Floating badge: location — solid dark backdrop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute right-6 -top-3 rounded-full bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 shadow-xl flex items-center gap-1.5"
              >
                <MapPin className="size-3 text-primary" />
                <span className="text-xs font-semibold text-white">Nairobi, KE</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Impact metrics strip — quantifiable outcomes recruiters want up top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {impactMetrics.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-4 text-center hover:border-primary/30 transition-colors"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-gradient">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-foreground leading-tight">
                {s.label}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                {s.sublabel}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <span className="flex justify-center">
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </motion.span>
        </span>
      </motion.button>
    </section>
  );
}
