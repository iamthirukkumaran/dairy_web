'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { LineReveal } from '@/animations/TextReveal';
import { yearChapters, yearCounters, yearThemes } from '@/data/year';
import { site } from '@/data/site';
import { toneSurface } from '@/components/art/palette';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { cn } from '@/lib/utils';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Section 7 — the garden becomes a story.
 *
 * Three movements: the year announces itself, four numbers arrive one at a
 * time with pauses between them, then seven chapters run past like a photo
 * book. No charts, no percentages — the recap is made of the same memories
 * the rest of the page is made of.
 */
export function YearInReview() {
  return (
    <section id="year" aria-label="Your year" className="relative overflow-hidden">
      <YearTitle />
      <Counters />
      <Chapters />
      <Themes />
    </section>
  );
}

/* ------------------------------------------------------------------ title */

function YearTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], enabled ? [0.86, 1, 1.1] : [1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], enabled ? [50, -50] : [0, 0]);

  return (
    <div ref={ref} className="relative py-28 text-center sm:py-36">
      <Container>
        <Reveal>
          <Eyebrow className="text-center">One year later…</Eyebrow>
        </Reveal>
        <motion.p
          style={{ scale, y }}
          className="gpu mt-6 select-none font-serif text-[clamp(6rem,26vw,20rem)] leading-[0.82] tracking-[-0.03em] text-ink/[0.09]"
          aria-hidden="true"
        >
          {site.year}
        </motion.p>
        <LineReveal
          as="h2"
          onScroll
          lines={['Your year,', 'in your words.']}
          className="-mt-[0.28em] display text-[clamp(2.4rem,6.4vw,5rem)] text-ink"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft">
            Not a slideshow of statistics. A quiet reading of what actually happened, written from
            the things you said out loud.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}

/* --------------------------------------------------------------- counters */

