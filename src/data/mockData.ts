import {
  VideoDiagnostic,
  ChannelPatternAnalysis,
  CopycatIncident,
  BrandSponsor,
  MonetizationRiskCheck,
  PlatformChangeNotice,
  RepurposedClip,
  RevenueAnalyticsData,
  SponsorshipDeal
} from '../types';

// Problem 1: Algorithm Detective mock data
export const mockVideoDiagnostics: VideoDiagnostic[] = [
  {
    id: 'vid-101',
    title: 'How I Built My Entire Setup for Under $500 (Full Breakdown)',
    platform: 'youtube',
    uploadDate: '3 days ago',
    views: 424,
    expectedViews: 12500,
    ctr: 2.1,
    channelAvgCtr: 5.8,
    avdPercent: 24,
    channelAvgAvd: 48,
    retentionDropAt8s: 46, // 46% of viewers dropped in first 8s!
    first24hViews: 180,
    status: 'critical_drop',
    diagnoses: [
      "Initial Click-Through Rate (2.1%) was 63% below your channel's 90-day baseline (5.8%).",
      "Severe retention cliff: 46% of viewers exited between 0:00 and 0:08 (Channel intro was 14 seconds).",
      "Velocity penalty: 24-hour impression throttle triggered after failing initial browse seed cohort."
    ],
    possibleExperiments: [
      "Test a 3-second cold hook (cut the channel logo bumper immediately).",
      "A/B swap the thumbnail to high-contrast zoom on the $500 gear receipt.",
      "Re-title from 'Setup' to an active tension hook: 'I Replaced My $3,000 Setup With $500 Tech'."
    ],
    retentionTimeline: [
      { second: 0, retention: 100 },
      { second: 4, retention: 78 },
      { second: 8, retention: 54 },
      { second: 15, retention: 42 },
      { second: 30, retention: 35 },
      { second: 60, retention: 29 },
      { second: 120, retention: 24 },
      { second: 300, retention: 18 },
      { second: 600, retention: 14 }
    ]
  },
  {
    id: 'vid-102',
    title: 'Why Most Creators Fail in the First 90 Days',
    platform: 'youtube',
    uploadDate: '1 week ago',
    views: 48900,
    expectedViews: 14000,
    ctr: 8.4,
    channelAvgCtr: 5.8,
    avdPercent: 62,
    channelAvgAvd: 48,
    retentionDropAt8s: 11,
    first24hViews: 18200,
    status: 'viral',
    diagnoses: [
      "High early velocity: CTR (8.4%) beat channel average by 44% in first 2 hours.",
      "Strong retention hook: Face appeared in first 1.2 seconds, question posed at 0:02.",
      "Suggested video engine pickup: Platform pushed into browse features of 3 adjacent creators."
    ],
    possibleExperiments: [
      "Pin top comment asking viewers for their current day count to boost reply velocity.",
      "Create follow-up part 2 within 7 days while audience affinity token is active."
    ],
    retentionTimeline: [
      { second: 0, retention: 100 },
      { second: 4, retention: 94 },
      { second: 8, retention: 89 },
      { second: 15, retention: 82 },
      { second: 30, retention: 76 },
      { second: 60, retention: 70 },
      { second: 120, retention: 65 },
      { second: 300, retention: 58 },
      { second: 600, retention: 44 }
    ]
  },
  {
    id: 'vid-103',
    title: 'Reacting to the Newest Platform Update (Is TikTok Over?)',
    platform: 'tiktok',
    uploadDate: '2 weeks ago',
    views: 2381,
    expectedViews: 25000,
    ctr: 4.8,
    channelAvgCtr: 7.2,
    avdPercent: 38,
    channelAvgAvd: 55,
    retentionDropAt8s: 39,
    first24hViews: 1950,
    status: 'mild_underperform',
    diagnoses: [
      "Initial click-through was below your normal range for breaking news formats.",
      "Audience engagement fell off quickly: Average 1.2 comments per 1k views vs your 6.2 baseline.",
      "Search keyword saturation: 14 larger accounts covered identical headline 3 hours earlier."
    ],
    possibleExperiments: [
      "Test text hook overlay: 'Don't panic yet — here is what actually changed'.",
      "Format as a 2-point counter-argument rather than general commentary."
    ],
    retentionTimeline: [
      { second: 0, retention: 100 },
      { second: 3, retention: 85 },
      { second: 8, retention: 61 },
      { second: 15, retention: 49 },
      { second: 30, retention: 38 },
      { second: 45, retention: 32 }
    ]
  }
];

