import React, { useState } from 'react';
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
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('marketing')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">Creator's</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Intelligence
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">Content & Business Operating System</p>
            </div>
          </div>

          {/* View Switcher / Fast Nav */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-slate-900/90 border border-slate-800 p-1 rounded-xl flex items-center shadow-inner">
              <button
                onClick={() => setCurrentView('marketing')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'marketing'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website & Features</span>
              </button>
              <button
                onClick={() => setCurrentView('app')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'app'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Launch Creator's App</span>
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
