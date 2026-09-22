import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  duration = 8,
  borderWidth = 1.5,
  colorFrom = '#6366f1',
  colorTo = '#10b981',
}) => {
  return (
    <div
      aria-hidden="true"
      style={
        {
          '--duration': `${duration}s`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        className="absolute inset-0 rounded-[inherit] opacity-75"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--color-from) 60deg, var(--color-to) 120deg, transparent 180deg)`,
          animation: `spin var(--duration) linear infinite`,
        }}
      />
    </div>
  );
};
