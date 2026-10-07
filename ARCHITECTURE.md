# Architecture & Codebase Guide — Creator's Platform

> **"Instead of another AI that spits out generic content, Creator's builds the software that helps creators understand the business and real performance of their content."**

---

## 1. Architectural Philosophy: The 3-Zone Mental Model

The codebase is organized into three distinct top-level zones within `src/`, unified under a centralized orchestrator:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                         src/                                           │
├───────────────────────┬───────────────────────────────────────┬────────────────────────┤
│      1. website/      │                2. app/                │       3. shared/       │
│   (Public Marketing)  │         (Private Workspace)           │    (The Foundation)    │
├───────────────────────┼───────────────────────────────────────┼────────────────────────┤
│ • Landing page        │ • Command Center (Overview)           │ • Pure Domain Engines  │
│ • Public Media Kit    │ • Pillar 1: Content Lab (4 tools)     │ • Data Repositories    │
│ • Interactive teasers │ • Pillar 2: Monetization Radar (3)    │ • Supabase RLS Config  │
│ • Scroll stories      │ • Pillar 3: Deal & Business Hub (4)   │ • Modular Domain Types │
│ • Dual Theme (Lt/Dk)  │ • Onboarding Wizard & Modals          │ • Motion Design System │
└───────────────────────┴───────────────────────────────────────┴────────────────────────┘
```

### The 4 Application Runtime States (`App.tsx`)
The root orchestrator in [`App.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/App.tsx) manages four routing and display states:

1. **Public Marketing Surface (`currentView === 'marketing'`)**:
   * Public landing page featuring value propositions, interactive feature teasers, pricing tables, and FAQs.
   * Supports dynamic **Dark/Light Mode** via `data-site-theme` attribute and `creators-marketing-theme` local storage.
   * Purely conversion-focused; never imports workspace-internal modals or private views.

2. **Public One-Sheet Route (`/m/:handle`)**:
   * Clean, public-facing view for creator media kits rendered by [`PublicMediaKitPage`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/website/pages/PublicMediaKitPage.tsx).
   * Strips all workspace chrome, navbar, and sidebar to deliver a shareable portfolio one-sheet with dynamic rate cards, live reach metrics, and contact triggers.

3. **Creator Onboarding Wizard (`currentView === 'onboarding'`)**:
   * Multi-step channel configuration wizard ([`OnboardingFlow`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/onboarding/OnboardingFlow.tsx)) activated for first-time users or via Channel Settings.
   * Collects creator persona, primary platforms, subscriber baselines, and core growth goals.

4. **Creator Intelligence Workspace (`currentView === 'app'`)**:
   * Private SaaS dashboard loaded inside [`AppShell`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/shell/AppShell.tsx).
   * High-contrast, command-center dark UI featuring top breadcrumb navigation, live benchmark status, global `⌘K` command palette, and hotkeys (`G+O`, `G+D`).

---

## 2. Directory Tree & Responsibilities

