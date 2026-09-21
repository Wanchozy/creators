import React, { useState } from 'react';
import { Calculator, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import { calculateCreatorDealRate } from '../../services/calculatorEngine';

export const InteractiveRateTeaser: React.FC<{ onOpenFullApp?: () => void }> = ({ onOpenFullApp }) => {
  const [avgViews, setAvgViews] = useState<number>(42000);
  const [contentType, setContentType] = useState<'integration_60s' | 'dedicated_video' | 'ugc_ad'>('integration_60s');
  const [brandCanRepost, setBrandCanRepost] = useState<boolean>(true);
  const [paidAdvertisingRights, setPaidAdvertisingRights] = useState<boolean>(true);
  const [exclusivityDays, setExclusivityDays] = useState<number>(30);

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
    turnaroundRush: false
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
            <Calculator className="w-3.5 h-3.5 mr-1" />
            Live Deal & Rate Calculator
          </span>
          <h3 className="text-xl font-bold text-white mt-1">Not just: "50k followers = $500"</h3>
          <p className="text-xs text-slate-400">Calculate real commercial value: Usage Rights + Paid Ads + Exclusivity + Views</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Recommended Quote</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono">
            ${result.recommendedPrice.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Range: ${result.minPrice.toLocaleString()} – ${result.maxPrice.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex justify-between">
              <span>Your Average Views:</span>
              <span className="text-brand-400 font-mono font-bold">{avgViews.toLocaleString()} views</span>
            </label>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={avgViews}
              onChange={(e) => setAvgViews(Number(e.target.value))}
              className="w-full accent-brand-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>5k views</span>
              <span>100k views</span>
              <span>250k views</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Deliverable Format:</label>
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
                      ? 'border-brand-500 bg-brand-500/10 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Commercial Rights:</label>
            
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
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                      exclusivityDays === days
                        ? 'border-brand-500 bg-brand-500/20 text-brand-300'
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
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Audited Commercial Formula
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Base Production & Creation:</span>
                <span className="font-mono text-white font-semibold">${result.breakdown.baseCreationFee}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Audience Reach ({avgViews.toLocaleString()} views):</span>
                <span className="font-mono text-white font-semibold">${result.breakdown.audienceAccessFee}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Paid Ad / Whitelisting Rights:</span>
                <span className="font-mono text-emerald-400 font-semibold">+${result.breakdown.paidUsageMarkup}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-800/60 text-slate-300">
                <span>Category Exclusivity ({exclusivityDays}d):</span>
                <span className="font-mono text-emerald-400 font-semibold">+${result.breakdown.exclusivityPremium}</span>
              </div>
            </div>

            <div className="bg-brand-950/40 border border-brand-800/40 rounded-lg p-3 text-[11px] text-brand-200 leading-relaxed space-y-1.5">
              <div className="font-semibold text-brand-300 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-brand-400" />
                Negotiation Script:
              </div>
              <p>
                "Our rate accounts for both audience distribution and the high-performing asset licensing requested. If your campaign does not need 30-day paid ad whitelisting, we can adjust by -${result.breakdown.paidUsageMarkup}."
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFullApp}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/20 transition"
          >
            <span>Generate Pitch & Add to Deal Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
