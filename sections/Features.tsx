import { Container } from '@/components/ui/Container';
import { auraOutputs } from '@/data/memories';

export function Features() {
  return (
    <section aria-label="What Aura remembers" className="bg-paper py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <h2 className="display text-[clamp(1.75rem,3.4vw,2.3rem)] text-ink">
            You talk. Aura remembers.
          </h2>

          <dl className="divide-y divide-line border-t border-line">
            {auraOutputs.map((card) => (
              <div key={card.label} className="grid gap-1 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
                <dt className="eyebrow pt-1">{card.label}</dt>
                <dd className="heading text-[16px] leading-[1.55] text-ink">
                  {card.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
