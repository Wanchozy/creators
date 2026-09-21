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
  Bell
} from 'lucide-react';
import { OverviewDashboard } from './OverviewDashboard';
import { AlgorithmDetective } from './AlgorithmDetective';
import { CreatorScientist } from './CreatorScientist';
import { OriginalityMonitor } from './OriginalityMonitor';
import { SponsorRadar } from './SponsorRadar';
import { RateCalculator } from './RateCalculator';
import { MonetizationRiskScanner } from './MonetizationRiskScanner';
import { PlatformChangeTracker } from './PlatformChangeTracker';
import { SmartRecycler } from './SmartRecycler';
import { QualifiedRevenueAnalytics } from './QualifiedRevenueAnalytics';
import { DealPipelineCRM } from './DealPipelineCRM';
import { useDeals } from '../../hooks/useDeals';

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
      lastContactDate: 'Today'
    });
    setActiveTab('deal-crm');
  };

  const navGroups = [
    {
      group: 'Intelligence Center',
      items: [
        { id: 'overview', label: 'Command Center', icon: LayoutDashboard, badge: null }
      ]
    },
    {
      group: 'Pillar 1: Content Lab',
      items: [
        { id: 'detective', label: 'Algorithm Detective', icon: TrendingDown, badge: 'Drop Autopsy' },
        { id: 'scientist', label: 'Creator Scientist', icon: Brain, badge: 'Patterns' },
        { id: 'originality', label: 'Originality Monitor', icon: ShieldAlert, badge: 'AI Clones' },
        { id: 'recycler', label: 'Smart Recycler', icon: Scissors, badge: 'Viral Clips' }
      ]
    },
    {
      group: 'Pillar 2: Monetization & Safety',
      items: [
        { id: 'risk-scanner', label: 'Monetization Risk Scanner', icon: AlertTriangle, badge: 'Pre-Upload' },
        { id: 'platform-changes', label: 'Platform Changes', icon: RefreshCw, badge: '3 Alerts' },
        { id: 'revenue-analytics', label: 'Qualified Views & RPM', icon: BarChart3, badge: 'RPM Demystifier' }
      ]
    },
    {
      group: 'Pillar 3: Deal & Business Hub',
      items: [
        { id: 'sponsor-radar', label: 'Sponsor Radar', icon: Briefcase, badge: 'Brand Finder' },
        { id: 'rate-calculator', label: 'Rate & Deal Calculator', icon: DollarSign, badge: 'Licensing' },
        { id: 'deal-crm', label: 'Sponsorship CRM', icon: Layers, badge: 'Kanban' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white text-base">Creator's App</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-925 border-r border-slate-800/80 p-4 shrink-0 overflow-y-auto space-y-6`}
      >
        {/* Workspace Brand Indicator */}
        <div className="hidden md:flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">Alex's Channel</div>
              <div className="text-[10px] text-slate-400 font-mono">52.4k views • Pro Tier</div>
            </div>
          </div>
        </div>

        {/* Navigation Group Items */}
        <div className="space-y-5">
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2.5">
                {grp.group}
              </div>
              <div className="space-y-1">
                {grp.items.map((item) => {
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
        {activeTab === 'detective' && <AlgorithmDetective />}
        {activeTab === 'scientist' && <CreatorScientist />}
        {activeTab === 'originality' && <OriginalityMonitor />}
        {activeTab === 'sponsor-radar' && (
          <SponsorRadar onPitchCreated={(brand, val) => handleAddDealFromExternal(brand, val)} />
        )}
        {activeTab === 'rate-calculator' && (
          <RateCalculator onSendToCRM={(brand, amt) => handleAddDealFromExternal(brand, amt)} />
        )}
        {activeTab === 'risk-scanner' && <MonetizationRiskScanner />}
        {activeTab === 'platform-changes' && <PlatformChangeTracker />}
        {activeTab === 'recycler' && <SmartRecycler />}
        {activeTab === 'revenue-analytics' && <QualifiedRevenueAnalytics />}
        {activeTab === 'deal-crm' && <DealPipelineCRM />}
      </main>
    </div>
  );
};
