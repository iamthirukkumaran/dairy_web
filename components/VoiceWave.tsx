'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useCalmMotion } from '@/animations/useCalmMotion';

const SAMPLES = 84;
const WIDTH = 280;
const HEIGHT = 74;
const MID = HEIGHT / 2;

/**
 * An organic voice trace rather than an equaliser.
 *
 * The line is the sum of three slow sines shaped by a scripted speech
 * envelope — bursts, breaths, a trailing-off — so it reads as someone talking
 * rather than as audio levels. Deterministic: no microphone, no API, and it
 * looks identical on every visit.
 *
 * One `requestAnimationFrame` loop mutates a single path, and it stops the
 * moment the demo is not listening or the tab is hidden.
 */
export function VoiceWave({ active, className }: { active: boolean; className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const { enabled } = useCalmMotion();

  useEffect(() => {
    const line = pathRef.current;
    const fill = fillRef.current;
    if (!line || !fill) return;

    // Resting state: a barely-there line.
    const draw = (t: number, gain: number) => {
      let d = '';
      let under = `M0 ${MID} `;
      for (let i = 0; i < SAMPLES; i += 1) {
        const u = i / (SAMPLES - 1);
        const x = u * WIDTH;
        // Fade the trace out at both ends so it does not stop abruptly.
        const edge = Math.sin(u * Math.PI) ** 0.6;
        const wave =
          Math.sin(u * 11 + t * 2.6) * 0.55 +
          Math.sin(u * 23 - t * 3.7) * 0.28 +
          Math.sin(u * 37 + t * 1.9) * 0.17;
        const y = MID - wave * edge * gain * (MID - 3);
        d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
        under += `L${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      line.setAttribute('d', d);
      fill.setAttribute('d', `${under}L${WIDTH} ${MID} Z`);
    };

    if (!enabled || !active) {
      draw(0, active ? 0.5 : 0.06);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      // Speech envelope: phrases, with breaths between them.
      const phrase = 0.55 + 0.45 * Math.sin(t * 1.15);
      const breath = 0.72 + 0.28 * Math.sin(t * 0.37 + 1.2);
      const flicker = 0.9 + 0.1 * Math.sin(t * 9.3);
      draw(t, Math.max(0.42, phrase * breath * flicker));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [active, enabled]);

  return (
    <div className={cn('relative', className)} aria-hidden="true">
      {/* Warm glow that only exists while listening */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-700"
        style={{
          opacity: active ? 1 : 0,
          background: 'radial-gradient(60% 120% at 50% 50%, rgba(190,111,76,0.16), transparent 70%)',
        }}
      />
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="wave-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6F8C69" stopOpacity="0" />
            <stop offset="50%" stopColor="#6F8C69" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#6F8C69" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6F8C69" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#4F6A4B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6F8C69" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path ref={fillRef} fill="url(#wave-fill)" />
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#wave-line)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
