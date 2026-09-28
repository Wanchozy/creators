import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { JOURNEY_BACKGROUNDS, JOURNEY_STAGES, type JourneyStage } from './journeyStage';
import { SignalContinuum } from './SignalContinuum';

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

function stageAt(position: number): JourneyStage {
  return JOURNEY_STAGES[clamp(Math.round(position + 0.1), 0, JOURNEY_STAGES.length - 1)];
}

function interpolateStage(progress: number, stops: readonly number[]): number {
  if (progress <= stops[0]) return 0;
  const last = stops.length - 1;
  if (progress >= stops[last]) return last;
  for (let index = 0; index < last; index += 1) {
    const start = stops[index];
    const end = Math.max(start + 0.001, stops[index + 1]);
    if (progress <= end) return index + (progress - start) / (end - start);
  }
  return last;
}

function stageAura(position: number, center: number, spread = 1.65): number {
  const linear = clamp(1 - Math.abs(position - center) / spread, 0, 1);
  return linear * linear * (3 - 2 * linear);
}

const phaseAnchors: ReadonlyArray<{ stage: JourneyStage; selector: string }> = [
  { stage: 'core', selector: '.landing-page [data-journey-phase="core"]' },
  { stage: 'analytics', selector: '.scroll-story-step-analytics' },
  { stage: 'protection', selector: '.scroll-story-step-protection' },
  { stage: 'partnerships', selector: '.scroll-story-step-partnerships' },
  { stage: 'revenue', selector: '.scroll-story-step-revenue' },
  { stage: 'convergence', selector: '.landing-page .final-cta-wrap[data-journey-phase="convergence"]' },
];

/** One native scroll progress value maps to measured content anchors with zero-lag responsive smoothing. */
export function useJourneyProgress(active: boolean, onStageChange?: (stage: JourneyStage) => void): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  // Fast, responsive spring: low mass (0.08) and high stiffness (300) delivers immediate (<10ms) response
  // while critical damping (32) ensures zero bounce and a smooth 50ms settle when scroll stops.
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 32,
    mass: 0.08,
    restDelta: 0.0005,
  });
  const pageProgress = useTransform(() => (reducedMotion ? scrollYProgress.get() : smoothScrollProgress.get()));
  const anchorProgress = useRef<number[]>([0, 0.14, 0.31, 0.49, 0.68, 0.93]);
  const anchorVersion = useMotionValue(0);
  const journeyProgress = useTransform(() => {
    anchorVersion.get();
    return interpolateStage(pageProgress.get(), anchorProgress.current);
  });

  useMotionValueEvent(journeyProgress, 'change', (position) => {
    if (active && onStageChange) onStageChange(stageAt(position));
  });

  useEffect(() => {
    if (!active) {
      onStageChange?.('core');
      return;
    }
    let resizeTimer: number;
    const measureAnchors = () => {
      const anchors = phaseAnchors.map(({ selector }) => document.querySelector<HTMLElement>(selector));
      if (anchors.some((anchor) => anchor === null)) return false;
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const measured = anchors.map((anchor, index) => {
        const rect = anchor!.getBoundingClientRect();
        const phasePosition = index === 0
          ? rect.top + window.scrollY + Math.min(rect.height * 0.5, window.innerHeight * 0.5)
          : rect.top + window.scrollY + Math.min(window.innerHeight * 0.1, rect.height * 0.08);
        const mapped = clamp((phasePosition - window.innerHeight * 0.45) / scrollRange, 0, 1);
        return index === 0 ? 0 : mapped;
      });
      for (let index = 1; index < measured.length; index += 1) measured[index] = Math.max(measured[index], measured[index - 1] + 0.002);
      measured[measured.length - 1] = clamp(measured[measured.length - 1], 0.002, 1);
      anchorProgress.current = measured;
      anchorVersion.set(anchorVersion.get() + 1);
      if (onStageChange) onStageChange(stageAt(interpolateStage(pageProgress.get(), measured)));
      return true;
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measureAnchors, 100);
    };

    // Initial measurement after paint
    const rafId = requestAnimationFrame(() => {
      measureAnchors();
    });

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, onStageChange, pageProgress]);

  return journeyProgress;
}

interface JourneyAtmosphereProps {
  active: boolean;
  enabled: boolean;
  progress: MotionValue<number>;
}

/** One continuous, layered environment with optimized GPU compositor layers. */
export const JourneyAtmosphere: React.FC<JourneyAtmosphereProps> = React.memo(({ active, enabled, progress }) => {
  const dark = active && enabled;
  const background = useTransform(progress, [0, 1, 2, 3, 4, 5], [...JOURNEY_BACKGROUNDS]);
  const ambient = useTransform(progress, (value) => stageAura(value, 0, 1.3) * 0.16 + stageAura(value, 5, 1.45) * 0.22);
  const blue = useTransform(progress, (value) => stageAura(value, 0, 1.8) * 0.13 + stageAura(value, 1, 1.55) * 0.34);
  const violet = useTransform(progress, (value) => stageAura(value, 1, 1.7) * 0.11 + stageAura(value, 2, 1.6) * 0.3 + stageAura(value, 3, 1.85) * 0.06);
  const amber = useTransform(progress, (value) => stageAura(value, 2, 1.75) * 0.05 + stageAura(value, 3, 1.55) * 0.27 + stageAura(value, 4, 1.9) * 0.05);
  const emerald = useTransform(progress, (value) => stageAura(value, 3, 1.8) * 0.07 + stageAura(value, 4, 1.55) * 0.28 + stageAura(value, 5, 1.55) * 0.09);
  const positions = [
    useTransform(progress, [0, 1, 2, 3, 4, 5], ['-9vw', '12vw', '30vw', '15vw', '-16vw', '4vw']),
    useTransform(progress, [0, 1, 2, 3, 4, 5], ['-31vh', '-4vh', '12vh', '-23vh', '-4vh', '-36vh']),
    useTransform(progress, [0, 1, 2, 3, 4, 5], ['22vw', '5vw', '-19vw', '-3vw', '25vw', '4vw']),
    useTransform(progress, [0, 1, 2, 3, 4, 5], ['9vh', '-14vh', '21vh', '6vh', '-12vh', '11vh']),
  ];

  if (!active) return null;
  return (
    <motion.div
      className={`journey-atmosphere${dark ? '' : ' journey-atmosphere-light'}`}
      aria-hidden="true"
      style={dark ? { backgroundColor: background } : undefined}
    >
      <motion.div className="journey-atmosphere-grid" style={dark ? { opacity: ambient } : undefined} />
      <motion.div className="journey-aurora journey-aurora-blue" style={dark ? { opacity: blue, x: positions[0], y: positions[1] } : undefined} />
      <motion.div className="journey-aurora journey-aurora-violet" style={dark ? { opacity: violet, x: positions[2], y: positions[3] } : undefined} />
      <motion.div className="journey-aurora journey-aurora-amber" style={dark ? { opacity: amber, x: positions[0], y: positions[3] } : undefined} />
      <motion.div className="journey-aurora journey-aurora-emerald" style={dark ? { opacity: emerald, x: positions[2], y: positions[1] } : undefined} />
      <motion.div className="journey-aurora journey-aurora-core" style={dark ? { opacity: ambient, x: positions[2], y: positions[3] } : undefined} />
      <div className="journey-atmosphere-grain" />
    </motion.div>
  );
});
