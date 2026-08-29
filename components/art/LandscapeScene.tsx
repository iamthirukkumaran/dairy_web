'use client';

import { useId } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { cn, seeded } from '@/lib/utils';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { useIsTouch } from '@/lib/useIsTouch';

type Time = 'sunrise' | 'sunset';

const skies: Record<Time, { top: string; mid: string; low: string; glow: string; disc: string }> = {
  sunrise: { top: '#E7EDE9', mid: '#FBEEDC', low: '#F8DFC4', glow: '#F7D9A6', disc: '#FBE7BB' },
  sunset: { top: '#E4DDEC', mid: '#F6DCC7', low: '#F0C3A2', glow: '#EDB489', disc: '#F7D2A4' },
};

const hills: Record<Time, string[]> = {
  sunrise: ['#C2D3BD', '#A4BE9C', '#84A67C', '#65855F'],
  sunset: ['#BDB5CE', '#9FAF9A', '#789671', '#52704E'],
};

/**
 * The signature Aura landscape, built in five depth planes.
 *
 * Each plane takes the same pointer/scroll input multiplied by its own depth,
 * so the sky barely moves while the grass in front of you moves most — a
 * camera, not a parallax effect. Pass `depth` from `usePointerDepth()`.
 *
 * Everything is SVG: a few kilobytes, resolution-free, and swappable for
 * painted artwork without any surrounding layout change.
 */
