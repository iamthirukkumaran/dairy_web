'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { WordSequence } from '@/animations/TextReveal';
import { MemoryCard } from '@/components/MemoryCard';
import { MemoryReader, type ReaderTarget } from '@/components/MemoryReader';
import { memories, type Memory } from '@/data/memories';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { useIsDesktop } from '@/lib/useMediaQuery';
import { sound } from '@/lib/sound';

/** Where each card lands once the stack opens (percentages of the stage). */
const LAYOUT = [
  { x: 1, y: 2, r: -3 },
  { x: 36, y: 0, r: 2 },
  { x: 71, y: 7, r: -2 },
  { x: 3, y: 50, r: 2.5 },
  { x: 37, y: 56, r: -2 },
  { x: 71, y: 48, r: 3 },
];

/**
 * Section 4 — the memory wall.
 *
 * Desktop scrolls a stack of cards apart; small screens get a swipeable row
 * rather than a squashed version of the same idea. Either way the cards are
 * rendered once, and any of them will open into a full page.
 */
export function Memories() {
  const isDesktop = useIsDesktop();
  const { enabled } = useCalmMotion();
  const useStack = isDesktop && enabled;

  const cards = useRef<Record<string, HTMLElement | null>>({});
  const [target, setTarget] = useState<ReaderTarget | null>(null);

  const open = useCallback((memory: Memory) => {
    const el = cards.current[memory.id];
    if (!el) return;
    sound.play('paper');
    setTarget({ memory, rect: el.getBoundingClientRect() });
  }, []);

  const register = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      cards.current[id] = el;
    },
    [],
  );

  return (
    <section id="memories" className="relative py-24 sm:py-32" aria-label="Your memories">
      <Container wide>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Your memories</Eyebrow>
          </Reveal>
          <h2 className="mt-5 display justify-center text-[clamp(2.25rem,5.2vw,4.25rem)] text-ink">
            <WordSequence words={['Your days', 'become', 'memories.']} className="justify-center" />
          </h2>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft sm:text-[18px]">
              Not a wall of text you will never re-read. Small, titled, collectible things — each one
              a day you actually lived. Open any of them.
            </p>
          </Reveal>
        </div>
      </Container>

      {useStack ? (
        <ScrollStack onOpen={open} register={register} />
      ) : (
        <MemoryRail onOpen={open} register={register} />
      )}

      <MemoryReader target={target} onClose={() => setTarget(null)} />
    </section>
  );
}

type CardProps = {
  onOpen: (m: Memory) => void;
  register: (id: string) => (el: HTMLElement | null) => void;
};

function MemoryRail({ onOpen, register }: CardProps) {
  return (
    <div className="mt-12">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6">
        {memories.map((m) => (
          <div key={m.id} className="w-[78vw] shrink-0 snap-center sm:w-[46vw]">
            <MemoryCard
              ref={register(m.id)}
              memory={m}
              onOpen={() => onOpen(m)}
              className="h-full"
            />
          </div>
        ))}
        <div aria-hidden="true" className="w-2 shrink-0" />
      </div>
      <p className="px-6 font-sans text-[12px] text-ink-faint">Swipe to browse · tap to open →</p>
    </div>
  );
}

function ScrollStack({ onOpen, register }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 });

  return (
    <div ref={ref} data-stage="memories" className="relative mt-16 h-[240vh]">
      <div className="sticky top-[calc(var(--nav-height)+3rem)] h-[70vh] max-h-[660px]">
        <Container wide className="h-full">
          <div className="relative h-full">
            {memories.map((m, i) => (
              <StackCard
                key={m.id}
                index={i}
                progress={progress}
                memory={m}
                onOpen={() => onOpen(m)}
                register={register(m.id)}
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

function StackCard({
  index,
  progress,
  memory,
  onOpen,
  register,
}: {
  index: number;
  progress: MotionValue<number>;
  memory: Memory;
  onOpen: () => void;
  register: (el: HTMLElement | null) => void;
}) {
  const target = LAYOUT[index % LAYOUT.length];
  // Cards leave the stack one after another, then the wall holds while you
  // read it — the arrangement should not still be settling at the section end.
  const start = 0.04 + index * 0.045;
  const end = start + 0.3;

  const left = useTransform(progress, [start, end], [34, target.x]);
  const top = useTransform(progress, [start, end], [16, target.y]);
  // Overshoot the resting angle slightly, then settle — paper, not a slide.
  const rotate = useTransform(
    progress,
    [start, start + 0.3, end],
    [index * 1.6 - 4, target.r * 1.5, target.r],
  );
  const scale = useTransform(progress, [start, end], [0.94, 1]);
  const leftPct = useTransform(left, (v) => `${v}%`);
  const topPct = useTransform(top, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute w-[27%] gpu"
      style={{ left: leftPct, top: topPct, rotate, scale, zIndex: memories.length - index }}
    >
      <MemoryCard ref={register} memory={memory} compact onOpen={onOpen} />
    </motion.div>
  );
}
