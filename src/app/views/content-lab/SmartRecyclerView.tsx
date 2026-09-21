import React, { useState } from 'react';
import {
  Scissors,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  Share2,
  Layers,
  ArrowRight,
  Download,
  Video
} from 'lucide-react';
import { mockClips } from '@/shared/data/mockData';
import { useToast } from '@/shared/components/Toast';
import { RepurposedClip } from '@/shared/types';

export const SmartRecyclerView: React.FC = () => {
  const { toast } = useToast();
  const [clips, setClips] = useState<RepurposedClip[]>(mockClips);
  const [uploadedEpisode, setUploadedEpisode] = useState<string>('podcast_episode_42.mp4');

  const handleUpdateStatus = (id: string, newStatus: RepurposedClip['status']) => {
    setClips(clips.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    toast.info(`Clip marked as ${newStatus}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 mb-1">
          <Scissors className="w-3.5 h-3.5" />
          <span>Problem #8: Repurposing Content Is Labor-Intensive</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Content Recycler ("Human Chooses, AI Accelerates")</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          The problem isn't merely generating summaries. It's deciding: <em>which moments are actually worth turning into separate pieces?</em>
        </p>
      </div>

      {/* Philosophy Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 p-5 flex items-start space-x-3 text-xs text-indigo-200">
        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Product Philosophy: </span>
          "Human chooses. AI accelerates. That is a vastly better product philosophy than fully automating everything and flooding feeds with low-retention filler."
        </div>
      </div>

      {/* Episode Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300">
            <Video className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">Source Long-form File (32:14 mins)</div>
            <div className="text-sm font-bold text-white font-mono">{uploadedEpisode}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Found 4 High-Tension Moments</span>
        </div>
      </div>

      {/* Scored Clips Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Best High-Potential Viral Moments (Human Review Queue)
        </h3>

        {clips.map((clip, index) => (
          <div
            key={clip.id}
            className={`rounded-2xl border p-5 transition ${
              clip.status === 'approved'
                ? 'border-emerald-500/40 bg-slate-900/80 shadow-md shadow-emerald-500/5'
                : clip.status === 'rejected'
                ? 'border-slate-800/40 bg-slate-950/40 opacity-50'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-brand-400">
                    Clip #{index + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {clip.timestampStart} – {clip.timestampEnd} ({clip.durationSeconds}s)
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      clip.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : clip.status === 'rejected'
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    Status: {clip.status}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white">
                  Topic: "{clip.topic}"
                </h4>

                <div className="text-xs text-slate-300 italic bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                  Opening Hook: {clip.hookQuote}
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
                  <span>Suggested Destinations:</span>
                  {clip.suggestedFormats.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Virality Potential & Decision Controls */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Virality Potential</div>
                  <div
                    className={`text-2xl font-extrabold font-mono ${
                      clip.viralityPotential >= 85
                        ? 'text-emerald-400'
                        : clip.viralityPotential >= 70
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {clip.viralityPotential}%
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(clip.id, 'rejected')}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 border border-slate-700 transition"
                    title="Reject Moment"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(clip.id, 'approved')}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Clip</span>
                  </button>
                  {clip.status === 'approved' && (
                    <button
                      onClick={() => toast.success(`Exporting 9:16 vertical crop for ${clip.topic}...`)}
                      className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-1 transition shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export 9:16</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
