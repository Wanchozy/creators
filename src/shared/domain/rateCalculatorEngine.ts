/**
 * ==============================================================================
 * PURE DOMAIN ENGINE: RATE CALCULATOR (src/shared/domain/rateCalculatorEngine.ts)
 * ==============================================================================
 * What is a "Domain Engine"?
 * In software architecture, an "engine" is pure mathematical logic.
 * It contains ZERO HTML, ZERO React code, and ZERO buttons.
 * 
 * Why is this written this way?
 * 1. It is 100% portable: We use this exact same formula in the marketing page
 *    slider demo AND in the private creator workspace!
 * 2. It is easy to test: You can give it sample numbers and verify the output.
 * 3. Want to change the prices or formulas? You only have to edit this ONE file!
 * ==============================================================================
 */

import { RateCalculationInput, RateCalculationResult } from '@/shared/types';

export function calculateCreatorDealRate(input: RateCalculationInput): RateCalculationResult {
  // ----------------------------------------------------------------------------
  // FORMULA PART 1: Base Creation Fee
  // Covers the creator's labor, camera gear, software, editing time, and scriptwriting.
  // ----------------------------------------------------------------------------
  let baseCreationFee = 350;
  if (input.contentType === 'dedicated_video') {
    baseCreationFee = 850;
  } else if (input.contentType === 'ugc_ad') {
    baseCreationFee = 450;
  } else if (input.contentType === 'short_form') {
    baseCreationFee = 250;
  }

  // ----------------------------------------------------------------------------
  // FORMULA PART 2: Audience Access Fee (CPM = Cost Per Thousand Views)
  // Brands don't pay for vanity follower count; they pay for real, active views.
  // High-value niches like SaaS/Fintech pay higher CPMs ($35+) than Gaming ($18).
  // ----------------------------------------------------------------------------
  let cpm = 25;
  if (input.category.toLowerCase().includes('fintech') || input.category.toLowerCase().includes('saas')) {
    cpm = 35;
  } else if (input.category.toLowerCase().includes('gaming')) {
    cpm = 18;
  }
  const audienceAccessFee = Math.round((input.avgViews / 1000) * cpm);

  // ----------------------------------------------------------------------------
  // FORMULA PART 3: Paid Advertising & Usage Rights (Whitelisting)
  // When a brand runs your face as a TikTok Spark Ad or Meta sponsored ad,
  // they make huge revenue off your credibility. We charge a 40% markup/month!
  // ----------------------------------------------------------------------------
  let paidUsageMarkup = 0;
  if (input.paidAdvertisingRights) {
    const durationMonths = Math.max(1, Math.round(input.licensingMonths || 1));
    paidUsageMarkup = Math.round((baseCreationFee + audienceAccessFee) * 0.4 * durationMonths);
  } else if (input.brandCanRepost) {
    paidUsageMarkup = Math.round((baseCreationFee + audienceAccessFee) * 0.15);
  }

  // ----------------------------------------------------------------------------
  // FORMULA PART 4: Exclusivity Premium (Competitor Lockout)
  // If a brand demands you cannot work with other VPNs or software for 60 days,
  // you lose other sponsorship opportunities. This adds a 25% penalty per month.
  // ----------------------------------------------------------------------------
  let exclusivityPremium = 0;
  if (input.exclusivityDays > 0) {
    const months = input.exclusivityDays / 30;
    exclusivityPremium = Math.round((baseCreationFee + audienceAccessFee) * (0.25 * months));
  }

  // ----------------------------------------------------------------------------
  // FORMULA PART 5: Rush Fee
  // Need the video live in 48-72 hours? Adds a 20% expediting fee.
  // ----------------------------------------------------------------------------
  const rushFee = input.turnaroundRush ? Math.round((baseCreationFee + audienceAccessFee) * 0.2) : 0;

  // ----------------------------------------------------------------------------
  // FINAL PRICING TIERS
  // - Recommended: The fair market price
  // - Minimum: The walk-away floor (15% discount for bulk packages)
  // - Maximum: High anchor price (30% premium for high-demand quarters)
  // ----------------------------------------------------------------------------
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
