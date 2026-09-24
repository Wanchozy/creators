import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, Globe, Bell, LogIn, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';
import { AuthModal } from './AuthModal';
import { ChannelSettingsModal } from './ChannelSettingsModal';
import { MobileDownloadModal } from '@/website/components/MobileDownloadModal';

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
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);

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

          {/* Navigation Links for Marketing View */}
          {currentView === 'marketing' ? (
            <div className="hidden md:flex items-center space-x-6 text-xs font-medium text-slate-400">
              <a href="#bento" className="hover:text-white transition-colors">
                Mobile Toolkit
              </a>
              <a href="#problems" className="hover:text-white transition-colors">
                10 Core Solutions
              </a>
              <a href="#simulator" className="hover:text-white transition-colors">
                Live Simulator
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
            </div>
          ) : (
            /* View Switcher inside App */
            <div className="bg-[#0c0e14] border border-white/[0.08] p-1 rounded-xl flex items-center shadow-inner relative">
              <button
                onClick={() => setCurrentView('marketing')}
                className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </button>
            </div>
          )}

          {/* Right Action Area */}
          <div className="flex items-center space-x-2.5">
            {currentView === 'marketing' ? (
              <>
                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Get Mobile App</span>
                </button>
                <button
                  onClick={() => setCurrentView('app')}
                  className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 transition"
                  title="Explore full interactive web workspace sandbox"
                >
                  <span>Web Sandbox</span>
                </button>
              </>
            ) : null}


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
      <MobileDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
};
