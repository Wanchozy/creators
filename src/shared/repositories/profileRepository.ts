import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '@/shared/config/supabase';
import type { UserProfile, Platform, CreatorPersona, CreatorGoal, ConnectedPlatform } from '@/shared/types';

export interface ProfileRepository {
  fetchProfile(userId: string): Promise<UserProfile | null>;
  updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>;
}

const DEFAULT_PROFILE: UserProfile = {
  id: '00000000-0000-0000-0000-000000000001',
  channelName: 'Creator Studio',
  primaryPlatform: 'youtube',
  niche: 'Tech & Productivity',
  subscriberCount: 52000,
  defaultCurrency: 'USD',
  persona: 'solo_creator',
  creatorGoals: ['price_deals', 'diagnose_reach'],
  connectedPlatforms: [],
  onboardingCompleted: false,
  onboardingStep: 1,
  averageViews: 42000,
};

let _inMemoryProfile: UserProfile = { ...DEFAULT_PROFILE };

function mapRowToProfile(row: any, userMeta?: Record<string, any>): UserProfile {
  return {
    id: row.id,
    channelName: row.channel_name || userMeta?.channel_name || null,
    primaryPlatform: (row.primary_platform as Platform) || (userMeta?.primary_platform as Platform) || 'youtube',
    niche: row.niche || userMeta?.niche || null,
    subscriberCount: Number(row.subscriber_count ?? userMeta?.subscriber_count ?? 0),
    defaultCurrency: row.default_currency || userMeta?.default_currency || 'USD',
    persona: (row.persona as CreatorPersona) || (userMeta?.persona as CreatorPersona) || 'solo_creator',
    creatorGoals: (row.creator_goals as CreatorGoal[]) || (userMeta?.creator_goals as CreatorGoal[]) || [],
    connectedPlatforms: (row.connected_platforms as ConnectedPlatform[]) || (userMeta?.connected_platforms as ConnectedPlatform[]) || [],
    onboardingCompleted: Boolean(row.onboarding_completed ?? userMeta?.onboarding_completed ?? false),
    onboardingStep: Number(row.onboarding_step ?? userMeta?.onboarding_step ?? 1),
    averageViews: Number(row.average_views ?? userMeta?.average_views ?? 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapProfileToRow(profile: Partial<UserProfile>): Record<string, any> {
  const row: Record<string, any> = {};
  if (profile.channelName !== undefined) row.channel_name = profile.channelName;
  if (profile.primaryPlatform !== undefined) row.primary_platform = profile.primaryPlatform;
  if (profile.niche !== undefined) row.niche = profile.niche;
  if (profile.subscriberCount !== undefined) row.subscriber_count = profile.subscriberCount;
  if (profile.defaultCurrency !== undefined) row.default_currency = profile.defaultCurrency;
  if (profile.persona !== undefined) row.persona = profile.persona;
  if (profile.creatorGoals !== undefined) row.creator_goals = profile.creatorGoals;
  if (profile.connectedPlatforms !== undefined) row.connected_platforms = profile.connectedPlatforms;
  if (profile.onboardingCompleted !== undefined) row.onboarding_completed = profile.onboardingCompleted;
  if (profile.onboardingStep !== undefined) row.onboarding_step = profile.onboardingStep;
  if (profile.averageViews !== undefined) row.average_views = profile.averageViews;
  row.updated_at = new Date().toISOString();
  return row;
}

export function createProfileRepository(client?: SupabaseClient): ProfileRepository {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchProfile(userId: string): Promise<UserProfile | null> {
      if (!isLive) {
        return { ..._inMemoryProfile, id: userId };
      }

      try {
        const supabase = db();
        // 1. Fetch metadata from current auth user
        let userMeta: Record<string, any> | undefined;
        try {
          const { data: authData } = await supabase.auth.getUser();
          if (authData?.user?.id === userId) {
            userMeta = authData.user.user_metadata;
          }
        } catch {
          // Ignore auth metadata fetch error
        }

        // 2. Query profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.warn('Profiles table read error (falling back to user_metadata):', error.message);
          if (userMeta) {
            return mapRowToProfile({ id: userId }, userMeta);
          }
          return null;
        }

        if (!data) {
          if (userMeta) {
            return mapRowToProfile({ id: userId }, userMeta);
          }
          return null;
        }

        return mapRowToProfile(data, userMeta);
      } catch (err) {
        console.warn('Profile fetch exception:', err);
        return null;
      }
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
      if (!isLive) {
        _inMemoryProfile = {
          ..._inMemoryProfile,
          ...updates,
          id: userId,
          updatedAt: new Date().toISOString(),
        };
        return _inMemoryProfile;
      }

      const supabase = db();

      // 1. Always sync to auth.users user_metadata for 100% reliability
      const metaUpdates: Record<string, any> = {};
      if (updates.channelName !== undefined) metaUpdates.channel_name = updates.channelName;
      if (updates.primaryPlatform !== undefined) metaUpdates.primary_platform = updates.primaryPlatform;
      if (updates.niche !== undefined) metaUpdates.niche = updates.niche;
      if (updates.subscriberCount !== undefined) metaUpdates.subscriber_count = updates.subscriberCount;
      if (updates.defaultCurrency !== undefined) metaUpdates.default_currency = updates.defaultCurrency;
      if (updates.persona !== undefined) metaUpdates.persona = updates.persona;
      if (updates.creatorGoals !== undefined) metaUpdates.creator_goals = updates.creatorGoals;
      if (updates.connectedPlatforms !== undefined) metaUpdates.connected_platforms = updates.connectedPlatforms;
      if (updates.onboardingCompleted !== undefined) metaUpdates.onboarding_completed = updates.onboardingCompleted;
      if (updates.onboardingStep !== undefined) metaUpdates.onboarding_step = updates.onboardingStep;
      if (updates.averageViews !== undefined) metaUpdates.average_views = updates.averageViews;

      try {
        await supabase.auth.updateUser({ data: metaUpdates });
      } catch (authMetaErr) {
        console.warn('Could not sync user_metadata in auth:', authMetaErr);
      }

      // 2. Try upserting to public.profiles
      const rowPayload = mapProfileToRow(updates);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            ...rowPayload,
          })
          .select()
          .single();

        if (error) {
          // If a column doesn't exist yet (migration pending), fall back to existing core columns
          if (error.message.includes('does not exist')) {
            console.warn('Some onboarding columns do not exist in profiles table yet. Updating base columns.');
            const basePayload: Record<string, any> = { id: userId };
            if (updates.channelName !== undefined) basePayload.channel_name = updates.channelName;
            if (updates.primaryPlatform !== undefined) basePayload.primary_platform = updates.primaryPlatform;
            if (updates.niche !== undefined) basePayload.niche = updates.niche;
            if (updates.subscriberCount !== undefined) basePayload.subscriber_count = updates.subscriberCount;
            if (updates.defaultCurrency !== undefined) basePayload.default_currency = updates.defaultCurrency;

            const { data: baseData } = await supabase
              .from('profiles')
              .upsert(basePayload)
              .select()
              .single();

            return mapRowToProfile(baseData || basePayload, metaUpdates);
          }
          throw error;
        }

        return mapRowToProfile(data, metaUpdates);
      } catch (err) {
        console.warn('Profile table upsert fallback to metadata:', err);
        return mapRowToProfile({ id: userId, ...rowPayload }, metaUpdates);
      }
    },
  };
}

export const defaultProfileRepository = createProfileRepository();
