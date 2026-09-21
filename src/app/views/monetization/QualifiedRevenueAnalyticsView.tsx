import React from 'react';
import {
  BarChart3,
  ArrowDown,
  DollarSign,
  Info,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { mockRevenueAnalytics } from '@/shared/data/mockData';

export const QualifiedRevenueAnalyticsView: React.FC = () => {
  const data = mockRevenueAnalytics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Problem #9: "Views aren't the same as money"</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Qualified Views & RPM Demystifier</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Demystifies TikTok Creator Rewards & YouTube Shorts revenue: 255k views ≠ 255k monetizable views. Explains <em>why</em> your RPM moved.
        </p>
      </div>

      {/* The Visual Waterfall (Directly from Document page 11) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              The Monetization Eligibility Waterfall
            </h3>
            <p className="text-xs text-slate-400">{data.timeframe}</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
            {data.qualificationRatePercent}% Qualification Ratio
          </span>
        </div>

        {/* Step-by-Step Waterfall */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1: Total Views */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 1</span>
              <div className="text-xs text-slate-400 font-semibold mt-1">Total Raw Views</div>
              <div className="text-2xl font-extrabold text-white font-mono mt-2">
                {data.totalViews.toLocaleString()}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              All impressions across For You & profile feeds.
            </div>
          </div>

          {/* Step 2: Qualified Views */}
          <div className="p-5 rounded-xl border border-brand-500/40 bg-brand-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Step 2: Eligibility</span>
                <span className="text-[10px] text-rose-400 font-mono">-86.6k dropped</span>
              </div>
              <div className="text-xs text-brand-300 font-semibold mt-1">Qualified Views</div>
              <div className="text-2xl font-extrabold text-brand-200 font-mono mt-2">
                {data.qualifiedViews.toLocaleString()}
              </div>
            </div>
            <div className="text-[11px] text-brand-300/80 mt-3 pt-2 border-t border-brand-500/20">
              Satisfied minimum 5-second watch duration.
            </div>
          </div>

          {/* Step 3: Effective RPM */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 3</span>
              <div className="text-xs text-slate-400 font-semibold mt-1">Reward Per 1k (RPM)</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-2">
                ${data.rpm.toFixed(2)}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              Earned per 1,000 qualified views.
            </div>
          </div>

          {/* Step 4: Estimated Payout */}
          <div className="p-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Final Payout</span>
              <div className="text-xs text-emerald-300 font-semibold mt-1">Estimated Reward</div>
              <div className="text-2xl font-extrabold text-white font-mono mt-2">
                ${data.estimatedEarnings.toFixed(2)}
              </div>
            </div>
            <div className="text-[11px] text-emerald-300 mt-3 pt-2 border-t border-emerald-500/20 font-mono">
              (168.4k × $1.62) = $274.37
            </div>
          </div>
        </div>

        {/* Disqualification Dissection */}
        <div className="pt-4 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Why Did 86,600 Views Not Qualify For Payment?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Watched &lt; 5 Seconds:</span>
              <span className="text-rose-400 font-mono font-bold text-sm">
                {data.disqualificationBreakdown.under5Seconds.toLocaleString()} views
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Quick swipe-away penalty</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Duplicate Loop Views:</span>
              <span className="text-amber-400 font-mono font-bold text-sm">
                {data.disqualificationBreakdown.duplicateRepeat.toLocaleString()} views
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Same user repeated loops</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Commercial Audio Claims:</span>
              <span className="text-amber-400 font-mono font-bold text-sm">
                {data.disqualificationBreakdown.commercialNonEligible.toLocaleString()} views
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Third-party sound license</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">Unsupported Region:</span>
              <span className="text-slate-400 font-mono font-bold text-sm">
                {data.disqualificationBreakdown.unsupportedRegion.toLocaleString()} views
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Non-rewards territory</span>
            </div>
          </div>
        </div>
      </div>

      {/* What Caused Your RPM To Change? (Document Page 12) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>"What Caused Your RPM To Change?"</span>
          </h3>
          <span className="text-xs text-slate-400">Current RPM: ${data.rpm.toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.rpmDrivers.map((driver, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border flex items-start space-x-3 ${
                driver.impact === 'positive'
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : 'border-rose-500/30 bg-rose-950/10'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  driver.impact === 'positive'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {driver.impact === 'positive' ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">{driver.factor}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{driver.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
