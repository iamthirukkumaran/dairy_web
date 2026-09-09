import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { bookEditions, bookFlow } from '@/data/pricing';

export function TheBook() {
  return (
    <Section id="book" tone="paper" label="Your year as a book">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Year in review"
              title="Turn your year into a book."
              intro="At the end of the year, Aura lays your entries out as a real book — previewed from your own words before anything is printed."
            />

            <ol className="mt-8 space-y-3">
              {bookFlow.slice(0, 4).map((step) => (
                <li key={step.step} className="flex gap-3">
                  <span className="font-sans text-[12px] font-semibold tabular-nums text-clay">
                    {step.step}
                  </span>
                  <span className="font-sans text-[15px] leading-[1.6] text-ink-soft">
                    <span className="text-ink">{step.title}.</span> {step.detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* A plain book cover, printed flat */}
          <div className="flex justify-center">
            <div className="flex h-[340px] w-[250px] flex-col items-center justify-center rounded-[4px] rounded-l-[10px] bg-[#40563D] shadow-phone">
              <p className="font-serif text-[13px] tracking-[0.24em] text-[#E5CF9F]">MY 2026</p>
              <span className="mt-3 h-px w-10 bg-[#E5CF9F]/50" />
              <p className="mt-3 font-sans text-[10px] uppercase tracking-wide2 text-[#E5CF9F]/70">
                A year, remembered
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bookEditions.map((edition) => (
            <li key={edition.id} className="rounded-card border border-line bg-ivory p-5">
              <p className="font-sans text-[15px] font-medium text-ink">{edition.name}</p>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-ink-soft">
                {edition.summary}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