// Problem 2: Creator Scientist Pattern Discovery
export const mockChannelPatterns: ChannelPatternAnalysis = {
  sampleSize: 50,
  topPerformersStats: {
    avgLength: '18 – 32 seconds',
    hookStyle: 'Tension Question in first 2 seconds',
    faceAppearanceTiming: 'Face appears immediately (< 1.5s)',
    primaryTopics: ['Unpopular Opinions', 'Behind-the-Scenes Finances', 'Tactical Breakdowns'],
    avgCommentsPer1k: 6.2
  },
  underperformersStats: {
    avgLength: '> 45 seconds or unedited > 15m',
    hookStyle: 'No text hook / Slow conversational intro',
    introStyle: 'Logo splash or greeting (> 6 seconds)',
    primaryTopics: ['Generic Advice', 'Vague Weekly Vlogs', 'News Recaps without unique stance'],
    avgCommentsPer1k: 1.4
  },
  keyPatterns: [
    {
      name: 'Immediate Face Presence',
      positiveCorrelation: true,
      frequencyInWinners: '94% of Top 15 videos',
      frequencyInLosers: '22% of Bottom 15 videos',
      insight: 'Showing your face in 0:01 boosts 10-second completion by +31% across all platforms.'
    },
    {
      name: 'On-Screen Bold Text Hook',
      positiveCorrelation: true,
      frequencyInWinners: '88% of Top 15 videos',
      frequencyInLosers: '18% of Bottom 15 videos',
      insight: 'Videos with animated text stating the stakes in the first 2s retain 42% more muted viewers.'
    },
    {
      name: 'Video Duration 18–32s (Shorts/TikTok)',
      positiveCorrelation: true,
      frequencyInWinners: '80% of Top 15 videos',
      frequencyInLosers: '13% of Bottom 15 videos',
      insight: 'Re-watch looping algorithm triggers 3.8x more frequently on videos timed around 24s.'
    },
    {
      name: 'Long Greeting / Logo Intro',
      positiveCorrelation: false,
      frequencyInWinners: '0% of Top 15 videos',
      frequencyInLosers: '78% of Bottom 15 videos',
      insight: 'Intros lasting >4 seconds cause an instantaneous 35-50% audience retention cliff.'
    },
    {
      name: 'Generic Surface Titles',
      positiveCorrelation: false,
      frequencyInWinners: '6% of Top 15 videos',
      frequencyInLosers: '68% of Bottom 15 videos',
      insight: 'Titles lacking a specific contrast or quantified number suffered a 4.1% CTR drop.'
    }
  ],
  strongestRecurringPattern: "Your strongest recurring pattern: High-performing videos open with a direct question and face in under 2 seconds, run 18–32 seconds, and cover personal financial or behind-the-scenes realities."
};

// Problem 3: Originality & Copycat Monitor
export const mockCopycatAlerts: CopycatIncident[] = [
  {
    id: 'copy-1',
    originalTitle: 'How I Built My Entire Setup for Under $500',
    suspectChannel: 'DailyTechAutomated_AI',
    suspectPlatform: 'tiktok',
    suspectVideoTitle: 'Build the best desk setup for under $500 in 2026',
    similarityScore: 94,
    detectedDate: 'Yesterday',
    isAiGeneratedChannel: true,
    matchType: 'identical_script',
    status: 'alert'
  },
  {
    id: 'copy-2',
    originalTitle: 'Why 99% of Freelancers Stay Broke',
    suspectChannel: 'FastHustleShorts99',
    suspectPlatform: 'youtube',
    suspectVideoTitle: 'The real reason 99% of freelancers never make money',
    similarityScore: 88,
    detectedDate: '4 days ago',
    isAiGeneratedChannel: true,
    matchType: 'cloned_concept',
    status: 'investigating'
  },
  {
    id: 'copy-3',
    originalTitle: 'My 5-Minute Morning Routine That Changed My Focus',
    suspectChannel: 'StoicMind_Daily',
    suspectPlatform: 'instagram',
    suspectVideoTitle: 'This 5 minute routine will fix your attention span',
    similarityScore: 91,
    detectedDate: '1 week ago',
    isAiGeneratedChannel: true,
    matchType: 'reused_hook',
    status: 'takedown_sent'
  }
];

