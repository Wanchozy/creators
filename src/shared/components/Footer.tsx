import React from 'react';
import { Sparkles, Shield, TrendingUp, Layers, Smartphone, Apple, Play } from 'lucide-react';

export const Footer: React.FC<{ onNavigateToAppTab?: (tab: string) => void }> = ({ onNavigateToAppTab }) => {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07080c] py-14 px-4 sm:px-6 lg:px-8 text-slate-400">
      {/* Specular Top Edge Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand statement */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold text-white">Creator's</span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                Mobile v2.0
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            The dedicated mobile operating system helping creators diagnose distribution throttles, scan monetization risks, and price sponsorship deals anywhere they film.
          </p>
          
          {/* Vercel-Style Live Status Pill */}
          <div className="pt-2">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Content Intelligence Pillar */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Content Intelligence</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigateToAppTab?.('detective')} className="hover:text-white transition-colors">
                Algorithm Detective (Retention Drop Autopsy)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('scientist')} className="hover:text-white transition-colors">
                Creator Scientist (Pattern Mining)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('originality')} className="hover:text-white transition-colors">
                Originality & AI Copycat Sentinel
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('recycler')} className="hover:text-white transition-colors">
                Smart Recycler (Mobile Short Crops)
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
              <button onClick={() => onNavigateToAppTab?.('risk-scanner')} className="hover:text-white transition-colors">
                Pre-Upload Camera Roll Risk Scanner
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('platform-changes')} className="hover:text-white transition-colors">
                Platform Changes & Policy Tracker
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToAppTab?.('revenue-analytics')} className="hover:text-white transition-colors">
                Qualified Views & RPM Demystifier
              </button>
            </li>
          </ul>
        </div>

        {/* Business & Mobile Apps */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
            <span>Mobile Beta Downloads</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <a
              href="#bento"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center space-x-2.5 transition text-slate-300 hover:text-white"
            >
              <Apple className="w-4 h-4 text-white" />
              <div>
                <div className="font-semibold leading-tight">iOS TestFlight</div>
                <div className="text-[10px] text-slate-500 font-mono">v2.0.4 • Public Beta</div>
              </div>
            </a>
            <a
              href="#bento"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center space-x-2.5 transition text-slate-300 hover:text-white"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-semibold leading-tight">Android Google Play</div>
                <div className="text-[10px] text-slate-500 font-mono">Direct APK & Store Beta</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div>© {new Date().getFullYear()} Creator's Platform Inc. Built for human creators.</div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0 font-mono text-[11px]">
          <span>Policy compliant with 2026 YouTube & TikTok Terms</span>
          <span>•</span>
          <span>Encrypted Local Storage</span>
        </div>
      </div>
    </footer>
  );
};
