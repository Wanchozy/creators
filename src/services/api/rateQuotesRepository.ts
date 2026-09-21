import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '../../lib/supabase';
import type { RateCalculationInput, RateCalculationResult } from '../../types';

export interface SavedRateQuote {
  id: string;
  clientName: string;
  platform: string;
  contentType: string;
  avgViews: number;
  creatorFollowers: number;
  category: string;
  minPrice: number;
  recommendedPrice: number;
  maxPrice: number;
  breakdown: Record<string, number>;
  createdAt: string;
}

let _inMemoryQuotes: SavedRateQuote[] = [];

function mapRowToQuote(row: any): SavedRateQuote {
  return {
    id: row.id,
    clientName: row.client_name || 'Brand Sponsor',
    platform: row.platform,
    contentType: row.content_type,
    avgViews: Number(row.avg_views || 0),
    creatorFollowers: Number(row.creator_followers || 0),
    category: row.category || 'General',
    minPrice: Number(row.min_price || 0),
    recommendedPrice: Number(row.recommended_price || 0),
    maxPrice: Number(row.max_price || 0),
    breakdown: row.breakdown || {},
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function createRateQuotesRepository(client?: SupabaseClient) {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchSavedQuotes(userId?: string): Promise<SavedRateQuote[]> {
      if (!isLive) {
        return [..._inMemoryQuotes];
      }

      try {
        let query = db()
          .from('saved_rate_quotes')
          .select('*')
          .order('created_at', { ascending: false });

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error || !data) return [..._inMemoryQuotes];
        return data.map(mapRowToQuote);
      } catch (err) {
        console.warn('Error fetching saved rate quotes:', err);
        return [..._inMemoryQuotes];
      }
    },

    async saveQuote(
      userId: string,
      clientName: string,
      input: RateCalculationInput,
      result: RateCalculationResult
    ): Promise<SavedRateQuote> {
      if (!isLive) {
        const newQuote: SavedRateQuote = {
          id: `quote-${Date.now()}`,
          clientName: clientName || 'New Client',
          platform: input.platform,
          contentType: input.contentType,
          avgViews: input.avgViews,
          creatorFollowers: input.creatorFollowers,
          category: input.category,
          minPrice: result.minPrice,
          recommendedPrice: result.recommendedPrice,
          maxPrice: result.maxPrice,
          breakdown: result.breakdown as any,
          createdAt: new Date().toISOString(),
        };
        _inMemoryQuotes = [newQuote, ..._inMemoryQuotes];
        return newQuote;
      }

      const { data, error } = await db()
        .from('saved_rate_quotes')
        .insert({
          user_id: userId,
          client_name: clientName || 'New Client',
          platform: input.platform,
          content_type: input.contentType,
          avgViews: input.avgViews,
          creator_followers: input.creatorFollowers,
          category: input.category,
          brand_can_repost: input.brandCanRepost,
          paid_advertising_rights: input.paidAdvertisingRights,
          exclusivity_days: input.exclusivityDays,
          licensing_months: input.licensingMonths,
          turnaround_rush: input.turnaroundRush,
          min_price: result.minPrice,
          recommended_price: result.recommendedPrice,
          max_price: result.maxPrice,
          breakdown: result.breakdown,
          explanation_points: result.explanationPoints,
        })
        .select()
        .single();

      if (error) throw error;
      return mapRowToQuote(data);
    },

    async deleteQuote(id: string): Promise<void> {
      if (!isLive) {
        _inMemoryQuotes = _inMemoryQuotes.filter((q) => q.id !== id);
        return;
      }

      const { error } = await db().from('saved_rate_quotes').delete().eq('id', id);
      if (error) throw error;
    },
  };
}

export const defaultRateQuotesRepository = createRateQuotesRepository();
