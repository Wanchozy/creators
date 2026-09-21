import { Platform } from './common';

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
