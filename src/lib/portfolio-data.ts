import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Send,
  BarChart3,
  Brain,
  Users,
  Rocket,
  ShieldCheck,
  Code2,
  Server,
  Boxes,
  Wrench,
  Headphones,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Royford Wanyoike Wamaitha",
  alias: "Youngshark3",
  firstName: "Royford",
  lastName: "Wanyoike",
  title: "Software Engineer | Quickbase Solutions Engineer | Developer Advocate",
  tagline: "trying to be a code connoisseur",
  location: "Nairobi, Kenya",
  email: "roywanyoike328@gmail.com",
  phone: "+254 706 103 000",
  phoneHref: "+254706103000",
  available: true,
  yearsExperience: "3+",
  // Recruiter-focused: scannable elevator pitch (USP) — leads with value, not adjectives
  usp: "I build, debug, and support full-stack apps and enterprise systems — from Quickbase low-code to Node.js backends, including HIPAA-compliant healthcare solutions.",
  // What roles I'm targeting — recruiters want clear intent
  openTo: [
    "Software / Solutions Engineer",
    "Quickbase Solutions Engineer",
    "Technical Support Engineer",
    "Full-Stack Engineer",
    "Developer Advocate",
  ],
  // Quick-scan tech badges for hero
  coreStack: ["Quickbase", "Node.js", "React", "Next.js", "Angular", "Temporal.io"],
  summary:
    "Software Engineer and Technical Support professional with 3+ years building, debugging, and supporting full-stack applications and enterprise systems. Proven first-line technical support background, strong debugging and root-cause analysis, and recent healthcare domain experience with HIPAA-compliant clinical solutions. Quickbase Professional Builder certified.",
  longSummary:
    "I'm a Nairobi-based software engineer who builds, debugs, and supports full-stack applications and enterprise systems. Currently I split my time between two roles: Software Solutions Engineer at Imminent Transcendent Solutions (Quickbase platform delivery) and Quickbase Solutions Engineer at Ethos Therapy Solutions (HIPAA-compliant healthcare apps for the US market).\n\nMy toolkit spans low-code platforms (Quickbase, Microsoft Power Automate), modern JavaScript (Node.js, React, Next.js, Angular, Svelte), workflow orchestration (Temporal.io, Supabase), and enterprise integrations (Workday HCM, Active Directory). I've also worn the IT support hat — diagnosing hardware, software, and network issues and managing AD user accounts at Gigsasa.\n\nBeyond the keyboard, I'm a frequent conference speaker (20+ talks on Angular, Next.js, Server Components, and API Security), author of 'Beyond Data Risk', and an active open-source contributor with 100+ public repositories.",
  roles: [
    "Software Engineer",
    "Quickbase Solutions Engineer",
    "Technical Support Engineer",
    "Developer Advocate",
    "Full-Stack Developer",
    "Open-Source Contributor",
  ],
  // Real LinkedIn profile — serves as living resume for recruiters
  resumeUrl: "https://www.linkedin.com/in/roywanyoike/",
};

// Engineering philosophy — recruiters explicitly want to see "how you think"
export const philosophy: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Brain,
    title: "Understand before I build",
    body: "I spend more time reading the problem than typing the solution. A 30-minute spec conversation saves a 3-day rewrite. I ask 'what changes if this succeeds 10x?' before choosing an architecture.",
  },
  {
    icon: LifeBuoy,
    title: "Support is a feature, not a chore",
    body: "Every bug report is a free user-research session. I reproduce it with Playwright, write the runbook while it's fresh, and reply in plain language — so the next person with the same issue finds the answer waiting.",
  },
  {
    icon: Rocket,
    title: "Ship small, ship often",
    body: "I'd rather merge 5 small PRs than 1 big one. Small ships mean fast feedback, easy rollbacks, and reviewers who actually read the code. CI is a teammate, not a gatekeeper.",
  },
  {
    icon: Users,
    title: "Code is for humans, then machines",
    body: "I optimize for the next dev reading my code — or the next user reading the error message. Clear names, small functions, and a PR description that explains the 'why' beat clever one-liners every time.",
  },
];

