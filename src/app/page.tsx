import { Navigation } from "@/components/Portfolio/navigation";
import { Hero } from "@/components/Portfolio/hero";
import { About } from "@/components/Portfolio/about";
import { Skills } from "@/components/Portfolio/skills";
import { Projects } from "@/components/Portfolio/projects";
import { Experience } from "@/components/Portfolio/experience";
import { Philosophy } from "@/components/Portfolio/philosophy";
import { Community } from "@/components/Portfolio/community";
import { Speaking } from "@/components/Portfolio/speaking";
import { Certifications } from "@/components/Portfolio/certifications";
import { Contact } from "@/components/Portfolio/contact";
import { Footer } from "@/components/Portfolio/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
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
    </div>
  );
}