```
creator's/
├── supabase/
│   └── schema.sql                               # PostgreSQL schema with Row-Level Security (RLS)
├── src/
│   ├── main.tsx                                 # Mounts React DOM
│   ├── App.tsx                                  # Root orchestrator: routes between Marketing, App, Onboarding & /m/:handle
│   ├── index.css                                # Global Tailwind directives & glassmorphic styling
│   ├── vite-env.d.ts                            # Vite client & environment variable typings
│   │
│   ├── website/                                 # ZONE 1: PUBLIC MARKETING SURFACE
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx                  # Hero, problem/solution cards, pricing, FAQs, testimonials
│   │   │   └── PublicMediaKitPage.tsx           # Standalone public /m/:handle one-sheet viewer
│   │   └── components/
│   │       ├── HeroProductMockup.tsx            # Interactive hero preview with animated tabs & floating pills
│   │       ├── InteractiveDiagnosisTeaser.tsx   # Live video retention drop autopsy demo widget
│   │       ├── InteractiveMediaKitTeaser.tsx    # Live creator media kit & rate package demo widget
│   │       ├── InteractiveRateTeaser.tsx        # Live commercial sponsorship rate slider demo widget
│   │       └── ScrollStory.tsx                  # Pinned visual scroll story demonstrating core pillars
│   │
│   ├── app/                                     # ZONE 2: CREATOR WORKSPACE
│   │   ├── onboarding/
│   │   │   └── OnboardingFlow.tsx               # Stepper onboarding (Persona, Platforms, Goals, Workspace Setup)
│   │   │
│   │   ├── shell/
│   │   │   └── AppShell.tsx                     # Workspace sidebar, breadcrumb header, hotkeys, status bar
│   │   │
│   │   ├── views/                               # Full-page feature views (lazy-loaded chunks)
│   │   │   ├── OverviewDashboard.tsx            # Command Center & cross-pillar health metrics
│   │   │   │
│   │   │   ├── content-lab/                     # Pillar 1: Content & Algorithm Intelligence
│   │   │   │   ├── AlgorithmDetectiveView.tsx   # Retention drop & CTR autopsy analysis
│   │   │   │   ├── CreatorScientistView.tsx     # Statistical pattern discovery & hypothesis testing
│   │   │   │   ├── OriginalityMonitorView.tsx   # AI scraper detection, clone tracking & DMCA generator
│   │   │   │   └── SmartRecyclerView.tsx        # Long-to-short vertical viral moment extractor
│   │   │   │
│   │   │   ├── monetization/                    # Pillar 2: Monetization & Safety
│   │   │   │   ├── MonetizationRiskScannerView.tsx # Pre-upload guideline & reused content risk checker
│   │   │   │   ├── PlatformChangeTrackerView.tsx   # Cross-platform algorithm & policy changelog feed
│   │   │   │   └── QualifiedRevenueAnalyticsView.tsx # TikTok rewards & YouTube qualified views waterfall & RPM
│   │   │   │
│   │   │   └── deals/                           # Pillar 3: Deal & Business Hub
│   │   │       ├── MediaKitStudioView.tsx       # One-sheet editor, custom pitch letters & public link manager
│   │   │       ├── SponsorRadarView.tsx         # Curated brand directory, match scores & pitch creator
│   │   │       ├── RateCalculatorView.tsx       # Commercial rate, licensing, whitelisting & quote builder
│   │   │       └── DealPipelineCRMView.tsx      # Kanban deal pipeline (Pitched -> Negotiating -> Paid)
│   │   │
│   │   └── components/                          # Workspace-specific modals & inspection drawers
│   │       ├── DealDetailModal.tsx              # Deal file drawer with built-in Contract Red Flag Scanner
│   │       ├── InvoiceModal.tsx                 # Commercial invoice generator & print/PDF layout
│   │       └── CommandPaletteModal.tsx          # Global ⌘K quick switcher & action launcher
│   │
│   └── shared/                                  # ZONE 3: SHARED FOUNDATION
│       ├── components/                          # Universal UI components
│       │   ├── Navbar.tsx                       # Global header, view toggle, theme switcher & auth trigger
│       │   ├── Footer.tsx                       # Public footer with deep navigation links
│       │   ├── AuthModal.tsx                    # Supabase sign-in/sign-up authentication dialog
│       │   ├── ChannelSettingsModal.tsx         # Channel profile, baselines & currency settings dialog
│       │   ├── Toast.tsx                        # Application-wide non-blocking notification context
│       │   └── motion/                          # Reusable Framer Motion & design system primitives
│       │       ├── index.ts                     # Barrel export for motion primitives
│       │       ├── BorderBeam.tsx               # Animated gradient border beam
│       │       ├── CursorSpotlight.tsx          # Mouse-following ambient spotlight
│       │       ├── FadeInWhenVisible.tsx        # Intersection-observer scroll reveal
│       │       ├── FloatingCard.tsx             # 3D interactive tilt card container
│       │       ├── RollingNumber.tsx            # Smooth animated number counter
│       │       ├── ScrollProgress.tsx           # Page scroll completion indicator bar
│       │       ├── SpotlightCard.tsx            # Radial spotlight hover card
│       │       ├── SurfaceCard.tsx              # Glassmorphic card surface container
│       │       └── TechBackground.tsx           # Ambient grid & background gradient canvas
│       │
│       ├── config/                              # External integrations
│       │   └── supabase.ts                      # Supabase client singleton & configuration check
│       │
│       ├── domain/                              # Pure Domain Engines (100% portable, no React dependencies)
│       │   ├── rateCalculatorEngine.ts          # Baseline CPM, rights licensing, exclusivity & rush fee math
│       │   ├── diagnosticEngine.ts              # Retention drop thresholds, CTR audits & plain-English actions
│       │   ├── patternScoringEngine.ts          # Video attribute correlation & winning pattern hypothesis scoring
│       │   ├── contractScannerEngine.ts         # Audit engine detecting predatory clauses (perpetual, Net-90, etc.)
│       │   ├── mediaKitEngine.ts                # Cross-platform reach aggregation, CPM tiers & demographic blend
│       │   └── pitchGeneratorEngine.ts          # Cold brand outreach & customized sponsorship pitch letter generator
│       │
│       ├── repositories/                        # Data Access Layer (Supabase PostgreSQL + In-Memory Fallback)
│       │   ├── index.ts                         # Barrel export
│       │   ├── authRepository.ts                # Authentication & user sessions
│       │   ├── profileRepository.ts             # CRUD for public.profiles
│       │   ├── dealsRepository.ts               # CRUD for public.sponsorship_deals
│       │   ├── diagnosticsRepository.ts         # CRUD for public.video_diagnostics
│       │   ├── rateQuotesRepository.ts          # CRUD for public.saved_rate_quotes
│       │   ├── copycatRepository.ts             # CRUD for public.copycat_alerts
│       │   ├── sponsorsRepository.ts            # Queries for public.sponsor_directory
│       │   └── mediaKitRepository.ts            # CRUD & persistence for media_kits
│       │
│       ├── hooks/                               # Reusable React State Hooks
│       │   ├── useAuth.ts                       # Reactive user session & configuration state
│       │   ├── useProfile.ts                    # Reactive creator channel baseline profile & settings
│       │   ├── useDeals.ts                      # Reactive deal pipeline state with optimistic UI updates
│       │   ├── useDiagnostics.ts                # Reactive video autopsies & custom audit runner
│       │   ├── useRateQuotes.ts                 # Reactive saved commercial rate quotes
│       │   ├── useCopycats.ts                   # Reactive clone/plagiarism incident alerts & status
│       │   ├── useSponsors.ts                   # Reactive sponsor directory state & filtering
│       │   └── useMediaKit.ts                   # Reactive media kit state, package editor & profile sync
│       │
│       ├── data/                                # Fallback & Seed Data
│       │   └── mockData.ts                      # Rich fallback dataset for offline/sandbox mode
│       │
│       └── types/                               # Modular Domain Types
│           ├── index.ts                         # Central barrel export
│           ├── common.ts                        # Platform, AuthUser, UserProfile, Onboarding types
│           ├── deals.ts                         # DealStage, SponsorshipDeal, DealDeliverable
│           ├── diagnostics.ts                   # VideoDiagnostic, RetentionPoint, CustomDiagnosisInput
│           ├── calculator.ts                    # RateCalculationInput, RateCalculationResult, SavedRateQuote
│           ├── sponsors.ts                      # BrandSponsor, SponsorCategory, BudgetTier
│           ├── content.ts                       # PatternFactor, CopycatIncident, MonetizationRiskCheck, PolicyChange
│           └── mediakit.ts                      # MediaKitProfile, RateCardPackage, PitchDraft, ContractScanReport
```

