import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { ToastProvider } from '@/shared/components/Toast';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';
import { ScrollProgress, CursorSpotlight, TechBackground } from '@/shared/components/motion';

// Lazy-loaded heavy views — each becomes its own chunk
const LandingPage = lazy(() =>
  import('@/website/pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const AppShell = lazy(() =>
  import('@/app/shell/AppShell').then((m) => ({ default: m.AppShell }))
);
const OnboardingFlow = lazy(() =>
  import('@/app/onboarding/OnboardingFlow').then((m) => ({ default: m.OnboardingFlow }))
);
const PublicMediaKitPage = lazy(() =>
  import('@/website/pages/PublicMediaKitPage').then((m) => ({ default: m.PublicMediaKitPage }))
);

/** Minimal full-screen loader shown while lazy chunks download */
function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * Detect if the current URL is a public media kit link (/m/:handle).
 * Returns the handle string if matched, otherwise null.
 */
function detectPublicMediaKitHandle(): string | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/m\/([a-zA-Z0-9_.-]+)\/?$/);
  return match ? match[1] : null;
}

export function App() {
  const { user } = useAuth();
  const { profile, refresh: refreshProfile } = useProfile();

  const [currentView, setCurrentView] = useState<'marketing' | 'app' | 'onboarding'>('marketing');
  const [activeAppTab, setActiveAppTab] = useState<string>('overview');
  const [marketingTheme, setMarketingTheme] = useState<'dark' | 'light'>(() => {
    try {
      return window.localStorage.getItem('creators-marketing-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('creators-marketing-theme', marketingTheme);
    } catch {
      // Keep the in-memory preference when browser storage is unavailable.
    }
    document.documentElement.style.colorScheme = currentView === 'marketing' ? marketingTheme : 'dark';
  }, [marketingTheme, currentView]);

  // Check once on mount if this is a public /m/:handle URL
  const [publicHandle] = useState<string | null>(() => detectPublicMediaKitHandle());

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

  // --- Public Media Kit Route ---
  // If URL matches /m/:handle, render only the public one-sheet viewer (no chrome)
  if (publicHandle) {
    return (
      <Suspense fallback={<PageLoader />}>
        <PublicMediaKitPage handle={publicHandle} />
      </Suspense>
    );
  }

  // --- Main Application ---
  return (
    <ToastProvider>
      <div data-site-theme={currentView === 'marketing' ? marketingTheme : undefined} className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white relative">
        <ScrollProgress />
        <TechBackground />
        <CursorSpotlight />

        {/* Only show global Navbar on Marketing and Workspace views. Onboarding has its own focused header. */}
        {currentView !== 'onboarding' && (
          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
            marketingTheme={marketingTheme}
            onToggleMarketingTheme={() => setMarketingTheme((theme) => theme === 'dark' ? 'light' : 'dark')}
            activeAppTab={activeAppTab}
            setActiveAppTab={handleNavigateToModule}
            onLaunchOnboarding={() => {
              setCurrentView('onboarding');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        <div className="flex-1 flex flex-col">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
