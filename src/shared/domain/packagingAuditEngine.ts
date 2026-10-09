/**
 * Packaging Audit Engine
 * Analyzes public video titles, thumbnails, and metadata to evaluate Click-Through Rate (CTR) potential.
 * Pinpoints mobile truncation, curiosity gaps, hook tension, and provides actionable rewrites.
 */

import type { VideoMetadata } from './videoMetadataFetcher';

export interface PackagingAuditResult {
  score: number; // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  hookStrength: 'Exceptional Hook' | 'Good Tension' | 'Moderate / Average' | 'Weak / Passive';
  mobileTruncationRisk: boolean;
  charCount: number;
  wordCount: number;
  strengths: string[];
  bottlenecks: string[];
  actionExperiments: string[];
  suggestedTitleRewrites: string[];
}

export function auditVideoPackaging(meta: VideoMetadata): PackagingAuditResult {
  const title = meta.title.trim();
  const charCount = title.length;
  const words = title.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let score = 70;
  const strengths: string[] = [];
  const bottlenecks: string[] = [];
  const actionExperiments: string[] = [];
  const suggestedTitleRewrites: string[] = [];

  const lower = title.toLowerCase();

  // 1. Mobile Truncation & Length Analysis
  // YouTube cuts off titles at ~50 characters on mobile home feed
  const mobileTruncationRisk = charCount > 52;
  if (mobileTruncationRisk) {
    score -= 15;
    bottlenecks.push(
      `Title is ${charCount} characters long. YouTube cuts off titles on mobile after ~50 characters, meaning mobile viewers (70%+ of traffic) will see a trailing "..." and miss your punchline.`
    );
    actionExperiments.push(
      `Shorten title to under 48 characters or move the highest-stakes keyword into the first 4 words.`
    );
  } else if (charCount >= 20 && charCount <= 50) {
    score += 10;
    strengths.push(
      `Optimal mobile length (${charCount} characters). Full title renders cleanly on iOS & Android feeds without being truncated.`
    );
  } else if (charCount < 20) {
    score -= 5;
    bottlenecks.push(
      `Title is very short (${charCount} characters). May lack sufficient context to trigger viewer search intent.`
    );
  }

  // 2. Curiosity & Tension Triggers
  const hasQuestion = title.includes('?') || lower.startsWith('why') || lower.startsWith('how') || lower.startsWith('what');
  const hasNegativeStakes = /\b(never|stop|worst|don't|mistake|ruined|lied|failed|waste|warning|broke)\b/i.test(title);
  const hasCuriosityWords = /\b(secret|truth|actually|exposed|nobody|real reason|finally|hidden)\b/i.test(title);
  const hasNumbers = /\b\d+(?:,\d+)?(?:\$|k|m|%)?\b|\$\d+/i.test(title);
  const hasBrackets = /\[.*?\]|\(.*?\)/.test(title);

  if (hasNegativeStakes) {
    score += 12;
    strengths.push(
      `High negative stakes detected: Loss-aversion words ("Stop", "Mistake", "Never") typically generate 20–35% higher CTR than generic positive praise.`
    );
  } else {
    bottlenecks.push(
      `Title lacks emotional stakes or tension: It states a topic rather than posing a dilemma or consequence.`
    );
    actionExperiments.push(
      `Test framing the title with a negative consequence or constraint (e.g. "Stop Doing X" instead of "How to do X").`
    );
  }

  if (hasQuestion) {
    score += 8;
    strengths.push(`Open curiosity loop: Phrasing as a question engages subconscious problem-solving.`);
  }

  if (hasNumbers) {
    score += 8;
    strengths.push(`Specific numbers or metrics detected: Concrete data points anchor viewer expectation.`);
  }

  if (hasBrackets) {
    score += 5;
    strengths.push(`Bracket callout formatting adds contrast in browse feeds.`);
  }

  if (hasCuriosityWords) {
    score += 10;
    strengths.push(`Curiosity gap trigger: Sparks information gap theory (viewers click to resolve the mystery).`);
  }

  // 3. Formatting & Spam Flags
  const upperCount = (title.match(/[A-Z]/g) || []).length;
  const isAllCaps = charCount > 10 && upperCount / charCount > 0.7;
  if (isAllCaps) {
    score -= 12;
    bottlenecks.push(
      `Excessive ALL CAPS formatting: Algorithms and mature audiences often filter out aggressive capitalization as spam or clickbait.`
    );
  }

  // Normalize Score
  score = Math.max(25, Math.min(98, score));

  let grade: PackagingAuditResult['grade'] = 'C';
  let hookStrength: PackagingAuditResult['hookStrength'] = 'Moderate / Average';

  if (score >= 90) {
    grade = 'A+';
    hookStrength = 'Exceptional Hook';
  } else if (score >= 80) {
    grade = 'A';
    hookStrength = 'Good Tension';
  } else if (score >= 65) {
    grade = 'B';
    hookStrength = 'Moderate / Average';
  } else if (score >= 50) {
    grade = 'C';
    hookStrength = 'Weak / Passive';
  } else {
    grade = 'D';
    hookStrength = 'Weak / Passive';
  }

  // 4. Generate Sharper Rewrites based on clean title base
  const cleanBase = title
    .replace(/[\[\(].*?[\]\)]/g, '')
    .replace(/[!\?]+/g, '')
    .trim();

  suggestedTitleRewrites.push(
    `Why Most Creators Fail at ${cleanBase.slice(0, 26)} (Avoid This)`
  );
  suggestedTitleRewrites.push(
    `I Tested ${cleanBase.slice(0, 24)} for 30 Days (The Honest Truth)`
  );
  suggestedTitleRewrites.push(
    `Stop Doing ${cleanBase.slice(0, 25)} Like This`
  );

  if (actionExperiments.length === 0) {
    actionExperiments.push(
      'Test swapping thumbnail face expression to high-contrast surprise to match title tension.'
    );
  }

  return {
    score,
    grade,
    hookStrength,
    mobileTruncationRisk,
    charCount,
    wordCount,
    strengths: strengths.length > 0 ? strengths : ['Basic descriptive framing.'],
    bottlenecks: bottlenecks.length > 0 ? bottlenecks : ['Packaging meets baseline standards.'],
    actionExperiments,
    suggestedTitleRewrites,
  };
}
