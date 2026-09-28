import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Activity, ArrowDown, ArrowRight, ArrowUpRight, BadgeDollarSign, BarChart3,
  BriefcaseBusiness, Check, CircleDot, FileCheck2, LockKeyhole, ShieldCheck,
  Sparkles, TrendingDown, TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { mockCopycatAlerts, mockRevenueAnalytics, mockSponsors, mockVideoDiagnostics } from '@/shared/data/mockData';
import { SignalContinuum } from '@/shared/components/motion/SignalContinuum';

type ChapterId = 'analytics' | 'protection' | 'partnerships' | 'revenue';

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
  {
    id: 'analytics', eyebrow: '01 / CONTENT INTELLIGENCE', heading: 'The audience dipped.', emphasis: 'Find the moment.',
    copy: 'Follow the attention curve from first hook to last beat. See where momentum shifted, then turn one clear signal into a more useful next experiment.',
    action: 'Explore Algorithm Detective', tab: 'detective', icon: TrendingDown,
    demoTitle: 'A closer look at the first 60 seconds', demoLabel: 'AUDIENCE DIAGNOSIS',
  },
  {
    id: 'protection', eyebrow: '02 / CREATOR PROTECTION', heading: 'Your ideas deserve', emphasis: 'a second line of sight.',
    copy: 'Compare originality signals, note possible matches and review monetization context before you publish. Useful evidence to investigate—not a promise about what a platform will decide.',
    action: 'Explore Originality Monitor', tab: 'originality', icon: ShieldCheck,
    demoTitle: 'Check a signal. Keep the context.', demoLabel: 'SAMPLE PROTECTION REVIEW',
  },
  {
    id: 'partnerships', eyebrow: '03 / BRAND OPPORTUNITY', heading: 'Your audience has', emphasis: 'a particular kind of value.',
    copy: 'Find illustrative brand fits by audience alignment and campaign context. Then see how deliverables, usage rights and exclusivity shape the conversation.',
    action: 'Explore Sponsor Radar', tab: 'sponsor-radar', icon: BriefcaseBusiness,
    demoTitle: 'Fit is more than follower count', demoLabel: 'ILLUSTRATIVE BRAND MATCHES',
  },
  {
    id: 'revenue', eyebrow: '04 / REVENUE INTELLIGENCE', heading: 'Views are a start.', emphasis: 'Follow the money.',
    copy: 'Trace the gap from raw views to qualified views, RPM and an estimated reward. Understand the moving parts behind a number instead of guessing what changed.',
    action: 'Explore Qualified Revenue', tab: 'revenue-analytics', icon: TrendingUp,
    demoTitle: 'From views to an explained estimate', demoLabel: 'ILLUSTRATIVE REVENUE WATERFALL',
  },
];

const retentionData = mockVideoDiagnostics[0].retentionTimeline;
const copycatExample = mockCopycatAlerts[0];
const sponsorExamples = mockSponsors.slice(0, 3);
const revenueExample = mockRevenueAnalytics;

