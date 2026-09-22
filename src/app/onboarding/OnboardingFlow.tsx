import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Briefcase,
  ShieldAlert,
  User,
  Radio,
  Tv,
  Users,
  Check,
  Zap,
  Info,
  Layers,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useProfile } from '@/shared/hooks/useProfile';
import { useAuth } from '@/shared/hooks/useAuth';
import type { CreatorPersona, CreatorGoal, Platform } from '@/shared/types';

interface OnboardingFlowProps {
  onComplete: () => void;
  onExitToWebsite?: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onExitToWebsite }) => {
  const { profile, updateProfile } = useProfile();
  const { user } = useAuth();

  // Local step state, initialized from profile if saved
  const [currentStep, setCurrentStep] = useState<number>(profile?.onboardingStep || 1);
  const [saving, setSaving] = useState<boolean>(false);

  // Form State
  const [persona, setPersona] = useState<CreatorPersona>(profile?.persona || 'solo_creator');
  const [primaryPlatform, setPrimaryPlatform] = useState<Platform>(profile?.primaryPlatform || 'youtube');
  const [channelName, setChannelName] = useState<string>(
    profile?.channelName || user?.channelName || user?.displayName || 'My Creator Studio'
  );
  const [niche, setNiche] = useState<string>(profile?.niche || 'Tech & Productivity');
  const [subscriberCount, setSubscriberCount] = useState<number>(profile?.subscriberCount || 25000);
  const [averageViews, setAverageViews] = useState<number>(profile?.averageViews || 15000);
  const [selectedGoals, setSelectedGoals] = useState<CreatorGoal[]>(
    profile?.creatorGoals && profile.creatorGoals.length > 0 ? profile.creatorGoals : ['price_deals', 'diagnose_reach']
  );

  // Sync initial state if profile loads later
  useEffect(() => {
    if (profile) {
      if (profile.onboardingStep && profile.onboardingStep > 1) {
        setCurrentStep(profile.onboardingStep);
      }
      if (profile.persona) setPersona(profile.persona);
      if (profile.primaryPlatform) setPrimaryPlatform(profile.primaryPlatform);
      if (profile.channelName) setChannelName(profile.channelName);
      if (profile.niche) setNiche(profile.niche);
      if (profile.subscriberCount) setSubscriberCount(profile.subscriberCount);
      if (profile.averageViews) setAverageViews(profile.averageViews);
      if (profile.creatorGoals && profile.creatorGoals.length > 0) {
        setSelectedGoals(profile.creatorGoals);
      }
    }
  }, [profile?.id]);

  // Persist step changes in background
  const goToStep = async (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      await updateProfile({
        onboardingStep: step,
        persona,
        primaryPlatform,
        channelName,
        niche,
        subscriberCount,
        averageViews,
        creatorGoals: selectedGoals,
      });
    } catch (err) {
      console.warn('Silent onboarding step update error:', err);
    }
  };

  const handleGoalToggle = (goal: CreatorGoal) => {
    if (selectedGoals.includes(goal)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter((g) => g !== goal));
      }
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleFinishOnboarding = async () => {
    setSaving(true);
    try {
      await updateProfile({
        onboardingCompleted: true,
        onboardingStep: 5,
        persona,
        primaryPlatform,
        channelName,
        niche,
        subscriberCount,
        averageViews,
        creatorGoals: selectedGoals,
      });
      onComplete();
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      // Even if network fails, complete in UI
      onComplete();
    } finally {
      setSaving(false);
    }
  };

  // Calculations for First Value Experience ("Aha! Moment")
  const primaryGoal = selectedGoals[0] || 'price_deals';

  // Instant Deal Rate Formula
  const baseRate = Math.max(350, Math.round((averageViews / 1000) * 35));
  const whitelistingFee = Math.round(baseRate * 0.35);
  const exclusivityFee = Math.round(baseRate * 0.45);
  const totalCommercialDeal = baseRate + whitelistingFee + exclusivityFee;
  const naiveFollowerDeal = Math.max(200, Math.round(subscriberCount * 0.015));
  const recapturedDealRevenue = Math.max(400, totalCommercialDeal - naiveFollowerDeal);

  // Niches List
  const niches = [
    'Tech & Productivity',
    'Finance & Business',
    'Gaming & Streaming',
    'Education & Science',
    'Lifestyle & Vlog',
    'Fitness & Health',
    'Comedy & Entertainment',
    'AI & Creative Tools',
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500 selection:text-white antialiased">
      {/* Precision ambient top beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Onboarding Header */}
      <header className="relative z-10 border-b border-white/[0.06] bg-[#0a0c12]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.35)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white tracking-tight">Creator's</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Setup Journey
              </span>
            </div>
          </div>

          {/* Precision Progress Tracker */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <button
                  type="button"
                  disabled={stepNum > currentStep}
                  onClick={() => goToStep(stepNum)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition ${
                    stepNum === currentStep
                      ? 'bg-white text-slate-950 shadow-[0_0_14px_rgba(255,255,255,0.35)] ring-2 ring-indigo-400/40'
                      : stepNum < currentStep
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                      : 'bg-white/[0.03] text-slate-600 border border-white/[0.06]'
                  }`}
                >
                  {stepNum < currentStep ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : stepNum}
                </button>
                {stepNum < 5 && (
                  <div
                    className={`w-3 sm:w-5 h-[1px] mx-1 transition-colors ${
                      stepNum < currentStep ? 'bg-emerald-500/50' : 'bg-white/[0.08]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {onExitToWebsite && (
            <button
              onClick={onExitToWebsite}
              className="text-xs text-slate-400 hover:text-white transition hidden md:block"
            >
              Exit to site
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center w-full">
        {/* STEP 1: Creator Persona */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">Step 1 of 5</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">What kind of creator business are you building?</h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                We'll tailor your commercial pricing models, drop-off diagnostic benchmarks, and platform alerts to your operating model.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                {
                  id: 'solo_creator' as CreatorPersona,
                  title: 'Solo Creator',
                  desc: 'Independent video essayist, tech reviewer, vlog or educational channel producing self-filmed content.',
                  icon: User,
                  badge: 'Standard',
                  accent: 'text-indigo-400',
                },
                {
                  id: 'podcast_host' as CreatorPersona,
                  title: 'Podcast & Longform Studio',
                  desc: 'Multi-camera studio, deep-dive interview format, or episodic commentary with hour-plus releases.',
                  icon: Radio,
                  badge: 'High Sponsorship',
                  accent: 'text-purple-400',
                },
                {
                  id: 'production_studio' as CreatorPersona,
                  title: 'Production Studio',
                  desc: 'Original media production with dedicated editors, researchers, recurring shows, and seasonal budgets.',
                  icon: Tv,
                  badge: 'Team Workflow',
                  accent: 'text-amber-400',
                },
                {
                  id: 'agency' as CreatorPersona,
                  title: 'Agency or Talent Manager',
                  desc: 'Managing multiple creator rosters, negotiating inbound brand deals, and standardizing commercial rates.',
                  icon: Users,
                  badge: 'Multi-Roster',
                  accent: 'text-emerald-400',
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = persona === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setPersona(item.id)}
                    className={`cursor-pointer rounded-xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#0e111a] border-indigo-500/80 shadow-[0_0_24px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/50'
                        : 'bg-[#0c0e14] border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0f1118]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
                              : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium">
                      <span className={isSelected ? 'text-indigo-400' : 'text-slate-500'}>
                        {isSelected ? 'Selected Persona' : 'Select model'}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="h-11 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <span>Continue to Channel Baseline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Channel Baseline & Platform */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">Step 2 of 5</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Your Channel Baseline Metrics</h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                These numbers serve as the baseline for your deal rate calculators and drop-off diagnosis.
              </p>
            </div>

            <div className="bg-[#0c0e14] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl">
              {/* Primary Platform Choice */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2.5">Primary Publishing Platform</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'youtube' as Platform, name: 'YouTube', sub: 'Longform & Shorts' },
                    { id: 'tiktok' as Platform, name: 'TikTok', sub: 'Creator Rewards & Clips' },
                    { id: 'instagram' as Platform, name: 'Instagram', sub: 'Reels & Partnerships' },
                  ].map((p) => {
                    const active = primaryPlatform === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPrimaryPlatform(p.id)}
                        className={`p-3.5 rounded-xl border text-left transition ${
                          active
                            ? 'bg-white/[0.06] border-indigo-400/80 text-white shadow-[0_0_16px_rgba(99,102,241,0.2)] ring-1 ring-indigo-400/30'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15] hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Channel Name & Niche */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Channel or Brand Name</label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="e.g. Marques Tech Studio"
                    className="w-full bg-[#080a0f] border border-white/[0.08] focus:border-indigo-400/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Content Niche</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-[#080a0f] border border-white/[0.08] focus:border-indigo-400/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                  >
                    {niches.map((n) => (
                      <option key={n} value={n} className="bg-[#0c0e14] text-white">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Audience & Typical Views Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-[#080a0f] p-4 rounded-xl border border-white/[0.06] space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Subscribers / Followers</span>
                    <span className="font-mono font-bold text-indigo-300">{subscriberCount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="5000"
                    value={subscriberCount}
                    onChange={(e) => setSubscriberCount(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                    <span>1K</span>
                    <span>100K</span>
                    <span>1M+</span>
                  </div>
                </div>

                <div className="bg-[#080a0f] p-4 rounded-xl border border-white/[0.06] space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Average Views per Post</span>
                    <span className="font-mono font-bold text-emerald-400">{averageViews.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="500000"
                    step="2500"
                    value={averageViews}
                    onChange={(e) => setAverageViews(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                    <span>500</span>
                    <span>50K</span>
                    <span>500K+</span>
                  </div>
                </div>
              </div>

              {/* Honest Integration Disclosure */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-400 flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Privacy-First Architecture:</strong> Direct OAuth API sync with YouTube Studio and TikTok is scheduled for Q3. Currently, Creator's calculates all 10 diagnostic and pricing models from your input benchmarks so you don't have to surrender channel write permissions.
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="h-11 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 font-semibold text-xs flex items-center space-x-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="h-11 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <span>Continue to Creator Goals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Primary Creator Goals */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">Step 3 of 5</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">What is your #1 creator priority right now?</h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Select what you want to tackle first. We will immediately build a custom first-value intelligence calculation for you.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  id: 'price_deals' as CreatorGoal,
                  title: 'Price Brand Deals Fairly & Stop Leaving Money Behind',
                  desc: 'Calculate genuine commercial value: charge for paid whitelisting rights, category exclusivity, and deliverable format instead of naive follower-count flat fees.',
                  icon: DollarSign,
                  badge: 'Commercial Value',
                  accent: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
                },
                {
                  id: 'diagnose_reach' as CreatorGoal,
                  title: 'Diagnose Sudden, Unexplained Drops in Reach',
                  desc: 'Forensically pinpoint why high-effort videos collapse (8-second retention cliff, seed cohort CTR misalignment, or pacing traps).',
                  icon: TrendingDown,
                  badge: 'Forensic Autopsy',
                  accent: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
                },
                {
                  id: 'find_sponsors' as CreatorGoal,
                  title: 'Find Active Paying Sponsors in My Niche',
                  desc: 'Discover active brand sponsors investing in creators like you, complete with verified contact angles and typical CPM budget ranges.',
                  icon: Briefcase,
                  badge: 'Brand Radar',
                  accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                },
                {
                  id: 'protect_originality' as CreatorGoal,
                  title: 'Protect Content from AI Scraping & Demonetization',
                  desc: 'Detect automated channels stealing your scripts or thumbnails, and pre-scan videos for YouTube 2026 reused content strikes before uploading.',
                  icon: ShieldAlert,
                  badge: 'Pre-Scan Engine',
                  accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                },
                {
                  id: 'track_rpm' as CreatorGoal,
                  title: 'Optimize Qualified RPM & Creator Rewards',
                  desc: 'Track and preserve qualified views: avoid sub-60 second disqualifications, low-geographic RPM penalties, and repetitive background penalties.',
                  icon: Zap,
                  badge: 'RPM Demystifier',
                  accent: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
                },
              ].map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <div
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`cursor-pointer p-4 sm:p-5 rounded-xl border transition-all flex items-start space-x-4 ${
                      isSelected
                        ? 'bg-[#0e111a] border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.12)] ring-1 ring-indigo-500/40'
                        : 'bg-[#0c0e14] border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0f1118]'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 border ${goal.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                          <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                            {goal.badge}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ml-2 border transition ${
                            isSelected
                              ? 'bg-indigo-500 border-indigo-400 text-white'
                              : 'border-white/[0.15] bg-[#080a0f]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{goal.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="h-11 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 font-semibold text-xs flex items-center space-x-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep(4)}
                className="h-11 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <span>Calculate My First Value Preview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: First Value Experience ("Aha! Moment") */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono text-[11px]">CALCULATED INTELLIGENCE PREVIEW</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Audited Value for {channelName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Tailored from your {subscriberCount.toLocaleString()} followers in {niche} and {averageViews.toLocaleString()} avg post views.
              </p>
            </div>

            {/* Dynamic Value Preview Card based on Primary Goal */}
            {primaryGoal === 'price_deals' ? (
              <div className="bg-[#0c0e14] border border-white/[0.1] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
                      Commercial Rate Card Audit
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">Single 60s Integration + Commercial Rights</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-500 font-mono">True Market Value</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono tracking-tight">
                      ${totalCommercialDeal.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Breakdown items */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#080a0f] p-3.5 rounded-xl border border-white/[0.06]">
                    <div className="text-[11px] text-slate-400 font-medium">Base Production Rate</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">${baseRate.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">Based on {averageViews.toLocaleString()} views</div>
                  </div>
                  <div className="bg-[#080a0f] p-3.5 rounded-xl border border-white/[0.06]">
                    <div className="text-[11px] text-teal-300 font-medium">30-Day Whitelisting Rights</div>
                    <div className="text-lg font-bold text-teal-300 font-mono mt-0.5">+${whitelistingFee.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">+35% paid ad usage right</div>
                  </div>
                  <div className="bg-[#080a0f] p-3.5 rounded-xl border border-white/[0.06]">
                    <div className="text-[11px] text-indigo-300 font-medium">60-Day Category Exclusivity</div>
                    <div className="text-lg font-bold text-indigo-300 font-mono mt-0.5">+${exclusivityFee.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">+45% lockout penalty</div>
                  </div>
                </div>

                {/* Recaptured Value Highlight */}
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-emerald-400">Recaptured Commercial Revenue</div>
                    <div className="text-xs text-slate-300">
                      Standard naive follower rate was ~${naiveFollowerDeal.toLocaleString()}. You unlock:
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-mono font-extrabold text-emerald-300 shrink-0">
                    +${recapturedDealRevenue.toLocaleString()} / deal
                  </div>
                </div>
              </div>
            ) : primaryGoal === 'diagnose_reach' ? (
              <div className="bg-[#0c0e14] border border-rose-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                      Retention Autopsy Benchmark
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">Forensic Drop-Off Diagnosis for {niche}</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-500 font-mono">Niche Retention Threshold</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono tracking-tight">
                      &gt;64% at 0:30s
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#080a0f] border border-white/[0.06] flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                      0:08
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">The 8-Second "Context Lag" Cliff</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        In {niche}, viewer drop-off spikes when creators spend &gt;5 seconds repeating title premises before delivering visual evidence.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#080a0f] border border-white/[0.06] flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                      CTR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Seed Cohort Impasse (&lt; 5.8% CTR)</div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        If initial test impressions to core subscribers drop below 5.8%, broader recommendations are throttled within 4 hours.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Default Sponsor / Protection Value Preview */
              <div className="bg-[#0c0e14] border border-white/[0.1] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                      Intelligence Match
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">Active Sponsor Opportunities in {niche}</h3>
                  </div>
                  <div className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    3 High-Fit Verified
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Notion', budget: '$2,500 - $4,200', angle: 'Productivity workflows' },
                    { name: 'NordVPN', budget: '$1,800 - $3,000', angle: 'Creator security & streaming' },
                    { name: 'Epidemic Sound', budget: '$1,500 - $2,500', angle: 'Production & audio gear' },
                  ].map((s) => (
                    <div key={s.name} className="p-3.5 rounded-xl bg-[#080a0f] border border-white/[0.06] space-y-1">
                      <div className="text-xs font-bold text-white">{s.name}</div>
                      <div className="text-xs font-mono text-emerald-400">{s.budget}</div>
                      <div className="text-[10px] text-slate-500">{s.angle}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="h-11 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 font-semibold text-xs flex items-center space-x-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => goToStep(5)}
                className="h-11 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <span>Finalize Workspace Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Workspace Ready Celebration */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(99,102,241,0.2)]">
              <Sparkles className="w-7 h-7 text-indigo-400" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Setup Complete</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome to your Creator Workspace, {channelName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                All 10 intelligence modules have been configured with your {niche} benchmarks and ${totalCommercialDeal.toLocaleString()} rate baseline.
              </p>
            </div>

            {/* Config Summary Dossier Card */}
            <div className="bg-[#0c0e14] border border-white/[0.08] rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 shadow-2xl">
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-white/[0.06]">
                Workspace Configuration Dossier
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Creator Persona:</span>
                <span className="font-semibold text-white capitalize">{persona.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Primary Platform:</span>
                <span className="font-semibold text-white uppercase">{primaryPlatform}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Content Niche:</span>
                <span className="font-semibold text-white">{niche}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Audience Baseline:</span>
                <span className="font-semibold text-indigo-300 font-mono">
                  {subscriberCount.toLocaleString()} subs • {averageViews.toLocaleString()} views
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-white/[0.06]">
                <span className="text-slate-400">Calculated Commercial Rate:</span>
                <span className="font-bold text-teal-300 font-mono">
                  ${totalCommercialDeal.toLocaleString()} / deal
                </span>
              </div>
            </div>

            <div className="pt-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleFinishOnboarding}
                disabled={saving}
                className="w-full h-12 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <>
                    <span>Enter Creator Workspace</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 border-t border-white/[0.06] text-center text-xs text-slate-500 font-mono">
        Creator's Intelligence OS • Private & Protected by Supabase Row-Level Security
      </footer>
    </div>
  );
};
