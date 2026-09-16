import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { formatPrice, hasPrice, plans } from '@/data/pricing';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="section-t bg-ivory pb-12 sm:pb-14 lg:pb-16">
      <Container>
        <h2 className="display mx-auto max-w-2xl text-center text-[clamp(1.7rem,6vw,2.3rem)] text-ink sm:text-[clamp(1.7rem,3.4vw,2.3rem)]">
          Start free.
        </h2>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:mt-12 sm:grid-cols-2">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                'flex flex-col rounded-card border bg-paper p-6 shadow-soft sm:p-7',
                plan.featured ? 'border-ink' : 'border-line',
              )}
            >
              <div className="flex min-h-[28px] items-center justify-between gap-3">
                <p className="text-[15px] font-medium text-ink">{plan.name}</p>
                {plan.featured ? (
                  <span className="rounded-pill bg-ink px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-ivory">
                    Popular
                  </span>
                ) : null}
              </div>

              {/* A fixed band keeps both prices on one line across the two cards. */}
              <p className="mt-4 flex min-h-[40px] items-baseline gap-2">
                {hasPrice(plan.price) ? (
                  <>
                    <span className="display text-[30px] text-ink">{formatPrice(plan.price)}</span>
                    {plan.cadence ? (
                      <span className="text-[13px] text-ink-faint">{plan.cadence}</span>
                    ) : null}
                  </>
                ) : (
                  <span className="text-[15px] font-medium text-ink-faint">Pricing soon</span>
                )}
              </p>

              <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{plan.summary}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[14px] leading-[1.5] text-ink-soft">
                    <svg viewBox="0 0 20 20" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 10.5 8 14.5 16 5.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Button
                  href="#get"
                  variant={plan.featured ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
