import React from 'react';
import {
  Sparkles,
  TrendingDown,
  Brain,
  ShieldAlert,
  Briefcase,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Scissors,
  BarChart3,
  Layers,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { mockDeals, mockVideoDiagnostics, mockPlatformChanges, mockRevenueAnalytics } from '@/shared/data/mockData';

interface OverviewDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigateTab }) => {
  const activeDealsValue = mockDeals
    .filter((d) => d.stage !== 'Paid')
    .reduce((acc, d) => acc + d.dealValue, 0);

  const criticalVideo = mockVideoDiagnostics.find((v) => v.status === 'critical_drop') || mockVideoDiagnostics[0];
  const highRiskNotice = mockPlatformChanges.find((p) => p.actionRequired) || mockPlatformChanges[0];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Stat Cards */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Channel Intelligence Snapshot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Creator's Command Center</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time diagnostics, active brand deal pipeline, and algorithmic health monitor.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigateTab('rate-calculator')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition flex items-center space-x-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rate Calculator</span>
          </button>
          <button
            onClick={() => onNavigateTab('detective')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition flex items-center space-x-1.5"
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Diagnose Video Drop</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Pipeline Value */}
        <div
          onClick={() => onNavigateTab('deal-crm')}
          className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold">Active Sponsorship Deals</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono group-hover:text-amber-300 transition">
            ${activeDealsValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
            <span>4 deals in negotiation / production</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Qualified Views RPM */}
        <div
          onClick={() => onNavigateTab('revenue-analytics')}
          className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold">Qualified RPM (30d)</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono group-hover:text-emerald-300 transition">
            ${mockRevenueAnalytics.rpm.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            66% qualification rate (168.4k / 255k views)
          </div>
        </div>

        {/* Algorithm Alert */}
        <div
          onClick={() => onNavigateTab('detective')}
          className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 hover:border-rose-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <span className="font-semibold">Algorithm Velocity</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">1 Drop Alert</div>
          <div className="text-[11px] text-rose-300/80 mt-1">
            424 views on latest upload (8s cliff)
          </div>
        </div>

        {/* Platform Policy Alert */}
        <div
          onClick={() => onNavigateTab('platform-changes')}
          className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 hover:border-blue-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-blue-300 mb-2">
            <span className="font-semibold">Platform Policy Shifts</span>
            <RefreshCw className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">3 Updates</div>
          <div className="text-[11px] text-amber-300 mt-1 font-medium">
            1 requires immediate format adjustment
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Diagnostics & Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Algorithm Detective Live Case */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Drop Autopsy: "Why Did My Video Die?"
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('detective')}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1"
            >
              <span>Full Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-slate-950/80 rounded-xl border border-slate-800/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Critical Throttling
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">{criticalVideo.title}</h4>
                <div className="text-xs text-slate-400 mt-1">
                  Upload: {criticalVideo.uploadDate} • {criticalVideo.views} views (Expected: {criticalVideo.expectedViews.toLocaleString()})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <div className="text-[10px] text-slate-400 font-mono">CTR</div>
                <div className="text-sm font-bold text-rose-400 font-mono">{criticalVideo.ctr}%</div>
                <div className="text-[9px] text-slate-400">Baseline: {criticalVideo.channelAvgCtr}%</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <div className="text-[10px] text-slate-400 font-mono">0:08 Cliff</div>
                <div className="text-sm font-bold text-rose-400 font-mono">-{criticalVideo.retentionDropAt8s}%</div>
                <div className="text-[9px] text-slate-400">Left before hook</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg">
                <div className="text-[10px] text-slate-400 font-mono">24h Velocity</div>
                <div className="text-sm font-bold text-amber-400 font-mono">{criticalVideo.first24hViews} views</div>
                <div className="text-[9px] text-slate-400">Seed cohort stalled</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-xs font-semibold text-slate-200">The Causal Diagnosis:</div>
              {criticalVideo.diagnoses.slice(0, 2).map((diag, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-900/50 p-2 rounded border border-slate-800/60">
                  <span className="font-mono text-brand-400 font-bold">{i + 1}.</span>
                  <span>{diag}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
              <span className="font-medium">Recommended Test: {criticalVideo.possibleExperiments[0]}</span>
              <button
                onClick={() => onNavigateTab('detective')}
                className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-semibold text-[11px] transition"
              >
                Apply Fix
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Active Deals & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Sponsorship Pipeline */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Deal Pipeline Snapshot</span>
              </h3>
              <button
                onClick={() => onNavigateTab('deal-crm')}
                className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1"
              >
                <span>Full CRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {mockDeals.slice(0, 3).map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => onNavigateTab('deal-crm')}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{deal.brandName}</div>
                    <div className="text-[11px] text-slate-400">{deal.deliverables[0]}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">${deal.dealValue.toLocaleString()}</div>
                    <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {deal.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('sponsor-radar')}
              className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition text-center"
            >
              + Find More Brand Sponsors in Sponsor Radar
            </button>
          </div>

          {/* Platform Policy Alert Notice */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Platform Policy Warning</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-semibold">YouTube 2026</span>
            </div>
            <h4 className="text-xs font-bold text-white">{highRiskNotice.title}</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{highRiskNotice.summary}</p>
            <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-semibold">{highRiskNotice.affectedVideosCount} of your videos flagged</span>
              <button
                onClick={() => onNavigateTab('platform-changes')}
                className="text-[11px] font-bold text-amber-300 underline hover:text-amber-200"
              >
                View Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
