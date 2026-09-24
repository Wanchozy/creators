import React, { useState } from 'react';
import {
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Smartphone,
  Copy,
  Check,
  Bell,
  Clock,
  ExternalLink,
  ChevronRight,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MobileAppTab = 'autopsy' | 'shield' | 'sponsor' | 'mediakit';

export const HeroMobileMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MobileAppTab>('autopsy');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const handleCopyPitch = () => {
    navigator.clipboard?.writeText(
      "Hey NordVPN Team! Loved your latest security campaign. Our audience (72% tech/developer) matches your core demographic with an avg 185k views. Check our verified rate card: creators.app/m/techpulse"
    );
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="relative mx-auto max-w-5xl flex flex-col items-center justify-center py-6 px-4">
      {/* Raycast-style Ambient Glowing Halo Behind Device */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-rose-600/15 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-500/15 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />

      {/* Floating Raycast-Style Satellite Glass Micro-Cards (Desktop only) */}
      <div className="hidden lg:block absolute -left-6 top-24 z-20 w-64">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="surface-panel p-3.5 rounded-2xl specular-border shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl border border-white/[0.1] space-y-2 transform hover:-translate-y-1 transition duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Retention Cliff</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">0:14s</span>
          </div>
          <p className="text-xs text-slate-200 font-semibold leading-snug">
            -42% Drop at Hook: Intro talk lacked visual pattern interrupt.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-white/[0.06] flex items-center justify-between">
            <span>Fix: Move B-roll 4s earlier</span>
            <span className="text-emerald-400 font-bold">+18% CTR</span>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block absolute -right-6 top-16 z-20 w-68">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="surface-panel p-3.5 rounded-2xl specular-border shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl border border-white/[0.1] space-y-2 transform hover:-translate-y-1 transition duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Sponsor Radar Lead</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Active</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-xs">
              NV
            </div>
            <div>
              <div className="text-xs font-bold text-white">NordVPN Campaign</div>
              <div className="text-[10px] text-slate-400">Cybersecurity • US / UK / Global</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[11px]">
            <span className="text-slate-400">Audience Fair Value:</span>
            <span className="text-emerald-400 font-mono font-bold">$3,500.00</span>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block absolute -right-4 bottom-24 z-20 w-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="surface-panel p-3 rounded-2xl specular-border shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl border border-white/[0.1] space-y-1.5 transform hover:-translate-y-1 transition duration-200"
        >
          <div className="flex items-center space-x-2 text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Monetization Pre-Flight</span>
          </div>
          <div className="text-xs font-semibold text-white">0 Yellow-Dollar Risks Found</div>
          <p className="text-[10px] text-slate-400">
            Music cleared • Reused video: 0s • Safe for brand integration.
          </p>
        </motion.div>
      </div>

      {/* Modern Hardware Device Frame (iPhone 16 Pro Titanium Profile) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] rounded-[48px] p-3 bg-gradient-to-b from-[#2a2d36] via-[#16181f] to-[#0a0c10] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10">
        {/* Dynamic Island / Hardware Speaker */}
        <div className="relative rounded-[40px] bg-[#07080c] border border-white/[0.08] overflow-hidden flex flex-col h-[670px] text-left">
          {/* Top Edge Specular Hairline */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-30" />

          {/* iOS Status Bar */}
          <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs text-white select-none z-30 relative shrink-0">
            <span className="font-semibold text-[11px] font-sans">9:41</span>
            {/* Dynamic Island Notch */}
            <div className="h-5 w-24 bg-black rounded-full border border-white/10 flex items-center justify-center space-x-1.5 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">Creator OS</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
              <span className="font-mono">5G</span>
              <div className="w-4 h-2 rounded-[2px] border border-white/60 p-[1px] flex items-center">
                <div className="h-full w-2.5 bg-white rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Header Inside Phone */}
          <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between shrink-0 bg-[#090b10]/80 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-sm">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-white tracking-tight">Creator's Studio</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Benchmarks
              </span>
            </div>
          </div>

          {/* Phone Screen Module Switcher Bar */}
          <div className="p-2 border-b border-white/[0.06] bg-black/40 shrink-0">
            <div className="grid grid-cols-4 gap-1 p-0.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              {[
                { id: 'autopsy', label: 'Autopsy', icon: TrendingDown },
                { id: 'shield', label: 'Shield', icon: ShieldCheck },
                { id: 'sponsor', label: 'Radar', icon: Briefcase },
                { id: 'mediakit', label: 'Kit', icon: Layers },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as MobileAppTab)}
                    className={`relative py-1.5 rounded-lg text-[10px] font-semibold flex flex-col items-center justify-center transition-colors ${
                      active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="phoneTabIndicator"
                        className="absolute inset-0 rounded-lg bg-white/10 border border-white/10 shadow-sm"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 mb-0.5 relative z-10" />
                    <span className="relative z-10 text-[9px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Screen Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 relative text-xs">
            <AnimatePresence mode="wait">
              {/* TAB 1: AUTOPSY */}
              {activeTab === 'autopsy' && (
                <motion.div
                  key="autopsy"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        Drop Diagnosis
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">YouTube Video #42</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      "Why Everyone Is Switching to Local AI Models"
                    </div>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                      <span>Views: <b className="text-white">41.2k</b></span>
                      <span>CTR: <b className="text-amber-400">3.8% (-2.1%)</b></span>
                    </div>

                    {/* Retention Curve Visual */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-mono">
                        <span>0:00 (Hook)</span>
                        <span className="text-rose-400 font-bold">0:14 (-42% cliff)</span>
                        <span>4:00</span>
                      </div>
                      <div className="h-10 w-full bg-slate-950 rounded-lg p-1.5 flex items-end space-x-1 border border-white/[0.04]">
                        <div className="h-full w-1/6 bg-indigo-500/80 rounded-t" />
                        <div className="h-4/5 w-1/6 bg-indigo-500/70 rounded-t" />
                        <div className="h-2/5 w-1/6 bg-rose-500 rounded-t relative">
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                        </div>
                        <div className="h-1/3 w-1/6 bg-slate-800 rounded-t" />
                        <div className="h-1/4 w-1/6 bg-slate-800 rounded-t" />
                        <div className="h-1/5 w-1/6 bg-slate-800 rounded-t" />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1 text-slate-300 text-[11px]">
                    <div className="font-semibold text-indigo-300 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Causal Explanation</span>
                    </div>
                    <p className="text-slate-400 leading-snug">
                      Your opening question resolved at 0:12 before presenting high-stakes conflict. 42% of seed viewers swiped away before the demo.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: PRE-UPLOAD MONETIZATION SHIELD */}
              {activeTab === 'shield' && (
                <motion.div
                  key="shield"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Ready to Post
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Camera Roll Scan</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      draft_v3_final_export.mp4
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-slate-300 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Reused Content Policy</span>
                        </span>
                        <span className="text-emerald-400 font-mono font-bold">100% Clean</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-slate-300 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Commercial Audio Rights</span>
                        </span>
                        <span className="text-emerald-400 font-mono font-bold">Cleared</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-slate-300 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Advertiser Brand Safety</span>
                        </span>
                        <span className="text-emerald-400 font-mono font-bold">Green Tier</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-300">
                    Confidence: <b>98.4%</b>. Video complies with 2026 YouTube & TikTok partner program safety standards.
                  </div>
                </motion.div>
              )}

              {/* TAB 3: SPONSOR RADAR */}
              {activeTab === 'sponsor' && (
                <motion.div
                  key="sponsor"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Budget Confirmed
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">$2.5k - $5k Budget</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xs">
                        NV
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">NordVPN Commercial Deal</div>
                        <div className="text-[10px] text-slate-400">Verified Contact: sarah.m@nordsec.com</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-slate-300 font-mono leading-relaxed">
                      "Looking for 60s dedicated integration for Q2 developer audience. Whitelisting requested."
                    </div>

                    <button
                      onClick={handleCopyPitch}
                      className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 transition shadow-sm"
                    >
                      {copiedPitch ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Pitch Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>1-Tap Copy Pitch Template ($3,500)</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: MEDIA KIT */}
              {activeTab === 'mediakit' && (
                <motion.div
                  key="mediakit"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        Live One-Sheet
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">creators.app/m/alex</span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                        AC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-1">
                          <span>Alex Chen</span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Verified</span>
                        </div>
                        <div className="text-[10px] text-slate-400">Tech & Software Engineering • 2.4M Reach</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                        <div className="text-xs font-mono font-bold text-white">185,000</div>
                        <div className="text-[9px] text-slate-500">Avg 30d Views</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                        <div className="text-xs font-mono font-bold text-emerald-400">5.8%</div>
                        <div className="text-[9px] text-slate-500">Engagement Rate</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-[10px] text-indigo-300 flex items-center justify-between">
                      <span>Rate Card Tier 1: 60s Integration</span>
                      <span className="font-mono font-bold text-white">$3,200</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="py-2 flex items-center justify-center shrink-0">
            <div className="w-28 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