// Problem 4: Sponsor Radar
export const mockSponsors: BrandSponsor[] = [
  {
    id: 'sp-1',
    brandName: 'Anker / Soundcore',
    logo: '⚡',
    category: 'Hardware',
    fitScore: 'High fit',
    audienceMatchPercent: 96,
    targetGeos: ['US', 'UK', 'Kenya', 'Tanzania', 'Germany'],
    budgetTier: '$3k - $8k',
    contactPerson: 'Marcus Chen, Head of Creator Partnerships',
    contactEmail: 'creators@anker.com',
    recentCampaignSummary: 'Actively sponsoring tech, productivity and lifestyle desk setups with 40k–150k avg views.',
    preferredFormats: ['60-second YouTube integration', 'TikTok dedicated review', 'Dedicated discount link']
  },
  {
    id: 'sp-2',
    brandName: 'Surfshark VPN',
    logo: '🦈',
    category: 'VPN / Security',
    fitScore: 'High fit',
    audienceMatchPercent: 92,
    targetGeos: ['Global', 'US', 'Kenya', 'South Africa', 'Canada'],
    budgetTier: '$3k - $8k',
    contactPerson: 'Elena Rostova, Influencer Lead',
    contactEmail: 'partners@surfshark.com',
    recentCampaignSummary: 'Running 30-day burst campaigns for gaming, tech, and digital nomad content.',
    preferredFormats: ['60-second mid-roll integration', 'Pinned comment promo']
  },
  {
    id: 'sp-3',
    brandName: 'Notion',
    logo: '📓',
    category: 'Productivity / SaaS',
    fitScore: 'High fit',
    audienceMatchPercent: 91,
    targetGeos: ['US', 'Global', 'UK'],
    budgetTier: '$8k - $20k',
    contactPerson: 'Sarah Jenkins, Creator Ecosystem',
    contactEmail: 'sponsorships@makenotion.com',
    recentCampaignSummary: 'Looks for creators sharing workflows, templates, and student/solopreneur routines.',
    preferredFormats: ['Dedicated 5-min workflow breakdown', 'Monthly multi-video package']
  },
  {
    id: 'sp-4',
    brandName: 'Risevest / Global Invest',
    logo: '📈',
    category: 'Fintech',
    fitScore: 'Medium fit',
    audienceMatchPercent: 78,
    targetGeos: ['Kenya', 'Nigeria', 'Ghana', 'Diaspora UK/US'],
    budgetTier: '$1k - $3k',
    contactPerson: 'Amina Bello, Growth Marketing',
    contactEmail: 'growth@risevest.com',
    recentCampaignSummary: 'Promoting dollar investment accounts and wealth preservation in emerging markets.',
    preferredFormats: ['Instagram stories + Link in Bio', 'YouTube 45s integration']
  },
  {
    id: 'sp-5',
    brandName: 'Secretlab Chairs',
    logo: '💺',
    category: 'Gaming',
    fitScore: 'Medium fit',
    audienceMatchPercent: 82,
    targetGeos: ['US', 'EU', 'Australia'],
    budgetTier: '$8k - $20k',
    contactPerson: 'David Wong, Esports & Talent',
    contactEmail: 'talent@secretlab.co',
    recentCampaignSummary: 'Sponsors gaming setups, long stream backgrounds, and ergonomic workspace tours.',
    preferredFormats: ['Permanent set placement', 'Dedicated unboxing video']
  }
];

// Problem 6: Pre-Publish Monetization Risk Scanner
export const mockRiskChecks: MonetizationRiskCheck[] = [
  {
    id: 'risk-1',
    videoTitle: 'The Rise and Fall of My First Startup (With Archival Footage)',
    fileOrUrl: 'startup_doc_final_v2.mp4',
    checkedAt: '15 mins ago',
    overallRisk: 'High',
    metrics: {
      originalCommentaryScore: 'Low',
      originalNarrationScore: 'Medium',
      thirdPartyFootageSeconds: 43, // 43s without commentary!
      repeatedFormatRisk: 'Medium',
      potentialReusedContentRisk: 'High'
    },
    potentialIssues: [
      "Contains 43 continuous seconds of third-party news broadcast footage (03:12 – 03:55) with zero original voice commentary or visible transformation.",
      "YouTube 2025/2026 Inauthentic Content guideline flag: Sections with static screen recording and unedited media are heavily penalized by auto-review algorithms.",
      "Audio fingerprint matched 2 common syndicated background audio clips."
    ],
    platformComplianceNotes: "High risk of 'Inauthentic / Reused Content' demonetization strike. You must interject original commentary, PIP reaction, or reduce the third-party clip under 12 seconds."
  },
  {
    id: 'risk-2',
    videoTitle: '5 Productivity Habits That Saved Me 20 Hours a Week',
    fileOrUrl: 'productivity_5habits_render.mp4',
    checkedAt: '2 days ago',
    overallRisk: 'Low',
    metrics: {
      originalCommentaryScore: 'High',
      originalNarrationScore: 'High',
      thirdPartyFootageSeconds: 0,
      repeatedFormatRisk: 'Low',
      potentialReusedContentRisk: 'Low'
    },
    potentialIssues: [
      "No copyright or reuse flags detected. 100% original narration, original b-roll, and custom licensed music."
    ],
    platformComplianceNotes: "Passed YouTube Partner Program and TikTok Creator Rewards pre-flight checks."
  }
];

