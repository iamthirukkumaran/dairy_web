'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { useCalmMotion } from '@/animations/useCalmMotion';

const occasions = ['Birthday', 'Anniversary', 'Parents', 'Graduation', 'A relationship', 'A journey'];

/** Kept deliberately light for V1 — a note about what's coming, not a campaign. */
export function Gifting() {
  return (
    <Section id="gifting" tone="paper" label="Gifting">
      <Container wide>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Gifting"
              title="Give someone a year of their life."
              intro="Two copies of the same year — one to keep, one to hand over. Or a book made from a year you spent together."
            />
            <Reveal delay={0.16}>
              <ul className="mt-9 flex flex-wrap gap-2">
                {occasions.map((o) => (
                  <li
                    key={o}
                    className="rounded-pill border border-ink/[0.08] bg-ivory px-4 py-2 font-sans text-[13px] text-ink-soft"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}>
              <Button href="#create-book" size="lg" variant="secondary" arrow className="mt-9">
                Create a gift book
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <TwoBooks />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function TwoBooks() {
  const { enabled } = useCalmMotion();
  return (
    <div className="relative mx-auto flex h-[320px] w-full max-w-md items-end justify-center" style={{ perspective: 1400 }}>
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 h-8 w-[62%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-2xl"
      />
      {[
        { color: '#4F6A4B', foil: '#E5C98C', x: '-30%', rot: -13, z: 1, year: '2026', delay: 0 },
        { color: '#BE6F4C', foil: '#F6E3C0', x: '30%', rot: 11, z: 2, year: '2026', delay: 0.6 },
      ].map((b) => (
        <motion.div
          key={b.color}
          className="preserve-3d absolute bottom-10 h-[176px] w-[132px] origin-bottom rounded-[4px] shadow-lift sm:h-[230px] sm:w-[172px]"
          style={{ backgroundColor: b.color, zIndex: b.z, x: b.x }}
          initial={enabled ? { rotate: b.rot, y: 30, opacity: 0 } : { rotate: b.rot }}
          whileInView={{ rotate: b.rot, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 16, delay: b.delay }}
          whileHover={{ y: -10, rotate: b.rot * 0.4 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[4px] opacity-[0.14] mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 3px)',
            }}
          />
          <div className="absolute inset-y-[3px] left-[3px] w-[6px] rounded-l-[3px] bg-black/15" />
          <div className="flex h-full flex-col items-center justify-center">
            <span className="font-serif text-[17px] tracking-[0.08em]" style={{ color: b.foil }}>
              MY {b.year}
            </span>
            <span className="mt-2 h-px w-8" style={{ backgroundColor: `${b.foil}80` }} />
            <span className="mt-2 font-sans text-[8px] uppercase tracking-wide2" style={{ color: `${b.foil}b0` }}>
              A year in my life
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
