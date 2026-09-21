import { getSupabase, hasSupabaseConfig } from '@/shared/config/supabase';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { AuthUser } from '@/shared/types';

export const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

const DEMO_USER: AuthUser = {
  id: DEMO_USER_ID,
  email: 'creator@creators.app',
  displayName: 'Alex Rivers',
  channelName: 'Alex Tech & Design',
  isDemo: true,
};

let _currentUserId: string = DEMO_USER_ID;

export function getCurrentUserId(): string {
  return _currentUserId;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!hasSupabaseConfig()) {
    _currentUserId = DEMO_USER_ID;
    return DEMO_USER;
  }

  try {
    const supabase = getSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      _currentUserId = DEMO_USER_ID;
      return null;
    }

    _currentUserId = user.id;
    return formatAuthUser(user);
  } catch (err) {
    console.warn('Error fetching current user from Supabase:', err);
    return null;
  }
}

export async function signUp(
  email: string,
  password: string,
  channelName?: string
): Promise<{ user: AuthUser | null; error: Error | null }> {
  if (!hasSupabaseConfig()) {
    return {
      user: { ...DEMO_USER, email, channelName: channelName || 'My Creator Studio', isDemo: true },
      error: null,
    };
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          channel_name: channelName || email.split('@')[0],
        },
      },
    });

    if (error) return { user: null, error };
    if (!data.user) return { user: null, error: new Error('User creation failed.') };

    return { user: formatAuthUser(data.user), error: null };
  } catch (err: any) {
    return { user: null, error: err };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: Error | null }> {
  if (!hasSupabaseConfig()) {
    return { user: { ...DEMO_USER, email, isDemo: true }, error: null };
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { user: null, error };
    if (!data.user) return { user: null, error: new Error('Sign in failed.') };

    _currentUserId = data.user.id;
    return { user: formatAuthUser(data.user), error: null };
  } catch (err: any) {
    return { user: null, error: err };
  }
}

export async function signOut(): Promise<void> {
  if (hasSupabaseConfig()) {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error during sign out:', err);
    }
  }
  _currentUserId = DEMO_USER_ID;
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
): { unsubscribe: () => void } {
  if (!hasSupabaseConfig()) {
    return { unsubscribe: () => {} };
  }

  const supabase = getSupabase();
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      _currentUserId = session.user.id;
    } else {
      _currentUserId = DEMO_USER_ID;
    }
    callback(event, session);
  });

  return {
    unsubscribe: () => subscription.unsubscribe(),
  };
}

function formatAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? null,
    displayName: user.user_metadata?.display_name ?? user.user_metadata?.channel_name ?? null,
    channelName: user.user_metadata?.channel_name ?? null,
    isDemo: false,
  };
}
