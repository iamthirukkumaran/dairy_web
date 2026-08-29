'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import { hueFill, type Hue } from './palette';

/**
 * A single hand-drawn bloom. Three silhouettes keep a field from looking
 * stamped; the shape is picked from the id so it stays stable across renders.
 */
export function Flower({
  hue = 'peach',
  variant = 0,
  glowing = false,
}: {
  hue?: Hue;
  variant?: number;
  glowing?: boolean;
}) {
  const { petal, center } = hueFill[hue];
  const v = variant % 3;

  return (
    <svg viewBox="0 0 40 72" width="100%" height="100%" aria-hidden="true" focusable="false">
      {glowing ? <circle cx="20" cy="16" r="15" fill={petal} opacity="0.35" /> : null}
      <path
        d="M20 70 C20 54 19 44 20 34"
        stroke="#6F8C69"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M20 52 C13 50 10 45 10 41 C15 41 19 45 20 52 Z" fill="#8FAE88" />
      <path d="M20 44 C27 42 30 37 30 33 C25 33 21 37 20 44 Z" fill="#A9C0A2" />

      {v === 0 ? (
        <g>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="20"
              cy="9"
              rx="6"
              ry="9.5"
              fill={petal}
              transform={`rotate(${deg} 20 18)`}
            />
          ))}
          <circle cx="20" cy="18" r="4.2" fill={center} />
        </g>
      ) : null}

      {v === 1 ? (
        <g>
          <path
            d="M20 4 C27 9 29 18 26 25 C24 29 16 29 14 25 C11 18 13 9 20 4 Z"
            fill={petal}
          />
          <path d="M20 6 C22 12 22 20 20 27" stroke={center} strokeWidth="1.2" fill="none" opacity="0.6" />
        </g>
      ) : null}

      {v === 2 ? (
        <g>
          <circle cx="20" cy="17" r="9" fill={petal} />
          <circle cx="20" cy="17" r="3.4" fill={center} />
          <circle cx="13" cy="10" r="3.6" fill={petal} opacity="0.85" />
          <circle cx="28" cy="12" r="3" fill={petal} opacity="0.85" />
        </g>
      ) : null}
    </svg>
  );
}

