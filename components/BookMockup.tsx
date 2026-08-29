'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { spreads } from '@/data/book';
import type { Cover } from '@/data/book';
import { BookPage } from '@/components/BookPages';
import { cn } from '@/lib/utils';

/**
 * A book you could pick up.
 *
 * `progress` (0 → 1) runs the whole performance:
 *   0.00 – 0.14  the camera approaches; the book turns to face you
 *   0.14 – 0.30  the front board swings open
 *   0.30 – 0.86  leaves turn, each one bending as it goes over
 *   0.88 – 1.00  the book closes again
 *
 * Every leaf carries its own bend, gutter shading and drop shadow, and the
 * shadow on the ground leans as the book turns — the difference between an
 * object and a rotating rectangle.
 */
const OPEN_START = 0.14;
const OPEN_END = 0.3;
const TURN_START = 0.32;
const TURN_END = 0.86;
const CLOSE_START = 0.88;

export function BookMockup({
  progress,
  enabled,
  cover,
  className,
}: {
  progress: MotionValue<number>;
  enabled: boolean;
  cover: Cover;
  className?: string;
}) {
  const stage = useRef<HTMLDivElement>(null);

  // Cursor tilt — a garnish on top of the scroll rotation, never the driver.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sx = useSpring(tiltX, { stiffness: 80, damping: 20 });
  const sy = useSpring(tiltY, { stiffness: 80, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Book-level orientation and the camera's approach.
  const baseRotateY = useTransform(
    progress,
    [0, OPEN_START, OPEN_END, CLOSE_START, 1],
    enabled ? [-38, -10, 6, 6, -30] : [6, 6, 6, 6, 6],
  );
  const rotateY = useTransform([baseRotateY, sy], ([b, t]) => (b as number) + (t as number));
  const rotateX = useTransform([sx], ([t]) => 9 + (t as number));
  const scale = useTransform(progress, [0, OPEN_START, 0.9, 1], enabled ? [0.78, 1, 1, 0.86] : [1, 1, 1, 1]);
  // The spine sits on the node's left edge, so an open spread reaches a full
  // page-width further left. Shift right by half a page to re-centre it.
  const shiftX = useTransform(progress, [OPEN_START, OPEN_END, CLOSE_START, 1], ['0%', '50%', '50%', '0%']);

  const coverRotate = useTransform(progress, [OPEN_START, OPEN_END], enabled ? [0, -176] : [-176, -176]);
  const gutterOpacity = useTransform(progress, [OPEN_START, OPEN_END, CLOSE_START, 1], [0, 1, 1, 0]);
  // Closed, the board is on top of everything; open, it is the surface the
  // turned pages lie on.
  const coverZ = useTransform(progress, [OPEN_START, OPEN_END, CLOSE_START, 1], [60, 2, 2, 60]);
  const leftPageOpacity = useTransform(progress, [OPEN_END, OPEN_END + 0.02, CLOSE_START, 1], [0, 1, 1, 0]);

  // The ground shadow answers the book: it leans, stretches and softens.
  const shadowX = useTransform(baseRotateY, (r) => `${-r * 0.9}px`);
  const shadowScale = useTransform(progress, [0, OPEN_START, OPEN_END], [0.72, 1, 1.55]);
  const shadowOpacity = useTransform(progress, [0, OPEN_START, 0.9, 1], [0.1, 0.24, 0.24, 0.12]);
  const shadowBlur = useTransform(baseRotateY, (r) => `blur(${18 + Math.abs(r) * 0.35}px)`);

  const leafCount = spreads.length - 1;
  const slice = (TURN_END - TURN_START) / leafCount;

  /**
   * Depth-sorting a rotated board against rotated sheets is unreliable across
   * browsers, so the left-hand side is a real page surface rather than a pile
   * of landed leaves. It shows whichever spread has finished turning, and a
   * leaf's own back face hands over to it exactly as the turn completes.
   */
  const [landed, setLanded] = useState(-1);
  useMotionValueEvent(progress, 'change', (v) => {
    let n = -1;
    for (let i = 0; i < leafCount; i += 1) {
      if (v >= TURN_START + i * slice + slice * 0.6) n = i;
    }
    setLanded(n);
  });

  return (
    <div
      ref={stage}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="book"
      className={cn('relative flex items-center justify-center', className)}
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="preserve-3d relative gpu"
        style={{
          rotateY,
          rotateX,
          scale,
          x: shiftX,
          width: 'min(44vw, 392px)',
          aspectRatio: '3 / 4',
        }}
      >
        {/* Back board */}
        <div className="absolute inset-0 rounded-l-[3px] rounded-r-[6px]" style={{ backgroundColor: cover.cloth }}>
          <Cloth />
        </div>

        {/* The paper block: real thickness, visible fore-edge */}
        <div className="absolute inset-y-[1.5%] left-[1%] right-[1.6%] rounded-r-[2px] bg-[#F4ECDC]" />
        <div
          aria-hidden="true"
          className="absolute inset-y-[1.8%] right-[0.6%] w-[9px] rounded-r-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right,#F6EEDC 0px,#F6EEDC 1px,#D8CBB2 1px,#D8CBB2 2px)',
            boxShadow: 'inset -3px 0 5px rgba(42,37,33,0.22)',
          }}
        />

        {/* Static right-hand page — the last spread waits underneath */}
        <div className="absolute inset-y-[2%] left-[2%] right-[2.5%] overflow-hidden rounded-r-[3px]">
          <BookPage spread={spreads[spreads.length - 1]} side="right" />
        </div>

        {/* The left-hand page: whatever has been turned onto the board */}
        <motion.div
          className="absolute inset-y-[2%] overflow-hidden rounded-l-[3px]"
          style={{
            left: '-97.5%',
            width: '95.5%',
            z: 6,
            opacity: landed >= 0 ? leftPageOpacity : 0,
          }}
        >
          {landed >= 0 ? <BookPage spread={spreads[landed]} side="left" /> : null}
        </motion.div>

        {/* Turning leaves, last one at the bottom of the stack */}
        {spreads.slice(0, leafCount).map((spread, i) => {
          const from = TURN_START + i * slice;
          // 60% turning, 40% resting: a page you can actually read.
          const to = from + slice * 0.6;
          return (
            <Leaf
              key={spread.id}
              index={i}
              total={leafCount}
              progress={progress}
              enabled={enabled}
              from={from}
              to={to}
              front={spread}
              back={spreads[i]}
            />
          );
        })}

        {/* Front board */}
        <motion.div
          className="preserve-3d absolute inset-0 origin-left"
          style={{ rotateY: coverRotate, z: coverZ }}
        >
          <FrontCover cover={cover} />
          <BackOfCover cover={cover} />
        </motion.div>

        {/* The gutter — the crease the two halves fall into */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[26%]"
          style={{
            z: 90,
            translateX: '-50%',
            opacity: gutterOpacity,
            background:
              'linear-gradient(to right, rgba(42,37,33,0) 0%, rgba(42,37,33,0.22) 42%, rgba(42,37,33,0.3) 50%, rgba(42,37,33,0.22) 58%, rgba(42,37,33,0) 100%)',
          }}
        />

        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 -left-[11px] w-[13px] rounded-l-[4px]"
          style={{
            transform: 'rotateY(-88deg)',
            transformOrigin: 'right center',
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.35), ${cover.cloth})`,
          }}
        />
      </motion.div>

      {/* Ground shadow, answering the book above it */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-9 w-[42%] rounded-[50%] bg-ink"
        style={{
          x: shadowX,
          translateX: '-50%',
          scaleX: shadowScale,
          opacity: shadowOpacity,
          filter: shadowBlur,
        }}
      />
    </div>
  );
}

function Leaf({
  index,
  total,
  progress,
  enabled,
  from,
  to,
  front,
  back,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  enabled: boolean;
  from: number;
  to: number;
  front: (typeof spreads)[number];
  back: (typeof spreads)[number];
}) {
  const mid = (from + to) / 2;
  const rotateY = useTransform(progress, [from, to], enabled ? [0, -176] : [-176, -176]);
  // Depth has to travel too: a sheet leaves the right-hand stack, lifts over
  // the spine, and lands on top of the sheets already turned. Without this the
  // pages z-fight and two spreads show through each other.
  const rightZ = (total - index) * 5;
  const leftZ = -(4 + index);
  const z = useTransform(progress, [from, mid, to], [rightZ, 40, leftZ]);
  // The sheet bends most when it is standing upright, then flattens again.
  const bend = useTransform(progress, [from, mid, to], enabled ? [0, -13, 0] : [0, 0, 0]);
  // A lifting sheet throws a shadow onto the page beneath it.
  const castShadow = useTransform(progress, [from, mid, to], [0, 0.32, 0]);
  const liftShadow = useTransform(
    castShadow,
    (v) => `${8 + v * 40}px 0 ${20 + v * 30}px -12px rgba(42,37,33,${0.22 + v})`,
  );
  const backBend = useTransform(bend, (v) => 180 - v * 0.7);

  return (
    <motion.div
      className="preserve-3d absolute inset-y-[2%] left-[2%] right-[2.5%] origin-left"
      style={{ rotateY, z }}
    >
      {/* Front of the sheet */}
      <motion.div
        className="backface-hidden absolute inset-0 origin-left overflow-hidden rounded-r-[3px]"
        style={{ rotateY: bend, boxShadow: liftShadow }}
      >
        <BookPage spread={front} side="right" />
        {/* Curvature: the sheet catches light towards its free edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(42,37,33,0.10) 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0.28) 78%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      </motion.div>

      {/* Back of the sheet, bending a touch behind the front */}
      <motion.div
        className="backface-hidden absolute inset-0 origin-left overflow-hidden rounded-l-[3px]"
        style={{ rotateY: backBend }}
      >
        <BookPage spread={back} side="left" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, rgba(42,37,33,0.10) 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0.22) 80%, rgba(255,255,255,0.04) 100%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/** Woven cloth, pressed into the board rather than printed on it. */
function Cloth() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.17] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 3px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-l-[3px] rounded-r-[6px]"
        style={{
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 6px rgba(0,0,0,0.28), inset 8px 0 12px -8px rgba(0,0,0,0.4)',
        }}
      />
    </>
  );
}

function FrontCover({ cover }: { cover: Cover }) {
  return (
    <div
      className="backface-hidden absolute inset-0 overflow-hidden rounded-l-[3px] rounded-r-[6px] shadow-[0_30px_60px_-30px_rgba(42,37,33,0.7)]"
      style={{ backgroundColor: cover.cloth }}
    >
      <Cloth />

      {/* Blind-embossed rule, then the foil on top of it */}
      <div
        aria-hidden="true"
        className="absolute inset-[5%] rounded-[2px]"
        style={{
          border: `1px solid ${cover.foil}45`,
          boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.12)',
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-[12%] text-center">
        <svg viewBox="0 0 60 70" className="h-[15%] w-auto" aria-hidden="true">
          <path d="M30 66 C30 48 29 34 30 22" stroke={cover.foil} strokeWidth="1.4" fill="none" opacity="0.85" />
          <ellipse cx="20" cy="42" rx="12" ry="4.4" fill={cover.foil} opacity="0.6" transform="rotate(-22 20 42)" />
          <ellipse cx="40" cy="32" rx="12" ry="4.4" fill={cover.foil} opacity="0.6" transform="rotate(22 40 32)" />
          <circle cx="30" cy="14" r="6" fill={cover.foil} opacity="0.85" />
        </svg>

        <p
          className="mt-[8%] font-serif text-[clamp(15px,3.4vw,26px)] leading-[1.1] tracking-[0.08em]"
          style={{
            color: cover.foil,
            textShadow: '0 1px 0 rgba(0,0,0,0.35), 0 -1px 0 rgba(255,255,255,0.14)',
          }}
        >
          {cover.title}
        </p>
        <div className="my-[6%] h-px w-[34%]" style={{ backgroundColor: `${cover.foil}80` }} />
        <p
          className="font-sans text-[clamp(7px,1.3vw,10px)] uppercase tracking-wide2"
          style={{ color: `${cover.foil}bb` }}
        >
          {cover.subtitle}
        </p>
      </div>
    </div>
  );
}

function BackOfCover({ cover }: { cover: Cover }) {
  return (
    <div
      className="backface-hidden absolute inset-0 overflow-hidden rounded-l-[6px] rounded-r-[3px]"
      style={{ transform: 'rotateY(180deg)', backgroundColor: cover.cloth }}
    >
      <Cloth />

      {/*
       * This face is mirrored, so its right edge is the world's left: the
       * board's overhang and the fore-edge of the turned pages both live there.
       */}
      <div className="absolute inset-y-[2%] left-0 right-[2.5%] bg-[#EFE4D0] shadow-[inset_0_0_14px_rgba(42,37,33,0.14)]">
        <svg
          viewBox="0 0 200 260"
          className="h-full w-full opacity-45"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="200" height="260" fill="#EFE4D0" />
          {Array.from({ length: 88 }, (_, i) => {
            const col = i % 11;
            const row = Math.floor(i / 11);
            const x = col * 19 + 8 + (row % 2) * 9;
            const y = row * 33 + 16;
            return (
              <g key={i} stroke="#A9885F" strokeWidth="0.5" fill="none" opacity="0.6">
                <path d={`M${x} ${y + 15} C${x} ${y + 7} ${x - 0.6} ${y + 4} ${x} ${y}`} />
                <ellipse cx={x - 4} cy={y + 8} rx="4" ry="1.5" transform={`rotate(-24 ${x - 4} ${y + 8})`} />
                <ellipse cx={x + 4} cy={y + 4.5} rx="4" ry="1.5" transform={`rotate(24 ${x + 4} ${y + 4.5})`} />
                <circle cx={x} cy={y - 2} r="1.8" fill="#C9A87C" stroke="none" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Fore-edge of everything already turned onto this side */}
      <div
        aria-hidden="true"
        className="absolute inset-y-[2.4%] right-[1.4%] w-[8px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right,#F6EEDC 0px,#F6EEDC 1px,#D8CBB2 1px,#D8CBB2 2px)',
          boxShadow: 'inset 3px 0 5px rgba(42,37,33,0.2)',
        }}
      />

      {/* Shading into the gutter, which on this face is the left edge */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[18%]"
        style={{ background: 'linear-gradient(to right, rgba(42,37,33,0.22), transparent)' }}
      />
    </div>
  );
}
