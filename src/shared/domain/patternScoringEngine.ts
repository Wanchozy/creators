export interface PatternHypothesisInput {
  testLength: number;
  testHookTime: number;
  testHasFace: boolean;
  testHasTextOverlay: boolean;
  testHasIntroBumper: boolean;
}

/**
 * Pure domain function evaluating a video concept against statistically
 * mined top-performer characteristics.
 */
export function scorePatternHypothesis(input: PatternHypothesisInput): number {
  let score = 50;
  if (input.testLength >= 18 && input.testLength <= 32) score += 20;
  if (input.testHookTime <= 2) score += 15;
  if (input.testHasFace) score += 10;
  if (input.testHasTextOverlay) score += 10;
  if (input.testHasIntroBumper) score -= 30;
  return Math.min(99, Math.max(10, score));
}
