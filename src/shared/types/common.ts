export type Platform = 'youtube' | 'tiktok' | 'instagram';

export type CreatorPersona = 'solo_creator' | 'podcast_host' | 'production_studio' | 'agency';

export type CreatorGoal =
  | 'price_deals'
  | 'diagnose_reach'
  | 'find_sponsors'
  | 'protect_originality'
  | 'track_rpm';

export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  channelName: string | null;
  isDemo: boolean;
  onboardingCompleted?: boolean;
}

export interface ConnectedPlatform {
  platform: Platform;
  connected: boolean;
  handle?: string;
  followerCount?: number;
  averageViews?: number;
  syncStatus?: 'synced' | 'manual_benchmark' | 'pending';
}

export interface UserProfile {
  id: string;
  channelName: string | null;
  primaryPlatform: Platform;
  niche: string | null;
  subscriberCount: number;
  defaultCurrency: string;
  persona?: CreatorPersona;
  creatorGoals?: CreatorGoal[];
  connectedPlatforms?: ConnectedPlatform[];
  onboardingCompleted?: boolean;
  onboardingStep?: number;
  averageViews?: number;
  createdAt?: string;
  updatedAt?: string;
}
