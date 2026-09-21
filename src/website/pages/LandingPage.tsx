import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { InteractiveRateTeaser } from '../components/InteractiveRateTeaser';
import { InteractiveDiagnosisTeaser } from '../components/InteractiveDiagnosisTeaser';

interface LandingPageProps {
  onLaunchApp: () => void;
  onNavigateToModule: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNavigateToModule }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const problemSolutions = [
    {
      num: '01',
      problem: 'Sudden, unexplained drops in reach',
      experience: 'Posts drop from 100k views to 424 views with zero clear explanation from studio charts.',
      solution: 'Algorithm Detective',
      desc: 'Pinpoints the exact drop-off reason: 8-second retention cliff, sub-baseline CTR, or seed cohort failure.',
      tab: 'detective',
      icon: TrendingDown,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      num: '02',
      problem: "You have analytics, but don't know what to do with them",
      experience: 'Data ≠ explanation. Video A got 80k views, Video B got 3k. What did you actually do differently?',
      solution: 'Creator Scientist',
      desc: 'Statistically compares your winning vs underperforming content to extract proven patterns (hook timing, face presence, length).',
      tab: 'scientist',
      icon: Brain,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      num: '03',
      problem: 'AI spam channels crowding out original creators',
      experience: 'Low-effort automated channels scrape original scripts, titles, and concepts within hours.',
      solution: 'Originality & Copy Monitor',
      desc: 'Continuously monitors YouTube & TikTok for concept scrapers and alerts you with automated takedown scripts.',
      tab: 'originality',
      icon: ShieldAlert,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      num: '04',
      problem: 'Finding consistent sponsorships is painful',
      experience: 'Creator & manager inbox mess trying to find brands with actual budget in their specific niche.',
      solution: 'Sponsor Radar',
      desc: 'Discovers active paying sponsors matching your exact audience niche and geography (US, UK, Kenya, etc.) with direct contact leads.',
      tab: 'sponsor-radar',
      icon: Briefcase,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      num: '05',
      problem: "Creators don't know what to charge brands",
      experience: 'Leaving thousands on the table by charging simple follower-count flat fees instead of pricing commercial rights.',
      solution: 'Creator Rate Calculator',
      desc: 'Calculates real commercial deal value: base production, audience access, paid ad whitelisting, and exclusivity lockouts.',
      tab: 'rate-calculator',
      icon: DollarSign,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
    },
    {
      num: '06',
      problem: 'Monetization decisions feel unpredictable',
      experience: 'Sudden demonetization strikes for "Inauthentic Content" or "Reused Content" with zero advance warning.',
      solution: 'Monetization Risk Scanner',
      desc: 'Pre-upload policy scanner detecting un-commentated third-party footage and template repetition before you publish.',
      tab: 'risk-scanner',
      icon: AlertTriangle,
      color: 'text-red-400 bg-red-500/10 border-red-500/20'
    },
    {
      num: '07',
      problem: 'Platform changes force constant adaptation',
      experience: 'YouTube & TikTok shift algorithms and disclosure rules overnight, rendering old formats obsolete.',
      solution: 'Platform Change Tracker',
      desc: 'A unified feed of algorithm and policy shifts with personalized flags on which of your videos are affected.',
      tab: 'platform-changes',
      icon: RefreshCw,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      num: '08',
      problem: 'Turning 1 long video into multi-platform clips is labor-intensive',
      experience: 'Existing AI tools generate random boring snippets without understanding high-retention human tension.',
      solution: 'Smart Content Recycler',
      desc: '"Human chooses, AI accelerates." Identifies viral potential moments, tension quotes, and ready-to-publish vertical crops.',
      tab: 'recycler',
      icon: Scissors,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      num: '09',
      problem: "Views aren't the same as money",
      experience: '255k views on TikTok Creator Rewards yielding only 168k qualified views. Creators confused why RPM moves.',
      solution: 'Qualified Revenue Analytics',
      desc: 'Dissects your real monetizable views vs disqualifications, revealing what factors drove your RPM higher or lower.',
      tab: 'revenue-analytics',
      icon: BarChart3,
      color: 'text-green-400 bg-green-500/10 border-green-500/20'
    },
    {
      num: '10',
      problem: 'Sponsorship administration is a chaotic mess',
      experience: 'Managing 10-20 active deals across DMs, spreadsheets, lost contracts, and late invoice follow-ups.',
      solution: 'Creator Deal Pipeline CRM',
      desc: 'Visual Kanban pipeline tracking pitched, negotiating, active, and paid deals with automated reminders and invoice generation.',
      tab: 'deal-crm',
      icon: Layers,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];

  const faqs = [
    {
      q: 'How is "Creator\'s" different from other AI tools like ChatGPT or Jasper?',
      a: 'Most AI tools for creators are generative—they generate more text, scripts, or images, flooding platforms with AI noise. Creator\'s is Creator Intelligence: software designed to help you understand why your content succeeded or failed, what your deals are actually worth, whether you risk demonetization, and how platform algorithm updates affect your specific catalog.'
    },
    {
      q: 'Does Creator\'s require full channel access?',
      a: 'You can use Creator\'s via read-only official YouTube and TikTok OAuth APIs, or you can manually paste your analytics numbers or upload video files for pre-flight diagnosis. We never ask for publishing or management permissions on your channel.'
    },
    {
      q: 'Can Creator\'s guarantee that my video won\'t be demonetized?',
      a: 'No automated software can legally guarantee YouTube or TikTok\'s internal human review decisions. However, our Monetization Risk Scanner cross-references your video against known 2025/2026 guidelines (such as the 40+ continuous second third-party footage rule and repetitious narration thresholds) to highlight specific risk timestamps before you upload.'
    },
    {
      q: 'How does the Deal & Rate Calculator know what to charge?',
      a: 'Unlike naive calculators that just multiply followers by $10, Creator\'s calculates based on actual commercial value: production cost, realistic audience CPM, paid whitelisting/ad usage multipliers (often +30-50% extra), exclusivity lockouts, and deliverable format.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-brand-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-brand-300 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>The Creator Intelligence Category</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Stop guessing why your views collapsed.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-emerald-400">
              Understand the business of your content.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed mb-8">
            You don't need another generic AI script generator. You need clarity: why an algorithm throttled your video, what to charge brands for paid ad rights, and how to protect yourself from demonetization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Interactive Creator Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#problems"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 transition"
            >
              See the 10 Creator Solutions
            </a>
          </div>

          {/* Social Proof / Stats Ticker */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">10</div>
              <div className="text-xs text-slate-400 mt-0.5">Core Creator Problems Solved</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">+$1,450</div>
              <div className="text-xs text-slate-400 mt-0.5">Avg Deal Value Recaptured</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-400 font-mono">0:08s</div>
              <div className="text-xs text-slate-400 mt-0.5">Retention Cliff Diagnosis</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Human Choice + AI Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Demos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Test Drive The Intelligence</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Interactive Problem Solvers</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Experience the difference between standard studio numbers and Creator's diagnostic explanations.
          </p>
        </div>

        {/* Demo 1: Rate Calculator */}
        <div>
          <InteractiveRateTeaser onOpenFullApp={() => onNavigateToModule('rate-calculator')} />
        </div>

        {/* Demo 2: Video Autopsy / Algorithm Detective */}
        <div>
          <InteractiveDiagnosisTeaser onOpenFullApp={() => onNavigateToModule('detective')} />
        </div>
      </section>

      {/* The 10 Core Problems & Solutions Grid */}
      <section id="problems" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <span>Ground Truth Findings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            10 Real Creator Headaches. 10 Intelligent Solutions.
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Every feature in Creator's is built directly from actual community pain points—from TikTok Creator Rewards view qualification to YouTube 2026 demonetization policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemSolutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 hover:border-slate-700 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">{item.num}</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center space-x-1.5 ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.solution}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-300 transition">
                    "{item.problem}"
                  </h3>

                  <div className="text-xs text-slate-400 mb-3 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="font-semibold text-slate-300">Creator Experience: </span>
                    {item.experience}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    <span className="font-semibold text-white">How Creator's Solves It: </span>
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateToModule(item.tab)}
                  className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-brand-400 hover:text-brand-300 transition"
                >
                  <span>Open {item.solution}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 sm:p-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">The Architectural Foundation</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Built As Your Business & Content Operating System</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Three interconnected pillars supporting creators from their first 10,000 views to six-figure brand partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Pillar 1: Content Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Replaces mysterious algorithm panic with diagnostic rigor. Finds out why videos die, mines your top 50 uploads for winning traits, and catches AI channels copying your work.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
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

            <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Pillar 2: Monetization & Safety</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protects your revenue engine. Pre-screens videos against 2025/2026 reused-content policies, demystifies RPM fluctuations, and alerts you to platform rule updates.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
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

            <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Pillar 3: Deal & Business Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turns informal creator DMs into a real business pipeline. Prices usage rights, connects you with active sponsors, and manages deliverables in a unified CRM.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sponsor Radar (Targeted Outreach)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Multi-factor Commercial Deal Calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sponsorship Kanban CRM Pipeline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Predictable Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Invest in Creator Intelligence</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            One properly priced usage-rights deal pays for Creator's for an entire decade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Starter */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Starter</div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono">$0</div>
              <p className="text-xs text-slate-400 mt-2">For aspiring creators finding their first footing.</p>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
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
              className="mt-8 w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
            >
              Start Free
            </button>
          </div>

          {/* Pro Creator */}
          <div className="rounded-2xl border-2 border-brand-500 bg-slate-900 p-8 flex flex-col justify-between relative shadow-2xl shadow-brand-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-[10px] font-extrabold text-white uppercase tracking-wider">
              Most Popular for Full-Time Creators
            </div>
            <div>
              <div className="text-xs font-bold text-brand-300 uppercase tracking-wider">Pro Creator</div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono">
                $29 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">For creators actively uploading and negotiating brand deals.</p>

              <ul className="mt-6 space-y-3 text-xs text-slate-200">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Unlimited Video Diagnoses & Autopsies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Creator Scientist Pattern Discovery (50+ vids)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Pre-Upload Monetization Risk Scanner</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Sponsor Radar with Verified Brand Contacts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Originality & AI Scraper Alerts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                  <span>Full CRM & Invoice Exporter</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onLaunchApp}
              className="mt-8 w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition"
            >
              Launch Pro Workspace
            </button>
          </div>

          {/* Agency & Manager */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Manager & Agency</div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono">
                $79 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">For creator managers, talent reps, and multi-channel rosters.</p>

              <ul className="mt-6 space-y-3 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Manage up to 10 Creator Rosters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multi-Creator Sponsor Matching & Comp Pricing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated Client PDF Executive Reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Priority Risk Audit Support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onLaunchApp}
              className="mt-8 w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
            >
              Start Agency Trial
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Frequently Asked</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Got Questions?</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-200">{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transform transition-transform ${
                      isOpen ? 'rotate-90 text-brand-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-300">Ready to take control?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Stop letting algorithms dictate your livelihood.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Launch the Creator's workspace now to inspect your video drop-offs, scan monetization risks, and price your next brand deal accurately.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={onLaunchApp}
                className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm flex items-center space-x-2 shadow-xl transition transform hover:-translate-y-0.5"
              >
                <span>Launch Creator's App</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
