'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LandscapeScene } from '@/components/art/LandscapeScene';
import { Reveal } from '@/animations/Reveal';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { usePointerDepth } from '@/animations/usePointerDepth';
import { LineReveal } from '@/animations/TextReveal';
import { useQuality } from '@/animations/useQuality';

const AuraField = dynamic(() => import('@/components/webgl/AuraField').then((m) => m.AuraField), {
  ssr: false,
});

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useCalmMotion();
  const depth = usePointerDepth(0.7);
  const quality = useQuality();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const y = useTransform(smooth, [0, 1], enabled ? ['-8%', '8%'] : ['0%', '0%']);

  return (
    <section
      id="start"
      ref={ref}
      aria-label="Start remembering"
      className="relative isolate flex min-h-[84svh] items-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 gpu">
        <LandscapeScene time="sunset" depth={depth} showParticles={quality === 'off'} />
        <AuraField tone="sunset" quality={quality} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/30 to-ivory/70" />
      </motion.div>

      <Container className="py-28 text-center sm:py-36">
        <LineReveal
          as="h2"
          onScroll
          lines={['Start remembering.']}
          className="display text-[clamp(2.6rem,7.4vw,5.6rem)] text-ink"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl font-sans text-[17px] leading-[1.65] text-ink-soft sm:text-[19px]">
            Your days are already happening.
            <br className="hidden sm:block" /> Let Aura remember them.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="#ios" size="lg" arrow>
              Start remembering
            </Button>
            <Button href="#how-it-works" size="lg" variant="secondary">
              See how it works
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
