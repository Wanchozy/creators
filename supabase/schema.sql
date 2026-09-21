-- ==============================================================================
-- Creator's — The Creator Intelligence Platform: Supabase PostgreSQL Schema
-- ==============================================================================

-- 1. Enable UUID generator
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- Table 1: profiles (Extends auth.users for Creator Channels)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  channel_name TEXT,
  primary_platform TEXT NOT NULL DEFAULT 'youtube' CHECK (primary_platform IN ('youtube', 'tiktok', 'instagram')),
  niche TEXT,
  subscriber_count INTEGER DEFAULT 0,
  default_currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger: Automatically create a creator profile upon auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, channel_name, primary_platform, default_currency)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'channel_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'primary_platform', 'youtube'),
    COALESCE(NEW.raw_user_meta_data->>'default_currency', 'USD')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- Table 2: sponsorship_deals (Powers Deal Pipeline CRM & Invoicing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.sponsorship_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  contact_email TEXT,
  stage TEXT NOT NULL DEFAULT 'New' CHECK (stage IN ('New', 'Pitched', 'Negotiating', 'Active', 'Delivered', 'Paid')),
  deal_value NUMERIC NOT NULL DEFAULT 0,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  deadline DATE,
  usage_rights TEXT,
  exclusivity_window TEXT,
  payment_terms TEXT DEFAULT '50% upfront, 50% after publication',
  paid_amount NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  last_contact_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS deals_user_id_idx ON public.sponsorship_deals(user_id);
CREATE INDEX IF NOT EXISTS deals_stage_idx ON public.sponsorship_deals(stage);
CREATE INDEX IF NOT EXISTS deals_created_at_idx ON public.sponsorship_deals(created_at DESC);

ALTER TABLE public.sponsorship_deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own deals"
  ON public.sponsorship_deals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deals"
  ON public.sponsorship_deals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own deals"
  ON public.sponsorship_deals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own deals"
  ON public.sponsorship_deals FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- Table 3: video_diagnostics (Powers Algorithm Detective & Historical Audits)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.video_diagnostics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_title TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'youtube' CHECK (platform IN ('youtube', 'tiktok', 'instagram')),
  upload_date DATE,
  views INTEGER NOT NULL DEFAULT 0,
  expected_views INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC NOT NULL DEFAULT 0,
  channel_avg_ctr NUMERIC NOT NULL DEFAULT 0,
  avd_percent NUMERIC NOT NULL DEFAULT 0,
  channel_avg_avd NUMERIC NOT NULL DEFAULT 0,
  retention_drop_8s NUMERIC NOT NULL DEFAULT 0,
  first_24h_views INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'mild_underperform' CHECK (status IN ('critical_drop', 'mild_underperform', 'healthy', 'viral')),
  diagnoses JSONB NOT NULL DEFAULT '[]'::jsonb,
  possible_experiments JSONB NOT NULL DEFAULT '[]'::jsonb,
  retention_timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS diagnostics_user_id_idx ON public.video_diagnostics(user_id);
CREATE INDEX IF NOT EXISTS diagnostics_created_at_idx ON public.video_diagnostics(created_at DESC);

ALTER TABLE public.video_diagnostics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own diagnostics"
  ON public.video_diagnostics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diagnostics"
  ON public.video_diagnostics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diagnostics"
  ON public.video_diagnostics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diagnostics"
  ON public.video_diagnostics FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- Table 4: saved_rate_quotes (Powers Creator Rate & Deal Calculator)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.saved_rate_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT,
  platform TEXT NOT NULL DEFAULT 'youtube' CHECK (platform IN ('youtube', 'tiktok', 'instagram')),
  content_type TEXT NOT NULL DEFAULT 'integration_60s',
  avg_views INTEGER NOT NULL DEFAULT 0,
  creator_followers INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  brand_can_repost BOOLEAN DEFAULT false,
  paid_advertising_rights BOOLEAN DEFAULT false,
  exclusivity_days INTEGER DEFAULT 0,
  licensing_months INTEGER DEFAULT 0,
  turnaround_rush BOOLEAN DEFAULT false,
  min_price NUMERIC NOT NULL DEFAULT 0,
  recommended_price NUMERIC NOT NULL DEFAULT 0,
  max_price NUMERIC NOT NULL DEFAULT 0,
  breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  explanation_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS rate_quotes_user_id_idx ON public.saved_rate_quotes(user_id);

ALTER TABLE public.saved_rate_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own rate quotes"
  ON public.saved_rate_quotes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rate quotes"
  ON public.saved_rate_quotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own rate quotes"
  ON public.saved_rate_quotes FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- Table 5: copycat_alerts (Powers Originality & Copycat Monitor)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.copycat_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_title TEXT NOT NULL,
  suspect_channel TEXT NOT NULL,
  suspect_platform TEXT NOT NULL DEFAULT 'youtube' CHECK (suspect_platform IN ('youtube', 'tiktok', 'instagram')),
  suspect_video_title TEXT NOT NULL,
  similarity_score NUMERIC NOT NULL DEFAULT 0,
  detected_date TIMESTAMPTZ DEFAULT now(),
  is_ai_generated_channel BOOLEAN DEFAULT true,
  match_type TEXT NOT NULL DEFAULT 'identical_script' CHECK (match_type IN ('identical_script', 'cloned_concept', 'reused_hook', 'thumbnail_rip')),
  status TEXT NOT NULL DEFAULT 'alert' CHECK (status IN ('alert', 'investigating', 'takedown_sent', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS copycat_user_id_idx ON public.copycat_alerts(user_id);

ALTER TABLE public.copycat_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own copycat alerts"
  ON public.copycat_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own copycat alerts"
  ON public.copycat_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own copycat alerts"
  ON public.copycat_alerts FOR UPDATE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- Table 6: sponsor_directory (Curated Database for Sponsor Radar)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.sponsor_directory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL,
  logo TEXT,
  category TEXT NOT NULL CHECK (category IN ('Gaming', 'Hardware', 'VPN / Security', 'Fintech', 'Productivity / SaaS', 'Lifestyle')),
  fit_score TEXT NOT NULL DEFAULT 'High fit' CHECK (fit_score IN ('High fit', 'Medium fit', 'Low fit')),
  audience_match_percent INTEGER NOT NULL DEFAULT 85,
  target_geos TEXT[] DEFAULT ARRAY['US'],
  budget_tier TEXT NOT NULL DEFAULT '$3k - $8k' CHECK (budget_tier IN ('$1k - $3k', '$3k - $8k', '$8k - $20k', '$20k+')),
  contact_person TEXT,
  contact_email TEXT,
  recent_campaign_summary TEXT,
  preferred_formats TEXT[] DEFAULT ARRAY['Dedicated 60s'],
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.sponsor_directory ENABLE ROW LEVEL SECURITY;

-- Curated sponsor directory is readable by all creators (both public and authenticated)
CREATE POLICY "Anyone can read sponsor directory"
  ON public.sponsor_directory FOR SELECT
  USING (true);

-- Seed verified initial sponsors
INSERT INTO public.sponsor_directory (brand_name, logo, category, fit_score, audience_match_percent, target_geos, budget_tier, contact_person, contact_email, recent_campaign_summary, preferred_formats)
VALUES 
  ('NordVPN', '🛡️', 'VPN / Security', 'High fit', 94, ARRAY['US', 'UK', 'CA', 'KE'], '$8k - $20k', 'Elena Rostova (Influencer Partnerships)', 'creators@nordsecurity-partners.com', 'Sponsoring cybersecurity, coding tutorials, and privacy deep-dives with custom vanity links.', ARRAY['Integration 60s', 'Dedicated segment']),
  ('Notion', '📝', 'Productivity / SaaS', 'High fit', 91, ARRAY['US', 'Global'], '$3k - $8k', 'Marcus Chen (Creator Growth)', 'sponsorships@makenotion.team', 'High appetite for workflow breakdowns, desk setups, and creator system templates.', ARRAY['Integration 90s', 'Workflow walkthrough']),
  ('Raycon Global', '🎧', 'Hardware', 'Medium fit', 78, ARRAY['US', 'UK'], '$1k - $3k', 'Sarah Jenkins (Brand Media)', 'partners@rayconglobal.media', 'Focus on lifestyle integrations, unboxings, and sound isolation demos.', ARRAY['Integration 45s', 'Mid-roll shoutout']),
  ('Epidemic Sound', '🎵', 'Productivity / SaaS', 'High fit', 88, ARRAY['US', 'Europe', 'KE', 'NG'], '$3k - $8k', 'David K. (Music Curation Partnerships)', 'creator-collabs@epidemicsound.com', 'Looking for video editors, storytellers, and vloggers to showcase audio discovery.', ARRAY['Integration 60s', 'Tool tutorial']),
  ('Shopify', '🛍️', 'Fintech', 'Medium fit', 82, ARRAY['US', 'UK', 'CA', 'AU'], '$8k - $20k', 'Amina Yusuf (Direct-to-Consumer Growth)', 'partnerships@shopify-creatorhub.com', 'Aggressively backing e-commerce guides, side-hustle breakdowns, and creator commerce.', ARRAY['Dedicated 3-min segment', 'Custom series'])
ON CONFLICT DO NOTHING;
