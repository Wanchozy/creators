import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, Globe, Bell, LogIn, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';
import { AuthModal } from './AuthModal';
import { ChannelSettingsModal } from './ChannelSettingsModal';

interface NavbarProps {
  currentView: 'marketing' | 'app' | 'onboarding';
  setCurrentView: (view: 'marketing' | 'app' | 'onboarding') => void;
  activeAppTab?: string;
  setActiveAppTab?: (tab: string) => void;
  onLaunchOnboarding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeAppTab,
  setActiveAppTab,
  onLaunchOnboarding,
}) => {
  const { user, isConfigured } = useAuth();
  const { profile } = useProfile();
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const isAuthenticated = Boolean(user && !user.isDemo);
  const channelDisplayName = profile?.channelName || user?.channelName || user?.displayName || 'Creator Studio';
  const initials = channelDisplayName.substring(0, 2).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-50 hairline-b bg-[#08090d]/90 backdrop-blur-md">
        <div className="w-full px-4 sm:px-6 h-13 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('marketing')}>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold tracking-tight text-white font-sans">Creator's</span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                OS v2.0
              </span>
              <span className="hidden md:flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 pl-2 border-l border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Intelligence</span>
              </span>
            </div>
          </div>

          {/* View Switcher / Fast Nav */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-[#0c0e14] border border-white/[0.08] p-1 rounded-xl flex items-center shadow-inner relative">
              <button
                onClick={() => setCurrentView('marketing')}
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currentView === 'marketing'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {currentView === 'marketing' && (
                  <motion.div
                    layoutId="navbarViewIndicator"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                  />
                )}
                <Globe className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Website & Features</span>
              </button>
              <button
                onClick={() => setCurrentView('app')}
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currentView === 'app'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {currentView === 'app' && (
                  <motion.div
                    layoutId="navbarViewIndicator"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                  />
                )}
                <LayoutDashboard className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Launch Creator's App</span>
              </button>
            </div>

            {/* Auth / Profile Trigger */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              {currentView === 'app' && (
                <>
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition"
                    title="Channel Profile & Baseline Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setActiveAppTab && setActiveAppTab('platform-changes')}
                      className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition"
                      title="3 Platform Policy Alerts"
                    >
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    </button>
                  </div>
                </>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 py-1 px-2.5 rounded-lg transition"
                  title="Account Settings"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {initials}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                      {channelDisplayName}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Live Supabase</span>
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={() => {
          if (!profile?.onboardingCompleted) {
            setCurrentView('onboarding');
          } else {
            setCurrentView('app');
          }
        }}
      />
      <ChannelSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLaunchOnboarding={() => {
          if (onLaunchOnboarding) onLaunchOnboarding();
          else setCurrentView('onboarding');
        }}
      />
    </>
  );
};
