import { Container } from '@/components/ui/Container';

const steps = [
  {
    n: '01',
    title: 'Speak or Write',
    subtitle: 'Zero friction daily capture',
    body: 'Record raw voice notes on your evening commute or write quietly whenever inspiration strikes. Audio is transcribed verbatim without generative embellishment.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-clay" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0V12a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Chronicle & Curate',
    subtitle: 'Your memories, structured',
    body: 'Entries, photographs, and voice memos are organized into an encrypted timeline. Filter by people, places, or dates in seconds—completely private, with zero AI profiling.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-clay" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Hold in Your Hands',
    subtitle: 'From screen to bookshelf',
    body: 'Turn your year of reflections into a custom printed keepsake. Review every single page, choose your archival linen cover, and receive a master-bound book at your doorstep.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-clay" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-8.25M21 11.25l-9-6-9 6m18 0v-1.5a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 9.75v1.5" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-label="How it works" className="section-b bg-ivory">
      <Container>
        <div className="mb-8 text-center sm:mb-10">
          <span className="eyebrow text-clay">The Ritual</span>
          <h2 className="display mt-2 text-[clamp(1.7rem,4vw,2.4rem)] text-ink">
            A gentle rhythm for your days.
          </h2>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-3 shadow-soft">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col bg-paper p-6 sm:p-8 lg:p-9 transition-colors hover:bg-cream/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory border border-line">
                  {s.icon}
                </span>
                <p className="text-[12px] font-semibold tabular-nums tracking-wide2 text-clay">{s.n}</p>
              </div>
              <h3 className="heading mt-5 text-[19px] text-ink sm:text-[20px]">{s.title}</h3>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-wider text-ink-faint">{s.subtitle}</p>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
