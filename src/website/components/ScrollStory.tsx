import React, { useEffect, useId, useRef, useState } from 'react';
import { Activity, ArrowDown, ArrowRight, ArrowUpRight, BadgeDollarSign, BriefcaseBusiness, Check, CircleDot, FileCheck2, LockKeyhole, ShieldCheck, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

type ChapterId = 'content' | 'deal' | 'safety' | 'workflow';

type Chapter = {
  id: ChapterId;
  eyebrow: string;
  heading: string;
  emphasis: string;
  copy: string;
  action: string;
  tab: string;
  icon: LucideIcon;
  demoTitle: string;
  demoLabel: string;
};

const chapters: Chapter[] = [
  { id: 'content', eyebrow: 'CONTENT INTELLIGENCE', heading: 'The views dipped.', emphasis: 'Find the moment.', copy: 'Trace the attention curve to see where viewers leaned in—or checked out. Turn a vague hunch into a more useful next edit.', action: 'Explore Algorithm Detective', tab: 'detective', icon: TrendingDown, demoTitle: 'A closer look at the first 60 seconds', demoLabel: 'AUDIENCE DIAGNOSIS' },
  { id: 'deal', eyebrow: 'PARTNERSHIP VALUE', heading: 'They asked for a video.', emphasis: 'Price the whole deal.', copy: 'A deliverable is only part of the ask. Separate production, paid usage and exclusivity so your quote reflects what the brand wants to use.', action: 'Try the Rate Calculator', tab: 'rate-calculator', icon: BadgeDollarSign, demoTitle: 'One partnership. Itemized.', demoLabel: 'ILLUSTRATIVE QUOTE' },
  { id: 'safety', eyebrow: 'CREATOR PROTECTION', heading: 'Before it goes live,', emphasis: 'check what changed.', copy: 'Bring originality, monetization context and platform-policy signals into one pre-publish review. Know what may need another look.', action: 'Review creator safeguards', tab: 'risk-scanner', icon: ShieldCheck, demoTitle: 'A checklist, not a guess.', demoLabel: 'SAMPLE REVIEW' },
  { id: 'workflow', eyebrow: 'PARTNERSHIP OPERATIONS', heading: 'A yes is a start.', emphasis: 'Keep the deal moving.', copy: 'Track a brand conversation from the first pitch through deliverables and payment, with fewer details lost in the shuffle.', action: 'See the Deal Pipeline', tab: 'deal-crm', icon: BriefcaseBusiness, demoTitle: 'From first hello to paid.', demoLabel: 'SAMPLE PIPELINE' },
];

function ChapterDemo({ chapter }: { chapter: Chapter }) {
  const Icon = chapter.icon;
  const gradientId = `story-area-${useId().replace(/:/g, '')}`;
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="story-demo-card" aria-live="polite">
      <div className="story-demo-topbar">
        <span className="story-demo-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="story-demo-product">CREATOR’S <i>/</i> WORKSPACE</span>
        <span className="story-demo-readonly"><LockKeyhole size={11} /> READ-ONLY</span>
      </div>
      <div className="story-demo-body">
        <div className="story-demo-toolbar"><span className="story-demo-icon"><Icon size={14} /></span><span><small>{chapter.demoLabel}</small><b>{chapter.demoTitle}</b></span><span className="story-demo-sample">SAMPLE<br />DATA</span></div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={chapter.id} className={`story-demo-content demo-${chapter.id}`} initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, filter: prefersReducedMotion ? 'blur(0px)' : 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, filter: 'blur(0px)' }} transition={{ duration: prefersReducedMotion ? 0 : .28 }}>
            {chapter.id === 'content' && <>
              <div className="demo-content-heading"><span>RETENTION / FIRST 60 SECONDS</span><span className="demo-chip chip-violet">EXAMPLE TRACE</span></div>
              <div className="retention-visual">
                <div className="retention-grid"><i /><i /><i /></div>
                <svg viewBox="0 0 480 150" preserveAspectRatio="none" role="img" aria-label="Illustrative retention trace falls sharply near the opening and then steadies">
                  <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9679ff" stopOpacity=".36" /><stop offset="1" stopColor="#9679ff" stopOpacity="0" /></linearGradient></defs>
                  <motion.path d="M4 23 C39 24 51 32 76 37 C101 42 112 91 145 98 C185 108 211 99 246 105 C283 112 310 111 342 119 C385 126 418 124 476 133 L476 150 L4 150Z" fill={`url(#${gradientId})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: prefersReducedMotion ? 0 : .3 }} />
                  <motion.path d="M4 23 C39 24 51 32 76 37 C101 42 112 91 145 98 C185 108 211 99 246 105 C283 112 310 111 342 119 C385 126 418 124 476 133" fill="none" stroke="#b19dff" strokeWidth="3" vectorEffect="non-scaling-stroke" initial={{ pathLength: prefersReducedMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: prefersReducedMotion ? 0 : .75, ease: [.22, 1, .36, 1] }} />
                  <circle cx="128" cy="94" r="5" fill="#dcff69" /><line x1="128" y1="94" x2="128" y2="148" stroke="#dcff69" strokeDasharray="4 4" opacity=".75" />
                </svg>
                <span className="retention-callout"><i /> OPENING MOMENT TO REVIEW</span>
              </div>
              <div className="demo-stat-row"><div><small>OPENING SIGNAL</small><b>Review the first 8s</b></div><div><small>NEXT STEP</small><b>Test a faster proof point</b></div></div>
              <div className="demo-explain"><Activity size={14} /><span>Compare this moment against your channel’s usual pattern.</span><ArrowUpRight size={13} /></div>
            </>}
            {chapter.id === 'deal' && <>
              <div className="demo-content-heading"><span>RATE BUILDER / BRAND INTEGRATION</span><span className="demo-chip chip-lime">RIGHTS INCLUDED</span></div>
              <div className="deal-visual-head"><div><small>ILLUSTRATIVE DEAL VALUE</small><strong>$3,450</strong></div><span>USD<br />SAMPLE</span></div>
              <div className="deal-visual-rows"><div><span>Production & editing</span><b>$1,400</b><i style={{ '--bar-size': '54%' } as React.CSSProperties} /></div><div><span>30-day paid usage</span><b>+$850</b><i style={{ '--bar-size': '33%' } as React.CSSProperties} /></div><div><span>Category exclusivity</span><b>+$1,200</b><i style={{ '--bar-size': '46%' } as React.CSSProperties} /></div></div>
              <div className="deal-note"><BadgeDollarSign size={15} /><span>See what’s in the quote—and what each right is worth.</span><ArrowUpRight size={13} /></div>
            </>}
            {chapter.id === 'safety' && <>
              <div className="demo-content-heading"><span>PRE-PUBLISH / REVIEW QUEUE</span><span className="demo-chip chip-coral">SAMPLE CHECKLIST</span></div>
              <div className="safety-demo-list"><div><span className="safety-check"><Check size={13} /></span><span><b>Originality signals</b><small>Compare patterns across your own work</small></span><em>REVIEW</em></div><div><span className="safety-check"><FileCheck2 size={13} /></span><span><b>Platform policy changes</b><small>Check recent updates that may apply</small></span><em>CHECK</em></div><div><span className="safety-check"><ShieldCheck size={13} /></span><span><b>Monetization context</b><small>Flag areas that may need a closer look</small></span><em>CONTEXT</em></div></div>
              <div className="safety-note"><ShieldCheck size={15} /><span>Signals support your review; platform decisions are never guaranteed.</span></div>
            </>}
            {chapter.id === 'workflow' && <>
              <div className="demo-content-heading"><span>DEAL PIPELINE / THIS MONTH</span><span className="demo-chip chip-violet">3 SAMPLE DEALS</span></div>
              <div className="pipeline-visual"><div><span className="pipeline-stage-name">IN CONVERSATION <i>02</i></span><article><small>BEAUTY / CREATOR BRIEF</small><b>Juniper House</b><span>Scope & usage to confirm</span></article><article><small>TECH / PRODUCT LAUNCH</small><b>Northstar Audio</b><span>Reply due Thursday</span></article></div><div><span className="pipeline-stage-name">IN PRODUCTION <i>01</i></span><article className="pipeline-highlight"><small>FOOD / SHORT-FORM</small><b>Goodwell Market</b><span>Deliverable: 01 video</span></article><div className="pipeline-next"><CircleDot size={13} /> Brief → deliverable → invoice</div></div></div>
              <div className="pipeline-note"><BriefcaseBusiness size={15} /><span>Keep next steps, assets and deal details in one place.</span><ArrowUpRight size={13} /></div>
            </>}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="story-demo-footer"><span>CREATOR’S / SAMPLE WORKSPACE</span><span><i /> YOUR WORK, YOUR CALL</span></div>
    </div>
  );
}

export const ScrollStory: React.FC<{ onNavigateToModule: (tab: string) => void }> = ({ onNavigateToModule }) => {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 75%', 'end 35%'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: .28 });

  useEffect(() => {
    const items = chapterRefs.current.filter((item): item is HTMLElement => item !== null);
    if (!items.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapterIndex));
      });
    }, { rootMargin: '-43% 0px -43% 0px', threshold: 0 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const current = chapters[active] ?? chapters[0];
  return <section id="platform" className="scroll-story-section">
    <div className="scroll-story-heading"><span className="section-index">01 / FROM SIGNAL TO NEXT MOVE</span><h2>Here’s what Creator’s <span>actually does.</span></h2><p>Keep scrolling. The workspace changes with the question you’re trying to answer.</p><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div></div>
    <div ref={stepsRef} className="scroll-story-layout">
      <div className="scroll-story-steps">{chapters.map((chapter, index) => <article ref={(element) => { chapterRefs.current[index] = element; }} data-chapter-index={index} key={chapter.id} className={`scroll-story-step ${active === index ? 'scroll-story-step-active' : ''}`}>
        <div className="chapter-kicker"><span>{String(index + 1).padStart(2, '0')}</span><i />{chapter.eyebrow}</div>
        <h3>{chapter.heading}<br /><em>{chapter.emphasis}</em></h3>
        <p>{chapter.copy}</p>
        <button onClick={() => onNavigateToModule(chapter.tab)} className="chapter-link">{chapter.action} <ArrowUpRight size={15} /></button>
        {active === index && <div className="mobile-story-preview"><ChapterDemo chapter={chapter} /></div>}
        <div className="chapter-progress-label"><span>SCROLL CHAPTER</span><span>0{index + 1} <i>/</i> 04</span></div>
      </article>)}</div>
      <aside className="scroll-story-visual" aria-label="Creator’s product demonstration that updates as you scroll">
        <div className="story-progress-track" aria-hidden="true"><motion.div className="story-progress-fill" style={{ scaleX: prefersReducedMotion ? (active + 1) / chapters.length : smoothProgress, transformOrigin: '0% 50%' }} /></div>
        <div className="story-current-label"><span><current.icon size={13} /> {current.eyebrow}</span><span>0{active + 1} <i>/</i> 04</span></div>
        <ChapterDemo chapter={current} />
        <div className="story-visual-caption"><span><current.icon size={13} /> THIS IS THE WORKSPACE IN ACTION</span><span>SCROLL TO TRANSFORM ↘</span></div>
      </aside>
    </div>
    <div className="scroll-story-end"><span>CONTENT</span><i /><span>VALUE</span><i /><span>PROTECTION</span><i /><span>PARTNERSHIPS</span><ArrowRight size={13} /></div>
  </section>;
};
