import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '@/shared/config/supabase';
import { mockMediaKitProfile } from '@/shared/data/mockData';
import { createDefaultMediaKit } from '@/shared/domain/mediaKitEngine';
import type { MediaKitProfile, UserProfile } from '@/shared/types';

export interface MediaKitRepository {
  fetchMediaKit(creatorUserId?: string): Promise<MediaKitProfile>;
  saveMediaKit(
    creatorUserId: string,
    profileUpdates: Partial<MediaKitProfile>
  ): Promise<MediaKitProfile>;
  resetMediaKit(
    creatorUserId: string,
    userProfile?: Partial<UserProfile>
  ): Promise<MediaKitProfile>;
}

/**
 * Isolated database schema representation for external PostgreSQL storage.
 * Follows Rule 3 (Isolate External Systems).
 */
interface MediaKitDatabaseRow {
  id?: string;
  user_id?: string;
  channel_name?: string;
  handle?: string;
  tagline?: string;
  bio?: string;
  niche?: string;
  contact_email?: string;
  avatar_url?: string;
  verified_badge?: boolean;
  total_reach?: number;
  avg_views_30d?: number;
  avg_engagement_rate?: number;
  platforms?: MediaKitProfile['platforms'];
  demographics?: MediaKitProfile['demographics'];
  past_brands?: MediaKitProfile['pastBrands'];
  rate_packages?: MediaKitProfile['ratePackages'];
  custom_pitch_link?: string;
  updated_at?: string;
}

// In-memory demo fallback store
let _inMemoryMediaKitStore: MediaKitProfile = { ...mockMediaKitProfile };

function mapDatabaseRowToMediaKitProfile(row: MediaKitDatabaseRow): MediaKitProfile {
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

function mapMediaKitProfileToDatabaseRow(
  profileUpdates: Partial<MediaKitProfile>,
  creatorUserId?: string
): MediaKitDatabaseRow {
  const databaseRow: MediaKitDatabaseRow = {};

  if (creatorUserId) databaseRow.user_id = creatorUserId;
  if (profileUpdates.channelName !== undefined) databaseRow.channel_name = profileUpdates.channelName;
  if (profileUpdates.handle !== undefined) databaseRow.handle = profileUpdates.handle;
  if (profileUpdates.tagline !== undefined) databaseRow.tagline = profileUpdates.tagline;
  if (profileUpdates.bio !== undefined) databaseRow.bio = profileUpdates.bio;
  if (profileUpdates.niche !== undefined) databaseRow.niche = profileUpdates.niche;
  if (profileUpdates.contactEmail !== undefined) databaseRow.contact_email = profileUpdates.contactEmail;
  if (profileUpdates.avatarUrl !== undefined) databaseRow.avatar_url = profileUpdates.avatarUrl;
  if (profileUpdates.verifiedBadge !== undefined) databaseRow.verified_badge = profileUpdates.verifiedBadge;
  if (profileUpdates.totalReach !== undefined) databaseRow.total_reach = profileUpdates.totalReach;
  if (profileUpdates.avgViews30d !== undefined) databaseRow.avg_views_30d = profileUpdates.avgViews30d;
  if (profileUpdates.avgEngagementRate !== undefined) databaseRow.avg_engagement_rate = profileUpdates.avgEngagementRate;
  if (profileUpdates.platforms !== undefined) databaseRow.platforms = profileUpdates.platforms;
  if (profileUpdates.demographics !== undefined) databaseRow.demographics = profileUpdates.demographics;
  if (profileUpdates.pastBrands !== undefined) databaseRow.past_brands = profileUpdates.pastBrands;
  if (profileUpdates.ratePackages !== undefined) databaseRow.rate_packages = profileUpdates.ratePackages;
  if (profileUpdates.customPitchLink !== undefined) databaseRow.custom_pitch_link = profileUpdates.customPitchLink;

  databaseRow.updated_at = new Date().toISOString();
  return databaseRow;
}

export function createMediaKitRepository(client?: SupabaseClient): MediaKitRepository {
  const isSupabaseLive = hasSupabaseConfig();
  const getDatabaseClient = () => client ?? getSupabase();

  return {
    async fetchMediaKit(creatorUserId?: string): Promise<MediaKitProfile> {
      // Early return for sandbox or offline mode
      if (!isSupabaseLive || !creatorUserId) {
        return { ..._inMemoryMediaKitStore };
      }

      try {
        const { data: rawDatabaseRecord, error: queryError } = await getDatabaseClient()
          .from('media_kits')
          .select('*')
          .eq('user_id', creatorUserId)
          .maybeSingle();

        if (queryError) {
          console.warn(
            '[mediaKitRepository] Code: MEDIA_KIT_FETCH_ERROR. Retaining cached store:',
            queryError.message
          );
          return { ..._inMemoryMediaKitStore };
        }

        if (!rawDatabaseRecord) {
          return { ..._inMemoryMediaKitStore };
        }

        const normalizedProfile = mapDatabaseRowToMediaKitProfile(rawDatabaseRecord);
        _inMemoryMediaKitStore = normalizedProfile;
        return normalizedProfile;
      } catch (unknownError) {
        const safeErrorMessage =
          unknownError instanceof Error ? unknownError.message : 'Unknown database network error';
        console.warn(
          '[mediaKitRepository] Code: MEDIA_KIT_NETWORK_ERROR. Retaining cached store:',
          safeErrorMessage
        );
        return { ..._inMemoryMediaKitStore };
      }
    },

    async saveMediaKit(
      creatorUserId: string,
      profileUpdates: Partial<MediaKitProfile>
    ): Promise<MediaKitProfile> {
      const mergedProfile: MediaKitProfile = {
        ..._inMemoryMediaKitStore,
        ...profileUpdates,
        updatedAt: new Date().toISOString(),
      };
      _inMemoryMediaKitStore = mergedProfile;

      // Early return if not connected to live Supabase backend
      if (!isSupabaseLive || !creatorUserId) {
        return mergedProfile;
      }

      try {
        const formattedDatabaseRow = mapMediaKitProfileToDatabaseRow(mergedProfile, creatorUserId);
        const { data: upsertedRecord, error: upsertError } = await getDatabaseClient()
          .from('media_kits')
          .upsert(formattedDatabaseRow, { onConflict: 'user_id' })
          .select()
          .single();

        if (upsertError) {
          console.warn(
            '[mediaKitRepository] Code: MEDIA_KIT_UPSERT_ERROR. Saved to in-memory store:',
            upsertError.message
          );
          return mergedProfile;
        }

        return mapDatabaseRowToMediaKitProfile(upsertedRecord);
      } catch (unknownError) {
        const safeErrorMessage =
          unknownError instanceof Error ? unknownError.message : 'Unknown database network error';
        console.warn(
          '[mediaKitRepository] Code: MEDIA_KIT_UPSERT_NETWORK_FAILURE. Saved to in-memory store:',
          safeErrorMessage
        );
        return mergedProfile;
      }
    },

    async resetMediaKit(
      creatorUserId: string,
      userProfile?: Partial<UserProfile>
    ): Promise<MediaKitProfile> {
      const freshMediaKitProfile = createDefaultMediaKit(userProfile);
      return this.saveMediaKit(creatorUserId, freshMediaKitProfile);
    },
  };
}

export const mediaKitRepository = createMediaKitRepository();
