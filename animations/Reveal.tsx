'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { fadeUp, viewportEarly } from './variants';
import { useCalmMotion } from './useCalmMotion';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
};

/** Scroll-triggered fade-up. Renders statically under prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const { enabled } = useCalmMotion();
  const Tag = motion[as];

  if (!enabled) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportEarly}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
