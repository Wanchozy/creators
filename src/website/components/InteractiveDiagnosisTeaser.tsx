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
  Activity,
  Film,
  Copy,
  Check,
  Zap,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockVideoDiagnostics } from '@/shared/data/mockData';
import { RollingNumber } from '@/shared/components/motion/RollingNumber';

export const InteractiveDiagnosisTeaser: React.FC<{ onOpenFullApp?: () => void }> = ({ onOpenFullApp }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-101');
  const [scrubberSec, setScrubberSec] = useState<number>(8);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedAction, setCopiedAction] = useState<boolean>(false);

  const video = mockVideoDiagnostics.find((v) => v.id === selectedVideoId) || mockVideoDiagnostics[0];

  // Auto-play simulation loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setScrubberSec((prev) => (prev >= 60 ? 0 : prev + 1));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const isCliffPoint = scrubberSec >= 6 && scrubberSec <= 10;
  const isHookZone = scrubberSec < 6;

  const handleCopyAction = () => {
    const actionText = `A/B Video Hook Fix for "${video.title}": Cut the 5-second verbal preamble. Open directly at 0:01s with the thermal throttle comparison chart on screen. Target retention: >65% at 0:30s.`;
    navigator.clipboard.writeText(actionText);
    setCopiedAction(true);
    setTimeout(() => setCopiedAction(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Subtle top edge illumination */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
      <div className="absolute -top-24 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-5 border-b border-white/[0.06] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider">
              Forensic Algorithm Autopsy
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 tracking-tight">
            "Why Did My Video Die?"
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Scrub the 60-second audience retention curve to pinpoint the exact moment viewers abandoned your video.
          </p>
        </div>

        {/* Video switcher pills */}
        <div className="flex items-center space-x-1.5 bg-black/40 p-1 rounded-xl border border-white/[0.06]">
          {mockVideoDiagnostics.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setSelectedVideoId(v.id);
                setScrubberSec(8);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition font-mono ${
                selectedVideoId === v.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {v.platform === 'youtube' ? 'YouTube' : 'TikTok'} ({v.views.toLocaleString()} views)
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scrubbable Retention Waveform */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
              <Film className="w-3.5 h-3.5 text-rose-400" />
              <span>Interactive Retention Scrubber</span>
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-slate-300 flex items-center space-x-1.5 transition font-mono"
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
              <span className="font-mono text-white font-bold text-xs bg-black/60 px-2.5 py-1 rounded border border-white/[0.08]">
                0:{scrubberSec < 10 ? `0${scrubberSec}` : scrubberSec}s
              </span>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/[0.06] text-center font-mono">
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] text-slate-500 block">CTR</span>
              <span className="text-base font-bold text-rose-400">
                <RollingNumber value={video.ctr} suffix="%" />
              </span>
              <span className="text-[10px] text-slate-500">Avg: {video.channelAvgCtr}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] text-slate-500 block">AVD %</span>
              <span className="text-base font-bold text-amber-400">
                <RollingNumber value={video.avdPercent} suffix="%" />
              </span>
              <span className="text-[10px] text-slate-500">Avg: {video.channelAvgAvd}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] text-slate-500 block">TOTAL VIEWS</span>
              <span className="text-base font-bold text-white">
                <RollingNumber value={video.views} />
              </span>
              <span className="text-[10px] text-slate-500">Exp: {video.expectedViews.toLocaleString()}</span>
            </div>
          </div>

          {/* Interactive Graph Box */}
          <div className="space-y-2">
            <div className="relative h-28 w-full bg-black/50 p-2.5 rounded-xl border border-white/[0.08] select-none overflow-hidden">
              {/* Bars */}
              <div className="h-full w-full flex items-end space-x-1.5">
                {video.retentionTimeline.map((pt, i) => {
                  const isNearPlayhead = Math.abs(scrubberSec - pt.second) <= 3;
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
                            : isNearPlayhead
                            ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]'
                            : 'bg-slate-700/60 hover:bg-slate-500'
                        }`}
                        style={{ height: `${pt.retention}%` }}
                      />
                      <span className="text-[8px] text-slate-500 mt-1 font-mono">{pt.second}s</span>
                    </div>
                  );
                })}
              </div>

              {/* Glowing Scrubber Needle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] pointer-events-none transition-all duration-75"
                style={{
                  left: `${(scrubberSec / 60) * 94 + 3}%`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white -ml-1 -mt-0.5 shadow-md" />
              </div>
            </div>

            {/* Slider */}
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
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0:00 (Hook)</span>
              <span className="text-rose-400 font-bold">0:08 (Cliff Point)</span>
              <span>0:30 (Mid)</span>
              <span>1:00</span>
            </div>
          </div>

          {/* Real-time Stage Banner */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Pacing Diagnostic:</span>
              <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                isCliffPoint
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {isCliffPoint ? '⚠️ Pacing Cliff (-48%)' : 'Stable Audience Cohort'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isCliffPoint
                ? 'Viewers abandoned because the creator took 5 seconds repeating the video title instead of immediately revealing the test findings.'
                : 'Viewers who survived past 0:08 stayed through the video with strong 71% relative completion.'}
            </p>
          </div>
        </div>

        {/* Right Column: Forensic Post-Mortem & Fix Script */}
        <div className="lg:col-span-6 bg-white/[0.02] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Forensic Post-Mortem Diagnosis</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                Throttled Distribution
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Why the algorithm stopped recommending:</div>
              {video.diagnoses.map((diag, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-slate-300 p-2.5 rounded-lg bg-black/40 border border-white/[0.04]"
                >
                  <span className="font-mono text-rose-400 font-bold text-xs mt-0.5">{idx + 1}.</span>
                  <p className="leading-relaxed text-[11px] text-slate-300">{diag}</p>
                </div>
              ))}
            </div>

            {/* Prescribed A/B Fix with Copy Button */}
            <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Prescribed A/B Action Fix:</span>
                </span>
                <button
                  onClick={handleCopyAction}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1 transition"
                >
                  {copiedAction ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Fix Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                "Cut the 5-second verbal preamble. Open directly at 0:01s with the thermal throttle comparison chart on screen. Target retention: &gt;65% at 0:30s."
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFullApp}
            className="w-full h-11 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-rose-500/10"
          >
            <span>Scan Entire Channel Retention Autopsies</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
