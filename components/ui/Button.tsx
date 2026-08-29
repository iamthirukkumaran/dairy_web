'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { sound } from '@/lib/sound';
import { useCalmMotion } from '@/animations/useCalmMotion';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 rounded-pill font-sans font-medium ' +
  'transition-[background-color,color,box-shadow] duration-300 ease-calm ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-[#3a332d]',
  secondary: 'bg-paper/80 text-ink hairline hover:bg-paper',
  ghost: 'text-ink hover:text-clay',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-[54px] px-7 text-[15px]',
};

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Renders the trailing arrow that nudges right on hover. */
  arrow?: boolean;
};

/**
 * Buttons have weight: they rise a little under the cursor, take a real press
 * on pointer-down, and settle back on a spring rather than a linear ease.
 */
export const Button = forwardRef<HTMLAnchorElement, Props>(function Button(
  { variant = 'primary', size = 'md', className, children, arrow = false, onClick, ...props },
  ref,
) {
  const { enabled } = useCalmMotion();

  return (
    <motion.a
      ref={ref}
      data-cursor="cta"
      className={cn(
        base,
        variants[variant],
        sizes[size],
        variant === 'ghost' ? '' : 'shadow-soft',
        className,
      )}
      whileHover={enabled ? { y: -2, boxShadow: '0 2px 4px rgba(42,37,33,0.05), 0 20px 44px -20px rgba(42,37,33,0.28)' } : undefined}
      whileTap={enabled ? { y: 0, scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.7 }}
      onClick={(e) => {
        sound.play('tap');
        onClick?.(e);
      }}
      {...props}
    >
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-300 ease-calm group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </motion.a>
  );
});
