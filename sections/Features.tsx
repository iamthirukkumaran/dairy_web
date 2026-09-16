import { Container } from '@/components/ui/Container';
import { auraOutputs } from '@/data/memories';

export function Features() {
  return (
    <section aria-label="What Aura remembers" className="section bg-paper">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-12 lg:gap-16">
          {/*
           * Centred against the list rather than pinned to its first row: the
           * two columns are very different heights, and top-aligning them left
           * a column-deep hole under the heading.
           */}
          <h2 className="display self-center text-[clamp(1.7rem,6vw,2.3rem)] text-ink md:text-[clamp(1.7rem,3.4vw,2.3rem)]">
            You talk. Aura remembers.
          </h2>

          <dl className="divide-y divide-line border-t border-line">
            {auraOutputs.map((card) => (
              <div
                key={card.label}
                className="grid gap-1.5 py-5 sm:grid-cols-[minmax(140px,180px)_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="eyebrow pt-[5px]">{card.label}</dt>
                <dd className="heading text-[15.5px] leading-[1.55] text-ink sm:text-[16px]">
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
