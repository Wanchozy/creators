import { PitchGenerationInput, PitchDraftResult, PitchType, PitchTone } from '@/shared/types';

/**
 * Pure domain engine generating commercial brand pitch emails and negotiation counters.
 * Follows Rule 5 (Separate Decisions from Actions) and Rule 2 (Name Things by Meaning).
 */
export function generateBrandPitchDraft(input: PitchGenerationInput): PitchDraftResult {
  const resolvedBrandName = input.brandName.trim() || 'Brand Partner';
  const resolvedCreatorName = input.channelName?.trim() || 'Creator Studio';
  const resolvedNiche = input.niche || 'Tech & Modern Software';
  const formattedTargetRate = input.targetBudget
    ? `$${input.targetBudget.toLocaleString()}`
    : '$1,800';
  const formattedOfferedRate = input.offeredBudget
    ? `$${input.offeredBudget.toLocaleString()}`
    : '$600';
  const resolvedDeliverable = input.deliverable || '60s Dedicated Mid-Roll Integration';
  const resolvedAudienceHighlight =
    input.audienceHighlight || '78% US/UK high-intent tech buyers';

  switch (input.pitchType) {
    case 'counter_offer_lowball':
      return generateLowballCounterOfferDraft({
        sponsorBrandName: resolvedBrandName,
        creatorChannelName: resolvedCreatorName,
        formattedTargetRate,
        formattedOfferedRate,
        placementDeliverable: resolvedDeliverable,
        communicationTone: input.tone,
      });

    case 'cold_outreach':
      return generateColdPitchDraft({
        sponsorBrandName: resolvedBrandName,
        creatorChannelName: resolvedCreatorName,
        contentNiche: resolvedNiche,
        placementDeliverable: resolvedDeliverable,
        audienceHighlight: resolvedAudienceHighlight,
        communicationTone: input.tone,
      });

    case 'agency_intro':
      return generateAgencyIntroDraft({
        sponsorBrandName: resolvedBrandName,
        creatorChannelName: resolvedCreatorName,
        contentNiche: resolvedNiche,
        placementDeliverable: resolvedDeliverable,
        formattedTargetRate,
        communicationTone: input.tone,
      });

    case 'follow_up_gentle':
      return generateGentleFollowUpDraft({
        sponsorBrandName: resolvedBrandName,
        creatorChannelName: resolvedCreatorName,
        placementDeliverable: resolvedDeliverable,
        communicationTone: input.tone,
      });

    case 'deliverable_handover':
      return generateHandoverDeliveryDraft({
        sponsorBrandName: resolvedBrandName,
        creatorChannelName: resolvedCreatorName,
        placementDeliverable: resolvedDeliverable,
        communicationTone: input.tone,
      });

    default:
      return generateColdPitchDraft({
        sponsorBrandName: resolvedBrandName,
        creatorChannelName: resolvedCreatorName,
        contentNiche: resolvedNiche,
        placementDeliverable: resolvedDeliverable,
        audienceHighlight: resolvedAudienceHighlight,
        communicationTone: input.tone,
      });
  }
}

interface CounterOfferParameters {
  sponsorBrandName: string;
  creatorChannelName: string;
  formattedTargetRate: string;
  formattedOfferedRate: string;
  placementDeliverable: string;
  communicationTone: PitchTone;
}

