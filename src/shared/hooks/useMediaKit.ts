import { useState, useEffect, useCallback } from 'react';
import { mediaKitRepository } from '@/shared/repositories/mediaKitRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import { useProfile } from '@/shared/hooks/useProfile';
import { mockMediaKitProfile } from '@/shared/data/mockData';
import type { MediaKitProfile, PastBrandSponsor, RateCardPackage } from '@/shared/types';

export function useMediaKit() {
  const [mediaKit, setMediaKit] = useState<MediaKitProfile>(mockMediaKitProfile);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { profile } = useProfile();

  const loadMediaKit = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = getCurrentUserId();
      const data = await mediaKitRepository.fetchMediaKit(userId);
      setMediaKit(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load media kit');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMediaKit();
  }, [loadMediaKit]);

  const updateMediaKit = async (updates: Partial<MediaKitProfile>) => {
    const previous = { ...mediaKit };
    const optimistic: MediaKitProfile = {
      ...mediaKit,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setMediaKit(optimistic);

    try {
      setSaving(true);
      const userId = getCurrentUserId() || 'demo-user';
      const saved = await mediaKitRepository.saveMediaKit(userId, updates);
      setMediaKit(saved);
    } catch (err: any) {
      setMediaKit(previous);
      setError(err?.message || 'Failed to save changes');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const addPastBrand = async (brand: Omit<PastBrandSponsor, 'id'>) => {
    const newBrand: PastBrandSponsor = {
      ...brand,
      id: `pb-${Date.now()}`,
    };
    const updatedBrands = [newBrand, ...mediaKit.pastBrands];
    await updateMediaKit({ pastBrands: updatedBrands });
  };

  const removePastBrand = async (id: string) => {
    const updatedBrands = mediaKit.pastBrands.filter((b) => b.id !== id);
    await updateMediaKit({ pastBrands: updatedBrands });
  };

  const updatePackage = async (pkg: RateCardPackage) => {
    const updated = mediaKit.ratePackages.map((p) => (p.id === pkg.id ? pkg : p));
    await updateMediaKit({ ratePackages: updated });
  };

  const syncWithChannelProfile = async () => {
    if (!profile) return;
    const userId = getCurrentUserId() || 'demo-user';
    setSaving(true);
    try {
      const reset = await mediaKitRepository.resetMediaKit(userId, profile);
      setMediaKit(reset);
    } catch (err: any) {
      setError(err?.message || 'Failed to sync with channel profile');
    } finally {
      setSaving(false);
    }
  };

  return {
    mediaKit,
    loading,
    saving,
    error,
    updateMediaKit,
    addPastBrand,
    removePastBrand,
    updatePackage,
    syncWithChannelProfile,
    reload: loadMediaKit,
  };
}
