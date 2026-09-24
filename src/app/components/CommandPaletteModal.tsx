import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  LayoutDashboard,
  TrendingDown,
  Brain,
  ShieldAlert,
  Scissors,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  Briefcase,
  DollarSign,
  Layers,
  FileText,
  Settings,
  Globe,
  Sparkles,
  ArrowRight,
  Command,
  X,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useProfile } from '@/shared/hooks/useProfile';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  onOpenSettings: () => void;
  onNavigateToWebsite: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Commercial & Deals' | 'Content Lab' | 'Monetization & Safety' | 'Navigation' | 'Settings';
  icon: React.ElementType;
  badge?: string;
  shortcut?: string;
  handler: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenSettings,
  onNavigateToWebsite,
}) => {
  const { profile } = useProfile();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const actions: PaletteAction[] = useMemo(
    () => [
      // Navigation
      {
        id: 'overview',
        title: 'Command Center Overview',
        subtitle: 'High-level channel health, KPIs, and urgent alerts',
        category: 'Navigation',
        icon: LayoutDashboard,
        badge: 'Hub',
        shortcut: 'G O',
        handler: () => {
          onSelectTab('overview');
          onClose();
        },
      },
      // Commercial & Deals
      {
        id: 'rate-calculator',
        title: 'Commercial Rate & Deal Calculator',
        subtitle: 'Calculate fair pricing with whitelisting & exclusivity',
        category: 'Commercial & Deals',
        icon: DollarSign,
        badge: 'Pricing',
        shortcut: 'G R',
        handler: () => {
          onSelectTab('rate-calculator');
          onClose();
        },
      },
      {
        id: 'media-kit',
        title: 'Media Kit Studio & Brand Pitches',
        subtitle: 'Live commercial one-sheet and counter-offer pitch drafts',
        category: 'Commercial & Deals',
        icon: FileText,
        badge: 'Pitch',
        shortcut: 'G M',
        handler: () => {
          onSelectTab('media-kit');
          onClose();
        },
      },
      {
        id: 'sponsor-radar',
        title: 'Sponsor Radar (Brand Discovery)',
        subtitle: 'Search 50+ active brands buying integrations in your niche',
        category: 'Commercial & Deals',
        icon: Briefcase,
        badge: 'Brands',
        shortcut: 'G S',
        handler: () => {
          onSelectTab('sponsor-radar');
          onClose();
        },
      },
      {
        id: 'deal-crm',
        title: 'Sponsorship Pipeline CRM',
        subtitle: 'Kanban deal board, contract scanner, and commercial invoices',
        category: 'Commercial & Deals',
        icon: Layers,
        badge: 'Kanban',
        shortcut: 'G D',
        handler: () => {
          onSelectTab('deal-crm');
          onClose();
        },
      },
      // Content Lab
      {
        id: 'detective',
        title: 'Algorithm Detective (Drop Autopsy)',
        subtitle: 'Diagnose why views collapsed at the 0:08s retention cliff',
        category: 'Content Lab',
        icon: TrendingDown,
        badge: 'Autopsy',
        shortcut: 'G A',
        handler: () => {
          onSelectTab('detective');
          onClose();
        },
      },
      {
        id: 'scientist',
        title: 'Creator Scientist (Pattern Discovery)',
        subtitle: 'Statistical correlation of winning attributes vs failures',
        category: 'Content Lab',
        icon: Brain,
        badge: 'Patterns',
        shortcut: 'G P',
        handler: () => {
          onSelectTab('scientist');
          onClose();
        },
      },
      {
        id: 'originality',
        title: 'Originality & Copycat Monitor',
        subtitle: 'AI scraper and scraper channel alert scanner with 1-click DMCA',
        category: 'Content Lab',
        icon: ShieldAlert,
        badge: 'DMCA',
        shortcut: 'G C',
        handler: () => {
          onSelectTab('originality');
          onClose();
        },
      },
      {
        id: 'recycler',
        title: 'Smart Content Recycler',
        subtitle: 'Extract viral tension clips and 9:16 vertical crops',
        category: 'Content Lab',
        icon: Scissors,
        badge: 'Viral Clips',
        handler: () => {
          onSelectTab('recycler');
          onClose();
        },
      },
      // Monetization & Safety
      {
        id: 'risk-scanner',
        title: 'Monetization Risk Scanner',
        subtitle: 'Pre-upload check for 2026 inauthentic content policies',
        category: 'Monetization & Safety',
        icon: AlertTriangle,
        badge: 'Policy',
        handler: () => {
          onSelectTab('risk-scanner');
          onClose();
        },
      },
      {
        id: 'platform-changes',
        title: 'Platform Change Tracker',
        subtitle: 'Real-time changelog across YouTube, TikTok, and Instagram',
        category: 'Monetization & Safety',
        icon: RefreshCw,
        badge: '3 Alerts',
        handler: () => {
          onSelectTab('platform-changes');
          onClose();
        },
      },
      {
        id: 'revenue-analytics',
        title: 'Qualified Views & RPM Demystifier',
        subtitle: 'TikTok Creator Rewards payout waterfall and RPM factors',
        category: 'Monetization & Safety',
        icon: BarChart3,
        badge: 'RPM',
        handler: () => {
          onSelectTab('revenue-analytics');
          onClose();
        },
      },
      // Settings & Public
      {
        id: 'settings',
        title: 'Channel Baseline & Currency Settings',
        subtitle: 'Update subscriber counts, average views, and preferred currency',
        category: 'Settings',
        icon: Settings,
        badge: 'Config',
        shortcut: '⌘ ,',
        handler: () => {
          onOpenSettings();
          onClose();
        },
      },
      {
        id: 'website',
        title: 'Switch to Public Marketing Website',
        subtitle: 'Return to public feature showcases, pricing, and teasers',
        category: 'Settings',
        icon: Globe,
        badge: 'Public Site',
        handler: () => {
          onNavigateToWebsite();
          onClose();
        },
      },
    ],
    [onSelectTab, onOpenSettings, onNavigateToWebsite, onClose]
  );

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    const normalizedQuery = query.toLowerCase();
    return actions.filter(
      (action) =>
        action.title.toLowerCase().includes(normalizedQuery) ||
        (action.subtitle && action.subtitle.toLowerCase().includes(normalizedQuery)) ||
        action.category.toLowerCase().includes(normalizedQuery) ||
        (action.badge && action.badge.toLowerCase().includes(normalizedQuery))
    );
  }, [actions, query]);

  // Group filtered actions by category for Raycast section layout
  const groupedActions = useMemo(() => {
    const groups: { [key: string]: PaletteAction[] } = {};
    filteredActions.forEach((action) => {
      if (!groups[action.category]) {
        groups[action.category] = [];
      }
      groups[action.category].push(action);
    });
    return groups;
  }, [filteredActions]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredActions.length || 1)) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const action = filteredActions[selectedIndex];
        if (action) {
          action.handler();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  let flatIndexCounter = -1;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#090b10] border border-white/[0.12] rounded-2xl max-w-xl w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        {/* Overhead Hairline Shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Creator Channel Context Ribbon */}
        <div className="px-4 py-2 bg-[#0c0e16] border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-semibold text-white">{profile.channelName || 'Creator Studio'}</span>
            <span className="text-slate-600">•</span>
            <span className="capitalize">{profile.primaryPlatform}</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {(profile.subscriberCount || 0).toLocaleString()} Subscribers
          </div>
        </div>

        {/* Raycast Search Input */}
        <div className="p-3.5 border-b border-white/[0.08] flex items-center space-x-3 bg-[#0d101a]">
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search tools... (e.g., rate, drop, CRM, pitch)"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-500 hover:text-white text-xs font-mono"
            >
              Clear
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono text-slate-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Grouped Results List */}
        <div ref={listRef} className="max-h-96 overflow-y-auto p-2 space-y-3">
          {filteredActions.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-mono">
              No matching commands found for "{query}".
            </div>
          ) : (
            Object.entries(groupedActions).map(([category, items]) => (
              <div key={category} className="space-y-1">
                {/* Category Header */}
                <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-[9px] text-slate-600">{items.length}</span>
                </div>

                {/* Items in Category */}
                <div className="space-y-0.5">
                  {items.map((action) => {
                    flatIndexCounter += 1;
                    const currentIndex = flatIndexCounter;
                    const isSelected = selectedIndex === currentIndex;
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.id}
                        onClick={action.handler}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left group ${
                          isSelected
                            ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-xs'
                            : 'text-slate-300 hover:bg-white/[0.03] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0 pr-2">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                              isSelected ? 'bg-indigo-500 text-white' : 'bg-white/[0.04] text-slate-400 group-hover:text-slate-200'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white text-xs truncate">
                              {action.title}
                            </div>
                            {action.subtitle && (
                              <div className="text-[10px] text-slate-400 truncate">
                                {action.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          {action.shortcut && (
                            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                              {action.shortcut}
                            </kbd>
                          )}
                          {action.badge && (
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 font-semibold'
                                  : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                              }`}
                            >
                              {action.badge}
                            </span>
                          )}
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Raycast Action Bar Footer */}
        <div className="px-4 py-2.5 bg-[#07090e] border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500 select-none">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                ↑
              </kbd>{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                ↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                ↵
              </kbd>{' '}
              Select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                ESC
              </kbd>{' '}
              Close
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-indigo-400">
            <Command className="w-3 h-3" />
            <span>Raycast Spotlight</span>
          </div>
        </div>
      </div>
    </div>
  );
};
