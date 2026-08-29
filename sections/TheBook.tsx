'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { bookEditions, bookFlow, formatPrice } from '@/data/pricing';
import { cn } from '@/lib/utils';

/**
 * The physical product section, plus the shape of the ordering journey.
 * Every CTA is a placeholder anchor: no payment or order processing is wired up.
 */
export function TheBook() {
  return (
    <Section id="editions" tone="ivory" label="The book">
      <Container wide>
        <SectionHeading
          eyebrow="The book"
          title={
            <>
              Your memories,
              <br />
              off the screen.
            </>
          }
          intro="Printed to order from your own year. Choose the weight of paper, the cover, and how much of the year goes in."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bookEditions.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -6 }}
                data-cursor="book"
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className={cn(
                  'flex h-full flex-col rounded-card border p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift',
                  e.featured ? 'border-clay/25 bg-[#FBEADD]' : 'border-ink/[0.08] bg-paper',
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-[22px] tracking-editorial text-ink">{e.name}</h3>
                  {e.featured ? (
                    <span className="rounded-pill bg-ink px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide2 text-ivory">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ink-soft">{e.summary}</p>

                <p className="mt-6 font-sans text-[13px] text-ink-faint">
                  From <span className="font-serif text-[24px] text-ink">{formatPrice(e.price)}</span>
                </p>

                <ul className="mt-6 space-y-2 border-t border-ink/[0.08] pt-5">
                  {e.features.map((f) => (
                    <li key={f} className="flex gap-2.5 font-sans text-[14px] text-ink-soft">
                      <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-sage-deep" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button href="#create-book" variant="secondary" size="sm" arrow className="mt-7 self-start">
                  {e.cta}
                </Button>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-sans text-[13px] text-ink-faint">
            Prices are set per region and shown in full — including printing and delivery — before
            you pay.
          </p>
        </Reveal>

        {/* Order journey */}
        <div id="create-book" className="mt-28 scroll-mt-32">
          <SectionHeading
            as="h3"
            eyebrow="Making your book"
            title="Six steps, and none of them are hard."
            className="max-w-3xl"
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {bookFlow.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.05} className="bg-paper p-7">
                <p className="font-sans text-[11px] font-semibold tracking-wide2 text-clay tabular-nums">
                  {s.step}
                </p>
                <h4 className="mt-3 font-serif text-[20px] leading-snug tracking-editorial text-ink">
                  {s.title}
                </h4>
                <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-ink-soft">{s.detail}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#start" size="lg" arrow>
                Preview my book
              </Button>
              <p className="font-sans text-[13px] text-ink-faint">
                Preview is free. You only pay when you decide to print.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
