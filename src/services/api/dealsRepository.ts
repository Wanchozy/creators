import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, hasSupabaseConfig } from '../../lib/supabase';
import { mockDeals } from '../../data/mockData';
import type { SponsorshipDeal, DealStage } from '../../types';

export interface DealsRepository {
  fetchDeals(userId?: string): Promise<SponsorshipDeal[]>;
  createDeal(userId: string, deal: Omit<SponsorshipDeal, 'id'>): Promise<SponsorshipDeal>;
  updateDeal(id: string, updates: Partial<SponsorshipDeal>): Promise<SponsorshipDeal>;
  updateDealStage(id: string, stage: DealStage, dealValue?: number): Promise<SponsorshipDeal>;
  deleteDeal(id: string): Promise<void>;
}

// In-memory demo fallback store
let _inMemoryDeals: SponsorshipDeal[] = [...mockDeals];

function mapRowToDeal(row: any): SponsorshipDeal {
  return {
    id: row.id,
    brandName: row.brand_name,
    contactEmail: row.contact_email ?? '',
    stage: row.stage as DealStage,
    dealValue: Number(row.deal_value ?? 0),
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    deadline: row.deadline ?? '',
    usageRights: row.usage_rights ?? '',
    exclusivityWindow: row.exclusivity_window ?? '',
    paymentTerms: row.payment_terms ?? '',
    paidAmount: Number(row.paid_amount ?? 0),
    notes: row.notes ?? '',
    lastContactDate: row.last_contact_date ?? 'Today',
  };
}

function mapDealToRow(deal: Partial<SponsorshipDeal>, userId?: string): Record<string, any> {
  const row: Record<string, any> = {};
  if (userId) row.user_id = userId;
  if (deal.brandName !== undefined) row.brand_name = deal.brandName;
  if (deal.contactEmail !== undefined) row.contact_email = deal.contactEmail;
  if (deal.stage !== undefined) row.stage = deal.stage;
  if (deal.dealValue !== undefined) row.deal_value = deal.dealValue;
  if (deal.deliverables !== undefined) row.deliverables = deal.deliverables;
  if (deal.deadline !== undefined) row.deadline = deal.deadline;
  if (deal.usageRights !== undefined) row.usage_rights = deal.usageRights;
  if (deal.exclusivityWindow !== undefined) row.exclusivity_window = deal.exclusivityWindow;
  if (deal.paymentTerms !== undefined) row.payment_terms = deal.paymentTerms;
  if (deal.paidAmount !== undefined) row.paid_amount = deal.paidAmount;
  if (deal.notes !== undefined) row.notes = deal.notes;
  if (deal.lastContactDate !== undefined) row.last_contact_date = deal.lastContactDate;
  row.updated_at = new Date().toISOString();
  return row;
}

/**
 * Creates a type-safe Deals repository backed by Supabase with automatic
 * in-memory fallback if Supabase is unconfigured or in demo mode.
 * Exactly mirrors the BetLedger repository pattern.
 */
export function createDealsRepository(client?: SupabaseClient): DealsRepository {
  const isLive = hasSupabaseConfig();
  const db = () => client ?? getSupabase();

  return {
    async fetchDeals(userId?: string): Promise<SponsorshipDeal[]> {
      if (!isLive) {
        return [..._inMemoryDeals];
      }

      let query = db()
        .from('sponsorship_deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching deals from Supabase:', error);
        return [..._inMemoryDeals];
      }

      return (data || []).map(mapRowToDeal);
    },

    async createDeal(userId: string, deal: Omit<SponsorshipDeal, 'id'>): Promise<SponsorshipDeal> {
      if (!isLive) {
        const newDeal: SponsorshipDeal = {
          ...deal,
          id: `deal-${Date.now()}`,
        };
        _inMemoryDeals = [newDeal, ..._inMemoryDeals];
        return newDeal;
      }

      const rowPayload = mapDealToRow(deal, userId);
      const { data, error } = await db()
        .from('sponsorship_deals')
        .insert(rowPayload)
        .select()
        .single();

      if (error) throw error;
      return mapRowToDeal(data);
    },

    async updateDeal(id: string, updates: Partial<SponsorshipDeal>): Promise<SponsorshipDeal> {
      if (!isLive) {
        _inMemoryDeals = _inMemoryDeals.map((d) => (d.id === id ? { ...d, ...updates } : d));
        const updated = _inMemoryDeals.find((d) => d.id === id);
        if (!updated) throw new Error(`Deal ${id} not found.`);
        return updated;
      }

      const rowPayload = mapDealToRow(updates);
      const { data, error } = await db()
        .from('sponsorship_deals')
        .update(rowPayload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return mapRowToDeal(data);
    },

    async updateDealStage(id: string, stage: DealStage, dealValue?: number): Promise<SponsorshipDeal> {
      const updates: Partial<SponsorshipDeal> = { stage };
      if (stage === 'Paid' && dealValue !== undefined) {
        updates.paidAmount = dealValue;
      }

      return this.updateDeal(id, updates);
    },

    async deleteDeal(id: string): Promise<void> {
      if (!isLive) {
        _inMemoryDeals = _inMemoryDeals.filter((d) => d.id !== id);
        return;
      }

      const { error } = await db()
        .from('sponsorship_deals')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  };
}

export const defaultDealsRepository = createDealsRepository();
