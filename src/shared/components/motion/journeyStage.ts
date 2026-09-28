export type JourneyStage = 'core' | 'analytics' | 'protection' | 'partnerships' | 'revenue' | 'convergence';

export const JOURNEY_STAGES: readonly JourneyStage[] = [
  'core', 'analytics', 'protection', 'partnerships', 'revenue', 'convergence',
];

export const JOURNEY_COLORS = [
  '#ad99ff', '#8dbdff', '#c0a3ff', '#f2bd82', '#8cddb0', '#c8eaa0',
] as const;

export const JOURNEY_BACKGROUNDS = [
  '#090a11', '#0c111a', '#100f19', '#14120f', '#0e1614', '#111018',
] as const;

export const journeyStageIndex: Readonly<Record<JourneyStage, number>> = {
  core: 0,
  analytics: 1,
  protection: 2,
  partnerships: 3,
  revenue: 4,
  convergence: 5,
};
