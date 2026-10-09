import React, { useState, useRef } from 'react';
import {
  TrendingDown,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Sliders,
  Bookmark,
  Trash2,
  Upload,
  Link as LinkIcon,
  FileSpreadsheet,
  Youtube,
  Loader2,
  ShieldCheck,
  Check,
  ExternalLink,
  FileText
} from 'lucide-react';
import { mockVideoDiagnostics } from '@/shared/data/mockData';
import { diagnoseVideoPerformance, CustomDiagnosisInput } from '@/shared/domain/diagnosticEngine';
import { fetchVideoMetadata, VideoMetadata } from '@/shared/domain/videoMetadataFetcher';
import { parseYouTubeStudioCsv, ParsedRetentionPoint } from '@/shared/domain/youtubeCsvParser';
import { auditVideoPackaging, PackagingAuditResult } from '@/shared/domain/packagingAuditEngine';
import { useDiagnostics } from '@/shared/hooks/useDiagnostics';
import { useProfile } from '@/shared/hooks/useProfile';
import { useAuth } from '@/shared/hooks/useAuth';
import { useToast } from '@/shared/components/Toast';
import type { VideoDiagnostic } from '@/shared/types';

export const AlgorithmDetectiveView: React.FC = () => {
  const { diagnostics, saveDiagnostic, removeDiagnostic } = useDiagnostics();
  const { profile } = useProfile();
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const videoList = diagnostics.length > 0 ? diagnostics : mockVideoDiagnostics;
  const [selectedVideoId, setSelectedVideoId] = useState<string>(videoList[0]?.id || 'vid-101');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Ingestion Mode State
  const [ingestionMode, setIngestionMode] = useState<'url' | 'csv' | 'manual' | 'oauth'>('url');
  
  // URL Ingestion State
  const [urlInput, setUrlInput] = useState<string>('');
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false);
  const [fetchedMetadata, setFetchedMetadata] = useState<VideoMetadata | null>(null);
  const [packagingAudit, setPackagingAudit] = useState<PackagingAuditResult | null>(null);

  // CSV Ingestion State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [parsedTimeline, setParsedTimeline] = useState<ParsedRetentionPoint[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom diagnostic input
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

  // 1. URL Metadata Fetcher & Instant Packaging Audit
  const handleFetchUrlMetadata = async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a YouTube or TikTok video URL');
      return;
    }

    setIsFetchingUrl(true);
    try {
      const meta = await fetchVideoMetadata(urlInput);
      setFetchedMetadata(meta);
      const audit = auditVideoPackaging(meta);
      setPackagingAudit(audit);
      setCustomInput((prev) => ({
        ...prev,
        title: meta.title,
      }));
      toast.success(`Analyzed packaging for: "${meta.title.slice(0, 35)}..."`);
    } catch (err: any) {
      toast.error(err?.message || 'Could not fetch video info from that link');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleApplyTitleRewrite = (rewrite: string) => {
    setCustomInput((prev) => ({ ...prev, title: rewrite }));
    if (fetchedMetadata) {
      const updatedMeta = { ...fetchedMetadata, title: rewrite };
      setFetchedMetadata(updatedMeta);
      setPackagingAudit(auditVideoPackaging(updatedMeta));
    }
    toast.success('Applied sharper title rewrite!');
  };

  // 2. CSV File Processor
  const handleProcessCsvFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a valid .csv file exported from YouTube Studio');
      return;
    }

    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const result = parseYouTubeStudioCsv(text);

        if (result.type === 'retention_curve') {
          if (result.dropAt8s !== undefined) {
            setCustomInput((prev) => ({
              ...prev,
              retentionDropAt8s: result.dropAt8s!,
            }));
          }
          if (result.retentionTimeline && result.retentionTimeline.length > 0) {
            setParsedTimeline(result.retentionTimeline);
          }
          toast.success(result.notes[0]);
          if (result.notes[1]) {
            setTimeout(() => toast.info(result.notes[1]), 1200);
          }
        } else if (result.type === 'video_summary') {
          setCustomInput((prev) => ({
            ...prev,
            title: result.title || prev.title,
            actualViews: result.views ?? prev.actualViews,
            ctr: result.ctr ?? prev.ctr,
          }));
          toast.success(`Imported metrics for "${result.title || file.name}"`);
        } else {
          toast.info('CSV file loaded, but standard retention columns were not found.');
        }
      } catch (err: any) {
        toast.error(err?.message || 'Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessCsvFile(e.dataTransfer.files[0]);
    }
  };

  // 3. Google OAuth Connect
  const handleConnectOAuth = async () => {
    try {
      toast.info('Connecting to Google OAuth for YouTube Analytics sync...');
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      toast.error(err?.message || 'Failed to launch Google OAuth sign-in');
    }
  };

  // 4. Save Custom Autopsy
  const handleSaveCustomAutopsy = async () => {
    setIsSaving(true);
    try {
      const statusValue: VideoDiagnostic['status'] =
        customResult.verdict.toLowerCase().includes('critical') || customResult.verdict.toLowerCase().includes('collapse')
          ? 'critical_drop'
          : customResult.verdict.toLowerCase().includes('healthy') || customResult.verdict.toLowerCase().includes('viral')
          ? 'viral'
          : 'mild_underperform';

      const timelineToSave =
        parsedTimeline && parsedTimeline.length > 0
          ? parsedTimeline.map((p) => ({ second: p.second, retention: p.retention }))
          : [
              { second: 0, retention: 100 },
              { second: 8, retention: Math.max(0, 100 - customInput.retentionDropAt8s) },
              { second: 30, retention: Math.max(15, 100 - customInput.retentionDropAt8s - 15) },
              { second: 60, retention: Math.max(10, 100 - customInput.retentionDropAt8s - 25) },
              { second: 120, retention: Math.max(8, 100 - customInput.retentionDropAt8s - 35) }
            ];

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
        retentionTimeline: timelineToSave,
        thumbnailUrl: fetchedMetadata?.thumbnailUrl,
      });

      toast.success(`Diagnostic autopsy for "${customInput.title}" saved to your channel history!`);
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
            Translates raw analytics into causal post-mortems: click-through collapse, retention cliffs, and algorithmic throttling.
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
            + New Ingestion Autopsy
          </button>
        </div>
      </div>

      {!isCustomMode ? (
        /* Audited Video Explorer */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoList.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideoId(video.id)}
                className={`p-4 rounded-xl border cursor-pointer transition relative group ${
                  selectedVideoId === video.id
                    ? 'bg-slate-850 border-rose-500/60 shadow-lg shadow-rose-950/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                {video.thumbnailUrl && (
                  <div className="mb-2.5 overflow-hidden rounded-lg aspect-video relative border border-slate-800">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.uploadDate}</span>
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
                        <p className="text-xs text-slate-300 leading-relaxed pl-3.5">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
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
        /* Ingestion Hub & Custom Autopsy Sandbox */
        <div className="space-y-6">
          {/* Progressive Ingestion Method Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <span>Choose Video Ingestion Method</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Try it out with zero commitment first (URL or CSV), then automate with 1-click Google OAuth.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Option 1: URL */}
              <button
                type="button"
                onClick={() => setIngestionMode('url')}
                className={`p-3.5 rounded-xl border text-left transition flex items-start space-x-3 ${
                  ingestionMode === 'url'
                    ? 'bg-brand-950/40 border-brand-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <LinkIcon className={`w-4 h-4 mt-0.5 ${ingestionMode === 'url' ? 'text-brand-400' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold text-white">1. Paste Video URL</div>
                  <div className="text-[11px] text-slate-400">Zero auth. Pulls title, channel & HD thumbnail.</div>
                </div>
              </button>

              {/* Option 2: CSV */}
              <button
                type="button"
                onClick={() => setIngestionMode('csv')}
                className={`p-3.5 rounded-xl border text-left transition flex items-start space-x-3 ${
                  ingestionMode === 'csv'
                    ? 'bg-rose-950/40 border-rose-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <FileSpreadsheet className={`w-4 h-4 mt-0.5 ${ingestionMode === 'csv' ? 'text-rose-400' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold text-white">2. Drop Studio CSV</div>
                  <div className="text-[11px] text-slate-400">Deep second-by-second retention curve & cliff.</div>
                </div>
              </button>

              {/* Option 3: Manual */}
              <button
                type="button"
                onClick={() => setIngestionMode('manual')}
                className={`p-3.5 rounded-xl border text-left transition flex items-start space-x-3 ${
                  ingestionMode === 'manual'
                    ? 'bg-amber-950/40 border-amber-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Sliders className={`w-4 h-4 mt-0.5 ${ingestionMode === 'manual' ? 'text-amber-400' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold text-white">3. Manual Calibration</div>
                  <div className="text-[11px] text-slate-400">Adjust custom sliders and hypothesis flags.</div>
                </div>
              </button>

              {/* Option 4: OAuth */}
              <button
                type="button"
                onClick={() => setIngestionMode('oauth')}
                className={`p-3.5 rounded-xl border text-left transition flex items-start space-x-3 ${
                  ingestionMode === 'oauth'
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Youtube className={`w-4 h-4 mt-0.5 ${ingestionMode === 'oauth' ? 'text-rose-400' : 'text-slate-400'}`} />
                <div>
                  <div className="text-xs font-bold text-white">4. Auto-Sync Channel</div>
                  <div className="text-[11px] text-slate-400">Continuous telemetry via read-only OAuth.</div>
                </div>
              </button>
            </div>

            {/* Ingestion Panel 1: URL Fetcher */}
            {ingestionMode === 'url' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Paste YouTube or TikTok Video URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <button
                    onClick={handleFetchUrlMetadata}
                    disabled={isFetchingUrl}
                    className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    {isFetchingUrl ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Fetching...</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>Inspect Link</span>
                      </>
                    )}
                  </button>
                </div>

                {fetchedMetadata && packagingAudit && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    {/* Header: Thumbnail + Title + Channel */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-3 min-w-0">
                        {fetchedMetadata.thumbnailUrl && (
                          <img
                            src={fetchedMetadata.thumbnailUrl}
                            alt="Thumbnail"
                            className="w-24 h-14 object-cover rounded-lg border border-slate-700 shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white line-clamp-1">{fetchedMetadata.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">By {fetchedMetadata.authorName} • {fetchedMetadata.platform}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {packagingAudit.charCount} characters ({packagingAudit.wordCount} words)
                          </div>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-slate-400">CTR Potential</div>
                          <div className="text-base font-mono font-extrabold text-brand-400">
                            {packagingAudit.score}/100
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                            packagingAudit.grade.startsWith('A')
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : packagingAudit.grade === 'B'
                              ? 'bg-brand-500/20 text-brand-300 border-brand-500/30'
                              : packagingAudit.grade === 'C'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          }`}
                        >
                          Grade {packagingAudit.grade}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Truncation Feed Simulation */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-semibold flex items-center space-x-1.5">
                          <span>📱 Simulated Mobile YouTube Feed Preview</span>
                        </span>
                        {packagingAudit.mobileTruncationRisk ? (
                          <span className="text-rose-400 font-bold text-[10px] flex items-center space-x-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Truncated on Mobile</span>
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-bold text-[10px] flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>Clean Mobile Length</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-medium text-slate-200 font-mono bg-slate-900/60 p-2 rounded border border-slate-800">
                        {packagingAudit.mobileTruncationRisk ? (
                          <>
                            <span>{fetchedMetadata.title.slice(0, 48)}</span>
                            <span className="text-rose-400 bg-rose-950/60 px-1 rounded ml-0.5">... [TRUNCATED]</span>
                          </>
                        ) : (
                          <span>{fetchedMetadata.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Identified Bottlenecks */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Why Viewers Might Scroll Past (Packaging Bottlenecks):</span>
                      </div>
                      <div className="space-y-1.5">
                        {packagingAudit.bottlenecks.map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packaging Strengths */}
                    {packagingAudit.strengths.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Packaging Strengths:</span>
                        </div>
                        <div className="space-y-1.5">
                          {packagingAudit.strengths.map((item, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-start space-x-2">
                              <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested High-CTR Title Rewrites */}
                    {packagingAudit.suggestedTitleRewrites.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/30 to-slate-950 border border-indigo-500/30 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Suggested High-CTR Title Rewrites (Click to Apply)</span>
                          </div>
                          <span className="text-[10px] text-indigo-400 font-mono">Curiosity Formulas</span>
                        </div>
                        <div className="space-y-2">
                          {packagingAudit.suggestedTitleRewrites.map((rewrite, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 hover:border-indigo-500/50 transition group"
                            >
                              <span className="text-xs text-slate-200 line-clamp-1">{rewrite}</span>
                              <button
                                onClick={() => handleApplyTitleRewrite(rewrite)}
                                className="px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[11px] font-bold transition shrink-0"
                              >
                                Apply Rewrite
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Ingestion Panel 2: CSV Drag & Drop */}
            {ingestionMode === 'csv' && (
              <div className="space-y-3">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition ${
                    isDragging
                      ? 'border-rose-500 bg-rose-950/20'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".csv"
                    onChange={(e) => e.target.files?.[0] && handleProcessCsvFile(e.target.files[0])}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 rounded-full bg-rose-500/10 text-rose-400">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-white">
                      {csvFileName ? `Loaded: ${csvFileName}` : 'Drag & Drop YouTube Studio .csv File Here'}
                    </div>
                    <p className="text-[11px] text-slate-400 max-w-md">
                      Go to YouTube Studio $\rightarrow$ Video Analytics $\rightarrow$ Audience Retention $\rightarrow$ Export $\rightarrow$ .csv.
                      We parse the second-by-second curve completely offline in your browser.
                    </p>
                  </div>
                </div>

                {parsedTimeline && (
                  <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Parsed {parsedTimeline.length} Real Retention Points</span>
                    </span>
                    <span className="font-mono text-slate-400">8s Drop: -{customInput.retentionDropAt8s}%</span>
                  </div>
                )}
              </div>
            )}

            {/* Ingestion Panel 3: Google OAuth */}
            {ingestionMode === 'oauth' && (
              <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                      <Youtube className="w-4 h-4 text-rose-500" />
                      <span>Automated YouTube Channel Telemetry</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-xl leading-relaxed">
                      Sync CTR, first-24h browse traffic, and retention drop-offs automatically without manual exports.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    Tier 3 Sync
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Read-Only Analytics access (`yt-analytics.readonly`)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-2 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>We never have permission to upload, edit, or delete videos</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    onClick={handleConnectOAuth}
                    className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-rose-950/40"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Connect YouTube Channel via Google</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Autopsy Calibration & Findings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2 pb-2 border-b border-slate-800">
                <Sliders className="w-4 h-4 text-brand-400" />
                <span>Calibrate Diagnostic Metrics</span>
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
                  % Dropped in First 8 Seconds: <span className="font-mono text-rose-400 font-bold">{customInput.retentionDropAt8s}%</span>
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
                    Instant Diagnostic Verdict
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                    {customResult.verdict}
                  </span>
                </div>

                {/* Retention Curve Visualizer */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                      {parsedTimeline ? 'Real Parsed Retention Curve' : 'Projected Retention Curve'}
                    </span>
                    <span className="font-mono text-rose-400 text-xs">
                      8s Cliff: -{customInput.retentionDropAt8s}%
                    </span>
                  </div>
                  <div className="h-20 flex items-end justify-between pt-2 border-b border-slate-800 px-1">
                    {(parsedTimeline && parsedTimeline.length > 0
                      ? parsedTimeline
                      : [
                          { second: 0, retention: 100 },
                          { second: 8, retention: Math.max(0, 100 - customInput.retentionDropAt8s) },
                          { second: 30, retention: Math.max(15, 100 - customInput.retentionDropAt8s - 15) },
                          { second: 60, retention: Math.max(10, 100 - customInput.retentionDropAt8s - 25) },
                          { second: 120, retention: Math.max(8, 100 - customInput.retentionDropAt8s - 35) }
                        ]
                    ).map((point, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-1 h-full justify-end">
                        <span className="text-[8px] font-mono text-slate-400">{point.retention}%</span>
                        <div
                          className={`w-4 sm:w-6 rounded-t transition-all ${
                            point.retention < 45 ? 'bg-rose-500/80' : 'bg-brand-500/80'
                          }`}
                          style={{ height: `${point.retention}%` }}
                        />
                        <span className="text-[8px] text-slate-500 font-mono">{point.second}s</span>
                      </div>
                    ))}
                  </div>
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
                  <span>{isSaving ? 'Saving to Database...' : 'Save Diagnostic Audit to Channel History'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
