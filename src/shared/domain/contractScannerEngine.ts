import { ContractClauseRisk, ContractScanReport, RiskSeverity } from '@/shared/types';

interface ContractAuditRule {
  id: string;
  category: ContractClauseRisk['category'];
  severity: RiskSeverity;
  title: string;
  pattern: RegExp;
  dangerExplanation: string;
  recommendedCounterClause: string;
}

const RED_FLAG_AUDIT_RULES: ContractAuditRule[] = [
  {
    id: 'rule-perpetual',
    category: 'perpetual_rights',
    severity: 'critical',
    title: 'Perpetual & Irrevocable Rights Clause',
    pattern: /(in perpetuity|perpetual|forever|irrevocable|unlimited duration|throughout the universe in all media)/i,
    dangerExplanation:
      'The sponsor is demanding the right to use your likeness, voice, and video forever without paying any ongoing renewal fees. This devalues your future commercial value.',
    recommendedCounterClause:
      'Strike out "in perpetuity". Replace with: "Sponsor is granted a non-exclusive license to feature the Deliverable for a period of thirty (30) days from publication date. Any continued usage thereafter requires mutual written agreement and standard licensing renewal rates."',
  },
  {
    id: 'rule-delayed-pay',
    category: 'delayed_payment',
    severity: 'high',
    title: 'Predatory Net-60/Net-90 Payment Delay',
    pattern: /(net 60|net 90|90 days|60 days after|upon payment from client|quarterly payment)/i,
    dangerExplanation:
      'Payment terms exceeding Net-30 mean you are essentially financing the brand’s marketing campaign with free labor for 2 to 3 months.',
    recommendedCounterClause:
      'Replace with: "Payment terms shall be 50% deposit payable upon signing prior to production, with the remaining 50% balance payable within fifteen (15) days of publication (Net 15)."',
  },
  {
    id: 'rule-uncompensated-whitelisting',
    category: 'uncompensated_whitelisting',
    severity: 'critical',
    title: 'Uncompensated Paid Ad Whitelisting & Dark Posting',
    pattern: /(whitelisting|dark post|run paid ads|access to creator('s)? ad account|meta business manager access|boosted post rights)/i,
    dangerExplanation:
      'The brand wants to run targeted paid performance ads through your social handles. Whitelisting usually commands a +40% to +80% fee markup because it fatigues your audience.',
    recommendedCounterClause:
      'Replace with: "Paid advertising whitelisting rights are not included in the baseline sponsorship fee and may be purchased separately as an add-on at $500/month per active platform."',
  },
  {
    id: 'rule-exclusivity',
    category: 'excessive_exclusivity',
    severity: 'high',
    title: 'Overly Broad or Extended Exclusivity Lockout',
    pattern: /(exclusive|exclusivity|shall not partner|shall not promote|competing products|any competitor|for a period of \d+ (month|year)s)/i,
    dangerExplanation:
      'Extended exclusivity bans you from working with any other sponsors in that sector. Unless they are paying you a full category lockout premium (+50% to +100%), exclusivity should never exceed 14–30 days.',
    recommendedCounterClause:
      'Replace with: "Exclusivity shall apply solely to direct direct-to-consumer competitors in the exact category (e.g., VPN services) and shall strictly expire fourteen (14) days following the publication date."',
  },
  {
    id: 'rule-revisions',
    category: 'unlimited_revisions',
    severity: 'medium',
    title: 'Open-Ended or Unlimited Free Revisions',
    pattern: /(unlimited revisions|as many edits as|sole satisfaction|until approved by client|reshoot at creator('s)? expense)/i,
    dangerExplanation:
      'Unlimited revisions trap creators in endless revision loops for minor creative differences, drastically reducing your effective hourly pay.',
    recommendedCounterClause:
      'Replace with: "Deliverable includes up to one (1) round of reasonable editorial feedback provided within three (3) business days of draft submission. Additional rounds or full re-shoots shall incur a $250 fee per revision."',
  },
  {
    id: 'rule-kill-fee',
    category: 'unilateral_kill_fee',
    severity: 'high',
    title: 'Unilateral Cancellation Without Kill Fee',
    pattern: /(terminate at will|terminate without cause|sole discretion without penalty|cancel the campaign at any time)/i,
    dangerExplanation:
      'If the brand cancels after you already wrote, filmed, and edited the video, you would receive zero compensation under this clause.',
    recommendedCounterClause:
      'Replace with: "In the event of cancellation by Sponsor after draft submission, Sponsor agrees to pay a kill fee equal to 75% of the total agreed contract value."',
  },
  {
    id: 'rule-indemnity',
    category: 'broad_indemnity',
    severity: 'medium',
    title: 'One-Sided Indemnification & Liability Shift',
    pattern: /(indemnify, defend, and hold harmless|indemnify and hold harmless|all claims, damages, losses|unlimited liability)/i,
    dangerExplanation:
      'Shifts commercial liabilities (e.g. if the sponsor’s product has a defect or regulatory issue) onto the creator.',
    recommendedCounterClause:
      'Replace with: "Creator\'s total aggregate liability under this agreement shall be strictly capped at the total compensation received under this Statement of Work."',
  },
];

/**
 * Analyzes contract text or clauses and returns identified risks with counter-proposals.
 * Follows Rule 1 (Early Return) and Rule 2 (Intentional Naming).
 */
export function scanSponsorshipContract(sponsorshipContractText: string): ContractScanReport {
  const normalizedText = sponsorshipContractText?.trim() || '';
  const wordCount = normalizedText.length > 0 ? normalizedText.split(/\s+/).length : 0;

  // Early return for empty or non-contract input
  if (wordCount < 10) {
    return {
      safetyScore: 100,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      verdict: 'safe_to_sign',
      foundRisks: [],
      wordCount,
      scannedAt: new Date().toISOString(),
    };
  }

  const detectedRiskClauses: ContractClauseRisk[] = [];

  for (const auditRule of RED_FLAG_AUDIT_RULES) {
    const matchedClause = normalizedText.match(auditRule.pattern);
    if (matchedClause) {
      const matchIndex = matchedClause.index || 0;
      const snippetStartIndex = Math.max(0, matchIndex - 40);
      const snippetEndIndex = Math.min(
        normalizedText.length,
        matchIndex + matchedClause[0].length + 60
      );
      const extractedSnippet = normalizedText.slice(snippetStartIndex, snippetEndIndex).trim();

      detectedRiskClauses.push({
        id: auditRule.id,
        category: auditRule.category,
        severity: auditRule.severity,
        title: auditRule.title,
        detectedSnippet: `"...${extractedSnippet}..."`,
        dangerExplanation: auditRule.dangerExplanation,
        recommendedCounterClause: auditRule.recommendedCounterClause,
      });
    }
  }

  const criticalRiskCount = detectedRiskClauses.filter(
    (clause) => clause.severity === 'critical'
  ).length;
  const highRiskCount = detectedRiskClauses.filter(
    (clause) => clause.severity === 'high'
  ).length;
  const mediumRiskCount = detectedRiskClauses.filter(
    (clause) => clause.severity === 'medium'
  ).length;

  // Calculate safety score (100 is pristine, penalize heavily for critical)
  const totalRiskPenalty =
    criticalRiskCount * 30 + highRiskCount * 18 + mediumRiskCount * 8;
  const safetyScore = Math.max(10, 100 - totalRiskPenalty);

  let auditVerdict: ContractScanReport['verdict'] = 'safe_to_sign';
  if (criticalRiskCount > 0 || safetyScore < 50) {
    auditVerdict = 'predatory_do_not_sign';
  } else if (highRiskCount > 0 || mediumRiskCount > 0 || safetyScore < 80) {
    auditVerdict = 'caution_negotiate_terms';
  }

  return {
    safetyScore,
    criticalCount: criticalRiskCount,
    highCount: highRiskCount,
    mediumCount: mediumRiskCount,
    verdict: auditVerdict,
    foundRisks: detectedRiskClauses,
    wordCount,
    scannedAt: new Date().toISOString(),
  };
}
