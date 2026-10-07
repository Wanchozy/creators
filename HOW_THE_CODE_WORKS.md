# 🎓 How This App Works: A Beginner's Guide to the Codebase

> **Welcome!** If you have never written a line of code in your life, or you are just getting started, this guide is written specifically for you. By the end of this document, you will understand what this application does, how the pieces fit together, and exactly where to make changes when you have new ideas.

---

## 🌟 Table of Contents
1. [The 30-Second Summary: What Does This App Do?](#1-the-30-second-summary-what-does-this-app-do)
2. [The Big Analogy: The Restaurant](#2-the-big-analogy-the-restaurant)
3. [The Journey: From "Here" to "There" (Step-by-Step Execution)](#3-the-journey-from-here-to-there-step-by-step-execution)
4. [The 4 Lego Blocks of the Codebase](#4-the-4-lego-blocks-of-the-codebase)
5. [The 3 Product Pillars (What Each Tool Does)](#5-the-3-product-pillars-what-each-tool-does)
6. [The "How Do I Modify This?" Recipe Book](#6-the-how-do-i-modify-this-recipe-book)
7. [Glossary of Developer Words](#7-glossary-of-developer-words)

---

## 1. The 30-Second Summary: What Does This App Do?

Most modern software for content creators just generates random AI scripts or images. **This app is different.**

This app is called **Creator's (PulseIQ)**. It is a **Creator Intelligence Operating System**. Think of it as a financial advisor, algorithmic detective, and talent manager all rolled into one platform:
* It tells creators **why their videos underperformed** (e.g. "Viewers left at second 8 because your intro was too slow").
* It tells creators **how much money to charge brands** for sponsorships (so they don't get underpaid).
* It scans sponsorship contracts for **legal traps** (like brands trying to own the creator's face forever).
* It provides a **Kanban pipeline CRM** to track sponsorships from pitch to payment.
* It creates a beautiful **public Media Kit** (one-sheet portfolio) that creators can send directly to brands.

---

## 2. The Big Analogy: The Restaurant

To understand web development without confusing jargon, picture this app as a high-end restaurant:

| Web Concept | The Restaurant Equivalent | Where it Lives in the Code |
| :--- | :--- | :--- |
| **HTML (`index.html`)** | The empty physical building (walls, floors, front doors). | `index.html` |
| **React (`main.tsx`)** | The staff opening the restaurant doors in the morning. | `src/main.tsx` |
| **Orchestrator (`App.tsx`)** | The Host / Maître d' directing guests to the right dining room. | `src/App.tsx` |
| **Views / Components** | The dining tables, menus, chairs, and plates. | `src/website/` and `src/app/` |
| **Domain Engines** | The Chef's secret recipes and math (measuring flour and spices). | `src/shared/domain/` |
| **Repositories** | The pantry and refrigerator where ingredients are stored. | `src/shared/repositories/` |
| **Supabase** | The external delivery truck supplying fresh goods. | `supabase/schema.sql` |

---

## 3. The Journey: From "Here" to "There" (Step-by-Step Execution)

What happens when someone opens the app in a web browser? Follow the path:

```
[ Step 1: index.html ]
   │  The browser loads this first. It contains an empty <div id="root"></div>.
   ▼
[ Step 2: src/main.tsx ]
   │  React wakes up, finds that empty "root" div, and injects our app inside.
   ▼
[ Step 3: src/App.tsx (Traffic Director) ]
   │  Checks: "What page did the user ask for?"
   ├── If URL is /m/username ──▶ [ PublicMediaKitPage.tsx ] (Public portfolio)
   ├── If User needs setup   ──▶ [ OnboardingFlow.tsx ]     (Setup wizard)
   ├── If User is browsing   ──▶ [ LandingPage.tsx ]        (Public marketing website)
   └── If User clicks Login  ──▶ [ AppShell.tsx ]           (Private workspace dashboard)
```

### Detailed Breakdown of the Steps:

#### Step 1: The Front Door (`index.html`)
The browser only understands HTML. When someone visits the site, it loads `index.html`. 
Inside `index.html`, there is one crucial line:
```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```
That's it! It is an empty box with a sign pointing to `main.tsx`.

#### Step 2: The Spark Plug (`src/main.tsx`)
This file is the "spark plug" that turns the engine on. It imports **React** and tells it:
> *"Take our master component `<App />` and mount it into that empty `root` box in `index.html`."*

#### Step 3: The Traffic Director (`src/App.tsx`)
`App.tsx` decides what the user should see:
1. **Public Media Kit Route**: If the browser URL is `your-site.com/m/techguy`, it immediately shows that creator's public portfolio one-sheet ([`PublicMediaKitPage.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/website/pages/PublicMediaKitPage.tsx)).
2. **Onboarding Route**: If an authenticated creator has never configured their channel, it routes them to the wizard ([`OnboardingFlow.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/onboarding/OnboardingFlow.tsx)).
3. **Marketing Website**: If the visitor is just browsing, it shows the sales landing page ([`LandingPage.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/website/pages/LandingPage.tsx)).
4. **App Workspace**: If the creator clicks "Open Workspace", it switches to the dashboard shell ([`AppShell.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/shell/AppShell.tsx)).

#### Step 4: The Workspace Frame (`src/app/shell/AppShell.tsx`)
When inside the workspace, `AppShell.tsx` renders:
* The **Sidebar** on the left with navigation links.
* The **Header** with search (`⌘K`), quick add button, and breadcrumbs.
* The **Central Stage** where the active tool is displayed (e.g. Rate Calculator, Algorithm Detective, CRM).

---

## 4. The 4 Lego Blocks of the Codebase

Every single file in this project belongs to one of four fundamental categories:

### Block 1: Components (The UI / Things You See)
* **What they do**: Define how buttons, cards, graphs, and screens look.
* **Extension**: `.tsx`
* **Example**: [`RateCalculatorView.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/views/deals/RateCalculatorView.tsx) displays sliders for views, checkboxes for licensing rights, and the calculated price tags.

### Block 2: Hooks (The Short-Term Memory)
* **What they do**: Keep track of temporary data while the user is using the app.
* **Rule**: Hook files always start with `use...` (e.g. `useDeals`, `useAuth`, `useMediaKit`).
* **Example**: When you move a deal card from "Pitched" to "Paid", [`useDeals.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/hooks/useDeals.ts) immediately updates the screen so there is zero lag.

### Block 3: Domain Engines (The Brain / Pure Math)
* **What they do**: Perform calculations, run formulas, and analyze text.
* **Rule**: Engines have **zero UI** (no HTML, no buttons, no CSS). They are 100% pure TypeScript functions:
  $$\text{Input} \longrightarrow \text{Formula} \longrightarrow \text{Result}$$
* **Why this is awesome**: Because they have no UI, the exact same engine that powers the private workspace can also power a free interactive teaser on the public marketing landing page!
* **Example**: [`rateCalculatorEngine.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/domain/rateCalculatorEngine.ts) takes:
  * Views: `50,000`
  * Deliverable: `60s YouTube integration`
  * Rights: `30 days paid whitelisting`
  * And calculates: `Recommended price: $3,200`.

### Block 4: Repositories (The Filing Cabinet / Storage)
* **What they do**: Save and fetch data from the database.
* **Rule**: Repositories feature **graceful fallback**. If you have connected a real Supabase database, it saves to the cloud. If you are offline or have no database keys, it saves to in-memory temporary storage. **The app never crashes!**
* **Example**: [`dealsRepository.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/repositories/dealsRepository.ts).

---

## 5. The 3 Product Pillars (What Each Tool Does)

The workspace tools are grouped into 3 distinct business pillars:

### 🏛️ Pillar 1: Content Lab (Algorithm Intelligence)
* **Algorithm Detective** (`AlgorithmDetectiveView.tsx`): Answers *"Why did my video die?"*. Compares viewer retention drop-offs at second 8 against channel averages to pinpoint why viewers left.
* **Creator Scientist** (`CreatorScientistView.tsx`): Analyzes previous videos to find winning patterns (e.g. videos with question titles and faces in the first 2 seconds get 34% higher retention).
* **Originality Monitor** (`OriginalityMonitorView.tsx`): Detects if AI bots or clone channels stole your script or thumbnail, and drafts a DMCA takedown notice.
* **Smart Recycler** (`SmartRecyclerView.tsx`): Finds the most viral 30-second moments inside a 20-minute video for quick export to TikTok/Reels.

### 🛡️ Pillar 2: Monetization & Safety
* **Monetization Risk Scanner** (`MonetizationRiskScannerView.tsx`): A pre-upload safety check. Warns if your video has too much unoriginal footage, copyright risk, or advertiser-unfriendly themes.
* **Platform Changes Tracker** (`PlatformChangeTrackerView.tsx`): A live radar of changes made by YouTube, TikTok, and Instagram with plain-English summaries of how your revenue might be affected.
* **Qualified Views & RPM Demystifier** (`QualifiedRevenueAnalyticsView.tsx`): Shows why 1,000,000 views on TikTok might only pay $200 (breaking down disqualified views, view duration, and regional CPMs).

### 💼 Pillar 3: Deal & Business Hub
* **Media Kit Studio & Pitches** (`MediaKitStudioView.tsx`): Generates a live, sharable portfolio link for brands with your stats, rate cards, and past sponsors. Also features an AI cold-pitch letter generator!
* **Sponsor Radar** (`SponsorRadarView.tsx`): A curated rolodex of brands actively paying creators in your niche, with verified contact emails and typical budgets.
* **Rate & Deal Calculator** (`RateCalculatorView.tsx`): Calculates fair sponsorship rates based on views, production effort, usage rights, and exclusivity.
* **Sponsorship CRM** (`DealPipelineCRMView.tsx`): A visual Kanban board (`Pitched` $\rightarrow$ `Negotiating` $\rightarrow$ `Active` $\rightarrow$ `Paid`). Clicking any deal opens `DealDetailModal.tsx`, which contains a **Contract Red Flag Scanner** that detects dangerous clauses like "rights in perpetuity" or "Net 90-day payment delays".

---

## 6. The "How Do I Modify This?" Recipe Book

Here are quick recipes for common things you might want to change or create:

### Recipe A: "I want to change some words or text on the landing page"
1. Open [`src/website/pages/LandingPage.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/website/pages/LandingPage.tsx).
2. Press `Ctrl + F` (or `Cmd + F` on Mac) and search for the sentence you want to change.
3. Edit the text between the quotes or tags.
4. Save the file. The browser will update immediately!

### Recipe B: "I want to change the calculation formula for sponsorship rates"
1. Open [`src/shared/domain/rateCalculatorEngine.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/domain/rateCalculatorEngine.ts).
2. Find line 15: `let cpm = 25;`.
3. Change the CPM numbers, the base fees, or the multipliers.
4. Because this is a pure engine, your change will instantly update both the marketing preview slider and the workspace calculator!

### Recipe C: "I want to add a new brand to the Sponsor Radar"
1. Open [`src/shared/data/mockData.ts`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/shared/data/mockData.ts).
2. Search for `mockSponsors`.
3. Copy one of the existing sponsor blocks, paste it at the bottom, and fill in the brand name, logo emoji, niche, and email.

### Recipe D: "I want to add a brand new page/tool to the workspace"
1. Create your new view file in `src/app/views/` (for example: `src/app/views/deals/TaxEstimatorView.tsx`).
2. Open [`src/app/shell/AppShell.tsx`](file:///C:/Users/wnchzy/Desktop/projects/creator's/src/app/shell/AppShell.tsx).
3. Import your new view at the top using `lazy(...)`.
4. Add an entry to the `navGroups` array (give it an `id`, `label`, and `icon`).
5. Add a line inside the `<Suspense>` block where tools are rendered:
   ```tsx
   {activeTab === 'tax-estimator' && <TaxEstimatorView />}
   ```

---

## 7. Glossary of Developer Words

* **Component**: A reusable building block of UI (like a Lego brick). Written in JSX/TSX.
* **State**: The variables that describe what is happening right now (e.g. "is the menu open? = true").
* **Props**: Inputs passed into a component (like parameters passed into a recipe).
* **Hook**: A helper function provided by React (starting with `use`) to manage state or lifecycle.
* **Vite**: The ultra-fast development server and build tool that runs this project.
* **TypeScript (`.ts` / `.tsx`)**: JavaScript with safety guardrails that prevents typos and errors before your code runs.
* **Tailwind CSS**: A system of styling classes (like `bg-slate-900 text-white p-4 rounded-xl`) to design interfaces without writing traditional CSS files.
* **Supabase**: A cloud database platform providing PostgreSQL and user authentication.
* **RLS (Row Level Security)**: Security rules in PostgreSQL ensuring Creator A can never see or modify Creator B's deals.
