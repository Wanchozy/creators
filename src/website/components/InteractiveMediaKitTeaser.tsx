import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Globe,
  DollarSign,
  Send,
  Users,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/shared/components/motion';
import { generateRecommendedRatePackages } from '@/shared/domain/mediaKitEngine';
import { generateBrandPitchDraft } from '@/shared/domain/pitchGeneratorEngine';

interface InteractiveMediaKitTeaserProps {
  onOpenFullApp?: () => void;
}

export const InteractiveMediaKitTeaser: React.FC<InteractiveMediaKitTeaserProps> = ({
  onOpenFullApp,
}) => {
  const [channelNiche, setChannelNiche] = useState<'Tech & AI' | 'Productivity & SaaS' | 'Gaming & Creative'>('Tech & AI');
  const [avgViews, setAvgViews] = useState<number>(35000);
  const [tier1Ratio, setTier1Ratio] = useState<number>(76);
  const [activeTeaserTab, setActiveTeaserTab] = useState<'onesheet' | 'pitch'>('onesheet');
  const [copied, setCopied] = useState<boolean>(false);

  const packages = generateRecommendedRatePackages(avgViews, channelNiche);

  const pitch = generateBrandPitchDraft({
    brandName: 'Stripe',
    channelName: 'Creator Studio',
    pitchType: 'counter_offer_lowball',
    tone: 'assertive_commercial',
    targetBudget: packages[1]?.price || 1800,
    offeredBudget: Math.round((packages[1]?.price || 1800) * 0.4),
    deliverable: '60s Dedicated Mid-Roll',
    niche: channelNiche,
  });

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(`${pitch.subjectLine}\n\n${pitch.emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SpotlightCard className="p-6 sm:p-8 bg-[#0b0e17] border border-white/[0.08] rounded-2xl relative overflow-hidden shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Interactive Demo 03 • Brand Closer Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Live Creator Media Kit & Lowball Defense
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Simulate your public commercial one-sheet and generate counter-offers when brands try to underpay your baseline.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-[#121624] p-1 rounded-xl border border-white/[0.08] flex text-xs font-medium">
            <button
              onClick={() => setActiveTeaserTab('onesheet')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTeaserTab === 'onesheet' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              One-Sheet Preview
            </button>
            <button
              onClick={() => setActiveTeaserTab('pitch')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTeaserTab === 'pitch' ? 'bg-purple-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lowball Counter-Script
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-5 bg-[#0e1220] p-5 rounded-xl border border-white/[0.06]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
            Channel Simulator
          </span>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1.5">Select Channel Niche:</label>
              <div className="space-y-1.5">
                {(['Tech & AI', 'Productivity & SaaS', 'Gaming & Creative'] as const).map((niche) => (
                  <button
                    key={niche}
                    onClick={() => setChannelNiche(niche)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium text-left border transition ${
                      channelNiche === niche
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white font-semibold'
                        : 'bg-[#151928] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Average 30d Views:</span>
                <span className="font-mono text-indigo-400 font-bold">{avgViews.toLocaleString()} views</span>
              </div>
              <input
                type="range"
                min={5000}
                max={150000}
                step={5000}
                value={avgViews}
                onChange={(e) => setAvgViews(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">Tier 1 Audience (US/UK/CA):</span>
                <span className="font-mono text-emerald-400 font-bold">{tier1Ratio}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={95}
                step={5}
                value={tier1Ratio}
                onChange={(e) => setTier1Ratio(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            <button
              onClick={onOpenFullApp}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow"
            >
              <span>Launch Studio in Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Display Preview */}
        <div className="lg:col-span-8">
          {activeTeaserTab === 'onesheet' ? (
            <div className="bg-[#090b12] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-6">
              {/* Creator One-Sheet Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg">
                    C
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-base font-bold text-white">Creator Studio</span>
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-[11px] text-indigo-400 font-mono">{channelNiche} • Verified Publisher</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-500">Tier 1 Purchasing Index</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">{tier1Ratio}% US / UK / CA</div>
                </div>
              </div>

              {/* Dynamic Rates Generated */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between ${
                      pkg.isPopular
                        ? 'bg-indigo-950/30 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                        : 'bg-[#0f121d] border-white/[0.06]'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        {pkg.name.split(' ')[0]} Placement
                      </div>
                      <div className="text-xl font-extrabold text-white mt-1 font-mono">
                        ${pkg.price.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug">{pkg.deliverables[0]}</p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/[0.04] text-[9px] font-mono text-emerald-400">
                      ✓ Includes 30d usage rights
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Public Media Kit Link: <strong className="text-slate-300 font-mono">creators.app/m/creatorstudio</strong></span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">1-Click PDF Ready</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#090b12] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Lowball Counter-Offer Script</span>
                </div>
                <button
                  onClick={handleCopyPitch}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white flex items-center space-x-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Script!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[#0e1220] border border-white/[0.06] text-xs">
                <span className="text-slate-500 font-mono text-[10px] block uppercase">Subject Line</span>
                <span className="font-semibold text-white mt-0.5 block">{pitch.subjectLine}</span>
              </div>

              <div className="p-4 rounded-lg bg-[#0d101a] border border-white/[0.06] text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                {pitch.emailBody}
              </div>

              <div className="text-[11px] text-purple-300 bg-purple-500/10 p-2.5 rounded-lg border border-purple-500/20">
                <strong>Tactical Rule:</strong> {pitch.tacticalTip}
              </div>
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};
