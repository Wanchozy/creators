/**
 * YouTube Studio CSV Parser
 * Parses audience retention curves and video analytics exported directly from YouTube Studio.
 * Handles both time-series retention curves and video summary tables.
 */

export interface ParsedRetentionPoint {
  second: number;
  retention: number; // 0 to 100%
  timestampLabel: string;
}

export interface ParsedYouTubeCsvResult {
  type: 'retention_curve' | 'video_summary' | 'unknown';
  title?: string;
  views?: number;
  ctr?: number;
  avdPercent?: number;
  dropAt8s?: number;
  retentionAt8s?: number;
  retentionAt0s?: number;
  totalDurationSeconds?: number;
  retentionTimeline: ParsedRetentionPoint[];
  totalDataPoints: number;
  notes: string[];
}

/**
 * Converts formatted timestamp ("0:00:08", "01:24", "8") into integer seconds.
 */
export function parseTimestampToSeconds(val: string): number {
  const clean = val.trim().replace(/^"/, '').replace(/"$/, '');
  
  if (!clean.includes(':')) {
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : Math.round(num);
  }

  const parts = clean.split(':').map((p) => parseFloat(p) || 0);
  if (parts.length === 2) {
    // mm:ss
    return Math.round(parts[0] * 60 + parts[1]);
  } else if (parts.length === 3) {
    // hh:mm:ss
    return Math.round(parts[0] * 3600 + parts[1] * 60 + parts[2]);
  }
  return 0;
}

/**
 * Cleans numerical percentage values ("62.5%", "0.625", "62.5") to standard 0-100 float.
 */
export function cleanPercentage(val: string): number {
  if (!val) return 0;
  const clean = val.replace('%', '').trim().replace(/^"/, '').replace(/"$/, '');
  const num = parseFloat(clean);
  if (isNaN(num)) return 0;

  // If YouTube exported decimal ratio (e.g. 0.62 instead of 62%)
  if (num > 0 && num <= 1 && val.includes('.')) {
    return Math.round(num * 1000) / 10;
  }
  return Math.round(num * 10) / 10;
}

/**
 * Core CSV Parser function
 */
