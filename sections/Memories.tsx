import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { memories } from '@/data/memories';

export function Memories() {
  return (
    <Section tone="cream" label="Your diary">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Your diary"
          title="Written in your own words."
          intro="Aura keeps your voice, not a summary of it. Every entry stays yours to edit, keep or delete."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {memories.slice(0, 3).map((memory) => (
            <li key={memory.id} className="rounded-card border border-line bg-paper p-6">
              <p className="eyebrow">
                {memory.weekday} · {memory.date}
              </p>
              <h3 className="mt-3 font-serif text-[19px] leading-snug tracking-editorial text-ink">
                {memory.title}
              </h3>
              <p className="mt-3 font-sans text-[14px] leading-[1.7] text-ink-soft">
                {memory.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {[...memory.people, ...memory.tags].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-pill border border-line px-2.5 py-1 font-sans text-[11px] text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
