import React from 'react';
import { ArrowUpRight, Layers3, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const Footer: React.FC<{ onNavigateToAppTab?: (tab: string) => void }> = ({ onNavigateToAppTab }) => <footer className="site-footer">
  <div className="footer-shell">
    <div className="footer-main">
      <div className="footer-brand">
        <a href="#top" className="footer-lockup"><span className="brand-mark"><Sparkles size={16} /></span><span className="brand-type"><b>Creator’s</b><small>INTELLIGENCE, IN MOTION</small></span></a>
        <p>The good stuff isn’t just in the post. It’s in the decisions you make around it.</p>
        <span className="footer-stamp">MAKE SOMETHING<br />MEAN SOMETHING <Sparkles size={14} /></span>
      </div>
      <div><h3><TrendingUp size={15} /> Content intelligence</h3><ul><li><button onClick={() => onNavigateToAppTab?.('detective')}>Algorithm Detective</button></li><li><button onClick={() => onNavigateToAppTab?.('scientist')}>Creator Scientist</button></li><li><button onClick={() => onNavigateToAppTab?.('originality')}>Originality Monitor</button></li><li><button onClick={() => onNavigateToAppTab?.('recycler')}>Smart Recycler</button></li></ul></div>
      <div><h3><ShieldCheck size={15} /> Revenue & protection</h3><ul><li><button onClick={() => onNavigateToAppTab?.('risk-scanner')}>Monetization Scanner</button></li><li><button onClick={() => onNavigateToAppTab?.('revenue-analytics')}>Qualified Revenue</button></li><li><button onClick={() => onNavigateToAppTab?.('platform-changes')}>Platform Changes</button></li></ul></div>
      <div><h3><Layers3 size={15} /> Partnerships</h3><ul><li><button onClick={() => onNavigateToAppTab?.('sponsor-radar')}>Sponsor Radar</button></li><li><button onClick={() => onNavigateToAppTab?.('rate-calculator')}>Rate Calculator</button></li><li><button onClick={() => onNavigateToAppTab?.('deal-crm')}>Deal Pipeline</button></li></ul></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Creator’s. Built for the people behind the posts.</span><div><a href="#faq">Privacy & data <ArrowUpRight size={12} /></a><span>Independent by design.</span></div></div>
  </div>
</footer>;
