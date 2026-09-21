import { useState, useEffect, useCallback } from 'react';
import { defaultSponsorsRepository } from '@/shared/repositories/sponsorsRepository';
import type { BrandSponsor } from '@/shared/types';

export function useSponsors() {
  const [sponsors, setSponsors] = useState<BrandSponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSponsors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await defaultSponsorsRepository.fetchSponsors();
      setSponsors(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load sponsors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSponsors();
  }, [loadSponsors]);

  return {
    sponsors,
    loading,
    error,
    refresh: loadSponsors,
  };
}
