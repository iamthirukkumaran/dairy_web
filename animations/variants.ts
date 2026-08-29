import type { Transition, Variants } from 'motion/react';

/** House easing: everything decelerates, nothing snaps. */
export const calm: Transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
export const calmFast: Transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
export const spring: Transition = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 };
export const softSpring: Transition = { type: 'spring', stiffness: 70, damping: 18, mass: 1.1 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: calm },
};

/** The house reveal: rises and comes into focus, never just fades. */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: calm },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: calm },
};

/** Parent that staggers its children; pair with `fadeUp` on each child. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Line-by-line editorial headline reveal. */
export const riseLine: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

export const viewportOnce = { once: true, amount: 0.35 } as const;
export const viewportEarly = { once: true, amount: 0.15 } as const;
