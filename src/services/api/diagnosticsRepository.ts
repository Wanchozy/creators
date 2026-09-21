import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '../../lib/supabase';
import { mockVideoDiagnostics } from '../../data/mockData';
import type { VideoDiagnostic } from '../../types';

export interface DiagnosticsRepository {
  fetchDiagnostics(userId?: string): Promise<VideoDiagnostic[]>;
  saveDiagnostic(userId: string, diagnostic: Omit<VideoDiagnostic, 'id'>): Promise<VideoDiagnostic>;
  deleteDiagnostic(id: string): Promise<void>;
}

let _inMemoryDiagnostics: VideoDiagnostic[] = [...mockVideoDiagnostics];

function mapRowToDiagnostic(row: any): VideoDiagnostic {
  return {
    id: row.id,
    title: row.video_title,
    platform: row.platform,
    uploadDate: row.upload_date || 'Recently',
    views: Number(row.views || 0),
    expectedViews: Number(row.expected_views || 0),
    ctr: Number(row.ctr || 0),
    channelAvgCtr: Number(row.channel_avg_ctr || 0),
    avdPercent: Number(row.avd_percent || 0),
    channelAvgAvd: Number(row.channel_avg_avd || 0),
    retentionDropAt8s: Number(row.retention_drop_8s || 0),
    first24hViews: Number(row.first_24h_views || 0),
    status: row.status,
    diagnoses: Array.isArray(row.diagnoses) ? row.diagnoses : [],
    possibleExperiments: Array.isArray(row.possible_experiments) ? row.possible_experiments : [],
    retentionTimeline: Array.isArray(row.retention_timeline) ? row.retention_timeline : [],
  };
}

function mapDiagnosticToRow(diag: Partial<VideoDiagnostic>, userId?: string): Record<string, any> {
  const row: Record<string, any> = {};
  if (userId) row.user_id = userId;
  if (diag.title !== undefined) row.video_title = diag.title;
  if (diag.platform !== undefined) row.platform = diag.platform;
  if (diag.views !== undefined) row.views = diag.views;
  if (diag.expectedViews !== undefined) row.expected_views = diag.expectedViews;
  if (diag.ctr !== undefined) row.ctr = diag.ctr;
  if (diag.channelAvgCtr !== undefined) row.channel_avg_ctr = diag.channelAvgCtr;
  if (diag.avdPercent !== undefined) row.avd_percent = diag.avdPercent;
  if (diag.channelAvgAvd !== undefined) row.channel_avg_avd = diag.channelAvgAvd;
  if (diag.retentionDropAt8s !== undefined) row.retention_drop_8s = diag.retentionDropAt8s;
  if (diag.first24hViews !== undefined) row.first_24h_views = diag.first24hViews;
  if (diag.status !== undefined) row.status = diag.status;
  if (diag.diagnoses !== undefined) row.diagnoses = diag.diagnoses;
  if (diag.possibleExperiments !== undefined) row.possible_experiments = diag.possibleExperiments;
  if (diag.retentionTimeline !== undefined) row.retention_timeline = diag.retentionTimeline;
  return row;
}

export function createDiagnosticsRepository(client?: SupabaseClient): DiagnosticsRepository {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchDiagnostics(userId?: string): Promise<VideoDiagnostic[]> {
      if (!isLive) {
        return [..._inMemoryDiagnostics];
      }

      try {
        let query = db()
          .from('video_diagnostics')
          .select('*')
          .order('created_at', { ascending: false });

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error || !data || data.length === 0) {
          return [..._inMemoryDiagnostics];
        }

        return data.map(mapRowToDiagnostic);
      } catch (err) {
        console.warn('Error fetching diagnostics, using fallback:', err);
        return [..._inMemoryDiagnostics];
      }
    },

    async saveDiagnostic(userId: string, diagnostic: Omit<VideoDiagnostic, 'id'>): Promise<VideoDiagnostic> {
      if (!isLive) {
        const newRecord: VideoDiagnostic = {
          ...diagnostic,
          id: `diag-${Date.now()}`,
        };
        _inMemoryDiagnostics = [newRecord, ..._inMemoryDiagnostics];
        return newRecord;
      }

      const rowPayload = mapDiagnosticToRow(diagnostic, userId);
      const { data, error } = await db()
        .from('video_diagnostics')
        .insert(rowPayload)
        .select()
        .single();

      if (error) throw error;
      return mapRowToDiagnostic(data);
    },

    async deleteDiagnostic(id: string): Promise<void> {
      if (!isLive) {
        _inMemoryDiagnostics = _inMemoryDiagnostics.filter((d) => d.id !== id);
        return;
      }

      const { error } = await db()
        .from('video_diagnostics')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  };
}

export const defaultDiagnosticsRepository = createDiagnosticsRepository();
