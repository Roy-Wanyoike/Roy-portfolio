import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { Philosophy } from "@/components/portfolio/philosophy";
import { Community } from "@/components/portfolio/community";
import { Speaking } from "@/components/portfolio/speaking";
import { Certifications } from "@/components/portfolio/certifications";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ScrollProgress, BackToTop } from "@/components/portfolio/scroll-ui";
import { MotionProvider } from "@/components/portfolio/motion-config";
import { CommandPalette } from "@/components/portfolio/command-palette";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <MotionProvider>
        <ScrollProgress />
        <Navigation />
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          {/* Projects before Experience — recruiters want to see work ASAP */}
          <Projects />
          <Experience />
          <Philosophy />
          <Community />
          <Speaking />
          <Certifications />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <CommandPalette />
      </MotionProvider>
    </div>
  );
}