// Real, verifiable impact metrics — recruiters want quantifiable outcomes
export const impactMetrics = [
  { value: "10k+", label: "Daily API requests", sublabel: "at Skystock (Founding Eng)" },
  { value: "99.9%", label: "System uptime", sublabel: "via Temporal.io orchestration" },
  { value: "2d→4h", label: "Onboarding time cut", sublabel: "50+ businesses onboarded" },
  { value: "500+", label: "Users served", sublabel: "Opteamio commercial platform" },
  { value: "20+", label: "Conference talks", sublabel: "Angular · Next.js · API Security" },
  { value: "Pro", label: "Quickbase Builder certified", sublabel: "HIPAA-compliant apps" },
];

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
};

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/roywanyoike/",
    icon: Linkedin,
    handle: "in/roywanyoike",
  },
  {
    label: "GitHub",
    href: "https://github.com/Roy-Wanyoike",
    icon: Github,
    handle: "Roy-Wanyoike",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/WanyoikeRoyford",
    icon: Twitter,
    handle: "@WanyoikeRoyford",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/roy_wanyoike/",
    icon: Instagram,
    handle: "@roy_wanyoike",
  },
  {
    label: "Tableau",
    href: "https://public.tableau.com/app/profile/royford.wanyoike",
    icon: BarChart3,
    handle: "royford.wanyoike",
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/roywanyoike",
    icon: Globe,
    handle: "roywanyoike",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254706103000",
    icon: MessageCircle,
    handle: "+254 706 103 000",
  },
  {
    label: "Telegram",
    href: "https://t.me/roywanyoike",
    icon: Send,
    handle: "@roywanyoike",
  },
];

