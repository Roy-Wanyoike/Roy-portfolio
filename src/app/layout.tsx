import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Royford Wanyoike Wamaitha — Software Engineer | Quickbase Solutions Engineer",
  description:
    "Nairobi-based Software Engineer and Technical Support professional with 3+ years building, debugging, and supporting full-stack apps and enterprise systems. Quickbase Professional Builder, HIPAA-compliant healthcare experience, 20x+ conference speaker.",
  keywords: [
    "Royford Wanyoike",
    "Roy Wanyoike Wamaitha",
    "Software Engineer Nairobi",
    "Quickbase Solutions Engineer",
    "Developer Advocate Kenya",
    "Technical Support Engineer",
    "Temporal.io",
    "Supabase",
    "HIPAA healthcare",
    "React",
    "Next.js",
    "Node.js",
    "Angular",
    "Workday HCM",
  ],
  authors: [{ name: "Royford Wanyoike Wamaitha" }],
  openGraph: {
    title: "Royford Wanyoike Wamaitha — Software Engineer | Quickbase Solutions Engineer",
    description:
      "Building, debugging, and supporting full-stack apps and enterprise systems from Nairobi, Kenya — including HIPAA-compliant healthcare solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royford Wanyoike Wamaitha — Software Engineer | Quickbase Solutions Engineer",
    description:
      "Building, debugging, and supporting full-stack apps and enterprise systems from Nairobi, Kenya.",
  },
};

// JSON-LD Person schema — helps recruiters find Royford via Google/search engines
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Royford Wanyoike Wamaitha",
  jobTitle: "Software Engineer | Quickbase Solutions Engineer | Developer Advocate",
  description:
    "Software Engineer and Technical Support professional with 3+ years building, debugging, and supporting full-stack applications and enterprise systems. Quickbase Professional Builder certified. HIPAA-compliant healthcare experience. 20+ conference talks.",
  email: "mailto:roywanyoike328@gmail.com",
  telephone: "+254706103000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "Kenya",
  },
  knowsAbout: [
    "Quickbase",
    "Temporal.io",
    "Supabase",
    "React",
    "Next.js",
    "Node.js",
    "Angular",
    "Svelte",
    "Workday HCM",
    "Active Directory",
    "HIPAA",
    "Developer Advocacy",
    "Technical Speaking",
  ],
  sameAs: [
    "https://www.linkedin.com/in/roywanyoike/",
    "https://github.com/Roy-Wanyoike",
    "https://x.com/WanyoikeRoyford",
    "https://sessionize.com/royford-wanyoike",
    "https://linktr.ee/roywanyoike",
    "https://public.tableau.com/app/profile/royford.wanyoike",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Imminent Transcendent Solutions",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Kibabii University",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
