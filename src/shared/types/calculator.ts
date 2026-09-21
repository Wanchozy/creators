import { Platform } from './common';

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

export interface SavedRateQuote {
  id: string;
  clientName: string;
  platform: string;
  contentType: string;
  avgViews: number;
  creatorFollowers: number;
  category: string;
  minPrice: number;
  recommendedPrice: number;
  maxPrice: number;
  breakdown: Record<string, number>;
  createdAt: string;
}