const ChapterDemo = React.memo(function ChapterDemo({ chapter, progress, interactive }: { chapter: Chapter; progress: MotionValue<number>; interactive: boolean }) {
  const Icon = chapter.icon;
  const gradientId = `story-area-${useId().replace(/:/g, '')}`;
  const reducedMotion = useReducedMotion();
  const [selectedMoment, setSelectedMoment] = useState(2);
  const [selectedProtection, setSelectedProtection] = useState(1);
  const [selectedSponsor, setSelectedSponsor] = useState(0);
  const [selectedRevenueDriver, setSelectedRevenueDriver] = useState(0);
  const moment = retentionData[selectedMoment] ?? retentionData[2];
  const sponsor = sponsorExamples[selectedSponsor] ?? sponsorExamples[0];
  const revenueDriver = revenueExample.rpmDrivers[selectedRevenueDriver] ?? revenueExample.rpmDrivers[0];
  const paneOpacity = {
    analytics: useTransform(progress, [0.3, 0.5, 1.1, 1.3], [0, 1, 1, 0]),
    protection: useTransform(progress, [1.18, 1.4, 2.1, 2.38], [0, 1, 1, 0]),
    partnerships: useTransform(progress, [2.2, 2.45, 3.1, 3.35], [0, 1, 1, 0]),
    revenue: useTransform(progress, [3.02, 3.28, 4.05, 4.3], [0, 1, 1, 0]),
  };
  const analyticsDraw = useTransform(progress, [0.3, 0.72], [0.12, 1]);
  const networkDraw = useTransform(progress, [1.28, 1.72], [0.08, 1]);
  const revenueDraw = useTransform(progress, [3.08, 3.5], [0.12, 1]);

  return (
    <motion.div className={`story-demo-card story-demo-pane demo-shell-${chapter.id}`} style={{ opacity: paneOpacity[chapter.id] }} aria-live={interactive ? 'polite' : undefined} aria-hidden={!interactive} data-interactive={interactive}>
      <div className="story-demo-topbar">
        <span className="story-demo-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="story-demo-product">CREATOR’S <i>/</i> INTELLIGENCE</span>
        <span className="story-demo-readonly"><LockKeyhole size={11} /> READ-ONLY</span>
      </div>
      <div className="story-demo-body">
        <div className="story-demo-toolbar">
          <span className="story-demo-icon"><Icon size={14} /></span>
          <span><small>{chapter.demoLabel}</small><b>{chapter.demoTitle}</b></span>
          <span className="story-demo-sample">SAMPLE<br />DATA</span>
        </div>
        <div className={`story-demo-content demo-${chapter.id}`}>
            {chapter.id === 'analytics' && <>
              <div className="demo-content-heading"><span>RETENTION / FIRST 60 SECONDS</span><span className="demo-chip chip-violet">SELECT A MOMENT</span></div>
              <div className="story-analytics-chart">
                <div className="story-chart-grid" aria-hidden="true"><i /><i /><i /></div>
                <div className="story-chart-bars">
                  {retentionData.map((point, index) => (
                    <button key={point.second} type="button" disabled={!interactive} aria-label={`${point.retention}% audience retention at ${point.second} seconds`} aria-pressed={selectedMoment === index} title={`${point.retention}% at ${point.second}s`} onClick={() => setSelectedMoment(index)}>
                      <motion.span className={selectedMoment === index ? 'story-chart-bar story-chart-bar-active' : 'story-chart-bar'} style={{ height: `${Math.max(point.retention, 9)}%`, scaleY: reducedMotion ? 1 : analyticsDraw, transformOrigin: 'center bottom' }} />
                      <small>{point.second}s</small>
                    </button>
                  ))}
                </div>
                <div className="story-chart-readout"><span><i /> {moment.second === 8 ? 'MOMENT TO REVIEW' : 'RETENTION CHECKPOINT'}</span><b>{moment.retention}% <small>at {moment.second}s</small></b></div>
              </div>
              <div className="demo-stat-row"><div><small>CHANNEL SAMPLE</small><b>{mockVideoDiagnostics.length} example videos</b></div><div><small>USE THE SIGNAL</small><b>Test a tighter opening</b></div></div>
              <div className="demo-explain"><Activity size={14} /><span>Compare this moment against your channel’s usual pattern.</span><ArrowUpRight size={13} /></div>
            </>}

            {chapter.id === 'protection' && <>
              <div className="demo-content-heading"><span>ORIGINALITY / INVESTIGATION PATH</span><span className="demo-chip chip-coral">SAMPLE MATCH</span></div>
              <div className="protection-network">
                <svg viewBox="0 0 540 186" role="img" aria-label="Three connected steps: original work, possible similar upload and human review">
                  <defs><linearGradient id={`${gradientId}-network`} x1="0" x2="1"><stop offset="0" stopColor="#8d7bff" /><stop offset="1" stopColor="#d6b5ff" /></linearGradient></defs>
                  <motion.path d="M90 92 C175 21 191 163 274 92 S375 26 450 92" fill="none" stroke={`url(#${gradientId}-network)`} strokeWidth="2" strokeDasharray="5 6" style={{ pathLength: reducedMotion ? 1 : networkDraw }} />
                </svg>
                {[
                  { icon: Sparkles, title: 'Your original', detail: '“Under $500 setup”' },
                  { icon: CircleDot, title: 'Possible match', detail: `${copycatExample.similarityScore}% sample similarity` },
                  { icon: FileCheck2, title: 'Review context', detail: 'Compare before you act' },
                ].map((node, index) => {
                  const NodeIcon = node.icon;
                  return <button key={node.title} type="button" disabled={!interactive} aria-pressed={selectedProtection === index} onClick={() => setSelectedProtection(index)} className={`protection-node protection-node-${index + 1}${selectedProtection === index ? ' protection-node-active' : ''}`}>
                    <span className="protection-node-icon"><NodeIcon size={15} /></span><b>{node.title}</b><small>{node.detail}</small>
                  </button>;
                })}
              </div>
              <div className="protection-note"><ShieldCheck size={15} /><span>{[
                'A saved example of your original work.',
                'Possible similarity is a prompt to inspect—not a finding of infringement.',
                'You stay in control of any follow-up or platform report.',
              ][selectedProtection]}</span><span className="protection-status"><i /> HUMAN REVIEW</span></div>
            </>}

            {chapter.id === 'partnerships' && <>
              <div className="demo-content-heading"><span>SPONSOR RADAR / AUDIENCE FIT</span><span className="demo-chip chip-lime">SAMPLE MATCHES</span></div>
              <div className="sponsor-match-layout">
                <div className="sponsor-match-list">
                  {sponsorExamples.map((item, index) => <button key={item.id} type="button" disabled={!interactive} aria-pressed={selectedSponsor === index} onClick={() => setSelectedSponsor(index)} className={`sponsor-match-row${selectedSponsor === index ? ' sponsor-match-row-active' : ''}`}>
                    <span className="sponsor-match-mark">{item.logo}</span>
                    <span className="sponsor-match-name"><b>{item.brandName}</b><small>{item.category}</small></span>
                    <span className="sponsor-match-score">{item.audienceMatchPercent}<small>%</small></span>
                  </button>)}
                </div>
                <motion.div key={sponsor.id} className="sponsor-match-detail" initial={reducedMotion ? false : { opacity: 0.7, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
                  <div className="sponsor-match-detail-top"><span>{sponsor.logo}</span><small>ILLUSTRATIVE FIT</small></div>
                  <b>{sponsor.brandName}</b>
                  <span className="sponsor-match-budget">{sponsor.budgetTier}<small>sample budget band</small></span>
                  <div className="sponsor-match-meter"><i style={{ width: `${sponsor.audienceMatchPercent}%` }} /></div>
                  <p>{sponsor.audienceMatchPercent}% audience alignment in this sample.</p>
                </motion.div>
              </div>
              <div className="demo-explain"><BriefcaseBusiness size={14} /><span>A relevant conversation starts with the right fit—not just a bigger number.</span><ArrowUpRight size={13} /></div>
            </>}

            {chapter.id === 'revenue' && <>
              <div className="demo-content-heading"><span>{revenueExample.timeframe.toUpperCase()}</span><span className="demo-chip chip-lime">SAMPLE ESTIMATE</span></div>
              <div className="revenue-flow" aria-label="Revenue waterfall from total views to estimated platform reward">
                {[
                  { label: 'RAW VIEWS', value: revenueExample.totalViews.toLocaleString(), width: '100%' },
                  { label: 'QUALIFIED', value: revenueExample.qualifiedViews.toLocaleString(), width: `${revenueExample.qualificationRatePercent}%` },
                  { label: 'EFFECTIVE RPM', value: `$${revenueExample.rpm.toFixed(2)}`, width: '54%' },
                  { label: 'EST. REWARD', value: `$${revenueExample.estimatedEarnings.toFixed(2)}`, width: '41%' },
                ].map((step, index) => <div className={`revenue-flow-step revenue-flow-step-${index + 1}`} key={step.label}>
                  <div className="revenue-flow-head"><small>{step.label}</small><b>{step.value}</b></div>
                  <span className="revenue-flow-rail"><motion.i style={{ width: step.width, scaleX: reducedMotion ? 1 : revenueDraw, transformOrigin: 'left' }} /></span>
                  {index < 3 && <ArrowRight className="revenue-flow-arrow" size={13} aria-hidden="true" />}
                </div>)}
              </div>
              <div className="revenue-driver-row"><span className="revenue-driver-label">WHAT MOVED THE RPM?</span>
                {revenueExample.rpmDrivers.map((driver, index) => <button key={driver.factor} type="button" disabled={!interactive} aria-pressed={selectedRevenueDriver === index} onClick={() => setSelectedRevenueDriver(index)}>{['Geo', 'Watch', 'Search', 'Audio'][index]}</button>)}
              </div>
              <AnimatePresence mode="wait" initial={false}><motion.p key={revenueDriver.factor} className="revenue-driver-note" initial={reducedMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.16 }}><span className={revenueDriver.impact === 'positive' ? 'revenue-impact-up' : 'revenue-impact-down'}>{revenueDriver.impact === 'positive' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}</span><span><b>{revenueDriver.factor}</b> — {revenueDriver.note}</span></motion.p></AnimatePresence>
            </>}
        </div>
      </div>
      <div className="story-demo-footer"><span>CREATOR’S / ILLUSTRATIVE WORKSPACE</span><span><i /> YOUR WORK, YOUR CALL</span></div>
    </motion.div>
  );
});

export const ScrollStory: React.FC<{ onNavigateToModule: (tab: string) => void; progress: MotionValue<number> }> = ({ onNavigateToModule, progress }) => {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const storyProgress = useTransform(progress, [0.85, 4.15], [0, 1]);

  useMotionValueEvent(progress, 'change', (pos) => {
    // Stage 1 = analytics (index 0), Stage 2 = protection (index 1), Stage 3 = partnerships (index 2), Stage 4 = revenue (index 3)
    const nextIndex = Math.min(3, Math.max(0, Math.round(pos - 1)));
    setActive((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  const current = chapters[active] ?? chapters[0];
  return (
    <section id="platform" data-story-chapter={current.id} className="scroll-story-section" aria-label="How Creator’s helps run a creator business">
      <div className="scroll-story-heading">
        <span className="section-index">01 / ONE SIGNAL, FOUR USEFUL QUESTIONS</span>
        <h2>Everything is connected.<br /><span>So is your intelligence.</span></h2>
        <p>Stay with the same signal as it changes shape: from understanding a post to protecting the work, finding the right partner and reading the revenue.</p>
        <div className="scroll-cue"><span>SCROLL TO FOLLOW THE SIGNAL</span><ArrowDown size={14} /></div>
      </div>
      <div className="scroll-story-layout">
        <div className="scroll-story-steps">
          {chapters.map((chapter, index) => (
            <article data-chapter-index={index} data-journey-phase={chapter.id} key={chapter.id} className={`scroll-story-step scroll-story-step-${chapter.id} ${active === index ? 'scroll-story-step-active' : ''}`}>
              <div className="chapter-kicker"><span>{String(index + 1).padStart(2, '0')}</span><i />{chapter.eyebrow}</div>
              <h3>{chapter.heading}<br /><em>{chapter.emphasis}</em></h3>
              <p>{chapter.copy}</p>
              <button onClick={() => onNavigateToModule(chapter.tab)} className="chapter-link">{chapter.action} <ArrowUpRight size={15} /></button>
              {active === index && (
                <div className="mobile-story-preview">
                  <ChapterDemo chapter={chapter} progress={progress} interactive={true} />
                </div>
              )}
              <div className="chapter-progress-label"><span>THE SIGNAL BECOMES</span><span>0{index + 1} <i>/</i> 04</span></div>
            </article>
          ))}
        </div>
        <aside className="scroll-story-visual" aria-label="Creator’s product demonstration that evolves as you scroll">
          <div className="story-progress-track" aria-hidden="true"><motion.div className="story-progress-fill" style={{ scaleX: prefersReducedMotion ? (active + 1) / chapters.length : storyProgress, transformOrigin: '0% 50%' }} /></div>
          <div className="story-current-label"><span><current.icon size={13} /> {current.eyebrow}</span><span>0{active + 1} <i>/</i> 04</span></div>
          <SignalContinuum progress={progress} placement="stage" />
          <div className="story-demo-deck">{chapters.map((chapter, index) => <ChapterDemo key={chapter.id} chapter={chapter} progress={progress} interactive={active === index} />)}</div>
          <div className="story-visual-caption"><span><current.icon size={13} /> SAME SYSTEM. NEW POINT OF VIEW.</span><span>SCROLL TO TRANSFORM ↘</span></div>
        </aside>
      </div>
      <div className="scroll-story-end"><span>UNDERSTAND</span><i /><span>PROTECT</span><i /><span>PARTNER</span><i /><span>GROW</span><ArrowRight size={13} /></div>
    </section>
  );
};
