import { Container } from '@/components/ui/Container';
import { faqs } from '@/data/faq';

export function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="section bg-paper">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <span className="eyebrow text-clay">Clarity & Confidence</span>
          <h2 className="display mt-2 text-[clamp(2.1rem,5vw,2.9rem)] text-ink">
            Frequently asked questions.
          </h2>
          <p className="mt-3 text-[15px] text-ink-soft">
            Everything you need to know about recording, privacy, and printed editions.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line/80 border-y border-line/80 sm:mt-12">
          {faqs.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="transition-ui flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] font-medium text-ink hover:text-clay [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="transition-ui flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint group-open:rotate-180 group-open:border-clay group-open:bg-clay group-open:text-ivory motion-safe:duration-200">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-prose pb-6 pr-6 sm:pr-10 text-[14.5px] leading-[1.8] text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
