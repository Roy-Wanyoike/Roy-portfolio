"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { contactMethods, profile, socials } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const subjectOptions = [
  "Job Opportunity",
  "Freelance Project",
  "Speaking Invitation",
  "Collaboration",
  "Just Saying Hi",
];

export function Contact() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Please fill in all fields",
        description: "Your name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      setStatus("success");
      toast({
        title: "Message sent!",
        description: `Thanks ${form.name.split(" ")[0]} — I'll get back to you soon.`,
      });
      setForm({ name: "", email: "", subject: subjectOptions[0], message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("idle");
      toast({
        title: "Something went wrong",
        description:
          "Couldn't send your message. Please email me directly at " + profile.email,
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-gradient">great together</span>
            </>
          }
          description="Whether you're hiring, have a project, or want to collaborate — my inbox is open."
          align="center"
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          {/* Left: contact info */}
          <Reveal className="lg:col-span-2">
            <div className="h-full glass rounded-2xl p-6 sm:p-7 flex flex-col">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Get in touch
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                I&apos;m based in {profile.location} and open to remote opportunities worldwide. Reply time is usually within 24 hours.
              </p>

              <div className="mt-6 space-y-3">
                {contactMethods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <a
                      key={m.label}
                      href={m.href}
                      className="group flex items-center gap-3 rounded-xl glass p-3 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary group-hover:scale-110 transition-transform">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {m.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Find me online
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className="group flex size-11 items-center justify-center rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5"
                      >
                        <Icon className="size-[18px]" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Send a direct email
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-7 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jane Recruiter"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11 bg-background/50 border-border/60 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-11 bg-background/50 border-border/60 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">What&apos;s this about?</Label>
                <div className="flex flex-wrap gap-2">
                  {subjectOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, subject: s })}
                      className={
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-all " +
                        (form.subject === s
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "glass text-muted-foreground hover:text-foreground hover:border-primary/30")
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about the role, project, or idea..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className="bg-background/50 border-border/60 focus-visible:ring-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Or email me directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {profile.email}
                  </a>
                </p>
                <Button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 h-11 px-6 min-w-[140px]"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