/** Two figures holding a small distance — used for "people" in the garden. */
export function Figure({ tint = '#BE6F4C' }: { tint?: string }) {
  return (
    <svg viewBox="0 0 24 44" width="100%" height="100%" aria-hidden="true" focusable="false">
      <circle cx="12" cy="9" r="5.2" fill={tint} opacity="0.9" />
      <path d="M12 15 C6 17 4 24 5 34 L19 34 C20 24 18 17 12 15 Z" fill={tint} opacity="0.75" />
      <path d="M8 34 L7 43 M16 34 L17 43" stroke={tint} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

/** Decorative sprig for section corners and dividers. */
export function Sprig({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M60 158 C60 120 58 84 66 48 C70 30 78 16 88 6"
        stroke="#6F8C69"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {[
        [62, 128, -28],
        [63, 108, 26],
        [64, 88, -32],
        [67, 68, 30],
        [71, 50, -30],
        [77, 32, 28],
      ].map(([x, y, rot], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="19"
          ry="7.5"
          fill={i % 2 ? '#A9C0A2' : '#8FAE88'}
          opacity="0.85"
          transform={`rotate(${rot} ${x} ${y})`}
        />
      ))}
      <circle cx="88" cy="6" r="5" fill="#F2C7A9" />
    </svg>
  );
}

/**
 * A small printed botanical mark for the corner of a memory card — three
 * variants so a wall of cards does not look stamped from one plate.
 */
export function BotanicalMark({
  variant = 0,
  className,
  tint = '#6F8C69',
}: {
  variant?: number;
  className?: string;
  tint?: string;
}) {
  const v = variant % 3;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {v === 0 ? (
        <g fill="none" stroke={tint} strokeWidth="1.1" strokeLinecap="round">
          <path d="M24 44 C24 32 23 22 24 14" />
          <path d="M24 32 C17 30 13 25 13 20 C19 21 23 26 24 32 Z" fill={tint} fillOpacity="0.18" />
          <path d="M24 24 C31 22 35 17 35 12 C29 13 25 18 24 24 Z" fill={tint} fillOpacity="0.14" />
          <circle cx="24" cy="10" r="3.4" fill={tint} fillOpacity="0.25" />
        </g>
      ) : null}
      {v === 1 ? (
        <g fill="none" stroke={tint} strokeWidth="1.1" strokeLinecap="round">
          <path d="M12 44 C20 34 26 24 30 10" />
          {[36, 30, 24, 18].map((y, i) => (
            <path
              key={y}
              d={`M${26 - i * 3.4} ${y} C${20 - i * 3} ${y - 3} ${18 - i * 3} ${y - 8} ${22 - i * 3} ${y - 9}`}
            />
          ))}
          <circle cx="30" cy="9" r="2.6" fill={tint} fillOpacity="0.3" />
        </g>
      ) : null}
      {v === 2 ? (
        <g fill="none" stroke={tint} strokeWidth="1.1" strokeLinecap="round">
          <path d="M24 44 V20" />
          <ellipse cx="24" cy="14" rx="7" ry="9" fill={tint} fillOpacity="0.16" />
          <path d="M24 6 V22" opacity="0.5" />
          <path d="M24 30 C18 29 14 25 14 21" />
          <path d="M24 36 C30 35 34 31 34 27" />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * A bloom that actually grows: seed, then stem, then leaves, then flower.
 * `t` is the flower's own 0 → 1 growth value, so every plant in a field can
 * run on its own clock from one shared scroll position.
 */
export function GrowingFlower({
  t,
  hue = 'peach',
  variant = 0,
  glowing = false,
}: {
  t: MotionValue<number>;
  hue?: Hue;
  variant?: number;
  glowing?: boolean;
}) {
  const { petal, center } = hueFill[hue];
  const v = variant % 3;

  const seed = useTransform(t, [0, 0.06, 0.16], [0, 1, 0]);
  const stem = useTransform(t, [0.08, 0.52], [0, 1]);
  const leafA = useTransform(t, [0.28, 0.6], [0, 1]);
  const leafB = useTransform(t, [0.4, 0.74], [0, 1]);
  // A touch of overshoot as the head opens.
  const bloom = useTransform(t, [0.58, 0.86, 1], [0, 1.12, 1]);
  const glow = useTransform(t, [0.7, 1], [0, 0.35]);

  return (
    <svg viewBox="0 0 40 72" width="100%" height="100%" aria-hidden="true" focusable="false">
      {glowing ? (
        <motion.circle cx="20" cy="16" r="15" fill={petal} style={{ opacity: glow }} />
      ) : null}

      <motion.circle cx="20" cy="68" r="2.6" fill="#8A7355" style={{ opacity: seed }} />

      <motion.g style={{ scaleY: stem, transformOrigin: '20px 70px' }}>
        <path d="M20 70 C20 54 19 44 20 34" stroke="#6F8C69" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </motion.g>

      <motion.path
        d="M20 52 C13 50 10 45 10 41 C15 41 19 45 20 52 Z"
        fill="#8FAE88"
        style={{ scale: leafA, opacity: leafA, transformOrigin: '20px 50px' }}
      />
      <motion.path
        d="M20 44 C27 42 30 37 30 33 C25 33 21 37 20 44 Z"
        fill="#A9C0A2"
        style={{ scale: leafB, opacity: leafB, transformOrigin: '20px 43px' }}
      />

      <motion.g style={{ scale: bloom, opacity: bloom, transformOrigin: '20px 18px' }}>
        {v === 0 ? (
          <g>
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse key={deg} cx="20" cy="9" rx="6" ry="9.5" fill={petal} transform={`rotate(${deg} 20 18)`} />
            ))}
            <circle cx="20" cy="18" r="4.2" fill={center} />
          </g>
        ) : null}
        {v === 1 ? (
          <g>
            <path d="M20 4 C27 9 29 18 26 25 C24 29 16 29 14 25 C11 18 13 9 20 4 Z" fill={petal} />
            <path d="M20 6 C22 12 22 20 20 27" stroke={center} strokeWidth="1.2" fill="none" opacity="0.6" />
          </g>
        ) : null}
        {v === 2 ? (
          <g>
            <circle cx="20" cy="17" r="9" fill={petal} />
            <circle cx="20" cy="17" r="3.4" fill={center} />
            <circle cx="13" cy="10" r="3.6" fill={petal} opacity="0.85" />
            <circle cx="28" cy="12" r="3" fill={petal} opacity="0.85" />
          </g>
        ) : null}
      </motion.g>
    </svg>
  );
}