export function LandscapeScene({
  time = 'sunrise',
  className,
  showBirds = true,
  showParticles = true,
  depth,
}: {
  time?: Time;
  className?: string;
  showBirds?: boolean;
  showParticles?: boolean;
  depth?: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const uid = useId().replace(/[:]/g, '');
  const { enabled } = useCalmMotion();
  // Phones get a lighter scene: the same picture, fewer moving parts.
  const touch = useIsTouch();
  const grassCount = touch ? 22 : 42;
  const moteCount = touch ? 8 : 18;
  const sky = skies[time];
  const layer = hills[time];

  const grasses = Array.from({ length: grassCount }, (_, i) => ({
    x: seeded(i + 5) * 1460 - 10,
    h: 26 + seeded(i + 61) * 44,
    lean: seeded(i + 131) * 16 - 8,
    delay: seeded(i + 17) * 4,
  }));

  const motes = Array.from({ length: moteCount }, (_, i) => ({
    x: seeded(i + 200) * 100,
    y: 28 + seeded(i + 311) * 52,
    r: 1.4 + seeded(i + 409) * 2.4,
    dur: 12 + seeded(i + 503) * 14,
    delay: seeded(i + 601) * 10,
  }));

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sky.top} />
            <stop offset="52%" stopColor={sky.mid} />
            <stop offset="100%" stopColor={sky.low} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sky.glow} stopOpacity="0.95" />
            <stop offset="55%" stopColor={sky.glow} stopOpacity="0.32" />
            <stop offset="100%" stopColor={sky.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`meadow-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={layer[3]} />
            <stop offset="100%" stopColor={time === 'sunrise' ? '#4F6A4B' : '#415C40'} />
          </linearGradient>
          <linearGradient id={`path-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EADCC6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F3E9DA" stopOpacity="0.95" />
          </linearGradient>
          {/* Light spilling across the scene from the sun's side */}
          <linearGradient id={`light-${uid}`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#FFF3D6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Plane 1 — sky. Barely moves. */}
        <Plane depth={0.18} pointer={depth}>
          <rect x="-80" y="-60" width="1600" height="900" fill={`url(#sky-${uid})`} />
          <circle cx="1128" cy="470" r="400" fill={`url(#glow-${uid})`} />
          <circle
            cx="1128"
            cy="470"
            r="82"
            fill={sky.disc}
            className={enabled ? 'animate-shimmer' : undefined}
          />
        </Plane>

        {/* Clouds drift on their own, independent of everything else. */}
        <Plane depth={0.3} pointer={depth}>
          <g opacity={time === 'sunrise' ? 0.75 : 0.6}>
            {[
              { y: 120, s: 1, o: 0.9, dur: 130, from: -260 },
              { y: 196, s: 0.7, o: 0.7, dur: 178, from: -520 },
              { y: 84, s: 0.5, o: 0.55, dur: 224, from: -820 },
            ].map((c, i) => (
              <motion.g
                key={i}
                initial={{ x: c.from }}
                animate={enabled ? { x: c.from + 1960 } : { x: c.from + 700 }}
                transition={
                  enabled ? { duration: c.dur, repeat: Infinity, ease: 'linear' } : { duration: 0 }
                }
                opacity={c.o}
              >
                <g transform={`scale(${c.s})`}>
                  <ellipse cx="180" cy={c.y} rx="130" ry="26" fill="#FFFCF6" />
                  <ellipse cx="252" cy={c.y - 14} rx="84" ry="24" fill="#FFFCF6" />
                  <ellipse cx="112" cy={c.y - 8} rx="66" ry="20" fill="#FFFCF6" />
                </g>
              </motion.g>
            ))}
          </g>
        </Plane>

        {/* Plane 2 — distant ridges */}
        <Plane depth={0.5} pointer={depth}>
          <path d="M-60 556 C210 500 330 534 486 528 C660 522 760 486 920 500 C1090 514 1240 556 1500 528 L1500 860 L-60 860 Z" fill={layer[0]} opacity="0.85" />
          <path d="M-60 604 C180 562 316 590 470 580 C650 568 800 538 980 556 C1140 572 1290 606 1500 584 L1500 860 L-60 860 Z" fill={layer[1]} opacity="0.9" />
        </Plane>

        {/* Plane 3 — near ridge and treeline */}
        <Plane depth={0.85} pointer={depth}>
          <path d="M-60 656 C200 620 360 648 540 640 C740 630 880 598 1060 616 C1210 630 1330 656 1500 646 L1500 860 L-60 860 Z" fill={layer[2]} />
          <g fill={layer[3]} opacity="0.92">
            {Array.from({ length: 16 }, (_, i) => {
              const x = 60 + i * 92 + seeded(i + 800) * 40;
              const h = 34 + seeded(i + 900) * 30;
              const y = 628 + seeded(i + 950) * 12;
              return (
                <g key={i}>
                  <rect x={x - 1.6} y={y - h * 0.3} width="3.2" height={h * 0.45} fill="#4F6A4B" />
                  <ellipse cx={x} cy={y - h * 0.45} rx={h * 0.42} ry={h * 0.5} />
                </g>
              );
            })}
          </g>
        </Plane>

        {/* Plane 4 — meadow and path */}
        <Plane depth={1.25} pointer={depth}>
          <path d="M-60 690 C220 660 420 686 620 678 C840 668 1020 646 1200 664 C1310 674 1380 688 1500 682 L1500 860 L-60 860 Z" fill={`url(#meadow-${uid})`} />
          <path
            d="M646 690 C628 716 590 738 520 754 C462 767 400 774 350 782 L660 782 C700 748 706 716 706 690 Z"
            fill={`url(#path-${uid})`}
            opacity="0.75"
          />
        </Plane>

        {/* Plane 5 — grass at your feet, moving most */}
        <Plane depth={1.9} pointer={depth}>
          <g
            stroke={time === 'sunrise' ? '#3E5540' : '#33492F'}
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.72"
          >
            {grasses.map((g, i) => (
              <path
                key={i}
                d={`M${g.x} 800 C${g.x + g.lean * 0.4} ${800 - g.h * 0.6} ${g.x + g.lean} ${800 - g.h * 0.9} ${g.x + g.lean * 1.3} ${800 - g.h}`}
                fill="none"
                className={enabled ? 'animate-sway' : undefined}
                style={{
                  transformOrigin: `${g.x}px 800px`,
                  animationDelay: `${g.delay}s`,
                  animationDuration: `${6 + (i % 5)}s`,
                }}
              />
            ))}
          </g>
        </Plane>

        {/* Birds cross the whole frame, above the ridges */}
        {showBirds ? (
          <g
            stroke={time === 'sunrise' ? '#6B6157' : '#4F4740'}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          >
            {[
              { y: 168, s: 1, dur: 52, delay: 0 },
              { y: 196, s: 0.8, dur: 61, delay: 8 },
              { y: 150, s: 0.65, dur: 74, delay: 17 },
            ].map((b, i) => (
              <motion.g
                key={i}
                initial={{ x: -80, y: 0 }}
                animate={enabled ? { x: 1540, y: [0, -18, 6, -10, 0] } : { x: 420 }}
                transition={
                  enabled
                    ? {
                        x: { duration: b.dur, repeat: Infinity, ease: 'linear', delay: b.delay },
                        y: { duration: b.dur / 4, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
                      }
                    : { duration: 0 }
                }
              >
                <g transform={`translate(0 ${b.y}) scale(${b.s})`}>
                  <path d="M0 0 C6 -7 12 -7 17 0" />
                  <path d="M17 0 C22 -7 28 -7 34 0" />
                  <path d="M44 10 C50 3 56 3 61 10" opacity="0.8" />
                </g>
              </motion.g>
            ))}
          </g>
        ) : null}

        {/* Sunlight wash over everything */}
        <rect width="1440" height="760" fill={`url(#light-${uid})`} />
      </svg>

      {/* Pollen and dust, kept sparse so the scene still rests */}
      {showParticles && enabled ? (
        <div className="absolute inset-0">
          {motes.map((m, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#FFF6E2]"
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                width: m.r * 2,
                height: m.r * 2,
                filter: 'blur(0.5px)',
              }}
              animate={{ y: [0, -26, 0], x: [0, 12, 0], opacity: [0, 0.85, 0] }}
              transition={{ duration: m.dur, repeat: Infinity, ease: 'easeInOut', delay: m.delay }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * One depth plane. `depth` is a multiplier: 0.2 for the sky, ~2 for the grass
 * at your feet. Without a pointer source the plane is completely static.
 */
function Plane({
  depth,
  pointer,
  children,
}: {
  depth: number;
  pointer?: { x: MotionValue<number>; y: MotionValue<number> };
  children: React.ReactNode;
}) {
  // Hooks must run unconditionally, so always build the transforms.
  const fallbackX = useTransform(() => 0);
  const fallbackY = useTransform(() => 0);
  const px = pointer?.x ?? fallbackX;
  const py = pointer?.y ?? fallbackY;
  const x = useTransform(px, (v) => v * depth * 14);
  const y = useTransform(py, (v) => v * depth * 7);

  return (
    <motion.g style={{ x, y }} className="gpu">
      {children}
    </motion.g>
  );
}
