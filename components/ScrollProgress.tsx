'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useCalmMotion } from '@/animations/useCalmMotion';

/**
 * The story's own progress bar: a seed climbs a hairline and opens into a
 * flower as you reach the end. Decorative, so it is hidden from assistive
 * technology and from small screens where it would only be clutter.
 */
export function ScrollProgress() {
  const { enabled } = useCalmMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  const stem = useTransform(p, [0, 1], [0, 1]);
  const seedY = useTransform(p, [0, 1], ['0%', '100%']);
  const petals = useTransform(p, [0.72, 0.97], [0, 1]);
  const seed = useTransform(p, [0.72, 0.92], [1, 0]);
  const leafA = useTransform(p, [0.2, 0.42], [0, 1]);
  const leafB = useTransform(p, [0.45, 0.66], [0, 1]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden h-[42vh] w-6 -translate-y-1/2 xl:block"
    >
      {/* Track */}
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/[0.08]" />
      {/* Stem */}
      <motion.span
        className="absolute left-1/2 top-0 h-full w-px origin-top bg-sage-deep/45"
        style={{ translateX: '-50%', scaleY: stem }}
      />
      {/* Leaves unfurl on the way up */}
      <motion.span
        className="absolute left-1/2 top-[32%] block h-[7px] w-[14px] origin-right rounded-full bg-sage/70"
        style={{ translateX: '-100%', scaleX: leafA, opacity: leafA, rotate: -22 }}
      />
      <motion.span
        className="absolute left-1/2 top-[56%] block h-[7px] w-[14px] origin-left rounded-full bg-sage/60"
        style={{ scaleX: leafB, opacity: leafB, rotate: 22 }}
      />
      {/* Seed, then bloom */}
      <motion.span className="absolute left-1/2 top-0 block" style={{ translateX: '-50%', y: seedY }}>
        <motion.span
          className="block h-[7px] w-[7px] rounded-full bg-clay"
          style={{ translateY: '-50%', opacity: seed }}
        />
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute left-1/2 top-0 h-6 w-6"
          style={{ translateX: '-50%', translateY: '-50%', scale: petals, opacity: petals }}
        >
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse key={deg} cx="12" cy="6.5" rx="3.1" ry="5" fill="#F2C7A9" transform={`rotate(${deg} 12 12)`} />
          ))}
          <circle cx="12" cy="12" r="2.6" fill="#BE6F4C" />
        </motion.svg>
      </motion.span>
    </div>
  );
}
