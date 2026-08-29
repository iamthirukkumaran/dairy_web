'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { faqs } from '@/data/faq';
import { cn } from '@/lib/utils';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="paper" label="Frequently asked questions">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Questions" title="Good things to know." />
          </div>

          <ul className="border-t border-ink/[0.1]">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <li key={item.q} className="border-b border-ink/[0.1]">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      data-cursor="cta"
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          'font-serif text-[19px] leading-snug tracking-editorial transition-colors duration-300 sm:text-[21px]',
                          isOpen ? 'text-ink' : 'text-ink/80 group-hover:text-ink',
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative mt-[10px] block h-[11px] w-[11px] shrink-0"
                      >
                        <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink-soft" />
                        <span
                          className={cn(
                            'absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-ink-soft transition-transform duration-400 ease-calm',
                            isOpen ? 'scale-y-0' : 'scale-y-100',
                          )}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-prose pb-7 font-sans text-[15.5px] leading-[1.7] text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 font-sans text-[13.5px] text-ink-faint">
            Something not answered here?{' '}
            <a href="mailto:hello@aura.app" data-cursor="cta" className="link-underline hover:text-ink">
              Ask us directly
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