---

## 3. Product Pillar Breakdown

The Creator Workspace is architected around **three core product pillars** plus an overarching Command Center:

### Overview & Command Center
* **`OverviewDashboard.tsx`**: High-level telemetry aggregation. Displays total qualified revenue, active CRM deal value, pending risk alerts, and quickest action items across all pillars.

### Pillar 1: Content Lab (Algorithm & Performance Intelligence)
1. **Algorithm Detective (`AlgorithmDetectiveView.tsx`)**:
   * Diagnoses underperforming videos by analyzing the first 8-second retention drop, CTR vs. channel baseline, and traffic source shift.
   * Outputs plain-English post-mortems and recommended action tests.
2. **Creator Scientist (`CreatorScientistView.tsx`)**:
   * Surfaces winning patterns from historical video datasets (e.g. hook duration, title framing, face presence).
   * Runs hypothesis tests before production.
3. **Originality Monitor (`OriginalityMonitorView.tsx`)**:
   * Scans for AI-generated clone channels, scraped scripts, and re-uploaded videos.
   * Provides a built-in DMCA takedown notice generator.
4. **Smart Recycler (`SmartRecyclerView.tsx`)**:
   * Identifies high-retention moments in long-form videos to repurpose into TikToks, Shorts, and Reels.

### Pillar 2: Monetization & Safety
1. **Monetization Risk Scanner (`MonetizationRiskScannerView.tsx`)**:
   * Pre-upload risk checker evaluating narration ratio, fair-use clip length, repetitive formatting, and reused content flags.
2. **Platform Change Tracker (`PlatformChangeTrackerView.tsx`)**:
   * Curated changelog feed of YouTube, TikTok, and Meta algorithm and guideline changes with personalized impact assessments.
3. **Qualified Views & RPM Demystifier (`QualifiedRevenueAnalyticsView.tsx`)**:
   * Demystifies monetization waterfalls (Total Views $\rightarrow$ Disqualified Views $\rightarrow$ Qualified Views $\times$ RPM).

### Pillar 3: Deal & Business Hub
1. **Media Kit Studio & Pitches (`MediaKitStudioView.tsx`)**:
   * Professional creator one-sheet builder with customized rate packages, verified past sponsors, and audience demographics.
   * Integrates an AI cold outreach pitch generator ([`pitchGeneratorEngine.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/domain/pitchGeneratorEngine.ts)) and public web link generator.
2. **Sponsor Radar (`SponsorRadarView.tsx`)**:
   * Curated directory of active brand sponsors filtered by niche, audience geography, budget tier, and verified direct contacts.
3. **Rate & Deal Calculator (`RateCalculatorView.tsx`)**:
   * Multi-variable commercial pricing engine ([`rateCalculatorEngine.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/domain/rateCalculatorEngine.ts)) factoring in deliverables, usage rights duration, paid whitelisting fees, and exclusivity windows.
