import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { bookEditions } from '@/data/pricing';

export function TheBook() {
  return (
    <Section id="book" tone="cream" label="Your year as a book">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Turn your year into a book."
              intro="Printed from your own entries, previewed before anything is bound."
            />

            <ul className="mt-8 flex flex-wrap gap-2">
              {bookEditions.map((edition) => (
                <li
                  key={edition.id}
                  className="rounded-pill border border-line bg-paper px-3.5 py-1.5 font-sans text-[13px] text-ink-soft"
                >
                  {edition.name}
                </li>
              ))}
            </ul>
          </div>

          {/* A plain book cover, printed flat */}
          <div className="flex justify-center">
            <div className="flex h-[340px] w-[250px] flex-col items-center justify-center rounded-[4px] rounded-l-[10px] bg-[#40563D] shadow-phone">
              <p className="font-serif text-[13px] tracking-[0.24em] text-[#E5CF9F]">MY 2026</p>
              <span className="mt-3 h-px w-10 bg-[#E5CF9F]/50" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
