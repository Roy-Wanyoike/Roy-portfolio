import Link from "next/link";
import { Ghost, Home, Github } from "lucide-react";
import { profile, socials } from "@/lib/portfolio-data";

export default function NotFound() {
  const github = socials.find((s) => s.label === "GitHub");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4">
      {/* Ambient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[-8%] size-[32rem] rounded-full bg-primary/15 blur-3xl animate-blob" />
        <div className="absolute bottom-[-15%] right-[-8%] size-[28rem] rounded-full bg-teal-500/10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <main className="text-center max-w-md">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl glass-strong mb-6">
          <Ghost className="size-8 text-primary" aria-hidden="true" />
        </div>

        <p
          className="font-display text-7xl font-bold text-gradient leading-none"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          This page swam away
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist — but there&apos;s
          plenty more to explore on the main deck.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            <Home className="size-4" />
            Back to portfolio
          </Link>
          {github ? (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full glass px-6 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
          ) : null}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          {profile.name} · {profile.location}
        </p>
      </main>
    </div>
  );
}
