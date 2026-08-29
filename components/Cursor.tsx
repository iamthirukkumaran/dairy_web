'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { useIsTouch } from '@/lib/useIsTouch';

type Shape = 'default' | 'cta' | 'memory' | 'book' | 'text';

/**
 * The halo sits around the system pointer rather than replacing it, so links
 * stay precise and text stays selectable. Only its size and weight change.
 */
const SHAPES: Record<Shape, { size: number; radius: number; opacity: number; border: number }> = {
  default: { size: 26, radius: 999, opacity: 0.05, border: 0.8 },
  cta: { size: 52, radius: 999, opacity: 0.1, border: 0 },
  memory: { size: 70, radius: 16, opacity: 0.09, border: 0 },
  book: { size: 58, radius: 999, opacity: 0, border: 1.4 },
  text: { size: 16, radius: 999, opacity: 0.03, border: 0.8 },
};

/**
 * A soft companion dot, not a replacement for the pointer's meaning.
 * Elements opt into a shape with `data-cursor="cta | memory | book | text"`.
 * Never mounts on touch devices or under reduced motion, and the native
 * cursor is only hidden once this has actually taken over.
 */
export function Cursor() {
  const { enabled } = useCalmMotion();
  const touch = useIsTouch();
  const active = enabled && !touch;

  const [shape, setShape] = useState<Shape>('default');
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 480, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 480, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.('[data-cursor]');
      const next = (el?.getAttribute('data-cursor') as Shape | undefined) ?? 'default';
      setShape(SHAPES[next] ? next : 'default');
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [active, x, y]);

  if (!active) return null;

  const s = SHAPES[shape];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="border-ink/25"
        style={{ borderStyle: 'solid' }}
        animate={{
          width: s.size,
          height: s.size,
          borderRadius: s.radius,
          borderWidth: s.border,
          backgroundColor: `rgba(42,37,33,${s.opacity})`,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          x: '-50%',
          y: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.6 }}
      />
    </motion.div>
  );
}
