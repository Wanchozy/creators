import React, { useRef } from 'react';
import {
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Activity,
  ArrowDownRight,
  CheckCircle2,
  LockKeyhole,
  Layers
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { HeroProductMockup } from './HeroProductMockup';

interface AppleParallaxHeroProps {
  onLaunchApp: () => void;
  onNavigateToModule: (tab: string) => void;
}

export const AppleParallaxHero: React.FC<AppleParallaxHeroProps> = ({
  onLaunchApp,
  onNavigateToModule,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking for Parallax (starts when top enters, ends when bottom leaves)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth springs for buttery Apple-grade responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.25,
  });

  // Layer 1: Background Nebula Drift (Slow: 0.25x speed)
  const bgDriftY = useTransform(smoothProgress, [0, 1], ['0%', '35%']);
  const bgGlowScale = useTransform(smoothProgress, [0, 0.6], [1, 1.25]);

  // Layer 2: Hero Headline Retreat (Fades & drifts upward smoothly)
  const headlineY = useTransform(smoothProgress, [0, 0.4], [0, -75]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.32], [1, 0]);
  const headlineScale = useTransform(smoothProgress, [0, 0.4], [1, 0.94]);

  // Layer 3: Central 3D Command Center Interface (Tilts from angled perspective to flat locked focus)
  const mockupRotateX = useTransform(smoothProgress, [0, 0.55], [24, 0]);
  const mockupScale = useTransform(smoothProgress, [0, 0.55], [0.86, 1.03]);
  const mockupY = useTransform(smoothProgress, [0, 0.6], [40, -40]);

  // Layer 4: Floating Parallax Telemetry Badges (Fast: 1.6x - 2.2x speed)
  // Badge A: Top-Left (Retention Drop Autopsy)
  const badgeAY = useTransform(smoothProgress, [0, 0.65], [30, -220]);
  const badgeAX = useTransform(smoothProgress, [0, 0.65], [0, -35]);
  const badgeAOpacity = useTransform(smoothProgress, [0, 0.12, 0.52, 0.68], [0.3, 1, 1, 0]);

  // Badge B: Top-Right (Commercial Deal Value)
  const badgeBY = useTransform(smoothProgress, [0, 0.65], [50, -180]);
  const badgeBX = useTransform(smoothProgress, [0, 0.65], [0, 40]);
  const badgeBOpacity = useTransform(smoothProgress, [0, 0.15, 0.52, 0.68], [0.3, 1, 1, 0]);

  // Badge C: Bottom-Left (Contract Shield)
  const badgeCY = useTransform(smoothProgress, [0, 0.65], [70, -120]);
  const badgeCX = useTransform(smoothProgress, [0, 0.65], [0, -25]);
  const badgeCOpacity = useTransform(smoothProgress, [0, 0.18, 0.52, 0.68], [0.2, 1, 1, 0]);

  // Badge D: Bottom-Right (Repurposed Viral Cut)
  const badgeDY = useTransform(smoothProgress, [0, 0.65], [90, -90]);
  const badgeDX = useTransform(smoothProgress, [0, 0.65], [0, 30]);
  const badgeDOpacity = useTransform(smoothProgress, [0, 0.2, 0.52, 0.68], [0.2, 1, 1, 0]);

  // Mouse Move 3D Tilt Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct * 8); // subtle tilt
    mouseY.set(yPct * -8);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springTiltX = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const springTiltY = useSpring(mouseX, { stiffness: 120, damping: 20 });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[155vh] lg:min-h-[175vh] bg-[#050608] text-white overflow-hidden pt-16 sm:pt-24"
    >
      {/* =========================================================================
          PARALLAX LAYER 1: Ambient Cinema Backdrops & Glowing Stars
         ========================================================================= */}
      <motion.div
        style={{ y: bgDriftY, scale: bgGlowScale }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Massive Top Radial Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[38rem] bg-gradient-to-b from-violet-600/25 via-indigo-500/15 to-transparent blur-[120px] rounded-full" />
        
        {/* Secondary Rose/Amber Contrast Glows */}
        <div className="absolute top-[28rem] -left-36 w-96 h-96 bg-rose-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[32rem] -right-36 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full" />

        {/* Technical Sub-Grid (Apple Hardware style) */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </motion.div>

      {/* =========================================================================
          PARALLAX LAYER 2: Hero Typographic Headline & Actions
         ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity, scale: headlineScale }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-slate-300 backdrop-blur-xl shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider text-[11px] uppercase text-white">
              Creator Intelligence OS
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-[11px]">PulseIQ</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.03] text-white">
            Stop guessing.{' '}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-rose-300 bg-clip-text text-transparent">
              Know the signal.
            </span>
          </h1>

          {/* Sub-Headline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The operating system for creators who treat content as a business.
            Algorithmic retention autopsies, commercial rate intelligence, and legal contract safety—all in one place.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all duration-200 shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] flex items-center justify-center space-x-2"
            >
              <span>Explore Your Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#interactive-lab"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white text-sm font-semibold transition backdrop-blur-xl flex items-center justify-center space-x-2"
            >
              <span>Test Live Sandboxes</span>
              <ArrowDownRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Proof Badges */}
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-400 pt-3">
            <span className="flex items-center space-x-1.5">
              <LockKeyhole className="w-3.5 h-3.5 text-indigo-400" />
              <span>Read-only data access</span>
            </span>
            <span className="text-slate-600">•</span>
            <span>Zero permission risk</span>
            <span className="text-slate-600">•</span>
            <span>Built for YouTube & TikTok</span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          PARALLAX LAYER 3: 3D Command Center & Floating Telemetry Badges
         ========================================================================= */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 z-30 [perspective:1400px]">
        {/* Floating Telemetry Badge A: Top-Left (Algorithm Detective) */}
        <motion.div
          style={{ y: badgeAY, x: badgeAX, opacity: badgeAOpacity }}
          className="absolute -top-10 -left-6 sm:left-4 z-40 hidden md:block"
        >
          <div className="p-3.5 rounded-2xl bg-[#0e111a]/85 border border-rose-500/30 backdrop-blur-xl shadow-2xl shadow-rose-950/40 w-64 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-rose-400 font-bold uppercase flex items-center space-x-1">
                <TrendingDown className="w-3 h-3" />
                <span>Cliff at 0:08</span>
              </span>
              <span className="text-slate-500">HOOK AUTOPSY</span>
            </div>
            <div className="text-xs font-bold text-white">48% Bounced in First 8 Seconds</div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[48%]" />
            </div>
            <div className="text-[10px] text-slate-400">Diagnosis: Cut bumper intro to 0s</div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge B: Top-Right (Rate Calculator) */}
        <motion.div
          style={{ y: badgeBY, x: badgeBX, opacity: badgeBOpacity }}
          className="absolute -top-6 -right-6 sm:right-4 z-40 hidden md:block"
        >
          <div className="p-3.5 rounded-2xl bg-[#0e111a]/85 border border-emerald-500/30 backdrop-blur-xl shadow-2xl shadow-emerald-950/40 w-64 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-emerald-400 font-bold uppercase flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>Commercial Quote</span>
              </span>
              <span className="text-slate-500">NIKE TECH</span>
            </div>
            <div className="text-sm font-extrabold text-white font-mono">$4,850 Target Fee</div>
            <div className="text-[10px] text-emerald-300 font-mono flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Includes 30d Paid Ad Whitelisting</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge C: Bottom-Left (Contract Shield) */}
        <motion.div
          style={{ y: badgeCY, x: badgeCX, opacity: badgeCOpacity }}
          className="absolute bottom-16 -left-6 sm:left-6 z-40 hidden md:block"
        >
          <div className="p-3.5 rounded-2xl bg-[#0e111a]/85 border border-indigo-500/30 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 w-64 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-indigo-400 font-bold uppercase flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Clause Guard</span>
              </span>
              <span className="text-slate-500">SECURED</span>
            </div>
            <div className="text-xs font-bold text-white">0 Predatory Traps</div>
            <div className="text-[10px] text-slate-300 line-through text-rose-400">
              "License in perpetuity worldwide"
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">
              Replaced with 6-month limited term
            </div>
          </div>
        </motion.div>

        {/* Floating Telemetry Badge D: Bottom-Right (Repurposed Viral Clip) */}
        <motion.div
          style={{ y: badgeDY, x: badgeDX, opacity: badgeDOpacity }}
          className="absolute bottom-12 -right-6 sm:right-6 z-40 hidden md:block"
        >
          <div className="p-3.5 rounded-2xl bg-[#0e111a]/85 border border-amber-500/30 backdrop-blur-xl shadow-2xl shadow-amber-950/40 w-64 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-amber-400 font-bold uppercase flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>Viral Moment</span>
              </span>
              <span className="text-slate-500">SMART RECYCLE</span>
            </div>
            <div className="text-xs font-bold text-white">94% Predicted Virality</div>
            <div className="text-[10px] text-slate-400 font-mono">
              Timestamp: 04:12 - 04:42 (TikTok Export)
            </div>
          </div>
        </motion.div>

        {/* The Core 3D Tilt Command Center Container */}
        <motion.div
          style={{
            rotateX: mockupRotateX,
            scale: mockupScale,
            y: mockupY,
            rotateZ: springTiltX,
          }}
          className="relative transition-transform duration-75 ease-out rounded-2xl"
        >
          <HeroProductMockup onOpenApp={(tab) => onNavigateToModule(tab || 'overview')} />
        </motion.div>
      </div>

      {/* Subtle Bottom Ambient Gradient Bleed into Next Section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30" />
    </div>
  );
};
