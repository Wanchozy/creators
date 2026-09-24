import React from 'react';
import { XCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { SurfaceCard } from '@/shared/components/motion';

export const OldWayComparison: React.FC = () => {
  const comparisons = [
    {
      feature: 'Algorithmic Drop Analysis',
      oldWay: 'Staring at confusing studio retention lines with zero causal explanation why views tanked.',
      newWay: 'Instant 8-second autopsy isolating the exact second seed audiences swiped away.',
    },
    {
      feature: 'Sponsorship Valuation',
      oldWay: 'Blindly multiplying follower count by $10 and leaving $1,000s in whitelisting rights on the table.',
      newWay: 'Commercial rate pricing factoring in audience geography, paid ad usage, and exclusivity lockouts.',
    },
    {
      feature: 'Monetization Policy Safety',
      oldWay: 'Waking up to sudden yellow-dollar strikes and demonetization after weeks of production.',
      newWay: 'Pre-upload risk scanner analyzing continuous third-party footage and music clearance before posting.',
    },
    {
      feature: 'Brand Outreach & CRM',
      oldWay: 'Chaotic notes app entries, lost contract PDFs, and chasing late invoices for 90 days.',
      newWay: 'Pocket Sponsor Radar with direct marketing contacts and one-click deal tracking pipeline.',
    },
    {
      feature: 'Creator Media Kit',
      oldWay: 'Static Canva PDF files that become instantly outdated the moment a video goes viral.',
      newWay: 'Live, verified one-sheet URL (/m/:handle) with real-time stats, rate cards, and direct brand contact.',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>The Causal Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Old Guessing Game vs. Creator's Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Why leading creators are replacing scattered spreadsheets and blind analytics with a dedicated operating system.
          </p>
        </div>

        <SurfaceCard className="overflow-hidden border border-white/[0.08]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="py-4 px-5 text-slate-400 font-mono uppercase tracking-wider text-[11px] w-1/4">
                    Workflow
                  </th>
                  <th className="py-4 px-5 text-rose-400/90 font-mono uppercase tracking-wider text-[11px] w-3/8">
                    The Old Way (Spreadsheets & Guessing)
                  </th>
                  <th className="py-4 px-5 text-emerald-400 font-mono uppercase tracking-wider text-[11px] w-3/8">
                    Creator's (Mobile Intelligence)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparisons.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.015] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      {item.feature}
                    </td>
                    <td className="py-4 px-5 text-slate-400 leading-relaxed">
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-rose-500/70 shrink-0 mt-0.5" />
                        <span>{item.oldWay}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-200 leading-relaxed bg-emerald-500/[0.02]">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{item.newWay}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
};
