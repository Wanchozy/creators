import { PitchGenerationInput, PitchDraftResult, PitchType, PitchTone } from '@/shared/types';

/**
 * Pure domain engine generating commercial brand pitch emails and negotiation counters.
 */
export function generateBrandPitchDraft(input: PitchGenerationInput): PitchDraftResult {
  const brand = input.brandName.trim() || 'Brand Partner';
  const creator = input.channelName?.trim() || 'Creator Studio';
  const niche = input.niche || 'Tech & Modern Software';
  const targetRate = input.targetBudget ? `$${input.targetBudget.toLocaleString()}` : '$1,800';
  const offerRate = input.offeredBudget ? `$${input.offeredBudget.toLocaleString()}` : '$600';
  const deliverable = input.deliverable || '60s Dedicated Mid-Roll Integration';
  const audience = input.audienceHighlight || '78% US/UK high-intent tech buyers';

  switch (input.pitchType) {
    case 'counter_offer_lowball':
      return generateCounterOffer(brand, creator, targetRate, offerRate, deliverable, input.tone);

    case 'cold_outreach':
      return generateColdPitch(brand, creator, niche, deliverable, audience, input.tone);

    case 'agency_intro':
      return generateAgencyIntro(brand, creator, niche, deliverable, targetRate, input.tone);

    case 'follow_up_gentle':
      return generateFollowUp(brand, creator, deliverable, input.tone);

    case 'deliverable_handover':
      return generateHandover(brand, creator, deliverable, input.tone);

    default:
      return generateColdPitch(brand, creator, niche, deliverable, audience, input.tone);
  }
}

function generateCounterOffer(
  brand: string,
  creator: string,
  targetRate: string,
  offerRate: string,
  deliverable: string,
  tone: PitchTone
): PitchDraftResult {
  if (tone === 'assertive_commercial') {
    return {
      pitchType: 'counter_offer_lowball',
      tone,
      subjectLine: `Re: Sponsorship terms for ${brand} x ${creator} — Commercial Scope Adjustment`,
      emailBody: `Hi ${brand} Team,

Thanks for extending the proposal. We love ${brand}'s product and know our audience of tech-forward operators would convert well.

Regarding the budget: our standard commercial rate for a ${deliverable} with 30-day organic rights is ${targetRate}. The initial offer of ${offerRate} falls substantially below our production cost floor and baseline audience CPM.

To make this partnership work within your parameters, we have two realistic options:

Option A (Full Scope): We maintain the ${deliverable} and 30-day paid whitelisting rights at ${targetRate}.
Option B (Adjusted Scope): We can meet closer to your budget at ${offerRate} by shifting to a 30s quick shout-out without paid usage rights or competitor category lockout.

Let me know which direction aligns best with your quarterly target and we'll send over the insertion order.

Best regards,
${creator} Partnerships`,
      tacticalTip:
        'Never discount without subtracting deliverables. If they want the lower price, remove whitelisting or shorten the video duration so you protect your CPM floor.',
      suggestedFollowUpDays: 3,
    };
  }

  // Creative partner / collaborative tone
  return {
    pitchType: 'counter_offer_lowball',
    tone,
    subjectLine: `Partnership update: Aligning on scope for ${brand} x ${creator}`,
    emailBody: `Hi ${brand} Team,

Thank you for thinking of ${creator}! We are genuine users of ${brand} and are excited about potentially collaborating.

Looking at our current commercial benchmarks and audience engagement, our standard rate for a ${deliverable} is ${targetRate}. While we cannot do the full placement at ${offerRate}, we’d love to find a middle ground.

Could we meet at a bundled arrangement, or include performance bonus milestones if the campaign exceeds sign-up goals? Alternatively, we could do a dedicated Short/Reel that fits cleanly into your budget.

Looking forward to your thoughts!

Warmly,
${creator}`,
    tacticalTip:
      'Propose milestone bonuses or alternative formats (e.g. Shorts) if you want to maintain a friendly relationship with high-growth startups.',
    suggestedFollowUpDays: 4,
  };
}

