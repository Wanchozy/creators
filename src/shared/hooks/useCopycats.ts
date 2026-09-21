import { useState, useEffect, useCallback } from 'react';
import { defaultCopycatRepository } from '@/shared/repositories/copycatRepository';
import { getCurrentUserId } from '@/shared/repositories/authRepository';
import { useAuth } from './useAuth';
import type { CopycatIncident } from '@/shared/types';

export function useCopycats() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<CopycatIncident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = user?.id || getCurrentUserId();
      const data = await defaultCopycatRepository.fetchAlerts(userId);
      setAlerts(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load copycat alerts');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const createAlert = async (incident: Omit<CopycatIncident, 'id'>) => {
    try {
      const userId = user?.id || getCurrentUserId();
      const created = await defaultCopycatRepository.createAlert(userId, incident);
      setAlerts((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err?.message || 'Failed to create copycat alert');
      throw err;
    }
  };

  const changeStatus = async (id: string, status: CopycatIncident['status']) => {
    const previous = [...alerts];
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    try {
      const updated = await defaultCopycatRepository.updateAlertStatus(id, status);
      return updated;
    } catch (err: any) {
      setAlerts(previous);
      setError(err?.message || 'Failed to update alert status');
      throw err;
    }
  };

  const removeAlert = async (id: string) => {
    const previous = [...alerts];
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    try {
      await defaultCopycatRepository.deleteAlert(id);
    } catch (err: any) {
      setAlerts(previous);
      setError(err?.message || 'Failed to delete alert');
      throw err;
    }
  };

  return {
    alerts,
    loading,
    error,
    createAlert,
    changeStatus,
    removeAlert,
    refresh: loadAlerts,
  };
}
