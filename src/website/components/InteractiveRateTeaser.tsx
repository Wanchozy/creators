import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  DollarSign,
  Sparkles,
  Trophy,
  Copy,
  Check,
  Zap,
  Layers,
  Sliders
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { calculateCreatorDealRate } from '@/shared/domain/rateCalculatorEngine';
import { RollingNumber } from '@/shared/components/motion/RollingNumber';

export const InteractiveRateTeaser: React.FC<{ onOpenFullApp?: () => void }> = ({ onOpenFullApp }) => {
  const [avgViews, setAvgViews] = useState<number>(45000);
  const [contentType, setContentType] = useState<'integration_60s' | 'dedicated_video' | 'ugc_ad'>('integration_60s');
  const [brandCanRepost, setBrandCanRepost] = useState<boolean>(true);
  const [paidAdvertisingRights, setPaidAdvertisingRights] = useState<boolean>(true);
  const [exclusivityDays, setExclusivityDays] = useState<number>(30);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const prevPriceRef = useRef<number>(0);

  const result = calculateCreatorDealRate({
    platform: 'youtube',
    contentType,
    avgViews,
    creatorFollowers: 50000,
    category: 'tech',
    brandCanRepost,
    paidAdvertisingRights,
    exclusivityDays,
    licensingMonths: 1,
    turnaroundRush: false,
  });

  // Confetti celebration when surpassing $5,000 high-value milestone
  useEffect(() => {
    if (result.recommendedPrice >= 5000 && prevPriceRef.current < 5000 && prevPriceRef.current > 0) {
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#38bdf8'],
        });
      } catch {
        // ignore
      }
    }
    prevPriceRef.current = result.recommendedPrice;
  }, [result.recommendedPrice]);

  const handleCopyClause = () => {
    const clauseText = `Our quoted rate of $${result.recommendedPrice.toLocaleString()} accounts for both audience access and the commercial licensing requested. If your campaign does not require 30-day paid ad whitelisting rights, we can adjust the package by -$${result.breakdown.paidUsageMarkup.toLocaleString()}.`;
    navigator.clipboard.writeText(clauseText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  // Waterfall Bar percentages
  const total = Math.max(1, result.recommendedPrice);
  const baseCreationPct = Math.round((result.breakdown.baseCreationFee / total) * 100);
  const audiencePct = Math.round((result.breakdown.audienceAccessFee / total) * 100);
  const paidUsagePct = Math.round((result.breakdown.paidUsageMarkup / total) * 100);
  const exclusivityPct = Math.round((result.breakdown.exclusivityPremium / total) * 100);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Subtle top edge illumination */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute -top-24 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-5 border-b border-white/[0.06] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-wider">
              Commercial Deal Valuation Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 tracking-tight">
            Not just "50k followers = $500"
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Prices actual commercial value: Base Production + Audience CPM + Paid Ad Rights + Lockouts.
          </p>
        </div>

        {/* Real-Time Recommended Quote Display */}
        <div className="text-left sm:text-right bg-white/[0.02] sm:bg-transparent p-4 sm:p-0 rounded-xl border sm:border-0 border-white/[0.06]">
          <div className="text-xs text-slate-400 flex items-center sm:justify-end space-x-1.5">
            <span>Recommended Deal Quote</span>
            {result.recommendedPrice >= 5000 && (
              <span className="inline-flex items-center text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                <Trophy className="w-3 h-3 mr-1 text-amber-400" /> High-Tier
              </span>
            )}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-white font-mono tracking-tight my-0.5">
            <RollingNumber value={result.recommendedPrice} prefix="$" />
          </div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center sm:justify-end space-x-1">
            <span>Market Range:</span>
            <RollingNumber value={result.minPrice} prefix="$" />
            <span>–</span>
            <RollingNumber value={result.maxPrice} prefix="$" />
          </div>
        </div>
      </div>

      {/* Live Waterfall Composition Bar */}
      <div className="mb-8 p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300">Audited Fee Stack Breakdown</span>
          <span className="font-mono text-[11px] text-teal-400">100% itemized transparency</span>
        </div>

        {/* Stacked Bar */}
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 space-x-0.5 border border-white/[0.04]">
          <motion.div
            title={`Base Production: $${result.breakdown.baseCreationFee}`}
            className="h-full bg-slate-600 rounded-l-full"
            animate={{ width: `${baseCreationPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <motion.div
            title={`Audience Reach: $${result.breakdown.audienceAccessFee}`}
            className="h-full bg-indigo-500"
            animate={{ width: `${audiencePct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          {paidAdvertisingRights && (
            <motion.div
              title={`Paid Whitelisting: +$${result.breakdown.paidUsageMarkup}`}
              className="h-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]"
              animate={{ width: `${paidUsagePct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          )}
          {exclusivityDays > 0 && (
            <motion.div
              title={`Category Exclusivity: +$${result.breakdown.exclusivityPremium}`}
              className="h-full bg-amber-400 rounded-r-full shadow-[0_0_8px_rgba(251,191,36,0.5)]"
              animate={{ width: `${exclusivityPct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
            <span>Base Production (${result.breakdown.baseCreationFee})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            <span>Audience Access (${result.breakdown.audienceAccessFee})</span>
          </div>
          {paidAdvertisingRights && (
            <div className="flex items-center space-x-1.5 text-teal-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
              <span>Paid Whitelisting (+${result.breakdown.paidUsageMarkup})</span>
            </div>
          )}
          {exclusivityDays > 0 && (
            <div className="flex items-center space-x-1.5 text-amber-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>{exclusivityDays}d Lockout (+${result.breakdown.exclusivityPremium})</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Controls & Negotiation Clause */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider with Quick Presets */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Average Video Views</span>
              <RollingNumber
                value={avgViews}
                suffix=" views"
                className="text-teal-300 font-mono font-bold"
              />
            </div>
            
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={avgViews}
              onChange={(e) => setAvgViews(Number(e.target.value))}
              className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="flex space-x-1.5">
                {[15000, 45000, 100000, 200000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAvgViews(preset)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition ${
                      avgViews === preset
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {preset / 1000}k
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-mono text-slate-500">Max: 250k</span>
            </div>
          </div>

          {/* Deliverable Format Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Deliverable Format</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'integration_60s', label: '60s Integration' },
                { id: 'dedicated_video', label: 'Dedicated Video' },
                { id: 'ugc_ad', label: 'Brand UGC Ad' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setContentType(fmt.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition ${
                    contentType === fmt.id
                      ? 'border-teal-500/60 bg-teal-500/10 text-white font-semibold shadow-sm'
                      : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Commercial Rights Switches */}
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
              Commercial Licensing Clauses
            </label>

            {/* Whitelisting */}
            <div
              onClick={() => setPaidAdvertisingRights(!paidAdvertisingRights)}
              className={`cursor-pointer p-3 rounded-xl border transition flex items-center justify-between ${
                paidAdvertisingRights
                  ? 'border-teal-500/40 bg-teal-500/[0.06]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-white">Paid Whitelisting Rights (30d)</div>
                <div className="text-[11px] text-slate-400">Brand runs Meta/TikTok paid ads behind your handle</div>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                paidAdvertisingRights ? 'bg-teal-500/20 text-teal-300' : 'text-slate-500'
              }`}>
                +35% value
              </span>
            </div>

            {/* Organic Repost */}
            <div
              onClick={() => setBrandCanRepost(!brandCanRepost)}
              className={`cursor-pointer p-3 rounded-xl border transition flex items-center justify-between ${
                brandCanRepost
                  ? 'border-teal-500/40 bg-teal-500/[0.06]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-white">Organic Brand Reposting</div>
                <div className="text-[11px] text-slate-400">Can reshare video to their official brand channel</div>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                brandCanRepost ? 'bg-teal-500/20 text-teal-300' : 'text-slate-500'
              }`}>
                +15%
              </span>
            </div>

            {/* Exclusivity Lockout */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">Category Exclusivity Window:</span>
              <div className="flex items-center space-x-1.5">
                {[0, 30, 60].map((days) => (
                  <button
                    key={days}
                    onClick={() => setExclusivityDays(days)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition ${
                      exclusivityDays === days
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                        : 'border border-white/[0.06] text-slate-400 hover:text-white bg-white/[0.02]'
                    }`}
                  >
                    {days === 0 ? 'None' : `${days} days`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Negotiation Counter-Clause & Direct App Handoff */}
        <div className="lg:col-span-6 bg-white/[0.02] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Audited Negotiation Clause</span>
              </span>
              <button
                onClick={handleCopyClause}
                className="px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-[11px] text-slate-300 flex items-center space-x-1.5 transition font-mono"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Clause</span>
                  </>
                )}
              </button>
            </div>

            {/* Negotiation Script Card */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs text-slate-300 leading-relaxed space-y-2">
              <p className="text-slate-200">
                "Our quoted rate of <strong className="text-teal-300">${result.recommendedPrice.toLocaleString()}</strong> accounts for both audience reach and the commercial asset licensing requested.
              </p>
              {paidAdvertisingRights && (
                <p className="text-slate-400 text-[11px]">
                  If your brand does not require 30-day paid ad whitelisting rights, we can adjust the package down by <span className="text-teal-400 font-semibold">-${result.breakdown.paidUsageMarkup.toLocaleString()}</span>."
                </p>
              )}
            </div>

            {/* Opportunity Recaptured Callout */}
            <div className="p-3.5 rounded-xl bg-teal-500/[0.06] border border-teal-500/20 text-xs text-teal-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Recaptured Deal Opportunity</span>
                <span className="text-[11px] text-teal-300/90">Naive follower flat fee would have paid ~$600.</span>
              </div>
              <span className="font-mono text-base font-extrabold text-teal-300">
                +${Math.max(400, result.recommendedPrice - 600).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={onOpenFullApp}
            className="w-full h-11 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-teal-500/10"
          >
            <span>Generate Pitch & Push to Sponsorship CRM</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
