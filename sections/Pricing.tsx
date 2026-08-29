'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { bookEditions, formatPrice, plans } from '@/data/pricing';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <Section id="pricing" tone="ivory" label="Pricing">
      <Container wide>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, and separate."
          intro="The app is a subscription. The book is a thing you buy once, when you want it. One never quietly becomes the other."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                data-cursor="memory"
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className={cn(
                  'flex h-full flex-col rounded-card border p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-9',
                  p.featured ? 'border-ink/15 bg-paper' : 'border-ink/[0.08] bg-paper/60',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-[24px] tracking-editorial text-ink">{p.name}</h3>
                  {p.featured ? (
                    <span className="rounded-pill bg-[#E9F0E5] px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 text-sage-deep">
                      Everything
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 font-sans text-[14.5px] text-ink-soft">{p.summary}</p>

                <p className="mt-7 flex items-baseline gap-2">
                  <span className="font-serif text-[40px] leading-none tracking-editorial text-ink">
                    {p.price.amount === 0 ? 'Free' : formatPrice(p.price)}
                  </span>
                  {p.price.amount !== 0 ? (
                    <span className="font-sans text-[13px] text-ink-faint">{p.cadence}</span>
                  ) : null}
                </p>

                <ul className="mt-7 flex-1 space-y-2.5 border-t border-ink/[0.08] pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 font-sans text-[14.5px] text-ink-soft">
                      <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-sage-deep" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#start"
                  size="md"
                  arrow
                  variant={p.featured ? 'primary' : 'secondary'}
                  className="mt-8 self-start"
                >
                  {p.cta}
                </Button>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* The book sits outside the subscription, on purpose */}
        <div className="mx-auto mt-8 max-w-4xl">
          <Reveal>
            <div className="rounded-card border border-ink/[0.08] bg-cream/60 p-8 sm:p-9">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-serif text-[24px] tracking-editorial text-ink">The book</h3>
                  <p className="mt-2 max-w-prose font-sans text-[14.5px] text-ink-soft">
                    Bought once, per year. Not bundled into a plan, and never printed without you
                    asking.
                  </p>
                </div>
                <Button href="#editions" variant="ghost" size="sm" arrow>
                  See editions
                </Button>
              </div>

              <dl className="mt-7 grid gap-px overflow-hidden rounded-[14px] border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-3">
                {bookEditions.slice(0, 3).map((e) => (
                  <div key={e.id} className="bg-paper px-5 py-4">
                    <dt className="font-sans text-[13px] text-ink-soft">{e.name}</dt>
                    <dd className="mt-1 font-serif text-[20px] text-ink">
                      From {formatPrice(e.price)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
