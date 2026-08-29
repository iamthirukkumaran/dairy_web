'use client';

import { useRef, useState } from 'react';
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
import { GrowingFlower, Figure } from '@/components/art/Flower';
import { blooms, figures, gardenLabels, seasons, trees } from '@/data/garden';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { seeded } from '@/lib/utils';
import { useIsTouch } from '@/lib/useIsTouch';

/**
 * Section 5 — "Your world".
 *
 * Scroll drives a landscape from a single seed to a full garden: one memory,
 * one flower, each on its own clock. Trees fill the middle distance, a path
 * draws itself through the meadow, people arrive, and the light moves through
 * four seasons so the section communicates time rather than quantity.
 *
 * Nothing here is a chart. It is meant to read as a place.
 */
export function Garden() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 });

  return (
    <section id="world" aria-label="Your world" className="relative">
      <Container wide className="pt-24 sm:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow>Your world</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            onScroll
            lines={['Over time, Aura starts', 'to understand your world.']}
            className="mt-5 display text-[clamp(2.1rem,5vw,4rem)] text-ink"
          />
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft">
              Every day you talk becomes something that grows. The people who keep appearing. The
              places you return to. The things you are quietly working through.
            </p>
          </Reveal>
        </div>
      </Container>

      <div
        ref={ref}
        data-stage="garden"
        className={enabled ? 'relative mt-16 h-[320vh]' : 'relative mt-16'}
      >
        <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden">
          <GardenStage progress={progress} enabled={enabled} />
        </div>
      </div>
    </section>
  );
}