function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  if (!enabled) {
    return (
      <Container wide className="pb-24">
        <ul className="grid gap-px overflow-hidden rounded-card border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {yearCounters.map((c) => (
            <li key={c.label} className="bg-paper p-8">
              <p className="font-serif text-[3rem] leading-none tracking-editorial text-ink tabular-nums">
                {c.value}
              </p>
              <p className="mt-3 font-sans text-[13px] uppercase tracking-wide2 text-ink">{c.label}</p>
              <p className="mt-2 font-sans text-[14px] text-ink-soft">{c.line}</p>
            </li>
          ))}
        </ul>
      </Container>
    );
  }

  return (
    <div ref={ref} data-stage="counters" className="relative h-[200vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <Container>
          <div className="relative h-[56vh] max-h-[560px] text-center">
            {yearCounters.map((c, i) => (
              <Counter key={c.label} counter={c} index={i} progress={progress} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

function Counter({
  counter,
  index,
  progress,
}: {
  counter: (typeof yearCounters)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / yearCounters.length;
  const start = index * slice;
  const end = start + slice;
  // Arrive, hold for most of the slice, then leave.
  const opacity = useTransform(
    progress,
    [start, start + slice * 0.16, end - slice * 0.18, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [46, -46]);
  const blur = useTransform(
    progress,
    [start, start + slice * 0.16, end - slice * 0.18, end],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
  );
  const raw = useTransform(progress, [start, start + slice * 0.42], [0, counter.value]);
  const [value, setValue] = useState(0);
  useMotionValueEvent(raw, 'change', (v) => setValue(Math.max(0, Math.round(v))));

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gpu"
      style={{ opacity, y, filter: blur }}
      aria-hidden={index > 0}
    >
      <p className="font-serif text-[clamp(4.5rem,17vw,13rem)] leading-[0.85] tracking-[-0.03em] text-ink tabular-nums">
        {value}
      </p>
      <p className="mt-6 font-serif text-[clamp(1.6rem,4vw,2.6rem)] tracking-editorial text-ink-soft">
        {counter.label}
      </p>
      <p className="mx-auto mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-ink-faint">
        {counter.line}
      </p>
    </motion.div>
  );
}

/* --------------------------------------------------------------- chapters */

function Chapters() {
  const ref = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const { enabled } = useCalmMotion();
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const x = useTransform(progress, [0, 1], [0, -distance]);

  // Measure how far the strip has to travel, and keep it right on resize.
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const el = strip.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (strip.current) ro.observe(strip.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <Container wide className="pb-24">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {yearChapters.map((c) => (
            <li key={c.n}>
              <ChapterCard chapter={c} />
            </li>
          ))}
        </ul>
        <p className="mt-14 text-center font-serif text-[clamp(2rem,5vw,3.4rem)] tracking-editorial text-ink">
          This was your year.
        </p>
      </Container>
    );
  }

  return (
    <div ref={ref} data-stage="chapters" className="relative h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[14vh] z-10">
          <Container wide>
            <Eyebrow>The year, in seven chapters</Eyebrow>
          </Container>
        </div>

        <motion.div ref={strip} style={{ x }} className="flex items-center gap-6 px-[6vw] gpu sm:gap-10">
          {yearChapters.map((c) => (
            <div
              key={c.n}
              className="w-[84vw] shrink-0 sm:w-[62vw] lg:w-[42vw] xl:w-[34vw]"
            >
              <ChapterCard chapter={c} />
            </div>
          ))}

          <div className="flex w-[84vw] shrink-0 items-center justify-center sm:w-[62vw] lg:w-[42vw]">
            <p className="text-center font-serif text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.06] tracking-editorial text-ink">
              This was
              <br />
              your year.
            </p>
          </div>
        </motion.div>

        {/* Where you are in the reel */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[10vh]">
          <Container wide>
            <div className="h-px w-full bg-ink/[0.08]">
              <motion.div className="h-px origin-left bg-clay/60" style={{ scaleX: progress }} />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

function ChapterCard({ chapter }: { chapter: (typeof yearChapters)[number] }) {
  return (
    <article
      className={cn(
        'flex h-[58vh] max-h-[560px] flex-col rounded-card border p-8 shadow-soft sm:p-10',
        toneSurface[chapter.tone],
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-serif text-[clamp(2.4rem,5vw,3.4rem)] leading-none tracking-editorial text-ink/25 tabular-nums">
          {chapter.n}
        </span>
        <span className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink/40">
          {chapter.date}
        </span>
      </div>

      <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-wide2 text-ink/45">
        {chapter.kicker}
      </p>
      <h3 className="mt-3 font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.14] tracking-editorial text-ink">
        {chapter.title}
      </h3>
      <p className="mt-4 font-sans text-[14.5px] leading-[1.7] text-ink-soft">{chapter.body}</p>

      <blockquote className="mt-auto border-t border-ink/[0.12] pt-5 font-serif text-[15px] italic leading-snug text-ink/65">
        {chapter.quote}
      </blockquote>
    </article>
  );
}

/* ----------------------------------------------------------------- themes */

function Themes() {
  const { enabled } = useCalmMotion();
  return (
    <Container wide className="py-24 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
        <Reveal>
          <h3 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] text-ink">
            Themes that shaped your year.
          </h3>
          <p className="mt-5 max-w-prose font-sans text-[16px] leading-relaxed text-ink-soft">
            The threads Aura kept noticing — named the way you named them, not sorted into
            categories somebody else invented.
          </p>
        </Reveal>

        <ul className="flex flex-col">
          {yearThemes.map((t, i) => (
            <ThemeRow key={t.name} theme={t} index={i} enabled={enabled} />
          ))}
        </ul>
      </div>
    </Container>
  );
}

function ThemeRow({
  theme,
  index,
  enabled,
}: {
  theme: (typeof yearThemes)[number];
  index: number;
  enabled: boolean;
}) {
  return (
    <li className="border-b border-ink/[0.1] py-6 first:border-t">
      <div className="flex items-baseline justify-between gap-6">
        <span className="font-serif text-[clamp(1.4rem,3vw,2rem)] tracking-editorial text-ink">
          {theme.name}
        </span>
        <span className="shrink-0 font-sans text-[12px] text-ink-faint">{theme.months}</span>
      </div>
      {/* A rule whose length is the weight — proportion, not a chart */}
      <div className="mt-3 h-px w-full bg-ink/[0.07]">
        <motion.div
          className="h-px origin-left bg-clay/60"
          initial={enabled ? { scaleX: 0 } : false}
          whileInView={{ scaleX: theme.weight }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </li>
  );
}
