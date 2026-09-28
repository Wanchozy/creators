import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;

    let isRunning = false;

    const updatePosition = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        currentX = targetX;
        currentY = targetY;
        if (containerRef.current) {
          containerRef.current.style.setProperty('--spotlight-x', `${currentX}px`);
          containerRef.current.style.setProperty('--spotlight-y', `${currentY}px`);
        }
        isRunning = false;
        return;
      }

      currentX += dx * 0.14;
      currentY += dy * 0.14;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--spotlight-x', `${currentX}px`);
        containerRef.current.style.setProperty('--spotlight-y', `${currentY}px`);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    startLoop();

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
