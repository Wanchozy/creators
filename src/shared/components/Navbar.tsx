import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bell, ChevronDown, Command, Globe2, LayoutDashboard, LogIn, Menu, Settings, ShieldCheck, Sparkles, X } from 'lucide-react';
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

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, activeAppTab, setActiveAppTab, onLaunchOnboarding }) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = Boolean(user && !user.isDemo);
  const channelDisplayName = profile?.channelName || user?.channelName || user?.displayName || 'Creator Studio';
  const initials = channelDisplayName.substring(0, 2).toUpperCase();

  const navigate = (view: 'marketing' | 'app') => {
    setCurrentView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <>
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-7 lg:px-10">
        <button onClick={() => navigate('marketing')} className="brand-lockup group flex shrink-0 items-center gap-2.5 text-left" aria-label="Creator's home">
          <span className="brand-mark flex h-9 w-9 items-center justify-center rounded-xl"><Sparkles className="h-[17px] w-[17px]" /></span>
          <span className="leading-none"><span className="block text-[15px] font-bold tracking-[-.04em] text-[#f1f1e8]">Creator’s</span><span className="micro-label mt-1 block text-[8px] tracking-[.19em] text-[#7c8178]">INTELLIGENCE STUDIO</span></span>
        </button>

        {currentView === 'marketing' ? <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          <a href="#platform" className="nav-link">Platform</a><a href="#solutions" className="nav-link">Solutions</a><a href="#pricing" className="nav-link">Pricing</a><a href="#faq" className="nav-link">FAQ</a>
        </nav> : <div className="hidden items-center gap-1 rounded-full border border-white/[.09] bg-white/[.025] p-1 md:flex" aria-label="View switcher">
          <button onClick={() => navigate('marketing')} className="view-switch"><Globe2 className="h-3.5 w-3.5" /> Website</button>
          <button onClick={() => navigate('app')} className={`view-switch ${currentView === 'app' ? 'view-switch-active' : ''}`}><LayoutDashboard className="h-3.5 w-3.5" /> Workspace</button>
        </div>}

        <div className="flex items-center gap-2 sm:gap-3">
          {currentView === 'app' && <>
            <button onClick={() => setIsSettingsOpen(true)} className="header-icon-button" title="Channel Profile & Baseline Settings" aria-label="Channel settings"><Settings className="h-4 w-4" /></button>
            <button onClick={() => setActiveAppTab?.('platform-changes')} className="header-icon-button relative" title="Platform policy alerts" aria-label="Platform policy alerts"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c8e88e]" /></button>
          </>}
          {isAuthenticated ? <button onClick={() => setIsAuthOpen(true)} className="profile-button flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-left" title="Account Settings"><span className="profile-avatar flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-[#192016]">{initials}</span><span className="hidden max-w-[100px] truncate text-xs font-semibold text-[#e4e7dd] sm:block">{channelDisplayName}</span><ChevronDown className="hidden h-3 w-3 text-[#777d73] sm:block" /></button> : <button onClick={() => setIsAuthOpen(true)} className="header-signin inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold transition hover:bg-white/[.07]"><LogIn className="h-3.5 w-3.5" /><span className="hidden sm:inline">Sign in</span></button>}
          <button onClick={currentView === 'app' ? () => navigate('marketing') : () => setCurrentView('app')} className="header-cta hidden h-9 items-center gap-2 rounded-full px-4 text-xs font-bold transition hover:-translate-y-0.5 sm:inline-flex">{currentView === 'app' ? 'Website' : 'Open workspace'} <ArrowUpRight className="h-3.5 w-3.5" /></button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="header-icon-button md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </div>
      {menuOpen && <div className="mobile-menu border-t border-white/[.08] px-4 pb-5 pt-3 md:hidden">
        {currentView === 'marketing' ? <nav className="grid gap-1" aria-label="Mobile navigation">{[['Platform', '#platform'], ['Solutions', '#solutions'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="mobile-nav-link">{label}<ArrowUpRight className="h-3.5 w-3.5" /></a>)}<button onClick={() => navigate('app')} className="button-lime mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-full text-xs font-bold text-[#171a13]">Open workspace <ArrowUpRight className="h-3.5 w-3.5" /></button></nav> : <div className="grid gap-2"><button onClick={() => navigate('marketing')} className="mobile-nav-link"><Globe2 className="h-4 w-4" /> Website</button><button onClick={() => navigate('app')} className="mobile-nav-link"><LayoutDashboard className="h-4 w-4" /> Workspace</button></div>}
      </div>}
    </header>

    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={() => { if (!profile?.onboardingCompleted) setCurrentView('onboarding'); else setCurrentView('app'); }} />
    <ChannelSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onLaunchOnboarding={() => { if (onLaunchOnboarding) onLaunchOnboarding(); else setCurrentView('onboarding'); }} />
  </>;
};
