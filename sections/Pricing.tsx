import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { formatPrice, plans } from '@/data/pricing';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <Section id="pricing" tone="cream" label="Pricing">
      <Container>
        <SectionHeading align="center" title="Start free." />

        <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                'flex flex-col rounded-card border bg-paper p-7',
                plan.featured ? 'border-ink' : 'border-line',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-sans text-[15px] font-medium text-ink">{plan.name}</p>
                {plan.featured ? (
                  <span className="rounded-pill bg-ink px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide2 text-ivory">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="mt-5 font-serif text-[34px] tracking-editorial text-ink">
                {formatPrice(plan.price)}
                {plan.cadence ? (
                  <span className="ml-2 font-sans text-[13px] text-ink-faint">{plan.cadence}</span>
                ) : null}
              </p>

              <p className="mt-3 font-sans text-[14px] leading-[1.6] text-ink-soft">{plan.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 font-sans text-[14px] text-ink-soft">
                    <svg viewBox="0 0 20 20" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 10.5 8 14.5 16 5.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  href="#get"
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
