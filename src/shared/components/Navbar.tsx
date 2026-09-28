import React, { useState } from 'react';
import { ArrowUpRight, Bell, ChevronDown, Globe2, LayoutDashboard, LogIn, Menu, Moon, Settings, Sparkles, Sun, X } from 'lucide-react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';
import { AuthModal } from './AuthModal';
import { ChannelSettingsModal } from './ChannelSettingsModal';

interface NavbarProps {
  currentView: 'marketing' | 'app' | 'onboarding';
  setCurrentView: (view: 'marketing' | 'app' | 'onboarding') => void;
  marketingTheme: 'dark' | 'light';
  onToggleMarketingTheme: () => void;
  activeAppTab?: string;
  setActiveAppTab?: (tab: string) => void;
  onLaunchOnboarding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, marketingTheme, onToggleMarketingTheme, activeAppTab, setActiveAppTab, onLaunchOnboarding }) => {
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
      <div className="nav-shell">
        <button onClick={() => navigate('marketing')} className="brand-lockup" aria-label="Creator’s home">
          <span className="brand-mark"><Sparkles size={16} /></span>
          <span className="brand-type"><b>Creator’s</b><small>INTELLIGENCE, IN MOTION</small></span>
        </button>

        {currentView === 'marketing' ? <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#platform">The idea</a><a href="#experiments">Try it</a><a href="#solutions">Toolkit</a><a href="#pricing">Plans</a>
        </nav> : <div className="view-switcher" aria-label="View switcher">
          <button onClick={() => navigate('marketing')} className="view-switch"><Globe2 size={14} /> Website</button>
          <button onClick={() => navigate('app')} className={`view-switch ${currentView === 'app' ? 'view-switch-active' : ''}`}><LayoutDashboard size={14} /> Workspace</button>
        </div>}

        <div className="nav-actions">
          {currentView === 'app' && <>
            <button onClick={() => setIsSettingsOpen(true)} className="header-icon-button" title="Channel Profile & Baseline Settings" aria-label="Channel settings"><Settings size={15} /></button>
            <button onClick={() => setActiveAppTab?.('platform-changes')} className="header-icon-button relative" title="Platform policy alerts" aria-label="Platform policy alerts"><Bell size={15} /><span className="notification-dot" /></button>
          </>}
          {currentView === 'marketing' && <button type="button" onClick={onToggleMarketingTheme} className="theme-toggle" aria-label={`Switch to ${marketingTheme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={marketingTheme === 'dark'} title={`Switch to ${marketingTheme === 'dark' ? 'light' : 'dark'} theme`}>
            {marketingTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}<span>{marketingTheme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>}
          {isAuthenticated ? <button onClick={() => setIsAuthOpen(true)} className="profile-button" title="Account Settings"><span className="profile-avatar">{initials}</span><span className="profile-name">{channelDisplayName}</span><ChevronDown size={12} /></button> : <button onClick={() => setIsAuthOpen(true)} className="header-signin"><LogIn size={14} /><span>Sign in</span></button>}
          <button onClick={currentView === 'app' ? () => navigate('marketing') : () => setCurrentView('app')} className="header-cta">{currentView === 'app' ? 'Website' : 'Open workspace'} <ArrowUpRight size={14} /></button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </div>
      </div>
      {menuOpen && <div className="mobile-menu">
        {currentView === 'marketing' ? <nav aria-label="Mobile navigation"><a href="#platform" onClick={() => setMenuOpen(false)}>The idea <ArrowUpRight size={14} /></a><a href="#experiments" onClick={() => setMenuOpen(false)}>Try it <ArrowUpRight size={14} /></a><a href="#solutions" onClick={() => setMenuOpen(false)}>Toolkit <ArrowUpRight size={14} /></a><a href="#pricing" onClick={() => setMenuOpen(false)}>Plans <ArrowUpRight size={14} /></a><button onClick={() => navigate('app')}>Open workspace <ArrowRightIcon /></button></nav> : <nav aria-label="Workspace navigation"><button onClick={() => navigate('marketing')}><Globe2 size={15} /> Website</button><button onClick={() => navigate('app')}><LayoutDashboard size={15} /> Workspace</button></nav>}
        {currentView === 'marketing' && <button type="button" className="mobile-theme-toggle" onClick={onToggleMarketingTheme} aria-label={`Switch to ${marketingTheme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={marketingTheme === 'dark'}>{marketingTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />} Switch to {marketingTheme === 'dark' ? 'light' : 'dark'} theme</button>}
      </div>}
    </header>
    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={() => { if (!profile?.onboardingCompleted) setCurrentView('onboarding'); else setCurrentView('app'); }} />
    <ChannelSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onLaunchOnboarding={() => { if (onLaunchOnboarding) onLaunchOnboarding(); else setCurrentView('onboarding'); }} />
  </>;
};

const ArrowRightIcon = () => <ArrowUpRight size={14} />;
