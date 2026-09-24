import React, { useState } from 'react';
import {
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
  ChevronRight,
  Eye,
  Activity,
  Play,
  Filter,
  Download
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
  const [selectedVideoId, setSelectedVideoId] = useState<string>(
    videoList.find((v) => v.status === 'critical_drop')?.id || videoList[0]?.id || ''
  );

  const selectedVideo = videoList.find((v) => v.id === selectedVideoId) || videoList[0];
  const highRiskNotice = mockPlatformChanges.find((p) => p.actionRequired) || mockPlatformChanges[0];

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner & Quick Actions Bar - Hairline Bordered Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
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
            Real-time causal drop diagnostics, commercial rate pricing, and pre-upload algorithmic safety.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateTab('rate-calculator')}
            className="h-9 px-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 transition flex items-center space-x-2"
          >
            <DollarSign className="w-3.5 h-3.5 text-teal-400" />
            <span>Rate Calculator ({quotes.length})</span>
          </button>
          <button
            onClick={() => onNavigateTab('detective')}
            className="h-9 px-4 rounded-lg bg-white hover:bg-slate-100 text-xs font-bold text-slate-950 transition flex items-center space-x-2 shadow-sm"
          >
            <TrendingDown className="w-3.5 h-3.5 text-slate-950" />
            <span>Run Drop Autopsy</span>
          </button>
        </div>
      </div>

      {/* Connected Hairline Metric Ribbon (Linear Style: Zero Wasted Space, Divide-X) */}
      <div className="border border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] rounded-xl bg-[#0a0c12] overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-sm">
        {/* Metric 1: Deal Pipeline Value */}
        <div
          onClick={() => onNavigateTab('deal-crm')}
          className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] font-mono">
                Active Deal Pipeline
              </span>
            </div>
            <Layers className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight group-hover:text-amber-300 transition-colors">
            <RollingNumber value={activeDealsValue} prefix="$" />
          </div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center space-x-1 font-mono">
            <span>{activeDeals.length} active sponsorships in CRM</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Metric 2: Qualified Views RPM */}
        <div
          onClick={() => onNavigateTab('revenue-analytics')}
          className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] font-mono">
                Qualified RPM (30d)
              </span>
            </div>
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tracking-tight group-hover:text-emerald-300 transition-colors">
            ${mockRevenueAnalytics.rpm.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            66% qualified views (168k / 255k total)
          </div>
        </div>

        {/* Metric 3: Algorithm Velocity */}
        <div
          onClick={() => onNavigateTab('detective')}
          className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group flex flex-col justify-between bg-rose-500/[0.02]"
        >
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="font-semibold text-rose-300 uppercase tracking-wider text-[11px] font-mono">
                Algorithm Velocity
              </span>
            </div>
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono tracking-tight">
            {videoList.filter((v) => v.status === 'critical_drop').length} Drop Flagged
          </div>
          <div className="text-[11px] text-rose-300/80 mt-2 font-mono">
            {selectedVideo.views} views • -{selectedVideo.retentionDropAt8s}% at 0:08s
          </div>
        </div>

        {/* Metric 4: Copycat & Scraper Radar */}
        <div
          onClick={() => onNavigateTab('originality')}
          className="p-5 hover:bg-white/[0.02] transition-colors cursor-pointer group flex flex-col justify-between bg-amber-500/[0.02]"
        >
          <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] font-mono">
                Scraper & Clone Radar
              </span>
            </div>
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            {alerts.length} Incidents
          </div>
          <div className="text-[11px] text-amber-300 mt-2 font-medium font-mono">
            {alerts.filter((a) => a.status === 'alert').length} takedowns recommended
          </div>
        </div>
      </div>

      {/* Main Command Center: Linear Issue Table & Raycast Pipeline Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Linear-Style Algorithmic Incident Table & Live Autopsy */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl border border-white/[0.08] bg-[#090b10] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Algorithmic Drop Autopsies & Incidents ({videoList.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('detective')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>Full Lab</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Dense Linear Issue-Tracker Table */}
            <div className="divide-y divide-white/[0.04]">
              {videoList.map((video) => {
                const isSelected = video.id === selectedVideoId;
                const isCritical = video.status === 'critical_drop';
                const isMild = video.status === 'mild_underperform';
                return (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideoId(video.id)}
                    className={`p-3.5 sm:px-4 sm:py-3 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.04] border-l-2 border-indigo-400'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold shrink-0 ${
                            isCritical
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : isMild
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {isCritical ? 'Critical Cliff' : isMild ? 'Sub-Baseline' : 'Healthy'}
                        </span>
                        <span className="text-xs font-semibold text-white truncate">{video.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono flex items-center space-x-3">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span className={video.ctr < video.channelAvgCtr ? 'text-rose-400' : 'text-slate-300'}>
                          CTR {video.ctr}% (Avg {video.channelAvgCtr}%)
                        </span>
                        <span>•</span>
                        <span className="text-rose-400">-{video.retentionDropAt8s}% @ 8s</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateTab('detective');
                        }}
                        className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono text-slate-300 hover:text-white transition"
                      >
                        Inspect ↵
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Video Forensic Inspection Card */}
          {selectedVideo && (
            <div className="rounded-xl border border-white/[0.08] bg-[#090b10] p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    Forensic Autopsy Active
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{selectedVideo.title}</h4>
                </div>
                <button
                  onClick={() => onNavigateTab('detective')}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                >
                  <span>Open in Detective</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* 3 Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-black/40 border border-white/[0.05] p-2.5 rounded-lg">
                  <div className="text-[10px] text-slate-500">CTR vs Channel</div>
                  <div className="text-sm font-bold text-rose-400">{selectedVideo.ctr}%</div>
                  <div className="text-[9px] text-slate-500">Avg: {selectedVideo.channelAvgCtr}%</div>
                </div>
                <div className="bg-black/40 border border-white/[0.05] p-2.5 rounded-lg">
                  <div className="text-[10px] text-slate-500">0:08 Cliff</div>
                  <div className="text-sm font-bold text-rose-400">-{selectedVideo.retentionDropAt8s}%</div>
                  <div className="text-[9px] text-slate-500">Before Hook Finish</div>
                </div>
                <div className="bg-black/40 border border-white/[0.05] p-2.5 rounded-lg">
                  <div className="text-[10px] text-slate-500">24h Velocity</div>
                  <div className="text-sm font-bold text-amber-400">{selectedVideo.first24hViews} views</div>
                  <div className="text-[9px] text-slate-500">Seed stalled</div>
                </div>
              </div>

              {/* Retention Curve Visualizer */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Audience Retention Curve (0s - 120s)</span>
                  <span className="text-rose-400 font-bold">-{selectedVideo.retentionDropAt8s}% drop at 0:08s</span>
                </div>
                <div className="h-16 w-full flex items-end space-x-1.5 bg-black/60 p-2 rounded-lg border border-white/[0.06]">
                  {selectedVideo.retentionTimeline.map((pt, i) => (
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

              {/* Causal Verdict */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-300">
                <span className="font-bold text-white block mb-0.5 font-mono text-[11px]">Causal Root-Cause Verdict:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {selectedVideo.diagnoses[0]}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Raycast-Style Active Brand Deal Pipeline & Policy Radar */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Deal Pipeline */}
          <div className="rounded-xl border border-white/[0.08] bg-[#090b10] p-4 sm:p-5 space-y-4 shadow-sm">
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
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Deal cards */}
            <div className="space-y-2">
              {activeDeals.slice(0, 4).map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => onNavigateTab('deal-crm')}
                  className="p-3 rounded-lg bg-black/40 border border-white/[0.06] hover:border-white/[0.14] transition cursor-pointer flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-white truncate">{deal.brandName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {deal.deliverables[0]} • Due: {deal.deadline}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
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

            <button
              onClick={() => onNavigateTab('sponsor-radar')}
              className="w-full h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Discover Verified Sponsors in Niche</span>
            </button>
          </div>

          {/* Platform Policy Radar Notice */}
          <div className="rounded-xl border border-white/[0.08] bg-[#090b10] p-4 sm:p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Platform Policy Alert Radar
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('platform-changes')}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              >
                <span>View 3 Alerts</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-amber-300">{highRiskNotice.title}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {highRiskNotice.summary}
              </p>
              <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300">
                Action: {highRiskNotice.recommendedAdjustment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
