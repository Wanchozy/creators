import React, { useState } from 'react';
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { LandingPage } from '@/website/pages/LandingPage';
import { AppShell } from '@/app/shell/AppShell';

export function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'app'>('marketing');
  const [activeAppTab, setActiveAppTab] = useState<string>('overview');

  const handleLaunchApp = () => {
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToModule = (tab: string) => {
    setActiveAppTab(tab);
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeAppTab={activeAppTab}
        setActiveAppTab={handleNavigateToModule}
      />

      <div className="flex-1">
        {currentView === 'marketing' ? (
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
            onNavigateToWebsite={() => setCurrentView('marketing')}
          />
        )}
      </div>
    </div>
  );
}

export default App;
