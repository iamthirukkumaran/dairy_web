import { Container } from '@/components/ui/Container';
import { bookEditions } from '@/data/pricing';
import { asset } from '@/lib/utils';

export function TheBook() {
  return (
    <section id="book" aria-label="Your year as a book" className="bg-cream py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="display display-broken text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
              Turn your year
              <br />
              <span className="display-accent">into a book.</span>
            </h2>
            <p className="mt-5 max-w-sm font-sans text-[16px] leading-[1.7] text-ink-soft">
              Printed from your own entries, previewed page by page before anything is bound.
            </p>

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

            <p className="hand mt-8 text-[20px]">One year. One book. Yours.</p>
          </div>

          <div className="flex justify-center">
            <img
              src={asset('/images/book.jpg')}
              alt="Hands turning the pages of a printed photo book"
              className="w-full max-w-[440px] rounded-panel object-cover shadow-lift"
              width={1100}
              height={1100}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
