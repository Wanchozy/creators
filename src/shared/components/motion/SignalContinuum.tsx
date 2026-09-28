import React, { useId } from 'react';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { mockRevenueAnalytics, mockVideoDiagnostics } from '@/shared/data/mockData';
import { JOURNEY_COLORS } from './journeyStage';

type Point = readonly [number, number];
type Placement = 'hero' | 'stage' | 'cta' | 'ambient';

interface SignalContinuumProps {
  progress: MotionValue<number>;
  placement: Placement;
  className?: string;
}

const stops = [0, 1, 2, 3, 4, 5];
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function sampleRetentionPoints(): Point[] {
  const points = mockVideoDiagnostics[0].retentionTimeline;
  const samples = Array.from({ length: 6 }, (_, index) => points[Math.round((points.length - 1) * index / 5)]);
  const values = samples.map((point) => point.retention);
  const low = Math.min(...values);
  const high = Math.max(...values);
  return samples.map((point, index) => [
    40 + index * 96,
    137 - ((point.retention - low) / Math.max(1, high - low)) * 94,
  ] as const);
}

const orbitPoints: Point[] = [[43, 77], [126, 42], [220, 106], [303, 53], [391, 119], [517, 74]];
const protectionPoints: Point[] = [[46, 79], [117, 43], [197, 113], [280, 57], [373, 115], [514, 71]];
const opportunityPoints: Point[] = [[73, 50], [158, 106], [245, 50], [329, 106], [416, 50], [502, 106]];
const revenuePoints: Point[] = [[44, 49], [139, 57], [235, 76], [330, 93], [425, 113], [518, 128]];
const convergencePoints: Point[] = [[268, 70], [279, 69], [290, 72], [269, 88], [280, 90], [291, 87]];
const analyticsPoints = sampleRetentionPoints();
const stagePoints: readonly Point[][] = [orbitPoints, analyticsPoints, protectionPoints, opportunityPoints, revenuePoints, convergencePoints];
const pointSizes: readonly (readonly [number, number])[] = [[5, 5], [5, 5], [10, 10], [68, 35], [61, 14], [4, 4]];

