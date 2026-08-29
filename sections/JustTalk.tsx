'use client';

import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { LineReveal, WordSequence } from '@/animations/TextReveal';
import { VoiceDemo, voiceSteps, type VoicePhase } from '@/components/VoiceDemo';
import { usePointerDepth } from '@/animations/usePointerDepth';
import { cn } from '@/lib/utils';

export function JustTalk() {
  const [active, setActive] = useState<VoicePhase>('home');
  const depth = usePointerDepth(0.5);
  // Stable identity keeps VoiceDemo's effect from re-running each render.
  const handlePhase = useCallback((phase: VoicePhase) => setActive(phase), []);

  return (
    <Section id="just-talk" tone="paper" label="The simplest journal" clip>
      <Container wide>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-24">
          <div className="min-w-0">
            <Reveal>
              <Eyebrow>The simplest journal</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              onScroll
              lines={['Just talk.']}
              className="mt-5 display text-[clamp(2.6rem,6vw,4.6rem)] text-ink"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-prose font-sans text-[17px] leading-[1.65] text-ink-soft sm:text-[18px]">
                No blank page. No perfect words. No effort.
              </p>
            </Reveal>

            <ol className="mt-12 space-y-1">
              {voiceSteps.map((s, i) => {
                const isActive = active === s.key;
                return (
                  <Reveal as="li" key={s.key} delay={0.05 * i}>
                    <div
                      className={cn(
                        'relative flex gap-5 rounded-card px-5 py-4 transition-colors duration-700 ease-calm',
                        isActive ? 'bg-cream/70' : 'bg-transparent',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-[3px] font-sans text-[11px] font-semibold tabular-nums transition-colors duration-500',
                          isActive ? 'text-clay' : 'text-ink-faint',
                        )}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p
                          className={cn(
                            'font-sans text-[15px] font-medium transition-colors duration-500',
                            isActive ? 'text-ink' : 'text-ink-soft',
                          )}
                        >
                          {s.label}
                        </p>
                        <p className="mt-1 font-sans text-[14px] leading-relaxed text-ink-soft/80">
                          {s.detail}
                        </p>
                      </div>
                      {isActive ? (
                        <motion.span
                          layoutId="voice-step-marker"
                          className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-[2px] rounded-full bg-clay"
                          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                        />
                      ) : null}
                    </div>
                  </Reveal>
                );
              })}
            </ol>

            <p className="mt-11 font-serif text-[clamp(1.5rem,3vw,2.1rem)] leading-tight tracking-editorial text-ink">
              <WordSequence words={['Chaos', 'becoming', 'a story.']} />
            </p>
          </div>

          <Reveal className="flex min-w-0 justify-center lg:justify-end">
            <div className="relative min-w-0">
              {/* Soft ground so the device sits on warm paper, not on nothing */}
              <div
                aria-hidden="true"
                className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,#F3E9DA,transparent)] opacity-80"
              />
              <VoiceDemo onPhaseChange={handlePhase} depth={depth} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
