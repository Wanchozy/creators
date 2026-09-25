import React, { useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  Clapperboard,
  FileCheck2,
  Fingerprint,
  Layers3,
  LockKeyhole,
  Scissors,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  WandSparkles,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroProductMockup } from '../components/HeroProductMockup';
import { InteractiveRateTeaser } from '../components/InteractiveRateTeaser';
import { InteractiveDiagnosisTeaser } from '../components/InteractiveDiagnosisTeaser';
import { InteractiveMediaKitTeaser } from '../components/InteractiveMediaKitTeaser';

interface LandingPageProps {
  onLaunchApp: () => void;
  onNavigateToModule: (tab: string) => void;
}

const solutions = [
  { name: 'Algorithm Detective', category: 'content', icon: TrendingDown, color: 'rose', copy: 'Find the moment your momentum changed—and the signal behind it.', tab: 'detective', tag: 'CONTENT' },
  { name: 'Creator Scientist', category: 'content', icon: Brain, color: 'violet', copy: 'Turn your best-performing work into patterns you can repeat.', tab: 'scientist', tag: 'CONTENT' },
  { name: 'Originality Monitor', category: 'content', icon: Fingerprint, color: 'amber', copy: 'Spot copycats and protect the ideas that make your work yours.', tab: 'originality', tag: 'CONTENT' },
  { name: 'Smart Recycler', category: 'content', icon: Scissors, color: 'blue', copy: 'Find the moments worth carrying into your next format.', tab: 'recycler', tag: 'CONTENT' },
  { name: 'Monetization Scanner', category: 'revenue', icon: ShieldCheck, color: 'emerald', copy: 'Review content risks before they become revenue surprises.', tab: 'risk-scanner', tag: 'PROTECTION' },
  { name: 'Qualified Revenue', category: 'revenue', icon: BarChart3, color: 'teal', copy: 'See how qualified views, RPM and payout fit together.', tab: 'revenue-analytics', tag: 'REVENUE' },
  { name: 'Platform Change Tracker', category: 'revenue', icon: Activity, color: 'sky', copy: 'Track policy shifts and understand what they mean for your catalog.', tab: 'platform-changes', tag: 'PROTECTION' },
  { name: 'Sponsor Radar', category: 'business', icon: BriefcaseBusiness, color: 'lime', copy: 'Find brands that make sense for your audience and niche.', tab: 'sponsor-radar', tag: 'PARTNERSHIPS' },
  { name: 'Rate Calculator', category: 'business', icon: BadgeDollarSign, color: 'orange', copy: 'Price production, licensing, usage rights and exclusivity together.', tab: 'rate-calculator', tag: 'PARTNERSHIPS' },
  { name: 'Deal Pipeline', category: 'business', icon: Layers3, color: 'pink', copy: 'Keep pitches, deliverables and invoices in one clear workflow.', tab: 'deal-crm', tag: 'PARTNERSHIPS' },
];

const faqs = [
  { q: 'What is Creator’s?', a: 'Creator’s is a creator intelligence platform: a practical workspace for understanding content performance, protecting monetization, and running brand partnerships. It helps you interpret the business behind the content—not generate more generic content.' },
  { q: 'Do I need to connect my social accounts?', a: 'No. You can explore the workspace and use its tools without granting publishing access. Where a platform connection is offered, it is designed around read-only data access; you can also work with information you enter yourself.' },
  { q: 'Does the platform guarantee reach or monetization?', a: 'No tool can guarantee a platform’s distribution or review decisions. Creator’s helps you examine signals, compare patterns, and identify potential risks so you can make more informed decisions.' },
  { q: 'Can I use Creator’s if I am just starting out?', a: 'Yes. The workspace is designed to be useful as your creator business grows—from understanding early content patterns to organizing a more established brand-deal pipeline.' },
];

const categoryOptions = [
  { id: 'all', label: 'All tools' },
  { id: 'content', label: 'Content intelligence' },
  { id: 'revenue', label: 'Revenue & protection' },
  { id: 'business', label: 'Brand partnerships' },
] as const;