function generateColdPitch(
  brand: string,
  creator: string,
  niche: string,
  deliverable: string,
  audience: string,
  tone: PitchTone
): PitchDraftResult {
  return {
    pitchType: 'cold_outreach',
    tone,
    subjectLine: `Sponsorship idea: Bringing ${brand} to ${creator}'s audience (${niche})`,
    emailBody: `Hi ${brand} Growth Team,

I run ${creator}, a digital publication focused on ${niche} reaching over ${audience}.

I’ve been following ${brand}’s recent product launches and noticed your push into creator partnerships. We have an upcoming content series scheduled next month where a ${deliverable} featuring ${brand} would seamlessly fit the narrative.

Our audience actively looks for tools that save time and optimize workflows. In our previous campaign with a comparable partner, we drove an average 8.4% click-through with sustained long-tail conversions.

Would you be open to a quick 5-minute review of our live Media Kit & available Q4 integration dates?

Best,
${creator} Team`,
    tacticalTip:
      'Keep cold outreach under 150 words. Focus on the upcoming content theme and audience buying power rather than vanity follower numbers.',
    suggestedFollowUpDays: 4,
  };
}

function generateAgencyIntro(
  brand: string,
  creator: string,
  niche: string,
  deliverable: string,
  targetRate: string,
  tone: PitchTone
): PitchDraftResult {
  return {
    pitchType: 'agency_intro',
    tone,
    subjectLine: `Media Buyer Kit & Q4 Avails — ${creator} (${niche})`,
    emailBody: `Hi ${brand} Media Team,

Reaching out with our Q4/Q1 rate card and editorial calendar for ${creator}.

Quick Specs:
• Niche: ${niche}
• Primary Placement: ${deliverable} (Base: ${targetRate})
• Whitelisting & Paid Social Ads: 30 / 60 / 90 day addendums available
• Audience Verification: 70%+ Tier 1 (US, UK, CA, AU)

We offer fast 7-day turnaround, clean IAB-compliant disclosures, and verified post-campaign metric reporting. 

Let us know if you're booking rosters for upcoming client campaigns and we'll hold dates.

Best,
${creator} Commercial Operations`,
    tacticalTip:
      'Agencies care about predictability, turnaround speed, and whitelisting permissions. Bullet points win with media buyers.',
    suggestedFollowUpDays: 5,
  };
}

function generateFollowUp(
  brand: string,
  creator: string,
  deliverable: string,
  tone: PitchTone
): PitchDraftResult {
  return {
    pitchType: 'follow_up_gentle',
    tone,
    subjectLine: `Quick bump: ${deliverable} availability for ${brand} x ${creator}`,
    emailBody: `Hi ${brand} Team,

Just floating this to the top of your inbox before our production schedule locks in for next month.

We still have a prime slot open for the ${deliverable}. If this is of interest for your current acquisition cycle, let me know and I will hold the spot. If timing is off for this quarter, no worries at all!

Best,
${creator}`,
    tacticalTip:
      'Send this 3-5 business days after the initial pitch. 60% of brand deals are closed on the first follow-up.',
    suggestedFollowUpDays: 5,
  };
}

function generateHandover(
  brand: string,
  creator: string,
  deliverable: string,
  tone: PitchTone
): PitchDraftResult {
  return {
    pitchType: 'deliverable_handover',
    tone,
    subjectLine: `Live Deliverable + Attribution Link: ${brand} x ${creator}`,
    emailBody: `Hi ${brand} Team,

The ${deliverable} is officially published and live across our channels!

Here are the live links and tracking assets:
• Live Placement URL: [Insert Video Link]
• Trackable CTA in description & pinned comment: Verified Active
• First 24-hour analytics snapshot will be provided on Friday.

Please confirm receipt so we can begin the 30-day licensing window. Invoice #${Math.floor(
      1000 + Math.random() * 9000
    )} is attached per our agreed payment terms.

Thank you for an incredible collaboration!

Best regards,
${creator}`,
    tacticalTip:
      'Send the handover within 2 hours of publication. Always include the invoice immediately while excitement is highest.',
    suggestedFollowUpDays: 7,
  };
}
