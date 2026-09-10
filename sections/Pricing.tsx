import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { formatPrice, plans } from '@/data/pricing';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="bg-ivory py-20 sm:py-24">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center display text-[clamp(1.75rem,3.4vw,2.3rem)] text-ink">
          Start free.
        </h2>

        <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                'flex flex-col rounded-card border bg-paper p-7 shadow-soft',
                plan.featured ? 'border-ink' : 'border-line',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-medium text-ink">{plan.name}</p>
                {plan.featured ? (
                  <span className="rounded-pill bg-ink px-2.5 py-1 text-[10px] uppercase tracking-wide2 text-ivory">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="display mt-5 text-[30px] text-ink">
                {formatPrice(plan.price)}
                {plan.cadence ? (
                  <span className="ml-2 text-[13px] text-ink-faint">{plan.cadence}</span>
                ) : null}
              </p>

              <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{plan.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[14px] text-ink-soft">
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
    </section>
  );
}
