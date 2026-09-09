import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faq';

export function Faq() {
  return (
    <Section id="faq" label="Frequently asked questions">
      <Container>
        <SectionHeading align="center" eyebrow="FAQ" title="Questions people ask." />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans text-[15px] text-ink marker:hidden">
                {item.q}
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-ink-faint group-open:hidden" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M10 4v12M4 10h12" />
                </svg>
                <svg viewBox="0 0 20 20" className="hidden h-4 w-4 shrink-0 text-ink-faint group-open:block" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 10h12" />
                </svg>
              </summary>
              <p className="max-w-prose pb-5 font-sans text-[14px] leading-[1.7] text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
