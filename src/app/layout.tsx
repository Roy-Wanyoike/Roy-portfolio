import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

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

// Browser-chrome colors follow the site theme (dark by default).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#040b09" },
    { media: "(prefers-color-scheme: light)", color: "#f9fdfb" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://roy-portfolio-roywanyoikes-projects.vercel.app"
  ),
  applicationName: "Roy Wanyoike",
  category: "technology",
  creator: "Royford Wanyoike Wamaitha",
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
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Roy Wanyoike",
  },
  icons: {
    // Declared explicitly — manual icons config overrides file-convention links.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/mask-icon.svg",
        color: "#00885e",
      },
    ],
  },
  openGraph: {
    title: "Royford Wanyoike Wamaitha — Software Engineer | Quickbase Solutions Engineer",
    siteName: "Roy Wanyoike — Portfolio",
    url: "/",
    description:
      "Building, debugging, and supporting full-stack apps and enterprise systems from Nairobi, Kenya — including HIPAA-compliant healthcare solutions. 110+ public repos, 23+ projects.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Royford Wanyoike — Software Engineer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@WanyoikeRoyford",
    creator: "@WanyoikeRoyford",
    title: "Royford Wanyoike Wamaitha — Software Engineer | Quickbase Solutions Engineer",
    description:
      "Building, debugging, and supporting full-stack apps and enterprise systems from Nairobi, Kenya.",
    images: ["/og.png"],
  },
};

// JSON-LD Person schema — helps recruiters find Royford via Google/search engines
const SITE_URL = "https://roy-portfolio-roywanyoikes-projects.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Royford Wanyoike Wamaitha",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
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

// JSON-LD WebSite schema — associates the domain with the person in search
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Royford Wanyoike Wamaitha — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Royford Wanyoike Wamaitha — Software Engineer, Quickbase Solutions Engineer and Developer Advocate based in Nairobi, Kenya.",
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
