import {
  MediaKitProfile,
  AudienceDemographics,
  RateCardPackage,
  UserProfile,
} from '@/shared/types';
import { calculateCreatorDealRate } from './rateCalculatorEngine';

/**
 * Calculates blended audience metrics and purchasing power index.
 */
export function calculateAudienceReach(profile: Partial<MediaKitProfile>): {
  totalReach: number;
  avgViews30d: number;
  tier1Percentage: number;
} {
  const platforms = profile.platforms || [];
  const totalReach = platforms.reduce((acc, p) => acc + (p.followers || 0), 0);
  const avgViews30d = platforms.reduce((acc, p) => acc + (p.avgViews || 0), 0);

  // Compute Tier 1 geography concentration (US, UK, CA, AU, DE)
  const tier1Countries = ['US', 'GB', 'CA', 'AU', 'DE', 'NL'];
  const demographics = profile.demographics;
  let tier1Percentage = 0;

  if (demographics?.topCountries) {
    tier1Percentage = demographics.topCountries
      .filter((c) => tier1Countries.includes(c.code.toUpperCase()) || c.cpmTier === 'Tier 1')
      .reduce((sum, c) => sum + c.percentage, 0);
  }

  return {
    totalReach: totalReach > 0 ? totalReach : profile.totalReach || 45000,
    avgViews30d: avgViews30d > 0 ? avgViews30d : profile.avgViews30d || 18500,
    tier1Percentage: Math.min(100, Math.round(tier1Percentage || 65)),
  };
}

/**
 * Automatically synthesizes standard 3-tier rate packages from creator's baseline stats
 */
export function generateRecommendedRatePackages(
  avgViews: number,
  niche: string = 'Tech'
): RateCardPackage[] {
  const views = Math.max(1000, avgViews || 20000);

  // Package 1: Starter Short/Shoutout
  const shortRate = calculateCreatorDealRate({
    platform: 'youtube',
    contentType: 'short_form',
    avgViews: views,
    creatorFollowers: Math.round(views * 2.5),
    category: niche,
    brandCanRepost: true,
    paidAdvertisingRights: false,
    licensingMonths: 0,
    exclusivityDays: 0,
    turnaroundRush: false,
  });

  // Package 2: Standard 60s Integration (Most Popular)
  const integrationRate = calculateCreatorDealRate({
    platform: 'youtube',
    contentType: 'integration_60s',
    avgViews: views,
    creatorFollowers: Math.round(views * 2.5),
    category: niche,
    brandCanRepost: true,
    paidAdvertisingRights: true,
    licensingMonths: 1,
    exclusivityDays: 14,
    turnaroundRush: false,
  });

  // Package 3: Premium Multi-Platform Omnichannel Partnership
  const dedicatedRate = calculateCreatorDealRate({
    platform: 'youtube',
    contentType: 'dedicated_video',
    avgViews: views,
    creatorFollowers: Math.round(views * 2.5),
    category: niche,
    brandCanRepost: true,
    paidAdvertisingRights: true,
    licensingMonths: 3,
    exclusivityDays: 30,
    turnaroundRush: false,
  });

  return [
    {
      id: 'pkg-short',
      name: 'High-Impact Short Integration',
      badge: 'Fast Turnaround',
      deliverables: [
        '1x 60s Vertical Short (YouTube / TikTok / Reels)',
        'Pinned comment with trackable CTA link',
        'Organic reposting permission (30 days)',
      ],
      price: shortRate.recommendedPrice,
      turnaroundDays: 4,
      includesWhitelisting: false,
      whitelistingDays: 0,
    },
    {
      id: 'pkg-standard',
      name: 'Mid-Roll Integration + Whitelisting',
      badge: 'Most Popular',
      deliverables: [
        '1x 60-90s Seamless Dedicated Mid-Roll Segment',
        'Custom verbal call-to-action & screen overlay',
        '30-day Paid Ad Whitelisting rights included',
        '14-day direct category exclusivity lockout',
      ],
      price: integrationRate.recommendedPrice,
      turnaroundDays: 7,
      includesWhitelisting: true,
      whitelistingDays: 30,
      isPopular: true,
    },
    {
      id: 'pkg-omnichannel',
      name: 'Full Campaign Showcase & 90-Day Rights',
      badge: 'Maximum Reach',
      deliverables: [
        '1x Dedicated Long-form deep dive / review',
        '2x Repurposed vertical teaser clips',
        '90-day multi-platform paid performance ad rights',
        '30-day complete category exclusivity',
        'Full analytics report & attribution delivery at 14 days',
      ],
      price: Math.round(dedicatedRate.recommendedPrice * 1.35),
      turnaroundDays: 14,
      includesWhitelisting: true,
      whitelistingDays: 90,
    },
  ];
}

