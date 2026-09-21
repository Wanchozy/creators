import React, { useState } from 'react';
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Bell,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { mockPlatformChanges } from '../../data/mockData';
import { PlatformChangeNotice } from '../../types';

export const PlatformChangeTracker: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [changes] = useState<PlatformChangeNotice[]>(mockPlatformChanges);

  const filteredChanges = changes.filter(
    (c) => selectedPlatform === 'all' || c.platform === selectedPlatform
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 mb-1">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Problem #7: Platform Changes Force Creators to Constantly Adapt</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Change Tracker ("Creator Changes")</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          "What's changed that I need to know about?" Clear, jargon-free radar of YouTube, TikTok, and Instagram policy & algorithm updates with personalized catalog impact flags.
        </p>
      </div>

      {/* Filter Toggles */}
      <div className="flex items-center space-x-2">
        {['all', 'youtube', 'tiktok', 'instagram'].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPlatform(p)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize border transition ${
              selectedPlatform === p
                ? 'border-blue-500 bg-blue-500/20 text-blue-300 font-bold'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            {p === 'all' ? 'All Platforms' : p}
          </button>
        ))}
      </div>

      {/* Changes Feed */}
      <div className="space-y-6">
        {filteredChanges.map((change) => (
          <div
            key={change.id}
            className={`rounded-2xl border p-6 space-y-4 transition ${
              change.actionRequired
                ? 'border-amber-500/40 bg-slate-900/80 shadow-lg shadow-amber-500/5'
                : 'border-slate-800 bg-slate-900/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono uppercase font-bold px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                  {change.platform}
                </span>
                <span className="text-xs text-slate-400 font-medium">{change.date}</span>
                <span className="text-xs text-brand-400 font-medium">• {change.type}</span>
              </div>

              {change.actionRequired && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Action Required</span>
                </span>
              )}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">{change.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                {change.summary}
              </p>
              <div className="text-[11px] text-slate-400 mt-2">
                Official Reference: <span className="text-slate-400">{change.officialSource}</span>
              </div>
            </div>

            {/* Personalized Impact Warning */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                  <span>YOUR CONTENT AFFECTED:</span>
                  <span
                    className={`font-mono px-2 py-0.5 rounded text-[11px] ${
                      change.affectedVideosCount > 0
                        ? 'bg-rose-500/20 text-rose-300 font-bold'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {change.affectedVideosCount > 0
                      ? `${change.affectedVideosCount} videos potentially affected`
                      : '0 videos affected (You are safe)'}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  <span className="text-slate-300 font-semibold">Recommended Adjustment: </span>
                  {change.recommendedAdjustment}
                </div>
              </div>

              {change.affectedVideosCount > 0 && (
                <button
                  onClick={() => alert(`Showing ${change.affectedVideosCount} flagged videos in your catalog.`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold shrink-0 border border-slate-700 transition"
                >
                  Review Affected Videos
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
