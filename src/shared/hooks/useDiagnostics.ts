import { useState, useEffect, useCallback } from 'react';
import { defaultDiagnosticsRepository } from '@/shared/repositories/diagnosticsRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import { useAuth } from './useAuth';
import type { VideoDiagnostic } from '@/shared/types';

export function useDiagnostics() {
  const { user } = useAuth();
  const [diagnostics, setDiagnostics] = useState<VideoDiagnostic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDiagnostics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = user?.id || getCurrentUserId();
      const data = await defaultDiagnosticsRepository.fetchDiagnostics(userId);
      setDiagnostics(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load diagnostics');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadDiagnostics();
  }, [loadDiagnostics]);

  const saveDiagnostic = async (diag: Omit<VideoDiagnostic, 'id'>) => {
    try {
      const userId = user?.id || getCurrentUserId();
      const created = await defaultDiagnosticsRepository.saveDiagnostic(userId, diag);
      setDiagnostics((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err?.message || 'Failed to save video diagnostic');
      throw err;
    }
  };

  const removeDiagnostic = async (id: string) => {
    const previous = [...diagnostics];
    setDiagnostics((prev) => prev.filter((d) => d.id !== id));
    try {
      await defaultDiagnosticsRepository.deleteDiagnostic(id);
    } catch (err: any) {
      setDiagnostics(previous);
      setError(err?.message || 'Failed to delete video diagnostic');
      throw err;
    }
  };

  return {
    diagnostics,
    loading,
    error,
    saveDiagnostic,
    removeDiagnostic,
    refresh: loadDiagnostics,
  };
}