/**
 * Creates default initial Media Kit profile based on authenticated user settings
 */
export function createDefaultMediaKit(userProfile?: Partial<UserProfile>): MediaKitProfile {
  const views = userProfile?.averageViews || 18500;
  const subs = userProfile?.subscriberCount || 42000;
  const channelName = userProfile?.channelName || 'Creator Studio';
  const niche = userProfile?.niche || 'Technology & Creator Economy';
  const platform = userProfile?.primaryPlatform || 'youtube';

  const defaultDemographics: AudienceDemographics = {
    topCountries: [
      { country: 'United States', code: 'US', percentage: 48, cpmTier: 'Tier 1' },
      { country: 'United Kingdom', code: 'GB', percentage: 18, cpmTier: 'Tier 1' },
      { country: 'Canada', code: 'CA', percentage: 12, cpmTier: 'Tier 1' },
      { country: 'Kenya', code: 'KE', percentage: 9, cpmTier: 'Tier 2' },
      { country: 'Germany', code: 'DE', percentage: 7, cpmTier: 'Tier 1' },
      { country: 'Other', code: 'WW', percentage: 6, cpmTier: 'Tier 3' },
    ],
    ageSplit: [
      { range: '18-24', percentage: 28 },
      { range: '25-34', percentage: 52 },
      { range: '35-44', percentage: 14 },
      { range: '45+', percentage: 6 },
    ],
    genderSplit: {
      male: 68,
      female: 30,
      other: 2,
    },
  };

  return {
    id: 'default-kit',
    channelName,
    handle: `@${channelName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    tagline: 'High-signal technical breakdowns and product deep-dives.',
    bio: `Partnering with forward-thinking SaaS, developer, and productivity brands. We build engaged audiences around practical workflows and clear software utility.`,
    niche,
    contactEmail: `business@${channelName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'creator'}.com`,
    verifiedBadge: true,
    totalReach: subs,
    avgViews30d: views,
    avgEngagementRate: 6.4,
    platforms: [
      {
        platform,
        handle: `@${channelName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        followers: subs,
        avgViews: views,
        engagementRate: 6.4,
      },
      {
        platform: 'tiktok',
        handle: `@${channelName.toLowerCase().replace(/[^a-z0-9]/g, '')}_clips`,
        followers: Math.round(subs * 0.4),
        avgViews: Math.round(views * 1.8),
        engagementRate: 8.2,
      },
    ],
    demographics: defaultDemographics,
    pastBrands: [
      {
        id: 'pb-1',
        name: 'NordVPN',
        category: 'Cybersecurity',
        campaignType: '60s Dedicated Mid-Roll',
        metricHighlight: '480+ converted signups, 142k views',
        verified: true,
      },
      {
        id: 'pb-2',
        name: 'Linear App',
        category: 'Developer Tools',
        campaignType: 'Workflow Integration',
        metricHighlight: '12.8% CTR on trackable link',
        verified: true,
      },
      {
        id: 'pb-3',
        name: 'Raycast',
        category: 'Productivity Software',
        campaignType: 'Short-Form Series',
        metricHighlight: '210k aggregate impressions',
        verified: true,
      },
    ],
    ratePackages: generateRecommendedRatePackages(views, niche),
    updatedAt: new Date().toISOString(),
  };
}
