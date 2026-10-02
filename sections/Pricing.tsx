import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { formatPrice, hasPrice, plans } from '@/data/pricing';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="section-t bg-ivory pb-14 sm:pb-18 lg:pb-22">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <span className="eyebrow text-clay">Honest & Transparent</span>
          <h2 className="display mt-2 text-[clamp(2.1rem,5vw,2.9rem)] text-ink">
            Simple pricing.
            <br />
            <span className="italic font-normal text-clay">Zero surprises.</span>
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
            Start completely free with daily voice & written journaling. Upgrade only when you want permanent audio archival and keepsake book discounts.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl lg:max-w-5xl gap-6 sm:mt-12 sm:grid-cols-2">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                'flex flex-col rounded-card border bg-paper p-7 sm:p-8 transition-all duration-300',
                plan.featured
                  ? 'border-clay/60 shadow-card relative before:absolute before:inset-x-0 before:top-0 before:h-1 before:rounded-t-card before:bg-clay'
                  : 'border-line shadow-soft hover:border-ink/20',
              )}
            >
              <div className="flex min-h-[28px] items-center justify-between gap-3">
                <p className="text-[17px] font-semibold text-ink">{plan.name}</p>
                {plan.featured ? (
                  <span className="rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory">
                    Most Popular
                  </span>
                ) : null}
              </div>

              <p className="mt-5 flex min-h-[44px] items-baseline gap-2">
                {hasPrice(plan.price) ? (
                  <>
                    <span className="display text-[34px] sm:text-[38px] text-ink">{formatPrice(plan.price)}</span>
                    {plan.cadence ? (
                      <span className="text-[13.5px] text-ink-faint">/ {plan.cadence}</span>
                    ) : null}
                  </>
                ) : (
                  <span className="text-[15px] font-medium text-ink-faint">Pricing soon</span>
                )}
              </p>

              <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">{plan.summary}</p>

              <ul className="mt-6 space-y-3 border-t border-line/80 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[14px] leading-[1.5] text-ink-soft">
                    <svg viewBox="0 0 20 20" className="mt-[2px] h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 10.5 8 14.5 16 5.5" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  href="#get"
                  variant={plan.featured ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full text-center"
                >
                  {plan.cta}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center text-[13px] text-ink-faint">
          <p>🔒 256-bit encryption · Zero data selling · Zero AI model training · Export anytime</p>
        </div>
      </Container>
    </section>
  );
}
