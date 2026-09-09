import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { auraOutputs } from '@/data/memories';

export function Features() {
  return (
    <Section id="memories" tone="paper" label="What Aura remembers">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="One entry, fully understood"
          title="You talk. Aura remembers."
          intro="Every entry quietly becomes six things — the story of the day, the moment that mattered, the people in it, the themes underneath, what you said you'd do next, and something worth sitting with."
        />

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
