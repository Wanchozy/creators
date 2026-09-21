import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, TrendingDown, ArrowRight, Eye, Play, Sparkles, HelpCircle } from 'lucide-react';
import { mockVideoDiagnostics } from '../../data/mockData';

export const InteractiveDiagnosisTeaser: React.FC<{ onOpenFullApp?: () => void }> = ({ onOpenFullApp }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-101');
  const video = mockVideoDiagnostics.find((v) => v.id === selectedVideoId) || mockVideoDiagnostics[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5 mr-1" />
            Algorithm Detective Sandbox
          </span>
          <h3 className="text-xl font-bold text-white mt-1">"Why Did My Video Die?"</h3>
          <p className="text-xs text-slate-400">Instead of raw confusing charts, get plain-English causal diagnoses.</p>
        </div>

        {/* Video switcher */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {mockVideoDiagnostics.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVideoId(v.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedVideoId === v.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v.platform === 'youtube' ? 'YouTube' : 'TikTok'} ({v.views.toLocaleString()} views)
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Raw Analytics vs Diagnosis */}
        <div className="lg:col-span-5 bg-slate-950/70 rounded-xl border border-slate-800/80 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>What Your Studio Shows You:</span>
            <span className="text-[11px] text-slate-400 font-mono">Raw data ≠ explanation</span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">CTR</div>
              <div className="text-base font-bold text-rose-400 font-mono">{video.ctr}%</div>
              <div className="text-[10px] text-slate-400">Avg: {video.channelAvgCtr}%</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">AVD %</div>
              <div className="text-base font-bold text-amber-400 font-mono">{video.avdPercent}%</div>
              <div className="text-[10px] text-slate-400">Avg: {video.channelAvgAvd}%</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">Views</div>
              <div className="text-base font-bold text-white font-mono">{video.views.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">Exp: {video.expectedViews.toLocaleString()}</div>
            </div>
          </div>

          {/* Retention graph visualizer */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Audience Retention Curve</span>
              <span className="text-rose-400 font-semibold font-mono">-{video.retentionDropAt8s}% at 0:08s</span>
            </div>
            <div className="h-20 w-full flex items-end space-x-1.5 bg-slate-900/40 p-2 rounded-lg border border-slate-800">
              {video.retentionTimeline.map((pt, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  <div
                    className={`w-full rounded-t transition-all ${
                      i <= 2 ? 'bg-rose-500' : 'bg-slate-700 group-hover:bg-brand-500'
                    }`}
                    style={{ height: `${pt.retention}%` }}
                  />
                  <span className="text-[8px] text-slate-400 mt-1">{pt.second}s</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-rose-300/90 mt-2 bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg">
              Critical retention cliff detected: Nearly half of your viewers left in the first 8 seconds before you got to the main point.
            </div>
          </div>
        </div>

        {/* Right: Creator's Intelligent Translation */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-xl border border-brand-500/30 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Creator's Diagnostic Post-Mortem
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
              {video.status === 'critical_drop' ? 'Algorithm Distribution Throttled' : 'Underperformance Detected'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-200">Your video underperformed mainly because:</div>
            {video.diagnoses.map((diag, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="font-mono font-bold text-brand-400 text-xs mt-0.5">{idx + 1}.</span>
                <p className="leading-relaxed">{diag}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Recommended Action Experiments (Do This Next):</span>
            </div>
            <div className="space-y-1.5">
              {video.possibleExperiments.map((exp, idx) => (
                <div key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{exp}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenFullApp}
            className="w-full mt-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center space-x-2 border border-slate-700 transition"
          >
            <span>Scan Your Entire YouTube or TikTok Channel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
