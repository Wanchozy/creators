# Creator Intelligence (CreatorIQ / PulseOS) — App & Marketing Website

Build an all-in-one **Creator Intelligence** SaaS web application and public marketing website designed to solve the 10 core pain points highlighted in the document: moving beyond generative AI gimmicks to provide actionable diagnosis, deal infrastructure, risk protection, and business clarity for modern digital creators.

---

## User Review Required

> [!IMPORTANT]
> **Product Architecture Strategy**:
> We propose unifying all 10 problem areas under a single cohesive brand — **Creator Intelligence OS** (e.g., *PulseOS* or *CreatorIQ*), organized into 3 clear product pillars:
> 1. **Content Intelligence**: *Algorithm Detective ("Why Did My Video Die?")*, *Creator Scientist (Winning Pattern Finder)*, and *Originality & Copycat Monitor*.
> 2. **Monetization & Safety**: *Pre-Publish Monetization Risk Scanner*, *Platform Changes Radar*, and *Qualified Views & RPM Demystifier*.
> 3. **Business & Deal Operations**: *Sponsor Radar (Brand Discovery)*, *Advanced Creator Deal & Rate Calculator*, and *Sponsorship Kanban CRM*.

> [!NOTE]
> We will construct both:
> - **A High-Converting Marketing Website**: Featuring an engaging hero, interactive preview widgets (e.g., a live interactive Rate Calculator demo and Algorithm Detective sandbox), value propositions, feature breakdowns, pricing tiers, and testimonial blocks.
> - **The Full Interactive Web Application**: A functional dashboard workspace with live state management, interactive tools for all 10 features, mock analytics data pipelines, file upload / test harnesses, and deal tracking.

---

## Open Questions

> [!IMPORTANT]
> 1. **Product Name & Branding**: Do you have a preferred name for this app (e.g., *PulseIQ*, *Creator Intelligence*, *Acuity*, *VigilantCreator*, *CreatorOS*)? We will use **PulseIQ (The Creator Intelligence Platform)** as default unless you prefer another name.
> 2. **Initial Rollout Focus**: Would you like the initial interactive prototype to have all 10 tools functional with mock/simulated intelligence engines, or would you prefer deeper backend integration for specific priority tools (such as the Deal CRM + Rate Calculator + Video Diagnostic Scanner)?
> 3. **Target Platforms**: Do you want primary focus on YouTube, TikTok, and Instagram (the three main platforms mentioned in the document), or should we also include LinkedIn/X/Podcasts?

---

## Proposed Changes

We will build the complete application in the scratch directory at `C:\Users\wnchzy\.gemini\antigravity\scratch\creator-intelligence-app`.

### Marketing & Web App Infrastructure

#### [NEW] [package.json](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/package.json)
- React 18 + Vite + TypeScript / JavaScript setup.
- Dependencies: `lucide-react` (icons), `recharts` (analytics charts), `clsx` + `tailwind-merge`, and Tailwind CSS for styling.

#### [NEW] [tailwind.config.js](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/tailwind.config.js)
- Modern dark & light creator-grade aesthetic (deep slate, violet/indigo accents, emerald success indicators, amber risk tags).

---

### Core Data & Mock Intelligence Engine

#### [NEW] [mockData.ts](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/data/mockData.ts)
- Sample datasets for all 10 features:
  - Video diagnostic historical data with benchmark baselines (CTR, retention graphs, drop-off timestamps).
  - Creator Scientist patterns (attributes correlated with high vs low performance).
  - Sponsor database (100+ simulated brands categorized by niche, audience geography, budget level, and direct contact roles).
  - Platform changelog feed (recent YouTube & TikTok policy shifts with flagged creator videos).
  - Deal pipeline data (Nike, Adobe, NordVPN, Sony deals with deliverables, milestones, and invoice states).

#### [NEW] [calculatorEngine.ts](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/services/calculatorEngine.ts)
- Multi-variable commercial pricing engine calculating baseline rate, audience access premium, usage rights markup, paid whitelisting fees, exclusivity multiplier, and deliverable bundling.

#### [NEW] [diagnosticEngine.ts](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/services/diagnosticEngine.ts)
- Algorithmic diagnostic logic translating low CTR, retention cliffs, and traffic source trends into plain-English "Why Did My Video Die?" post-mortems and recommended action tests.

---

### Marketing Website Components

#### [NEW] [LandingPage.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/marketing/LandingPage.tsx)
- Hero section: "Understand the business and performance of your content, not just another AI generator."
- Problem vs. Solution contrast cards directly mirroring the 10 complaints in the document.
- Interactive rate calculator & video diagnostic teaser embed.
- Feature deep dives (Content Lab, Shield/Safety, Deal OS).
- Transparent pricing plans (Solo Creator, Pro Creator, Agency/Manager).

