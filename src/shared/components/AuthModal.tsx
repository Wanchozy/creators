import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Database,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  LogOut,
  Send,
  RefreshCw,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/shared/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'signin',
}) => {
  const { user, isConfigured, signIn, signUp, signOut, resendVerification, refreshUser } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'awaiting_verification'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isEmailUnconfirmed, setIsEmailUnconfirmed] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  // Sync mode when initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccessMsg(null);
      setIsEmailUnconfirmed(false);
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Handle resend countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsEmailUnconfirmed(false);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { user: signedInUser } = await signIn(email, password);
        setSuccessMsg('Successfully signed in!');
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) onAuthSuccess();
        }, 600);
      } else if (mode === 'signup') {
        const result = await signUp(email, password, channelName);
        if (result?.needsEmailConfirmation) {
          setVerificationEmail(email);
          setMode('awaiting_verification');
          setResendCooldown(60);
        } else {
          setSuccessMsg(
            isConfigured
              ? 'Account created and verified! Launching your workspace...'
              : 'Demo account created successfully!'
          );
          setTimeout(() => {
            onClose();
            if (onAuthSuccess) onAuthSuccess();
          }, 800);
        }
      }
    } catch (err: any) {
      const errMsg = err?.message || 'Authentication failed. Please check your credentials.';
      // Check for email not confirmed error
      if (errMsg.toLowerCase().includes('email not confirmed')) {
        setIsEmailUnconfirmed(true);
        setVerificationEmail(email);
        setError('Your email address has not been confirmed yet.');
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!verificationEmail || resendCooldown > 0 || resending) return;
    setResending(true);
    setError(null);
    try {
      const { error: resendErr } = await resendVerification(verificationEmail);
      if (resendErr) {
        setError(resendErr.message || 'Failed to resend confirmation email.');
      } else {
        setSuccessMsg(`Verification email resent to ${verificationEmail}`);
        setResendCooldown(60);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to resend email');
    } finally {
      setResending(false);
    }
  };

  const handleCheckConfirmed = async () => {
    setLoading(true);
    setError(null);
    try {
      // If user filled password, attempt sign in to verify
      if (password) {
        await signIn(verificationEmail, password);
        setSuccessMsg('Email confirmed! Redirecting to creator workspace...');
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) onAuthSuccess();
        }, 600);
      } else {
        // Otherwise refresh user session
        const u = await refreshUser();
        if (u) {
          setSuccessMsg('Email confirmed! Welcome to Creator\'s.');
          setTimeout(() => {
            onClose();
            if (onAuthSuccess) onAuthSuccess();
          }, 600);
        } else {
          setError('Email is still unconfirmed. Please click the link inside your email, then click here.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Verification not detected yet. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-6 relative overflow-hidden">
        {/* Ambient Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-400 flex items-center justify-center shadow-lg shadow-brand-500/20 shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Creator Account & Platform</h2>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Database:</span>
              {isConfigured ? (
                <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase Live</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 text-amber-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Demo Mode (In-Memory)</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* State 1: User is already signed in */}
        {user && !user.isDemo ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Active Creator Session</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                  Verified
                </span>
              </div>
              <div className="text-sm font-semibold text-white">
                {user.channelName || user.displayName || 'Creator Studio'}
              </div>
              <div className="text-xs text-slate-400 font-mono truncate">{user.email}</div>
              <div className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1.5 pt-1 border-t border-slate-800/60">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Encrypted with Row-Level Security (RLS)</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>{loading ? 'Signing out...' : 'Sign Out of Session'}</span>
            </button>
          </div>
        ) : mode === 'awaiting_verification' ? (
          /* State 2: Awaiting Email Verification Screen */
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/25 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mx-auto text-brand-400 shadow-lg shadow-brand-500/20 animate-bounce">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Confirm Your Email Address</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We've sent an activation link to:
                <br />
                <span className="font-semibold text-white font-mono bg-slate-900/80 px-2 py-0.5 rounded mt-1 inline-block border border-slate-800">
                  {verificationEmail}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Click the confirmation link in the email to activate your account. Once confirmed, you'll immediately unlock your interactive creator onboarding and rate tools.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleCheckConfirmed}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>I've Confirmed My Email — Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendCooldown > 0 || resending}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {resending
                    ? 'Resending...'
                    : resendCooldown > 0
                    ? `Resend available in ${resendCooldown}s`
                    : 'Resend Confirmation Email'}
                </span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccessMsg(null);
                  setMode('signin');
                }}
                className="text-xs text-slate-400 hover:text-white transition"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        ) : (
          /* State 3: Sign In / Sign Up Form */
          <div>
            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-slate-950 p-1 mb-5 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setIsEmailUnconfirmed(false);
                  setMode('signin');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  mode === 'signin'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setIsEmailUnconfirmed(false);
                  setMode('signup');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  mode === 'signup'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* If user hit "Email not confirmed" during sign in */}
            {isEmailUnconfirmed && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Email confirmation required.</span>
                    <p className="text-[11px] text-amber-200/80 mt-0.5">
                      Your account was created, but Supabase requires verifying {verificationEmail} before logging in.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendCooldown > 0 || resending}
                    className="py-1 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-semibold transition flex items-center space-x-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>
                      {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend Email Link'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('awaiting_verification')}
                    className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition"
                  >
                    View Status →
                  </button>
                </div>
              </div>
            )}

            {error && !isEmailUnconfirmed && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Channel or Brand Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                      placeholder="e.g. Alex Tech Breakdown"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@channel.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>
                    {mode === 'signin' ? 'Sign In to Workspace' : 'Create Creator Account'}
                  </span>
                )}
              </button>
            </form>

            {/* Backend Info Footer */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start space-x-2">
              <Database className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span>
                  {isConfigured
                    ? 'Connected to live Supabase PostgreSQL. Securely managed with Row-Level Security.'
                    : 'Running in demo mode. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env to connect live.'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
