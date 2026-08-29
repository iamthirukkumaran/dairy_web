'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { useCalmMotion } from '@/animations/useCalmMotion';

const steps = [
  {
    n: '01',
    title: 'Talk',
    body: 'Tell Aura about your day — out loud, in whatever order it comes out.',
    art: TalkArt,
  },
  {
    n: '02',
    title: 'Remember',
    body: 'Aura turns it into your personal diary, and keeps what mattered.',
    art: RememberArt,
  },
  {
    n: '03',
    title: 'Hold',
    body: 'At the end of the year, turn your story into a beautiful book.',
    art: HoldArt,
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="ivory" label="How it works">
      <Container wide>
        <SectionHeading eyebrow="How it works" title="Three things. That's the whole app." align="center" className="mx-auto max-w-3xl" />

        <ol className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => {
            const Art = s.art;
            return (
              <Reveal as="li" key={s.n} delay={i * 0.12}>
                <div className="group flex flex-col items-start">
                  <div className="relative h-40 w-full overflow-hidden rounded-card border border-ink/[0.07] bg-paper">
                    <Art />
                  </div>
                  <p className="mt-8 font-sans text-[12px] font-semibold tracking-wide2 text-clay tabular-nums">
                    {s.n}
                  </p>
                  <h3 className="mt-3 display text-[clamp(2rem,4vw,2.9rem)] text-ink">{s.title}</h3>
                  <p className="mt-4 max-w-prose font-sans text-[16px] leading-[1.65] text-ink-soft">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------- step illustrations */

function TalkArt() {
  const { enabled } = useCalmMotion();
  return (
    <div className="flex h-full items-center justify-center gap-[3px]">
      {Array.from({ length: 21 }, (_, i) => {
        const base = 0.2 + Math.abs(Math.sin(i * 0.7)) * 0.7;
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-sage-deep/60"
            style={{ height: 64, originY: 0.5 }}
            initial={{ scaleY: base * 0.4 }}
            animate={enabled ? { scaleY: [base * 0.35, base, base * 0.5] } : { scaleY: base * 0.7 }}
            transition={
              enabled
                ? { duration: 1.8 + (i % 4) * 0.3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.05 }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}

function RememberArt() {
  const { enabled } = useCalmMotion();
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative h-[104px] w-[86px] rounded-[6px] border border-ink/[0.08] bg-[#FCF7EC] p-3 shadow-soft">
        {[100, 82, 92, 70, 88].map((w, i) => (
          <motion.span
            key={i}
            className="mb-[7px] block h-[3px] rounded-full bg-ink/[0.14]"
            style={{ width: `${w}%`, originX: 0 }}
            initial={enabled ? { scaleX: 0 } : false}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <motion.div
        className="absolute -right-1 bottom-6 h-9 w-9"
        initial={enabled ? { scale: 0, opacity: 0 } : false}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.9 }}
      >
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="9" fill="#F2C7A9" />
          <circle cx="20" cy="20" r="3.4" fill="#BE6F4C" />
          <circle cx="12" cy="13" r="3.6" fill="#F2C7A9" />
          <circle cx="28" cy="15" r="3" fill="#F2C7A9" />
        </svg>
      </motion.div>
    </div>
  );
}

function HoldArt() {
  const { enabled } = useCalmMotion();
  return (
    <div className="flex h-full items-center justify-center" style={{ perspective: 700 }}>
      <motion.div
        className="preserve-3d relative h-[104px] w-[80px]"
        animate={enabled ? { rotateY: [-16, 16, -16] } : { rotateY: -12 }}
        transition={enabled ? { duration: 9, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <div className="absolute inset-0 rounded-[3px] rounded-l-[2px] bg-[#4F6A4B] shadow-lift" />
        <div className="absolute inset-y-[3px] left-[3px] right-[2px] rounded-r-[2px] bg-[#F4ECDC]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[3px] bg-[#4F6A4B]">
          <span className="font-serif text-[13px] tracking-[0.08em] text-[#E5C98C]">MY 2026</span>
          <span className="mt-1 h-px w-6 bg-[#E5C98C]/50" />
        </div>
      </motion.div>
    </div>
  );
}
