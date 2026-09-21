-- ==============================================================================
-- Migration 02: Creator Onboarding State & Persona Metadata
-- ==============================================================================

-- 1. Extend profiles with onboarding progress and creator goals
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS persona TEXT DEFAULT 'solo_creator',
  ADD COLUMN IF NOT EXISTS creator_goals TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS connected_platforms JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS average_views INTEGER DEFAULT 0;

-- 2. Update new user trigger to populate onboarding metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    channel_name, 
    primary_platform, 
    default_currency,
    onboarding_completed,
    onboarding_step
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'channel_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'primary_platform', 'youtube'),
    COALESCE(NEW.raw_user_meta_data->>'default_currency', 'USD'),
    COALESCE((NEW.raw_user_meta_data->>'onboarding_completed')::boolean, false),
    COALESCE((NEW.raw_user_meta_data->>'onboarding_step')::integer, 1)
  )
  ON CONFLICT (id) DO UPDATE SET
    channel_name = COALESCE(EXCLUDED.channel_name, public.profiles.channel_name),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
