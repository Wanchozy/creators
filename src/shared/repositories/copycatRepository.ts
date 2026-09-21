import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '@/shared/config/supabase';
import { mockCopycatAlerts } from '@/shared/data/mockData';
import type { CopycatIncident } from '@/shared/types';

export interface CopycatRepository {
  fetchAlerts(userId?: string): Promise<CopycatIncident[]>;
  createAlert(userId: string, incident: Omit<CopycatIncident, 'id'>): Promise<CopycatIncident>;
  updateAlertStatus(id: string, status: CopycatIncident['status']): Promise<CopycatIncident>;
  deleteAlert(id: string): Promise<void>;
}

let _inMemoryAlerts: CopycatIncident[] = [...mockCopycatAlerts];

function mapRowToIncident(row: any): CopycatIncident {
  return {
    id: row.id,
    originalTitle: row.original_title,
    suspectChannel: row.suspect_channel,
    suspectPlatform: row.suspect_platform,
    suspectVideoTitle: row.suspect_video_title,
    similarityScore: Number(row.similarity_score || 0),
    detectedDate: row.detected_date ? new Date(row.detected_date).toLocaleDateString() : 'Recently',
    isAiGeneratedChannel: Boolean(row.is_ai_generated_channel),
    matchType: row.match_type,
    status: row.status,
  };
}

function mapIncidentToRow(incident: Partial<CopycatIncident>, userId?: string): Record<string, any> {
  const row: Record<string, any> = {};
  if (userId) row.user_id = userId;
  if (incident.originalTitle !== undefined) row.original_title = incident.originalTitle;
  if (incident.suspectChannel !== undefined) row.suspect_channel = incident.suspectChannel;
  if (incident.suspectPlatform !== undefined) row.suspect_platform = incident.suspectPlatform;
  if (incident.suspectVideoTitle !== undefined) row.suspect_video_title = incident.suspectVideoTitle;
  if (incident.similarityScore !== undefined) row.similarity_score = incident.similarityScore;
  if (incident.isAiGeneratedChannel !== undefined) row.is_ai_generated_channel = incident.isAiGeneratedChannel;
  if (incident.matchType !== undefined) row.match_type = incident.matchType;
  if (incident.status !== undefined) row.status = incident.status;
  return row;
}

export function createCopycatRepository(client?: SupabaseClient): CopycatRepository {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchAlerts(userId?: string): Promise<CopycatIncident[]> {
      if (!isLive) {
        return [..._inMemoryAlerts];
      }

      try {
        let query = db()
          .from('copycat_alerts')
          .select('*')
          .order('created_at', { ascending: false });

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) {
          console.warn('Error fetching copycat alerts from Supabase:', error);
          return [..._inMemoryAlerts];
        }

        if (!data || data.length === 0) {
          return [];
        }

        return data.map(mapRowToIncident);
      } catch (err) {
        console.warn('Error fetching copycat alerts, using fallback:', err);
        return [..._inMemoryAlerts];
      }
    },

    async createAlert(userId: string, incident: Omit<CopycatIncident, 'id'>): Promise<CopycatIncident> {
      if (!isLive) {
        const newIncident: CopycatIncident = {
          ...incident,
          id: `clone-${Date.now()}`,
        };
        _inMemoryAlerts = [newIncident, ..._inMemoryAlerts];
        return newIncident;
      }

      const rowPayload = mapIncidentToRow(incident, userId);
      const { data, error } = await db()
        .from('copycat_alerts')
        .insert(rowPayload)
        .select()
        .single();

      if (error) throw error;
      return mapRowToIncident(data);
    },

    async updateAlertStatus(id: string, status: CopycatIncident['status']): Promise<CopycatIncident> {
      if (!isLive) {
        _inMemoryAlerts = _inMemoryAlerts.map((a) => (a.id === id ? { ...a, status } : a));
        const updated = _inMemoryAlerts.find((a) => a.id === id);
        if (!updated) throw new Error(`Alert ${id} not found.`);
        return updated;
      }

      const { data, error } = await db()
        .from('copycat_alerts')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return mapRowToIncident(data);
    },

    async deleteAlert(id: string): Promise<void> {
      if (!isLive) {
        _inMemoryAlerts = _inMemoryAlerts.filter((a) => a.id !== id);
        return;
      }

      const { error } = await db().from('copycat_alerts').delete().eq('id', id);
      if (error) throw error;
    },
  };
}

export const defaultCopycatRepository = createCopycatRepository();
