import { Container } from '@/components/ui/Container';

const steps = [
  { n: '01', title: 'Talk', body: 'Tell Aura about your day, out loud.' },
  { n: '02', title: 'Remember', body: 'It becomes your diary, and keeps what mattered.' },
  { n: '03', title: 'Hold', body: 'Turn your year into a printed book.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-label="How it works" className="bg-ivory pb-20 sm:pb-24">
      <Container>
        <ol className="grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="bg-paper px-7 py-9">
              <p className="text-[12px] font-semibold tabular-nums tracking-wide2 text-clay">{s.n}</p>
              <h3 className="heading mt-3 text-[19px] text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
