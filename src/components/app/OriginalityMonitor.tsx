import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  AlertTriangle,
  FileText,
  Copy,
  CheckCircle2,
  ExternalLink,
  Bot,
  Send,
  Eye
} from 'lucide-react';
import { mockCopycatAlerts } from '../../data/mockData';
import { CopycatIncident } from '../../types';

export const OriginalityMonitor: React.FC = () => {
  const [alerts, setAlerts] = useState<CopycatIncident[]>(mockCopycatAlerts);
  const [searchQuery, setSearchQuery] = useState<string>('How I Built My Entire Setup for Under $500');
  const [scriptText, setScriptText] = useState<string>('Most desk setups you see online cost $3,000, but I built this entire minimal workstation for $487. Here is the receipt and the exact compromises...');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);
  const [activeTakedownModal, setActiveTakedownModal] = useState<CopycatIncident | null>(null);

  const handleScanConcept = () => {
    setIsScanning(true);
    setScanCompleted(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
    }, 1200);
  };

  const handleUpdateStatus = (id: string, newStatus: CopycatIncident['status']) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Problem #3: AI Content Crowding Out Original Creators</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Originality & Copycat Monitor</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Scans YouTube, TikTok & Reels for automated spam channels scraping your original scripts, titles, and hooks.
        </p>
      </div>

      {/* Live Concept & Script Scanner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Scan Original Concept or Script</h3>
            <p className="text-xs text-slate-400">Paste your planned or published script to search for plagiarized duplicates across platforms.</p>
          </div>
          <button
            onClick={handleScanConcept}
            disabled={isScanning}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-2 transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isScanning ? 'Scanning Video Networks...' : 'Search Platform Duplicates'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Video Title / Hook Premise</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Original Script / First 30 Seconds</label>
            <textarea
              rows={2}
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white resize-none"
            />
          </div>
        </div>

        {scanCompleted && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Scan Result: </span>
              Found <strong>3 videos</strong> using substantially similar verbatim scripts and pacing. One automated channel copied your opening hook within 18 hours of your upload.
            </div>
          </div>
        )}
      </div>

      {/* Copycat Incident Alerts */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Detected Copycat & Scraping Incidents ({alerts.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Continuous 24/7 Web & Platform Monitor</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    {alert.suspectPlatform}
                  </span>
                  <span className="text-[10px] text-slate-400">• Detected {alert.detectedDate}</span>
                  {alert.isAiGeneratedChannel && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <Bot className="w-3 h-3" />
                      <span>AI Scraper Channel</span>
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      alert.status === 'takedown_sent'
                        ? 'bg-blue-500/20 text-blue-300'
                        : alert.status === 'alert'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    Status: {alert.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Your Original: </span>
                  <strong className="text-white">"{alert.originalTitle}"</strong>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Suspect Upload: </span>
                  <span className="text-amber-300">"{alert.suspectVideoTitle}"</span> by{' '}
                  <span className="font-mono text-slate-200">@{alert.suspectChannel}</span>
                </div>

                <div className="text-[11px] text-slate-400">
                  Match Type: <strong className="text-slate-200">{alert.matchType.replace('_', ' ')}</strong>
                </div>
              </div>

              {/* Similarity score & Actions */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Similarity Match</div>
                  <div className="text-xl font-extrabold font-mono text-rose-400">{alert.similarityScore}%</div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTakedownModal(alert)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-1"
                  >
                    <FileText className="w-3 h-3 text-amber-400" />
                    <span>Generate Takedown</span>
                  </button>
                  {alert.status !== 'resolved' && (
                    <button
                      onClick={() => handleUpdateStatus(alert.id, 'resolved')}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Takedown Modal Generator */}
      {activeTakedownModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>DMCA Copyright Notice Generator</span>
              </h3>
              <button
                onClick={() => setActiveTakedownModal(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                This notice can be submitted directly through the {activeTakedownModal.suspectPlatform.toUpperCase()} Copyright Infringement Webform:
              </p>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] leading-relaxed text-slate-300 select-all">
                Subject: Notice of Copyright Infringement - {activeTakedownModal.suspectVideoTitle}
                <br /><br />
                To Copyright Agent at {activeTakedownModal.suspectPlatform}:
                <br /><br />
                I am the original creator of the work titled "{activeTakedownModal.originalTitle}".
                The upload by account @{activeTakedownModal.suspectChannel} titled "{activeTakedownModal.suspectVideoTitle}" reproduces substantial original script, hook phrasing, and narrative structure without authorization ({activeTakedownModal.similarityScore}% match).
                <br /><br />
                I have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  handleUpdateStatus(activeTakedownModal.id, 'takedown_sent');
                  setActiveTakedownModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold"
              >
                Copy & Mark As Takedown Sent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