// Problem 7: Cross-Platform Change Tracker
export const mockPlatformChanges: PlatformChangeNotice[] = [
  {
    id: 'change-1',
    platform: 'youtube',
    date: 'Updated This Week',
    type: 'Monetization policy update',
    title: 'Shift from "Repetitious Content" to "Inauthentic Content"',
    summary: 'YouTube officially updated partner guidelines. Channels producing templated AI-voiceover videos or mass-produced clip compilations face demonetization without manual human presence.',
    officialSource: 'YouTube Creator Policy Bulletin 2025/2026',
    actionRequired: true,
    affectedVideosCount: 3,
    recommendedAdjustment: 'Ensure every video has your recorded voice or face, and avoid identical template slide intros.'
  },
  {
    id: 'change-2',
    platform: 'tiktok',
    date: 'Updated Last Week',
    type: 'Commercial disclosure rule',
    title: 'Mandatory Commercial Content Disclosure & AI Labeling',
    summary: 'TikTok has clarified commercial-content disclosure penalties. Videos receiving brand compensation or using synthetic voices that lack proper toggles now suffer automated 90% reach throttles.',
    officialSource: 'TikTok Creator Rewards Newsroom',
    actionRequired: true,
    affectedVideosCount: 1,
    recommendedAdjustment: 'Always switch on the "Paid Partnership" toggle before posting, even for gifted product showcases.'
  },
  {
    id: 'change-3',
    platform: 'instagram',
    date: '2 weeks ago',
    type: 'Algorithm & discovery tweak',
    title: 'Originality Penalty for Aggregator Accounts',
    summary: 'Instagram Reels algorithm now systematically strips distribution from accounts that repost clips without substantial transformative editing, redirecting reach to original uploaders.',
    officialSource: 'Adam Mosseri Creator Briefing',
    actionRequired: false,
    affectedVideosCount: 0,
    recommendedAdjustment: 'Your account is verified as original source. Ensure watermark is subtle or removed before posting.'
  }
];

// Problem 8: Content Recycler (Repurposing Studio)
export const mockClips: RepurposedClip[] = [
  {
    id: 'clip-1',
    topic: 'Why I Quit My $120k Job to Make Content',
    timestampStart: '04:12',
    timestampEnd: '04:48',
    durationSeconds: 36,
    viralityPotential: 92,
    hookQuote: '"The day my salary hit my bank account was the most depressed day of the month."',
    suggestedFormats: ['TikTok', 'Reels', 'Shorts'],
    status: 'approved'
  },
  {
    id: 'clip-2',
    topic: 'How I Made My First $10k Online Without Paid Ads',
    timestampStart: '11:20',
    timestampEnd: '12:02',
    durationSeconds: 42,
    viralityPotential: 86,
    hookQuote: '"I stopped pitching brands and started pitching their exact competitors with this one stat."',
    suggestedFormats: ['TikTok', 'Shorts', 'X post'],
    status: 'suggested'
  },
  {
    id: 'clip-3',
    topic: 'The Mistake That Cost Me a $5,000 Sponsorship',
    timestampStart: '18:45',
    timestampEnd: '19:15',
    durationSeconds: 30,
    viralityPotential: 79,
    hookQuote: '"I signed away perpetual paid advertising rights for free — never do this."',
    suggestedFormats: ['Reels', 'Carousel'],
    status: 'suggested'
  },
  {
    id: 'clip-4',
    topic: 'Quick Setup Tip: Cheap Lighting Hack',
    timestampStart: '24:10',
    timestampEnd: '24:35',
    durationSeconds: 25,
    viralityPotential: 64,
    hookQuote: '"Turn your desk lamp around against a white wall instead of buying a $200 key light."',
    suggestedFormats: ['Shorts'],
    status: 'suggested'
  }
];

