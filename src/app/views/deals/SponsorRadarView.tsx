import React, { useState, useEffect, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  Copy,
  ExternalLink,
  ChevronRight,
  Globe,
  Sliders,
  Sparkles,
  DollarSign,
  Send,
  Building2,
  UserCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultSponsorsRepository } from '@/shared/repositories/sponsorsRepository';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import { BrandSponsor } from '@/shared/types';
import { SurfaceCard } from '@/shared/components/motion';

interface SponsorRadarViewProps {
  onPitchCreated?: (brand: string, value: number) => void;
}

export const SponsorRadarView: React.FC<SponsorRadarViewProps> = ({ onPitchCreated }) => {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [sponsors, setSponsors] = useState<BrandSponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGeo, setSelectedGeo] = useState<string>('All');
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>(null);

  // Pitch Inspector Form State
  const [proposedRate, setProposedRate] = useState<number>(2500);
  const [customPitchText, setCustomPitchText] = useState<string>('');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    defaultSponsorsRepository.fetchSponsors().then((data) => {
      setSponsors(data);
      if (data.length > 0) {
        setSelectedSponsorId(data[0].id);
      }
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Hardware', 'VPN / Security', 'Productivity / SaaS', 'Fintech', 'Gaming'];
  const geos = ['All', 'US', 'Kenya', 'Tanzania', 'UK', 'Global'];

  const filteredSponsors = useMemo(() => {
    return sponsors.filter((sponsor) => {
      const matchesSearch =
        !searchQuery.trim() ||
        sponsor.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sponsor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sponsor.recentCampaignSummary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || sponsor.category === selectedCategory;
      const matchesGeo =
        selectedGeo === 'All' ||
        sponsor.targetGeos.includes(selectedGeo) ||
        sponsor.targetGeos.includes('Global');
      return matchesSearch && matchesCat && matchesGeo;
    });
  }, [sponsors, searchQuery, selectedCategory, selectedGeo]);

  const selectedSponsor = useMemo(() => {
    return sponsors.find((s) => s.id === selectedSponsorId) || filteredSponsors[0] || null;
  }, [sponsors, selectedSponsorId, filteredSponsors]);

  // Sync pitch draft whenever selected sponsor changes
  useEffect(() => {
    if (selectedSponsor) {
      const channelName = profile.channelName || 'Creator Studio';
      const subCount = (profile.subscriberCount || 52000).toLocaleString();
      const nicheName = profile.niche || 'practical tech & workflows';

      // Parse suggested budget midpoint from budget tier (e.g., "$3k - $8k" -> 5500)
      let parsedBudget = 2500;
      if (selectedSponsor.budgetTier.includes('$8k - $20k')) parsedBudget = 12000;
      else if (selectedSponsor.budgetTier.includes('$3k - $8k')) parsedBudget = 5500;
      else if (selectedSponsor.budgetTier.includes('$1k - $3k')) parsedBudget = 2000;
      else if (selectedSponsor.budgetTier.includes('$20k+')) parsedBudget = 25000;
      setProposedRate(parsedBudget);

      const contactFirstName = selectedSponsor.contactPerson.split(',')[0].split(' ')[0] || 'Team';
      setCustomPitchText(
        `Hi ${contactFirstName},\n\nI run ${channelName}, an engaged channel with ${subCount}+ active audience members focused on ${nicheName}. I noticed ${selectedSponsor.brandName}'s recent focus on authentic creator integrations.\n\nOur audience matches ${selectedSponsor.brandName}'s target demographic (${selectedSponsor.targetGeos.join(', ')}), with an average 6.2 comments per 1k views. We'd love to produce a dedicated 60-second integration featuring ${selectedSponsor.preferredFormats[0] || '1x YouTube 60s Integration'}.\n\nWould you be open to seeing our media kit and demographic breakdown for next month?\n\nBest,\n${channelName}`
      );
    }
  }, [selectedSponsor, profile]);

  const handleCopyPitch = () => {
    if (!customPitchText) return;
    navigator.clipboard.writeText(customPitchText);
    setCopiedPitch(true);
    toast.success('Pitch email copied to clipboard!');
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    toast.success(`Copied ${email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSaveToCRM = () => {
    if (!selectedSponsor) return;
    if (onPitchCreated) {
      onPitchCreated(selectedSponsor.brandName, proposedRate);
    }
    toast.success(`Created $${proposedRate.toLocaleString()} deal for ${selectedSponsor.brandName} in Deal Pipeline CRM!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-5 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Problem #4: Finding Consistent Sponsorships Is Difficult</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sponsor Radar (Brand Discovery Engine)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Discovers active brands actively buying integrations in your niche and audience geography with verified leads and instant pitch composition.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <SurfaceCard className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands by name, category, or campaign focus..."
              className="w-full bg-[#0c0e14] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition font-mono"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Showing {filteredSponsors.length} Verified Paying Brands</span>
          </div>
        </div>

        {/* Category & Geo Filter Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.05]">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-mono">Category:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  selectedCategory === cat
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-semibold'
                    : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden lg:block h-4 w-px bg-white/[0.08] mx-2" />

          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mr-1">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono">Audience Geo:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {geos.map((geo) => (
              <button
                key={geo}
                onClick={() => setSelectedGeo(geo)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  selectedGeo === geo
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {geo}
              </button>
            ))}
          </div>
        </div>
      </SurfaceCard>

      {/* Raycast 2-Pane Split Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane (58%): Searchable Brand Directory List */}
        <div className="lg:col-span-7 space-y-2.5">
          {loading ? (
            <div className="py-20 text-center text-slate-500 text-xs font-mono">
              Scanning active brand sponsorship feeds...
            </div>
          ) : filteredSponsors.length === 0 ? (
            <SurfaceCard className="p-8 text-center text-slate-400 text-xs font-mono space-y-2">
              <Building2 className="w-8 h-8 text-slate-600 mx-auto" />
              <p>No verified brands matched your search or demographic filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedGeo('All');
                  setSearchQuery('');
                }}
                className="text-indigo-400 hover:underline text-[11px]"
              >
                Reset filters
              </button>
            </SurfaceCard>
          ) : (
            filteredSponsors.map((sponsor) => {
              const isSelected = selectedSponsor?.id === sponsor.id;
              return (
                <SurfaceCard
                  key={sponsor.id}
                  onClick={() => setSelectedSponsorId(sponsor.id)}
                  className={`p-4 cursor-pointer transition-all duration-150 relative ${
                    isSelected
                      ? '!border-indigo-500/50 bg-[#0d101a] shadow-[0_0_20px_rgba(99,102,241,0.12)]'
                      : 'hover:border-white/[0.14] hover:bg-[#0c0e14]'
                  }`}
                >
                  {/* Left Active Glow Indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="sponsorActiveBar"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.25 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="text-2xl w-10 h-10 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-center shrink-0">
                        {sponsor.logo}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-bold text-white truncate">{sponsor.brandName}</h3>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                              sponsor.fitScore === 'High fit'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 font-semibold'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                            }`}
                          >
                            {sponsor.audienceMatchPercent}% Match
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                          <span>{sponsor.category}</span>
                          <span>•</span>
                          <span className="font-mono text-emerald-400 font-semibold">{sponsor.budgetTier}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 text-slate-500 group-hover:text-slate-300">
                      <span className="text-[10px] font-mono hidden sm:inline text-slate-500">
                        {sponsor.preferredFormats[0]}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2.5 line-clamp-1 leading-relaxed">
                    {sponsor.recentCampaignSummary}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.04] text-[10px] font-mono text-slate-500">
                    <div className="flex items-center space-x-1.5 truncate">
                      <span>Target:</span>
                      {sponsor.targetGeos.map((g) => (
                        <span key={g} className="px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">
                          {g}
                        </span>
                      ))}
                    </div>
                    <span className="text-slate-400 truncate max-w-[180px]">
                      👤 {sponsor.contactPerson.split(',')[0]}
                    </span>
                  </div>
                </SurfaceCard>
              );
            })
          )}
        </div>

        {/* Right Pane (42%): Persistent Raycast Inspector Panel */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          {selectedSponsor ? (
            <SurfaceCard className="p-6 space-y-5">
              {/* Brand Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="text-3xl p-2 rounded-2xl bg-black/60 border border-white/[0.08]">
                    {selectedSponsor.logo}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedSponsor.brandName}</h2>
                    <p className="text-xs text-slate-400">{selectedSponsor.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Audience Fit</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {selectedSponsor.fitScore} ({selectedSponsor.audienceMatchPercent}%)
                  </span>
                </div>
              </div>

              {/* Verified Contact Lead Card */}
              <div className="bg-[#07090e] rounded-xl p-3.5 border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center space-x-1 text-slate-300 font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Verified Lead Contact</span>
                  </span>
                  <span className="text-emerald-400 text-[10px]">Active Inquiries</span>
                </div>
                <div className="text-xs font-semibold text-white">{selectedSponsor.contactPerson}</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-indigo-300 truncate max-w-[200px]">
                    {selectedSponsor.contactEmail}
                  </span>
                  <button
                    onClick={() => handleCopyEmail(selectedSponsor.contactEmail)}
                    className="px-2 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-[10px] font-mono text-slate-300 flex items-center space-x-1 transition"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                  </button>
                </div>
              </div>

              {/* Campaign Intel Details */}
              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Campaign Strategy & Requirements
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 leading-relaxed text-slate-300 text-[11px]">
                  <p>{selectedSponsor.recentCampaignSummary}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px] font-mono">
                    <span className="text-slate-500">Typical Deal Tier:</span>
                    <span className="text-emerald-400 font-bold">{selectedSponsor.budgetTier}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Preferred Formats:</span>
                    <span className="text-white">{selectedSponsor.preferredFormats.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Commercial Pitch Composer */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Tailored Pitch Proposal</span>
                  </label>
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="text-[10px] font-mono text-slate-500">Proposed Rate:</span>
                    <div className="flex items-center text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <span>$</span>
                      <input
                        type="number"
                        value={proposedRate}
                        onChange={(e) => setProposedRate(Number(e.target.value))}
                        className="w-16 bg-transparent text-emerald-400 text-xs font-mono font-bold text-right focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <textarea
                  rows={7}
                  value={customPitchText}
                  onChange={(e) => setCustomPitchText(e.target.value)}
                  className="w-full bg-[#07090e] border border-white/[0.08] rounded-xl p-3 text-[11px] text-slate-200 font-sans leading-relaxed resize-none focus:outline-none focus:border-indigo-500/50 transition"
                  placeholder="Tailored pitch email..."
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleCopyPitch}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center space-x-1.5 transition"
                >
                  {copiedPitch ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPitch ? 'Copied Pitch!' : 'Copy Pitch'}</span>
                </button>

                <button
                  onClick={handleSaveToCRM}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white flex items-center justify-center space-x-1.5 shadow-md shadow-brand-500/20 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Add to CRM</span>
                </button>
              </div>
            </SurfaceCard>
          ) : (
            <SurfaceCard className="p-10 text-center text-slate-500 text-xs font-mono">
              Select any brand sponsor on the left to inspect verified contacts and generate a commercial pitch.
            </SurfaceCard>
          )}

          {/* Raycast Action Bar Legend */}
          <div className="px-4 py-2.5 rounded-xl bg-[#090b12] border border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <div className="flex items-center space-x-3">
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">↵</kbd> Select
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">⌘C</kbd> Copy Email
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">⌘↵</kbd> Add CRM
              </span>
            </div>
            <div className="text-indigo-400">Raycast 2-Pane</div>
          </div>
        </div>
      </div>
    </div>
  );
};
