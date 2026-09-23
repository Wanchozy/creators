import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '@/shared/config/supabase';
import { mockMediaKitProfile } from '@/shared/data/mockData';
import { createDefaultMediaKit } from '@/shared/domain/mediaKitEngine';
import type { MediaKitProfile, UserProfile } from '@/shared/types';

export interface MediaKitRepository {
  fetchMediaKit(userId?: string): Promise<MediaKitProfile>;
  saveMediaKit(userId: string, mediaKit: Partial<MediaKitProfile>): Promise<MediaKitProfile>;
  resetMediaKit(userId: string, userProfile?: Partial<UserProfile>): Promise<MediaKitProfile>;
}

// In-memory demo fallback store
let _inMemoryMediaKit: MediaKitProfile = { ...mockMediaKitProfile };

function mapRowToMediaKit(row: any): MediaKitProfile {
  return {
    id: row.id || 'kit-current',
    channelName: row.channel_name || 'Creator Studio',
    handle: row.handle || '@creatorstudio',
    tagline: row.tagline || '',
    bio: row.bio || '',
    niche: row.niche || 'Technology',
    contactEmail: row.contact_email || '',
    avatarUrl: row.avatar_url,
    verifiedBadge: Boolean(row.verified_badge ?? true),
    totalReach: Number(row.total_reach ?? 0),
    avgViews30d: Number(row.avg_views_30d ?? 0),
    avgEngagementRate: Number(row.avg_engagement_rate ?? 6.5),
    platforms: Array.isArray(row.platforms) ? row.platforms : [],
    demographics: row.demographics || mockMediaKitProfile.demographics,
    pastBrands: Array.isArray(row.past_brands) ? row.past_brands : [],
    ratePackages: Array.isArray(row.rate_packages) ? row.rate_packages : [],
    customPitchLink: row.custom_pitch_link,
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

function mapMediaKitToRow(kit: Partial<MediaKitProfile>, userId?: string): Record<string, any> {
  const row: Record<string, any> = {};
  if (userId) row.user_id = userId;
  if (kit.channelName !== undefined) row.channel_name = kit.channelName;
  if (kit.handle !== undefined) row.handle = kit.handle;
  if (kit.tagline !== undefined) row.tagline = kit.tagline;
  if (kit.bio !== undefined) row.bio = kit.bio;
  if (kit.niche !== undefined) row.niche = kit.niche;
  if (kit.contactEmail !== undefined) row.contact_email = kit.contactEmail;
  if (kit.avatarUrl !== undefined) row.avatar_url = kit.avatarUrl;
  if (kit.verifiedBadge !== undefined) row.verified_badge = kit.verifiedBadge;
  if (kit.totalReach !== undefined) row.total_reach = kit.totalReach;
  if (kit.avgViews30d !== undefined) row.avg_views_30d = kit.avgViews30d;
  if (kit.avgEngagementRate !== undefined) row.avg_engagement_rate = kit.avgEngagementRate;
  if (kit.platforms !== undefined) row.platforms = kit.platforms;
  if (kit.demographics !== undefined) row.demographics = kit.demographics;
  if (kit.pastBrands !== undefined) row.past_brands = kit.pastBrands;
  if (kit.ratePackages !== undefined) row.rate_packages = kit.ratePackages;
  if (kit.customPitchLink !== undefined) row.custom_pitch_link = kit.customPitchLink;
  row.updated_at = new Date().toISOString();
  return row;
}

export function createMediaKitRepository(client?: SupabaseClient): MediaKitRepository {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchMediaKit(userId?: string): Promise<MediaKitProfile> {
      if (!isLive || !userId) {
        return { ..._inMemoryMediaKit };
      }

      try {
        const { data, error } = await db()
          .from('media_kits')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          console.warn('[mediaKitRepository] fetch error, falling back to cache:', error.message);
          return { ..._inMemoryMediaKit };
        }

        if (!data) {
          return { ..._inMemoryMediaKit };
        }

        const mapped = mapRowToMediaKit(data);
        _inMemoryMediaKit = mapped;
        return mapped;
      } catch (err) {
        console.warn('[mediaKitRepository] network failure:', err);
        return { ..._inMemoryMediaKit };
      }
    },

    async saveMediaKit(
      userId: string,
      updates: Partial<MediaKitProfile>
    ): Promise<MediaKitProfile> {
      const merged: MediaKitProfile = {
        ..._inMemoryMediaKit,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      _inMemoryMediaKit = merged;

      if (!isLive || !userId) {
        return merged;
      }

      try {
        const row = mapMediaKitToRow(merged, userId);
        const { data, error } = await db()
          .from('media_kits')
          .upsert(row, { onConflict: 'user_id' })
          .select()
          .single();

        if (error) {
          console.warn('[mediaKitRepository] save error, retained in local cache:', error.message);
          return merged;
        }

        return mapRowToMediaKit(data);
      } catch (err) {
        console.warn('[mediaKitRepository] save network failure:', err);
        return merged;
      }
    },

    async resetMediaKit(
      userId: string,
      userProfile?: Partial<UserProfile>
    ): Promise<MediaKitProfile> {
      const fresh = createDefaultMediaKit(userProfile);
      return this.saveMediaKit(userId, fresh);
    },
  };
}

export const mediaKitRepository = createMediaKitRepository();