function generateLowballCounterOfferDraft(
  parameters: CounterOfferParameters
): PitchDraftResult {
  const {
    sponsorBrandName,
    creatorChannelName,
    formattedTargetRate,
    formattedOfferedRate,
    placementDeliverable,
    communicationTone,
  } = parameters;

  if (communicationTone === 'assertive_commercial') {
    return {
      pitchType: 'counter_offer_lowball',
      tone: communicationTone,
      subjectLine: `Re: Sponsorship terms for ${sponsorBrandName} x ${creatorChannelName} — Commercial Scope Adjustment`,
      emailBody: `Hi ${sponsorBrandName} Team,

Thanks for extending the proposal. We love ${sponsorBrandName}'s product and know our audience of tech-forward operators would convert well.

Regarding the budget: our standard commercial rate for a ${placementDeliverable} with 30-day organic rights is ${formattedTargetRate}. The initial offer of ${formattedOfferedRate} falls substantially below our production cost floor and baseline audience CPM.

To make this partnership work within your parameters, we have two realistic options:

Option A (Full Scope): We maintain the ${placementDeliverable} and 30-day paid whitelisting rights at ${formattedTargetRate}.
Option B (Adjusted Scope): We can meet closer to your budget at ${formattedOfferedRate} by shifting to a 30s quick shout-out without paid usage rights or competitor category lockout.

Let me know which direction aligns best with your quarterly target and we'll send over the insertion order.

Best regards,
${creatorChannelName} Partnerships`,
      tacticalTip:
        'Never discount without subtracting deliverables. If they want the lower price, remove whitelisting or shorten the video duration so you protect your CPM floor.',
      suggestedFollowUpDays: 3,
    };
  }

  // Creative partner / collaborative tone
  return {
    pitchType: 'counter_offer_lowball',
    tone: communicationTone,
    subjectLine: `Partnership update: Aligning on scope for ${sponsorBrandName} x ${creatorChannelName}`,
    emailBody: `Hi ${sponsorBrandName} Team,

Thank you for thinking of ${creatorChannelName}! We are genuine users of ${sponsorBrandName} and are excited about potentially collaborating.

Looking at our current commercial benchmarks and audience engagement, our standard rate for a ${placementDeliverable} is ${formattedTargetRate}. While we cannot do the full placement at ${formattedOfferedRate}, we’d love to find a middle ground.

Could we meet at a bundled arrangement, or include performance bonus milestones if the campaign exceeds sign-up goals? Alternatively, we could do a dedicated Short/Reel that fits cleanly into your budget.

Looking forward to your thoughts!

Warmly,
${creatorChannelName}`,
    tacticalTip:
      'Propose milestone bonuses or alternative formats (e.g. Shorts) if you want to maintain a friendly relationship with high-growth startups.',
    suggestedFollowUpDays: 4,
  };
}

interface ColdPitchParameters {
  sponsorBrandName: string;
  creatorChannelName: string;
  contentNiche: string;
  placementDeliverable: string;
  audienceHighlight: string;
  communicationTone: PitchTone;
}

function generateColdPitchDraft(parameters: ColdPitchParameters): PitchDraftResult {
  const {
    sponsorBrandName,
    creatorChannelName,
    contentNiche,
    placementDeliverable,
    audienceHighlight,
    communicationTone,
  } = parameters;

  return {
    pitchType: 'cold_outreach',
    tone: communicationTone,
    subjectLine: `Sponsorship idea: Bringing ${sponsorBrandName} to ${creatorChannelName}'s audience (${contentNiche})`,
    emailBody: `Hi ${sponsorBrandName} Growth Team,

I run ${creatorChannelName}, a digital publication focused on ${contentNiche} reaching over ${audienceHighlight}.

I’ve been following ${sponsorBrandName}’s recent product launches and noticed your push into creator partnerships. We have an upcoming content series scheduled next month where a ${placementDeliverable} featuring ${sponsorBrandName} would seamlessly fit the narrative.

Our audience actively looks for tools that save time and optimize workflows. In our previous campaign with a comparable partner, we drove an average 8.4% click-through with sustained long-tail conversions.

Would you be open to a quick 5-minute review of our live Media Kit & available Q4 integration dates?

Best,
${creatorChannelName} Team`,
    tacticalTip:
      'Keep cold outreach under 150 words. Focus on the upcoming content theme and audience buying power rather than vanity follower numbers.',
    suggestedFollowUpDays: 4,
  };
}

interface AgencyIntroParameters {
  sponsorBrandName: string;
  creatorChannelName: string;
  contentNiche: string;
  placementDeliverable: string;
  formattedTargetRate: string;
  communicationTone: PitchTone;
}

