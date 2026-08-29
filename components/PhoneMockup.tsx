'use client';

import { type ReactNode } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import { useCalmMotion } from '@/animations/useCalmMotion';

/**
 * A device that behaves like an object in the room rather than an image of one.
 *
 * It floats, tilts towards the pointer, catches a moving highlight across the
 * glass, and drops a shadow that shifts as it turns. The screen is a plain
 * slot — sections compose their own UI inside it.
 */
export function PhoneMockup({
  children,
  className,
  float = true,
  width = 300,
  depth,
  tilt = 1,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  float?: boolean;
  width?: number;
  /** Pointer position from `usePointerDepth()`. */
  depth?: { x: MotionValue<number>; y: MotionValue<number> };
  tilt?: number;
  /** Resting angle, in degrees. A Tailwind rotate class would be overwritten
   *  by the float animation's transform, so it has to come through here. */
  rotate?: number;
}) {
  const { enabled } = useCalmMotion();
  const shouldFloat = float && enabled;

  const zero = useTransform(() => 0);
  const px = depth?.x ?? zero;
  const py = depth?.y ?? zero;

  const rotateY = useTransform(px, (v) => v * 7 * tilt);
  const rotateX = useTransform(py, (v) => -v * 5 * tilt);
  // The highlight sweeps as the device turns — the reason the tilt reads at all.
  const glareX = useTransform(px, (v) => `${50 + v * 34}%`);
  const glareOpacity = useTransform(px, (v) => 0.16 + Math.abs(v) * 0.2);
  // Shadow leans the opposite way and softens as the device tips away.
  const shadowX = useTransform(px, (v) => `${-v * 16}px`);
  const shadowScale = useTransform(py, (v) => 1 - v * 0.08);
  const glare = useTransform(
    glareX,
    (x) =>
      `linear-gradient(118deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) ${x}, rgba(255,255,255,0) calc(${x} + 16%))`,
  );

  return (
    <motion.div
      className={cn('relative gpu', className)}
      style={{
        // Never wider than the column: 312px is an intent, not a guarantee.
        width: `min(100%, ${width}px)`,
        aspectRatio: '300 / 620',
        perspective: 1400,
        rotate,
      }}
      animate={shouldFloat ? { y: [0, -12, 0] } : undefined}
      transition={shouldFloat ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      {/* Cast shadow on the ground beneath the device */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 h-10 w-[78%] rounded-[50%] bg-ink/15 blur-2xl"
        style={{ x: shadowX, translateX: '-50%', scaleX: shadowScale }}
      />

      <motion.div
        className="preserve-3d relative h-full w-full rounded-[42px] bg-[#2A2521] p-[10px]"
        style={{
          rotateY,
          rotateX,
          boxShadow:
            '0 40px 90px -40px rgba(42,37,33,0.45), 0 8px 24px -12px rgba(42,37,33,0.18)',
        }}
      >
        <div className="absolute inset-0 rounded-[42px] ring-1 ring-inset ring-white/10" />
        {/* Machined edge highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[42px]"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 74%, rgba(255,255,255,0.12) 100%)',
          }}
        />

        <div className="relative h-full w-full overflow-hidden rounded-[33px] bg-paper">
          {/* Dynamic island */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#2A2521]"
          />
          {children}

          {/* Glass: a soft diagonal sheen that moves with the tilt */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[33px] mix-blend-screen"
            style={{ opacity: glareOpacity, backgroundImage: glare }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Standard status bar so demo screens read as a real app. */
export function PhoneStatusBar({ tint = 'text-ink' }: { tint?: string }) {
  return (
    <div
      className={cn(
        'relative z-10 flex items-center justify-between px-6 pt-[13px] font-sans text-[11px] font-semibold',
        tint,
      )}
      aria-hidden="true"
    >
      <span>9:41</span>
      <span className="flex items-center gap-1 opacity-70">
        <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
          <rect x="0" y="6" width="2.5" height="4" rx="0.8" />
          <rect x="4" y="4" width="2.5" height="6" rx="0.8" />
          <rect x="8" y="2" width="2.5" height="8" rx="0.8" />
          <rect x="12" y="0" width="2.5" height="10" rx="0.8" opacity="0.4" />
        </svg>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor">
          <rect x="0.5" y="0.5" width="16" height="9" rx="2.5" strokeWidth="1" opacity="0.5" />
          <rect x="2" y="2" width="11" height="6" rx="1.4" fill="currentColor" />
          <path d="M18.5 3.5v3" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}