function curvePath(points: Point[]): string {
  if (points.length < 2) return '';
  let path = `M ${points[0][0]} ${points[0][1]}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const previous = points[Math.max(0, index - 1)];
    const following = points[Math.min(points.length - 1, index + 2)];
    const cp1: Point = [current[0] + (next[0] - previous[0]) / 6, current[1] + (next[1] - previous[1]) / 6];
    const cp2: Point = [next[0] - (following[0] - current[0]) / 6, next[1] - (following[1] - current[1]) / 6];
    path += ` C ${cp1[0].toFixed(2)} ${cp1[1].toFixed(2)}, ${cp2[0].toFixed(2)} ${cp2[1].toFixed(2)}, ${next[0]} ${next[1]}`;
  }
  return path;
}

function usePointTrack(progress: MotionValue<number>, index: number) {
  return {
    x: useTransform(progress, stops, stagePoints.map((stage) => stage[index][0])),
    y: useTransform(progress, stops, stagePoints.map((stage) => stage[index][1])),
  };
}

const SignalNode: React.FC<{ progress: MotionValue<number>; x: MotionValue<number>; y: MotionValue<number>; index: number; color: MotionValue<string>; barOpacity: MotionValue<number>; cardOpacity: MotionValue<number>; markerRadius: MotionValue<number>; markerOpacity: MotionValue<number> }> = ({ progress, x, y, index, color, barOpacity, cardOpacity, markerRadius, markerOpacity }) => {
  const width = useTransform(progress, stops, pointSizes.map(([value]) => value));
  const height = useTransform(progress, stops, pointSizes.map(([, value]) => value));
  const left = useTransform(() => x.get() - width.get() / 2);
  const top = useTransform(() => y.get() - height.get() / 2);
  const radius = useTransform(progress, stops, [2, 2, 5, 5, 7, 2]);
  const barHeight = useTransform(progress, [0, 1, 1.8, 3.5, 4.1, 5], [0, Math.max(12, analyticsPoints[index][1] - 20), Math.max(10, analyticsPoints[index][1] * 0.47), 3, 7, 2]);
  const barWidth = useTransform(progress, stops, [3, 18, 3, 18, 82, 3]);
  const barTop = useTransform(() => y.get() - barHeight.get());
  const barLeft = useTransform(() => x.get() - barWidth.get() / 2);
  const markerFill = index < 2 ? '#fff' : color;
  return <g>
    <motion.rect x={barLeft} y={barTop} width={barWidth} height={barHeight} rx="3.5" fill={markerFill} style={{ opacity: barOpacity }} />
    <motion.rect x={left} y={top} width={width} height={height} rx={radius} fill="#131720" stroke={color} strokeWidth="1" style={{ opacity: cardOpacity }} />
    <motion.circle cx={x} cy={y} r={markerRadius} fill={markerFill} stroke="#10131c" strokeWidth="1.2" style={{ opacity: markerOpacity }} />
  </g>;
};

/** The same six signals share one progress-linked geometry from the hero to the final action. */
export const SignalContinuum: React.FC<SignalContinuumProps> = ({ progress, placement, className = '' }) => {
  const id = `signal-continuum-${useId().replace(/:/g, '')}`;
  const reducedMotion = useReducedMotion();
  const p0 = usePointTrack(progress, 0);
  const p1 = usePointTrack(progress, 1);
  const p2 = usePointTrack(progress, 2);
  const p3 = usePointTrack(progress, 3);
  const p4 = usePointTrack(progress, 4);
  const p5 = usePointTrack(progress, 5);
  const tracks = [p0, p1, p2, p3, p4, p5];
  const color = useTransform(progress, stops, [...JOURNEY_COLORS] as string[]);
  const path = useTransform(() => curvePath(tracks.map(({ x, y }) => [x.get(), y.get()] as Point)));
  const lineOpacity = useTransform(progress, [0, 0.72, 1, 2, 3, 4, 5], [0.24, 0.42, 0.9, 0.88, 0.72, 0.9, 0.74]);
  const networkOpacity = useTransform(progress, [0, 1.3, 1.85, 2.25, 3, 4, 5], [0.04, 0.04, 0.48, 0.95, 0.5, 0.19, 0.28]);
  const chartOpacity = useTransform(progress, [0, 0.7, 1, 1.58, 2.05, 3.55, 4.12, 4.7, 5], [0.03, 0.06, 0.9, 0.8, 0.12, 0.05, 0.83, 0.73, 0.12]);
  const cardOpacity = useTransform(progress, [0, 1.55, 2.15, 2.72, 3.05, 3.7, 4.18, 4.72, 5], [0.1, 0.1, 0.16, 0.62, 0.95, 0.78, 0.34, 0.14, 0.06]);
  const convergenceOpacity = useTransform(progress, [0, 4.55, 4.85, 5], [0, 0, 0.72, 1]);
  const pathLength = useTransform(progress, [0, 0.68, 1.06, 1.68, 2.15, 3, 4, 4.82, 5], [0.04, 0.22, 1, 1, 1, 0.84, 1, 0.93, 0.72]);
  const markerRadius = useTransform(progress, stops, [2.4, 3.1, 4.2, 3.2, 2.8, 1.7]);
  const markerOpacity = useTransform(progress, [0, 0.74, 1, 4, 5], [0.72, 0.74, 0.85, 0.9, 0.95]);
  const revenueFill = useTransform(progress, [0, 0.75, 1, 2, 3, 4, 5], [0.06, 0.16, 0.12, 0.08, 0.28, 1, 0.2]);
  const revenueSteps = [
    { label: 'RAW VIEWS', fraction: 1 },
    { label: 'QUALIFIED', fraction: clamp(mockRevenueAnalytics.qualificationRatePercent / 100, 0.2, 1) },
    { label: 'EFFECTIVE RPM', fraction: 0.54 },
    { label: 'EST. REWARD', fraction: clamp(mockRevenueAnalytics.estimatedEarnings / Math.max(1, mockRevenueAnalytics.totalViews * mockRevenueAnalytics.rpm / 1000), 0.2, 1) },
  ];

  return <div className={`signal-continuum signal-continuum-${placement} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 560 160" preserveAspectRatio="none">
      <defs><radialGradient id={`${id}-center`}><stop offset="0%" stopColor="#fff" stopOpacity=".42" /><stop offset="100%" stopColor="#fff" stopOpacity="0" /></radialGradient></defs>
      <motion.path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: reducedMotion ? 1 : pathLength, opacity: lineOpacity }} />
      {[0, 1, 2].map((offset) => <motion.line key={offset} x1={tracks[offset].x} y1={tracks[offset].y} x2={tracks[offset + 3].x} y2={tracks[offset + 3].y} stroke={color} strokeWidth="1.05" strokeDasharray="3 5" strokeLinecap="round" style={{ opacity: networkOpacity }} />)}
      {tracks.map((track, index) => <SignalNode key={index} progress={progress} x={track.x} y={track.y} index={index} color={color} barOpacity={chartOpacity} cardOpacity={cardOpacity} markerRadius={markerRadius} markerOpacity={markerOpacity} />)}
      <motion.ellipse cx="280" cy="80" rx="31" ry="25" fill={`url(#${id}-center)`} style={{ opacity: convergenceOpacity }} />
      <motion.g style={{ opacity: revenueFill }}>
        {revenueSteps.map((step, index) => <g key={step.label}>
          <rect x={140 + index * 73} y="147" width="62" height="3" rx="1.5" fill="#ffffff" fillOpacity=".15" />
          <motion.rect x={140 + index * 73} y="147" width={62 * step.fraction} height="3" rx="1.5" fill={color} />
        </g>)}
      </motion.g>
    </svg>
    {placement === 'stage' && <div className="signal-continuum-label"><span>ONE SIGNAL</span><i /><span>NEW FORM</span><motion.i style={{ scaleX: reducedMotion ? 1 : pathLength }} /><span>ONE SYSTEM</span></div>}
    {placement === 'cta' && <div className="signal-continuum-endpoint"><span>ONE SIGNAL</span><i /><span>NEXT MOVE</span></div>}
  </div>;
};
