import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  Eye,
  Play,
  Pause,
  Sparkles,
  HelpCircle,
  Activity,
  Film,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockVideoDiagnostics } from '@/shared/data/mockData';
import { RollingNumber } from '@/shared/components/motion/RollingNumber';

export const InteractiveDiagnosisTeaser: React.FC<{ onOpenFullApp?: () => void }> = ({ onOpenFullApp }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-101');
  const [scrubberSec, setScrubberSec] = useState<number>(8);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const video = mockVideoDiagnostics.find((v) => v.id === selectedVideoId) || mockVideoDiagnostics[0];

  // Auto-play simulation loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setScrubberSec((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determine current timeline status
  const isCliffPoint = scrubberSec >= 6 && scrubberSec <= 10;
  const isHookZone = scrubberSec < 6;
  const isBodyZone = scrubberSec > 10 && scrubberSec <= 35;
  const isEndZone = scrubberSec > 35;

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5 mr-1" />
            Algorithm Detective Sandbox
          </span>
          <h3 className="text-xl font-bold text-white mt-1">"Why Did My Video Die?"</h3>
          <p className="text-xs text-slate-400">
            Drag the interactive scrubber across the 60-second retention curve to diagnose drop points.
          </p>
        </div>

        {/* Video switcher */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {mockVideoDiagnostics.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setSelectedVideoId(v.id);
                setScrubberSec(8);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedVideoId === v.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v.platform === 'youtube' ? 'YouTube' : 'TikTok'} ({v.views.toLocaleString()} views)
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Autopsy Timeline & Simulated Player */}
        <div className="lg:col-span-6 bg-slate-950/70 rounded-xl border border-slate-800/80 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Film className="w-3.5 h-3.5 text-rose-400" />
              <span>Diagnostic Scrubbing Lab</span>
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-1 transition"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-400" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-emerald-400" />
                    <span>Simulate Play</span>
                  </>
                )}
              </button>
              <span className="font-mono text-brand-300 font-bold text-xs bg-slate-900 px-2 py-1 rounded border border-slate-800">
                0:{scrubberSec < 10 ? `0${scrubberSec}` : scrubberSec}s
              </span>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">CTR</div>
              <div className="text-base font-bold text-rose-400 font-mono">
                <RollingNumber value={video.ctr} suffix="%" />
              </div>
              <div className="text-[10px] text-slate-400">Avg: {video.channelAvgCtr}%</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">AVD %</div>
              <div className="text-base font-bold text-amber-400 font-mono">
                <RollingNumber value={video.avdPercent} suffix="%" />
              </div>
              <div className="text-[10px] text-slate-400">Avg: {video.channelAvgAvd}%</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">Views</div>
              <div className="text-base font-bold text-white font-mono">
                <RollingNumber value={video.views} />
              </div>
              <div className="text-[10px] text-slate-400">Exp: {video.expectedViews.toLocaleString()}</div>
            </div>
          </div>

          {/* Interactive Scrubbable Retention Waveform */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Audience Retention Curve</span>
              <span className="text-rose-400 font-semibold font-mono">
                -{video.retentionDropAt8s}% at 0:08s
              </span>
            </div>

            {/* Retention Bar Chart with Playhead Track */}
            <div className="relative h-24 w-full bg-slate-900/50 p-2 rounded-xl border border-slate-800 select-none overflow-hidden">
              {/* Bars */}
              <div className="h-full w-full flex items-end space-x-1.5">
                {video.retentionTimeline.map((pt, i) => {
                  const isHoveredOrActive = Math.abs(scrubberSec - pt.second) <= 3;
                  return (
                    <div
                      key={i}
                      onClick={() => setScrubberSec(pt.second)}
                      className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                    >
                      <div
                        className={`w-full rounded-t transition-all ${
                          pt.second <= 8
                            ? 'bg-rose-500'
                            : isHoveredOrActive
                            ? 'bg-brand-400'
                            : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                        style={{ height: `${pt.retention}%` }}
                      />
                      <span className="text-[8px] text-slate-400 mt-1 font-mono">{pt.second}s</span>
                    </div>
                  );
                })}
              </div>

              {/* Glowing Scrub Playhead Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none transition-all duration-75"
                style={{
                  left: `${(scrubberSec / 60) * 94 + 3}%`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white -ml-1 -mt-0.5 shadow-md" />
              </div>
            </div>

            {/* Slider Scrubber Input */}
            <div className="px-1 pt-1">
              <input
                type="range"
                min="0"
                max="60"
                value={scrubberSec}
                onChange={(e) => {
                  setScrubberSec(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>0:00 (Hook)</span>
                <span className="text-rose-400 font-bold">0:08 (Cliff)</span>
                <span>0:30 (Mid-roll)</span>
                <span>1:00</span>
              </div>
            </div>
          </div>

          {/* Dynamic Video Frame State Mockup */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Simulated Playback State:</span>
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                  isCliffPoint
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : isHookZone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}
              >
                {isCliffPoint
                  ? '⚠️ Audience Drop-Off Warning'
                  : isHookZone
                  ? 'Hook Delivery Phase'
                  : isBodyZone
                  ? 'Body Narration Phase'
                  : 'Outro & Call to Action'}
              </span>
            </div>

            {/* Visual Screen State */}
            <div
              className={`p-3 rounded-lg border transition-all text-xs ${
                isCliffPoint
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
              }`}
            >
              {isCliffPoint ? (
                <div className="space-y-1">
                  <div className="font-bold text-rose-400 flex items-center">
                    <Activity className="w-3.5 h-3.5 mr-1" />
                    Pacing Lull Detected at 0:08s
                  </div>
                  <p className="text-[11px] text-rose-200/90 leading-relaxed">
                    Host spent 5 seconds saying "In this video, I am going to explain..." instead of showing immediate visual proof. 48% of casual swipe traffic swiped away before the value promise began.
                  </p>
                </div>
              ) : isHookZone ? (
                <div className="space-y-1">
                  <div className="font-bold text-emerald-400">Strong Visual Anchor (0:00 – 0:05s)</div>
                  <p className="text-[11px] text-slate-400">
                    High initial retention (88%). Core seed subscribers engaged with the title card and opening question.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="font-bold text-indigo-300">Stabilized Core Cohort</div>
                  <p className="text-[11px] text-slate-400">
                    Viewers who stayed past the 8-second mark watched through to 0:42s with healthy 71% relative retention.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Post-Mortem & Fix Experiments */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-xl border border-brand-500/30 p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Causal Diagnostic Post-Mortem
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                {video.status === 'critical_drop' ? 'Distribution Throttled' : 'Underperformance Detected'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-200">Your video underperformed mainly because:</div>
              {video.diagnoses.map((diag, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800"
                >
                  <span className="font-mono font-bold text-brand-400 text-xs mt-0.5">{idx + 1}.</span>
                  <p className="leading-relaxed">{diag}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Next Video A/B Action Experiment:</span>
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
          </div>

          <button
            onClick={onOpenFullApp}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/20 transition transform hover:-translate-y-0.5"
          >
            <span>Scan Your Entire Channel Autopsies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
