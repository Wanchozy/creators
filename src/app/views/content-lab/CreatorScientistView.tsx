import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  Clock,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { mockChannelPatterns } from '@/shared/data/mockData'
import { scorePatternHypothesis } from '@/shared/domain/patternScoringEngine';

export const CreatorScientistView: React.FC = () => {
  const [testTitle, setTestTitle] = useState<string>('Why I Stopped Doing Sponsorships in 2026');
  const [testLength, setTestLength] = useState<number>(24);
  const [testHookTime, setTestHookTime] = useState<number>(1.5);
  const [testHasFace, setTestHasFace] = useState<boolean>(true);
  const [testHasTextOverlay, setTestHasTextOverlay] = useState<boolean>(true);
  const [testHasIntroBumper, setTestHasIntroBumper] = useState<boolean>(false);

  // Pure domain pattern evaluation
  const score = scorePatternHypothesis({
    testLength,
    testHookTime,
    testHasFace,
    testHasTextOverlay,
    testHasIntroBumper
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400 mb-1">
          <Brain className="w-3.5 h-3.5" />
          <span>Problem #2: "I have analytics, but I don't know what to do with them"</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Creator Scientist (Winning Pattern Discovery)</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Statistically dissects your last {mockChannelPatterns.sampleSize} videos: Video A got 80k views, Video B got 3k. What did you actually do differently?
        </p>
      </div>

      {/* Primary Insight Callout */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Your Channel's Strongest Recurring Pattern:
            </div>
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              "{mockChannelPatterns.strongestRecurringPattern}"
            </p>
            <div className="text-xs text-slate-400">
              Mined across {mockChannelPatterns.sampleSize} videos (Top 25% winners vs Bottom 25% underperformers).
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison: What Performed Well vs Underperformed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Winners */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Videos That Performed Well (Top 15)</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              High Velocity
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Optimal Video Length:</span>
              <span className="font-bold text-emerald-400">{mockChannelPatterns.topPerformersStats.avgLength}</span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Hook Timing:</span>
              <span className="font-bold text-emerald-400">{mockChannelPatterns.topPerformersStats.hookStyle}</span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Human Face Presence:</span>
              <span className="font-bold text-emerald-400">
                {mockChannelPatterns.topPerformersStats.faceAppearanceTiming}
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Community Engagement:</span>
              <span className="font-bold text-emerald-400">
                Avg {mockChannelPatterns.topPerformersStats.avgCommentsPer1k} comments / 1k views
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 block font-semibold">High Affinity Topics:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {mockChannelPatterns.topPerformersStats.primaryTopics.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[11px] font-medium border border-emerald-500/20">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Underperformers */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white">Videos That Underperformed (Bottom 15)</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
              High Drop-Off
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Video Length:</span>
              <span className="font-bold text-rose-400">{mockChannelPatterns.underperformersStats.avgLength}</span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Intro Style:</span>
              <span className="font-bold text-rose-400">{mockChannelPatterns.underperformersStats.introStyle}</span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Hook Style:</span>
              <span className="font-bold text-rose-400">{mockChannelPatterns.underperformersStats.hookStyle}</span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Community Engagement:</span>
              <span className="font-bold text-rose-400">
                Avg {mockChannelPatterns.underperformersStats.avgCommentsPer1k} comments / 1k views
              </span>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 block font-semibold">Underperforming Formats:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {mockChannelPatterns.underperformersStats.primaryTopics.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[11px] font-medium border border-rose-500/20">
                    ✗ {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Correlation Patterns */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>The Top 5 Statistical Correlations For Your Audience</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockChannelPatterns.keyPatterns.map((pat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{pat.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    pat.positiveCorrelation ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {pat.positiveCorrelation ? '+ Positive Impact' : '- Negative Impact'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>In Winners: <strong className="text-slate-200">{pat.frequencyInWinners}</strong></span>
                <span>In Losers: <strong className="text-slate-200">{pat.frequencyInLosers}</strong></span>
              </div>
              <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/80 leading-relaxed">
                {pat.insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Production Hypothesis Tester */}
      <div className="rounded-2xl border border-brand-500/30 bg-slate-900/80 p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Pre-Production Hypothesis Tester</h3>
            <p className="text-xs text-slate-400">Score your next planned concept against your channel's winning traits before shooting.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Formula Alignment Score</div>
            <div
              className={`text-2xl font-extrabold font-mono ${
                score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'
              }`}
            >
              {score}% Match
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Working Title / Premise</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1 flex justify-between">
                <span>Target Video Length:</span>
                <span className="font-mono font-bold text-brand-400">{testLength} seconds</span>
              </label>
              <input
                type="range"
                min="10"
                max="90"
                value={testLength}
                onChange={(e) => setTestLength(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
              <span className="text-[10px] text-slate-400">Winning Sweet Spot: 18 – 32 seconds</span>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1 flex justify-between">
                <span>Core Hook Delivery Timestamp:</span>
                <span className="font-mono font-bold text-brand-400">{testHookTime}s</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={testHookTime}
                onChange={(e) => setTestHookTime(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
              <span className="text-[10px] text-slate-400">Winning Sweet Spot: &lt; 2.0 seconds</span>
            </div>
          </div>

          <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-bold text-slate-200 mb-2">Checklist of Proven Channel Drivers:</div>

            <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 hover:border-slate-700 cursor-pointer">
              <span className="text-xs text-slate-300">Face appears in the very first frame</span>
              <input
                type="checkbox"
                checked={testHasFace}
                onChange={(e) => setTestHasFace(e.target.checked)}
                className="rounded text-brand-600 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 hover:border-slate-700 cursor-pointer">
              <span className="text-xs text-slate-300">Bold on-screen hook caption for muted feeds</span>
              <input
                type="checkbox"
                checked={testHasTextOverlay}
                onChange={(e) => setTestHasTextOverlay(e.target.checked)}
                className="rounded text-brand-600 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 hover:border-slate-700 cursor-pointer">
              <span className="text-xs text-slate-300">Channel logo splash / animated bumper (Avoid!)</span>
              <input
                type="checkbox"
                checked={testHasIntroBumper}
                onChange={(e) => setTestHasIntroBumper(e.target.checked)}
                className="rounded text-rose-500 bg-slate-800 border-slate-700"
              />
            </label>

            <div className="pt-3 border-t border-slate-800 text-xs">
              <span className="font-semibold text-slate-300">Scientist Recommendation: </span>
              {testHasIntroBumper ? (
                <span className="text-rose-400">
                  Cut the intro bumper! In your channel data, intros lasting &gt;4s caused 78% of your flops.
                </span>
              ) : testLength < 18 || testLength > 32 ? (
                <span className="text-amber-400">
                  Length is slightly off your peak 18-32s sweet spot. Consider trimming filler to trigger repeat loop plays.
                </span>
              ) : (
                <span className="text-emerald-400">
                  Concept strongly aligns with your top 15 highest-retention videos! Proceed to filming.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
