import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  TrendingDown,
  Brain,
  ShieldAlert,
  Briefcase,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Scissors,
  BarChart3,
  Layers,
  CheckCircle,
  HelpCircle,
  Zap,
  Globe,
  Star,
  ChevronRight,
  Activity,
  Check,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRateTeaser } from "../components/InteractiveRateTeaser";
import { InteractiveDiagnosisTeaser } from "../components/InteractiveDiagnosisTeaser";
import { InteractiveMediaKitTeaser } from "../components/InteractiveMediaKitTeaser";
import { HeroProductMockup } from "../components/HeroProductMockup";
import {
  SpotlightCard,
  BorderBeam,
  FadeInWhenVisible,
  RollingNumber,
  SurfaceCard,
} from "@/shared/components/motion";

interface LandingPageProps {
  onLaunchApp: () => void;
  onNavigateToModule: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onNavigateToModule,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "drops" | "monetization" | "deals"
  >("all");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual",
  );
  const [activeStoryStage, setActiveStoryStage] = useState<
    "cliff" | "pricing" | "mediakit"
  >("cliff");

  const problemSolutions = [
    {
      num: "01",
      category: "drops",
      problem: "Sudden, unexplained drops in reach",
      experience:
        "Posts drop from 100k views to 424 views with zero clear explanation from studio charts.",
      solution: "Algorithm Detective",
      desc: "Pinpoints the exact drop-off reason: 8-second retention cliff, sub-baseline CTR, or seed cohort failure.",
      tab: "detective",
      icon: TrendingDown,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
      num: "02",
      category: "drops",
      problem: "You have analytics, but don't know what to do with them",
      experience:
        "Data ≠ explanation. Video A got 80k views, Video B got 3k. What did you actually do differently?",
      solution: "Creator Scientist",
      desc: "Statistically compares your winning vs underperforming content to extract proven patterns (hook timing, face presence, length).",
      tab: "scientist",
      icon: Brain,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      num: "03",
      category: "monetization",
      problem: "AI spam channels crowding out original creators",
      experience:
        "Low-effort automated channels scrape original scripts, titles, and concepts within hours.",
      solution: "Originality & Copy Monitor",
      desc: "Continuously monitors YouTube & TikTok for concept scrapers and alerts you with automated takedown scripts.",
      tab: "originality",
      icon: ShieldAlert,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      num: "04",
      category: "deals",
      problem: "Finding consistent sponsorships is painful",
      experience:
        "Creator & manager inbox mess trying to find brands with actual budget in their specific niche.",
      solution: "Sponsor Radar",
      desc: "Discovers active paying sponsors matching your exact audience niche and geography (US, UK, Kenya, etc.) with direct contact leads.",
      tab: "sponsor-radar",
      icon: Briefcase,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      num: "05",
      category: "deals",
      problem: "Creators don't know what to charge brands",
      experience:
        "Leaving thousands on the table by charging simple follower-count flat fees instead of pricing commercial rights.",
      solution: "Creator Rate Calculator",
      desc: "Calculates real commercial deal value: base production, audience access, paid ad whitelisting, and exclusivity lockouts.",
      tab: "rate-calculator",
      icon: DollarSign,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      num: "06",
      category: "monetization",
      problem: "Monetization decisions feel unpredictable",
      experience:
        'Sudden demonetization strikes for "Inauthentic Content" or "Reused Content" with zero advance warning.',
      solution: "Monetization Risk Scanner",
      desc: "Pre-upload policy scanner detecting un-commentated third-party footage and template repetition before you publish.",
      tab: "risk-scanner",
      icon: AlertTriangle,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
    },
    {
      num: "07",
      category: "monetization",
      problem: "Platform changes force constant adaptation",
      experience:
        "YouTube & TikTok shift algorithms and disclosure rules overnight, rendering old formats obsolete.",
      solution: "Platform Change Tracker",
      desc: "A unified feed of algorithm and policy shifts with personalized flags on which of your videos are affected.",
      tab: "platform-changes",
      icon: RefreshCw,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      num: "08",
      category: "drops",
      problem:
        "Turning 1 long video into multi-platform clips is labor-intensive",
      experience:
        "Existing AI tools generate random boring snippets without understanding high-retention human tension.",
      solution: "Smart Content Recycler",
      desc: '"Human chooses, AI accelerates." Identifies viral potential moments, tension quotes, and ready-to-publish vertical crops.',
      tab: "recycler",
      icon: Scissors,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      num: "09",
      category: "monetization",
      problem: "Views aren't the same as money",
      experience:
        "255k views on TikTok Creator Rewards yielding only 168k qualified views. Creators confused why RPM moves.",
      solution: "Qualified Revenue Analytics",
      desc: "Dissects your real monetizable views vs disqualifications, revealing what factors drove your RPM higher or lower.",
      tab: "revenue-analytics",
      icon: BarChart3,
      color: "text-green-400 bg-green-500/10 border-green-500/20",
    },
    {
      num: "10",
      category: "deals",
      problem: "Sponsorship administration is a chaotic mess",
      experience:
        "Managing 10-20 active deals across DMs, spreadsheets, lost contracts, and late invoice follow-ups.",
      solution: "Creator Deal Pipeline CRM",
      desc: "Visual Kanban pipeline tracking pitched, negotiating, active, and paid deals with automated reminders and invoice generation.",
      tab: "deal-crm",
      icon: Layers,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const filteredProblems =
    categoryFilter === "all"
      ? problemSolutions
      : problemSolutions.filter((p) => p.category === categoryFilter);

  const faqs = [
    {
      q: 'How is "Creator\'s" different from other AI tools like ChatGPT or Jasper?',
      a: "Most AI tools for creators are generative—they generate more text, scripts, or images, flooding platforms with AI noise. Creator's is Creator Intelligence: software designed to help you understand why your content succeeded or failed, what your deals are actually worth, whether you risk demonetization, and how platform algorithm updates affect your specific catalog.",
    },
    {
      q: "Does Creator's require full channel access?",
      a: "You can use Creator's via read-only official YouTube and TikTok OAuth APIs, or you can manually paste your analytics numbers or upload video files for pre-flight diagnosis. We never ask for publishing or management permissions on your channel.",
    },
    {
      q: "Can Creator's guarantee that my video won't be demonetized?",
      a: "No automated software can legally guarantee YouTube or TikTok's internal human review decisions. However, our Monetization Risk Scanner cross-references your video against known 2025/2026 guidelines (such as the 40+ continuous second third-party footage rule and repetitious narration thresholds) to highlight specific risk timestamps before you upload.",
    },
    {
      q: "How does the Deal & Rate Calculator know what to charge?",
      a: "Unlike naive calculators that just multiply followers by $10, Creator's calculates based on actual commercial value: production cost, realistic audience CPM, paid whitelisting/ad usage multipliers (often +30-50% extra), exclusivity lockouts, and deliverable format.",
    },
    {
      q: "How does progress resume across sessions?",
      a: "When you register and start your guided onboarding journey, your persona, benchmarks, and completed steps are saved in real-time. If you close your browser and return later, Creator's resumes seamlessly right from the exact step you were on.",
    },
  ];

  return (
    <div className="space-y-24 pb-20 relative">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden border-b border-white/[0.06]">
        {/* Vercel-Style Precision Hairline Background Grid */}
        <div className="absolute inset-0 bg-grid-hairline opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle Category Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-semibold text-slate-200">
              The Creator Intelligence Category
            </span>
            <span className="text-slate-500 font-mono text-[11px]">v2.0</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto"
          >
            Stop guessing why your views collapsed.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Understand the business of your content.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mt-6 mb-8 font-normal"
          >
            Not another generic AI script generator. Direct causal diagnoses for
            algorithmic view drops, audited commercial rate pricing, and
            pre-upload monetization risk protection.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-5"
          >
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto h-12 px-7 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition transform hover:-translate-y-0.5"
            >
              <span>Launch Creator Workspace</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <a
              href="#problems"
              className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 font-semibold text-sm flex items-center justify-center transition"
            >
              <span>Explore 10 Solutions</span>
            </a>
          </motion.div>

          <div className="text-[11px] text-slate-500 font-mono flex items-center justify-center space-x-2 mb-12">
            <span>Zero channel write permissions required</span>
            <span>•</span>
            <span>Read-only benchmark modeling</span>
            <span>•</span>
            <span>Supabase RLS</span>
          </div>

          {/* The Linear-Style Interactive Product Showcase Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-14"
          >
            <HeroProductMockup
              onOpenApp={(tab) => onNavigateToModule(tab || "overview")}
            />
          </motion.div>

          {/* Social Proof / Key Performance Stats */}
          <div className="pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                10
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Core Creator Problems Solved
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                <RollingNumber value={1450} prefix="+$" />
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Avg Deal Value Recaptured
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-400 font-mono">
                0:08s
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Retention Cliff Diagnosis
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono">
                100%
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Human Choice + AI Speed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Demos Section: Framer-Style 3-Act Storytelling Showcase */}
      <FadeInWhenVisible className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono uppercase text-[11px] font-semibold">
              Interactive Sandbox
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See the Intelligence in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Test drive how Creator's diagnoses algorithmic view collapse, prices
            commercial usage rights, and drafts bulletproof sponsor pitches.
          </p>
        </div>

        {/* Storytelling Instrument Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0c0e14] border border-white/[0.08] shadow-inner flex-wrap justify-center gap-1.5">
            {[
              {
                id: "cliff",
                act: "Act 1",
                title: "The Retention Cliff",
                icon: TrendingDown,
                color: "text-rose-400",
              },
              {
                id: "pricing",
                act: "Act 2",
                title: "Commercial Rights Pricing",
                icon: DollarSign,
                color: "text-teal-400",
              },
              {
                id: "mediakit",
                act: "Act 3",
                title: "Media Kit & Lowball Defense",
                icon: FileText,
                color: "text-indigo-400",
              },
            ].map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStoryStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStoryStage(stage.id as any)}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="storyStageIndicator"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.12] shadow-sm"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.3,
                      }}
                    />
                  )}
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/[0.06] ${stage.color} relative z-10`}
                  >
                    {stage.act}
                  </span>
                  <Icon
                    className={`w-3.5 h-3.5 ${stage.color} relative z-10`}
                  />
                  <span className="relative z-10">{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Active Storytelling Instrument */}
        <AnimatePresence mode="wait">
          {activeStoryStage === "cliff" && (
            <motion.div
              key="cliff"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <InteractiveDiagnosisTeaser
                onOpenFullApp={() => onNavigateToModule("detective")}
              />
            </motion.div>
          )}

          {activeStoryStage === "pricing" && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <InteractiveRateTeaser
                onOpenFullApp={() => onNavigateToModule("rate-calculator")}
              />
            </motion.div>
          )}

          {activeStoryStage === "mediakit" && (
            <motion.div
              key="mediakit"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <InteractiveMediaKitTeaser
                onOpenFullApp={() => onNavigateToModule("media-kit")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </FadeInWhenVisible>

      {/* The 10 Core Problems & Solutions Grid */}
      <section id="problems" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">
              Ground Truth Findings
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            10 Real Creator Headaches. 10 Direct Solutions.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Every feature in Creator's is built directly from actual community
            pain points—from TikTok Creator Rewards view qualification to
            YouTube 2026 demonetization policies.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {[
            { id: "all", label: "All 10 Solutions" },
            { id: "drops", label: "Algorithm & Drop-offs" },
            { id: "monetization", label: "Monetization & Safety" },
            { id: "deals", label: "Brand Deals & CRM" },
          ].map((cat) => {
            const active = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? "text-slate-950"
                    : "text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08]"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="categoryFilterPill"
                    className="absolute inset-0 rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Linear / Vercel Connected Hairline Solution Matrix */}
        <div className="border border-white/[0.08] divide-y divide-white/[0.08] rounded-xl bg-[#090b10] overflow-hidden shadow-2xl">
          <AnimatePresence>
            {filteredProblems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  onClick={() => onNavigateToModule(item.tab)}
                  className="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left: Problem & Symptom */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        #{item.num}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold border flex items-center space-x-1.5 ${item.color}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{item.solution}</span>
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      "{item.problem}"
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      <span className="text-slate-500 font-bold">
                        SYMPTOM:{" "}
                      </span>
                      {item.experience}
                    </p>
                  </div>

                  {/* Right: Diagnosis & Direct Action Trigger */}
                  <div className="lg:max-w-md lg:border-l lg:border-white/[0.06] lg:pl-6 space-y-2.5 shrink-0">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white font-mono text-[11px]">
                        DIAGNOSIS & FIX:{" "}
                      </span>
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition">
                      <span className="font-mono text-[11px]">
                        Launch {item.solution}
                      </span>
                      <div className="flex items-center space-x-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-slate-400 font-mono">
                          ↵
                        </kbd>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* The 3 Core Pillars */}
      <FadeInWhenVisible className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Ambient Lighting Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-indigo-500/[0.06] blur-3xl pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">
                The Architectural Foundation
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Built As Your Business & Content Operating System
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Three interconnected pillars supporting creators from their first
              10,000 views to six-figure commercial partnerships.
            </p>
          </div>

          <div className="border border-white/[0.08] divide-y md:divide-y-0 md:divide-x divide-white/[0.08] rounded-xl bg-[#080a0f] overflow-hidden grid grid-cols-1 md:grid-cols-3 relative z-10 shadow-2xl">
            <div className="p-6 sm:p-8 space-y-4 hover:bg-white/[0.01] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Pillar 1: Content Intelligence
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Replaces mysterious algorithm panic with diagnostic rigor.
                  Explains why high-effort videos die, mines your top uploads
                  for winning traits, and catches AI channels copying your work.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Algorithm Detective (Drop Autopsy)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Creator Scientist (Formula Finder)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Originality & Scraping Monitor</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 space-y-4 hover:bg-white/[0.01] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Pillar 2: Monetization & Safety
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Protects your revenue engine. Pre-screens videos against 2026
                  reused-content policies, demystifies RPM fluctuations, and
                  alerts you to platform rule updates.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pre-Publish Monetization Scanner</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Qualified vs Raw Views Funnel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Platform Changes Impact Feed</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 space-y-4 hover:bg-white/[0.01] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Pillar 3: Deal & Business Hub
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                  Turns informal creator DMs into a real business pipeline.
                  Prices usage rights, connects you with active sponsors, and
                  manages deliverables in a unified CRM.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sponsor Radar (Targeted Outreach)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Commercial Deal Rate Calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sponsorship Kanban CRM Pipeline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>

      {/* Transparent Pricing Plans */}
      <FadeInWhenVisible className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">
              Predictable Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Invest in Creator Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            One properly negotiated commercial usage-rights deal pays for
            Creator's for an entire decade.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center space-x-1 bg-[#0c0e14] border border-white/[0.08] p-1.5 rounded-xl shadow-inner mt-4 relative">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                billingCycle === "monthly"
                  ? "text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="billingCyclePill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">Monthly Billing</span>
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                billingCycle === "annual"
                  ? "text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {billingCycle === "annual" && (
                <motion.div
                  layoutId="billingCyclePill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">Annual Billing</span>
              <span
                className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded font-bold border transition-colors ${
                  billingCycle === "annual"
                    ? "bg-emerald-500/20 text-emerald-800 border-emerald-500/40"
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}
              >
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Starter */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-7 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Free Starter
              </div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono">
                $0
              </div>
              <p className="text-xs text-slate-400 mt-2">
                For aspiring creators finding their first baseline.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3 Video Diagnoses per month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard Deal & Rate Calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Weekly Platform Changes Digest</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sponsorship Pipeline (up to 3 deals)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onLaunchApp}
              className="mt-8 w-full py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold transition"
            >
              Start Free
            </button>
          </div>

          {/* Pro Creator with BorderBeam */}
          <div className="relative flex flex-col">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-[10px] font-mono font-bold text-white uppercase tracking-wider z-20 shadow-[0_2px_12px_rgba(99,102,241,0.5)] border border-white/20 whitespace-nowrap">
              Most Popular for Creators
            </div>

            <div className="rounded-2xl border-2 border-indigo-500/70 bg-[#0c0e14] p-7 flex flex-col justify-between relative shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-hidden flex-1">
              <BorderBeam
                duration={7}
                borderWidth={2}
                colorFrom="#6366f1"
                colorTo="#a855f7"
              />

              <div>
                <div className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Pro Creator
                </div>
                <div className="text-3xl font-extrabold text-white mt-2 font-mono flex items-baseline space-x-1">
                  <RollingNumber
                    value={billingCycle === "annual" ? 22 : 29}
                    prefix="$"
                  />
                  <span className="text-xs text-slate-400 font-sans font-normal">
                    / month
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {billingCycle === "annual"
                    ? "Billed $264 annually. Save 25% + 2 months free."
                    : "Billed monthly. Cancel anytime."}
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Unlimited Video Diagnoses & Autopsies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Creator Scientist Pattern Discovery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Pre-Upload Monetization Risk Scanner</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Sponsor Radar with Verified Brand Contacts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Originality & AI Scraper Alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Full CRM & Invoice Exporter</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onLaunchApp}
                className="mt-8 w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition transform hover:-translate-y-0.5 z-20"
              >
                Launch Pro Workspace
              </button>
            </div>
          </div>

          {/* Agency & Manager */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-7 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Manager & Agency
              </div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono flex items-baseline space-x-1">
                <RollingNumber
                  value={billingCycle === "annual" ? 59 : 79}
                  prefix="$"
                />
                <span className="text-xs text-slate-400 font-sans font-normal">
                  / month
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {billingCycle === "annual"
                  ? "Billed $708 annually. For teams & agencies."
                  : "Billed monthly. Scalable seats."}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Manage up to 10 Creator Rosters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multi-Creator Sponsor Matching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated Client PDF Reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Priority Risk Audit Support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onLaunchApp}
              className="mt-8 w-full py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold transition"
            >
              Start Agency Trial
            </button>
          </div>
        </div>
      </FadeInWhenVisible>

      {/* FAQ Section with Physics Accordion */}
      <FadeInWhenVisible className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">
              Frequently Asked
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Got Questions?
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.08] bg-[#0c0e14] overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 hover:bg-white/[0.02] transition"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 ${isOpen ? "text-indigo-400" : "text-slate-500"}`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/[0.06] pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </FadeInWhenVisible>

      {/* Final Call to Action Chamber */}
      <FadeInWhenVisible className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0e111a] to-[#07090e] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient top spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-indigo-500/[0.08] blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-400">
              Ready to take control?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Stop letting opaque algorithms dictate your livelihood.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Launch the Creator's workspace now to inspect your video
              drop-offs, scan monetization risks, and price your next brand deal
              accurately.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={onLaunchApp}
                className="h-12 px-8 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition transform hover:-translate-y-0.5"
              >
                <span>Launch Creator Workspace</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  );
};
