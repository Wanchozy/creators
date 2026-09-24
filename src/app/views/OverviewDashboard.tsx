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
  Calendar,
  ShieldCheck,
  Activity,
  Play
} from 'lucide-react';
import { mockDeals, mockVideoDiagnostics, mockPlatformChanges, mockRevenueAnalytics } from '@/shared/data/mockData';
import { useDeals } from '@/shared/hooks/useDeals';
import { useDiagnostics } from '@/shared/hooks/useDiagnostics';
import { useProfile } from '@/shared/hooks/useProfile';
import { useRateQuotes } from '@/shared/hooks/useRateQuotes';
import { useCopycats } from '@/shared/hooks/useCopycats';
import { RollingNumber, SurfaceCard } from '@/shared/components/motion';

interface OverviewDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigateTab }) => {
  const { profile } = useProfile();
  const { deals } = useDeals();
  const { diagnostics } = useDiagnostics();
  const { quotes } = useRateQuotes();
  const { alerts } = useCopycats();

  const dealsList = deals.length > 0 ? deals : mockDeals;
  const activeDeals = dealsList.filter((d) => d.stage !== 'Paid');
  const activeDealsValue = activeDeals.reduce((acc, d) => acc + d.dealValue, 0);

  const videoList = diagnostics.length > 0 ? diagnostics : mockVideoDiagnostics;
  const criticalVideo = videoList.find((v) => v.status === 'critical_drop') || videoList[0];
  const highRiskNotice = mockPlatformChanges.find((p) => p.actionRequired) || mockPlatformChanges[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Quick Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-semibold text-slate-200 uppercase tracking-wider">
              {profile.channelName || 'Creator Studio'}
            </span>
            <span className="text-slate-600">•</span>
            <span className="capitalize">{profile.persona?.replace('_', ' ') || 'Solo Creator'}</span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-400">{(profile.subscriberCount || 50000).toLocaleString()} audience baseline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Creator Intelligence Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time causal drop diagnostics, active commercial rate valuations, and algorithmic health.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigateTab('rate-calculator')}
            className="h-10 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 transition flex items-center space-x-2"
          >
            <DollarSign className="w-3.5 h-3.5 text-teal-400" />
            <span>Rate Calculator ({quotes.length})</span>
          </button>
          <button
            onClick={() => onNavigateTab('detective')}
            className="h-10 px-4 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-950 transition flex items-center space-x-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <TrendingDown className="w-3.5 h-3.5 text-slate-950" />
            <span>Run Drop Autopsy</span>
          </button>
        </div>
      </div>

      {/* 4 Linear-Style KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Pipeline Value */}
        <SurfaceCard
          onClick={() => onNavigateTab('deal-crm')}
          className="p-5 hover:border-white/[0.18] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300">Active Deal Pipeline</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight group-hover:text-amber-300 transition-colors">
            <RollingNumber value={activeDealsValue} prefix="$" />
          </div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center space-x-1 font-mono">
            <span>{activeDeals.length} deals in negotiation / production</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </SurfaceCard>

        {/* Qualified Views RPM */}
        <SurfaceCard
          onClick={() => onNavigateTab('revenue-analytics')}
          className="p-5 hover:border-white/[0.18] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300">Qualified RPM (30d)</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tracking-tight group-hover:text-emerald-300 transition-colors">
            ${mockRevenueAnalytics.rpm.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            66% qualified views (168k / 255k views)
          </div>
        </SurfaceCard>

        {/* Algorithm Alert */}
        <SurfaceCard
          onClick={() => onNavigateTab('detective')}
          className="p-5 !border-rose-500/30 !bg-rose-500/[0.03] hover:!border-rose-500/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <span className="font-semibold">Algorithm Velocity</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono tracking-tight">
            {videoList.filter((v) => v.status === 'critical_drop').length} Drop Flagged
          </div>
          <div className="text-[11px] text-rose-300/80 mt-2 font-mono">
            {criticalVideo.views} views • 0:08s retention cliff
          </div>
        </SurfaceCard>

        {/* Copycat Clones Alert */}
        <SurfaceCard
          onClick={() => onNavigateTab('originality')}
          className="p-5 !border-amber-500/30 !bg-amber-500/[0.03] hover:!border-amber-500/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
            <span className="font-semibold">Copycat & Scraper Radar</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            {alerts.length} Incidents
          </div>
          <div className="text-[11px] text-amber-300 mt-2 font-medium font-mono">
            {alerts.filter((a) => a.status === 'alert').length} require takedown action
          </div>
        </SurfaceCard>
      </div>

      {/* Main Grid: Urgent Diagnostics & Active Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Active Drop Autopsy */}
        <SurfaceCard className="lg:col-span-7 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Live Retention Autopsy Investigation
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('detective')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>Full Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-black/40 rounded-xl border border-white/[0.06] p-4 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Critical Throttling Identified
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">{criticalVideo.title}</h4>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Uploaded: {criticalVideo.uploadDate} • {criticalVideo.views} views (Expected: {criticalVideo.expectedViews.toLocaleString()})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06] text-center font-mono">
              <div className="bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg">
                <div className="text-[10px] text-slate-500">CTR</div>
                <div className="text-sm font-bold text-rose-400">{criticalVideo.ctr}%</div>
                <div className="text-[9px] text-slate-500">Base: {criticalVideo.channelAvgCtr}%</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg">
                <div className="text-[10px] text-slate-500">0:08 Cliff</div>
                <div className="text-sm font-bold text-rose-400">-{criticalVideo.retentionDropAt8s}%</div>
                <div className="text-[9px] text-slate-500">Before Hook</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg">
                <div className="text-[10px] text-slate-500">24h Velocity</div>
                <div className="text-sm font-bold text-amber-400">{criticalVideo.first24hViews} views</div>
                <div className="text-[9px] text-slate-500">Seed stalled</div>
              </div>
            </div>

            {/* Retention Bar Chart Visualizer */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Audience Retention Curve</span>
                <span className="text-rose-400 font-bold">-48% drop at 0:08s</span>
              </div>
              <div className="h-16 w-full flex items-end space-x-1.5 bg-black/60 p-2 rounded-lg border border-white/[0.06]">
                {criticalVideo.retentionTimeline.map((pt, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      className={`w-full rounded-t transition-all ${
                        pt.second <= 8 ? 'bg-rose-500' : 'bg-slate-700'
                      }`}
                      style={{ height: `${pt.retention}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300">
              <span className="font-bold text-white block mb-0.5">Forensic Diagnosis:</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {criticalVideo.diagnoses[0]}
              </p>
            </div>
          </div>
        </SurfaceCard>

        {/* Right 5 Columns: Active Brand Deal Pipeline & Alerts */}
        <SurfaceCard className="lg:col-span-5 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Active Brand Deal Pipeline
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('deal-crm')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Full CRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Deal cards */}
            <div className="space-y-2.5">
              {activeDeals.slice(0, 3).map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => onNavigateTab('deal-crm')}
                  className="p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/[0.12] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{deal.brandName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {deal.deliverables[0]} • Due: {deal.deadline}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-teal-300">
                      ${deal.dealValue.toLocaleString()}
                    </div>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {deal.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Policy Alert Notice */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{highRiskNotice.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {highRiskNotice.summary}
              </p>
              <div className="text-[10px] font-mono text-amber-400 pt-1">
                Action: {highRiskNotice.recommendedAdjustment}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('sponsor-radar')}
            className="w-full h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Discover High-Budget Sponsors in Niche</span>
          </button>
        </SurfaceCard>
      </div>
    </div>
  );
};
