'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { privacyControls } from '@/data/privacy';
import { useCalmMotion } from '@/animations/useCalmMotion';

export function Privacy() {
  return (
    <Section id="privacy" tone="cream" label="Privacy">
      <Container wide>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Privacy"
              title="Your life is yours."
              intro="A diary only works if you can be honest in it. Aura is built so that nothing you say has to be performed for anyone — including us."
            />
            <Reveal delay={0.2}>
              <LockIllustration />
            </Reveal>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-card border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-2">
            {privacyControls.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.05} className="bg-paper p-7">
                <h3 className="font-serif text-[19px] leading-snug tracking-editorial text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 font-sans text-[14.5px] leading-[1.65] text-ink-soft">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl font-sans text-[13.5px] leading-relaxed text-ink-faint">
            We only describe what the app actually does. Where a security or storage claim would
            belong, you will find the specifics in the Privacy Policy rather than a badge on a
            marketing page.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function LockIllustration() {
  const { enabled } = useCalmMotion();
  return (
    <div className="mt-14 max-w-[220px]">
      <svg viewBox="0 0 140 160" className="h-auto w-full" aria-hidden="true">
        {/* Padlock, drawn thin like the app's line icons */}
        <motion.path
          d="M46 68 V50 a24 24 0 0 1 48 0 v18"
          fill="none"
          stroke="#6B6157"
          strokeWidth="3"
          strokeLinecap="round"
          initial={enabled ? { pathLength: 0 } : false}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <rect x="30" y="68" width="80" height="66" rx="14" fill="#F3E9DA" stroke="#6B6157" strokeWidth="3" />
        <circle cx="70" cy="96" r="6" fill="#BE6F4C" />
        <path d="M70 102 v12" stroke="#BE6F4C" strokeWidth="3" strokeLinecap="round" />
        {/* A sprig growing around it — the garden, not a vault */}
        <path d="M112 136 C120 118 122 100 118 84" stroke="#6F8C69" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="124" cy="112" rx="11" ry="4.4" fill="#A9C0A2" transform="rotate(-28 124 112)" />
        <ellipse cx="110" cy="98" rx="11" ry="4.4" fill="#8FAE88" transform="rotate(26 110 98)" />
        <circle cx="118" cy="80" r="5.5" fill="#F2C7A9" />
      </svg>
    </div>
  );
}
