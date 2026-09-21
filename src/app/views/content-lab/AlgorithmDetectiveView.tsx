import React, { useState } from 'react';
import {
  TrendingDown,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Eye,
  Sliders,
  Play,
  RotateCcw,
  ArrowRight,
  Bookmark,
  Trash2
} from 'lucide-react';
import { mockVideoDiagnostics } from '@/shared/data/mockData';
import { diagnoseVideoPerformance, CustomDiagnosisInput } from '@/shared/domain/diagnosticEngine';
import { useDiagnostics } from '@/shared/hooks/useDiagnostics';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import type { VideoDiagnostic } from '@/shared/types';

export const AlgorithmDetectiveView: React.FC = () => {
  const { diagnostics, saveDiagnostic, removeDiagnostic } = useDiagnostics();
  const { profile } = useProfile();
  const { toast } = useToast();

  const videoList = diagnostics.length > 0 ? diagnostics : mockVideoDiagnostics;
  const [selectedVideoId, setSelectedVideoId] = useState<string>(videoList[0]?.id || 'vid-101');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Custom diagnostic state
  const [customInput, setCustomInput] = useState<CustomDiagnosisInput>({
    title: 'My Latest Video (Dropped Views)',
    actualViews: 350,
    expectedViews: 10000,
    ctr: 2.3,
    channelAvgCtr: 5.8,
    retentionDropAt8s: 48,
    first24hViews: 120,
    introDurationSeconds: 12,
    hasTextHook: false,
    faceInFirstTwoSec: false
  });

  const activeVideo = videoList.find((v) => v.id === selectedVideoId) || videoList[0];
  const customResult = diagnoseVideoPerformance(customInput);

  const handleSaveCustomAutopsy = async () => {
    setIsSaving(true);
    try {
      const statusValue: VideoDiagnostic['status'] =
        customResult.verdict.toLowerCase().includes('critical') || customResult.verdict.toLowerCase().includes('collapse')
          ? 'critical_drop'
          : customResult.verdict.toLowerCase().includes('healthy') || customResult.verdict.toLowerCase().includes('viral')
          ? 'viral'
          : 'mild_underperform';

      const saved = await saveDiagnostic({
        title: customInput.title,
        platform: profile.primaryPlatform || 'youtube',
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        views: customInput.actualViews,
        expectedViews: customInput.expectedViews,
        ctr: customInput.ctr,
        channelAvgCtr: customInput.channelAvgCtr,
        avdPercent: 32,
        channelAvgAvd: 45,
        retentionDropAt8s: customInput.retentionDropAt8s,
        first24hViews: customInput.first24hViews,
        status: statusValue,
        diagnoses: customResult.issues,
        possibleExperiments: customResult.experiments,
        retentionTimeline: [
          { second: 0, retention: 100 },
          { second: 8, retention: Math.max(0, 100 - customInput.retentionDropAt8s) },
          { second: 30, retention: Math.max(15, 100 - customInput.retentionDropAt8s - 15) },
          { second: 60, retention: Math.max(10, 100 - customInput.retentionDropAt8s - 25) },
          { second: 120, retention: Math.max(8, 100 - customInput.retentionDropAt8s - 35) }
        ],
      });

      toast.success(`Diagnostic autopsy for "${customInput.title}" saved to your Supabase channel history!`);
      setSelectedVideoId(saved.id);
      setIsCustomMode(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save diagnostic audit');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVideo = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await removeDiagnostic(id);
      toast.success('Diagnostic report removed');
      if (selectedVideoId === id && videoList.length > 1) {
        setSelectedVideoId(videoList.find(v => v.id !== id)?.id || '');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to delete report');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 mb-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Problem #1: Sudden Unexplained Drops in Reach</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Algorithm Detective ("Why Did My Video Die?")</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Translates ambiguous analytics into causal explanations: click-through collapse, retention cliffs, and algorithmic throttling.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setIsCustomMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              !isCustomMode ? 'bg-brand-600 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audited Videos ({videoList.length})
          </button>
          <button
            onClick={() => setIsCustomMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              isCustomMode ? 'bg-brand-600 text-white shadow-sm font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Autopsy
          </button>
        </div>
      </div>

      {!isCustomMode ? (
        <>
          {/* Video Selector Tabs */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {videoList.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideoId(video.id)}
                className={`p-4 rounded-xl border text-left min-w-[280px] transition cursor-pointer relative group ${
                  selectedVideoId === video.id
                    ? 'border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="uppercase font-bold tracking-wider text-slate-400">
                    {video.platform} • {video.uploadDate}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        video.status === 'critical_drop'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : video.status === 'viral'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {video.status.replace('_', ' ')}
                    </span>
                    {diagnostics.some(d => d.id === video.id) && (
                      <button
                        onClick={(e) => handleDeleteVideo(e, video.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition"
                        title="Delete audit"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-2">{video.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{video.views.toLocaleString()} views</span>
                  <span className="text-slate-400">Exp: {video.expectedViews.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Diagnostic Report */}
          {activeVideo && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Raw Data vs Channel Normal Baseline */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Studio Metrics vs Channel Normal
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Baseline Delta</span>
                  </div>

                  <div className="space-y-3">
                    {/* Views Delta */}
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400 font-medium">View Velocity (Reach):</span>
                        <span className="font-mono font-bold text-rose-400">
                          {Math.round(((activeVideo.views - activeVideo.expectedViews) / activeVideo.expectedViews) * 100)}% vs Normal
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (activeVideo.views / activeVideo.expectedViews) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                        <span>Actual: {activeVideo.views.toLocaleString()}</span>
                        <span>Expected: {activeVideo.expectedViews.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* CTR Delta */}
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400 font-medium">Click-Through Rate (CTR):</span>
                        <span className={`font-mono font-bold ${activeVideo.ctr < activeVideo.channelAvgCtr ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {activeVideo.ctr}% (Avg {activeVideo.channelAvgCtr}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${activeVideo.ctr < activeVideo.channelAvgCtr ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(100, (activeVideo.ctr / (activeVideo.channelAvgCtr * 1.5)) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Retention Drop */}
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-400 font-medium">Hook Dropoff (&lt; 8 seconds):</span>
                        <span className={`font-mono font-bold ${activeVideo.retentionDropAt8s > 35 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          -{activeVideo.retentionDropAt8s}% of viewers
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${activeVideo.retentionDropAt8s}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {activeVideo.retentionDropAt8s > 35 ? 'Critical drop in intro hook — viewers bounced instantly.' : 'Healthy initial retention.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retention Timeline Chart */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Viewer Retention Curve</h3>
                    <span className="text-xs text-rose-400 font-mono font-bold">Cliff at 0:08</span>
                  </div>
                  <div className="h-28 flex items-end justify-between pt-4 border-b border-slate-800 px-2">
                    {activeVideo.retentionTimeline.map((point, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-1 h-full justify-end">
                        <span className="text-[9px] font-mono text-slate-400">{point.retention}%</span>
                        <div
                          className={`w-6 sm:w-8 rounded-t transition-all ${
                            point.retention < 45 ? 'bg-rose-500/80' : 'bg-brand-500/80'
                          }`}
                          style={{ height: `${point.retention}%` }}
                        />
                        <span className="text-[9px] text-slate-500 font-mono">{point.second}s</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Causal Diagnosis & Recommended Action Experiments */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-slate-900 to-slate-900 p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Algorithmic Autopsy & Root Cause</span>
                  </div>

                  <div className="space-y-3">
                    {activeVideo.diagnoses.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>Autopsy Finding #{idx + 1}</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-3.5 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experiments Box */}
                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-900 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <Sparkles className="w-4 h-4" />
                      <span>Next Action Experiments</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Actionable Fixes</span>
                  </div>

                  <div className="space-y-3">
                    {activeVideo.possibleExperiments.map((exp, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-300 leading-relaxed">{exp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Custom Autopsy Sandbox */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 pb-2 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-brand-400" />
              <span>Input Underperforming Video Metrics</span>
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Video Title</label>
              <input
                type="text"
                value={customInput.title}
                onChange={(e) => setCustomInput({ ...customInput, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Actual Views</label>
                <input
                  type="number"
                  value={customInput.actualViews}
                  onChange={(e) => setCustomInput({ ...customInput, actualViews: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Expected Views</label>
                <input
                  type="number"
                  value={customInput.expectedViews}
                  onChange={(e) => setCustomInput({ ...customInput, expectedViews: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">CTR %</label>
                <input
                  type="number"
                  step="0.1"
                  value={customInput.ctr}
                  onChange={(e) => setCustomInput({ ...customInput, ctr: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Channel Avg CTR %</label>
                <input
                  type="number"
                  step="0.1"
                  value={customInput.channelAvgCtr}
                  onChange={(e) => setCustomInput({ ...customInput, channelAvgCtr: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                % Dropped in First 8 Seconds: {customInput.retentionDropAt8s}%
              </label>
              <input
                type="range"
                min="5"
                max="80"
                value={customInput.retentionDropAt8s}
                onChange={(e) => setCustomInput({ ...customInput, retentionDropAt8s: Number(e.target.value) })}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customInput.faceInFirstTwoSec}
                  onChange={(e) => setCustomInput({ ...customInput, faceInFirstTwoSec: e.target.checked })}
                  className="rounded text-brand-600 bg-slate-900 border-slate-700"
                />
                <span>Human face visible in first 2 seconds</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customInput.hasTextHook}
                  onChange={(e) => setCustomInput({ ...customInput, hasTextHook: e.target.checked })}
                  className="rounded text-brand-600 bg-slate-900 border-slate-700"
                />
                <span>Bold text hook on screen in first 2 seconds</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Instant Diagnostic Diagnosis
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  {customResult.verdict}
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-200">Identified Bottlenecks:</div>
                {customResult.issues.map((issue, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300">
                    {issue}
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Next Action Experiments:</span>
                </div>
                {customResult.experiments.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-xs text-emerald-200">
                    {exp}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleSaveCustomAutopsy}
                disabled={isSaving}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-brand-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-rose-500/20 transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaving ? 'Saving to Supabase...' : 'Save Diagnostic Audit to Channel History'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
