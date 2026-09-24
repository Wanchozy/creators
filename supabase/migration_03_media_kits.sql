-- ==============================================================================
-- Migration 03: Media Kit Profiles (Powers Media Kit Studio & Public One-Sheets)
-- ==============================================================================
-- This table is referenced by mediaKitRepository.ts which queries .from('media_kits')
-- for fetch, upsert, and reset operations.

CREATE TABLE IF NOT EXISTS public.media_kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  channel_name TEXT,
  handle TEXT,
  tagline TEXT,
  bio TEXT,
  niche TEXT,
  contact_email TEXT,
  avatar_url TEXT,
  verified_badge BOOLEAN DEFAULT true,
  total_reach NUMERIC DEFAULT 0,
  avg_views_30d NUMERIC DEFAULT 0,
  avg_engagement_rate NUMERIC DEFAULT 0,
  platforms JSONB DEFAULT '[]'::jsonb,
  demographics JSONB DEFAULT '{}'::jsonb,
  past_brands JSONB DEFAULT '[]'::jsonb,
  rate_packages JSONB DEFAULT '[]'::jsonb,
  custom_pitch_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS media_kits_user_id_idx ON public.media_kits(user_id);

ALTER TABLE public.media_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own media kit"
  ON public.media_kits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own media kit"
  ON public.media_kits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own media kit"
  ON public.media_kits FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow public read access by handle for the shareable /m/:handle public page.
-- This enables sponsors to view a creator's media kit without being authenticated.
CREATE POLICY "Anyone can read media kit by handle"
  ON public.media_kits FOR SELECT
  USING (handle IS NOT NULL AND handle != '');
