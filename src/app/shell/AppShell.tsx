import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingDown,
  Brain,
  ShieldAlert,
  Briefcase,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Scissors,
  BarChart3,
  Layers,
  Sparkles,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useDeals } from '@/shared/hooks/useDeals';

// Pillar 0: Command Center
import { OverviewDashboard } from '@/app/views/OverviewDashboard';

// Pillar 1: Content Lab
import { AlgorithmDetectiveView } from '@/app/views/content-lab/AlgorithmDetectiveView';
import { CreatorScientistView } from '@/app/views/content-lab/CreatorScientistView';
import { OriginalityMonitorView } from '@/app/views/content-lab/OriginalityMonitorView';
import { SmartRecyclerView } from '@/app/views/content-lab/SmartRecyclerView';

// Pillar 2: Monetization & Safety
import { MonetizationRiskScannerView } from '@/app/views/monetization/MonetizationRiskScannerView';
import { PlatformChangeTrackerView } from '@/app/views/monetization/PlatformChangeTrackerView';
import { QualifiedRevenueAnalyticsView } from '@/app/views/monetization/QualifiedRevenueAnalyticsView';

// Pillar 3: Deal & Business Hub
import { RateCalculatorView } from '@/app/views/deals/RateCalculatorView';
import { SponsorRadarView } from '@/app/views/deals/SponsorRadarView';
import { DealPipelineCRMView } from '@/app/views/deals/DealPipelineCRMView';

interface AppShellProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigateToWebsite: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ activeTab, setActiveTab, onNavigateToWebsite }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { addDeal } = useDeals();

  const handleAddDealFromExternal = async (brandName: string, amount: number) => {
    await addDeal({
      brandName: brandName || 'New Brand Sponsor',
      contactEmail: `partnerships@${brandName.toLowerCase().replace(/\s+/g, '') || 'sponsor'}.com`,
      stage: 'Pitched',
      dealValue: amount,
      deliverables: ['1x YouTube 60s Integration', '30-day Paid Ad Rights'],
      deadline: 'Dec 15, 2026',
      usageRights: '30 days paid whitelisting',
      exclusivityWindow: '30 days category',
      paymentTerms: '50% upfront, 50% post-publication',
      paidAmount: 0,
      notes: 'Generated and added from Creator Rate Calculator.',
      lastContactDate: 'Today',
    });
    setActiveTab('deal-crm');
  };

  const navGroups = [
    {
      group: 'Intelligence Center',
      items: [
        { id: 'overview', label: 'Command Center', icon: LayoutDashboard, badge: null },
      ],
    },
    {
      group: 'Pillar 1: Content Lab',
      items: [
        { id: 'detective', label: 'Algorithm Detective', icon: TrendingDown, badge: 'Drop Autopsy' },
        { id: 'scientist', label: 'Creator Scientist', icon: Brain, badge: 'Patterns' },
        { id: 'originality', label: 'Originality Monitor', icon: ShieldAlert, badge: 'AI Clones' },
        { id: 'recycler', label: 'Smart Recycler', icon: Scissors, badge: 'Viral Clips' },
      ],
    },
    {
      group: 'Pillar 2: Monetization & Safety',
      items: [
        { id: 'risk-scanner', label: 'Monetization Risk Scanner', icon: AlertTriangle, badge: 'Pre-Upload' },
        { id: 'platform-changes', label: 'Platform Changes', icon: RefreshCw, badge: '3 Alerts' },
        { id: 'revenue-analytics', label: 'Qualified Views & RPM', icon: BarChart3, badge: 'RPM Demystifier' },
      ],
    },
    {
      group: 'Pillar 3: Deal & Business Hub',
      items: [
        { id: 'sponsor-radar', label: 'Sponsor Radar', icon: Briefcase, badge: 'Brand Finder' },
        { id: 'rate-calculator', label: 'Rate & Deal Calculator', icon: DollarSign, badge: 'Licensing' },
        { id: 'deal-crm', label: 'Sponsorship CRM', icon: Layers, badge: 'Kanban' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-16 z-30">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Creator Workspace</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 border border-slate-700"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 shrink-0 bg-slate-950 border-r border-slate-800/80 p-4 space-y-6 flex flex-col justify-between ${
          mobileMenuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/15'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Website Button in Sidebar */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onNavigateToWebsite}
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-center space-x-2 transition"
          >
            <Globe className="w-3.5 h-3.5 text-brand-400" />
            <span>Public Website & Features</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && <OverviewDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'detective' && <AlgorithmDetectiveView />}
        {activeTab === 'scientist' && <CreatorScientistView />}
        {activeTab === 'originality' && <OriginalityMonitorView />}
        {activeTab === 'sponsor-radar' && (
          <SponsorRadarView onPitchCreated={(brand, val) => handleAddDealFromExternal(brand, val)} />
        )}
        {activeTab === 'rate-calculator' && (
          <RateCalculatorView onSendToCRM={(brand, amt) => handleAddDealFromExternal(brand, amt)} />
        )}
        {activeTab === 'risk-scanner' && <MonetizationRiskScannerView />}
        {activeTab === 'platform-changes' && <PlatformChangeTrackerView />}
        {activeTab === 'recycler' && <SmartRecyclerView />}
        {activeTab === 'revenue-analytics' && <QualifiedRevenueAnalyticsView />}
        {activeTab === 'deal-crm' && <DealPipelineCRMView />}
      </main>
    </div>
  );
};
