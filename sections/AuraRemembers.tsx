'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { auraOutputs } from '@/data/memories';
import { toneSurface } from '@/components/art/palette';
import { useCalmMotion } from '@/animations/useCalmMotion';
import { cn, seeded } from '@/lib/utils';

/**
 * One spoken entry fans out into everything Aura keeps.
 * Cards settle into place from a loose stack, each with its own small tilt.
 */
export function AuraRemembers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { enabled } = useCalmMotion();

  return (
    <Section id="remembers" tone="ivory" label="What Aura remembers">
      <Container wide>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="One entry, fully understood"
              title={
                <>
                  You talk.
                  <br />
                  Aura remembers.
                </>
              }
              intro="Every entry quietly becomes six things — the story of the day, the moment that mattered, the people in it, the threads running underneath, what you said you'd do next, and something worth sitting with."
            />
          </div>

          <div ref={ref} className="grid gap-4 sm:grid-cols-2">
            {auraOutputs.map((card, i) => {
              const tilt = (seeded(i + 21) - 0.5) * 2.6;
              return (
                <motion.div
                  key={card.label}
                  initial={enabled ? { opacity: 0, y: 40, rotate: tilt * 2.4, scale: 0.95 } : false}
                  animate={inView ? { opacity: 1, y: 0, rotate: tilt, scale: 1 } : undefined}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    damping: 18,
                    mass: 0.9,
                    delay: i * 0.1,
                  }}
                  whileHover={{ rotate: 0, y: -6 }}
                  data-cursor="memory"
                  className={cn(
                    'gpu rounded-card border p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift',
                    toneSurface[card.tone],
                    i % 3 === 0 && 'sm:mt-8',
                  )}
                >
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-wide2 text-ink/45">
                    {card.label}
                  </p>
                  <p className="mt-3 font-serif text-[18px] leading-[1.35] tracking-editorial text-ink">
                    {card.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
