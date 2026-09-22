import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 4.5,
  yOffset = 8,
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={`shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
};
