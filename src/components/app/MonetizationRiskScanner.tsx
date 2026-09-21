import React, { useState } from 'react';
import {
  AlertTriangle,
  Upload,
  CheckCircle2,
  XCircle,
  Shield,
  FileVideo,
  Clock,
  Info,
  Sparkles
} from 'lucide-react';
import { mockRiskChecks } from '../../data/mockData';
import { MonetizationRiskCheck } from '../../types';

export const MonetizationRiskScanner: React.FC = () => {
  const [checks, setChecks] = useState<MonetizationRiskCheck[]>(mockRiskChecks);
  const [selectedCheckId, setSelectedCheckId] = useState<string>('risk-1');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const activeCheck = checks.find((c) => c.id === selectedCheckId) || checks[0];

  const handleSimulateScan = () => {
    if (!uploadedFileName) return;
    setIsSimulatingUpload(true);
    setTimeout(() => {
      const newCheck: MonetizationRiskCheck = {
        id: `risk-${Date.now()}`,
        videoTitle: uploadedFileName.replace(/\.[^/.]+$/, ''),
        fileOrUrl: uploadedFileName,
        checkedAt: 'Just now',
        overallRisk: 'Medium',
        metrics: {
          originalCommentaryScore: 'Medium',
          originalNarrationScore: 'High',
          thirdPartyFootageSeconds: 22,
          repeatedFormatRisk: 'Low',
          potentialReusedContentRisk: 'Medium'
        },
        potentialIssues: [
          'Detected 22 continuous seconds of licensed documentary b-roll without active vocal narration.',
          'Format is original, but verify that audio bed has an active commercial clearance token.'
        ],
        platformComplianceNotes:
          'Medium risk profile: Safe for YouTube ad monetization, but recommend adding voice reaction over the 22s b-roll gap.'
      };
      setChecks([newCheck, ...checks]);
      setSelectedCheckId(newCheck.id);
      setIsSimulatingUpload(false);
      setUploadedFileName('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 mb-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Problem #6: Monetization Decisions Feel Unpredictable</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Pre-Publish Monetization Risk Scanner</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Pre-flight upload scanner for YouTube & TikTok 2025/2026 "Inauthentic Content" and "Reused Content" flags before you publish.
        </p>
      </div>

      {/* Critical Legal Distinction Banner from the document */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start space-x-3">
        <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Important Platform Reality: </span>
          Creator's cannot promise "YouTube will 100% monetize this." It provides an automated audit of policy trigger points (un-commentated third-party footage duration, repetitive template audio, and robotic voice markers).
        </div>
      </div>

      {/* File Upload / Pre-Flight Scan Harness */}
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto text-brand-400">
          <Upload className="w-6 h-6" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-sm font-bold text-white">Upload Video or Timeline For Pre-Publish Scan</h3>
          <p className="text-xs text-slate-400 mt-1">
            Accepts .mp4, .mov, or exported Premiere/FCP XML project timelines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="text"
            placeholder="e.g. documentary_final_render.mp4"
            value={uploadedFileName}
            onChange={(e) => setUploadedFileName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
          />
          <button
            onClick={handleSimulateScan}
            disabled={!uploadedFileName || isSimulatingUpload}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold shrink-0 transition"
          >
            {isSimulatingUpload ? 'Auditing Policy...' : 'Run Risk Scan'}
          </button>
        </div>
      </div>

      {/* Scanned Video Selector */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {checks.map((check) => (
          <button
            key={check.id}
            onClick={() => setSelectedCheckId(check.id)}
            className={`p-3.5 rounded-xl border text-left min-w-[260px] transition ${
              selectedCheckId === check.id
                ? 'border-brand-500 bg-brand-500/10'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-400 font-mono">{check.checkedAt}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  check.overallRisk === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : check.overallRisk === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {check.overallRisk} Risk
              </span>
            </div>
            <div className="text-xs font-bold text-white line-clamp-1">{check.videoTitle}</div>
          </button>
        ))}
      </div>

      {/* Active Audit Report Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Scorecard Breakdown */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Monetization Risk Metrics
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeCheck.overallRisk === 'High'
                  ? 'bg-rose-500/20 text-rose-300'
                  : activeCheck.overallRisk === 'Medium'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              Overall: {activeCheck.overallRisk}
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Original Commentary:</span>
              <span
                className={`font-bold ${
                  activeCheck.metrics.originalCommentaryScore === 'Low'
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                }`}
              >
                {activeCheck.metrics.originalCommentaryScore}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Original Narration:</span>
              <span className="font-bold text-emerald-400">
                {activeCheck.metrics.originalNarrationScore}
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Third-Party Footage Without Commentary:</span>
              <span
                className={`font-mono font-bold ${
                  activeCheck.metrics.thirdPartyFootageSeconds > 30 ? 'text-rose-400' : 'text-slate-200'
                }`}
              >
                {activeCheck.metrics.thirdPartyFootageSeconds} seconds
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Repeated / Templated Format Risk:</span>
              <span className="font-bold text-slate-200">{activeCheck.metrics.repeatedFormatRisk}</span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">Potential Reused Content Penalty:</span>
              <span
                className={`font-bold ${
                  activeCheck.metrics.potentialReusedContentRisk === 'High'
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                }`}
              >
                {activeCheck.metrics.potentialReusedContentRisk}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Potential Issues & Mitigation Fixes */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Identified Vulnerabilities & Policy Flags</h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeCheck.platformComplianceNotes}</p>
          </div>

          <div className="space-y-3">
            {activeCheck.potentialIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start space-x-3 leading-relaxed"
              >
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  !
                </div>
                <div>{issue}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Safe Edits:</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Add picture-in-picture (PIP) reaction camera during third-party footage playback.</li>
              <li>Limit continuous un-commentated clips to under 12 seconds per instance.</li>
              <li>Provide clear vocal critical analysis or comedic reaction over the b-roll.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
