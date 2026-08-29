'use client';

/**
 * Single import surface for the animation library so swapping it later
 * (or tree-shaking it) touches one file instead of thirty.
 */
export {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  type Variants,
  type Transition,
} from 'motion/react';
