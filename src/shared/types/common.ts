export type Platform = 'youtube' | 'tiktok' | 'instagram';

export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  channelName: string | null;
  isDemo: boolean;
}

export interface UserProfile {
  id: string;
  channelName: string | null;
  primaryPlatform: Platform;
  niche: string | null;
  subscriberCount: number;
  defaultCurrency: string;
  createdAt?: string;
  updatedAt?: string;
}
