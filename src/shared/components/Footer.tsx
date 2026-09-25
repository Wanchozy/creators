import React from 'react';
import { ArrowUpRight, Layers3, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const Footer: React.FC<{ onNavigateToAppTab?: (tab: string) => void }> = ({ onNavigateToAppTab }) => <footer className="site-footer px-5 pb-7 pt-12 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-[1320px]">
    <div className="grid gap-9 border-b border-white/[.09] pb-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
      <div className="max-w-[300px]">
        <a href="#" className="flex items-center gap-2.5"><span className="brand-mark flex h-9 w-9 items-center justify-center rounded-xl"><Sparkles className="h-[17px] w-[17px]" /></span><span className="text-[15px] font-bold tracking-[-.04em] text-[#f1f1e8]">Creator’s</span></a>
        <p className="mt-4 text-xs leading-6 text-[#92978d]">A clearer view of your content, partnerships and the business you’re building around them.</p>
      </div>
      <div><h3 className="footer-heading"><TrendingUp className="h-3.5 w-3.5 text-[#c8e88e]" /> Content intelligence</h3><ul className="footer-list"><li><button onClick={() => onNavigateToAppTab?.('detective')}>Algorithm Detective</button></li><li><button onClick={() => onNavigateToAppTab?.('scientist')}>Creator Scientist</button></li><li><button onClick={() => onNavigateToAppTab?.('originality')}>Originality Monitor</button></li><li><button onClick={() => onNavigateToAppTab?.('recycler')}>Smart Recycler</button></li></ul></div>
      <div><h3 className="footer-heading"><ShieldCheck className="h-3.5 w-3.5 text-[#c8e88e]" /> Revenue & protection</h3><ul className="footer-list"><li><button onClick={() => onNavigateToAppTab?.('risk-scanner')}>Monetization Scanner</button></li><li><button onClick={() => onNavigateToAppTab?.('revenue-analytics')}>Qualified Revenue</button></li><li><button onClick={() => onNavigateToAppTab?.('platform-changes')}>Platform Changes</button></li></ul></div>
      <div><h3 className="footer-heading"><Layers3 className="h-3.5 w-3.5 text-[#c8e88e]" /> Partnerships</h3><ul className="footer-list"><li><button onClick={() => onNavigateToAppTab?.('sponsor-radar')}>Sponsor Radar</button></li><li><button onClick={() => onNavigateToAppTab?.('rate-calculator')}>Rate Calculator</button></li><li><button onClick={() => onNavigateToAppTab?.('deal-crm')}>Deal Pipeline</button></li></ul></div>
    </div>
    <div className="flex flex-col gap-3 pt-5 text-[10px] text-[#737970] sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Creator’s. Built for the people behind the posts.</span><div className="flex items-center gap-4"><a href="#faq" className="footer-bottom-link">Privacy & data <ArrowUpRight className="h-3 w-3" /></a><span>Independent by design</span></div></div>
  </div>
</footer>;
