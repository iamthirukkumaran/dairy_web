'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/animations/Reveal';
import { motion } from 'motion/react';
import { fadeUpBlur, viewportEarly } from '@/animations/variants';
import { useCalmMotion } from '@/animations/useCalmMotion';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>;
}

function HeadingReveal({ children }: { children: ReactNode }) {
  const { enabled } = useCalmMotion();
  if (!enabled) return <>{children}</>;
  return (
    <motion.div
      variants={fadeUpBlur}
      initial="hidden"
      whileInView="show"
      viewport={viewportEarly}
      transition={{ delay: 0.06 }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Tag = 'h2',
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <HeadingReveal>
        <Tag
          className={cn(
            'display text-[clamp(2.25rem,5.2vw,4.25rem)] text-ink',
            titleClassName,
          )}
        >
          {title}
        </Tag>
      </HeadingReveal>
      {intro ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft sm:text-[18px]',
              align === 'center' && 'mx-auto',
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
