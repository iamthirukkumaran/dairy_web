'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BotanicalMark } from '@/components/art/Flower';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { sound } from '@/lib/sound';
import type { Memory } from '@/data/memories';

const TINT: Record<Memory['tone'], { paper: string; border: string; ink: string }> = {
  peach: { paper: '#FBEADD', border: '#E7C7AC', ink: '#BE6F4C' },
  sage: { paper: '#E9F0E5', border: '#C3D5BD', ink: '#6F8C69' },
  lavender: { paper: '#EDEAF5', border: '#CFC7E1', ink: '#9E93BC' },
  cream: { paper: '#F7EFE1', border: '#E3D3B9', ink: '#A9885F' },
  sun: { paper: '#FAEFD3', border: '#EBD69F', ink: '#C79A3C' },
};

export type ReaderTarget = { memory: Memory; rect: DOMRect };

function pageBox() {
  const w = Math.min(760, window.innerWidth - 40);
  const h = Math.min(760, window.innerHeight - 80);
  return {
    left: (window.innerWidth - w) / 2,
    top: (window.innerHeight - h) / 2,
    width: w,
    height: h,
  };
}

/**
 * Signature interaction: a card grows out of the wall into a full page, and
 * folds back into exactly the card it came from.
 *
 * The expansion is a hand-rolled FLIP from the card's real bounding box rather
 * than a shared-layout animation, because the cards live inside transformed,
 * sticky containers where layout projection is unreliable.
 */
export function MemoryReader({
  target,
  onClose,
}: {
  target: ReaderTarget | null;
  onClose: () => void;
}) {
  const { enabled } = useCalmMotion();
  const [mounted, setMounted] = useState(false);
  const [box, setBox] = useState<ReturnType<typeof pageBox> | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    sound.play('paper');
    onClose();
  }, [onClose]);

  // Lock scrolling, trap focus, and hand focus back on close.
  useEffect(() => {
    if (!target) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setBox(pageBox());
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 120);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => setBox(pageBox());

    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      restoreFocus.current?.focus?.();
    };
  }, [target, close]);

  if (!mounted) return null;

  const open = Boolean(target && box);

  return createPortal(
    <AnimatePresence>
      {open && target && box ? (
        <div className="fixed inset-0 z-[90]" role="presentation">
          <motion.div
            className="absolute inset-0 bg-ivory/70 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-reader-title"
            className="absolute overflow-hidden border shadow-lift"
            style={{
              backgroundColor: TINT[target.memory.tone].paper,
              borderColor: TINT[target.memory.tone].border,
            }}
            initial={
              enabled
                ? {
                    left: target.rect.left,
                    top: target.rect.top,
                    width: target.rect.width,
                    height: target.rect.height,
                    borderRadius: 24,
                  }
                : false
            }
            animate={{ ...box, borderRadius: 26 }}
            exit={
              enabled
                ? {
                    left: target.rect.left,
                    top: target.rect.top,
                    width: target.rect.width,
                    height: target.rect.height,
                    borderRadius: 24,
                    opacity: 0.6,
                  }
                : { opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 150, damping: 24, mass: 0.9 }}
          >
            <BotanicalMark
              variant={target.memory.botanical}
              tint={TINT[target.memory.tone].ink}
              className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 opacity-25"
            />

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              data-cursor="cta"
              aria-label="Close memory"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper/70 text-ink-soft transition-colors hover:text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <motion.div
              className="h-full overflow-y-auto px-7 py-10 sm:px-14 sm:py-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <Staggered delay={0.22}>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-wide2 text-ink/45">
                  {target.memory.longDate} · {target.memory.weekday}
                </p>
              </Staggered>

              <Staggered delay={0.3}>
                <h2
                  id="memory-reader-title"
                  className="mt-4 max-w-[22ch] font-serif text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.12] tracking-editorial text-ink"
                >
                  {target.memory.title}
                </h2>
              </Staggered>

              <div className="mt-8 max-w-prose space-y-5">
                {target.memory.story.map((p, i) => (
                  <Staggered key={i} delay={0.4 + i * 0.09}>
                    <p className="font-sans text-[16px] leading-[1.75] text-ink/75">{p}</p>
                  </Staggered>
                ))}
              </div>

              <Staggered delay={0.4 + target.memory.story.length * 0.09}>
                <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/[0.1] pt-6">
                  <Meta label="Mood">{target.memory.mood}</Meta>
                  {target.memory.people.length ? (
                    <Meta label="People">{target.memory.people.join(' · ')}</Meta>
                  ) : null}
                  <Meta label="Themes">{target.memory.tags.join(' · ')}</Meta>
                </dl>
              </Staggered>
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function Staggered({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink/40">
        {label}
      </dt>
      <dd className="mt-1.5 font-serif text-[17px] tracking-editorial text-ink">{children}</dd>
    </div>
  );
}
