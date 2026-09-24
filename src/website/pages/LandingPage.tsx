import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingDown,
  DollarSign,
  CheckCircle,
  ChevronRight,
  FileText,
  Smartphone,
  Apple,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveRateTeaser } from '../components/InteractiveRateTeaser';
import { InteractiveDiagnosisTeaser } from '../components/InteractiveDiagnosisTeaser';
import { InteractiveMediaKitTeaser } from '../components/InteractiveMediaKitTeaser';
import { HeroMobileMockup } from '../components/HeroMobileMockup';
import { BentoGridShowcase } from '../components/BentoGridShowcase';
import { OldWayComparison } from '../components/OldWayComparison';
import { MobileDownloadModal } from '../components/MobileDownloadModal';
import { LinearBlueprintSection } from '../components/LinearBlueprintSection';
import {
  SpotlightCard,
  BorderBeam,
  FadeInWhenVisible,
  RollingNumber,
  SurfaceCard
} from '@/shared/components/motion';

interface LandingPageProps {
  onLaunchApp: () => void;
  onNavigateToModule: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNavigateToModule }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeStoryStage, setActiveStoryStage] = useState<'cliff' | 'pricing' | 'mediakit'>('cliff');
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);


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
    },
    {
      q: 'How does progress resume across sessions?',
      a: 'When you register and start your guided onboarding journey, your persona, benchmarks, and completed steps are saved in real-time. If you close your browser and return later, Creator\'s resumes seamlessly right from the exact step you were on.'
    }
  ];

  return (
    <div className="space-y-24 pb-20 relative">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 overflow-hidden border-b border-white/[0.06]">
        {/* Vercel-Style Precision Hairline Background Grid with Radial Mask */}
        <div className="absolute inset-0 bg-grid-hairline opacity-30 radial-grid-mask pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle Category Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 mb-6 shadow-sm backdrop-blur-md"
          >
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold text-slate-200">Mobile Creator OS</span>
            <span className="text-slate-500 font-mono text-[11px]">• iOS & Android Beta</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto"
          >
            Stop guessing why your reach collapsed.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              The creator operating system in your pocket.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mt-6 mb-8 font-normal"
          >
            Direct causal diagnoses for algorithmic view drops, pre-upload camera-roll risk scanning, and pocket sponsor CRM anywhere you film.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-5"
          >
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="w-full sm:w-auto h-12 px-7 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition transform hover:-translate-y-0.5"
            >
              <Apple className="w-4 h-4 text-slate-950" />
              <span>Get for iOS & Android</span>
            </button>
            <a
              href="#bento"
              className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 font-semibold text-sm flex items-center justify-center transition"
            >
              <span>Explore Mobile Toolkit</span>
            </a>
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto h-12 px-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white text-xs font-mono flex items-center justify-center transition"
            >
              <span>Try Web Sandbox</span>
            </button>
          </motion.div>

          <div className="text-[11px] text-slate-500 font-mono flex items-center justify-center space-x-2 mb-10">
            <span>Camera Roll Pre-Flight</span>
            <span>•</span>
            <span>Zero Channel Write Permissions</span>
            <span>•</span>
            <span>Encrypted Local Storage</span>
          </div>

          {/* Raycast + Linear Flagship Hardware Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <HeroMobileMockup />
          </motion.div>


          {/* Social Proof / Key Performance Stats */}
          <div className="pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">10</div>
              <div className="text-xs text-slate-400 mt-0.5">Core Creator Problems Solved</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                <RollingNumber value={1450} prefix="+$" />
              </div>
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

      {/* Vercel-Style Bento Grid Showcase */}
      <BentoGridShowcase onOpenDownloadModal={() => setIsDownloadOpen(true)} />

      {/* Live Interactive Demos Section: Framer-Style 3-Act Storytelling Showcase */}
      <section id="simulator">
        <FadeInWhenVisible className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-mono uppercase text-[11px] font-semibold">Interactive Sandbox</span>
            </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See the Intelligence in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Test drive how Creator's diagnoses algorithmic view collapse, prices commercial usage rights, and drafts bulletproof sponsor pitches.
          </p>
        </div>

        {/* Storytelling Instrument Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0c0e14] border border-white/[0.08] shadow-inner flex-wrap justify-center gap-1.5">
            {[
              {
                id: 'cliff',
                act: 'Act 1',
                title: 'The Retention Cliff',
                icon: TrendingDown,
                color: 'text-rose-400',
              },
              {
                id: 'pricing',
                act: 'Act 2',
                title: 'Commercial Rights Pricing',
                icon: DollarSign,
                color: 'text-teal-400',
              },
              {
                id: 'mediakit',
                act: 'Act 3',
                title: 'Media Kit & Lowball Defense',
                icon: FileText,
                color: 'text-indigo-400',
              },
            ].map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStoryStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStoryStage(stage.id as any)}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="storyStageIndicator"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.12] shadow-sm"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                    />
                  )}
                  <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/[0.06] ${stage.color} relative z-10`}>
                    {stage.act}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${stage.color} relative z-10`} />
                  <span className="relative z-10">{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Active Storytelling Instrument */}
        <AnimatePresence mode="wait">
          {activeStoryStage === 'cliff' && (
            <motion.div
              key="cliff"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <InteractiveDiagnosisTeaser onOpenFullApp={() => onNavigateToModule('detective')} />
            </motion.div>
          )}

          {activeStoryStage === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <InteractiveRateTeaser onOpenFullApp={() => onNavigateToModule('rate-calculator')} />
            </motion.div>
          )}

          {activeStoryStage === 'mediakit' && (
            <motion.div
              key="mediakit"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <InteractiveMediaKitTeaser onOpenFullApp={() => onNavigateToModule('media-kit')} />
            </motion.div>
          )}
        </AnimatePresence>
      </FadeInWhenVisible>
    </section>

      {/* Linear Architectural Blueprint Section (FIG 0.1, FIG 0.2, FIG 0.3) */}
      <section id="features" className="w-full">
        <div className="text-center space-y-3 mb-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">Architectural System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Creators. Not Guesswork.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Linear-style architectural telemetry isolating distribution cliffs, camera-roll compliance, and commercial rights valuation.
          </p>
        </div>

        <LinearBlueprintSection />
      </section>

      {/* Linear-Style Old Way vs. Intelligence Comparison */}
      <OldWayComparison />

      {/* Transparent Pricing Plans */}
      <section id="pricing">
        <FadeInWhenVisible className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">Predictable Pricing</span>
            </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Invest in Creator Intelligence</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            One properly negotiated commercial usage-rights deal pays for Creator's for an entire decade.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center space-x-1 bg-[#0c0e14] border border-white/[0.08] p-1.5 rounded-xl shadow-inner mt-4 relative">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                billingCycle === 'monthly'
                  ? 'text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {billingCycle === 'monthly' && (
                <motion.div
                  layoutId="billingCyclePill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">Monthly Billing</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                billingCycle === 'annual'
                  ? 'text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {billingCycle === 'annual' && (
                <motion.div
                  layoutId="billingCyclePill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">Annual Billing</span>
              <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded font-bold border transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-emerald-500/20 text-emerald-800 border-emerald-500/40'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Starter */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-7 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">Free Starter</div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono">$0</div>
              <p className="text-xs text-slate-400 mt-2">For aspiring creators finding their first baseline.</p>

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
              <BorderBeam duration={7} borderWidth={2} colorFrom="#6366f1" colorTo="#a855f7" />

              <div>
                <div className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">Pro Creator</div>
                <div className="text-3xl font-extrabold text-white mt-2 font-mono flex items-baseline space-x-1">
                  <RollingNumber value={billingCycle === 'annual' ? 22 : 29} prefix="$" />
                  <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {billingCycle === 'annual'
                    ? 'Billed $264 annually. Save 25% + 2 months free.'
                    : 'Billed monthly. Cancel anytime.'}
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
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">Manager & Agency</div>
              <div className="text-3xl font-extrabold text-white mt-2 font-mono flex items-baseline space-x-1">
                <RollingNumber value={billingCycle === 'annual' ? 59 : 79} prefix="$" />
                <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {billingCycle === 'annual'
                  ? 'Billed $708 annually. For teams & agencies.'
                  : 'Billed monthly. Scalable seats.'}
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
    </section>

      {/* FAQ Section with Physics Accordion */}
      <FadeInWhenVisible className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">Frequently Asked</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Got Questions?</h2>
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
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 ${isOpen ? 'text-indigo-400' : 'text-slate-500'}`}
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
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

      {/* Final Call to Action Chamber: Mobile Launchpad */}
      <FadeInWhenVisible className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0e111a] to-[#07090e] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient top spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-indigo-500/[0.12] blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-indigo-400">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Available on iOS & Android</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Get the Creator Operating System.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
              Run causal autopsies, scan pre-upload policy risks, and lock in verified commercial sponsorships everywhere you film.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="w-full sm:w-auto h-12 px-7 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition transform hover:-translate-y-0.5"
              >
                <Apple className="w-4 h-4 text-slate-950" />
                <span>Get for iOS & Android</span>
              </button>
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="w-full sm:w-auto h-12 px-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition"
              >
                <QrCode className="w-4 h-4 text-slate-400" />
                <span>Scan QR Code</span>
              </button>
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto h-12 px-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white text-xs font-mono flex items-center justify-center transition"
              >
                <span>Try Web Sandbox</span>
              </button>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>

      {/* Mobile Download & TestFlight Modal */}
      <MobileDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
};
