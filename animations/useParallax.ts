'use client';

import { type RefObject } from 'react';
import { useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useCalmMotion } from './useCalmMotion';

/**
 * Maps an element's progress through the viewport onto a translateY range.
 * Returns a spring-smoothed motion value; flat (0) when motion is reduced.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 60,
  offset: [string, string] = ['start end', 'end start'],
): MotionValue<number> {
  const { enabled } = useCalmMotion();
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });
  const raw = useTransform(scrollYProgress, [0, 1], enabled ? [distance, -distance] : [0, 0]);
  return useSpring(raw, { stiffness: 60, damping: 20, mass: 0.6 });
}