export const contactMethods = [
  { label: "Email", value: "roywanyoike328@gmail.com", href: "mailto:roywanyoike328@gmail.com", icon: Mail },
  { label: "Phone", value: "+254 706 103 000", href: "tel:+254706103000", icon: Phone },
  { label: "Location", value: "Nairobi, Kenya", href: "https://maps.google.com/?q=Nairobi,Kenya", icon: MapPin },
];

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Angular", level: 82 },
      { name: "Svelte", level: 80 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    title: "Backend & Orchestration",
    icon: Server,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Temporal.io (Workflow)", level: 80 },
      { name: "Supabase", level: 78 },
      { name: "REST API Design", level: 85 },
      { name: "Python", level: 75 },
      { name: "Ruby (in progress)", level: 55 },
    ],
  },
  {
    title: "Low-Code & Platforms",
    icon: Boxes,
    skills: [
      { name: "Quickbase (Pro Builder)", level: 90 },
      { name: "Quickbase API / Pipelines", level: 88 },
      { name: "Microsoft Power Automate", level: 78 },
      { name: "Workday HCM / Integrations", level: 70 },
      { name: "Tableau", level: 70 },
    ],
  },
  {
    title: "Support & Reliability",
    icon: Headphones,
    skills: [
      { name: "Hardware / Software Troubleshooting", level: 85 },
      { name: "Active Directory / User Mgmt", level: 82 },
      { name: "Network & Security", level: 80 },
      { name: "Root Cause Analysis", level: 88 },
      { name: "Bug Triage & Reproduction", level: 85 },
    ],
  },
  {
    title: "Cross-Cutting",
    icon: Wrench,
    skills: [
      { name: "Technical Writing", level: 85 },
      { name: "Public Speaking", level: 88 },
      { name: "Git / GitHub", level: 90 },
      { name: "HIPAA / Healthcare Domain", level: 75 },
      { name: "Workflow Automation", level: 85 },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  description: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Software Solutions Engineer",
    company: "Imminent Transcendent Solutions",
    period: "Sep 2025 — Present",
    location: "Karen, Nairobi, Kenya",
    current: true,
    description:
      "Designing, building, and maintaining scalable Quickbase applications that drive operational efficiency across multiple business units.",
    highlights: [
      "Build and maintain scalable Quickbase applications supporting operational efficiency across multiple business units.",
      "Automate workflows and integrate systems to reduce manual processes and improve data accuracy.",
      "Develop custom dashboards, UIs, and reporting tools for real-time decision-making.",
      "Implement data governance — permission structures, validation rules, and secure access controls.",
      "Evaluate and integrate APIs and third-party tools; conduct user training and onboarding for high adoption.",
    ],
    stack: ["Quickbase", "Quickbase Pipelines", "REST APIs", "Workday HCM", "Power Automate"],
  },
  {
    role: "Quickbase Solutions Engineer",
    company: "Ethos Therapy Solutions",
    period: "Aug 2025 — Present",
    location: "United States (Remote)",
    current: true,
    description:
      "Leading end-to-end Quickbase development for HIPAA-compliant healthcare applications serving US clinical teams.",
    highlights: [
      "Led end-to-end Quickbase development — schema design, custom dashboarding, and advanced formula fields.",
      "Engineered integrations via Quickbase Pipelines and APIs to sync therapy data with external billing and CRM platforms.",
      "Optimized performance by auditing legacy structures and refactoring complex many-to-many relationships for faster reporting.",
      "Built automated workflows and notifications for real-time communication between clinical and admin staff.",
      "Ensured HIPAA compliance and data security across all solutions with clinical stakeholders.",
    ],
    stack: ["Quickbase", "Quickbase Pipelines", "HIPAA", "Healthcare", "REST APIs"],
  },
  {
    role: "Founding Engineer",
    company: "Skystock Developer Limited",
    period: "Jan 2025 — Jul 2025",
    location: "Remote",
    description:
      "Led backend architecture and development for an event-driven platform using Node.js, Temporal.io, and Supabase.",
    highlights: [
      "Built secure APIs handling 10,000+ daily requests with third-party system integrations.",
      "Implemented workflow orchestration with Temporal.io — improved system reliability to 99.9% uptime.",
      "Streamlined business onboarding, cutting setup time from 2 days to under 4 hours.",
      "Drove MVP launch supporting 50+ active businesses within the first 3 months.",
    ],
    stack: ["Node.js", "Temporal.io", "Supabase", "REST APIs", "Event-Driven"],
  },
  {
    role: "Junior Software Engineer",
    company: "Opteamio Ltd",
    period: "Jan 2022 — Dec 2024",
    location: "Nairobi, Kenya",
    description:
      "Built and maintained a commercial platform serving 500+ users, with cross-functional collaboration and Workday HCM analysis.",
    highlights: [
      "Built and maintained a commercial platform using Svelte, React.js, and Node.js serving 500+ users.",
      "Improved the user experience for the Gigsasa user platform.",
      "Worked as Workday Analyst (HCM): wrote integration reports, diagnosed tenant system issues, learned Workday Integration.",
      "Collaborated on KPI development and aligned tech solutions with business objectives.",
      "Supported client onboarding and smooth transitions to new technologies.",
    ],
    stack: ["Svelte", "React.js", "Node.js", "Workday HCM", "JavaScript"],
  },
  {
    role: "Full-Stack Developer (Subcontracted)",
    company: "G-Roll / via UK client for Gigsasa Ltd",
    period: "Sep 2022 — Apr 2023",
    location: "Nairobi, Kenya",
    description:
      "Built G-Roll, a Kenya-based HR and payroll management system, subcontracted via a UK client on behalf of Gigsasa Ltd.",
    highlights: [
      "Built G-Roll, a Kenya-based HR and payroll management system, as a subcontracted project.",
      "Coordinated business, management, and data teams to implement KPIs aligned with HR and payroll operations.",
    ],
    stack: ["JavaScript", "Node.js", "React", "HR/Payroll Domain"],
  },
  {
    role: "Cyber Security Consultant",
    company: "Opteamio Ltd",
    period: "Sep 2022 — Feb 2023",
    location: "United Kingdom (Remote)",
    description:
      "Led a 3-person team delivering an ISMS project and guiding other companies through ISO certification.",
    highlights: [
      "Led a team of three in implementing an ISMS project for the company.",
      "Guided other companies through ISO certification processes.",
      "Conducted software security assessments for company products.",
    ],
    stack: ["ISMS", "ISO Certification", "Security Assessment", "Network Security"],
  },
  {
    role: "IT Support Engineer",
    company: "Gigsasa Ltd",
    period: "Jan 2023 — Jun 2023",
    location: "Nairobi, Kenya",
    description:
      "Provided first-line technical support to end-users — diagnosing and resolving hardware, software, and network issues.",
    highlights: [
      "Diagnosed and resolved hardware, software, and network issues for end-users.",
      "Installed, configured, and maintained workstations, peripherals, software, and network infrastructure.",
      "Managed user accounts and access permissions in Active Directory.",
      "Maintained accurate records of support requests, solutions, and system configurations.",
    ],
    stack: ["Active Directory", "Hardware", "Networking", "Windows", "IT Support"],
  },
  {
    role: "IT Support",
    company: "TheJitu.com",
    period: "Aug 2022 — Dec 2022",
    location: "Nyeri, Kenya",
    description:
      "Collaborated with the testing team and delivered end-user training and remote support.",
    highlights: [
      "Collaborated with the software testing team to identify bugs and vulnerabilities before client delivery.",
      "Delivered end-user training on IT resources, software, and hardware.",
      "Provided remote support using desktop tools in distributed work environments.",
    ],
    stack: ["Software Testing", "Remote Support", "User Training"],
  },
];

