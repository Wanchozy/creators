# Architecture & Codebase Guide — Creator's Platform

> **"Instead of another AI that spits out generic content, Creator's builds the software that helps creators understand the business and real performance of their content."**

---

## 1. Architectural Philosophy: The 3-Zone Mental Model

The codebase is organized into three distinct top-level zones within `src/`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                               src/                                     │
├───────────────────┬────────────────────────────────┬───────────────────┤
│    1. website/    │            2. app/             │    3. shared/     │
│  (Public Surface) │      (Private Workspace)       │ (The Foundation)  │
├───────────────────┼────────────────────────────────┼───────────────────┤
│ • Landing page    │ • Command Center (Overview)    │ • Domain Engines  │
│ • Pricing tables  │ • Pillar 1: Content Lab        │ • Repositories    │
│ • Public teasers  │ • Pillar 2: Monetization Radar │ • Supabase Config │
│ • FAQs & sales    │ • Pillar 3: Deal Hub & CRM     │ • Domain Types    │
│                   │ • Workspace-specific modals    │ • Common UI       │
└───────────────────┴────────────────────────────────┴───────────────────┘
```

1. **`src/website/` (Public Marketing Website)**:
   * Contains everything a prospective creator or brand sees before logging in.
   * Focuses on conversion, clear problem statements, pricing breakdowns, FAQs, and interactive preview teasers.
   * **Rule**: Website code never imports app-specific views or private workspace modals.

2. **`src/app/` (Creator Intelligence Workspace)**:
   * The actual software product used by creators.
   * Structured around the product's **3 core pillars**:
     * **Content Lab**: Tools analyzing and testing video concepts.
     * **Monetization & Safety**: Tools protecting revenue and tracking algorithm shifts.
     * **Deal & Business Hub**: Commercial rate calculators, sponsor databases, and CRM pipeline.
   * **Rule**: Workspace views focus on presentation and UX. They never contain raw SQL queries or complex inline mathematical scoring.

3. **`src/shared/` (The Foundation)**:
   * Core logic and infrastructure shared across both the website and workspace.
   * Houses pure domain engines (e.g. rate calculations used in both public teasers and the private workspace), data repositories, reactive hooks, types, and common UI elements (Navbar, Footer, AuthModal).
   * **Rule**: Domain engines are 100% pure TypeScript functions with **zero React dependencies**.

---

## 2. Directory Tree & Responsibilities

```
creator's/
├── supabase/
│   └── schema.sql                     # PostgreSQL schema with Row-Level Security (RLS)
├── src/
│   ├── main.tsx                       # Mounts React DOM
│   ├── App.tsx                        # Root orchestrator: toggles between Website and App
│   ├── index.css                      # Global Tailwind directives & glassmorphic styling
│   ├── vite-env.d.ts                  # Vite client & environment variable typings
│   │
│   ├── website/                       # ZONE 1: PUBLIC MARKETING SURFACE
│   │   ├── pages/
│   │   │   └── LandingPage.tsx        # Hero, problem/solution cards, pricing, FAQs
│   │   └── components/
│   │       ├── InteractiveDiagnosisTeaser.tsx # Live drop autopsy demo
│   │       └── InteractiveRateTeaser.tsx      # Live rate slider demo
│   │
│   ├── app/                           # ZONE 2: CREATOR WORKSPACE
│   │   ├── shell/
│   │   │   └── AppShell.tsx           # Workspace sidebar layout & active view routing
│   │   │
│   │   ├── views/                     # Full-page feature views
│   │   │   ├── OverviewDashboard.tsx  # Command Center & high-level health metrics
│   │   │   │
│   │   │   ├── content-lab/           # Pillar 1: Content & Algorithm Intelligence
│   │   │   │   ├── AlgorithmDetectiveView.tsx # Video retention drop autopsy
│   │   │   │   ├── CreatorScientistView.tsx   # Statistical pattern discovery & tester
│   │   │   │   ├── OriginalityMonitorView.tsx # AI scraper detection & DMCA takedown
│   │   │   │   └── SmartRecyclerView.tsx      # Long-to-short vertical repurposing
│   │   │   │
│   │   │   ├── monetization/          # Pillar 2: Monetization & Safety
│   │   │   │   ├── MonetizationRiskScannerView.tsx # Pre-upload policy risk checker
│   │   │   │   ├── PlatformChangeTrackerView.tsx   # Cross-platform policy changelog
│   │   │   │   └── QualifiedRevenueAnalyticsView.tsx # TikTok rewards waterfall & RPM
│   │   │   │
│   │   │   └── deals/                 # Pillar 3: Deal & Business Hub
│   │   │       ├── RateCalculatorView.tsx     # Commercial rate & rights calculator
│   │   │       ├── SponsorRadarView.tsx       # Paying brand database & pitch generator
│   │   │       └── DealPipelineCRMView.tsx    # Kanban deal flow
│   │   │
│   │   └── components/                # Workspace-specific components & modals
│   │       ├── DealDetailModal.tsx        # Deal file inspection drawer
│   │       └── InvoiceModal.tsx           # Commercial invoice generator
│   │
│   └── shared/                        # ZONE 3: SHARED FOUNDATION
│       ├── components/                # Universal UI components
│       │   ├── Navbar.tsx             # Global top header, view toggle & auth status
│       │   ├── Footer.tsx             # Global footer with deep links
│       │   ├── AuthModal.tsx          # Sign-in / sign-up / Supabase auth modal
│       │   ├── ChannelSettingsModal.tsx # Channel profile, baseline & currency settings
│       │   └── Toast.tsx              # Application-wide non-blocking notification system
│       │
│       ├── config/                    # External services & environment setup
│       │   └── supabase.ts            # Supabase client singleton & configuration check
│       │
│       ├── domain/                    # Pure Domain Logic (100% portable, no React)
│       │   ├── rateCalculatorEngine.ts        # Pricing, CPM & licensing markup math
│       │   ├── diagnosticEngine.ts            # Retention drop & CTR diagnosis rules
│       │   └── patternScoringEngine.ts        # Creator Scientist hypothesis scoring
│       │
│       ├── repositories/              # Data Access Layer (Supabase + In-Memory Fallback)
│       │   ├── index.ts               # Barrel export
│       │   ├── authRepository.ts      # Authentication & user sessions
│       │   ├── profileRepository.ts   # CRUD for public.profiles
│       │   ├── dealsRepository.ts     # CRUD for public.sponsorship_deals
│       │   ├── diagnosticsRepository.ts # CRUD for public.video_diagnostics
│       │   ├── rateQuotesRepository.ts # CRUD for public.saved_rate_quotes
│       │   ├── copycatRepository.ts   # CRUD for public.copycat_alerts
│       │   └── sponsorsRepository.ts  # Queries for public.sponsor_directory
│       │
│       ├── hooks/                     # Reusable React State Hooks
│       │   ├── useAuth.ts             # Reactive user session state
│       │   ├── useProfile.ts          # Reactive creator channel baseline profile
│       │   ├── useDeals.ts            # Reactive deal pipeline state (optimistic UI)
│       │   ├── useDiagnostics.ts      # Reactive video autopsies & audits
│       │   ├── useRateQuotes.ts       # Reactive commercial quotes history
│       │   ├── useCopycats.ts         # Reactive clone/plagiarism incident alerts
│       │   └── useSponsors.ts         # Reactive sponsor directory state
│       │
│       ├── data/                      # Fallback & Seed Data
│       │   └── mockData.ts            # Rich fallback data for demo / offline mode
│       │
│       └── types/                     # Modular Domain Types
│           ├── index.ts               # Central barrel export
│           ├── common.ts              # Platform, AuthUser, UserProfile
│           ├── deals.ts               # DealStage, SponsorshipDeal
│           ├── diagnostics.ts         # VideoDiagnostic, RetentionPoint, CustomDiagnosisInput
│           ├── calculator.ts          # RateCalculationInput, RateCalculationResult, SavedRateQuote
│           ├── sponsors.ts            # BrandSponsor
│           └── content.ts             # PatternFactor, CopycatIncident, RiskCheck, etc.
```

---

## 3. Data Flow & Communication Rules

All data in the application follows a strict, unidirectional flow:

```
[ User Interaction ] 
        │
        ▼
