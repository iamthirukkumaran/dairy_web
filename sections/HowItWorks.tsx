import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    n: '01',
    title: 'Talk',
    body: 'Tell Aura about your day — out loud, in whatever order it comes out.',
  },
  {
    n: '02',
    title: 'Remember',
    body: 'Aura turns it into your personal diary, and keeps what mattered.',
  },
  {
    n: '03',
    title: 'Hold',
    body: 'At the end of the year, turn your story into a beautiful book.',
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" label="How it works">
      <Container>
        <SectionHeading align="center" eyebrow="How it works" title="Three things. That's the whole app." />

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-card border border-line bg-paper p-6">
              <p className="font-sans text-[12px] font-semibold tabular-nums tracking-wide2 text-clay">
                {s.n}
              </p>
              <h3 className="mt-3 font-serif text-[22px] tracking-editorial text-ink">{s.title}</h3>
              <p className="mt-2 font-sans text-[15px] leading-[1.65] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