// Community & Volunteering — recruiters value this for culture-fit signal
export type Community = {
  role: string;
  org: string;
  period: string;
  location: string;
  description: string;
};

export const community: Community[] = [
  {
    role: "Developer Advocate",
    org: "Lux Tech Academy",
    period: "May 2021 — Present",
    location: "Nairobi, Kenya",
    description:
      "Help developers learn tools and technologies at Lux DevHQ; mentor front-end students through their learning journey.",
  },
  {
    role: "Campus Ambassador & Cybersecurity Analyst",
    org: "She Hacks KE",
    period: "Apr 2021 — Feb 2023",
    location: "Nairobi, Kenya",
    description:
      "Organized campus cybersecurity programmes and tested products pre-production for security vulnerabilities.",
  },
  {
    role: "Mobile Web Specialist Mentor",
    org: "Andela Community",
    period: "2021",
    location: "Nairobi, Kenya",
    description:
      "Mentored web-track students and served as a panel judge during project reviews.",
  },
];

// Education
export const education = {
  degree: "BSc. Information Technology",
  school: "Kibabii University",
  period: "2018 — 2023",
  gpa: "3.4",
  location: "Kenya",
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  impact?: string; // scannable outcome line — recruiters want metrics up top
  tags: string[];
  href: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
  category: "Open Source" | "App" | "Learning" | "Tool";
};

export const projects: Project[] = [
  {
    name: "TechnicalWritingProgram",
    tagline: "Curated index of orgs & blogs that pay for technical writing",
    description:
      "A living repository cataloging companies, publications, and blogs that pay developers for technical articles — covering Python, JavaScript, Java, and Machine Learning topics. Includes submission guidelines, pay ranges (e.g. StackOverflow at $500/piece), and editor contacts.",
    impact: "33★ · indexed 50+ paying publications · referenced by freelance tech writers",
    tags: ["Open Source", "Technical Writing", "Curated List"],
    href: "https://github.com/Roy-Wanyoike/TechnicalWritingProgram",
    stars: 33,
    featured: true,
    category: "Open Source",
  },
  {
    name: "cars-plates-checker",
    tagline: "Algorithm that counts car plates between two registrations",
    description:
      "An efficient algorithm that takes two car plate numbers as input and outputs the total number of cars registered between them. Handles edge cases and plate format validation. Forked 37+ times by other developers.",
    impact: "37 forks · reused by 30+ developers · handles Kenyan plate formats",
    tags: ["Algorithm", "JavaScript", "Open Source"],
    href: "https://github.com/Roy-Wanyoike/cars-plates-checker",
    forks: 37,
    featured: true,
    category: "Tool",
  },
  {
    name: "svelte-chat-app",
    tagline: "Realtime chat application built with Svelte",
    description:
      "A lightweight, realtime chat application showcasing Svelte's reactivity model and clean component architecture. Demonstrates WebSocket integration, optimistic UI updates, and message persistence patterns.",
    impact: "0-JS-overhead UI · WebSocket realtime · optimistic message rendering",
    tags: ["Svelte", "Realtime", "WebSocket", "JavaScript"],
    href: "https://github.com/Roy-Wanyoike/svelte-chat-app",
    featured: true,
    category: "App",
  },
  {
    name: "weather-app-in-Vuejs3",
    tagline: "Vue 3 weather app with Composition API",
    description:
      "A clean weather forecasting app built with Vue 3's Composition API, demonstrating reactive state management, API integration, and component composition patterns.",
    impact: "Vue 3 Composition API · live weather API · reactive state management",
    tags: ["Vue.js 3", "Composition API", "Weather API"],
    href: "https://github.com/Roy-Wanyoike/weather-app-in-Vuejs3",
    category: "App",
  },
  {
    name: "90DaysOfDevOps",
    tagline: "A 90-day structured DevOps learning journey",
    description:
      "Documented a complete 90-day DevOps learning journey (Jan–Mar 2022) covering Linux, networking, cloud, CI/CD, containers, Kubernetes, IaC, and observability. Forked from Michael Cade's roadmap with personal notes.",
    impact: "90-day curriculum · Linux → K8s → CI/CD → observability · documented notes",
    tags: ["DevOps", "Learning", "Shell", "Kubernetes", "CI/CD"],
    href: "https://github.com/Roy-Wanyoike/90DaysOfDevOps",
    category: "Learning",
  },
  {
    name: "Data-Engineering-with-Python",
    tagline: "Hands-on data engineering notes and notebooks",
    description:
      "Personal notes and worked examples from the Packt 'Data Engineering with Python' course — covering ETL pipelines, data lakes, and stream processing patterns in Python.",
    impact: "ETL pipelines · data lakes · stream processing patterns",
    tags: ["Python", "Data Engineering", "ETL", "Learning"],
    href: "https://github.com/Roy-Wanyoike/Data-Engineering-with-Python",
    category: "Learning",
  },
];

