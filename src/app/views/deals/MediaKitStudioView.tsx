import React, { useState } from 'react';
import {
  FileText,
  Share2,
  Printer,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Users,
  Globe,
  Mail,
  Plus,
  Trash2,
  RefreshCw,
  Send,
  Layers,
  ArrowRight,
  Sliders,
  Check,
  Clock,
  Briefcase,
  Award
} from 'lucide-react';
import { useMediaKit } from '@/shared/hooks/useMediaKit';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import { generateBrandPitchDraft } from '@/shared/domain/pitchGeneratorEngine';
import type { PitchType, PitchTone, RateCardPackage } from '@/shared/types';

interface MediaKitStudioViewProps {
  onSendToCRM?: (brandName: string, amount: number) => void;
}

export const MediaKitStudioView: React.FC<MediaKitStudioViewProps> = ({ onSendToCRM }) => {
  const { mediaKit, saving, updateMediaKit, addPastBrand, removePastBrand, updatePackage, syncWithChannelProfile } = useMediaKit();
  const { profile } = useProfile();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'onesheet' | 'pitch_generator'>('onesheet');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // New Brand Form State
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCategory, setNewBrandCategory] = useState('Developer Tools');
  const [newBrandCampaign, setNewBrandCampaign] = useState('60s Dedicated Mid-Roll');
  const [newBrandMetric, setNewBrandMetric] = useState('45k views, 8.2% CTR');
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);

  // Pitch Generator State
  const [pitchBrand, setPitchBrand] = useState('Vercel');
  const [pitchType, setPitchType] = useState<PitchType>('counter_offer_lowball');
  const [pitchTone, setPitchTone] = useState<PitchTone>('assertive_commercial');
  const [offeredRate, setOfferedRate] = useState<number>(600);
  const [targetRate, setTargetRate] = useState<number>(1800);
  const [deliverable, setDeliverable] = useState<string>('60s Dedicated Mid-Roll Integration');

  const pitchResult = generateBrandPitchDraft({
    brandName: pitchBrand,
    channelName: mediaKit.channelName,
    pitchType,
    tone: pitchTone,
    targetBudget: targetRate,
    offeredBudget: offeredRate,
    deliverable,
    niche: mediaKit.niche,
  });

  const handleCopyLink = () => {
    const url = window.location.origin + `/m/${mediaKit.handle.replace('@', '')}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast.success('Public Media Kit link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(`${pitchResult.subjectLine}\n\n${pitchResult.emailBody}`);
    setCopiedEmail(true);
    toast.success('Pitch email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    try {
      await addPastBrand({
        name: newBrandName.trim(),
        category: newBrandCategory,
        campaignType: newBrandCampaign,
        metricHighlight: newBrandMetric,
        verified: true,
      });
      setNewBrandName('');
      setShowAddBrandModal(false);
      toast.success(`Added ${newBrandName} to verified sponsor track record!`);
    } catch {
      toast.error('Failed to add brand');
    }
  };

  const handlePackagePriceChange = async (pkg: RateCardPackage, newPrice: number) => {
    await updatePackage({ ...pkg, price: Math.max(50, newPrice) });
    toast.success(`Updated ${pkg.name} rate to $${newPrice.toLocaleString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0c12] p-5 rounded-2xl border border-white/[0.08] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white tracking-tight">Creator Media Kit & Brand Pitch Studio</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Metrics</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live commercial one-sheet, verified audience demographics, and pre-negotiated pitch generator.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={syncWithChannelProfile}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white flex items-center space-x-1.5 transition"
            title="Refresh metrics from your channel baseline"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin text-indigo-400' : ''}`} />
            <span>Sync Baseline</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white flex items-center space-x-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5 transition shadow-sm"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Link!' : 'Share Live Kit'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-white/[0.08] space-x-6 text-xs font-medium">
        <button
          onClick={() => setActiveTab('onesheet')}
          className={`pb-3 flex items-center space-x-2 transition relative ${
            activeTab === 'onesheet' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-indigo-400" />
          <span>Interactive One-Sheet</span>
          {activeTab === 'onesheet' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('pitch_generator')}
          className={`pb-3 flex items-center space-x-2 transition relative ${
            activeTab === 'pitch_generator' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Send className="w-4 h-4 text-purple-400" />
          <span>Brand Pitch & Lowball Defense</span>
          <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono">
            Smart Scripts
          </span>
          {activeTab === 'pitch_generator' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: ONE-SHEET STUDIO */}
      {activeTab === 'onesheet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Quick Config Drawer */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#0b0e17] rounded-xl p-4 border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Media Kit Details</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Live Auto-Save</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Channel Headline / Name</label>
                  <input
                    type="text"
                    value={mediaKit.channelName}
                    onChange={(e) => updateMediaKit({ channelName: e.target.value })}
                    className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Public Tagline</label>
                  <input
                    type="text"
                    value={mediaKit.tagline}
                    onChange={(e) => updateMediaKit({ tagline: e.target.value })}
                    className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Commercial Bio</label>
                  <textarea
                    rows={3}
                    value={mediaKit.bio}
                    onChange={(e) => updateMediaKit({ bio: e.target.value })}
                    className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Public Email</label>
                    <input
                      type="email"
                      value={mediaKit.contactEmail}
                      onChange={(e) => updateMediaKit({ contactEmail: e.target.value })}
                      className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Content Niche</label>
                    <input
                      type="text"
                      value={mediaKit.niche}
                      onChange={(e) => updateMediaKit({ niche: e.target.value })}
                      className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Past Sponsors Manager */}
            <div className="bg-[#0b0e17] rounded-xl p-4 border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Verified Sponsors ({mediaKit.pastBrands.length})</span>
                </span>
                <button
                  onClick={() => setShowAddBrandModal(true)}
                  className="px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[10px] font-semibold flex items-center space-x-1 transition"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Brand</span>
                </button>
              </div>

              <div className="space-y-2">
                {mediaKit.pastBrands.map((b) => (
                  <div
                    key={b.id}
                    className="p-2.5 rounded-lg bg-[#121622] border border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center space-x-1.5">
                        <span>{b.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-400">
                          {b.category}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">{b.metricHighlight}</div>
                    </div>
                    <button
                      onClick={() => removePastBrand(b.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Remove sponsor"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Responsive One-Sheet Preview */}
          <div className="lg:col-span-8">
            <div className="bg-[#0d101a] border border-white/[0.1] rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
              {/* Subtle Ambient Backlight */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Creator Hero Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shrink-0">
                    {mediaKit.channelName[0]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {mediaKit.channelName}
                      </h2>
                      <span className="p-0.5 rounded-full bg-blue-500/20 text-blue-400" title="Verified Creator">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-xs text-indigo-400 font-mono">{mediaKit.handle} • {mediaKit.niche}</div>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">{mediaKit.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end justify-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Commercial Inquiries</span>
                  <a
                    href={`mailto:${mediaKit.contactEmail}`}
                    className="text-xs text-slate-200 hover:text-indigo-400 flex items-center space-x-1 font-mono transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{mediaKit.contactEmail}</span>
                  </a>
                </div>
              </div>

              {/* Verified Audience Stats Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center space-x-1 font-mono">
                    <Users className="w-3 h-3 text-indigo-400" />
                    <span>Total Reach</span>
                  </div>
                  <div className="text-xl font-bold text-white mt-1">
                    {mediaKit.totalReach.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">+14% MoM growth</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center space-x-1 font-mono">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>Avg 30d Views</span>
                  </div>
                  <div className="text-xl font-bold text-white mt-1">
                    {mediaKit.avgViews30d.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Verified baseline</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center space-x-1 font-mono">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Engagement</span>
                  </div>
                  <div className="text-xl font-bold text-white mt-1">
                    {mediaKit.avgEngagementRate}%
                  </div>
                  <div className="text-[10px] text-purple-400 font-mono mt-0.5">2.4x platform avg</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center space-x-1 font-mono">
                    <Globe className="w-3 h-3 text-sky-400" />
                    <span>Tier 1 Audience</span>
                  </div>
                  <div className="text-xl font-bold text-white mt-1">78%</div>
                  <div className="text-[10px] text-sky-400 font-mono mt-0.5">High purchasing power</div>
                </div>
              </div>

              {/* Geographic & Demographic Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#090b12] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center space-x-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Top Audience Geographies</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      High CPM Bias
                    </span>
                  </div>
                  <div className="space-y-2">
                    {mediaKit.demographics.topCountries.map((geo) => (
                      <div key={geo.code} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300 font-medium">
                            {geo.country} ({geo.code})
                          </span>
                          <span className="text-slate-400 font-mono">{geo.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${geo.percentage * 1.8}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090b12] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-semibold text-white flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>Age & Viewer Profile</span>
                  </div>
                  <div className="space-y-2.5">
                    {mediaKit.demographics.ageSplit.map((age) => (
                      <div key={age.range} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">{age.range} years</span>
                          <span className="text-slate-400 font-mono">{age.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${age.percentage * 1.5}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-white/[0.06] flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Gender: {mediaKit.demographics.genderSplit.male}% Male</span>
                      <span>{mediaKit.demographics.genderSplit.female}% Female</span>
                      <span>{mediaKit.demographics.genderSplit.other}% Other</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Proven Brand Collaborations */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Proven Brand ROI & Track Record</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {mediaKit.pastBrands.map((brand) => (
                    <div
                      key={brand.id}
                      className="p-3.5 rounded-xl bg-[#090b12] border border-white/[0.06] hover:border-white/[0.12] transition space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{brand.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 font-mono">
                          {brand.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{brand.campaignType}</div>
                      <div className="text-[10px] font-mono text-emerald-400 pt-1 border-t border-white/[0.05]">
                        ✓ {brand.metricHighlight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Rate Card Packages */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Commercial Rate Card & Sponsorship Packages</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Includes Standard 30d Rights</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mediaKit.ratePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-4 rounded-xl relative flex flex-col justify-between transition ${
                        pkg.isPopular
                          ? 'bg-gradient-to-b from-indigo-950/40 to-[#0e111a] border-2 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                          : 'bg-[#090b12] border border-white/[0.08]'
                      }`}
                    >
                      {pkg.badge && (
                        <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-indigo-500 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                          {pkg.badge}
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-bold text-white">{pkg.name}</h4>
                          <div className="mt-2 flex items-baseline space-x-1">
                            <span className="text-2xl font-black text-white">${pkg.price.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400">flat rate</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                          {pkg.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-300">
                              <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span>{pkg.turnaroundDays}d turnaround</span>
                        </span>
                        {pkg.includesWhitelisting && (
                          <span className="text-indigo-400 font-semibold">+{pkg.whitelistingDays}d Whitelisting</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* One-Sheet Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
                <span>Certified by Creator's Intelligence OS • Live API Grounded</span>
                <span className="text-[10px]">Updated {new Date(mediaKit.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART PITCH & LOWBALL COUNTER-OFFER GENERATOR */}
      {activeTab === 'pitch_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pitch Generator Configuration */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0b0e17] rounded-xl p-5 border border-white/[0.06] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>Negotiation Parameters</span>
              </span>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Target Brand / Sponsor</label>
                  <input
                    type="text"
                    value={pitchBrand}
                    onChange={(e) => setPitchBrand(e.target.value)}
                    className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Notion, NordVPN, Sony"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Pitch Strategy / Scenario</label>
                  <select
                    value={pitchType}
                    onChange={(e) => setPitchType(e.target.value as PitchType)}
                    className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="counter_offer_lowball">Lowball Defense (Brand offered below rate)</option>
                    <option value="cold_outreach">Cold Outreach (Propose new sponsorship)</option>
                    <option value="agency_intro">Agency One-Sheet (Media buyer roster)</option>
                    <option value="follow_up_gentle">48h / 7d Gentle Bump</option>
                    <option value="deliverable_handover">Publication Handover & Invoice</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Tone & Communication Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPitchTone('assertive_commercial')}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition ${
                        pitchTone === 'assertive_commercial'
                          ? 'bg-purple-500/20 border-purple-500/50 text-white'
                          : 'bg-[#121622] border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">Commercial Assertive</div>
                      <div className="text-[9px] text-slate-500">Firm on pricing floor</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPitchTone('creative_partner')}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition ${
                        pitchTone === 'creative_partner'
                          ? 'bg-purple-500/20 border-purple-500/50 text-white'
                          : 'bg-[#121622] border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">Creative Partner</div>
                      <div className="text-[9px] text-slate-500">Collaborative & flexible</div>
                    </button>
                  </div>
                </div>

                {pitchType === 'counter_offer_lowball' && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                    <div>
                      <label className="text-[10px] font-medium text-rose-400 block mb-1">Their Lowball Offer ($)</label>
                      <input
                        type="number"
                        value={offeredRate}
                        onChange={(e) => setOfferedRate(Number(e.target.value))}
                        className="w-full bg-[#121622] border border-rose-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-emerald-400 block mb-1">Your Target Rate ($)</label>
                      <input
                        type="number"
                        value={targetRate}
                        onChange={(e) => setTargetRate(Number(e.target.value))}
                        className="w-full bg-[#121622] border border-emerald-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">Deliverable Scope</label>
                  <input
                    type="text"
                    value={deliverable}
                    onChange={(e) => setDeliverable(e.target.value)}
                    className="w-full bg-[#121622] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Tactical Tip Box */}
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-purple-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Negotiation Intel</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{pitchResult.tacticalTip}</p>
              <div className="text-[10px] font-mono text-purple-400 pt-1">
                Suggested Follow-up Window: {pitchResult.suggestedFollowUpDays} business days
              </div>
            </div>
          </div>

          {/* Generated Email Draft & Quick CRM Action */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#0b0e17] rounded-xl p-5 border border-white/[0.08] space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ready-to-Send Email Script</span>
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyPitch}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white flex items-center space-x-1.5 transition"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy Script'}</span>
                  </button>

                  {onSendToCRM && (
                    <button
                      onClick={() => onSendToCRM(pitchBrand, targetRate)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5 transition shadow"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Add to Sponsorship CRM</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Email Subject Line */}
              <div className="p-3 rounded-lg bg-[#121622] border border-white/[0.06] text-xs">
                <span className="text-slate-500 font-mono text-[10px] block uppercase">Subject Line</span>
                <span className="font-semibold text-white mt-0.5 block">{pitchResult.subjectLine}</span>
              </div>

              {/* Email Body Preview */}
              <div className="p-4 rounded-lg bg-[#0e111a] border border-white/[0.06] text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans select-all">
                {pitchResult.emailBody}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Brand Sponsor */}
      {showAddBrandModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f121d] border border-white/[0.12] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Add Verified Sponsor to Media Kit</span>
            </h3>

            <form onSubmit={handleCreateBrand} className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NordVPN, Figma, Raycast"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="w-full bg-[#161a29] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Category / Sector</label>
                <input
                  type="text"
                  value={newBrandCategory}
                  onChange={(e) => setNewBrandCategory(e.target.value)}
                  className="w-full bg-[#161a29] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Campaign Type</label>
                <input
                  type="text"
                  value={newBrandCampaign}
                  onChange={(e) => setNewBrandCampaign(e.target.value)}
                  className="w-full bg-[#161a29] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">Metric Highlight (Proof of ROI)</label>
                <input
                  type="text"
                  placeholder="e.g. 520 signups, 140k views, 9.4% CTR"
                  value={newBrandMetric}
                  onChange={(e) => setNewBrandMetric(e.target.value)}
                  className="w-full bg-[#161a29] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBrandModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
