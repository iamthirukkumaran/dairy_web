import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  { n: '01', title: 'Talk', body: 'Tell Aura about your day, out loud.' },
  { n: '02', title: 'Remember', body: 'It becomes your diary, and keeps what mattered.' },
  { n: '03', title: 'Hold', body: 'Turn your year into a printed book.' },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" label="How it works">
      <Container>
        <SectionHeading align="center" title="Three things. That's the whole app." />

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-card border border-line bg-paper p-6">
              <p className="font-sans text-[12px] font-semibold tabular-nums tracking-wide2 text-clay">
                {s.n}
              </p>
              <h3 className="mt-3 font-serif text-[22px] tracking-editorial text-ink">{s.title}</h3>
              <p className="mt-2 font-sans text-[15px] leading-[1.6] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
