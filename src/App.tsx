/**
 * ==============================================================================
 * STEP 3: THE TRAFFIC DIRECTOR (src/App.tsx)
 * ==============================================================================
 * Think of App.tsx as the main train station or concierge of our website.
 * It does not draw every button itself; instead, it checks:
 * 
 * 1. "Who is visiting?" (A brand viewing /m/:handle? A new user? An existing creator?)
 * 2. "Which screen should we show?"
 *    - Marketing Site: LandingPage.tsx (for visitors)
 *    - Public Media Kit: PublicMediaKitPage.tsx (for brands looking at a creator)
 *    - Onboarding: OnboardingFlow.tsx (first-time creator setup wizard)
 *    - App Workspace: AppShell.tsx (the private dashboard with 11 creator tools)
 * 
 * Performance Tip: We use `lazy(...)` to load heavy pages only when needed.
 * That way, visitors don't have to download the entire dashboard code unless
 * they actually click to open it!
 * ==============================================================================
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { ToastProvider } from '@/shared/components/Toast';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';
import { ScrollProgress, CursorSpotlight, TechBackground } from '@/shared/components/motion';

// Code-splitting: Each of these heavy views is bundled into its own smaller file.
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
 * Detect if the current URL is a public media kit link (/m/:handle or /m/@:handle).
 * Returns the handle string if matched, otherwise null.
 */
function detectPublicMediaKitHandle(): string | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;
  const hash = window.location.hash;
  const pathMatch = path.match(/^\/m\/@?([a-zA-Z0-9_.-]+)\/?$/);
  if (pathMatch) return decodeURIComponent(pathMatch[1]);
  const hashMatch = hash.match(/^#\/?m\/@?([a-zA-Z0-9_.-]+)\/?$/);
  if (hashMatch) return decodeURIComponent(hashMatch[1]);
  return null;
}

export function App() {
  const { user } = useAuth();
  const { profile, refresh: refreshProfile } = useProfile();

  // ============================================================================
  // APP STATE (Short-Term Memory)
  // React uses "useState" to remember things like which tab or view is active.
  // When these values change, React automatically re-draws the screen!
  // ============================================================================
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

  // --- ROUTE 1: PUBLIC MEDIA KIT ROUTE ---
  // If the browser URL is /m/:handle, we render the public one-sheet viewer directly.
  if (publicHandle) {
    return (
      <Suspense fallback={<PageLoader />}>
        <PublicMediaKitPage handle={publicHandle} />
      </Suspense>
    );
  }

  // --- ROUTE 2, 3 & 4: MAIN APPLICATION SURFACE ---
  return (
    <ToastProvider>
      <div data-site-theme={currentView === 'marketing' ? marketingTheme : undefined} className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white relative">
        <ScrollProgress />
        <TechBackground />
        <CursorSpotlight />

        {/* Global Navbar: shown on marketing & workspace views (onboarding has its own step header) */}
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
            {/* VIEW BRANCH A: Onboarding Wizard for new creators */}
            {currentView === 'onboarding' ? (
              <OnboardingFlow
                onComplete={handleOnboardingComplete}
                onExitToWebsite={() => {
                  setCurrentView('marketing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : currentView === 'marketing' ? (
              /* VIEW BRANCH B: Public Marketing Landing Page & Footer */
              <>
                <LandingPage
                  onLaunchApp={handleLaunchApp}
                  onNavigateToModule={handleNavigateToModule}
                />
                <Footer onNavigateToAppTab={handleNavigateToModule} />
              </>
            ) : (
              /* VIEW BRANCH C: Private Creator Workspace Dashboard */
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
