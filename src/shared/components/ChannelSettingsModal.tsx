import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  CheckCircle2,
  User,
  Globe,
  DollarSign,
  Users,
  Sparkles,
  Eye,
  RefreshCw,
  Compass
} from 'lucide-react';
import { useProfile } from '@/shared/hooks/useProfile';
import { useToast } from '@/shared/components/Toast';
import type { Platform, CreatorPersona } from '@/shared/types';

interface ChannelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchOnboarding?: () => void;
}

export const ChannelSettingsModal: React.FC<ChannelSettingsModalProps> = ({
  isOpen,
  onClose,
  onLaunchOnboarding,
}) => {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();

  const [channelName, setChannelName] = useState(profile.channelName || '');
  const [primaryPlatform, setPrimaryPlatform] = useState<Platform>(profile.primaryPlatform || 'youtube');
  const [persona, setPersona] = useState<CreatorPersona>(profile.persona || 'solo_creator');
  const [niche, setNiche] = useState(profile.niche || 'Tech & Productivity');
  const [subscriberCount, setSubscriberCount] = useState<number>(profile.subscriberCount || 50000);
  const [averageViews, setAverageViews] = useState<number>(profile.averageViews || 25000);
  const [defaultCurrency, setDefaultCurrency] = useState(profile.defaultCurrency || 'USD');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setChannelName(profile.channelName || '');
      setPrimaryPlatform(profile.primaryPlatform || 'youtube');
      if (profile.persona) setPersona(profile.persona);
      setNiche(profile.niche || 'Tech & Productivity');
      setSubscriberCount(profile.subscriberCount || 50000);
      setAverageViews(profile.averageViews || 25000);
      setDefaultCurrency(profile.defaultCurrency || 'USD');
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        channelName,
        primaryPlatform,
        persona,
        niche,
        subscriberCount,
        averageViews,
        defaultCurrency,
      });
      toast.success('Channel profile updated and synced with Supabase!');
      onClose();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update channel profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Channel Profile & Baseline Settings</h2>
            <p className="text-xs text-slate-400">
              Personalizes your Rate Calculator, Deal CRM, and Algorithm Detective benchmarks.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Creator / Channel Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g. MKBHD, Tech Lead, Alex Rivers"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Creator Persona
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as CreatorPersona)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="solo_creator">Solo Creator</option>
                <option value="podcast_host">Podcast Host & Longform</option>
                <option value="production_studio">Production Studio</option>
                <option value="agency">Agency / Talent Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Platform
              </label>
              <select
                value={primaryPlatform}
                onChange={(e) => setPrimaryPlatform(e.target.value as Platform)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Content Niche
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Tech & Productivity">Tech & Productivity</option>
                <option value="Finance & Business">Finance & Business</option>
                <option value="Gaming & Streaming">Gaming & Streaming</option>
                <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
                <option value="Education & Science">Education & Science</option>
                <option value="Fitness & Health">Fitness & Health</option>
                <option value="Comedy & Entertainment">Comedy & Entertainment</option>
                <option value="AI & Creative Tools">AI & Creative Tools</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Default Currency
              </label>
              <select
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="KES">KES (KSh)</option>
                <option value="NGN">NGN (₦)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subscribers / Followers
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="0"
                  value={subscriberCount}
                  onChange={(e) => setSubscriberCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Average Views per Post
              </label>
              <div className="relative">
                <Eye className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="0"
                  value={averageViews}
                  onChange={(e) => setAverageViews(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 space-y-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saving ? 'Saving to Supabase...' : 'Save Channel Profile'}</span>
            </button>

            {onLaunchOnboarding && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchOnboarding();
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs flex items-center justify-center space-x-2 transition"
              >
                <Compass className="w-3.5 h-3.5 text-brand-400" />
                <span>Re-run Guided Onboarding Journey</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
