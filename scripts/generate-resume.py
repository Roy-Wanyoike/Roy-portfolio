#!/usr/bin/env python3
"""ATS-friendly resume PDF for Royford Wanyoike Wamaitha.

Follows skills/pdf/briefs/resume.md: single column, no graphics/sidebars,
registered FreeSerif family, >=9pt everywhere, quantified bullets.
Output: public/resume.pdf (served by Next.js at /resume.pdf).
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Fonts ──
FB = "/usr/share/fonts/truetype/freefont/FreeSerif.ttf"
FB_B = "/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf"
FB_I = "/usr/share/fonts/truetype/freefont/FreeSerifItalic.ttf"
FB_BI = "/usr/share/fonts/truetype/freefont/FreeSerifBoldItalic.ttf"
pdfmetrics.registerFont(TTFont("FreeSerif", FB))
pdfmetrics.registerFont(TTFont("FreeSerif-Bold", FB_B))
pdfmetrics.registerFont(TTFont("FreeSerif-Italic", FB_I))
pdfmetrics.registerFont(TTFont("FreeSerif-BoldItalic", FB_BI))
registerFontFamily("FreeSerif", normal="FreeSerif", bold="FreeSerif-Bold",
                   italic="FreeSerif-Italic", boldItalic="FreeSerif-BoldItalic")

# ── Palette (from pdf.py palette.generate) ──
ACCENT = colors.HexColor("#2e94b6")
TEXT_MUTED = colors.HexColor("#5c584f")

# ── Styles ──
name_style = ParagraphStyle("Name", fontName="FreeSerif", fontSize=23, leading=27,
                            alignment=TA_CENTER, spaceAfter=2)
title_style = ParagraphStyle("Title", fontName="FreeSerif", fontSize=11, leading=14,
                             alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=2)
contact_style = ParagraphStyle("Contact", fontName="FreeSerif", fontSize=10, leading=14,
                               alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=6)
section_title_style = ParagraphStyle("Section", fontName="FreeSerif", fontSize=13,
                                     leading=16, spaceBefore=10, spaceAfter=4,
                                     textColor=ACCENT)
job_title_style = ParagraphStyle("JobTitle", fontName="FreeSerif", fontSize=11,
                                 leading=14, spaceAfter=1)
job_meta_style = ParagraphStyle("JobMeta", fontName="FreeSerif", fontSize=10,
                                leading=13, textColor=TEXT_MUTED, spaceAfter=3)
bullet_style = ParagraphStyle("Bullet", fontName="FreeSerif", fontSize=10, leading=13.5,
                              leftIndent=14, bulletIndent=0, spaceBefore=1, spaceAfter=1)
body_style = ParagraphStyle("Body", fontName="FreeSerif", fontSize=10, leading=13.5,
                            spaceAfter=2)


def section_header(title):
    return [
        Paragraph(f"<b>{title}</b>", section_title_style),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=6),
    ]


def experience_entry(title, company, dates, location, bullets):
    els = [Paragraph(f"<b>{title}</b>", job_title_style),
           Paragraph(f"{company}  |  {dates}  |  {location}", job_meta_style)]
    for b in bullets:
        els.append(Paragraph(f"\u2022 {b}", bullet_style))
    els.append(Spacer(1, 4))
    return els


def project_entry(name, line):
    return [Paragraph(f"<b>{name}</b> — {line}", body_style)]


doc = SimpleDocTemplate(
    "public/resume.pdf", pagesize=A4,
    leftMargin=1.5 * cm, rightMargin=1.5 * cm,
    topMargin=1.5 * cm, bottomMargin=1.5 * cm,
    title="Royford Wanyoike Wamaitha — Resume",
    author="Royford Wanyoike Wamaitha",
    creator="Royford Wanyoike Wamaitha",
    subject="Software Engineer | Quickbase Solutions Engineer — ATS resume",
)

story = []

# ── Header ──
story.append(Paragraph("<b>ROYFORD WANYOIKE WAMAITHA</b>", name_style))
story.append(Paragraph("Software Engineer  |  Quickbase Solutions Engineer  |  Developer Advocate",
                       title_style))
story.append(Paragraph(
    "Nairobi, Kenya  |  +254 706 103 000  |  roywanyoike328@gmail.com  |  "
    "github.com/Roy-Wanyoike  |  linkedin.com/in/roywanyoike",
    contact_style,
))

# ── Summary ──
story.extend(section_header("PROFESSIONAL SUMMARY"))
story.append(Paragraph(
    "Software Engineer and Technical Support professional with 3+ years building, debugging, "
    "and supporting full-stack applications and enterprise systems. Quickbase Professional "
    "Builder certified; recent HIPAA-compliant healthcare delivery for US clinical teams. "
    "Proven first-line support background with strong debugging and root-cause analysis; "
    "comfortable across low-code platforms (Quickbase), Node.js/TypeScript backends, and "
    "workflow orchestration (Temporal.io). 20+ conference talks; author of 'Beyond Data Risk'; "
    "110+ public repositories.",
    body_style,
))
story.append(Paragraph(
    "<b>Open to:</b> Software / Solutions Engineer, Quickbase Solutions Engineer, Technical "
    "Support Engineer, NOC Engineer, AI Trainer, Integration Engineer, Developer Advocate.",
    body_style,
))

# ── Skills ──
story.extend(section_header("CORE SKILLS"))
for cat, vals in [
    ("Languages", "TypeScript, JavaScript, Python, Go, SQL, Ruby"),
    ("Frontend", "React, Next.js, Angular, Svelte, Tailwind CSS"),
    ("Backend & Databases", "Node.js, Express, REST APIs, PostgreSQL, Prisma, Supabase, Redis"),
    ("Platforms & Workflow", "Quickbase (certified), Quickbase Pipelines, Temporal.io, "
                             "Microsoft Power Automate, Workday HCM"),
    ("Support & Operations", "Technical Support (L1/L2), Active Directory, HIPAA compliance, "
                             "DevOps (Linux, Docker, CI/CD), monitoring & incident triage"),
    ("AI & Data", "LLM integration, RAG pipelines, data engineering with Python"),
]:
    story.append(Paragraph(f"<b>{cat}:</b>  {vals}", body_style))

# ── Experience ──
story.extend(section_header("WORK EXPERIENCE"))
story.extend(experience_entry(
    "Software Solutions Engineer", "Imminent Transcendent Solutions",
    "Sep 2025 - Present", "Karen, Nairobi, Kenya",
    [
        "Build and maintain scalable Quickbase applications supporting operational efficiency "
        "across multiple business units.",
        "Automate workflows and integrate third-party systems, reducing manual processes and "
        "improving data accuracy.",
        "Develop custom dashboards, UIs, and reporting tools for real-time decision-making.",
        "Implement data governance: permission structures, validation rules, and secure access "
        "controls.",
        "Evaluate and integrate APIs; conduct user training and onboarding for high adoption.",
    ],
))
story.extend(experience_entry(
    "Quickbase Solutions Engineer", "Ethos Therapy Solutions",
    "Aug 2025 - Present", "United States (Remote)",
    [
        "Lead end-to-end Quickbase development for HIPAA-compliant healthcare applications "
        "serving US clinical teams.",
        "Engineer integrations via Quickbase Pipelines and APIs to sync therapy data with "
        "external billing and CRM platforms.",
        "Optimize performance by auditing legacy structures and refactoring complex "
        "many-to-many relationships for faster reporting.",
        "Build automated workflows and notifications for real-time communication between "
        "clinical and admin staff.",
        "Ensure HIPAA compliance and data security across all solutions with clinical "
        "stakeholders.",
    ],
))
story.extend(experience_entry(
    "Founding Engineer", "Skystock Developer Limited",
    "Jan 2025 - Jul 2025", "Remote",
    [
        "Built secure APIs handling 10,000+ daily requests with third-party system integrations.",
        "Implemented workflow orchestration with Temporal.io - improved system reliability to "
        "99.9% uptime.",
        "Streamlined business onboarding, cutting setup time from 2 days to under 4 hours.",
        "Drove MVP launch supporting 50+ active businesses within the first 3 months.",
    ],
))
story.extend(experience_entry(
    "Junior Software Engineer", "Opteamio Ltd",
    "Jan 2022 - Dec 2024", "Nairobi, Kenya",
    [
        "Built and maintained a commercial platform using Svelte, React.js, and Node.js "
        "serving 500+ users.",
        "Worked as Workday Analyst (HCM): wrote integration reports, diagnosed tenant system "
        "issues, learned Workday Integration.",
        "Collaborated on KPI development and aligned tech solutions with business objectives.",
        "Supported client onboarding and smooth transitions to new technologies.",
    ],
))
story.extend(experience_entry(
    "Information Risk Officer", "Opteamio Ltd",
    "Sep 2022 - Feb 2023", "United Kingdom (Remote)",
    [
        "Led a team of three in implementing an ISMS project for the company.",
        "Guided client companies through ISO certification processes.",
        "Conducted software security assessments for company products, covering network "
        "security controls.",
    ],
))
story.extend(experience_entry(
    "IT Support Engineer", "Gigsasa Ltd",
    "Jan 2023 - Jun 2023", "Nairobi, Kenya",
    [
        "Diagnosed and resolved hardware, software, and network issues for end-users.",
        "Installed, configured, and maintained workstations, peripherals, software, and "
        "network infrastructure.",
        "Managed user accounts and access permissions in Active Directory.",
    ],
))

# ── Projects ──
story.extend(section_header("SELECTED PROJECTS"))
for name, line in [
    ("SharkPush", "Communication Operating System for Africa and emerging markets - "
                  "intent-driven, multi-channel delivery infrastructure. Go, Next.js, Temporal, "
                  "NATS, ClickHouse; 15 language SDKs. Live: sharkpush.vercel.app"),
    ("Aurevia", "Market intelligence infrastructure - market data ingestion, quant analytics, "
                "risk-gated execution and portfolio intelligence with WebSocket streaming and "
                "ML-powered predictions."),
    ("Nexora (Nexa Pay)", "Stripe-grade multi-rail payment switch for Africa unifying cards, "
                          "mobile money, bank transfers and stablecoins, with AI fraud "
                          "detection. Live: nexora-zeta-green.vercel.app"),
    ("Digital Lending OS", "Multi-tenant SaaS platform for Kenyan Digital Credit Providers - "
                           "loan origination, scoring, disbursement, collections and CBK-ready "
                           "compliance reporting."),
]:
    story.extend(project_entry(name, line))

# ── Certifications ──
story.extend(section_header("CERTIFICATIONS"))
for c in [
    "Quickbase Professional Builder - Quickbase University",
    "Microsoft Azure / Cloud Computing - Microsoft (2021-2022)",
    "90 Days of DevOps - Michael Cade / Community (2022)",
    "Data Engineering with Python - Packt (in progress)",
]:
    story.append(Paragraph(f"\u2022 {c}", bullet_style))

# ── Education ──
story.extend(section_header("EDUCATION"))
story.append(Paragraph("<b>BSc. Information Technology</b>", job_title_style))
story.append(Paragraph("Kibabii University  |  2018 - 2023  |  Kenya  |  GPA: 3.4", job_meta_style))

# ── Speaking ──
story.extend(section_header("SPEAKING & WRITING"))
story.append(Paragraph(
    "\u2022 20+ conference talks on Angular, Next.js, Server Components, and API Security.",
    bullet_style,
))
story.append(Paragraph("\u2022 Author of 'Beyond Data Risk' (data protection and risk).", bullet_style))

doc.build(story)
print("resume.pdf generated")