4. **Sponsorship CRM (`DealPipelineCRMView.tsx`)**:
   * Visual Kanban pipeline (`Pitched` $\rightarrow$ `Negotiating` $\rightarrow$ `Active` $\rightarrow$ `Delivered` $\rightarrow$ `Paid`).
   * Powered by [`DealDetailModal.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/components/DealDetailModal.tsx) which includes an automated **Contract Clause & Red Flag Scanner** ([`contractScannerEngine.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/domain/contractScannerEngine.ts)) and invoice generator ([`InvoiceModal.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/components/InvoiceModal.tsx)).

---

## 4. Data Flow & Communication Rules

All data in the application follows a strict, unidirectional flow:

```
[ User Interaction / View Event ]
               │
               ▼
[ Workspace / Marketing Component ]
               │ (calls)
               ▼
[ Reactive Hook (e.g. useDeals, useMediaKit) ]
               │ (calls)
               ▼
[ Repository (e.g. dealsRepository, mediaKitRepository) ]
               │ (evaluates hasSupabaseConfig())
               ├─────────────────────────────────────────┐
               ▼                                         ▼
      [ Live: true ]                            [ Live: false ]
[ Supabase Client (PostgreSQL + RLS) ]    [ In-Memory Demo Store (Fallback) ]
```

### Key Principles:

1. **Graceful Fallback by Default (Sandbox Mode)**:
   * If `.env` credentials are not present or the client is offline, all repositories automatically fall back to typed in-memory stores initialized from [`mockData.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/data/mockData.ts).
   * The application **never crashes or blocks UI rendering** due to unconfigured backend credentials.

2. **Optimistic Updates**:
   * Hooks like `useDeals()` and `useMediaKit()` update the UI state immediately upon user action (e.g. moving a deal card or toggling a package), persisting to Supabase in the background and rolling back with a toast alert on failure.

3. **Pure Domain Engines**:
   * Calculation and auditing logic in `src/shared/domain/` are 100% pure TypeScript functions:
     $$\text{Input} \longrightarrow \text{Output}$$
   * They have **zero dependencies** on React, DOM, or network I/O.
   * This guarantees that the exact same pricing math and audit logic powers both public marketing teasers and workspace tools, while being easily unit-testable.

4. **Code Splitting & Bundle Optimization**:
   * All top-level pages and workspace view components are loaded via `React.lazy()` and wrapped in `<Suspense>`.
   * Heavy libraries (`framer-motion`, `@supabase/supabase-js`, `lucide-react`) are isolated into dedicated vendor chunks via Vite build optimization.

---

## 5. Path Aliasing (`@/*`)

The project uses `@/*` mapping directly to `src/*` configured in `tsconfig.json` and `vite.config.ts`:

```ts
// Clean, refactor-proof imports
import { useDeals } from '@/shared/hooks/useDeals';
import { useMediaKit } from '@/shared/hooks/useMediaKit';
import { calculateCreatorDealRate } from '@/shared/domain/rateCalculatorEngine';
import { scanSponsorshipContract } from '@/shared/domain/contractScannerEngine';
import { SurfaceCard, BorderBeam } from '@/shared/components/motion';
import type { SponsorshipDeal, MediaKitProfile } from '@/shared/types';
```

---

## 6. Developer Guide: Where Does New Code Belong?

| Task / Feature | Correct Location |
| :--- | :--- |
| Adding or modifying a public marketing teaser widget | `src/website/components/` |
| Updating marketing copy, pricing plans, or FAQs | `src/website/pages/LandingPage.tsx` |
| Adding a standalone public page or shareable portfolio view | `src/website/pages/` (e.g. `PublicMediaKitPage.tsx`) |
| Adding a step or question to the creator setup wizard | `src/app/onboarding/OnboardingFlow.tsx` |
| Adding a tool to Pillar 1 (Content & Algorithm Intelligence) | `src/app/views/content-lab/` |
| Adding a tool to Pillar 2 (Monetization & Safety) | `src/app/views/monetization/` |
| Adding a tool to Pillar 3 (Deal & Business Hub) | `src/app/views/deals/` |
| Creating an app-specific modal, drawer, or action dialog | `src/app/components/` |
| Creating reusable motion or animation primitives | `src/shared/components/motion/` |
| Updating pricing math, contract audit regex, or scoring | `src/shared/domain/` |
| Adding new database CRUD methods or table adapters | `src/shared/repositories/` |
| Adding new reactive state management hooks | `src/shared/hooks/` |
| Adding or modifying TypeScript domain interfaces | `src/shared/types/` |
| Adding shared chrome (Navbar, Footer, Auth, Settings, Toast) | `src/shared/components/` |
