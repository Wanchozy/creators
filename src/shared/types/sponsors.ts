export interface BrandSponsor {
  id: string;
  brandName: string;
  logo: string;
  category: 'Gaming' | 'Hardware' | 'VPN / Security' | 'Fintech' | 'Productivity / SaaS' | 'Lifestyle';
  fitScore: 'High fit' | 'Medium fit' | 'Low fit';
  audienceMatchPercent: number;
  targetGeos: string[];
  budgetTier: '$1k - $3k' | '$3k - $8k' | '$8k - $20k' | '$20k+';
  contactPerson: string;
  contactEmail: string;
  recentCampaignSummary: string;
  preferredFormats: string[];
}
