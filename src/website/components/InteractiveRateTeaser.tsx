import React, { useState, useEffect, useRef } from 'react';
import { Calculator, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { calculateCreatorDealRate } from '@/shared/domain/rateCalculatorEngine';
import { RollingNumber } from '@/shared/components/motion/RollingNumber';

export const InteractiveRateTeaser: React.FC<{ onOpenFullApp?: () => void }> = ({ onOpenFullApp }) => {
  const [avgViews, setAvgViews] = useState<number>(42000);
  const [contentType, setContentType] = useState<'integration_60s' | 'dedicated_video' | 'ugc_ad'>('integration_60s');
  const [brandCanRepost, setBrandCanRepost] = useState<boolean>(true);
  const [paidAdvertisingRights, setPaidAdvertisingRights] = useState<boolean>(true);
  const [exclusivityDays, setExclusivityDays] = useState<number>(30);

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
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch {
        // gracefully ignore if canvas context is unavailable
      }
    }
    prevPriceRef.current = result.recommendedPrice;
  }, [result.recommendedPrice]);

  // Waterfall Bar percentages
  const total = Math.max(1, result.recommendedPrice);
  const baseCreationPct = Math.round((result.breakdown.baseCreationFee / total) * 100);
  const audiencePct = Math.round((result.breakdown.audienceAccessFee / total) * 100);
  const paidUsagePct = Math.round((result.breakdown.paidUsageMarkup / total) * 100);
  const exclusivityPct = Math.round((result.breakdown.exclusivityPremium / total) * 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            Live Deal & Rate Calculator
          </span>
          <h3 className="text-xl font-bold text-white mt-1">Not just: "50k followers = $500"</h3>
          <p className="text-xs text-slate-400">
            Calculate real commercial value: Usage Rights + Paid Ads + Exclusivity + Views
          </p>
        </div>
        <div className="text-left sm:text-right bg-slate-950/70 p-3 sm:p-0 rounded-xl sm:bg-transparent border sm:border-0 border-slate-800">
          <div className="text-xs text-slate-400 flex items-center sm:justify-end space-x-1.5">
            <span>Recommended Quote</span>
            {result.recommendedPrice >= 5000 && (
              <span className="inline-flex items-center text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                <Trophy className="w-3 h-3 mr-0.5" /> High-Tier Deal
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
            <RollingNumber value={result.recommendedPrice} prefix="$" />
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center sm:justify-end space-x-1">
            <span>Range:</span>
            <RollingNumber value={result.minPrice} prefix="$" />
            <span>–</span>
            <RollingNumber value={result.maxPrice} prefix="$" />
          </div>
        </div>
      </div>

      {/* Live Waterfall Bar */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Live Dynamic Stack Waterfall</span>
          <span className="font-mono text-[11px] text-emerald-400">
            100% transparent fee composition
          </span>
        </div>
        <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800 p-0.5 space-x-0.5">
          <motion.div
            title={`Base Production: $${result.breakdown.baseCreationFee}`}
            className="h-full bg-slate-600 rounded-l-full"
            animate={{ width: `${baseCreationPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <motion.div
            title={`Audience Reach: $${result.breakdown.audienceAccessFee}`}
            className="h-full bg-brand-500"
            animate={{ width: `${audiencePct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          {paidAdvertisingRights && (
            <motion.div
              title={`Paid Ad Rights: +$${result.breakdown.paidUsageMarkup}`}
              className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              animate={{ width: `${paidUsagePct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          )}
          {exclusivityDays > 0 && (
            <motion.div
              title={`Exclusivity: +$${result.breakdown.exclusivityPremium}`}
              className="h-full bg-amber-400 rounded-r-full shadow-[0_0_8px_rgba(251,191,36,0.5)]"
              animate={{ width: `${exclusivityPct}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 pt-0.5 font-mono">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
            <span>Production ({baseCreationPct}%)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-brand-500 inline-block" />
            <span>Audience ({audiencePct}%)</span>
          </span>
          {paidAdvertisingRights && (
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Paid Whitelisting ({paidUsagePct}%)</span>
            </span>
          )}
          {exclusivityDays > 0 && (
            <span className="flex items-center space-x-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>Exclusivity ({exclusivityPct}%)</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1.5">
              <span>Your Average Views:</span>
              <RollingNumber
                value={avgViews}
                suffix=" views"
                className="text-brand-400 font-mono font-bold"
              />
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={avgViews}
              onChange={(e) => setAvgViews(Number(e.target.value))}
              className="w-full accent-brand-500 bg-slate-800 h-2 rounded-lg cursor-pointer transition"
            />
            {/* Quick preset buttons */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
              <div className="space-x-1">
                {[15000, 42000, 85000, 150000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAvgViews(preset)}
                    className={`px-2 py-0.5 rounded border transition ${
                      avgViews === preset
                        ? 'border-brand-500 bg-brand-500/20 text-brand-300 font-bold'
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    {preset / 1000}k
                  </button>
                ))}
              </div>
              <span className="text-slate-500">Max: 250k</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Deliverable Format:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'integration_60s', label: '60s Integration' },
                { id: 'dedicated_video', label: 'Dedicated Video' },
                { id: 'ugc_ad', label: 'UGC Ad for Brand' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setContentType(fmt.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                    contentType === fmt.id
                      ? 'border-brand-500 bg-brand-500/20 text-white shadow-sm ring-1 ring-brand-500/30 font-semibold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Commercial Rights:
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 cursor-pointer hover:border-slate-700 transition">
              <div className="flex items-center space-x-2.5">
                <input
                  type="checkbox"
                  checked={paidAdvertisingRights}
                  onChange={(e) => setPaidAdvertisingRights(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-800 border-slate-700"
                />
                <div>
                  <div className="text-xs font-semibold text-white">Paid Whitelisting / Ad Usage</div>
                  <div className="text-[11px] text-slate-400">Brand puts ad spend behind your video</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">+40% value</span>
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-900/50 cursor-pointer hover:border-slate-700 transition">
              <div className="flex items-center space-x-2.5">
                <input
                  type="checkbox"
                  checked={brandCanRepost}
                  onChange={(e) => setBrandCanRepost(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4 bg-slate-800 border-slate-700"
                />
                <div>
                  <div className="text-xs font-semibold text-white">Organic Brand Reposting</div>
                  <div className="text-[11px] text-slate-400">Can reshare to their organic feed</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">+15%</span>
            </label>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">Exclusivity Lockout:</span>
              <div className="flex items-center space-x-1.5">
                {[0, 30, 60].map((days) => (
                  <button
                    key={days}
                    onClick={() => setExclusivityDays(days)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                      exclusivityDays === days
                        ? 'border-brand-500 bg-brand-500/20 text-brand-300 font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {days === 0 ? 'None' : `${days}d`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Commercial Breakdown Explanation */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Why This Price?</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Audited Formula
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Base Production & Creation:</span>
                <RollingNumber
                  value={result.breakdown.baseCreationFee}
                  prefix="$"
                  className="font-mono text-white font-semibold"
                />
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Audience Reach ({avgViews.toLocaleString()} views):</span>
                <RollingNumber
                  value={result.breakdown.audienceAccessFee}
                  prefix="$"
                  className="font-mono text-white font-semibold"
                />
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Paid Ad / Whitelisting Rights:</span>
                <RollingNumber
                  value={result.breakdown.paidUsageMarkup}
                  prefix="+$"
                  className="font-mono text-emerald-400 font-semibold"
                />
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Category Exclusivity ({exclusivityDays}d):</span>
                <RollingNumber
                  value={result.breakdown.exclusivityPremium}
                  prefix="+$"
                  className="font-mono text-amber-300 font-semibold"
                />
              </div>
            </div>

            <div className="bg-brand-950/40 border border-brand-800/40 rounded-lg p-3 text-[11px] text-brand-200 leading-relaxed space-y-1.5">
              <div className="font-semibold text-brand-300 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-brand-400" />
                Negotiation Counter-Clause:
              </div>
              <p>
                "Our rate accounts for both audience distribution and the high-performing asset licensing requested. If your campaign does not require 30-day paid ad whitelisting, we can adjust the package by -${result.breakdown.paidUsageMarkup}."
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFullApp}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/20 transition transform hover:-translate-y-0.5"
          >
            <span>Generate Pitch & Add to Deal Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
