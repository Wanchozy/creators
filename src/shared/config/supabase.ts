import { createClient, SupabaseClient } from '@supabase/supabase-js';

function readSupabaseConfig(): { url: string | undefined; anonKey: string | undefined } {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return {
    url: url && url.trim().length > 0 ? url.trim() : undefined,
    anonKey: anonKey && anonKey.trim().length > 0 ? anonKey.trim() : undefined,
  };
}

/**
 * Checks whether Supabase environment variables are configured.
 * Used across the app to decide whether to query real Supabase tables
 * or gracefully fall back to in-memory demo data.
 */
export function hasSupabaseConfig(): boolean {
  const { url, anonKey } = readSupabaseConfig();
  return Boolean(url && anonKey);
}

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const { url, anonKey } = readSupabaseConfig();

    if (!url || !anonKey) {
      throw new Error(
        'Missing Supabase credentials. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
      );
    }

    _supabase = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return _supabase;
}