function generateAgencyIntroDraft(parameters: AgencyIntroParameters): PitchDraftResult {
  const {
    sponsorBrandName,
    creatorChannelName,
    contentNiche,
    placementDeliverable,
    formattedTargetRate,
    communicationTone,
  } = parameters;

  return {
    pitchType: 'agency_intro',
    tone: communicationTone,
    subjectLine: `Media Buyer Kit & Q4 Avails — ${creatorChannelName} (${contentNiche})`,
    emailBody: `Hi ${sponsorBrandName} Media Team,

Reaching out with our Q4/Q1 rate card and editorial calendar for ${creatorChannelName}.

Quick Specs:
• Niche: ${contentNiche}
• Primary Placement: ${placementDeliverable} (Base: ${formattedTargetRate})
• Whitelisting & Paid Social Ads: 30 / 60 / 90 day addendums available
• Audience Verification: 70%+ Tier 1 (US, UK, CA, AU)

We offer fast 7-day turnaround, clean IAB-compliant disclosures, and verified post-campaign metric reporting. 

Let us know if you're booking rosters for upcoming client campaigns and we'll hold dates.

Best,
${creatorChannelName} Commercial Operations`,
    tacticalTip:
      'Agencies care about predictability, turnaround speed, and whitelisting permissions. Bullet points win with media buyers.',
    suggestedFollowUpDays: 5,
  };
}

interface GentleFollowUpParameters {
  sponsorBrandName: string;
  creatorChannelName: string;
  placementDeliverable: string;
  communicationTone: PitchTone;
}

function generateGentleFollowUpDraft(
  parameters: GentleFollowUpParameters
): PitchDraftResult {
  const {
    sponsorBrandName,
    creatorChannelName,
    placementDeliverable,
    communicationTone,
  } = parameters;

  return {
    pitchType: 'follow_up_gentle',
    tone: communicationTone,
    subjectLine: `Quick bump: ${placementDeliverable} availability for ${sponsorBrandName} x ${creatorChannelName}`,
    emailBody: `Hi ${sponsorBrandName} Team,

Just floating this to the top of your inbox before our production schedule locks in for next month.

We still have a prime slot open for the ${placementDeliverable}. If this is of interest for your current acquisition cycle, let me know and I will hold the spot. If timing is off for this quarter, no worries at all!

Best,
${creatorChannelName}`,
    tacticalTip:
      'Send this 3-5 business days after the initial pitch. 60% of brand deals are closed on the first follow-up.',
    suggestedFollowUpDays: 5,
  };
}

interface HandoverDeliveryParameters {
  sponsorBrandName: string;
  creatorChannelName: string;
  placementDeliverable: string;
  communicationTone: PitchTone;
}

function generateHandoverDeliveryDraft(
  parameters: HandoverDeliveryParameters
): PitchDraftResult {
  const {
    sponsorBrandName,
    creatorChannelName,
    placementDeliverable,
    communicationTone,
  } = parameters;

  const simulatedInvoiceNumber = Math.floor(1000 + Math.random() * 9000);

  return {
    pitchType: 'deliverable_handover',
    tone: communicationTone,
    subjectLine: `Live Deliverable + Attribution Link: ${sponsorBrandName} x ${creatorChannelName}`,
    emailBody: `Hi ${sponsorBrandName} Team,

The ${placementDeliverable} is officially published and live across our channels!

Here are the live links and tracking assets:
• Live Placement URL: [Insert Video Link]
• Trackable CTA in description & pinned comment: Verified Active
• First 24-hour analytics snapshot will be provided on Friday.

Please confirm receipt so we can begin the 30-day licensing window. Invoice #${simulatedInvoiceNumber} is attached per our agreed payment terms.

Thank you for an incredible collaboration!

Best regards,
${creatorChannelName}`,
    tacticalTip:
      'Send the handover within 2 hours of publication. Always include the invoice immediately while excitement is highest.',
    suggestedFollowUpDays: 7,
  };
}
