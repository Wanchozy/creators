import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      // Smooth lerp (linear interpolation) for organic trailing effect
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--spotlight-x', `${currentX}px`);
        containerRef.current.style.setProperty('--spotlight-y', `${currentY}px`);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-500"
      style={
        {
          '--spotlight-x': '50vw',
          '--spotlight-y': '30vh',
          background: `
            radial-gradient(750px circle at var(--spotlight-x) var(--spotlight-y), rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.04), transparent 70%),
            radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), rgba(16, 185, 129, 0.03), transparent 60%)
          `,
        } as React.CSSProperties
      }
    />
  );
};
