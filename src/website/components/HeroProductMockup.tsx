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
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProductMockupProps {
  onOpenApp: (tab?: string) => void;
}

export const HeroProductMockup: React.FC<HeroProductMockupProps> = ({ onOpenApp }) => {
  const [activeTab, setActiveTab] = useState<'detective' | 'rate' | 'safety' | 'crm'>('detective');

  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/[0.1] bg-[#0c0e14] shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden">
      {/* Subtle top edge glow reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/15 blur-3xl pointer-events-none" />

      {/* macOS Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        {/* Traffic Lights */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]/80 border border-[#1aab29]" />
          <span className="text-[11px] font-mono text-slate-500 ml-3 hidden sm:inline-block">
            creator-os // command-center.app
          </span>
        </div>

        {/* Mockup Module Switcher Pills */}
        <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          {[
            { id: 'detective', label: 'Drop Autopsy', icon: TrendingDown },
            { id: 'rate', label: 'Rate Engine', icon: DollarSign },
            { id: 'safety', label: 'Monetization Guard', icon: ShieldCheck },
            { id: 'crm', label: 'Deal CRM', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm border border-white/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline-block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Engine Active</span>
        </div>
      </div>

      {/* Main Mockup Stage */}
      <div className="p-4 sm:p-6 min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* TAB 1: ALGORITHM DETECTIVE AUTOPSY */}
          {activeTab === 'detective' && (
            <motion.div
              key="detective"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Target Video Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      Distribution Throttled
                    </span>
                    <span className="text-xs text-slate-400">YouTube Longform</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    "Why the M4 MacBook Pro is a Trap for 90% of Creators"
                  </h4>
                </div>
                <div className="flex items-center space-x-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">CTR</span>
                    <span className="font-bold text-rose-400">7.2%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">VIEWS</span>
                    <span className="font-bold text-white">42,400</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">AVD</span>
                    <span className="font-bold text-amber-400">54%</span>
                  </div>
                </div>
              </div>

              {/* Retention Curve with 0:08s Cliff Marker */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="font-mono text-[11px]">Audience Retention Curve (0:00 – 1:00)</span>
                  <span className="text-rose-400 font-mono font-bold text-[11px]">
                    -48% Cliff at 0:08s
                  </span>
                </div>
                
                {/* Visual Curve */}
                <div className="h-24 w-full bg-black/40 rounded-xl p-2.5 border border-white/[0.06] flex items-end space-x-1 relative overflow-hidden">
                  {/* Subtle 0:08s highlight strip */}
                  <div className="absolute left-[13.3%] top-0 bottom-0 w-8 bg-rose-500/10 border-x border-rose-500/30 flex items-start justify-center pt-1 pointer-events-none">
                    <span className="text-[8px] font-mono text-rose-400 font-bold">CLIFF</span>
                  </div>

                  {[88, 85, 81, 78, 42, 40, 39, 38, 37, 36, 35, 34, 34, 33, 32].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col justify-end h-full group">
                      <div
                        className={`w-full rounded-t transition-all ${
                          idx === 4
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                            : idx < 4
                            ? 'bg-indigo-500/80'
                            : 'bg-slate-700/60'
                        }`}
                        style={{ height: `${val}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Causal Diagnostic Finding */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start space-x-3 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white">Root Cause: 5-Second Context Lag Before Proof</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Host repeated the title statement verbally instead of cutting immediately to thermal benchmarks. Casual test viewers dropped before the hook resolved.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: RATE ENGINE */}
          {activeTab === 'rate' && (
            <motion.div
              key="rate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    Commercial Deal Valuation
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    Multi-Factor Rate Card (50k Audience Baseline)
                  </h4>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-500 block">TOTAL DEAL VALUE</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-teal-300">$3,450</span>
                </div>
              </div>

              {/* Stacked Waterfall Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-slate-400 block text-[10px]">Base Production</span>
                  <span className="font-mono text-base font-bold text-white mt-0.5 block">$1,400</span>
                  <span className="text-[10px] text-slate-500">Filming & Editing</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-teal-500/30 bg-teal-500/[0.03]">
                  <span className="text-teal-400 block text-[10px] font-semibold">Paid Whitelisting (30d)</span>
                  <span className="font-mono text-base font-bold text-teal-300 mt-0.5 block">+$850</span>
                  <span className="text-[10px] text-slate-400">+35% ad usage right</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-indigo-500/30 bg-indigo-500/[0.03]">
                  <span className="text-indigo-300 block text-[10px] font-semibold">Exclusivity (60d)</span>
                  <span className="font-mono text-base font-bold text-indigo-300 mt-0.5 block">+$1,200</span>
                  <span className="text-[10px] text-slate-400">Category lockout</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200">
                <span className="font-bold text-teal-300">Recaptured Revenue Opportunity: </span>
                Standard flat-rate sponsorship would have paid $600. Creator's commercial rights engine recaptured <strong className="text-white">+$2,850</strong> for this single deliverable.
              </div>
            </motion.div>
          )}

          {/* TAB 3: MONETIZATION GUARD */}
          {activeTab === 'safety' && (
            <motion.div
              key="safety"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Pre-Upload Scanner
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    YouTube 2026 Reused Content Compliance
                  </h4>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-500 block">SAFETY SCORE</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">96 / 100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Original Narration Ratio: 92%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Exceeds minimum 60% threshold for original commentary.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Max Third-Party Segment: 18s</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Safely below the 40+ second continuous reuse strike trigger.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 font-mono text-[10px] block">PRE-FLIGHT RECOMMENDATION</span>
                Video is certified clean for monetization upload. Zero automated copyright or template flags detected.
              </div>
            </motion.div>
          )}

          {/* TAB 4: DEAL CRM */}
          {activeTab === 'crm' && (
            <motion.div
              key="crm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Sponsorship Pipeline
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    Active Deals & Invoicing Kanban
                  </h4>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-500 block">PIPELINE VALUE</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-amber-300">$10,450</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Pitched</span>
                  <div className="font-bold text-white">Notion ($3,200)</div>
                  <span className="text-[10px] text-slate-400 block">60s Tech Integration</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Contract Sent</span>
                  <div className="font-bold text-amber-300">NordVPN ($2,850)</div>
                  <span className="text-[10px] text-slate-400 block">Includes 30d Ads</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Paid & Completed</span>
                  <div className="font-bold text-emerald-400">Epidemic ($4,400)</div>
                  <span className="text-[10px] text-slate-400 block">Invoice #INV-2026-04</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>Automated PDF Invoices & Deal Reminders sync directly to private database.</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Paid on time
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mockup Footer Action */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 text-[11px]">
            Click the tabs above to explore each intelligence engine • Ground truth data modeling
          </span>
          <button
            onClick={() => onOpenApp(activeTab)}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center space-x-1.5 hover:bg-slate-200 transition shadow-sm"
          >
            <span>Launch This Module in Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