#### [NEW] [Header.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/marketing/Header.tsx) & [Footer.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/marketing/Footer.tsx)
- Top navigation with smooth switching between Public Marketing site and App Workspace.

---

### Application Dashboard & Tools

#### [NEW] [AppShell.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/AppShell.tsx)
- Responsive creator sidebar navigation, workspace switcher, notification drawer (for platform policy alerts & deal payments).

#### [NEW] [AlgorithmDetective.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/AlgorithmDetective.tsx)
- Solves **Problem 1 ("My views suddenly collapsed")**:
- Select an underperforming video -> compares CTR, first 8s retention cliff, and 24h baseline -> outputs clear diagnostic breakdown and concrete experiments to run.

#### [NEW] [CreatorScientist.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/CreatorScientist.tsx)
- Solves **Problem 2 ("I have analytics, but I don't know what to do with them")**:
- Analyzes last 50 videos -> displays what actually works (e.g., 18-32s length, question hook, face-in-first-2s) vs what underperforms (long intro, >45s, generic title).

#### [NEW] [OriginalityMonitor.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/OriginalityMonitor.tsx)
- Solves **Problem 3 ("AI content crowding out original creators")**:
- Input script/title/concept -> scans for duplicate/scraped content across YouTube & TikTok, shows originality score and alerts when copycats appear.

#### [NEW] [SponsorRadar.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/SponsorRadar.tsx)
- Solves **Problem 4 ("Where are my brand deals?")**:
- Filters sponsors matching creator's niche (gaming, tech, lifestyle), audience geo (e.g. US, Kenya, UK), and size -> provides verified contacts, fit ratings, and previous campaign intel.

#### [NEW] [RateCalculator.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/RateCalculator.tsx)
- Solves **Problem 5 ("What should I charge?")**:
- Calculates fair market price factoring in platform, views, 60s integration vs UGC, brand reposting rights, paid ad usage, and exclusivity window.

#### [NEW] [MonetizationRiskScanner.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/MonetizationRiskScanner.tsx)
- Solves **Problem 6 ("Why was I demonetized?")**:
- Pre-upload risk checker evaluating narration ratio, third-party clips duration, repetitive formatting, and reused content risk according to 2025/2026 YouTube/TikTok policies.

#### [NEW] [PlatformChangeTracker.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/PlatformChangeTracker.tsx)
- Solves **Problem 7 ("The platforms keep changing")**:
- Weekly intelligence feed of algorithm & policy changes with "Your Content Affected?" impact flags.

#### [NEW] [SmartRecycler.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/SmartRecycler.tsx)
- Solves **Problem 8 ("Repurposing content is labor-intensive")**:
- "Human chooses, AI accelerates" interface showing top moments scored by viral potential (e.g. 92% "Why I quit my job") with instant export to Shorts/Reels/X carousels.

#### [NEW] [QualifiedRevenueAnalytics.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/QualifiedRevenueAnalytics.tsx)
- Solves **Problem 9 ("Views aren't the same as money")**:
- Visual funnel: Total Views -> Disqualified (<5s, repeated, fraudulent) -> Qualified Views -> RPM driver analysis ($1.62 RPM explanation).

#### [NEW] [DealPipelineCRM.tsx](file:///C:/Users/wnchzy/.gemini/antigravity/scratch/creator-intelligence-app/src/components/app/DealPipelineCRM.tsx)
- Solves **Problem 10 ("The entire sponsorship workflow is messy")**:
- Full visual Kanban pipeline: `Pitched` -> `Negotiating` -> `Contracted` -> `In Production` -> `Delivered` -> `Paid`.
- Deal detail modal: contract attachment, payment terms (e.g., 50% upfront, 50% net 30), usage limits, automated follow-up email generator, and invoice exporter.

---

## Verification Plan

### Automated Build Verification
1. Install dependencies via `npm install`.
2. Run TypeScript check & build:
   ```bash
   npm run build
   ```
3. Verify zero runtime and bundling errors.

### Interactive User Verification
1. Launch local dev server:
   ```bash
   npm run dev -- --host
   ```
2. Test both modes:
   - **Public Website Mode**: Verify landing page messaging, live interactive rate calculator preview, responsive design, feature breakdown.
   - **Creator App Workspace Mode**: Verify all 10 tools function seamlessly with live user inputs, interactive calculations, drag-and-drop Kanban updates, and diagnostic explanations.
