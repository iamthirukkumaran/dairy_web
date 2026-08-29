'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/**
 * One continuous sky behind the entire page.
 *
 * Four fixed light washes — morning, midday, evening, night — cross-fade as
 * the document scrolls, so sections never hard-cut from one world to another.
 * Only `opacity` animates, so the whole effect is a handful of composited
 * layers. It never goes dark: night here is a cool, muted ivory.
 */
const WASHES = [
  {
    id: 'morning',
    stops: [0, 0.1, 0.26],
    out: [1, 1, 0],
    image:
      'radial-gradient(120% 90% at 76% 8%, #FBE7BD 0%, rgba(251,231,189,0.42) 34%, rgba(251,246,236,0) 68%), linear-gradient(180deg, #FDF7EC 0%, #FBF3E4 100%)',
  },
  {
    id: 'day',
    stops: [0.16, 0.36, 0.56],
    out: [0, 1, 0],
    image:
      'radial-gradient(120% 90% at 30% 0%, #F6F3E8 0%, rgba(246,243,232,0.4) 40%, rgba(251,246,236,0) 72%), linear-gradient(180deg, #FBF8F0 0%, #F5F4EA 100%)',
  },
  {
    id: 'evening',
    stops: [0.5, 0.66, 0.8],
    out: [0, 1, 0],
    image:
      'radial-gradient(120% 90% at 18% 12%, #F7DCC6 0%, rgba(247,220,198,0.45) 38%, rgba(251,246,236,0) 72%), linear-gradient(180deg, #FAF0E5 0%, #F2E4DC 100%)',
  },
  {
    id: 'night',
    stops: [0.74, 0.86, 0.94],
    out: [0, 1, 0],
    image:
      'radial-gradient(120% 90% at 62% 6%, #E7E4F0 0%, rgba(231,228,240,0.5) 40%, rgba(244,242,246,0) 74%), linear-gradient(180deg, #F1EFF4 0%, #EDEAF1 100%)',
  },
  {
    id: 'dawn',
    stops: [0.9, 0.97, 1],
    out: [0, 1, 1],
    image:
      'radial-gradient(120% 90% at 50% 96%, #F8DCBB 0%, rgba(248,220,187,0.45) 36%, rgba(251,246,236,0) 70%), linear-gradient(180deg, #F7F0E4 0%, #F9EDDD 100%)',
  },
];

export function StoryAtmosphere() {
  const { scrollYProgress } = useScroll();
  // Smoothed so a flick of the wheel does not strobe the sky.
  const p = useSpring(scrollYProgress, { stiffness: 40, damping: 30, mass: 0.8 });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {WASHES.map((w) => (
        <Wash key={w.id} progress={p} stops={w.stops} out={w.out} image={w.image} />
      ))}

      {/* Paper grain, part of the sky rather than a film over the page */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

function Wash({
  progress,
  stops,
  out,
  image,
}: {
  progress: ReturnType<typeof useSpring>;
  stops: number[];
  out: number[];
  image: string;
}) {
  const opacity = useTransform(progress, stops, out, { clamp: true });
  return <motion.div className="absolute inset-0" style={{ opacity, backgroundImage: image }} />;
}
