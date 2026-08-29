'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import type { Cover } from '@/data/book';

/**
 * The last thing that happens to a year: it is boxed, labelled, carried, and
 * left on a doorstep. Composed as one SVG so every element stays in the same
 * scene at every viewport — the parcel really does land on the step.
 *
 * Deliberately quiet. This is the moment the product stops being software,
 * not a checkout confirmation.
 */
export function DeliveryScene({
  progress,
  enabled,
  cover,
}: {
  progress: MotionValue<number>;
  enabled: boolean;
  cover: Cover;
}) {
  /** Under reduced motion the scene simply renders its final frame. */
  const at = <T,>(mv: MotionValue<T>, final: T) => (enabled ? mv : final);

  // 1 — the book lowers into the box
  const bookY = useTransform(progress, [0, 0.2], [-96, 6]);
  const bookOpacity = useTransform(progress, [0.15, 0.24], [1, 0]);

  // 2 — flaps fold over, label lands
  const flapScale = useTransform(progress, [0.2, 0.32], [1, 0.04]);
  const labelOpacity = useTransform(progress, [0.33, 0.42], [0, 1]);
  const labelScale = useTransform(progress, [0.33, 0.44], [1.6, 1]);

  // 3 — the parcel travels to the door
  const parcelX = useTransform(progress, [0.46, 0.74], [0, 444]);
  const parcelY = useTransform(progress, [0.46, 0.62, 0.74], [0, -40, 74]);
  const routeLen = useTransform(progress, [0.46, 0.74], [0, 1]);

  // 4 — the doorstep, then the line
  const doorOpacity = useTransform(progress, [0.5, 0.72], [0, 1]);
  const lineOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <svg
        viewBox="0 0 900 560"
        className="h-[58vh] max-h-[560px] w-full"
        role="img"
        aria-label="A finished book packed into a parcel and delivered to a doorstep"
      >
        {/* Doorstep */}
        <motion.g style={{ opacity: at(doorOpacity, 1) }}>
          <rect x="546" y="54" width="286" height="392" rx="6" fill="#E6DBC7" />
          <rect x="562" y="70" width="254" height="360" rx="4" fill="#C9855F" />
          <rect x="582" y="94" width="100" height="132" rx="3" fill="#B87850" />
          <rect x="698" y="94" width="100" height="132" rx="3" fill="#B87850" />
          <rect x="582" y="250" width="216" height="158" rx="3" fill="#B87850" />
          <circle cx="790" cy="256" r="7" fill="#E5C98C" />
          {/* Step and mat */}
          <rect x="510" y="446" width="358" height="20" rx="3" fill="#DACEB9" />
          <rect x="530" y="466" width="318" height="30" rx="4" fill="#C3B79F" />
          <rect x="612" y="452" width="152" height="13" rx="3" fill="#A9C0A2" opacity="0.75" />
          {/* A plant by the door, because of course there is one */}
          <g transform="translate(846 372)">
            <path d="M6 62 h40 l-7 34 h-26 z" fill="#C08B62" />
            <path d="M26 62 C26 42 25 30 26 20" stroke="#6F8C69" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="14" cy="40" rx="13" ry="5" fill="#8FAE88" transform="rotate(-26 14 40)" />
            <ellipse cx="38" cy="31" rx="13" ry="5" fill="#A9C0A2" transform="rotate(26 38 31)" />
            <circle cx="26" cy="16" r="6" fill="#F2C7A9" />
          </g>
        </motion.g>

        {/* The route the parcel takes */}
        <motion.path
          d="M232 268 C340 206 520 226 664 340"
          fill="none"
          stroke="#BE6F4C"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          strokeOpacity="0.32"
          style={{ pathLength: at(routeLen, 1) }}
        />

        {/* Book → parcel */}
        <motion.g style={{ x: at(parcelX, 444), y: at(parcelY, 74) }}>
          {/* The book, on its way in */}
          <motion.g style={{ y: at(bookY, 6), opacity: at(bookOpacity, 0) }}>
            <rect x="176" y="176" width="112" height="146" rx="4" fill={cover.cloth} />
            <rect x="176" y="176" width="7" height="146" rx="2" fill="rgba(0,0,0,0.25)" />
            <text
              x="232"
              y="252"
              textAnchor="middle"
              fill={cover.foil}
              fontSize="13"
              letterSpacing="1.4"
              fontFamily="var(--font-display), Georgia, serif"
            >
              {cover.title.length > 10 ? 'MY YEAR' : cover.title}
            </text>
          </motion.g>

          {/* Box */}
          <rect x="148" y="272" width="168" height="118" rx="5" fill="#D7C4A6" />
          <rect x="148" y="272" width="168" height="4" fill="#E8DCC4" />
          <rect x="230" y="272" width="4" height="118" fill="#C6B092" />

          {/* Flaps folding shut */}
          <motion.rect
            x="148"
            y="244"
            width="168"
            height="30"
            rx="3"
            fill="#E0CFB4"
            style={{ scaleY: at(flapScale, 0.04), originY: 1, originX: 0.5 }}
          />

          {/* Label, stamped on */}
          <motion.g style={{ opacity: at(labelOpacity, 1), scale: at(labelScale, 1), originX: 0.5, originY: 0.5 }}>
            <rect x="176" y="300" width="112" height="46" rx="3" fill="#FCF7EC" />
            <text x="232" y="317" textAnchor="middle" fill="#9A9086" fontSize="7" letterSpacing="1.2">
              HANDLE WITH CARE
            </text>
            <text
              x="232"
              y="336"
              textAnchor="middle"
              fill="#2A2521"
              fontSize="13"
              fontFamily="var(--font-display), Georgia, serif"
            >
              YOUR STORY
            </text>
          </motion.g>
        </motion.g>
      </svg>

      <motion.p
        className="mt-6 px-6 text-center font-serif text-[clamp(1.3rem,3.4vw,2.2rem)] tracking-editorial text-ink"
        style={{ opacity: at(lineOpacity, 1) }}
      >
        Your story arrives at your door.
      </motion.p>
    </div>
  );
}
