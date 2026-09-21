import { RateCalculationInput, RateCalculationResult } from '@/shared/types';

export function calculateCreatorDealRate(input: RateCalculationInput): RateCalculationResult {
  // 1. Base Creation Fee (Cost of labor, gear, production, editing)
  let baseCreationFee = 350;
  if (input.contentType === 'dedicated_video') {
    baseCreationFee = 850;
  } else if (input.contentType === 'ugc_ad') {
    baseCreationFee = 450;
  } else if (input.contentType === 'short_form') {
    baseCreationFee = 250;
  }

  // 2. Audience Access Fee (CPM scaled by actual views, not vanity follower count)
  let cpm = 25;
  if (input.category.toLowerCase().includes('fintech') || input.category.toLowerCase().includes('saas')) {
    cpm = 35;
  } else if (input.category.toLowerCase().includes('gaming')) {
    cpm = 18;
  }
  const audienceAccessFee = Math.round((input.avgViews / 1000) * cpm);

  // 3. Paid Advertising & Usage Rights Markup (Whitelisting)
  let paidUsageMarkup = 0;
  if (input.paidAdvertisingRights) {
    const durationMonths = Math.max(1, Math.round(input.licensingMonths || 1));
    paidUsageMarkup = Math.round((baseCreationFee + audienceAccessFee) * 0.4 * durationMonths);
  } else if (input.brandCanRepost) {
    paidUsageMarkup = Math.round((baseCreationFee + audienceAccessFee) * 0.15);
  }

  // 4. Exclusivity Premium (Competitor lockout)
  let exclusivityPremium = 0;
  if (input.exclusivityDays > 0) {
    const months = input.exclusivityDays / 30;
    exclusivityPremium = Math.round((baseCreationFee + audienceAccessFee) * (0.25 * months));
  }

  // 5. Rush Fee
  const rushFee = input.turnaroundRush ? Math.round((baseCreationFee + audienceAccessFee) * 0.2) : 0;

  const totalCalculated = baseCreationFee + audienceAccessFee + paidUsageMarkup + exclusivityPremium + rushFee;

  const minPrice = Math.round(totalCalculated * 0.85);
  const recommendedPrice = Math.round(totalCalculated);
  const maxPrice = Math.round(totalCalculated * 1.3);

  const explanationPoints: string[] = [
    `Base Creation & Production: $${baseCreationFee} for high-quality production of ${input.contentType.replace('_', ' ')}.`,
    `Audience Reach: $${audienceAccessFee} based on ${input.avgViews.toLocaleString()} avg view baseline at $${cpm} CPM.`,
  ];

  if (input.paidAdvertisingRights) {
    explanationPoints.push(
      `Paid Whitelisting Rights (+$${paidUsageMarkup}): Brand can use your identity & likeness in paid performance ads for ${input.licensingMonths || 1} month(s).`
    );
  } else if (input.brandCanRepost) {
    explanationPoints.push(`Organic Reposting Rights (+$${paidUsageMarkup}): Brand can reshare organically on their owned social profiles.`);
  }

  if (input.exclusivityDays > 0) {
    explanationPoints.push(
      `Exclusivity Surcharge (+$${exclusivityPremium}): Restricts you from accepting deals with category competitors for ${input.exclusivityDays} days.`
    );
  }

  if (input.turnaroundRush) {
    explanationPoints.push(`Rush Turnaround Fee (+$${rushFee}): Expedited 48-72h turnaround premium.`);
  }

  return {
    minPrice,
    recommendedPrice,
    maxPrice,
    breakdown: {
      baseCreationFee,
      audienceAccessFee,
      paidUsageMarkup,
      exclusivityPremium,
      rushFee,
    },
    explanationPoints,
  };
}
