import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
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
  Settings,
  ShieldCheck,
  LogIn,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useDeals } from '@/shared/hooks/useDeals';
import { useAuth } from '@/shared/hooks/useAuth';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import { AuthModal } from '@/shared/components/AuthModal';
import { ChannelSettingsModal } from '@/shared/components/ChannelSettingsModal';
import { CommandPaletteModal } from '@/app/components/CommandPaletteModal';

// Lazy-loaded workspace views — each tool becomes its own chunk
const OverviewDashboard = lazy(() => import('@/app/views/OverviewDashboard').then((m) => ({ default: m.OverviewDashboard })));
const AlgorithmDetectiveView = lazy(() => import('@/app/views/content-lab/AlgorithmDetectiveView').then((m) => ({ default: m.AlgorithmDetectiveView })));
const CreatorScientistView = lazy(() => import('@/app/views/content-lab/CreatorScientistView').then((m) => ({ default: m.CreatorScientistView })));
const OriginalityMonitorView = lazy(() => import('@/app/views/content-lab/OriginalityMonitorView').then((m) => ({ default: m.OriginalityMonitorView })));
const SmartRecyclerView = lazy(() => import('@/app/views/content-lab/SmartRecyclerView').then((m) => ({ default: m.SmartRecyclerView })));
const MonetizationRiskScannerView = lazy(() => import('@/app/views/monetization/MonetizationRiskScannerView').then((m) => ({ default: m.MonetizationRiskScannerView })));
const PlatformChangeTrackerView = lazy(() => import('@/app/views/monetization/PlatformChangeTrackerView').then((m) => ({ default: m.PlatformChangeTrackerView })));
const QualifiedRevenueAnalyticsView = lazy(() => import('@/app/views/monetization/QualifiedRevenueAnalyticsView').then((m) => ({ default: m.QualifiedRevenueAnalyticsView })));
const MediaKitStudioView = lazy(() => import('@/app/views/deals/MediaKitStudioView').then((m) => ({ default: m.MediaKitStudioView })));
const RateCalculatorView = lazy(() => import('@/app/views/deals/RateCalculatorView').then((m) => ({ default: m.RateCalculatorView })));
const SponsorRadarView = lazy(() => import('@/app/views/deals/SponsorRadarView').then((m) => ({ default: m.SponsorRadarView })));
const DealPipelineCRMView = lazy(() => import('@/app/views/deals/DealPipelineCRMView').then((m) => ({ default: m.DealPipelineCRMView })));

/** Subtle spinner shown while a workspace view chunk loads */
function ViewLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

