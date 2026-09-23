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
  X
} from 'lucide-react';

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
  category: 'Navigation' | 'Deal Actions' | 'Content Lab' | 'Settings';
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
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = useMemo(
    () => [
      {
        id: 'overview',
        title: 'Command Center Overview',
        category: 'Navigation',
        icon: LayoutDashboard,
        badge: 'Hub',
        shortcut: 'G O',
        handler: () => {
          onSelectTab('overview');
          onClose();
        },
      },
      {
        id: 'media-kit',
        title: 'Creator Media Kit & Brand Pitch Studio',
        category: 'Deal Actions',
        icon: FileText,
        badge: 'One-Sheet',
        shortcut: 'G M',
        handler: () => {
          onSelectTab('media-kit');
          onClose();
        },
      },
      {
        id: 'rate-calculator',
        title: 'Commercial Rate & Deal Calculator',
        category: 'Deal Actions',
        icon: DollarSign,
        badge: 'Pricing',
        shortcut: 'G R',
        handler: () => {
          onSelectTab('rate-calculator');
          onClose();
        },
      },
      {
        id: 'deal-crm',
        title: 'Sponsorship Deal Pipeline CRM',
        category: 'Deal Actions',
        icon: Layers,
        badge: 'Kanban',
        shortcut: 'G D',
        handler: () => {
          onSelectTab('deal-crm');
          onClose();
        },
      },
      {
        id: 'sponsor-radar',
        title: 'Sponsor Radar (Brand Discovery)',
        category: 'Deal Actions',
        icon: Briefcase,
        badge: 'Brands',
        handler: () => {
          onSelectTab('sponsor-radar');
          onClose();
        },
      },
      {
        id: 'detective',
        title: 'Algorithm Detective (Video Drop Autopsy)',
        category: 'Content Lab',
        icon: TrendingDown,
        badge: 'Autopsy',
        handler: () => {
          onSelectTab('detective');
          onClose();
        },
      },
      {
        id: 'scientist',
        title: 'Creator Scientist (Pattern Discovery)',
        category: 'Content Lab',
        icon: Brain,
        badge: 'Patterns',
        handler: () => {
          onSelectTab('scientist');
          onClose();
        },
      },
      {
        id: 'originality',
        title: 'Originality Monitor (AI Clone Detection)',
        category: 'Content Lab',
        icon: ShieldAlert,
        badge: 'DMCA',
        handler: () => {
          onSelectTab('originality');
          onClose();
        },
      },
      {
        id: 'recycler',
        title: 'Smart Recycler (9:16 Viral Repurposing)',
        category: 'Content Lab',
        icon: Scissors,
        badge: 'Clips',
        handler: () => {
          onSelectTab('recycler');
          onClose();
        },
      },
      {
        id: 'risk-scanner',
        title: 'Monetization Risk Scanner',
        category: 'Navigation',
        icon: AlertTriangle,
        badge: 'Safety',
        handler: () => {
          onSelectTab('risk-scanner');
          onClose();
        },
      },
      {
        id: 'revenue-analytics',
        title: 'Qualified Views & RPM Demystifier',
        category: 'Navigation',
        icon: BarChart3,
        badge: 'Revenue',
        handler: () => {
          onSelectTab('revenue-analytics');
          onClose();
        },
      },
      {
        id: 'platform-changes',
        title: 'Platform Changes & Algorithm Radar',
        category: 'Navigation',
        icon: RefreshCw,
        badge: 'Alerts',
        handler: () => {
          onSelectTab('platform-changes');
          onClose();
        },
      },
      {
        id: 'settings',
        title: 'Channel Baseline & Currency Settings',
        category: 'Settings',
        icon: Settings,
        badge: 'Config',
        handler: () => {
          onOpenSettings();
          onClose();
        },
      },
      {
        id: 'website',
        title: 'Switch to Public Marketing Website',
        category: 'Navigation',
        icon: Globe,
        badge: 'Public',
        handler: () => {
          onNavigateToWebsite();
          onClose();
        },
      },
    ],
    [onSelectTab, onOpenSettings, onNavigateToWebsite, onClose]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const lower = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(lower) ||
        a.category.toLowerCase().includes(lower) ||
        a.badge?.toLowerCase().includes(lower)
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].handler();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 p-4">
      <div className="bg-[#0b0e18] border border-white/[0.12] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center space-x-3 bg-[#0e1220]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to tool... (e.g. Media Kit, CRM, Rate)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/[0.06] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.handler}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition text-left ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-white">{item.title}</span>
                      <span className="text-[10px] text-slate-500 ml-2 font-mono">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected
                            ? 'bg-indigo-500/30 text-indigo-300'
                            : 'bg-white/[0.04] text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer Shortcuts */}
        <div className="px-4 py-2.5 bg-[#090b12] border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
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
          <div className="flex items-center space-x-1 text-indigo-400">
            <Command className="w-3 h-3" />
            <span>Spotlight Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
