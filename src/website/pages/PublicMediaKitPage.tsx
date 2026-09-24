import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Users,
  Globe,
  Mail,
  CheckCircle2,
  Copy,
  ExternalLink,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { hasSupabaseConfig, getSupabase } from '@/shared/config/supabase';
import { mockMediaKitProfile } from '@/shared/data/mockData';
import type { MediaKitProfile } from '@/shared/types';

interface PublicMediaKitPageProps {
  handle: string;
}

export const PublicMediaKitPage: React.FC<PublicMediaKitPageProps> = ({ handle }) => {
  const [mediaKit, setMediaKit] = useState<MediaKitProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPublicKit() {
      setLoading(true);
      setNotFound(false);

      // If Supabase is configured, try to fetch by handle
      if (hasSupabaseConfig()) {
        try {
          const { data, error } = await getSupabase()
            .from('media_kits')
            .select('*')
            .eq('handle', `@${handle}`)
            .maybeSingle();

          if (!error && data) {
            // Map database row to MediaKitProfile shape
            setMediaKit({
              id: data.id || 'kit-public',
              channelName: data.channel_name || handle,
              handle: data.handle || `@${handle}`,
              tagline: data.tagline || '',
              bio: data.bio || '',
              niche: data.niche || '',
              contactEmail: data.contact_email || '',
              avatarUrl: data.avatar_url,
              verifiedBadge: Boolean(data.verified_badge ?? true),
              totalReach: Number(data.total_reach ?? 0),
              avgViews30d: Number(data.avg_views_30d ?? 0),
              avgEngagementRate: Number(data.avg_engagement_rate ?? 0),
              platforms: Array.isArray(data.platforms) ? data.platforms : [],
              demographics: data.demographics || { topCountries: [], ageSplit: [], genderSplit: { male: 0, female: 0, other: 0 } },
              pastBrands: Array.isArray(data.past_brands) ? data.past_brands : [],
              ratePackages: Array.isArray(data.rate_packages) ? data.rate_packages : [],
              customPitchLink: data.custom_pitch_link,
              updatedAt: data.updated_at || new Date().toISOString(),
            });
            setLoading(false);
            return;
          }
        } catch {
          // Fall through to demo fallback
        }
      }

      // Fallback: If the handle matches the mock profile handle, show demo data
      const mockHandle = mockMediaKitProfile.handle.replace('@', '');
      if (handle.toLowerCase() === mockHandle.toLowerCase()) {
        setMediaKit(mockMediaKitProfile);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }

    fetchPublicKit();
  }, [handle]);

  const handleCopyEmail = () => {
    if (mediaKit?.contactEmail) {
      navigator.clipboard.writeText(mediaKit.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-slate-400 font-mono">Loading media kit...</p>
        </div>
      </div>
    );
  }

  // --- Not Found State ---
  if (notFound || !mediaKit) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-slate-500" />
          </div>
          <h1 className="text-xl font-bold text-white">Media Kit Not Found</h1>
          <p className="text-sm text-slate-400">
            The creator <span className="font-mono text-indigo-400">@{handle}</span> hasn't published their media kit yet, or the link may be incorrect.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition"
          >
            <span>Go to Creator's</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // --- Public Media Kit One-Sheet ---
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-white/[0.06] bg-[#0a0c12]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-400 group-hover:text-white transition">
              Creator's
            </span>
          </a>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded border border-white/[0.06]">
            Public Media Kit
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Creator Identity Card */}
        <section className="bg-[#0c0e14] rounded-2xl border border-white/[0.08] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg shadow-indigo-500/20">
              {(mediaKit.channelName || 'C')[0].toUpperCase()}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {mediaKit.channelName}
                </h1>
                {mediaKit.verifiedBadge && (
                  <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-400 font-mono">{mediaKit.handle}</p>
              {mediaKit.tagline && (
                <p className="text-sm text-slate-300 leading-relaxed">{mediaKit.tagline}</p>
              )}
              {mediaKit.bio && (
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{mediaKit.bio}</p>
              )}
            </div>

            {/* Contact CTA */}
            {mediaKit.contactEmail && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 transition shrink-0 shadow-lg shadow-indigo-500/20"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Contact Creator</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/[0.06]">
            <div className="bg-[#07090e] rounded-xl p-3 border border-white/[0.05]">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Total Reach</div>
              <div className="text-lg font-bold text-white mt-0.5">{mediaKit.totalReach.toLocaleString()}</div>
            </div>
            <div className="bg-[#07090e] rounded-xl p-3 border border-white/[0.05]">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Avg Views / 30d</div>
              <div className="text-lg font-bold text-white mt-0.5">{mediaKit.avgViews30d.toLocaleString()}</div>
            </div>
            <div className="bg-[#07090e] rounded-xl p-3 border border-white/[0.05]">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Engagement</div>
              <div className="text-lg font-bold text-white mt-0.5">{mediaKit.avgEngagementRate}%</div>
            </div>
            <div className="bg-[#07090e] rounded-xl p-3 border border-white/[0.05]">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Niche</div>
              <div className="text-sm font-bold text-indigo-300 mt-1">{mediaKit.niche || '—'}</div>
            </div>
          </div>
        </section>

        {/* Platform Breakdown */}
        {mediaKit.platforms.length > 0 && (
          <section className="bg-[#0c0e14] rounded-2xl border border-white/[0.08] p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Platform Breakdown</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mediaKit.platforms.map((p) => (
                <div key={p.platform} className="bg-[#07090e] rounded-xl p-4 border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white capitalize">{p.platform}</span>
                    <span className="text-[10px] font-mono text-slate-400">{p.handle}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] text-slate-500">Followers</div>
                      <div className="text-xs font-bold text-white">{p.followers.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Avg Views</div>
                      <div className="text-xs font-bold text-white">{p.avgViews.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Eng. Rate</div>
                      <div className="text-xs font-bold text-emerald-400">{p.engagementRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Audience Demographics */}
        {mediaKit.demographics?.topCountries?.length > 0 && (
          <section className="bg-[#0c0e14] rounded-2xl border border-white/[0.08] p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Audience Demographics</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Top Countries */}
              <div className="space-y-2">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Top Countries</div>
                <div className="space-y-1.5">
                  {mediaKit.demographics.topCountries.map((c) => (
                    <div key={c.code} className="flex items-center justify-between bg-[#07090e] rounded-lg px-3 py-2 border border-white/[0.04]">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{c.country}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          c.cpmTier === 'Tier 1' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          c.cpmTier === 'Tier 2' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}>{c.cpmTier}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-300">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Split */}
              {mediaKit.demographics.ageSplit?.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Age Distribution</div>
                  <div className="space-y-1.5">
                    {mediaKit.demographics.ageSplit.map((a) => (
                      <div key={a.range} className="flex items-center space-x-3 bg-[#07090e] rounded-lg px-3 py-2 border border-white/[0.04]">
                        <span className="text-xs font-bold text-white w-16">{a.range}</span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${a.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-slate-300 w-10 text-right">{a.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Verified Sponsor Track Record */}
        {mediaKit.pastBrands.length > 0 && (
          <section className="bg-[#0c0e14] rounded-2xl border border-white/[0.08] p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Verified Sponsor Track Record</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mediaKit.pastBrands.map((brand) => (
                <div key={brand.id} className="bg-[#07090e] rounded-xl p-4 border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{brand.name}</span>
                    {brand.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">{brand.category} — {brand.campaignType}</div>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/15 inline-block">
                    {brand.metricHighlight}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rate Packages */}
        {mediaKit.ratePackages.length > 0 && (
          <section className="bg-[#0c0e14] rounded-2xl border border-white/[0.08] p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-indigo-400" />
              <span>Sponsorship Packages</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mediaKit.ratePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-[#07090e] rounded-xl p-5 border space-y-3 relative ${
                    pkg.isPopular
                      ? 'border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                      : 'border-white/[0.05]'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-indigo-500 text-[9px] font-bold text-white uppercase tracking-wider shadow">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-white">{pkg.name}</div>
                    {pkg.badge && !pkg.isPopular && (
                      <span className="text-[9px] font-mono text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] mt-1 inline-block">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    ${pkg.price.toLocaleString()}
                  </div>
                  <ul className="space-y-1.5">
                    {pkg.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start space-x-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-white/[0.04]">
                    <span>{pkg.turnaroundDays}-day turnaround</span>
                    {pkg.includesWhitelisting && (
                      <span className="text-indigo-400">{pkg.whitelistingDays}d whitelisting</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-8 space-y-3">
          {mediaKit.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold flex items-center space-x-2 mx-auto transition shadow-lg shadow-indigo-500/20"
            >
              <Mail className="w-4 h-4" />
              <span>{copiedEmail ? 'Email Copied!' : `Contact ${mediaKit.channelName}`}</span>
            </button>
          )}
          <div className="flex items-center justify-center space-x-2 pt-4">
            <a href="/" className="flex items-center space-x-1.5 text-[11px] text-slate-500 hover:text-slate-300 transition group">
              <div className="w-4 h-4 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              <span>Powered by <strong className="text-slate-400 group-hover:text-indigo-400 transition">Creator's</strong></span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};
