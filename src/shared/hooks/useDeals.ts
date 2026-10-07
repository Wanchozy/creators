/**
 * ==============================================================================
 * CUSTOM REACT HOOK: useDeals (src/shared/hooks/useDeals.ts)
 * ==============================================================================
 * What is a "Custom Hook"?
 * Think of this as the "nervous system" between your visual buttons and the database.
 * 
 * Instead of writing database code directly inside a button or a Kanban card,
 * the component simply asks:
 *   const { deals, changeStage, addDeal } = useDeals();
 * 
 * This hook handles:
 * 1. Fetching deals from the repository when the screen loads.
 * 2. Storing them in React's short-term memory (`useState`).
 * 3. "Optimistic UI Updates": Moving cards instantly on screen without waiting
 *    for a slow network roundtrip to finish!
 * ==============================================================================
 */

import { useState, useEffect, useCallback } from 'react';
import { defaultDealsRepository } from '@/shared/repositories/dealsRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import type { SponsorshipDeal, DealStage } from '@/shared/types';

export function useDeals() {
  // Short-term memory: stores the array of deals currently shown on screen
  const [deals, setDeals] = useState<SponsorshipDeal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to load all deals from the repository
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

  // Run automatically once when the component first appears on screen
  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  // ----------------------------------------------------------------------------
  // OPTIMISTIC STAGE CHANGE
  // When a creator drags a card from "Pitched" to "Paid":
  // We update the screen IMMEDIATELY so it feels buttery smooth and snappy (0ms).
  // Then we update the database in the background. If the internet fails, we roll back!
  // ----------------------------------------------------------------------------
  const changeStage = async (dealId: string, newStage: DealStage) => {
    const previous = [...deals];
    const targetDeal = deals.find((d) => d.id === dealId);
    if (!targetDeal) return;

    // 1. Instant screen update
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

    // 2. Background database sync
    try {
      await defaultDealsRepository.updateDealStage(dealId, newStage, targetDeal.dealValue);
    } catch (err: any) {
      // 3. Rollback on failure if the database threw an error
      setDeals(previous);
      setError(err?.message || 'Failed to update deal stage');
    }
  };

  // ----------------------------------------------------------------------------
  // ADD A NEW DEAL
  // Saves the deal to the database and prepends it to the top of our list
  // ----------------------------------------------------------------------------
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

  // ----------------------------------------------------------------------------
  // DELETE A DEAL
  // Removes the deal from screen state and deletes it from storage
  // ----------------------------------------------------------------------------
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

  // ----------------------------------------------------------------------------
  // WHAT THIS HOOK EXPOSES TO REACT COMPONENTS
  // Any button or view can now easily read deals or trigger actions!
  // ----------------------------------------------------------------------------
  return {
    deals,        // Array of all sponsorship deals
    loading,      // true while fetching data from storage
    error,        // error message if anything failed
    changeStage,  // call this to drag cards to a new Kanban stage
    addDeal,      // call this to save a brand new deal
    removeDeal,   // call this to delete a deal
    refresh: loadDeals, // call this to reload from the database
  };
}