[ View Component (e.g. DealPipelineCRMView) ]
        │ (calls)
        ▼
[ Reactive Hook (e.g. useDeals) ]
        │ (calls)
        ▼
[ Repository (e.g. dealsRepository) ]
        │ (checks hasSupabaseConfig())
        ├── Live: true  ──▶ [ Supabase PostgreSQL (via RLS) ]
        └── Live: false ──▶ [ In-Memory Demo Store (fallback) ]
```

### Key Principles:
1. **Graceful Fallback by Default**:
   If `.env` credentials are missing or the user is offline, the repositories automatically fall back to in-memory demo data. The app **never crashes** due to unconfigured backend credentials.
2. **Optimistic Updates**:
   Hooks like `useDeals()` update component state immediately upon user action (e.g. dragging a Kanban card to *Paid*), updating the database asynchronously and rolling back automatically if an error occurs.
3. **Pure Domain Engines**:
   Calculation engines in `src/shared/domain/` are pure functions:
   $$\text{Input} \longrightarrow \text{Output}$$
   They do not touch React state, DOM, or database calls. This allows them to be used identically by both marketing teasers and workspace tools, and makes them effortlessly unit-testable.

---

## 4. Path Aliasing (`@/*`)

The project uses `@/*` mapping directly to `src/*` configured in `tsconfig.json` and `vite.config.ts`:

```ts
// Clean, refactor-proof imports
import { useDeals } from '@/shared/hooks/useDeals';
import { calculateCreatorDealRate } from '@/shared/domain/rateCalculatorEngine';
import type { SponsorshipDeal } from '@/shared/types';
```

---

## 5. Developer Guide: Where Does New Code Belong?

| Task | Correct Location |
| :--- | :--- |
| Adding a new public marketing teaser | `src/website/components/` |
| Changing sales copy, pricing, or FAQ | `src/website/pages/LandingPage.tsx` |
| Adding a new feature to Content Lab | `src/app/views/content-lab/` |
| Adding a new feature to Monetization | `src/app/views/monetization/` |
| Adding a new feature to Deal Hub | `src/app/views/deals/` |
| Creating an app-specific modal or card | `src/app/components/<feature>/` |
| Modifying pricing math or retention rules | `src/shared/domain/` |
| Adding new database CRUD methods | `src/shared/repositories/` |
| Adding new domain entities / interfaces | `src/shared/types/` |
| Adding shared headers, footers, or auth UI | `src/shared/components/` |
