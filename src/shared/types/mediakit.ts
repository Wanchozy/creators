import { Platform } from './common';

export interface DemographicCountry {
  country: string;
  code: string;
  percentage: number;
  cpmTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
}

export interface DemographicAge {
  range: string;
  percentage: number;
}

export interface DemographicGender {
  male: number;
  female: number;
  other: number;
}

export interface AudienceDemographics {
  topCountries: DemographicCountry[];
  ageSplit: DemographicAge[];
  genderSplit: DemographicGender;
}

export interface PastBrandSponsor {
  id: string;
  name: string;
  category: string;
  campaignType: string;
  metricHighlight: string;
  verified: boolean;
}

export interface RateCardPackage {
  id: string;
  name: string;
  badge?: string;
  deliverables: string[];
  price: number;
  turnaroundDays: number;
  includesWhitelisting: boolean;
  whitelistingDays: number;
  isPopular?: boolean;
}

export interface MediaKitPlatformStat {
  platform: Platform;
  handle: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
}

export interface MediaKitProfile {
  id: string;
  channelName: string;
  handle: string;
  tagline: string;
  bio: string;
  niche: string;
  contactEmail: string;
  avatarUrl?: string;
  verifiedBadge: boolean;
  totalReach: number;
  avgViews30d: number;
  avgEngagementRate: number;
  platforms: MediaKitPlatformStat[];
  demographics: AudienceDemographics;
  pastBrands: PastBrandSponsor[];
  ratePackages: RateCardPackage[];
  customPitchLink?: string;
  updatedAt: string;
}

// Pitch & Negotiation Types
export type PitchType =
  | 'cold_outreach'
  | 'counter_offer_lowball'
  | 'agency_intro'
  | 'follow_up_gentle'
  | 'deliverable_handover';

export type PitchTone = 'assertive_commercial' | 'creative_partner' | 'concise_executive';

export interface PitchGenerationInput {
  pitchType: PitchType;
  tone: PitchTone;
  brandName: string;
  contactPerson?: string;
  niche?: string;
  targetBudget?: number;
  offeredBudget?: number;
  deliverable?: string;
  channelName?: string;
  audienceHighlight?: string;
}

export interface PitchDraftResult {
  pitchType: PitchType;
  tone: PitchTone;
  subjectLine: string;
  emailBody: string;
  tacticalTip: string;
  suggestedFollowUpDays: number;
}

// Contract Red-Flag Scanner Types
export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low';

export type ContractRiskCategory =
  | 'perpetual_rights'
  | 'uncompensated_whitelisting'
  | 'excessive_exclusivity'
  | 'delayed_payment'
  | 'unlimited_revisions'
  | 'unilateral_kill_fee'
  | 'broad_indemnity';

export interface ContractClauseRisk {
  id: string;
  category: ContractRiskCategory;
  severity: RiskSeverity;
  title: string;
  detectedSnippet: string;
  dangerExplanation: string;
  recommendedCounterClause: string;
}

export interface ContractScanReport {
  safetyScore: number; // 0 - 100
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  verdict: 'safe_to_sign' | 'caution_negotiate_terms' | 'predatory_do_not_sign';
  foundRisks: ContractClauseRisk[];
  wordCount: number;
  scannedAt: string;
}
