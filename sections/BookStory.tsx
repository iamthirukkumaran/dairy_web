'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/animations/Reveal';
import { LineReveal } from '@/animations/TextReveal';
import dynamic from 'next/dynamic';
import { BookMockup } from '@/components/BookMockup';
import { useQuality } from '@/animations/useQuality';
import { DeliveryScene } from '@/components/DeliveryScene';
import { covers } from '@/data/book';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { sound } from '@/lib/sound';
import { cn } from '@/lib/utils';

/**
 * The WebGL book is loaded only when the device has earned it, and never on
 * the server — `three` stays out of the main bundle entirely.
 */
const Book3D = dynamic(() => import('@/components/webgl/Book3D').then((m) => m.Book3D), {
  ssr: false,
});

/** Captions keyed to where the book is in its performance. */
const BEATS = [
  { at: 0.0, label: 'Closed', line: 'Cloth-bound, foil-stamped, and heavier than you expect.' },
  { at: 0.18, label: 'Opening', line: 'Endpapers printed with the garden your year grew.' },
  { at: 0.3, label: 'Chapter', line: 'Every month opens its own chapter.' },
  { at: 0.39, label: 'Diary entry', line: 'Your words, typeset — not screenshotted.' },
  { at: 0.5, label: 'Photograph', line: 'The days you photographed, printed beside what you said.' },
  { at: 0.61, label: 'Reflection', line: 'The lines worth setting on their own page.' },
  { at: 0.72, label: 'Year summary', line: 'Everything the year was made of, in one spread.' },
  { at: 0.82, label: 'The last page', line: 'Printed inside: your year. Preserved.' },
  { at: 0.9, label: 'Closed again', line: 'Yours to keep on a shelf, not in an app.' },
];

export function BookStory() {
  const { enabled } = useCalmMotion();
  const quality = useQuality();
  const [coverIndex, setCoverIndex] = useState(0);
  const cover = covers[coverIndex];

  const bookRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bookRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const [beat, setBeat] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    let next = 0;
    for (let i = 0; i < BEATS.length; i += 1) if (v >= BEATS[i].at) next = i;
    if (next !== beat) sound.play('page');
    setBeat(next);
  });

  const deliveryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: deliveryRaw } = useScroll({
    target: deliveryRef,
    offset: ['start start', 'end end'],
  });
  const delivery = useSpring(deliveryRaw, { stiffness: 90, damping: 30, mass: 0.4 });

  return (
    <section id="book" aria-label="Your year becomes a book" className="relative bg-[#F0EAE0]/70">
      <Container wide className="pt-24 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Your year becomes a book</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              onScroll
              lines={['Some memories deserve', 'more than a screen.']}
              className="mt-5 display text-[clamp(2.1rem,5.2vw,4.25rem)] text-ink"
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft lg:pb-2">
              Your year, printed beautifully — a book you can hold, keep, and give.
            </p>
          </Reveal>
        </div>

        {/* Choose the cover before you watch it open */}
        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-end gap-4 sm:gap-6">
            {covers.map((c, i) => (
              <CoverSwatch
                key={c.id}
                cover={c}
                active={i === coverIndex}
                enabled={enabled}
                onSelect={() => {
                  sound.play('tap');
                  setCoverIndex(i);
                }}
              />
            ))}
          </div>
        </Reveal>
      </Container>

      {/* The book itself */}
      <div
        ref={bookRef}
        data-stage="book"
        className={enabled ? 'relative mt-14 h-[380vh]' : 'relative mt-14'}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          {quality === 'off' ? (
            <BookMockup progress={progress} enabled={enabled} cover={cover} className="h-[60vh] w-full" />
          ) : (
            <Book3D progress={progress} cover={cover} quality={quality} className="h-[62vh] w-full" />
          )}

          <Container wide className="mt-8">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
              <motion.p
                key={BEATS[beat].label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow"
              >
                {BEATS[beat].label}
              </motion.p>
              <motion.p
                key={`${BEATS[beat].label}-line`}
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[19px] leading-snug tracking-editorial text-ink sm:text-[23px]"
              >
                {BEATS[beat].line}
              </motion.p>

              {/* A table of contents, not a scrollbar */}
              <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                {BEATS.map((b, i) => (
                  <span
                    key={b.label}
                    className={cn(
                      'h-[3px] rounded-full transition-all duration-500 ease-calm',
                      i === beat ? 'w-6 bg-clay' : 'w-2.5 bg-ink/15',
                    )}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container wide className="pt-10 text-center">
        <LineReveal
          as="p"
          onScroll
          lines={['Your year.', 'Preserved.']}
          className="display mx-auto max-w-2xl text-[clamp(2.2rem,5.4vw,3.8rem)] text-ink"
        />
      </Container>

      {/* …and then it comes to your door */}
      <div
        ref={deliveryRef}
        data-stage="delivery"
        className={enabled ? 'relative mt-16 h-[200vh]' : 'relative mt-16 h-[80vh]'}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <DeliveryScene progress={delivery} enabled={enabled} cover={cover} />
        </div>
      </div>

      <Container wide className="pb-28 pt-4 text-center sm:pb-32">
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="#create-book" size="lg" arrow>
              Create my book
            </Button>
            <Button href="#editions" size="lg" variant="secondary">
              See the editions
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md font-sans text-[13px] text-ink-faint">
            Preview is free, and nothing prints until you say so.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function CoverSwatch({
  cover,
  active,
  enabled,
  onSelect,
}: {
  cover: (typeof covers)[number];
  active: boolean;
  enabled: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      data-cursor="book"
      className="group relative text-left"
      whileHover={enabled ? { y: -6, rotateY: -8, rotateX: 3 } : undefined}
      whileTap={enabled ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ perspective: 700 }}
    >
      <div
        className={cn(
          'relative h-[92px] w-[70px] overflow-hidden rounded-[3px] shadow-soft transition-shadow duration-500 group-hover:shadow-lift sm:h-[112px] sm:w-[84px]',
          active ? 'ring-2 ring-ink/70 ring-offset-2 ring-offset-[#F0EAE0]' : '',
        )}
        style={{ backgroundColor: cover.cloth }}
      >
        <span className="absolute inset-y-0 left-0 w-[5px] bg-black/25" />
        <span
          className="absolute inset-0 flex items-center justify-center px-2 text-center font-serif text-[8px] leading-tight tracking-[0.08em] sm:text-[9px]"
          style={{ color: cover.foil }}
        >
          {cover.title}
        </span>
      </div>
      <span
        className={cn(
          'mt-2.5 block font-sans text-[11px] transition-colors duration-300',
          active ? 'text-ink' : 'text-ink-faint group-hover:text-ink-soft',
        )}
      >
        {cover.label}
      </span>
    </motion.button>
  );
}
