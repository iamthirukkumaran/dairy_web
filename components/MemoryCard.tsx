'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { BotanicalMark } from '@/components/art/Flower';
import { cn } from '@/lib/utils';
import type { Memory } from '@/data/memories';
import { useCalmMotion } from '@/animations/useCalmMotion';

/** Paper tones, with a warmer state the card moves to when it lifts. */
const SURFACE: Record<Memory['tone'], { rest: string; hover: string; border: string; ink: string }> = {
  peach: { rest: '#FBEADD', hover: '#FDF0E4', border: '#E7C7AC', ink: '#BE6F4C' },
  sage: { rest: '#E9F0E5', hover: '#EFF5EB', border: '#C3D5BD', ink: '#6F8C69' },
  lavender: { rest: '#EDEAF5', hover: '#F3F0FA', border: '#CFC7E1', ink: '#9E93BC' },
  cream: { rest: '#F7EFE1', hover: '#FBF5EA', border: '#E3D3B9', ink: '#A9885F' },
  sun: { rest: '#FAEFD3', hover: '#FDF6E2', border: '#EBD69F', ink: '#C79A3C' },
};

export type MemoryCardData = Pick<
  Memory,
  'id' | 'date' | 'title' | 'excerpt' | 'tone' | 'tags' | 'mood' | 'botanical'
>;

/**
 * A memory as a physical card: real paper tone, a printed botanical mark, and
 * a hover that lifts the sheet, deepens its shadow, warms the stock and
 * nudges the contents a pixel or two — the way a card moves under your hand.
 */
export const MemoryCard = forwardRef<
  HTMLElement,
  {
    memory: MemoryCardData;
    className?: string;
    compact?: boolean;
    interactive?: boolean;
    onOpen?: () => void;
    style?: React.CSSProperties;
  }
>(function MemoryCard({ memory, className, compact = false, interactive = true, onOpen, style }, ref) {
  const { enabled } = useCalmMotion();
  const s = SURFACE[memory.tone];
  const clickable = Boolean(onOpen);

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      style={{ ...style, backgroundColor: s.rest, borderColor: s.border }}
      initial={false}
      whileHover={
        interactive && enabled
          ? {
              y: -8,
              backgroundColor: s.hover,
              boxShadow: '0 3px 6px rgba(42,37,33,0.05), 0 26px 50px -24px rgba(42,37,33,0.3)',
            }
          : undefined
      }
      whileTap={clickable && enabled ? { scale: 0.985 } : undefined}
      transition={{ type: 'spring', stiffness: 240, damping: 26, mass: 0.8 }}
      className={cn(
        'group relative overflow-hidden rounded-card border shadow-soft',
        clickable && 'cursor-pointer',
        compact ? 'p-5' : 'p-6 sm:p-7',
        className,
      )}
      onClick={onOpen}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen?.();
              }
            }
          : undefined
      }
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      aria-label={clickable ? `Open memory: ${memory.title}` : undefined}
      data-cursor={clickable ? 'memory' : undefined}
    >
      <BotanicalMark
        variant={memory.botanical}
        tint={s.ink}
        className={cn(
          'pointer-events-none absolute -right-2 -top-2 opacity-40 transition-transform duration-700 ease-calm group-hover:rotate-3',
          compact ? 'h-14 w-14' : 'h-20 w-20',
        )}
      />

      {/* Contents shift a hair as the sheet lifts */}
      <motion.div
        className="relative"
        variants={{ rest: { y: 0 }, hover: { y: -2 } }}
        initial="rest"
        whileHover={enabled ? 'hover' : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <p className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink/45">
          {memory.date}
        </p>
        <h3
          className={cn(
            'mt-3 max-w-[92%] font-serif tracking-editorial text-ink',
            compact ? 'text-[17px] leading-[1.25]' : 'text-[21px] leading-[1.22] sm:text-[24px]',
          )}
        >
          {memory.title}
        </h3>
        {!compact && memory.excerpt ? (
          <p className="mt-3 font-sans text-[14px] leading-[1.65] text-ink-soft">{memory.excerpt}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {memory.mood ? (
            <span
              className="rounded-pill px-2.5 py-1 font-sans text-[10.5px]"
              style={{ backgroundColor: 'rgba(255,255,255,0.55)', color: s.ink }}
            >
              {memory.mood}
            </span>
          ) : null}
          {memory.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-pill border border-ink/[0.08] bg-paper/60 px-2.5 py-1 font-sans text-[10.5px] text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
});
