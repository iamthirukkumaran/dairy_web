import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { auraOutputs } from '@/data/memories';

export function Features() {
  return (
    <Section tone="paper" label="What Aura remembers">
      <Container>
        <SectionHeading align="center" title="You talk. Aura remembers." />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {auraOutputs.map((card) => (
            <li key={card.label} className="rounded-card border border-line bg-ivory p-6">
              <p className="eyebrow">{card.label}</p>
              <p className="mt-3 font-serif text-[17px] leading-[1.45] tracking-editorial text-ink">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
