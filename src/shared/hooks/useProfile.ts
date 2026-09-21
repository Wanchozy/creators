import { useState, useEffect, useCallback } from 'react';
import { defaultProfileRepository } from '@/shared/repositories/profileRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import { useAuth } from './useAuth';
import type { UserProfile, Platform } from '@/shared/types';

const INITIAL_PROFILE: UserProfile = {
  id: '00000000-0000-0000-0000-000000000001',
  channelName: 'Creator Studio',
  primaryPlatform: 'youtube',
  niche: 'Tech & Productivity',
  subscriberCount: 52000,
  defaultCurrency: 'USD',
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = user?.id || getCurrentUserId();
      const data = await defaultProfileRepository.fetchProfile(userId);
      if (data) {
        setProfile(data);
      } else if (user) {
        // Build profile from user auth metadata if not yet in database
        setProfile({
          id: user.id,
          channelName: user.channelName || user.displayName || 'My Creator Studio',
          primaryPlatform: 'youtube',
          niche: 'Tech & Productivity',
          subscriberCount: 50000,
          defaultCurrency: 'USD',
        });
      }
    } catch (err: any) {
      console.warn('Profile load error:', err);
      setError(err?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const userId = user?.id || getCurrentUserId();
      const updated = await defaultProfileRepository.updateProfile(userId, updates);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile');
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refresh: loadProfile,
  };
}
