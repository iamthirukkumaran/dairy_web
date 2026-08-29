'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useCalmMotion } from './useCalmMotion';

/**
 * Editorial line reveal: each line sits in its own mask and rises out of
 * focus into focus. The blur is what stops it reading like a generic fade —
 * the words arrive the way a printed page does when you look up at it.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  as: Tag = 'span',
  onScroll = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Trigger when scrolled into view instead of on mount. */
  onScroll?: boolean;
}) {
  const { enabled } = useCalmMotion();

  if (!enabled) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const trigger = onScroll
    ? { whileInView: 'show' as const, viewport: { once: true, amount: 0.5 } }
    : { animate: 'show' as const };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn('block overflow-hidden pb-[0.08em]', lineClassName)}>
          <motion.span
            className="block will-change-[transform,filter,opacity]"
            initial={{ y: '108%', opacity: 0, filter: 'blur(8px)' }}
            variants={{ show: { y: '0%', opacity: 1, filter: 'blur(0px)' } }}
            {...trigger}
            transition={{
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
              filter: { duration: 0.85, delay: delay + i * stagger + 0.12 },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Words that arrive on their own schedule as the section scrolls past —
 * "Some days" … "become" … "memories."
 */
export function WordSequence({
  words,
  className,
  wordClassName,
}: {
  words: string[];
  className?: string;
  wordClassName?: string;
}) {
  const { enabled } = useCalmMotion();

  return (
    <span className={cn('inline-flex flex-wrap items-baseline gap-x-[0.28em]', className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.1em]">
          <motion.span
            className={cn('inline-block', wordClassName)}
            initial={enabled ? { y: '110%', opacity: 0, filter: 'blur(10px)' } : false}
            whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              // Each word waits noticeably longer than the last.
              delay: i * 0.42,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
