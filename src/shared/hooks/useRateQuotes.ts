import { useState, useEffect, useCallback } from 'react';
import { defaultRateQuotesRepository } from '@/shared/repositories/rateQuotesRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import { useAuth } from './useAuth';
import type { SavedRateQuote, RateCalculationInput, RateCalculationResult } from '@/shared/types';

export function useRateQuotes() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<SavedRateQuote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = user?.id || getCurrentUserId();
      const data = await defaultRateQuotesRepository.fetchSavedQuotes(userId);
      setQuotes(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load rate quotes');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  const saveQuote = async (
    clientName: string,
    input: RateCalculationInput,
    result: RateCalculationResult
  ) => {
    try {
      const userId = user?.id || getCurrentUserId();
      const created = await defaultRateQuotesRepository.saveQuote(userId, clientName, input, result);
      setQuotes((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err?.message || 'Failed to save quote');
      throw err;
    }
  };

  const removeQuote = async (id: string) => {
    const previous = [...quotes];
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    try {
      await defaultRateQuotesRepository.deleteQuote(id);
    } catch (err: any) {
      setQuotes(previous);
      setError(err?.message || 'Failed to delete quote');
      throw err;
    }
  };

  return {
    quotes,
    loading,
    error,
    saveQuote,
    removeQuote,
    refresh: loadQuotes,
  };
}
