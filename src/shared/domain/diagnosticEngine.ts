import { CustomDiagnosisInput, DiagnosticVerdict } from '@/shared/types';
export type { CustomDiagnosisInput, DiagnosticVerdict };

export function diagnoseVideoPerformance(input: CustomDiagnosisInput): DiagnosticVerdict {
  const issues: string[] = [];
  const experiments: string[] = [];

  const ctrDiff = ((input.ctr - input.channelAvgCtr) / input.channelAvgCtr) * 100;

  if (ctrDiff < -25) {
    issues.push(
      `Initial Click-Through Rate (${input.ctr.toFixed(1)}%) collapsed ${Math.abs(Math.round(ctrDiff))}% below your channel average (${input.channelAvgCtr.toFixed(1)}%). The title/thumbnail combo failed to spark curiosity or promise high payoff.`
    );
    experiments.push("Swap thumbnail to an extreme close-up or curiosity-gap visual with under 4 words of high-contrast text.");
    experiments.push("Re-title with an active stake: Test a negative constraint or surprising question format.");
  } else if (ctrDiff > 20) {
    issues.push(`Great packaging! Initial CTR was +${Math.round(ctrDiff)}% above your average.`);
  }

  if (input.retentionDropAt8s > 35) {
    issues.push(
      `Severe 8-second cliff: ${input.retentionDropAt8s}% of total viewers swiped away or clicked back within the first 8 seconds.`
    );
    if (input.introDurationSeconds > 4) {
      issues.push(`Your intro was ${input.introDurationSeconds} seconds before delivering on the title premise.`);
      experiments.push("Cut intro bumper to 0 seconds. Deliver the core premise or tension in frame 1.");
    }
    if (!input.faceInFirstTwoSec) {
      experiments.push("Put human face with dynamic eyeline expression in the first 1.5 seconds.");
    }
    if (!input.hasTextHook) {
      experiments.push("Add bold, high-contrast subtitles/hook text on screen for muted mobile scrollers.");
    }
  }

  if (input.actualViews < input.expectedViews * 0.3) {
    issues.push(
      `Algorithm distribution throttled: First 24-hour velocity was insufficient to push beyond your most loyal seed audience into broad browse/suggested feeds.`
    );
    experiments.push("Pin an engaging question comment within the first 5 minutes of publishing to spur early reply velocity.");
  }

  return {
    verdict: input.actualViews < input.expectedViews * 0.4 ? 'Critical Algorithm Drop' : 'Moderate Underperformance',
    issues: issues.length > 0 ? issues : ["Performance is aligned with baseline expectation."],
    experiments: experiments.length > 0 ? experiments : ["Keep testing variations on this proven format."],
  };
}
