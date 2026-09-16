import { Container } from '@/components/ui/Container';
import { bookEditions } from '@/data/pricing';
import { asset } from '@/lib/utils';

export function TheBook() {
  return (
    <section id="book" aria-label="Your year as a book" className="section bg-cream">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <h2 className="display text-[clamp(1.7rem,6vw,2.3rem)] text-ink md:text-[clamp(1.7rem,3.4vw,2.3rem)]">
              Turn your year into a book.
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-[1.7] text-ink-soft">
              Printed from your own entries, previewed page by page before anything is bound.
            </p>

            {/*
             * The editions carry their own descriptions, which is what the bare
             * pills were missing — and what gives this column its height.
             */}
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {bookEditions.map((edition) => (
                <div key={edition.id} className="py-3.5">
                  <dt className="text-[15px] font-medium text-ink">{edition.name}</dt>
                  <dd className="mt-0.5 text-[13.5px] leading-[1.6] text-ink-soft">
                    {edition.summary}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:flex md:justify-center">
            <img
              src={asset('/images/book.jpg')}
              alt="Hands turning the pages of a printed photo book"
              className="aspect-square w-full max-w-[440px] rounded-panel object-cover shadow-lift"
              width={1100}
              height={1100}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
