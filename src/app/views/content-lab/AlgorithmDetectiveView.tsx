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
  ArrowRight
} from 'lucide-react';
import { mockVideoDiagnostics } from '@/shared/data/mockData';
import { diagnoseVideoPerformance, CustomDiagnosisInput } from '@/shared/domain/diagnosticEngine';

export const AlgorithmDetectiveView: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-101');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

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

  const activeVideo = mockVideoDiagnostics.find((v) => v.id === selectedVideoId) || mockVideoDiagnostics[0];
  const customResult = diagnoseVideoPerformance(customInput);

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
            Connected Videos (3)
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
            {mockVideoDiagnostics.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideoId(video.id)}
                className={`p-4 rounded-xl border text-left min-w-[280px] transition ${
                  selectedVideoId === video.id
                    ? 'border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="uppercase font-bold tracking-wider text-slate-400">
                    {video.platform} • {video.uploadDate}
                  </span>
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
                </div>
                <h3 className="text-xs font-bold text-white line-clamp-2">{video.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{video.views.toLocaleString()} views</span>
                  <span className="text-slate-400">Exp: {video.expectedViews.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Diagnostic Report */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Raw Data vs Channel Normal Baseline */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Studio Metrics vs Channel Normal
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">90-day baseline</span>
                </div>

                <div className="space-y-3">
                  {/* CTR comparison */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Click-Through Rate (CTR):</span>
                      <span
                        className={`font-mono font-bold ${
                          activeVideo.ctr < activeVideo.channelAvgCtr ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {activeVideo.ctr}% (Baseline: {activeVideo.channelAvgCtr}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${activeVideo.ctr < activeVideo.channelAvgCtr ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, (activeVideo.ctr / 10) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* 8-Second Viewer Drop */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Dropped in First 8 Seconds:</span>
                      <span className="font-mono font-bold text-rose-400">
                        {activeVideo.retentionDropAt8s}% of viewers
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${activeVideo.retentionDropAt8s}%` }} />
                    </div>
                    <p className="text-[10px] text-rose-400/90 mt-1">
                      Normal drop-off for high-retention content is under 15%.
                    </p>
                  </div>

                  {/* 24-Hour Velocity */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">First 24-Hour Views:</span>
                      <span className="font-mono font-bold text-white">
                        {activeVideo.first24hViews.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Algorithm browse impression test failed to find high-velocity viewer signals.
                    </p>
                  </div>
                </div>

                {/* Retention Timeline Chart */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                    <span>Audience Retention Curve</span>
                    <span className="text-[10px] text-slate-400">Second-by-second drop</span>
                  </div>
                  <div className="h-28 w-full flex items-end space-x-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    {activeVideo.retentionTimeline.map((pt, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        <div
                          className={`w-full rounded-t transition-all ${
                            i <= 2 ? 'bg-rose-500' : 'bg-slate-600 group-hover:bg-brand-500'
                          }`}
                          style={{ height: `${pt.retention}%` }}
                        />
                        <span className="text-[8px] text-slate-400 mt-1 font-mono">{pt.second}s</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Causal Diagnosis & Actionable Experiments */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Your video underperformed mainly because:</span>
                  </div>
                  <div className="space-y-3">
                    {activeVideo.diagnoses.map((diag, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 flex items-start space-x-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{diag}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Possible Experiments Section */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Possible Experiments (Do This Instead of Panicking):</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeVideo.possibleExperiments.map((exp, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/10 flex items-center justify-between text-xs sm:text-sm text-emerald-200"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{exp}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">
                          Recommended
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Philosophy callout from the doc */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start space-x-3">
                  <HelpCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-300">Creator Intelligence Philosophy: </span>
                    "Analytics show numbers, but creators need explanations. Testing a 3-second intro cut + thumbnail swap is 10x more actionable than staring at another CTR chart."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Custom Autopsy Sandbox */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Enter Your Video Numbers</h3>
            
            <div>
              <label className="text-xs text-slate-300 block mb-1">Video Title / Topic</label>
              <input
                type="text"
                value={customInput.title}
                onChange={(e) => setCustomInput({ ...customInput, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Actual Views</label>
                <input
                  type="number"
                  value={customInput.actualViews}
                  onChange={(e) => setCustomInput({ ...customInput, actualViews: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Expected Views</label>
                <input
                  type="number"
                  value={customInput.expectedViews}
                  onChange={(e) => setCustomInput({ ...customInput, expectedViews: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Your CTR (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={customInput.ctr}
                  onChange={(e) => setCustomInput({ ...customInput, ctr: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Channel Avg CTR (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={customInput.channelAvgCtr}
                  onChange={(e) => setCustomInput({ ...customInput, channelAvgCtr: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
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

          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
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
        </div>
      )}
    </div>
  );
};
