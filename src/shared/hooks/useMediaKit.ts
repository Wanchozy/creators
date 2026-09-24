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
      const authenticatedUserId = getCurrentUserId();
      const fetchedMediaKit = await mediaKitRepository.fetchMediaKit(authenticatedUserId);
      setMediaKit(fetchedMediaKit);
    } catch (unknownError) {
      const errorMessage =
        unknownError instanceof Error
          ? unknownError.message
          : 'Failed to load media kit from repository.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMediaKit();
  }, [loadMediaKit]);

  const updateMediaKit = async (profileUpdates: Partial<MediaKitProfile>) => {
    const previousSnapshot = { ...mediaKit };
    const optimisticProfile: MediaKitProfile = {
      ...mediaKit,
      ...profileUpdates,
      updatedAt: new Date().toISOString(),
    };
    setMediaKit(optimisticProfile);

    try {
      setSaving(true);
      const authenticatedUserId = getCurrentUserId() || 'demo-user';
      const persistedProfile = await mediaKitRepository.saveMediaKit(
        authenticatedUserId,
        profileUpdates
      );
      setMediaKit(persistedProfile);
    } catch (unknownError) {
      setMediaKit(previousSnapshot);
      const errorMessage =
        unknownError instanceof Error
          ? unknownError.message
          : 'Failed to persist media kit changes.';
      setError(errorMessage);
      throw unknownError;
    } finally {
      setSaving(false);
    }
  };

  const addPastBrand = async (brandData: Omit<PastBrandSponsor, 'id'>) => {
    const verifiedBrandRecord: PastBrandSponsor = {
      ...brandData,
      id: `pb-${Date.now()}`,
    };
    const updatedBrandList = [verifiedBrandRecord, ...mediaKit.pastBrands];
    await updateMediaKit({ pastBrands: updatedBrandList });
  };

  const removePastBrand = async (sponsorBrandId: string) => {
    const updatedBrandList = mediaKit.pastBrands.filter(
      (sponsorRecord) => sponsorRecord.id !== sponsorBrandId
    );
    await updateMediaKit({ pastBrands: updatedBrandList });
  };

  const updatePackage = async (targetPackage: RateCardPackage) => {
    const updatedPackages = mediaKit.ratePackages.map((ratePackage) =>
      ratePackage.id === targetPackage.id ? targetPackage : ratePackage
    );
    await updateMediaKit({ ratePackages: updatedPackages });
  };

  const syncWithChannelProfile = async () => {
    if (!profile) return;
    const authenticatedUserId = getCurrentUserId() || 'demo-user';
    setSaving(true);
    try {
      const regeneratedProfile = await mediaKitRepository.resetMediaKit(
        authenticatedUserId,
        profile
      );
      setMediaKit(regeneratedProfile);
    } catch (unknownError) {
      const errorMessage =
        unknownError instanceof Error
          ? unknownError.message
          : 'Failed to sync with channel profile baseline.';
      setError(errorMessage);
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
