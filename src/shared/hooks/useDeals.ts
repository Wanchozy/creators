import { useState, useEffect, useCallback } from 'react';
import { defaultDealsRepository } from '@/shared/repositories/dealsRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import type { SponsorshipDeal, DealStage } from '@/shared/types';

export function useDeals() {
  const [deals, setDeals] = useState<SponsorshipDeal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = getCurrentUserId();
      const data = await defaultDealsRepository.fetchDeals(userId);
      setDeals(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load deals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  const changeStage = async (dealId: string, newStage: DealStage) => {
    // Optimistic UI update
    const previous = [...deals];
    const targetDeal = deals.find((d) => d.id === dealId);
    if (!targetDeal) return;

    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const isPaid = newStage === 'Paid';
          return {
            ...d,
            stage: newStage,
            paidAmount: isPaid ? d.dealValue : d.paidAmount,
          };
        }
        return d;
      })
    );

    try {
      await defaultDealsRepository.updateDealStage(dealId, newStage, targetDeal.dealValue);
    } catch (err: any) {
      // Rollback on failure
      setDeals(previous);
      setError(err?.message || 'Failed to update deal stage');
    }
  };

  const addDeal = async (deal: Omit<SponsorshipDeal, 'id'>) => {
    try {
      const userId = getCurrentUserId();
      const created = await defaultDealsRepository.createDeal(userId, deal);
      setDeals((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err?.message || 'Failed to create deal');
      throw err;
    }
  };

  const removeDeal = async (dealId: string) => {
    const previous = [...deals];
    setDeals((prev) => prev.filter((d) => d.id !== dealId));

    try {
      await defaultDealsRepository.deleteDeal(dealId);
    } catch (err: any) {
      setDeals(previous);
      setError(err?.message || 'Failed to delete deal');
      throw err;
    }
  };

  return {
    deals,
    loading,
    error,
    changeStage,
    addDeal,
    removeDeal,
    refresh: loadDeals,
  };
}
