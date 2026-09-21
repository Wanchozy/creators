import { useState, useEffect } from 'react';
import {
  getCurrentUser,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
  resendVerificationEmail,
  onAuthStateChange,
} from '@/shared/repositories/authRepository';
import { hasSupabaseConfig } from '@/shared/config/supabase';
import type { AuthUser } from '@/shared/types';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isConfigured = hasSupabaseConfig();

  const refreshUser = async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
      return u;
    } catch (err) {
      console.warn('Error refreshing user:', err);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initUser() {
      try {
        const u = await getCurrentUser();
        if (isMounted) setUser(u);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initUser();

    const { unsubscribe } = onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        const u = await getCurrentUser();
        if (isMounted) setUser(u);
      } else {
        const u = await getCurrentUser();
        if (isMounted) setUser(u);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const { user: u, session, error } = await authSignIn(email, pass);
      if (error) throw error;
      setUser(u);
      return { user: u, session };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, channelName?: string) => {
    setLoading(true);
    try {
      const { user: u, session, needsEmailConfirmation, error } = await authSignUp(email, pass, channelName);
      if (error) throw error;
      setUser(u);
      return { user: u, session, needsEmailConfirmation };
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    return resendVerificationEmail(email);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authSignOut();
      const u = await getCurrentUser();
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isConfigured,
    signIn,
    signUp,
    signOut,
    resendVerification,
    refreshUser,
  };
}
