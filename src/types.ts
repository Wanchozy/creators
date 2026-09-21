export type Platform = 'youtube' | 'tiktok' | 'instagram';

// Problem 1: Algorithm Detective
export interface VideoDiagnostic {
  id: string;
  title: string;
  platform: Platform;
  uploadDate: string;
  views: number;
  expectedViews: number;
  ctr: number;
  channelAvgCtr: number;
  avdPercent: number;
  channelAvgAvd: number;
  retentionDropAt8s: number;
  first24hViews: number;
  status: 'critical_drop' | 'mild_underperform' | 'healthy' | 'viral';
  diagnoses: string[];
  possibleExperiments: string[];
  retentionTimeline: { second: number; retention: number }[];
}

// Problem 2: Creator Scientist
export interface PatternFactor {
  name: string;
  positiveCorrelation: boolean;
  frequencyInWinners: string;
  frequencyInLosers: string;
  insight: string;
}

export interface ChannelPatternAnalysis {
  sampleSize: number;
  topPerformersStats: {
    avgLength: string;
    hookStyle: string;
    faceAppearanceTiming: string;
    primaryTopics: string[];
    avgCommentsPer1k: number;
  };
  underperformersStats: {
    avgLength: string;
    hookStyle: string;
    introStyle: string;
    primaryTopics: string[];
    avgCommentsPer1k: number;
  };
  keyPatterns: PatternFactor[];
  strongestRecurringPattern: string;
}

// Problem 3: Originality & Copycat Monitor
export interface CopycatIncident {
  id: string;
  originalTitle: string;
  suspectChannel: string;
  suspectPlatform: Platform;
  suspectVideoTitle: string;
  similarityScore: number;
  detectedDate: string;
  isAiGeneratedChannel: boolean;
  matchType: 'identical_script' | 'cloned_concept' | 'reused_hook' | 'thumbnail_rip';
  status: 'alert' | 'investigating' | 'takedown_sent' | 'resolved';
}

// Problem 4: Sponsor Radar
export interface BrandSponsor {
  id: string;
  brandName: string;
  logo: string;
  category: 'Gaming' | 'Hardware' | 'VPN / Security' | 'Fintech' | 'Productivity / SaaS' | 'Lifestyle';
  fitScore: 'High fit' | 'Medium fit' | 'Low fit';
  audienceMatchPercent: number;
  targetGeos: string[];
  budgetTier: '$1k - $3k' | '$3k - $8k' | '$8k - $20k' | '$20k+';
  contactPerson: string;
  contactEmail: string;
  recentCampaignSummary: string;
  preferredFormats: string[];
}

// Problem 5: Creator Rate & Deal Calculator
export interface RateCalculationInput {
  platform: Platform;
  contentType: 'integration_60s' | 'dedicated_video' | 'ugc_ad' | 'short_form';
  avgViews: number;
  creatorFollowers: number;
  category: string;
  brandCanRepost: boolean;
  paidAdvertisingRights: boolean;
  exclusivityDays: number;
  licensingMonths: number;
  turnaroundRush: boolean;
}

export interface RateCalculationResult {
  minPrice: number;
  recommendedPrice: number;
  maxPrice: number;
  breakdown: {
    baseCreationFee: number;
    audienceAccessFee: number;
    paidUsageMarkup: number;
    exclusivityPremium: number;
    rushFee: number;
  };
  explanationPoints: string[];
}

// Problem 6: Pre-Publish Monetization Risk Scanner
export interface MonetizationRiskCheck {
  id: string;
  videoTitle: string;
  fileOrUrl: string;
  checkedAt: string;
  overallRisk: 'Low' | 'Medium' | 'High';
  metrics: {
    originalCommentaryScore: 'Low' | 'Medium' | 'High';
    originalNarrationScore: 'Low' | 'Medium' | 'High';
    thirdPartyFootageSeconds: number;
    repeatedFormatRisk: 'Low' | 'Medium' | 'High';
    potentialReusedContentRisk: 'Low' | 'Medium' | 'High';
  };
  potentialIssues: string[];
  platformComplianceNotes: string;
}

// Problem 7: Cross-Platform Change Tracker
export interface PlatformChangeNotice {
  id: string;
  platform: Platform;
  date: string;
  type: 'Monetization policy update' | 'Algorithm & discovery tweak' | 'Commercial disclosure rule' | 'New creator feature';
  title: string;
  summary: string;
  officialSource: string;
  actionRequired: boolean;
  affectedVideosCount: number;
  recommendedAdjustment: string;
}

// Problem 8: Content Recycler (Repurposing Studio)
export interface RepurposedClip {
  id: string;
  topic: string;
  timestampStart: string;
  timestampEnd: string;
  durationSeconds: number;
  viralityPotential: number; // 0-100
  hookQuote: string;
  suggestedFormats: ('TikTok' | 'Reels' | 'Shorts' | 'X post' | 'Carousel')[];
  status: 'suggested' | 'approved' | 'rejected' | 'exported';
}

// Problem 9: Creator Revenue Analytics (Qualified Views & RPM)
export interface RevenueAnalyticsData {
  timeframe: string;
  totalViews: number;
  qualifiedViews: number;
  disqualificationBreakdown: {
    under5Seconds: number;
    duplicateRepeat: number;
    commercialNonEligible: number;
    unsupportedRegion: number;
  };
  qualificationRatePercent: number;
  rpm: number;
  estimatedEarnings: number;
  rpmDrivers: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    note: string;
  }[];
}

// Problem 10: Sponsorship CRM Pipeline
export type DealStage = 'New' | 'Pitched' | 'Negotiating' | 'Active' | 'Delivered' | 'Paid';

export interface SponsorshipDeal {
  id: string;
  brandName: string;
  contactEmail: string;
  stage: DealStage;
  dealValue: number;
  deliverables: string[];
  deadline: string;
  usageRights: string;
  exclusivityWindow: string;
  paymentTerms: string; // e.g. "50% upfront, 50% after publication"
  paidAmount: number;
  notes: string;
  lastContactDate: string;
}
