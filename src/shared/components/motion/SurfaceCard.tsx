import React from 'react';

interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  shine?: boolean;
}

/**
 * SurfaceCard embodies the Linear & Vercel surface design language:
 * - Pitch dark base surface (#090b10 or #0c0e14)
 * - Ultra-crisp hairline border (border-white/[0.08])
 * - Subtle illuminated top-edge hairline highlight (shine beam)
 * - Soft layered ambient elevation
 */
export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  className = '',
  shine = true,
  ...props
}) => {
  return (
    <div
      className={`relative rounded-2xl bg-[#090b10] border border-white/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)] overflow-hidden ${className}`}
      {...props}
    >
      {shine && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  );
};
