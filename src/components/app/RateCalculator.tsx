import React, { useState } from 'react';
import {
  DollarSign,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileCheck,
  ArrowRight,
  Info
} from 'lucide-react';
import { calculateCreatorDealRate } from '../../services/calculatorEngine';
import { RateCalculationInput } from '../../types';

export const RateCalculator: React.FC<{ onSendToCRM?: (brandName: string, amount: number) => void }> = ({ onSendToCRM }) => {
  const [params, setParams] = useState<RateCalculationInput>({
    platform: 'youtube',
    contentType: 'integration_60s',
    avgViews: 42000,
    creatorFollowers: 50000,
    category: 'Tech & Productivity',
    brandCanRepost: true,
    paidAdvertisingRights: true,
    exclusivityDays: 30,
    licensingMonths: 1,
    turnaroundRush: false
  });

  const [dealBrandName, setDealBrandName] = useState<string>('Prospective Sponsor');
  const result = calculateCreatorDealRate(params);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 mb-1">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Problem #5: "What should I charge?"</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Creator Rate & Commercial Deal Calculator</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          "It becomes a deal calculator, not just an influencer calculator." Factoring in creation labor, audience CPM, paid ad whitelisting, and competitor exclusivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Interactive Variable Controls */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-teal-400" />
              <span>Deal Parameters & Commercial Rights</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real Deliverable Specs</span>
          </div>

          <div className="space-y-4">
            {/* Platform & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Platform:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['youtube', 'tiktok', 'instagram'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setParams({ ...params, platform: p })}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium capitalize border transition ${
                        params.platform === p
                          ? 'border-brand-500 bg-brand-500/20 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Content Niche:</label>
                <select
                  value={params.category}
                  onChange={(e) => setParams({ ...params, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Tech & Productivity">Tech & Productivity ($25-$35 CPM)</option>
                  <option value="Fintech & Business">Fintech & Business ($35+ CPM)</option>
                  <option value="Gaming & Entertainment">Gaming ($18 CPM)</option>
                  <option value="Lifestyle & Vlog">Lifestyle ($20 CPM)</option>
                </select>
              </div>
            </div>

            {/* Deliverable Format */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Deliverable Format:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'integration_60s', label: '60s Integration' },
                  { id: 'dedicated_video', label: 'Dedicated 5-7m' },
                  { id: 'ugc_ad', label: 'UGC for Brand Ad' },
                  { id: 'short_form', label: 'Shorts / Reel' }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setParams({ ...params, contentType: d.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-center transition ${
                      params.contentType === d.id
                        ? 'border-teal-500 bg-teal-500/20 text-teal-200 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {params.contentType === 'ugc_ad'
                  ? 'UGC videos posted to brand accounts require licensing premiums since creator channel does not gain organic followers.'
                  : 'Channel integrations leverage your authentic audience trust.'}
              </p>
            </div>

            {/* Average Views Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Average 30-Day Views:
                </label>
                <span className="text-sm font-mono font-bold text-teal-400">
                  {params.avgViews.toLocaleString()} avg views
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="5000"
                value={params.avgViews}
                onChange={(e) => setParams({ ...params, avgViews: Number(e.target.value) })}
                className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5,000 views</span>
                <span>42,000 views (Doc example)</span>
                <span>250,000 views</span>
              </div>
            </div>

            {/* Commercial Rights Section */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Usage Rights & Licensing Toggles:
              </label>

              {/* Paid Ad Rights / Whitelisting */}
              <div
                onClick={() => setParams({ ...params, paidAdvertisingRights: !params.paidAdvertisingRights })}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  params.paidAdvertisingRights
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={params.paidAdvertisingRights}
                    onChange={() => {}}
                    className="rounded text-teal-500 bg-slate-800 border-slate-700 h-4 w-4"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Paid Advertising Rights / Whitelisting</div>
                    <div className="text-[11px] text-slate-400">
                      Brand puts their own advertising budget behind your video/face on Meta or TikTok Ads
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">+40% per 30d</span>
              </div>

              {/* Brand Reposting */}
              <div
                onClick={() => setParams({ ...params, brandCanRepost: !params.brandCanRepost })}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  params.brandCanRepost
                    ? 'border-teal-500/50 bg-teal-500/10'
                    : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={params.brandCanRepost}
                    onChange={() => {}}
                    className="rounded text-teal-500 bg-slate-800 border-slate-700 h-4 w-4"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Organic Brand Reposting Rights</div>
                    <div className="text-[11px] text-slate-400">
                      Brand can re-upload to their company social channels organically
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-teal-400">+15%</span>
              </div>

              {/* Exclusivity Duration */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/70 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Category Exclusivity Window:</div>
                  <div className="text-[11px] text-slate-400">
                    You agree not to work with category competitors for this duration
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  {[0, 30, 60, 90].map((d) => (
                    <button
                      key={d}
                      onClick={() => setParams({ ...params, exclusivityDays: d })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                        params.exclusivityDays === d
                          ? 'border-teal-500 bg-teal-500/20 text-teal-300'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {d === 0 ? 'None' : `${d}d`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: The Quote & Why */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-teal-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-6 shadow-2xl">
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                  Commercial Valuation
                </span>
                <div className="text-xs text-slate-400">Recommended Pitch Price</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-white font-mono">
                  ${result.recommendedPrice.toLocaleString()}
                </div>
                <div className="text-[11px] text-teal-400 font-mono">
                  Fair Range: ${result.minPrice.toLocaleString()} – ${result.maxPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Why Breakdown */}
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Why: The Deal Anatomy
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Base Creation & Production:</span>
                  <span className="font-mono font-bold text-white">${result.breakdown.baseCreationFee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Audience Access ({params.avgViews.toLocaleString()} views):</span>
                  <span className="font-mono font-bold text-white">${result.breakdown.audienceAccessFee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Paid Advertising / Whitelisting:</span>
                  <span className="font-mono font-bold text-emerald-400">+${result.breakdown.paidUsageMarkup}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Category Exclusivity ({params.exclusivityDays}d):</span>
                  <span className="font-mono font-bold text-emerald-400">+${result.breakdown.exclusivityPremium}</span>
                </div>
              </div>
            </div>

            {/* Creator Negotiation Script */}
            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-teal-200 leading-relaxed">
              <span className="font-bold text-teal-300 block mb-1">Negotiation Shield:</span>
              "If the brand pushes back on price, do not drop your fee—drop a right! E.g. Remove the 30-day paid advertising rights to reduce the total to ${(result.recommendedPrice - result.breakdown.paidUsageMarkup).toLocaleString()}."
            </div>

            {/* Export / Add to CRM */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter Brand Name (e.g. Nike, Brand X)"
                  value={dealBrandName}
                  onChange={(e) => setDealBrandName(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <button
                onClick={() => {
                  if (onSendToCRM) {
                    onSendToCRM(dealBrandName, result.recommendedPrice);
                  }
                  alert(`Added ${dealBrandName} ($${result.recommendedPrice.toLocaleString()}) to Sponsorship CRM Pipeline!`);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-600 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 transition"
              >
                <FileCheck className="w-4 h-4" />
                <span>Save Quote & Push Deal to CRM Pipeline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