type Category = (typeof categoryOptions)[number]['id'];
type StoryStage = 'diagnosis' | 'pricing' | 'media-kit';

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNavigateToModule }) => {
  const [category, setCategory] = useState<Category>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeStory, setActiveStory] = useState<StoryStage>('diagnosis');

  const visibleSolutions = category === 'all' ? solutions : solutions.filter((item) => item.category === category);

  return (
    <main className="landing-page pb-10">
      <section className="landing-hero relative overflow-hidden">
        <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-glow absolute pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1320px] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.03fr_.97fr] lg:gap-8">
            <motion.div initial="hidden" animate="visible" variants={reveal} className="relative z-10 max-w-[660px]">
              <div className="eyebrow-pill mb-7 inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-[.13em] text-[#d4f4a0] uppercase">
                <span className="live-dot" /> Creator intelligence, finally in one place
              </div>
              <h1 className="display-heading max-w-[780px] text-[clamp(3.4rem,7.3vw,6.5rem)] font-semibold leading-[.95] tracking-[-.065em] text-[#f4f3eb]">
                Your audience is a business. <span className="headline-accent">Make it work like one.</span>
              </h1>
              <p className="mt-7 max-w-[540px] text-base leading-7 text-[#a8aaa1] sm:text-lg sm:leading-8">
                Understand why content moves, what a partnership is really worth, and where your next decision should come from.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button onClick={onLaunchApp} className="button-lime group inline-flex h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-bold text-[#171a13] transition hover:-translate-y-0.5">
                  Explore your workspace <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a href="#platform" className="button-quiet inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#dedfd6] transition hover:bg-white/[.08]">
                  See how it works <ArrowDownRight className="h-4 w-4 text-[#c4e78b]" />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#858980]">
                <span className="inline-flex items-center gap-2"><LockKeyhole className="h-3.5 w-3.5 text-[#bed989]" /> No publishing permissions</span>
                <span className="hidden h-3 w-px bg-white/15 sm:block" />
                <span>Built for YouTube, TikTok & Instagram</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 22, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7, delay: .12, ease: [.23, 1, .32, 1] }} className="hero-image-wrap relative mx-auto w-full max-w-[590px] lg:ml-auto">
              <div className="hero-image-frame relative aspect-[.93] overflow-hidden rounded-[2rem] sm:aspect-[1.04]">
                <img src="/images/creators-hero-web.jpg" alt="Creator reviewing work in her home studio" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
                <div className="hero-image-shade absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="glass-note max-w-[330px] rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="micro-label text-[#c6d1bd]">SAMPLE WORKSPACE / INSIGHT PREVIEW</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d1f18e]/10 px-2.5 py-1 text-[10px] font-semibold text-[#d1f18e]"><span className="h-1.5 w-1.5 rounded-full bg-[#d1f18e]" /> INSIGHT READY</span>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-white sm:text-base">A clear signal to investigate.</div>
                    <div className="mt-1.5 text-xs leading-5 text-[#c3c5bc]">A stronger opening may be worth testing in your next upload.</div>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-[#d1f18e]">Review content patterns <ArrowUpRight className="h-3.5 w-3.5" /></div>
                  </div>
                </div>
                <div className="image-index absolute right-5 top-5 rounded-full px-3 py-1.5 font-mono text-[10px] text-white/75">FIELD NOTE 01 / 03</div>
              </div>
              <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
              <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            </motion.div>
          </div>

          <div className="mt-16 border-t border-white/[.09] pt-6 sm:mt-20 sm:pt-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="micro-label text-[#747970]">A clearer view of the whole creator business</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] font-semibold tracking-tight text-[#777c72]">
                <span className="inline-flex items-center gap-2"><span className="platform-dot bg-[#ff5a44]" /> YouTube</span>
                <span className="inline-flex items-center gap-2"><span className="platform-dot bg-[#e1b7ef]" /> TikTok</span>
                <span className="inline-flex items-center gap-2"><span className="platform-dot bg-[#d9a75e]" /> Instagram</span>
                <span className="hidden text-[#444940] sm:inline">Independent by design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="section-pad relative">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} className="section-intro grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="micro-label mb-4 text-[#c7e99a]">Not more content. More clarity.</p>
              <h2 className="display-heading max-w-[560px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-[#f0f0e8] sm:text-5xl">The work behind the work, <span className="text-[#c8e88e]">understood.</span></h2>
            </div>
            <p className="max-w-[520px] text-sm leading-7 text-[#979b91] lg:ml-auto lg:text-base">Creator’s brings your content signals, commercial decisions and day-to-day operations into one calm, useful workspace.</p>
          </motion.div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <article className="feature-panel feature-panel-large group relative min-h-[370px] overflow-hidden rounded-[1.7rem] p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div className="absolute inset-0"><img src="/images/creators-studio-web.jpg" alt="Two creators working together in a recording studio" className="h-full w-full object-cover object-center opacity-50 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-60" /><div className="feature-image-shade absolute inset-0" /></div>
              <div className="relative flex h-full min-h-[300px] flex-col justify-between">
                <div className="flex items-center justify-between gap-4"><span className="icon-chip"><Brain className="h-4 w-4" /></span><span className="micro-label text-white/55">01 — CONTENT INTELLIGENCE</span></div>
                <div className="max-w-[430px]">
                  <h3 className="display-heading text-3xl font-medium leading-tight tracking-[-.04em] text-white sm:text-4xl">Turn the “why” into a next move.</h3>
                  <p className="mt-3 max-w-[400px] text-sm leading-6 text-white/70">Trace the patterns behind a strong video, a sudden drop, or a hook that finally held attention.</p>
                  <button onClick={() => onNavigateToModule('detective')} className="inline-flex items-center gap-2 pt-5 text-xs font-semibold text-[#d1f18e] hover:text-white">Explore content intelligence <ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>

            <article className="feature-panel feature-panel-plain relative overflow-hidden rounded-[1.7rem] p-6 sm:p-8 lg:col-span-5 lg:p-9">
              <div className="panel-noise absolute inset-0" />
              <div className="relative flex h-full min-h-[310px] flex-col justify-between">
                <div className="flex items-center justify-between gap-4"><span className="icon-chip icon-chip-lime"><BadgeDollarSign className="h-4 w-4" /></span><span className="micro-label text-[#94988e]">02 — REVENUE & RIGHTS</span></div>
                <div>
                  <div className="mb-5 rounded-2xl border border-white/[.08] bg-[#101412]/75 p-4">
                    <div className="flex items-center justify-between text-[10px] text-[#888e83]"><span>PARTNERSHIP VALUE</span><span className="text-[#c8e88e]">● RIGHTS INCLUDED</span></div>
                    <div className="mt-3 flex items-end justify-between"><span className="display-heading text-4xl tracking-[-.04em] text-[#eef0e6]">$3,450</span><span className="mb-1 text-xs text-[#969b91]">deliverables + usage</span></div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[.07]"><div className="h-full w-[74%] rounded-full bg-gradient-to-r from-[#b4d878] to-[#e8c47a]" /></div>
                    <div className="mt-2 flex justify-between text-[10px] text-[#777d73]"><span>Production</span><span>Usage</span><span>Exclusivity</span></div>
                  </div>
                  <h3 className="display-heading text-2xl font-medium tracking-[-.035em] text-white sm:text-3xl">Know what you’re selling.</h3>
                  <p className="mt-2 text-sm leading-6 text-[#999d93]">Make the value of your creative work—and the rights around it—easier to see.</p>
                  <button onClick={() => onNavigateToModule('rate-calculator')} className="inline-flex items-center gap-2 pt-4 text-xs font-semibold text-[#c8e88e] hover:text-white">Explore deal tools <ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>

            <article className="feature-panel feature-panel-plain relative overflow-hidden rounded-[1.7rem] p-6 sm:p-8 lg:col-span-5 lg:p-9">
              <div className="relative flex h-full min-h-[290px] flex-col justify-between">
                <div className="flex items-center justify-between gap-4"><span className="icon-chip icon-chip-blue"><FileCheck2 className="h-4 w-4" /></span><span className="micro-label text-[#94988e]">03 — SAFETY & SIGNALS</span></div>
                <div>
                  <div className="relative mb-6 space-y-2.5">
                    {[['Original commentary', '92%', 'w-[92%]'], ['Unique visual sequence', '86%', 'w-[86%]'], ['Policy confidence', 'High', 'w-[79%]']].map(([label, value, width]) => <div key={label} className="rounded-xl border border-white/[.07] bg-white/[.025] px-3.5 py-3"><div className="mb-2 flex justify-between text-[10px]"><span className="text-[#aeb2a8]">{label}</span><span className="text-[#d3e9ae]">{value}</span></div><div className="h-1 overflow-hidden rounded-full bg-white/[.08]"><div className={`h-full ${width} rounded-full bg-[#a9d477]`} /></div></div>)}
                  </div>
                  <h3 className="display-heading text-2xl font-medium tracking-[-.035em] text-white sm:text-3xl">Make fewer decisions in the dark.</h3>
                  <p className="mt-2 text-sm leading-6 text-[#999d93]">Bring platform shifts, content checks and monetization context into view.</p>
                  <button onClick={() => onNavigateToModule('risk-scanner')} className="inline-flex items-center gap-2 pt-4 text-xs font-semibold text-[#c8e88e] hover:text-white">Explore creator safeguards <ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>

            <article className="feature-panel feature-panel-quote relative overflow-hidden rounded-[1.7rem] p-6 sm:p-9 lg:col-span-7 lg:p-12">
              <div className="quote-glow absolute -right-12 -top-24 h-72 w-72 rounded-full" />
              <div className="relative flex h-full min-h-[290px] flex-col justify-between">
                <div className="flex items-center justify-between"><span className="icon-chip icon-chip-warm"><BriefcaseBusiness className="h-4 w-4" /></span><span className="micro-label text-[#aaa49a]">04 — PARTNERSHIP OPERATIONS</span></div>
                <div className="max-w-[520px]">
                  <p className="display-heading text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-.045em] text-[#f2eee5]">“Is this a good deal?” becomes a question you can actually answer.</p>
                  <button onClick={() => onNavigateToModule('deal-crm')} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#d9bf8d] hover:text-white">Bring your deals into focus <ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad section-demo relative overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="micro-label mb-4 text-[#c7e99a]">A working preview</p>
              <h2 className="display-heading max-w-[490px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-[#f0f0e8] sm:text-5xl">See the signal. <span className="text-[#c8e88e]">Make the call.</span></h2>
            </div>
            <p className="max-w-[460px] text-sm leading-7 text-[#979b91] lg:ml-auto">Try a few of the tools in context. Switch between a content diagnosis, a brand deal estimate, and a more persuasive media kit.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Product preview">
            {[
              { id: 'diagnosis' as const, label: 'Diagnose a drop', icon: TrendingDown },
              { id: 'pricing' as const, label: 'Price a partnership', icon: BadgeDollarSign },
              { id: 'media-kit' as const, label: 'Strengthen a media kit', icon: Clapperboard },
            ].map((tab) => {
              const Icon = tab.icon;
              return <button key={tab.id} role="tab" aria-selected={activeStory === tab.id} onClick={() => setActiveStory(tab.id)} className={`demo-tab inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition ${activeStory === tab.id ? 'demo-tab-active' : 'text-[#8e9389] hover:text-white'}`}><Icon className="h-3.5 w-3.5" />{tab.label}</button>;
            })}
          </div>

          <div className="demo-stage mt-5 overflow-hidden rounded-[1.5rem] p-2 sm:rounded-[1.8rem] sm:p-3">
            <AnimatePresence mode="wait">
              {activeStory === 'diagnosis' && <motion.div key="diagnosis" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}><InteractiveDiagnosisTeaser onOpenFullApp={() => onNavigateToModule('detective')} /></motion.div>}
              {activeStory === 'pricing' && <motion.div key="pricing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}><InteractiveRateTeaser onOpenFullApp={() => onNavigateToModule('rate-calculator')} /></motion.div>}
              {activeStory === 'media-kit' && <motion.div key="media-kit" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}><InteractiveMediaKitTeaser onOpenFullApp={() => onNavigateToModule('media-kit')} /></motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="solutions" className="section-pad">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div><p className="micro-label mb-4 text-[#c7e99a]">One thoughtful toolkit</p><h2 className="display-heading max-w-[580px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-[#f0f0e8] sm:text-5xl">The tools behind a more <span className="text-[#c8e88e]">intentional</span> creator business.</h2></div>
            <p className="max-w-[440px] text-sm leading-7 text-[#979b91] lg:ml-auto">Move from “I wonder what happened” to a more useful next step. Explore the tools by the kind of question you’re trying to answer.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter tools">
            {categoryOptions.map((option) => <button key={option.id} onClick={() => setCategory(option.id)} aria-pressed={category === option.id} className={`filter-pill rounded-full px-4 py-2.5 text-xs font-semibold transition ${category === option.id ? 'filter-pill-active' : 'text-[#969a91] hover:bg-white/[.06] hover:text-white'}`}>{option.label}</button>)}
          </div>
          <motion.div layout className="solution-grid mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleSolutions.map((item) => {
                const Icon = item.icon;
                return <motion.button layout key={item.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .18 }} onClick={() => onNavigateToModule(item.tab)} className="solution-card group rounded-[1.25rem] p-5 text-left transition hover:-translate-y-1 sm:p-6">
                  <div className="flex items-start justify-between"><span className={`solution-icon solution-icon-${item.color} inline-flex h-10 w-10 items-center justify-center rounded-xl`}><Icon className="h-[18px] w-[18px]" /></span><ArrowUpRight className="h-4 w-4 text-[#62675f] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c8e88e]" /></div>
                  <p className="micro-label mt-5 text-[#71766e]">{item.tag}</p><h3 className="mt-1.5 text-[15px] font-semibold tracking-[-.02em] text-[#ecede5]">{item.name}</h3><p className="mt-2 text-[13px] leading-5 text-[#969a91]">{item.copy}</p>
                </motion.button>;
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="section-pad section-product relative overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <div><p className="micro-label mb-4 text-[#c7e99a]">Your operating view</p><h2 className="display-heading max-w-[440px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-[#f0f0e8] sm:text-5xl">A little more <span className="text-[#c8e88e]">signal.</span> A lot less noise.</h2><p className="mt-5 max-w-[410px] text-sm leading-7 text-[#979b91]">One connected workspace to make your creative decisions, partnership decisions and business decisions feel like they belong together.</p><ul className="mt-6 space-y-3 text-xs text-[#c4c7bd]">{['Your work stays yours', 'Read-only signals, not publishing access', 'Designed for real creator workflows'].map((label) => <li key={label} className="flex items-center gap-2.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c8e88e]/10 text-[#c8e88e]"><Check className="h-3 w-3" /></span>{label}</li>)}</ul><button onClick={onLaunchApp} className="button-lime group mt-8 inline-flex h-11 items-center gap-3 rounded-full px-5 text-xs font-bold text-[#171a13] transition hover:-translate-y-0.5">Open Creator’s workspace <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></button></div>
            <div className="product-window-wrap"><HeroProductMockup onOpenApp={(tab) => onNavigateToModule(tab || 'overview')} /></div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section-pad">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[630px] text-center"><p className="micro-label mb-4 text-[#c7e99a]">Straightforward plans</p><h2 className="display-heading text-4xl font-medium leading-[1.04] tracking-[-.045em] text-[#f0f0e8] sm:text-5xl">Start with clarity. <span className="text-[#c8e88e]">Grow from there.</span></h2><p className="mt-4 text-sm leading-6 text-[#979b91]">Pick the level that fits where your creator business is today.</p>
            <div className="pricing-toggle mx-auto mt-6 inline-flex items-center gap-1 rounded-full p-1"><button onClick={() => setBillingCycle('monthly')} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${billingCycle === 'monthly' ? 'pricing-toggle-active' : 'text-[#8e9389] hover:text-white'}`}>Monthly</button><button onClick={() => setBillingCycle('annual')} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${billingCycle === 'annual' ? 'pricing-toggle-active' : 'text-[#8e9389] hover:text-white'}`}>Annual <span className="ml-1.5 text-[#c8e88e]">Save 25%</span></button></div>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <div className="price-card flex flex-col rounded-[1.5rem] p-6 sm:p-7"><p className="micro-label text-[#a0a49b]">A first look</p><h3 className="mt-4 text-lg font-semibold text-[#f0f0e8]">Starter</h3><div className="display-heading mt-5 text-5xl tracking-[-.05em] text-white">$0</div><p className="mt-2 min-h-10 text-xs leading-5 text-[#969a91]">A simple place to get your creator business organized.</p><ul className="mt-6 flex-1 space-y-3 border-t border-white/[.08] pt-5 text-xs text-[#c6c9c0]">{['A taste of content diagnostics', 'Core rate and deal tools', 'A home for your key creator signals'].map((x) => <li key={x} className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-[#c8e88e]" />{x}</li>)}</ul><button onClick={onLaunchApp} className="button-outline mt-7 h-11 rounded-full text-xs font-semibold text-white transition hover:bg-white/[.08]">Get started</button></div>
            <div className="price-card price-card-featured relative flex flex-col rounded-[1.5rem] p-6 sm:p-7"><div className="absolute right-5 top-5 rounded-full bg-[#c8e88e]/10 px-2.5 py-1 text-[9px] font-bold tracking-[.12em] text-[#c8e88e]">MOST POPULAR</div><p className="micro-label text-[#d1e3b7]">For the growing business</p><h3 className="mt-4 text-lg font-semibold text-[#f0f0e8]">Pro Creator</h3><div className="mt-5 flex items-baseline gap-1"><span className="display-heading text-5xl tracking-[-.05em] text-white">${billingCycle === 'annual' ? 22 : 29}</span><span className="text-xs text-[#969a91]">/ month</span></div><p className="mt-2 min-h-10 text-xs leading-5 text-[#aeb2a8]">{billingCycle === 'annual' ? 'Billed $264 annually. Save 25% + 2 months free.' : 'Billed monthly. Cancel anytime.'}</p><ul className="mt-6 flex-1 space-y-3 border-t border-white/[.1] pt-5 text-xs text-[#d3d5cd]">{['Deeper content diagnosis & pattern discovery', 'Monetization checks and platform updates', 'Sponsor discovery and commercial rate tools', 'Deal pipeline and creator workspace'].map((x) => <li key={x} className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-[#c8e88e]" />{x}</li>)}</ul><button onClick={onLaunchApp} className="button-lime mt-7 h-11 rounded-full text-xs font-bold text-[#171a13] transition hover:-translate-y-0.5">Choose Pro Creator</button></div>
            <div className="price-card flex flex-col rounded-[1.5rem] p-6 sm:p-7"><p className="micro-label text-[#a0a49b]">For teams & agencies</p><h3 className="mt-4 text-lg font-semibold text-[#f0f0e8]">Manager & Agency</h3><div className="mt-5 flex items-baseline gap-1"><span className="display-heading text-5xl tracking-[-.05em] text-white">${billingCycle === 'annual' ? 59 : 79}</span><span className="text-xs text-[#969a91]">/ month</span></div><p className="mt-2 min-h-10 text-xs leading-5 text-[#969a91]">{billingCycle === 'annual' ? 'Billed $708 annually. For teams & agencies.' : 'Billed monthly. Scalable seats.'}</p><ul className="mt-6 flex-1 space-y-3 border-t border-white/[.08] pt-5 text-xs text-[#c6c9c0]">{['Manage up to 10 Creator Rosters', 'Multi-Creator Sponsor Matching', 'Automated Client PDF Reports', 'Priority Risk Audit Support'].map((x) => <li key={x} className="flex gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-[#c8e88e]" />{x}</li>)}</ul><button onClick={onLaunchApp} className="button-outline mt-7 h-11 rounded-full text-xs font-semibold text-white transition hover:bg-white/[.08]">Open agency workspace</button></div>
          </div>
          <p className="mt-4 text-center text-[10px] text-[#71766e]">Pricing and plan details shown here are from the current product page.</p>
        </div>
      </section>

      <section id="faq" className="section-pad section-faq">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12">
          <div><p className="micro-label mb-4 text-[#c7e99a]">Good questions</p><h2 className="display-heading max-w-[420px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-[#f0f0e8] sm:text-5xl">A little more context.</h2><p className="mt-4 max-w-[350px] text-sm leading-6 text-[#979b91]">The practical details, so you can decide if Creator’s fits the way you work.</p><div className="mt-7 flex items-center gap-2 text-xs text-[#aeb2a8]"><CircleHelp className="h-4 w-4 text-[#c8e88e]" /> Still wondering? Start in the workspace.</div></div>
          <div className="divide-y divide-white/[.09] border-y border-white/[.09]">{faqs.map((item, index) => { const open = activeFaq === index; return <div key={item.q}><button aria-expanded={open} onClick={() => setActiveFaq(open ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-[#e5e7de]"><span>{item.q}</span><ChevronDown className={`h-4 w-4 shrink-0 text-[#a8c77a] transition-transform ${open ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .2 }} className="overflow-hidden"><p className="max-w-[650px] pb-5 pr-8 text-[13px] leading-6 text-[#989d92]">{item.a}</p></motion.div>}</AnimatePresence></div>; })}</div>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="final-cta relative mx-auto max-w-[1320px] overflow-hidden rounded-[1.8rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
          <div className="cta-sun absolute -right-20 -top-40 h-[26rem] w-[26rem] rounded-full" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div><p className="micro-label mb-4 text-[#d9efb5]">Build the next chapter</p><h2 className="display-heading max-w-[710px] text-4xl font-medium leading-[1.04] tracking-[-.045em] text-white sm:text-6xl">The creative part is yours. <span className="text-[#d2f18f]">Make the business make sense.</span></h2><p className="mt-4 max-w-[520px] text-sm leading-6 text-white/65">A clearer view of your work is a better place to start.</p></div>
            <button onClick={onLaunchApp} className="button-lime group inline-flex h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-bold text-[#171a13] transition hover:-translate-y-0.5">Explore Creator’s <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
          </div>
        </div>
      </section>
    </main>
  );
};