export type Talk = {
  title: string;
  abstract: string;
  topics: string[];
  venue: string;
};

export const talks: Talk[] = [
  {
    title: "Server Components: The Epic Tale of Rendering UX",
    abstract:
      "A story-driven talk tracing the move from client-side rendering to SSR and finally to React/Next.js Server Components. Covers the 0-JS-bundle benefit, a live demo comparing CSR/SSR/RSC, performance analysis, and my take on the future of UI rendering.",
    topics: ["Next.js", "Server Components", "SSR", "Performance"],
    venue: "Community / Conference Talk",
  },
  {
    title: "Angular at Scale: Patterns That Survive Growth",
    abstract:
      "A practical session on structuring large Angular applications — module boundaries, lazy loading, state management, and testing strategies that hold up as teams and features grow.",
    topics: ["Angular", "Architecture", "Scaling", "Testing"],
    venue: "Community / Conference Talk",
  },
  {
    title: "API Security: Defending the Front Door",
    abstract:
      "A security-focused talk covering common API vulnerabilities — broken auth, mass assignment, injection — and the defensive patterns (rate limiting, schema validation, least-privilege tokens) that keep production APIs safe.",
    topics: ["API Security", "Authentication", "OWASP", "Backend"],
    venue: "Community / Conference Talk",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  description: string;
  date: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "Quickbase Professional Builder",
    issuer: "Quickbase University",
    description:
      "Certified as a Professional Builder on the Quickbase ESP platform — demonstrating proficiency in building scalable low-code business applications, workflows, and integrations.",
    date: "Certified",
    credentialUrl: "https://www.linkedin.com/posts/roywanyoike_quickbase-quickbaseuniversity-activity-7378721729277308928-Yrnb",
  },
  {
    title: "Microsoft Azure / Cloud Computing",
    issuer: "Microsoft",
    description:
      "Microsoft 365 Student Trainee (2021–2022) — cloud computing fundamentals and Microsoft 365 administration.",
    date: "2021–2022",
  },
  {
    title: "Data Engineering with Python",
    issuer: "Packt",
    description:
      "Currently in progress — covering ETL pipelines, data lakes, and stream processing patterns in Python.",
    date: "In Progress",
    credentialUrl: "https://github.com/Roy-Wanyoike/Data-Engineering-with-Python",
  },
  {
    title: "Ruby Programming for Backend",
    issuer: "Self-study",
    description:
      "Currently in progress — building backend Ruby skills to round out my language toolkit.",
    date: "In Progress",
  },
  {
    title: "GitHub Developer Program Member",
    issuer: "GitHub",
    description:
      "Active member of the GitHub Developer Program — building integrations, contributing to open source, and engaging with the broader GitHub developer community.",
    date: "Ongoing",
    credentialUrl: "https://github.com/Roy-Wanyoike",
  },
  {
    title: "90 Days of DevOps",
    issuer: "MichaelCade / Community",
    description:
      "Completed a structured 90-day DevOps learning journey covering Linux, cloud, CI/CD, containers, Kubernetes, IaC, and observability.",
    date: "2022",
    credentialUrl: "https://github.com/Roy-Wanyoike/90DaysOfDevOps",
  },
];

// Publications — recruiters value authorship signals
export const publications = [
  {
    title: "Beyond Data Risk",
    type: "Technical Article",
    description:
      "A published technical article exploring data risk, security, and how engineering teams can move beyond reactive controls toward proactive resilience.",
  },
];

export const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "API req/day", value: "10k+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Conference Talks", value: "20+" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Community", href: "#community" },
  { label: "Speaking", href: "#speaking" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
