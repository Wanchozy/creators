import React from 'react';

export const TechBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top Ambient Vignette Light Beam (Linear/Vercel style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-[100%] blur-3xl pointer-events-none" />
      
      {/* Ultra-subtle hairline grid with radial mask */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 15%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 15%, black 40%, transparent 95%)',
        }}
      />
    </div>
  );
};
