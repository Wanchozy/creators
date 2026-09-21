import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileCheck,
  ArrowRight,
  Info,
  Bookmark,
  Trash2,
  History,
  Layers
} from 'lucide-react';
import { calculateCreatorDealRate } from '@/shared/domain/rateCalculatorEngine';
import { useRateQuotes } from '@/shared/hooks/useRateQuotes';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import type { RateCalculationInput } from '@/shared/types';

export const RateCalculatorView: React.FC<{ onSendToCRM?: (brandName: string, amount: number) => void }> = ({ onSendToCRM }) => {
  const { profile } = useProfile();
  const { quotes, saveQuote, removeQuote } = useRateQuotes();
  const { toast } = useToast();

  const [params, setParams] = useState<RateCalculationInput>({
    platform: profile.primaryPlatform || 'youtube',
    contentType: 'integration_60s',
    avgViews: 42000,
    creatorFollowers: profile.subscriberCount || 50000,
    category: profile.niche || 'Tech & Productivity',
    brandCanRepost: true,
    paidAdvertisingRights: true,
    exclusivityDays: 30,
    licensingMonths: 1,
    turnaroundRush: false
  });

  useEffect(() => {
    if (profile) {
      setParams((prev) => ({
        ...prev,
        platform: profile.primaryPlatform || prev.platform,
        creatorFollowers: profile.subscriberCount || prev.creatorFollowers,
        category: profile.niche || prev.category,
      }));
    }
  }, [profile]);

  const [dealBrandName, setDealBrandName] = useState<string>('Prospective Sponsor');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const result = calculateCreatorDealRate(params);

  const handleSaveQuoteOnly = async () => {
    setIsSaving(true);
    try {
      await saveQuote(dealBrandName, params, result);
      toast.success(`Commercial quote for "${dealBrandName}" saved to your Supabase history!`);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save quote');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndPushToCRM = async () => {
    setIsSaving(true);
    try {
      await saveQuote(dealBrandName, params, result);
      if (onSendToCRM) {
        onSendToCRM(dealBrandName, result.recommendedPrice);
      }
      toast.success(`Quote saved & pushed ${dealBrandName} ($${result.recommendedPrice.toLocaleString()}) to CRM!`);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save quote to CRM');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteQuote = async (id: string) => {
    try {
      await removeQuote(id);
      toast.success('Saved quote removed');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to remove quote');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 mb-1">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Commercial Pricing Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Creator Rate & Commercial Deal Calculator</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          "It becomes a deal calculator, not just an influencer calculator." Factoring in creation labor, audience CPM, paid ad whitelisting, and competitor exclusivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Interactive Variable Controls */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-teal-400" />
              <span>Deal Parameters & Commercial Rights</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real Deliverable Specs</span>
          </div>

          <div className="space-y-4">
            {/* Platform & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Platform:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['youtube', 'tiktok', 'instagram'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setParams({ ...params, platform: p })}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium capitalize border transition ${
                        params.platform === p
                          ? 'border-brand-500 bg-brand-500/20 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Content Niche:</label>
                <select
                  value={params.category}
                  onChange={(e) => setParams({ ...params, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Tech & Productivity">Tech & Productivity ($25-$35 CPM)</option>
                  <option value="Fintech & Business">Fintech & Business ($35+ CPM)</option>
                  <option value="Gaming & Entertainment">Gaming ($18 CPM)</option>
                  <option value="Lifestyle & Vlog">Lifestyle ($20 CPM)</option>
                  <option value="Education & Science">Education & Science ($28 CPM)</option>
                </select>
              </div>
            </div>

            {/* Deliverable Format */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Deliverable Format:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'integration_60s', label: '60s Integration' },
                  { id: 'dedicated_video', label: 'Dedicated 5-7m' },
                  { id: 'short_reel', label: 'Short / Reel / TikTok' },
                  { id: 'community_post', label: 'Community / Story' },
                ].map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setParams({ ...params, contentType: format.id as any })}
                    className={`p-2.5 rounded-xl text-xs text-center border transition ${
                      params.contentType === format.id
                        ? 'border-teal-500 bg-teal-500/20 text-teal-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience View Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Expected / Avg Views:</span>
                  <span className="font-mono text-teal-400 font-bold">{params.avgViews.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={params.avgViews}
                  onChange={(e) => setParams({ ...params, avgViews: Number(e.target.value) })}
                  className="w-full accent-teal-500 bg-slate-800"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-300">Exclusivity Period:</span>
                  <span className="font-mono text-teal-400 font-bold">{params.exclusivityDays} days</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="15"
                  value={params.exclusivityDays}
                  onChange={(e) => setParams({ ...params, exclusivityDays: Number(e.target.value) })}
                  className="w-full accent-teal-500 bg-slate-800"
                />
              </div>
            </div>

            {/* Commercial Rights Toggles */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Commercial & Advertising Rights
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={params.paidAdvertisingRights}
                    onChange={(e) => setParams({ ...params, paidAdvertisingRights: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-teal-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Paid Ad Rights (Whitelisting)</div>
                    <div className="text-[11px] text-slate-400">Brand can put ad spend behind your face & video (+40%).</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={params.brandCanRepost}
                    onChange={(e) => setParams({ ...params, brandCanRepost: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-teal-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Brand Social Repost Rights</div>
                    <div className="text-[11px] text-slate-400">Allows brand to repost edit to their own channels (+25%).</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={params.turnaroundRush}
                    onChange={(e) => setParams({ ...params, turnaroundRush: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-teal-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Rush Turnaround (&lt; 5 Days)</div>
                    <div className="text-[11px] text-slate-400">Emergency production fee (+30%).</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: The Quote Result Card */}
        <div className="lg:col-span-5 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950/20 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Recommended Baseline Fee</span>
                <h3 className="text-base font-bold text-white">Fair Commercial Value</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-white font-mono">
                  ${result.recommendedPrice.toLocaleString()}
                </div>
                <div className="text-[11px] text-teal-400 font-mono">
                  Fair Range: ${result.minPrice.toLocaleString()} – ${result.maxPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Why Breakdown */}
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Why: The Deal Anatomy
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Base Creation & Production:</span>
                  <span className="font-mono font-bold text-white">${result.breakdown.baseCreationFee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Audience Access ({params.avgViews.toLocaleString()} views):</span>
                  <span className="font-mono font-bold text-white">${result.breakdown.audienceAccessFee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Paid Advertising / Whitelisting:</span>
                  <span className="font-mono font-bold text-emerald-400">+${result.breakdown.paidUsageMarkup}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Category Exclusivity ({params.exclusivityDays}d):</span>
                  <span className="font-mono font-bold text-emerald-400">+${result.breakdown.exclusivityPremium}</span>
                </div>
              </div>
            </div>

            {/* Creator Negotiation Script */}
            <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-teal-200 leading-relaxed">
              <span className="font-bold text-teal-300 block mb-1">Negotiation Shield:</span>
              "If the brand pushes back on price, do not drop your fee—drop a right! E.g. Remove the 30-day paid advertising rights to reduce the total to ${(result.recommendedPrice - result.breakdown.paidUsageMarkup).toLocaleString()}."
            </div>

            {/* Actions: Save & Push */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Client / Brand Sponsor:</label>
                <input
                  type="text"
                  placeholder="e.g. Nike, Notion, NordVPN"
                  value={dealBrandName}
                  onChange={(e) => setDealBrandName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleSaveQuoteOnly}
                  disabled={isSaving}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition disabled:opacity-50"
                >
                  <Bookmark className="w-3.5 h-3.5 text-teal-400" />
                  <span>Save Quote</span>
                </button>

                <button
                  onClick={handleSaveAndPushToCRM}
                  disabled={isSaving}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-600 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-teal-500/20 transition disabled:opacity-50"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Push to CRM</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Commercial Quotes Section */}
      {quotes.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
              <History className="w-4 h-4 text-teal-400" />
              <span>Saved Commercial Quotes ({quotes.length})</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Synced with Supabase</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{q.clientName}</span>
                    <span className="text-xs font-mono font-bold text-teal-400">
                      ${q.recommendedPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {q.platform} • {q.contentType.replace('_', ' ')} • {q.category}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">
                    Fair: ${q.minPrice.toLocaleString()} - ${q.maxPrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      if (onSendToCRM) {
                        onSendToCRM(q.clientName, q.recommendedPrice);
                      }
                      toast.success(`Pushed ${q.clientName} ($${q.recommendedPrice.toLocaleString()}) to CRM!`);
                    }}
                    className="text-[11px] text-brand-400 hover:text-brand-300 font-semibold flex items-center space-x-1"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Push to CRM</span>
                  </button>

                  <button
                    onClick={() => handleDeleteQuote(q.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition"
                    title="Delete quote"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
