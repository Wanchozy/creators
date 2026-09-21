import React from 'react';
import { Sparkles, Shield, Heart, Terminal, Compass, TrendingUp, Layers } from 'lucide-react';

export const Footer: React.FC<{ onNavigateToAppTab?: (tab: string) => void }> = ({ onNavigateToAppTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand statement */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold text-white">Creator's</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Instead of another AI that spits out generic content, Creator's builds the software that helps creators understand the business and real performance of their content.
          </p>
          <div className="text-[11px] text-slate-400">
            Ground truth analytics for YouTube, TikTok & Instagram.
          </div>
        </div>

        {/* Content Intelligence Pillar */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
            <span>Content Intelligence</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateToAppTab?.('detective')} className="hover:text-brand-300 transition">
                Algorithm Detective ("Why Did My Video Die?")
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('scientist')} className="hover:text-brand-300 transition">
                Creator Scientist (Pattern Mining)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('originality')} className="hover:text-brand-300 transition">
                Originality & AI Copycat Monitor
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('recycler')} className="hover:text-brand-300 transition">
                Smart Recycler (Repurposing Studio)
              </button>
            </li>
          </ul>
        </div>

        {/* Monetization & Protection */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monetization & Safety</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateToAppTab?.('risk-scanner')} className="hover:text-emerald-300 transition">
                Pre-Publish Monetization Risk Checker
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('platform-changes')} className="hover:text-emerald-300 transition">
                Platform Changes & Policy Tracker
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('revenue-analytics')} className="hover:text-emerald-300 transition">
                Qualified Views & RPM Demystifier
              </button>
            </li>
          </ul>
        </div>

        {/* Business & Deals */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Deal Infrastructure</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateToAppTab?.('sponsor-radar')} className="hover:text-amber-300 transition">
                Sponsor Radar (Brand Discovery)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('rate-calculator')} className="hover:text-amber-300 transition">
                Creator Rate & Licensing Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('deal-crm')} className="hover:text-amber-300 transition">
                Sponsorship Pipeline & CRM
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <div>© {new Date().getFullYear()} Creator's Platform Inc. Built for human creators.</div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <span>Policy compliant with 2025/2026 YouTube & TikTok Terms</span>
          <span>•</span>
          <span>Privacy & API Data Encrypted</span>
        </div>
      </div>
    </footer>
  );
};
