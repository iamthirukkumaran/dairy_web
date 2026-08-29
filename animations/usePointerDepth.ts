'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import { useCalmMotion } from './useCalmMotion';
import { useIsTouch } from '@/lib/useIsTouch';

/**
 * Normalised pointer position (-1 … 1) for the whole viewport, spring-damped.
 * Layers multiply these by their own depth to build a parallax camera.
 * Returns motionless values on touch devices and under reduced motion.
 */
export function usePointerDepth(strength = 1) {
  const { enabled } = useCalmMotion();
  const touch = useIsTouch();
  const active = enabled && !touch;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Heavy damping: the camera drifts after the cursor, it does not track it.
  const x = useSpring(rawX, { stiffness: 32, damping: 26, mass: 1.4 });
  const y = useSpring(rawY, { stiffness: 32, damping: 26, mass: 1.4 });

  useEffect(() => {
    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(((e.clientX / window.innerWidth) * 2 - 1) * strength);
        rawY.set(((e.clientY / window.innerHeight) * 2 - 1) * strength);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, rawX, rawY, strength]);

  return { x, y, active };
}
