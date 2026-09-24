import {
  MediaKitProfile,
  AudienceDemographics,
  RateCardPackage,
  UserProfile,
} from '@/shared/types';
import { calculateCreatorDealRate } from './rateCalculatorEngine';

interface AudienceReachCalculationInput {
  platforms?: MediaKitProfile['platforms'];
  demographics?: AudienceDemographics;
  totalReach?: number;
  avgViews30d?: number;
}

interface AudienceReachCalculationOutput {
  totalReach: number;
  avgViews30d: number;
  tier1Percentage: number;
}

/**
 * Calculates blended audience metrics and Tier-1 purchasing power index.
 */
export function calculateAudienceReach(
  creatorProfile: AudienceReachCalculationInput
): AudienceReachCalculationOutput {
  const activePlatforms = creatorProfile.platforms || [];

  const calculatedTotalReach = activePlatforms.reduce(
    (accumulatedFollowers, platformStat) => accumulatedFollowers + (platformStat.followers || 0),
    0
  );

  const calculatedAvgViews = activePlatforms.reduce(
    (accumulatedViews, platformStat) => accumulatedViews + (platformStat.avgViews || 0),
    0
  );

  const tier1CountryCodes = new Set(['US', 'GB', 'CA', 'AU', 'DE', 'NL']);
  const demographicCountries = creatorProfile.demographics?.topCountries || [];

  const tier1AudiencePercentage = demographicCountries
    .filter(
      (countryMetric) =>
        tier1CountryCodes.has(countryMetric.code.toUpperCase()) || countryMetric.cpmTier === 'Tier 1'
    )
    .reduce(
      (accumulatedPercentage, countryMetric) => accumulatedPercentage + countryMetric.percentage,
      0
    );

  const resolvedTotalReach =
    calculatedTotalReach > 0 ? calculatedTotalReach : creatorProfile.totalReach || 45000;
  const resolvedAvgViews =
    calculatedAvgViews > 0 ? calculatedAvgViews : creatorProfile.avgViews30d || 18500;

  return {
    totalReach: resolvedTotalReach,
    avgViews30d: resolvedAvgViews,
    tier1Percentage: Math.min(100, Math.round(tier1AudiencePercentage || 65)),
  };
}

/**
 * Synthesizes standard 3-tier sponsorship packages derived from verified channel benchmarks.
 */
export function generateRecommendedRatePackages(
  averageMonthlyViews: number,
  contentNiche: string = 'Tech'
): RateCardPackage[] {
  const normalizedViews = Math.max(1000, averageMonthlyViews || 20000);
  const estimatedFollowerAccess = Math.round(normalizedViews * 2.5);

  // Package 1: Starter Short/Shoutout
  const shortRateQuote = calculateCreatorDealRate({
    platform: 'youtube',
    contentType: 'short_form',
    avgViews: normalizedViews,
    creatorFollowers: estimatedFollowerAccess,
    category: contentNiche,
    brandCanRepost: true,
    paidAdvertisingRights: false,
    licensingMonths: 0,
    exclusivityDays: 0,
    turnaroundRush: false,
  });

  // Package 2: Standard 60s Integration (Most Popular)
  const integrationRateQuote = calculateCreatorDealRate({
    platform: 'youtube',
    contentType: 'integration_60s',
    avgViews: normalizedViews,
    creatorFollowers: estimatedFollowerAccess,
    category: contentNiche,
    brandCanRepost: true,
    paidAdvertisingRights: true,
    licensingMonths: 1,
    exclusivityDays: 14,
    turnaroundRush: false,
  });

  // Package 3: Premium Multi-Platform Omnichannel Partnership
  const dedicatedRateQuote = calculateCreatorDealRate({
    platform: 'youtube',
    contentType: 'dedicated_video',
    avgViews: normalizedViews,
    creatorFollowers: estimatedFollowerAccess,
    category: contentNiche,
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
      price: shortRateQuote.recommendedPrice,
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
      price: integrationRateQuote.recommendedPrice,
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
      price: Math.round(dedicatedRateQuote.recommendedPrice * 1.35),
      turnaroundDays: 14,
      includesWhitelisting: true,
      whitelistingDays: 90,
    },
  ];
}

/**
 * Creates default initial Media Kit profile based on authenticated user settings.
 */
export function createDefaultMediaKit(userProfile?: Partial<UserProfile>): MediaKitProfile {
  const resolvedAverageViews = userProfile?.averageViews || 18500;
  const resolvedSubscriberCount = userProfile?.subscriberCount || 42000;
  const resolvedChannelName = userProfile?.channelName || 'Creator Studio';
  const resolvedNiche = userProfile?.niche || 'Technology & Creator Economy';
  const resolvedPrimaryPlatform = userProfile?.primaryPlatform || 'youtube';

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

  const channelSlug = resolvedChannelName.toLowerCase().replace(/[^a-z0-9]/g, '');

  return {
    id: 'default-kit',
    channelName: resolvedChannelName,
    handle: `@${channelSlug || 'creatorstudio'}`,
    tagline: 'High-signal technical breakdowns and product deep-dives.',
    bio: 'Partnering with forward-thinking SaaS, developer, and productivity brands. We build engaged audiences around practical workflows and clear software utility.',
    niche: resolvedNiche,
    contactEmail: `business@${channelSlug || 'creator'}.com`,
    verifiedBadge: true,
    totalReach: resolvedSubscriberCount,
    avgViews30d: resolvedAverageViews,
    avgEngagementRate: 6.4,
    platforms: [
      {
        platform: resolvedPrimaryPlatform,
        handle: `@${channelSlug || 'creatorstudio'}`,
        followers: resolvedSubscriberCount,
        avgViews: resolvedAverageViews,
        engagementRate: 6.4,
      },
      {
        platform: 'tiktok',
        handle: `@${channelSlug || 'creatorstudio'}_clips`,
        followers: Math.round(resolvedSubscriberCount * 0.4),
        avgViews: Math.round(resolvedAverageViews * 1.8),
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
    ratePackages: generateRecommendedRatePackages(resolvedAverageViews, resolvedNiche),
    updatedAt: new Date().toISOString(),
  };
}