export function parseYouTubeStudioCsv(csvText: string): ParsedYouTubeCsvResult {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error('The uploaded CSV file is empty or missing data rows.');
  }

  // Parse header
  const headerLine = lines[0];
  const headers = headerLine
    .split(',')
    .map((h) => h.trim().toLowerCase().replace(/^"/, '').replace(/"$/, ''));

  // 1. Detect Audience Retention Curve CSV
  const hasTimeCol = headers.some((h) => h.includes('time') || h.includes('second') || h.includes('timestamp'));
  const hasRetentionCol = headers.some(
    (h) => h.includes('retention') || h.includes('percentage') || h.includes('viewer')
  );

  if (hasTimeCol && hasRetentionCol) {
    const timeIdx = headers.findIndex((h) => h.includes('time') || h.includes('second') || h.includes('timestamp'));
    const retentionIdx = headers.findIndex(
      (h) => h.includes('audience retention') || h.includes('retention') || h.includes('percentage')
    );

    const rawPoints: { second: number; retention: number }[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      if (cols.length <= Math.max(timeIdx, retentionIdx)) continue;

      const sec = parseTimestampToSeconds(cols[timeIdx]);
      const ret = cleanPercentage(cols[retentionIdx]);

      if (!isNaN(sec) && !isNaN(ret)) {
        rawPoints.push({ second: sec, retention: ret });
      }
    }

    if (rawPoints.length === 0) {
      throw new Error('Could not extract retention data points from this CSV.');
    }

    // Sort by second
    rawPoints.sort((a, b) => a.second - b.second);

    const retention0 = rawPoints.find((p) => p.second <= 1)?.retention ?? 100;
    
    // Find point closest to second 8
    let pointAt8 = rawPoints.find((p) => p.second === 8);
    if (!pointAt8) {
      // Find closest
      pointAt8 = rawPoints.reduce((prev, curr) =>
        Math.abs(curr.second - 8) < Math.abs(prev.second - 8) ? curr : prev
      );
    }

    const retention8 = pointAt8 ? pointAt8.retention : Math.max(10, retention0 - 35);
    const dropAt8s = Math.max(0, Math.round((retention0 - retention8) * 10) / 10);
    const totalDuration = rawPoints[rawPoints.length - 1].second;

    // Sample normalized key checkpoints for chart: [0s, 8s, 30s, 60s, 120s, ...]
    const checkpoints = [0, 8, 30, 60, 120, 240, 480, 900].filter((s) => s <= totalDuration);
    if (checkpoints.length < 5 && totalDuration > 10) {
      checkpoints.push(Math.round(totalDuration * 0.25));
      checkpoints.push(Math.round(totalDuration * 0.5));
      checkpoints.push(Math.round(totalDuration * 0.75));
      checkpoints.push(totalDuration);
      checkpoints.sort((a, b) => a - b);
    }

    const sampledTimeline: ParsedRetentionPoint[] = [];
    const uniqueCheckpoints = Array.from(new Set(checkpoints));

    for (const cp of uniqueCheckpoints) {
      const closest = rawPoints.reduce((prev, curr) =>
        Math.abs(curr.second - cp) < Math.abs(prev.second - cp) ? curr : prev
      );
      sampledTimeline.push({
        second: cp,
        retention: closest.retention,
        timestampLabel: formatSecondsToLabel(cp),
      });
    }

    return {
      type: 'retention_curve',
      dropAt8s,
      retentionAt8s: retention8,
      retentionAt0s: retention0,
      totalDurationSeconds: totalDuration,
      retentionTimeline: sampledTimeline,
      totalDataPoints: rawPoints.length,
      notes: [
        `Parsed ${rawPoints.length} retention curve data points across ${formatSecondsToLabel(totalDuration)}.`,
        dropAt8s > 35
          ? `⚠️ Critical Cliff Detected: -${dropAt8s}% of viewers swiped or clicked away within the first 8 seconds!`
          : `✅ Healthy Hook Retention: Only -${dropAt8s}% dropped off at second 8.`,
      ],
    };
  }

  // 2. Detect Video Summary Table CSV
  const hasTitle = headers.some((h) => h.includes('title') || h.includes('content'));
  const hasViews = headers.some((h) => h.includes('view'));

  if (hasTitle || hasViews) {
    const titleIdx = headers.findIndex((h) => h.includes('title') || h.includes('content'));
    const viewsIdx = headers.findIndex((h) => h === 'views' || h.includes('view count') || h.includes('views'));
    const ctrIdx = headers.findIndex((h) => h.includes('click-through') || h.includes('ctr'));
    const avdIdx = headers.findIndex((h) => h.includes('average percentage viewed') || h.includes('avd'));

    const firstDataRow = lines[1].split(',');
    const title = titleIdx >= 0 ? firstDataRow[titleIdx]?.replace(/"/g, '') : undefined;
    const views = viewsIdx >= 0 ? parseInt(firstDataRow[viewsIdx]?.replace(/"/g, '').replace(/,/g, ''), 10) : undefined;
    const ctr = ctrIdx >= 0 ? cleanPercentage(firstDataRow[ctrIdx]) : undefined;
    const avdPercent = avdIdx >= 0 ? cleanPercentage(firstDataRow[avdIdx]) : undefined;

    return {
      type: 'video_summary',
      title,
      views: isNaN(views || 0) ? undefined : views,
      ctr,
      avdPercent,
      retentionTimeline: [],
      totalDataPoints: lines.length - 1,
      notes: [`Parsed YouTube Studio video table with ${lines.length - 1} records.`],
    };
  }

  return {
    type: 'unknown',
    retentionTimeline: [],
    totalDataPoints: lines.length,
    notes: ['File uploaded, but could not automatically match YouTube Studio standard headers.'],
  };
}

function formatSecondsToLabel(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