// Problem 9: Creator Revenue Analytics (Qualified vs Total Views)
export const mockRevenueAnalytics: RevenueAnalyticsData = {
  timeframe: 'September 2026 (Last 30 Days)',
  totalViews: 255000,
  qualifiedViews: 168400,
  disqualificationBreakdown: {
    under5Seconds: 48200, // watched less than 5s
    duplicateRepeat: 21300, // repeat loop watches from same IP
    commercialNonEligible: 12100, // claimed or unmonetized sound
    unsupportedRegion: 5000
  },
  qualificationRatePercent: 66.0,
  rpm: 1.62,
  estimatedEarnings: 274.37,
  rpmDrivers: [
    {
      factor: 'Audience Geography Shift',
      impact: 'positive',
      note: 'Tier-1 US/UK viewership increased from 24% to 38%, lifting baseline RPM by +$0.34.'
    },
    {
      factor: '1-Minute+ Watch Completion',
      impact: 'positive',
      note: '52% of qualified viewers reached the 60-second mark, qualifying for maximum rewards tier.'
    },
    {
      factor: 'Search Discovery Modifier',
      impact: 'positive',
      note: 'High search-origin traffic added a 1.15x RPM bonus multiplier on TikTok Creator Rewards.'
    },
    {
      factor: 'Commercial Audio Deductions',
      impact: 'negative',
      note: 'Two videos used trending commercial audio that redirected 10% of revenue to license holders.'
    }
  ]
};

// Problem 10: Sponsorship CRM Pipeline
export const mockDeals: SponsorshipDeal[] = [
  {
    id: 'deal-1',
    brandName: 'Nike',
    contactEmail: 'creator_collabs@nike.com',
    stage: 'New',
    dealValue: 3500,
    deliverables: ['1x Dedicated Reel / TikTok', '1x Instagram Story Set (3 frames)'],
    deadline: 'Nov 12, 2026',
    usageRights: 'Organic channel only (no whitelisting)',
    exclusivityWindow: '14 days footwear category',
    paymentTerms: '100% Net 30 post-publication',
    paidAmount: 0,
    notes: 'Inbound outreach regarding fall athletic footwear launch. Need to clarify gift vs paid.',
    lastContactDate: '2 days ago'
  },
  {
    id: 'deal-2',
    brandName: 'Adobe',
    contactEmail: 'creative_partnerships@adobe.com',
    stage: 'Pitched',
    dealValue: 4200,
    deliverables: ['1x YouTube 60-second integration', 'Link in description + Community tab post'],
    deadline: 'Nov 05, 2026',
    usageRights: '60 days digital marketing rights',
    exclusivityWindow: '30 days design software',
    paymentTerms: '50% upfront, 50% post-publication',
    paidAmount: 0,
    notes: 'Sent media kit highlighting our video editing and workflow demographic audience.',
    lastContactDate: 'Yesterday'
  },
  {
    id: 'deal-3',
    brandName: 'Brand X (Audio Gear)',
    contactEmail: 'marketing@brandxaudio.com',
    stage: 'Negotiating',
    dealValue: 1200,
    deliverables: ['1x YouTube integration', '2x Instagram stories with trackable link'],
    deadline: 'Oct 28, 2026',
    usageRights: 'Brand can repost for 30 days; Paid advertising rights requested',
    exclusivityWindow: '30 days microphone category',
    paymentTerms: '50% upfront upon contract signing, 50% within 7 days of live video',
    paidAmount: 0,
    notes: 'They countered at $900. We held firm at $1,200 due to their 30-day paid advertising request.',
    lastContactDate: '3 hours ago'
  },
  {
    id: 'deal-4',
    brandName: 'NordVPN / Brand Y',
    contactEmail: 'sponsorships@nordvpn.com',
    stage: 'Active',
    dealValue: 800,
    deliverables: ['60-second dedicated mid-roll integration', 'Pinned comment promo link'],
    deadline: 'Oct 22, 2026',
    usageRights: 'Channel video lifetime, no external paid ads',
    exclusivityWindow: 'None',
    paymentTerms: '50% upfront ($400 paid), 50% post live',
    paidAmount: 400,
    notes: 'Draft script submitted to brand portal. Waiting for approval on key talking points.',
    lastContactDate: 'Oct 14, 2026'
  },
  {
    id: 'deal-5',
    brandName: 'Sony Electronics',
    contactEmail: 'alpha_creators@sony.com',
    stage: 'Paid',
    dealValue: 2000,
    deliverables: ['1x YouTube tech breakdown featuring Sony FX30 camera'],
    deadline: 'Sep 30, 2026',
    usageRights: 'Global digital rights 90 days',
    exclusivityWindow: '30 days mirrorless cameras',
    paymentTerms: '50% upfront, 50% upon delivery',
    paidAmount: 2000,
    notes: 'Video published with 58k views. Brand confirmed campaign goals exceeded by 24%. Final invoice paid in full.',
    lastContactDate: 'Sep 28, 2026'
  }
];
