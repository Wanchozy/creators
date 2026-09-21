import React, { useState, useEffect } from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { LandingPage } from '@/website/pages/LandingPage';
import { AppShell } from '@/app/shell/AppShell';
import { OnboardingFlow } from '@/app/onboarding/OnboardingFlow';
import { ToastProvider } from '@/shared/components/Toast';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';

export function App() {
  const { user } = useAuth();
  const { profile, refresh: refreshProfile } = useProfile();

  const [currentView, setCurrentView] = useState<'marketing' | 'app' | 'onboarding'>('marketing');
  const [activeAppTab, setActiveAppTab] = useState<string>('overview');

  // Listen for email confirmation callbacks / URL tokens from Supabase
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash.includes('access_token') || hash.includes('type=signup') || search.includes('code=')) {
        // Clean up URL hash cleanly without reload
        try {
          window.history.replaceState(null, '', window.location.pathname);
        } catch {
          // ignore if history replace is restricted
        }
        // If not onboarded, direct user to onboarding
        if (profile && !profile.onboardingCompleted) {
          setCurrentView('onboarding');
        } else {
          setCurrentView('app');
        }
      }
    }
  }, [profile?.onboardingCompleted]);

  // When an authenticated user logs in, if they haven't completed onboarding, route them appropriately
  const handleLaunchApp = () => {
    if (user && !user.isDemo && profile && !profile.onboardingCompleted) {
      setCurrentView('onboarding');
    } else {
      setCurrentView('app');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToModule = (tab: string) => {
    setActiveAppTab(tab);
    if (user && !user.isDemo && profile && !profile.onboardingCompleted) {
      setCurrentView('onboarding');
    } else {
      setCurrentView('app');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOnboardingComplete = async () => {
    await refreshProfile();
    setCurrentView('app');
    setActiveAppTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
        {/* Only show global Navbar on Marketing and Workspace views. Onboarding has its own focused header. */}
        {currentView !== 'onboarding' && (
          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
            activeAppTab={activeAppTab}
            setActiveAppTab={handleNavigateToModule}
            onLaunchOnboarding={() => {
              setCurrentView('onboarding');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        <div className="flex-1 flex flex-col">
          {currentView === 'onboarding' ? (
            <OnboardingFlow
              onComplete={handleOnboardingComplete}
              onExitToWebsite={() => {
                setCurrentView('marketing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentView === 'marketing' ? (
            <>
              <LandingPage
                onLaunchApp={handleLaunchApp}
                onNavigateToModule={handleNavigateToModule}
              />
              <Footer onNavigateToAppTab={handleNavigateToModule} />
            </>
          ) : (
            <AppShell
              activeTab={activeAppTab}
              setActiveTab={setActiveAppTab}
              onNavigateToWebsite={() => {
                setCurrentView('marketing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLaunchOnboarding={() => {
                setCurrentView('onboarding');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
