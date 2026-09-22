"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  Copy,
  FileDown,
  Github,
  Home,
  Mail,
  Moon,
  BookOpen,
  History,
  Search,
  Sun,
  User,
  Wrench,
  ArrowUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";
import {
  navLinks,
  projects,
  profile,
  languageColors,
  projectLanguages,
} from "@/lib/portfolio-data";

const sectionIcons: Record<string, typeof User> = {
  "#about": User,
  "#skills": Wrench,
  "#projects": Code2,
  "#experience": CalendarDays,
  "#community": User,
  "#writing": BookOpen,
  "#speaking": CalendarDays,
  "#certifications": CalendarDays,
  "#contact": Mail,
};

const RECENT_KEY = "roy:recent-projects";

function readRecents(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr: string[] = raw ? JSON.parse(raw) : [];
    return arr.filter((n) => projects.some((p) => p.name === n)).slice(0, 3);
  } catch {
    return [];
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);
  const { setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  const refreshRecents = useCallback(() => setRecents(readRecents()), []);

  // Global hotkey: Cmd/Ctrl+K toggles the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        refreshRecents(); // harmless when closing, correct when opening
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [refreshRecents]);

  // Nav / footer buttons open it via this custom event
  useEffect(() => {
    const onOpen = () => {
      refreshRecents();
      setOpen(true);
    };
    window.addEventListener("roy:open-palette", onOpen);
    return () => window.removeEventListener("roy:open-palette", onOpen);
  }, [refreshRecents]);

  const goTo = useCallback((href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openProject = useCallback((name: string) => {
    setOpen(false);
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Let the palette dialog close and the scroll settle before the modal opens
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("roy:open-project", { detail: { name } }));
    }, 350);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setOpen(false);
      toast({ title: "Email copied", description: profile.email });
    } catch {
      setOpen(false);
      toast({ title: "Couldn't copy — opening mail app" });
      window.location.href = `mailto:${profile.email}`;
    }
  }, [toast]);

  const run = useCallback(
    (fn: () => void) => {
      setOpen(false);
      window.setTimeout(fn, 60);
    },
    []
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section, search projects, or run an action"
      className="rounded-2xl border-primary/20 bg-popover/95 backdrop-blur-xl shadow-2xl shadow-black/30 [&_[cmdk-input]]:h-12"
    >
      <CommandInput placeholder="Type a command, project, or section…" />
      <CommandList className="max-h-[360px] scrollbar-thin">
        <CommandEmpty>No results found.</CommandEmpty>

        {recents.length > 0 ? (
          <>
            <CommandGroup heading="Recently viewed">
              {recents.map((name) => {
                const p = projects.find((x) => x.name === name);
                if (!p) return null;
                return (
                  <CommandItem
                    key={`recent-${p.name}`}
                    value={`recently viewed ${p.name} ${p.category}`}
                    onSelect={() => openProject(p.name)}
                    className="rounded-xl aria-selected:bg-primary/10"
                  >
                    <History />
                    <span className="truncate font-medium">{p.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {p.category}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}

        <CommandGroup heading="Projects">
          {projects.map((p) => {
            const lang = projectLanguages[p.name];
            return (
              <CommandItem
                key={p.name}
                value={`${p.name} ${p.tagline} ${p.category} ${p.tags.join(" ")}`}
                onSelect={() => openProject(p.name)}
                className="rounded-xl aria-selected:bg-primary/10"
              >
                {lang ? (
                  <span
                    className="inline-block size-2.5 shrink-0 rounded-full ring-1 ring-black/10 dark:ring-white/20"
                    style={{ backgroundColor: languageColors[lang] ?? "#8b949e" }}
                    aria-hidden="true"
                  />
                ) : (
                  <Code2 className="text-muted-foreground" />
                )}
                <span className="truncate font-medium">{p.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {p.category}
                </span>
                <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" />
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          {navLinks.map((l) => {
            const Icon = sectionIcons[l.href] ?? User;
            return (
              <CommandItem
                key={l.href}
                value={`go to ${l.label}`}
                onSelect={() => goTo(l.href)}
                className="rounded-xl aria-selected:bg-primary/10"
              >
                <Icon />
                {l.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="toggle theme appearance dark light"
            onSelect={() =>
              run(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              )
            }
            className="rounded-xl aria-selected:bg-primary/10"
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode
          </CommandItem>
          <CommandItem
            value="save resume cv pdf print"
            onSelect={() => run(() => window.print())}
            className="rounded-xl aria-selected:bg-primary/10"
          >
            <FileDown />
            Save page as PDF
          </CommandItem>
          <CommandItem
            value="copy email contact"
            onSelect={copyEmail}
            className="rounded-xl aria-selected:bg-primary/10"
          >
            <Copy />
            Copy email address
            <CommandShortcutHint text={profile.email} />
          </CommandItem>
          <CommandItem
            value="github profile repositories"
            onSelect={() =>
              run(() =>
                window.open(
                  "https://github.com/Roy-Wanyoike",
                  "_blank",
                  "noopener,noreferrer"
                )
              )
            }
            className="rounded-xl aria-selected:bg-primary/10"
          >
            <Github />
            Open GitHub profile
            <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem
            value="back to top home"
            onSelect={() => run(() => window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="rounded-xl aria-selected:bg-primary/10"
          >
            <Home />
            Back to top
            <ArrowUp className="ml-auto size-3.5 text-muted-foreground" />
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="border-t border-border/60 px-3 py-2 text-[11px] text-muted-foreground flex items-center gap-3">
        <span className="inline-flex items-center gap-1">
          <Kbd>↵</Kbd> select
        </span>
        <span className="inline-flex items-center gap-1">
          <Kbd>esc</Kbd> close
        </span>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd> anywhere
        </span>
      </div>
    </CommandDialog>
  );
}

function CommandShortcutHint({ text }: { text: string }) {
  return (
    <span className="ml-auto max-w-40 truncate text-xs text-muted-foreground">
      {text}
    </span>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-border/70 bg-muted/60 px-1 font-sans text-[10px] font-semibold text-muted-foreground">
      {children}
    </kbd>
  );
}
