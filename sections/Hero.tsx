'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LandscapeScene } from '@/components/art/LandscapeScene';
import { PhoneMockup } from '@/components/PhoneMockup';
import { TodayScreen } from '@/components/screens/TodayScreen';
import { Sprig } from '@/components/art/Flower';
import { LineReveal } from '@/animations/TextReveal';
import { usePointerDepth } from '@/animations/usePointerDepth';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { calm } from '@/animations/variants';
import { useQuality } from '@/animations/useQuality';

const AuraField = dynamic(() => import('@/components/webgl/AuraField').then((m) => m.AuraField), {
  ssr: false,
});

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useCalmMotion();
  const depth = usePointerDepth();
  const quality = useQuality();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6 });
  // Each plane leaves at its own rate — the camera pulls up through the scene.
  const landscapeY = useTransform(smooth, [0, 1], enabled ? ['0%', '14%'] : ['0%', '0%']);
  const landscapeScale = useTransform(smooth, [0, 1], enabled ? [1, 1.1] : [1, 1]);
  const copyY = useTransform(smooth, [0, 1], enabled ? [0, -110] : [0, 0]);
  const phoneY = useTransform(smooth, [0, 1], enabled ? [0, -190] : [0, 0]);
  const fade = useTransform(smooth, [0, 0.75], enabled ? [1, 0] : [1, 1]);

  return (
    <div
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[var(--nav-height)]"
    >
      {/* Painted ground, five planes deep */}
      <motion.div
        style={{ y: landscapeY, scale: landscapeScale }}
        className="absolute inset-0 -z-10 origin-bottom gpu"
      >
        <LandscapeScene time="sunrise" depth={depth} showParticles={quality === 'off'} />
        {/* Real depth: motes at true distances, parallaxing against each other */}
        <AuraField tone="sunrise" quality={quality} className="absolute inset-0" />
        {/* Lift the copy off the artwork without a heavy scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/55 via-ivory/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ivory/90 via-ivory/35 to-transparent" />
      </motion.div>

      <Sprig className="pointer-events-none absolute -left-6 bottom-24 hidden h-56 w-40 opacity-40 lg:block" />
      <Sprig
        flip
        className="pointer-events-none absolute -right-4 bottom-40 hidden h-44 w-32 opacity-30 lg:block"
      />

      <Container wide className="relative pb-16 pt-10 sm:pb-24 lg:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8">
          <motion.div style={{ y: copyY, opacity: fade }} className="min-w-0 max-w-[42rem] gpu">
            <motion.p
              initial={enabled ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...calm, delay: 0.15 }}
              className="eyebrow"
            >
              A voice-first journal
            </motion.p>

            <LineReveal
              as="h1"
              lines={['Your life,', 'beautifully', 'remembered.']}
              delay={0.3}
              stagger={0.12}
              className="mt-6 display text-[clamp(2.9rem,8.4vw,6.5rem)] text-ink"
            />

            <motion.p
              initial={enabled ? { opacity: 0, y: 16, filter: 'blur(6px)' } : false}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...calm, delay: 0.85 }}
              className="mt-7 max-w-[34rem] font-sans text-[17px] leading-[1.65] text-ink-soft sm:text-[19px]"
            >
              Talk about your day. Aura turns your words into a beautiful diary, remembers what
              mattered, and helps you rediscover your story.
            </motion.p>

            <motion.div
              initial={enabled ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...calm, delay: 1 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="#start" size="lg" arrow>
                Start remembering
              </Button>
              <Button href="#how-it-works" size="lg" variant="secondary">
                See how it works
              </Button>
            </motion.div>
          </motion.div>

          {/* The device sits in the same room as the landscape */}
          <motion.div
            style={{ y: phoneY }}
            initial={enabled ? { opacity: 0, y: 60, scale: 0.94 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 64, damping: 17, mass: 1.1, delay: 0.55 }}
            className="mx-auto min-w-0 gpu lg:mx-0 lg:justify-self-end"
          >
            <PhoneMockup width={294} depth={depth} rotate={-2.5}>
              <TodayScreen />
            </PhoneMockup>
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        initial={enabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        style={{ opacity: fade, translateX: '-50%' }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span
          className="block h-8 w-px origin-top bg-ink/25"
          animate={enabled ? { scaleY: [0.3, 1, 0.3] } : undefined}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
