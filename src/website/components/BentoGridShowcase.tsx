import React, { useState } from 'react';
import {
  TrendingDown,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  DollarSign,
  Copy,
  Check,
  Smartphone,
  Eye,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SurfaceCard } from '@/shared/components/motion';

export const BentoGridShowcase: React.FC<{ onOpenDownloadModal: () => void }> = ({
  onOpenDownloadModal,
}) => {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [autopsyPoint, setAutopsyPoint] = useState<'0:08' | '0:14' | '1:30'>('0:14');

  const handleCopyPitch = () => {
    navigator.clipboard?.writeText(
      "Hi NordVPN Partnerships! We reach 185k verified monthly tech viewers. Here is our direct commercial media kit: creators.app/m/techpulse"
    );
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <section id="bento" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>Mobile-First Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for creators who run their business from their phone.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Stop waiting until you're back at a desktop to diagnose distribution throttles or negotiate sponsorship deals.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TILE 1: Large Span 2 - Algorithmic Autopsy */}
          <SurfaceCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 blur-[80px] pointer-events-none rounded-full" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Causal Intelligence
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Instant Drop-Off Autopsy on the Go
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                  Pinpoint the exact second retention broke. Compare against your channel’s historic benchmark to know if it was hook fatigue, topic misalignment, or seed cohort failure.
                </p>
              </div>

              {/* Interactive Timeline Scrub Box */}
              <div className="p-4 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Retention Scrub Timeline:</span>
                  <div className="flex space-x-1">
                    {(['0:08', '0:14', '1:30'] as const).map((pt) => (
                      <button
                        key={pt}
                        onClick={() => setAutopsyPoint(pt)}
                        className={`px-2 py-0.5 rounded text-[10px] transition ${
                          autopsyPoint === pt
                            ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {pt}s
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-12 w-full bg-slate-950 rounded-lg p-2 flex items-end space-x-1.5 border border-white/[0.04]">
                  <div className="h-full w-1/5 bg-indigo-500/70 rounded-t" />
                  <div
                    className={`w-1/5 rounded-t transition-all ${
                      autopsyPoint === '0:08' ? 'h-3/5 bg-rose-500' : 'h-4/5 bg-indigo-500/60'
                    }`}
                  />
                  <div
                    className={`w-1/5 rounded-t transition-all ${
                      autopsyPoint === '0:14' ? 'h-2/5 bg-rose-500' : 'h-3/5 bg-indigo-500/50'
                    }`}
                  />
                  <div
                    className={`w-1/5 rounded-t transition-all ${
                      autopsyPoint === '1:30' ? 'h-1/5 bg-rose-500' : 'h-2/5 bg-slate-800'
                    }`}
                  />
                  <div className="h-1/5 w-1/5 bg-slate-800 rounded-t" />
                </div>

                <div className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/15 text-[11px] text-slate-300 font-mono flex items-center justify-between">
                  <span>
                    {autopsyPoint === '0:08'
                      ? '⚠️ 0:08s: Hook resolved too quickly without introducing secondary mystery.'
                      : autopsyPoint === '0:14'
                      ? '⚠️ 0:14s: Sudden drop-off (-42%). Monotone sentence without visual B-roll cut.'
                      : '⚠️ 1:30s: Mid-roll sponsor read caused 28% instant swipe-away.'}
                  </span>
                  <span className="text-rose-400 font-bold ml-2 shrink-0">DIAGNOSED</span>
                </div>
              </div>
            </div>
          </SurfaceCard>

          {/* TILE 2: Span 1 - Pre-Upload Monetization Shield */}
          <SurfaceCard className="p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[70px] pointer-events-none rounded-full" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Safe to Post
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Camera Roll Risk Scanner
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Scan drafts before uploading. Verifies background music copyright, fair use duration, and community guideline strikes.
                </p>
              </div>

              <div className="space-y-2 p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Reused Footage Policy</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">Passed</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Commercial Audio Rights</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">Passed</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>RPM Penalty Risk</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">0%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Pre-flight safety</span>
              <span className="text-white font-bold">98.4% Confidence</span>
            </div>
          </SurfaceCard>

          {/* TILE 3: Span 1 - Pocket Sponsor Radar & Rates */}
          <SurfaceCard className="p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[70px] pointer-events-none rounded-full" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Deal Engine
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Pocket Sponsor Radar
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Never accept lowball offers. Get audited commercial rates including whitelisting and direct brand marketing contacts.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold">NordVPN Integration</span>
                  <span className="text-emerald-400 font-mono font-bold">$3,500</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Verified Contact: sarah.m@nordsec.com
                </p>
                <button
                  onClick={handleCopyPitch}
                  className="w-full py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 font-mono text-[10px] flex items-center justify-center space-x-1 border border-indigo-500/30 transition"
                >
                  {copiedPitch ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>1-Tap Copy Pitch Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Average deal uplift</span>
              <span className="text-emerald-400 font-bold">+$1,450/deal</span>
            </div>
          </SurfaceCard>

          {/* TILE 4: Large Span 2 - Originality & Scraper Sentinel */}
          <SurfaceCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[80px] pointer-events-none rounded-full" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Push Notifications
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Scraper & Copycat Sentinel
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                  Automated faceless AI channels scrape your scripts and re-upload your clips within hours. Get alerted on your lockscreen with pre-written DMCA takedowns.
                </p>
              </div>

              {/* Alert Notification Simulation */}
              <div className="p-3.5 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-2 max-w-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Lockscreen Alert: Scraping Detected</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">2m ago</span>
                </div>
                <p className="text-xs text-slate-200">
                  Channel "@DailyAIBuzz" re-uploaded 48s of your video "Local AI Guide" without attribution.
                </p>
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={onOpenDownloadModal}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-mono transition"
                  >
                    Generate 1-Tap DMCA Notice
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">Status: Flagged for takedown</span>
                </div>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
};
