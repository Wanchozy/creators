import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Globe,
  Sliders
} from 'lucide-react';
import { defaultSponsorsRepository } from '@/shared/repositories/sponsorsRepository';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import { BrandSponsor } from '@/shared/types';

export const SponsorRadarView: React.FC<{ onPitchCreated?: (brand: string, value: number) => void }> = ({ onPitchCreated }) => {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [sponsors, setSponsors] = useState<BrandSponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGeo, setSelectedGeo] = useState<string>('All');
  const [activePitchModal, setActivePitchModal] = useState<BrandSponsor | null>(null);
  const [customPitchText, setCustomPitchText] = useState<string>('');

  React.useEffect(() => {
    defaultSponsorsRepository.fetchSponsors().then((data) => {
      setSponsors(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Hardware', 'VPN / Security', 'Productivity / SaaS', 'Fintech', 'Gaming'];
  const geos = ['All', 'US', 'Kenya', 'Tanzania', 'UK', 'Global'];

  const filteredSponsors = sponsors.filter((sponsor) => {
    const matchesCat = selectedCategory === 'All' || sponsor.category === selectedCategory;
    const matchesGeo =
      selectedGeo === 'All' ||
      sponsor.targetGeos.includes(selectedGeo) ||
      sponsor.targetGeos.includes('Global');
    return matchesCat && matchesGeo;
  });

  const openPitchModal = (sponsor: BrandSponsor) => {
    setActivePitchModal(sponsor);
    const channelName = profile.channelName || 'Creator Studio';
    const subCount = (profile.subscriberCount || 52000).toLocaleString();
    const nicheName = profile.niche || 'practical workflows and tech';

    setCustomPitchText(
      `Hi ${sponsor.contactPerson.split(',')[0].split(' ')[0]},\n\nI run ${channelName}, an engaged channel with ${subCount}+ active audience members focused on ${nicheName}. I noticed ${sponsor.brandName}'s recent campaign supporting authentic creator integrations.\n\nOur audience matches ${sponsor.brandName}'s target demographic (${sponsor.targetGeos.join(', ')}), with an average 6.2 comments per 1k views. We'd love to produce a dedicated 60-second integration featuring ${sponsor.preferredFormats[0] || '1x YouTube 60s Integration'}.\n\nWould you be open to seeing our media kit and demographic breakdown for next month?\n\nBest,\n${channelName}`
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Problem #4: Finding Consistent Sponsorships Is Difficult</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Sponsor Radar (Brand Discovery Engine)</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Discovers active brands actively buying integrations in your niche and audience geography. "The discovery is the valuable part."
        </p>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Filter className="w-4 h-4 text-brand-400" />
            <span className="font-semibold">Match By Audience Demographics:</span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing {filteredSponsors.length} Verified Active Sponsors
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Content Category:</label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                    selectedCategory === cat
                      ? 'border-brand-500 bg-brand-500/20 text-brand-300 font-bold'
                      : 'border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Target Audience Region / Geography:</label>
            <div className="flex flex-wrap gap-1.5">
              {geos.map((geo) => (
                <button
                  key={geo}
                  onClick={() => setSelectedGeo(geo)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                    selectedGeo === geo
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                      : 'border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {geo}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Sponsor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {sponsor.logo}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{sponsor.brandName}</h3>
                    <div className="text-xs text-slate-400">{sponsor.category}</div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    sponsor.fitScore === 'High fit'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {sponsor.fitScore} ({sponsor.audienceMatchPercent}% match)
                </span>
              </div>

              <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-400">Recent Campaigns: </span>
                  {sponsor.recentCampaignSummary}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-slate-400 font-medium">Target Geos:</span>
                  {sponsor.targetGeos.map((g, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-400">Typical Deal Budget:</span>
                  <span className="font-mono font-bold text-emerald-400">{sponsor.budgetTier}</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Direct Contact: </span>
                {sponsor.contactPerson} ({sponsor.contactEmail})
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Preferred: {sponsor.preferredFormats[0]}
              </span>
              <button
                onClick={() => openPitchModal(sponsor)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Create Pitch</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tailored Pitch Generator Modal */}
      {activePitchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-400" />
                <h3 className="text-sm font-bold text-white">
                  Tailored Pitch for {activePitchModal.brandName}
                </h3>
              </div>
              <button onClick={() => setActivePitchModal(null)} className="text-slate-400 hover:text-white text-xs">
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-slate-300 flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span>To: <strong className="text-white">{activePitchModal.contactEmail}</strong></span>
                <span className="text-slate-400">{activePitchModal.contactPerson}</span>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Custom Pitch Email Draft</label>
                <textarea
                  rows={8}
                  value={customPitchText}
                  onChange={(e) => setCustomPitchText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-sans leading-relaxed resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-400">
                Estimated Fit: <strong className="text-emerald-400">{activePitchModal.fitScore}</strong>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(customPitchText);
                    toast.success('Pitch email draft copied to clipboard!');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Copy Text
                </button>
                <button
                  onClick={() => {
                    if (onPitchCreated) {
                      onPitchCreated(activePitchModal.brandName, 1500);
                    }
                    setActivePitchModal(null);
                    toast.success(`Created deal for ${activePitchModal.brandName} in Deal Pipeline CRM!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold"
                >
                  Save to CRM Pipeline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