function GardenStage({ progress, enabled }: { progress: MotionValue<number>; enabled: boolean }) {
  const [count, setCount] = useState(enabled ? 0 : 284);
  const [season, setSeason] = useState(0);
  const touch = useIsTouch();

  const hillsY = useTransform(progress, [0, 1], enabled ? ['0%', '-7%'] : ['0%', '0%']);
  const stops = seasons.map((x) => x.at);
  const groundColor = useTransform(progress, stops, seasons.map((x) => x.ground));
  const ridgeColor = useTransform(progress, stops, ['#B9CDB2', '#A6C09E', '#CBBB92', '#C3CCC4']);
  const farColor = useTransform(progress, stops, ['#D3DFCD', '#C6D8BE', '#DFD2AE', '#D8DEDC']);
  const groundY = useTransform(progress, [0, 1], enabled ? ['0%', '5%'] : ['0%', '0%']);
  const pathOpacity = useTransform(progress, [0.14, 0.42], [0, 0.45]);

  useMotionValueEvent(progress, 'change', (v) => {
    if (!enabled) return;
    setCount(Math.round(v * 284));
    let next = 0;
    seasons.forEach((s, i) => {
      if (v >= s.at) next = i;
    });
    setSeason(next);
  });

  const pollen = Array.from({ length: touch ? 6 : 14 }, (_, i) => ({
    x: seeded(i + 71) * 100,
    y: 40 + seeded(i + 173) * 46,
    d: 14 + seeded(i + 271) * 12,
    delay: seeded(i + 373) * 12,
  }));

  return (
    <div className="relative h-full w-full">
      {/* Sky and distant ridges */}
      <motion.div style={{ y: hillsY }} className="absolute inset-0 gpu">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="garden-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF6EC" />
              <stop offset="60%" stopColor="#F6EFE2" />
              <stop offset="100%" stopColor="#EEF1E6" />
            </linearGradient>
            <radialGradient id="garden-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F8E3B4" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#F8E3B4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#F8E3B4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#garden-sky)" />
          <circle cx="1180" cy="150" r="215" fill="url(#garden-glow)" />
          <circle cx="1180" cy="150" r="54" fill="#F7E5BE" />
          <motion.path
            d="M0 246 C240 202 380 230 560 222 C760 212 900 184 1090 198 C1230 210 1350 240 1440 226 L1440 900 L0 900 Z"
            style={{ fill: farColor }}
          />
          <motion.path
            d="M0 292 C220 258 400 286 600 278 C820 268 960 242 1160 260 C1290 272 1380 294 1440 288 L1440 900 L0 900 Z"
            style={{ fill: ridgeColor }}
          />
        </svg>
      </motion.div>

      {/* Meadow floor with the path drawing itself through it */}
      <motion.div style={{ y: groundY }} className="absolute inset-x-0 bottom-0 h-[70%] gpu">
        <svg viewBox="0 0 1440 580" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="garden-shade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A2521" stopOpacity="0" />
              <stop offset="100%" stopColor="#2A2521" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 40 C260 6 460 34 700 26 C940 18 1120 -2 1440 22 L1440 580 L0 580 Z"
            style={{ fill: groundColor }}
          />
          <path d="M0 40 C260 6 460 34 700 26 C940 18 1120 -2 1440 22 L1440 580 L0 580 Z" fill="url(#garden-shade)" />
          {/* Tonal bands: light catching the rises, shade in the dips */}
          <path d="M0 96 C300 66 520 104 780 92 C1040 80 1240 58 1440 74 L1440 132 C1240 116 1040 138 780 150 C520 162 300 124 0 154 Z" fill="#FFFFFF" opacity="0.05" />
          <path d="M0 252 C280 226 540 262 800 250 C1060 238 1260 214 1440 230 L1440 300 C1260 284 1060 308 800 320 C540 332 280 296 0 322 Z" fill="#2A2521" opacity="0.04" />
          <path d="M0 430 C320 402 560 438 820 426 C1080 414 1280 392 1440 406 L1440 470 C1280 456 1080 480 820 492 C560 504 320 470 0 496 Z" fill="#FFFFFF" opacity="0.05" />
          {/* A track worn into the meadow: wide at your feet, gone by the ridge */}
          <motion.path
            d="M742 24 C716 150 604 300 436 400 C332 462 176 520 40 580 L250 580 C400 512 520 436 604 356 C688 276 744 150 772 24 Z"
            fill="#EADCC6"
            style={{ opacity: enabled ? pathOpacity : 0.45 }}
          />
        </svg>
      </motion.div>

      {/* Trees fill in the middle distance */}
      <div className="absolute inset-0">
        {trees.map((t) => (
          <Sprout
            key={t.id}
            at={t.at}
            progress={progress}
            enabled={enabled}
            x={t.x}
            y={t.y}
            width={44 * t.scale}
            height={66 * t.scale}
          >
            <svg viewBox="0 0 44 66" className="h-full w-full" aria-hidden="true">
              <rect x="20" y="34" width="4" height="30" rx="2" fill="#6B5A44" />
              <ellipse cx="22" cy="28" rx="18" ry="21" fill="#7E9C77" />
              <ellipse cx="14" cy="22" rx="10" ry="12" fill="#8FAE88" />
            </svg>
          </Sprout>
        ))}
      </div>

      {/* One memory, one flower */}
      <div className="absolute inset-0">
        {blooms.map((b) => (
          <Bloom key={b.id} bloom={b} progress={progress} enabled={enabled} />
        ))}
      </div>

      {/* Pollen, sparse enough that the scene still rests */}
      {enabled ? (
        <div className="pointer-events-none absolute inset-0">
          {pollen.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-[3px] w-[3px] rounded-full bg-[#FFF3D2]"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              animate={{ y: [0, -40, 0], x: [0, 16, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>
      ) : null}

      {/* Seasonal light, cross-faded over everything */}
      {seasons.map((s, i) => (
        <SeasonWash key={s.id} index={i} progress={progress} enabled={enabled} wash={s.wash} />
      ))}

      {/* The people who keep appearing */}
      <div className="absolute inset-0">
        {figures.map((f) => (
          <Sprout
            key={f.id}
            at={f.at}
            progress={progress}
            enabled={enabled}
            x={f.x}
            y={f.y}
            width={44}
            height={64}
          >
            <span className="flex h-full flex-col items-center">
              <span className="block h-[46px] w-[26px]">
                <Figure />
              </span>
              <span className="mt-1 whitespace-nowrap font-sans text-[10px] tracking-wide text-ink-soft/80">
                {f.name}
              </span>
            </span>
          </Sprout>
        ))}
      </div>

      {/* Themes, placed in the landscape rather than listed beside it */}
      <div className="absolute inset-0">
        {gardenLabels.map((l) => (
          <Grown key={l.id} at={l.at} progress={progress} enabled={enabled} x={l.x} y={l.y}>
            <span className="whitespace-nowrap rounded-pill border border-ink/[0.07] bg-paper/75 px-3 py-1 font-sans text-[11px] tracking-wide text-ink-soft backdrop-blur-sm">
              {l.label}
            </span>
          </Grown>
        ))}
      </div>

      {/* Quiet counter — not a metric tile */}
      <div className="pointer-events-none absolute inset-x-0 top-24 sm:top-28">
        <Container wide>
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-xs">
              <p className="font-serif text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-editorial text-ink tabular-nums">
                {count}
              </p>
              <p className="mt-2 font-sans text-[13px] text-ink-soft">
                days remembered — and everything they left behind
              </p>
            </div>
            <motion.p
              key={seasons[season].id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mt-3"
            >
              {seasons[season].label}
            </motion.p>
          </div>
        </Container>
      </div>
    </div>
  );
}

function SeasonWash({
  index,
  progress,
  enabled,
  wash,
}: {
  index: number;
  progress: MotionValue<number>;
  enabled: boolean;
  wash: string;
}) {
  const prev = seasons[index - 1]?.at ?? -0.1;
  const here = seasons[index].at;
  const next = seasons[index + 1]?.at ?? 1.2;
  const opacity = useTransform(progress, [prev, here, next], index === 0 ? [1, 1, 0] : [0, 1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{ backgroundColor: wash, opacity: enabled ? opacity : index === 0 ? 1 : 0 }}
    />
  );
}

function Bloom({
  bloom,
  progress,
  enabled,
}: {
  bloom: (typeof blooms)[number];
  progress: MotionValue<number>;
  enabled: boolean;
}) {
  // Each plant gets its own growth clock, mapped out of the shared scroll.
  const span = 0.1 + (bloom.id % 5) * 0.012;
  const t = useTransform(progress, [bloom.at, Math.min(1, bloom.at + span)], [0, 1], {
    clamp: true,
  });
  const still = useTransform(() => 1);
  const size = 26 + bloom.scale * 30;

  return (
    <div
      className="absolute origin-bottom"
      style={{
        left: `${bloom.x}%`,
        top: `${bloom.y}%`,
        width: size,
        height: size * 1.8,
        transform: 'translate(-50%,-100%)',
      }}
      aria-hidden="true"
    >
      <GrowingFlower
        t={enabled ? t : still}
        hue={bloom.hue}
        variant={bloom.id}
        glowing={bloom.glowing}
      />
    </div>
  );
}

/**
 * Something that grows out of the ground at `at`: it scales from its own base,
 * not from the middle of the stage, so it does not slide as it appears.
 */
function Sprout({
  at,
  progress,
  enabled,
  x,
  y,
  width,
  height,
  children,
}: {
  at: number;
  progress: MotionValue<number>;
  enabled: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [at, at + 0.045], [0, 1]);
  const scale = useTransform(progress, [at, at + 0.08], [0.5, 1]);

  return (
    <motion.div
      className="absolute gpu"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width,
        height,
        translateX: '-50%',
        translateY: '-100%',
        transformOrigin: 'bottom center',
        opacity: enabled ? opacity : 1,
        scale: enabled ? scale : 1,
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}

/** A label that settles into place at `at`. */
function Grown({
  at,
  progress,
  enabled,
  x,
  y,
  children,
}: {
  at: number;
  progress: MotionValue<number>;
  enabled: boolean;
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [at, at + 0.05], [0, 1]);
  const y0 = useTransform(progress, [at, at + 0.05], [10, 0]);

  return (
    <motion.div
      className="absolute gpu"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        translateX: '-50%',
        opacity: enabled ? opacity : 1,
        y: enabled ? y0 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
