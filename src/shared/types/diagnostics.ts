import { Platform } from './common';

export interface RetentionPoint {
  second: number;
  retention: number;
}

export interface VideoDiagnostic {
  id: string;
  title: string;
  platform: Platform;
  uploadDate: string;
  views: number;
  expectedViews: number;
  ctr: number;
  channelAvgCtr: number;
  avdPercent: number;
  channelAvgAvd: number;
  retentionDropAt8s: number;
  first24hViews: number;
  status: 'critical_drop' | 'mild_underperform' | 'healthy' | 'viral';
  diagnoses: string[];
  possibleExperiments: string[];
  retentionTimeline: RetentionPoint[];
}

export interface CustomDiagnosisInput {
  title: string;
  actualViews: number;
  expectedViews: number;
  ctr: number;
  channelAvgCtr: number;
  retentionDropAt8s: number;
  first24hViews: number;
  introDurationSeconds: number;
  hasTextHook: boolean;
  faceInFirstTwoSec: boolean;
}

export interface DiagnosticVerdict {
  verdict: string;
  issues: string[];
  experiments: string[];
}
