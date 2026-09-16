import { Container } from '@/components/ui/Container';
import { faqs } from '@/data/faq';

export function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="section bg-paper">
      <Container>
        <h2 className="display mx-auto max-w-2xl text-center text-[clamp(1.7rem,6vw,2.3rem)] text-ink sm:text-[clamp(1.7rem,3.4vw,2.3rem)]">
          Questions.
        </h2>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line border-y border-line sm:mt-12">
          {faqs.map((item) => (
            <details key={item.q} className="group">
              {/*
               * `list-none` covers Firefox and Chrome; the pseudo-element rule
               * is what removes the disclosure triangle in Safari.
               */}
              <summary className="transition-ui flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] text-ink hover:text-clay [&::-webkit-details-marker]:hidden sm:text-[16px]">
                {item.q}
                <span className="transition-ui flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint group-open:rotate-180 group-open:border-clay/40 group-open:text-clay motion-safe:duration-200">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-prose pb-6 pr-10 text-[14.5px] leading-[1.75] text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