interface AppShellProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigateToWebsite: () => void;
  onLaunchOnboarding?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  setActiveTab,
  onNavigateToWebsite,
  onLaunchOnboarding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { user, isConfigured } = useAuth();
  const { profile } = useProfile();
  const { addDeal } = useDeals();
  const { toast } = useToast();

  const isAuthenticated = Boolean(user && !user.isDemo);

  const handleAddDealFromExternal = async (brandName: string, amount: number) => {
    try {
      await addDeal({
        brandName: brandName || 'New Brand Sponsor',
        contactEmail: `partnerships@${(brandName || 'sponsor').toLowerCase().replace(/\s+/g, '')}.com`,
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
      toast.success(`Added ${brandName} ($${amount.toLocaleString()}) to Sponsorship CRM!`);
      setActiveTab('deal-crm');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to add deal');
    }
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
        { id: 'media-kit', label: 'Media Kit & Pitches', icon: FileText, badge: 'One-Sheet' },
        { id: 'sponsor-radar', label: 'Sponsor Radar', icon: Briefcase, badge: 'Brand Finder' },
        { id: 'rate-calculator', label: 'Rate & Deal Calculator', icon: DollarSign, badge: 'Licensing' },
        { id: 'deal-crm', label: 'Sponsorship CRM', icon: Layers, badge: 'Kanban' },
      ],
    },
  ];

  const currentNavGroup = navGroups.find((g) => g.items.some((i) => i.id === activeTab));
  const currentNavItem = currentNavGroup?.items.find((i) => i.id === activeTab);
  const activePillarName = currentNavGroup?.group ? currentNavGroup.group.split(':')[1]?.trim() || currentNavGroup.group : 'Workspace';
  const activeTabLabel = currentNavItem?.label || 'Overview';

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/[0.08] bg-[#0c0e14]/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">CREATOR'S OS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/[0.04] border border-white/[0.08]"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 shrink-0 bg-[#0a0c12] border-r border-white/[0.06] p-4 space-y-6 flex flex-col justify-between ${
          mobileMenuOpen ? 'block fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto bg-[#0a0c12]' : 'hidden md:flex'
        }`}
      >
        <div className="space-y-5">
          {/* Creator Channel Badge Card */}
          <div className="p-3 rounded-xl bg-[#0f121a] border border-white/[0.08] hover:border-white/[0.15] transition flex items-center justify-between group">
            <div className="flex items-center space-x-2.5 min-w-0 pr-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white uppercase shrink-0 shadow-inner">
                {(profile.channelName || 'C')[0]}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition">
                  {profile.channelName || 'Creator Studio'}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center space-x-1 font-mono">
                  <span className="capitalize">{profile.primaryPlatform}</span>
                  <span className="text-slate-600">•</span>
                  <span>{(profile.subscriberCount || 0).toLocaleString()} subs</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition"
              title="Edit Channel Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Command / Jump-to Bar */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] flex items-center justify-between text-slate-400 hover:text-slate-200 text-[11px] font-mono select-none transition group text-left"
          >
            <span className="truncate group-hover:text-white transition">Quick Command...</span>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition">
              ⌘K
            </span>
          </button>

          {/* Navigation Groups */}
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>{group.group}</span>
              </div>
              <div className="space-y-0.5">
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
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors relative group ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActiveIndicator"
                          className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.25 }}
                        />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActiveBar"
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] z-10"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.25 }}
                        />
                      )}
                      <div className="flex items-center space-x-2.5 pl-0.5 min-w-0 relative z-10">
                        <Icon className={`w-4 h-4 shrink-0 transition ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 transition relative z-10 ${
                            isActive
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                              : 'bg-white/[0.03] text-slate-500 border border-white/[0.05]'
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

        {/* Sidebar Footer Actions */}
        <div className="pt-4 border-t border-white/[0.06] space-y-2">
          {isAuthenticated ? (
            <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="font-mono">Supabase RLS Protected</span>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-xs font-semibold text-indigo-300 flex items-center justify-center space-x-2 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Connect Supabase Account</span>
            </button>
          )}

          <button
            onClick={onNavigateToWebsite}
            className="w-full py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center justify-center space-x-2 transition"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>Public Site & Solutions</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07090e] relative h-screen overflow-hidden">
        {/* Subtle Ambient Light at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-36 bg-indigo-500/[0.03] blur-3xl pointer-events-none" />

        {/* Unauthenticated Sync Banner */}
        {!isAuthenticated && (
          <div className="bg-[#0e1018] border-b border-amber-500/20 px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10 shrink-0">
            <div className="flex items-center space-x-2.5 text-slate-300">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
                Sandbox Mode
              </span>
              <span className="text-slate-400">
                Exploring with sample benchmarks. Link your account to save your CRM pipeline, rates, and diagnostics.
              </span>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition shrink-0 shadow-sm"
            >
              Sign In to Save
            </button>
          </div>
        )}

        {/* Linear-Style Sticky Top Command Header */}
        <header className="h-11 shrink-0 px-4 sm:px-6 bg-[#07090e]/95 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between text-xs relative z-20">
          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-2 text-slate-400 font-mono text-[11px]">
            <span className="text-slate-500 uppercase tracking-wider">{activePillarName}</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-200 font-semibold">{activeTabLabel}</span>
            <span className="hidden sm:inline-flex items-center space-x-1.5 ml-3 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE BENCHMARK</span>
            </span>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-slate-400 hover:text-slate-200 text-[11px] font-mono transition"
            >
              <span>Search commands...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-slate-300 font-mono">⌘K</kbd>
            </button>
            <button
              onClick={() => handleAddDealFromExternal('New Brand Inbound', 2500)}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-950 font-semibold text-[11px] transition shadow-sm flex items-center space-x-1"
            >
              <span>+ Deal</span>
            </button>
          </div>
        </header>

        {/* Main View Area with Zero Wasted Space - Full Bleed */}
        <div className="flex-1 w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 custom-scrollbar">
          <Suspense fallback={<ViewLoader />}>
            {activeTab === 'overview' && <OverviewDashboard onNavigateTab={setActiveTab} />}
            {activeTab === 'detective' && <AlgorithmDetectiveView />}
            {activeTab === 'scientist' && <CreatorScientistView />}
            {activeTab === 'originality' && <OriginalityMonitorView />}
            {activeTab === 'media-kit' && (
              <MediaKitStudioView onSendToCRM={(brand, val) => handleAddDealFromExternal(brand, val)} />
            )}
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
          </Suspense>
        </div>

        {/* Linear-Style Bottom Status Bar */}
        <footer className="h-7 shrink-0 px-4 sm:px-6 bg-[#080a0f] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 relative z-20 select-none">
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Navigation:</span>
            <button
              onClick={() => setActiveTab('overview')}
              className="flex items-center space-x-1 hover:text-slate-300 transition"
            >
              <kbd className="px-1 py-0.2 rounded bg-white/[0.06] text-slate-300">G</kbd>
              <kbd className="px-1 py-0.2 rounded bg-white/[0.06] text-slate-300">O</kbd>
              <span className="text-slate-500">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('deal-crm')}
              className="hidden sm:flex items-center space-x-1 hover:text-slate-300 transition"
            >
              <kbd className="px-1 py-0.2 rounded bg-white/[0.06] text-slate-300">G</kbd>
              <kbd className="px-1 py-0.2 rounded bg-white/[0.06] text-slate-300">D</kbd>
              <span className="text-slate-500">Deals</span>
            </button>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden md:flex items-center space-x-1 hover:text-slate-300 transition"
            >
              <kbd className="px-1 py-0.2 rounded bg-white/[0.06] text-slate-300">⌘K</kbd>
              <span className="text-slate-500">Palette</span>
            </button>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span className="inline-flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>RLS Active</span>
            </span>
            <span>•</span>
            <span className="hidden sm:inline">14ms Edge Latency</span>
            <span>•</span>
            <span>Creator's v2.0</span>
          </div>
        </footer>
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ChannelSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onLaunchOnboarding={onLaunchOnboarding}
      />
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onNavigateToWebsite={onNavigateToWebsite}
      />
    </div>
  );
};
