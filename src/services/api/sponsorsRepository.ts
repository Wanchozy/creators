import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '../../lib/supabase';
import { mockSponsors } from '../../data/mockData';
import type { BrandSponsor } from '../../types';

export interface SponsorsRepository {
  fetchSponsors(): Promise<BrandSponsor[]>;
}

function mapRowToSponsor(row: any): BrandSponsor {
  return {
    id: row.id,
    brandName: row.brand_name,
    logo: row.logo || '🏢',
    category: row.category,
    fitScore: row.fit_score,
    audienceMatchPercent: Number(row.audience_match_percent || 85),
    targetGeos: Array.isArray(row.target_geos) ? row.target_geos : ['US'],
    budgetTier: row.budget_tier,
    contactPerson: row.contact_person || '',
    contactEmail: row.contact_email || '',
    recentCampaignSummary: row.recent_campaign_summary || '',
    preferredFormats: Array.isArray(row.preferred_formats) ? row.preferred_formats : ['Integration 60s'],
  };
}

export function createSponsorsRepository(client?: SupabaseClient): SponsorsRepository {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchSponsors(): Promise<BrandSponsor[]> {
      if (!isLive) {
        return mockSponsors;
      }

      try {
        const { data, error } = await db()
          .from('sponsor_directory')
          .select('*')
          .order('audience_match_percent', { ascending: false });

        if (error || !data || data.length === 0) {
          // Graceful fallback to rich mock data if table is freshly created but unseeded
          return mockSponsors;
        }

        return data.map(mapRowToSponsor);
      } catch (err) {
        console.warn('Error fetching sponsors from Supabase, using fallback:', err);
        return mockSponsors;
      }
    },
  };
}

export const defaultSponsorsRepository = createSponsorsRepository();
