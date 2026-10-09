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
  Fingerprint,
  Layers3,
  LockKeyhole,
  Scissors,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HeroProductMockup } from '../components/HeroProductMockup';
import { InteractiveRateTeaser } from '../components/InteractiveRateTeaser';
import { InteractiveDiagnosisTeaser } from '../components/InteractiveDiagnosisTeaser';
import { InteractiveMediaKitTeaser } from '../components/InteractiveMediaKitTeaser';
import { ScrollStory } from '../components/ScrollStory';
import { AppleParallaxHero } from '../components/AppleParallaxHero';

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

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNavigateToModule }) => {
  const [category, setCategory] = useState<Category>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeStory, setActiveStory] = useState<StoryStage>('diagnosis');
  const prefersReducedMotion = useReducedMotion();
  const revealProps = (delay = 0) => prefersReducedMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .5, delay, ease: 'easeOut' as const } };
  const visibleSolutions = category === 'all' ? solutions : solutions.filter((item) => item.category === category);

  return (
    <main className="landing-page bg-[#050608]">
      {/* 3D Apple-grade Multi-speed Parallax Hero */}
      <AppleParallaxHero
        onLaunchApp={onLaunchApp}
        onNavigateToModule={onNavigateToModule}
      />

      <div className="ticker-strip" aria-label="Creator’s tools for a moving creator business">
        <div className="ticker-track">{[0, 1].map((copy) => <div className="ticker-group" key={copy} aria-hidden={copy === 1}><span>CONTENT INTELLIGENCE</span><Sparkles size={15} /><span>DEAL CLARITY</span><Zap size={15} /><span>CREATOR PROTECTION</span><Sparkles size={15} /><span>THE BUSINESS BEHIND THE POST</span><Zap size={15} /></div>)}</div>
      </div>

      <ScrollStory onNavigateToModule={onNavigateToModule} />

      <section id="interactive-lab" className="section-pad lab-section relative">
        <span id="experiments" className="absolute -top-20" aria-hidden="true" />
        <div className="section-shell">
          <motion.div className="lab-header" {...revealProps()}><div><span className="section-index">02 / THE INTERACTIVE BITS</span><h2>A little less theory.<br /><span>A little more try-this.</span></h2></div><div className="lab-side-note"><span className="live-sample"><i /> SAMPLE WORKSPACE</span><p>These interactive previews use sample data. Take the controls for a spin.</p></div></motion.div>
          <div className="lab-tabs" role="tablist" aria-label="Creator tools preview">
            {[
              { id: 'diagnosis' as const, label: 'Debug a dip', icon: TrendingDown },
              { id: 'pricing' as const, label: 'Build a quote', icon: BadgeDollarSign },
              { id: 'media-kit' as const, label: 'Tune a media kit', icon: Clapperboard },
            ].map((tab, i) => { const Icon = tab.icon; return <motion.button key={tab.id} role="tab" aria-selected={activeStory === tab.id} onClick={() => setActiveStory(tab.id)} className={`lab-tab ${activeStory === tab.id ? 'lab-tab-active' : ''}`} whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={prefersReducedMotion ? undefined : { scale: .98 }}><span>0{i + 1}</span><Icon size={15} />{tab.label}<ArrowUpRight size={13} className="lab-tab-arrow" /></motion.button>; })}
          </div>
          <motion.div className="lab-stage" {...revealProps(.08)}>
            <AnimatePresence mode="wait">
              {activeStory === 'diagnosis' && <motion.div key="diagnosis" initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0 : .22 }}><InteractiveDiagnosisTeaser onOpenFullApp={() => onNavigateToModule('detective')} /></motion.div>}
              {activeStory === 'pricing' && <motion.div key="pricing" initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0 : .22 }}><InteractiveRateTeaser onOpenFullApp={() => onNavigateToModule('rate-calculator')} /></motion.div>}
              {activeStory === 'media-kit' && <motion.div key="media-kit" initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: prefersReducedMotion ? 0 : .22 }}><InteractiveMediaKitTeaser onOpenFullApp={() => onNavigateToModule('media-kit')} /></motion.div>}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="solutions" className="section-pad toolkit-section">
        <div className="section-shell">
          <motion.div className="toolkit-heading" {...revealProps()}><div><span className="section-index">03 / PICK YOUR NEXT MOVE</span><h2>Small tools.<br /><span>Big-picture energy.</span></h2></div><p>Ten focused ways to make the work behind your work a little easier to read.</p></motion.div>
          <div className="tool-filter" role="group" aria-label="Filter creator tools">{categoryOptions.map((option) => <button key={option.id} onClick={() => setCategory(option.id)} aria-pressed={category === option.id} className={category === option.id ? 'tool-filter-active' : ''}>{option.label}<span>{option.id === 'all' ? '10' : option.id === 'content' ? '4' : option.id === 'revenue' ? '3' : '3'}</span></button>)}</div>
          <motion.div layout className="tool-grid">
            <AnimatePresence mode="popLayout">{visibleSolutions.map((item, index) => { const Icon = item.icon; return <motion.button layout key={item.name} initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} exit={prefersReducedMotion ? undefined : { opacity: 0, scale: .97 }} transition={{ duration: prefersReducedMotion ? 0 : .28, delay: prefersReducedMotion ? 0 : index * .022 }} whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.015 }} whileTap={prefersReducedMotion ? undefined : { scale: .985 }} onClick={() => onNavigateToModule(item.tab)} className={`tool-card tool-${item.color}`}><div className="tool-card-top"><span className="tool-icon"><Icon size={17} /></span><span className="tool-card-index">{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={16} className="tool-card-arrow" /></div><span className="tool-category">{item.tag}</span><b>{item.name}</b><p>{item.copy}</p></motion.button>; })}</AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="section-pad workspace-section">
        <div className="section-shell workspace-grid">
          <motion.div className="workspace-copy" {...revealProps()}><span className="section-index">04 / YOUR WHOLE OPERATING VIEW</span><h2>More signal.<br /><span>Fewer tabs.</span></h2><p>Bring your creator decisions together: understand what’s working, price what you’re making and keep good deals in motion.</p><ul>{['Your work stays yours', 'Read-only signals, not publishing access', 'Built for actual creator workflows'].map((text) => <li key={text}><span><Check size={13} /></span>{text}</li>)}</ul><button onClick={onLaunchApp} className="hero-button hero-button-primary">Open the workspace <ArrowRight size={16} /></button></motion.div>
          <motion.div className="product-frame" {...revealProps(.1)} whileHover={prefersReducedMotion ? undefined : { y: -4 }}><div className="product-frame-label"><span>CREATOR’S / DESKTOP PREVIEW</span><span><i /> INTERACTIVE SAMPLE</span></div><HeroProductMockup onOpenApp={(tab) => onNavigateToModule(tab || 'overview')} /></motion.div>
        </div>
      </section>

      <section id="pricing" className="section-pad pricing-section">
        <div className="section-shell">
          <motion.div className="pricing-heading" {...revealProps()}><div><span className="section-index">05 / START WHERE YOU ARE</span><h2>Choose your<br /><span>own tempo.</span></h2><p>Start with clarity. Add more room as your creator business grows.</p></div><div className="billing-switch" aria-label="Billing period"><button aria-pressed={billingCycle === 'monthly'} onClick={() => setBillingCycle('monthly')}>Monthly</button><button aria-pressed={billingCycle === 'annual'} onClick={() => setBillingCycle('annual')}>Annual <span>SAVE 25%</span></button></div></motion.div>
          <div className="pricing-grid">
            <motion.article className="price-card" {...revealProps()} whileHover={prefersReducedMotion ? undefined : { y: -5 }}><span className="price-index">01 / A FIRST LOOK</span><h3>Starter</h3><div className="price-amount">$0</div><p>A simple place to get your creator business organized.</p><ul>{['A taste of content diagnostics', 'Core rate and deal tools', 'A home for your key creator signals'].map((text) => <li key={text}><Check size={14} />{text}</li>)}</ul><button onClick={onLaunchApp}>Get started <ArrowRight size={15} /></button></motion.article>
            <motion.article className="price-card price-card-featured" {...revealProps(.08)} whileHover={prefersReducedMotion ? undefined : { y: -5 }}><span className="price-index">02 / FOR THE GROWING BUSINESS</span><span className="price-popular">COMMUNITY FAVOURITE</span><h3>Pro Creator</h3><div className="price-amount">${billingCycle === 'annual' ? 22 : 29}<small>/ month</small></div><p>{billingCycle === 'annual' ? 'Billed $264 annually. Save 25% + 2 months free.' : 'Billed monthly. Cancel anytime.'}</p><ul>{['Deeper content diagnosis & pattern discovery', 'Monetization checks and platform updates', 'Sponsor discovery and commercial rate tools', 'Deal pipeline and creator workspace'].map((text) => <li key={text}><Check size={14} />{text}</li>)}</ul><button onClick={onLaunchApp}>Choose Pro Creator <ArrowRight size={15} /></button></motion.article>
            <motion.article className="price-card" {...revealProps(.16)} whileHover={prefersReducedMotion ? undefined : { y: -5 }}><span className="price-index">03 / FOR TEAMS & AGENCIES</span><h3>Manager & Agency</h3><div className="price-amount">${billingCycle === 'annual' ? 59 : 79}<small>/ month</small></div><p>{billingCycle === 'annual' ? 'Billed $708 annually. For teams & agencies.' : 'Billed monthly. Scalable seats.'}</p><ul>{['Manage up to 10 Creator Rosters', 'Multi-Creator Sponsor Matching', 'Automated Client PDF Reports', 'Priority Risk Audit Support'].map((text) => <li key={text}><Check size={14} />{text}</li>)}</ul><button onClick={onLaunchApp}>Open agency workspace <ArrowRight size={15} /></button></motion.article>
          </div>
          <p className="pricing-footnote">Pricing and plan details shown here are from the current product page.</p>
        </div>
      </section>

      <section id="faq" className="section-pad faq-section"><motion.div className="section-shell faq-grid" {...revealProps()}><div><span className="section-index">06 / FAIR QUESTIONS</span><h2>Before we<br /><span>get moving.</span></h2><p>Useful details. No mystique required.</p><span className="faq-graphic"><CircleHelp size={19} /> NEED A HAND?</span></div><div className="faq-list">{faqs.map((item, index) => { const open = activeFaq === index; return <motion.article key={item.q} className={open ? 'faq-item faq-item-open' : 'faq-item'} {...revealProps(index * .05)}><button aria-expanded={open} onClick={() => setActiveFaq(open ? null : index)}><span>{item.q}</span><ChevronDown size={17} /></button><AnimatePresence initial={false}>{open && <motion.div initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0 : .2 }} className="faq-answer"><p>{item.a}</p></motion.div>}</AnimatePresence></motion.article>; })}</div></motion.div></section>

      <motion.section className="final-cta-wrap" {...revealProps()}><div className="final-cta"><motion.div className="cta-orbit cta-orbit-one" animate={prefersReducedMotion ? undefined : { rotate: 360 }} transition={prefersReducedMotion ? undefined : { duration: 100, repeat: Infinity, ease: 'linear' }} /><motion.div className="cta-orbit cta-orbit-two" animate={prefersReducedMotion ? undefined : { rotate: -360 }} transition={prefersReducedMotion ? undefined : { duration: 135, repeat: Infinity, ease: 'linear' }} /><div className="cta-content"><span className="section-index">ONE GOOD NEXT MOVE IS ENOUGH</span><h2>Make the work.<br /><em>Move with intent.</em></h2><p>Clarity doesn’t have to be complicated. Pick a signal and go from there.</p><button onClick={onLaunchApp}>Step into Creator’s <ArrowRight size={16} /></button></div><div className="cta-sticker"><Sparkles size={19} /><span>YOUR NEXT<br />CHAPTER</span><ArrowUpRight size={14} /></div></div></motion.section>
    </main>
  );
};
