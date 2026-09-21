import React from 'react';
import { Sparkles, LayoutDashboard, Globe, Zap, Shield, DollarSign, Bell } from 'lucide-react';

interface NavbarProps {
  currentView: 'marketing' | 'app';
  setCurrentView: (view: 'marketing' | 'app') => void;
  activeAppTab?: string;
  setActiveAppTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeAppTab,
  setActiveAppTab,
}) => {
  return (
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

          {currentView === 'app' ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
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
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 py-1 px-2.5 rounded-lg">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-950">
                  CR
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-white leading-tight">Alex Rivera</div>
                  <div className="text-[10px] text-emerald-400 font-mono">52.4k views/mo</div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('app')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-brand-600 fill-brand-600" />
              <span>Free Demo Workspace</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
