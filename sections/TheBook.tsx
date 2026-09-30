import { Container } from '@/components/ui/Container';
import { bookEditions, bookFlow, formatPrice } from '@/data/pricing';
import { asset } from '@/lib/utils';

export function TheBook() {
  return (
    <section id="book" aria-label="Your year as a book" className="section bg-cream/70 border-y border-line/80">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-18">
          <div>
            <span className="eyebrow text-clay">Heirloom Publishing</span>
            <h2 className="display display-broken mt-2 text-[clamp(2.1rem,5vw,2.9rem)] text-ink">
              Turn your year into a
              <br />
              <span className="italic font-normal text-clay">timeless printed book.</span>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-ink-soft">
              Typeset from your own entries, voice transcripts, and photographs. Preview and edit page by page in the app before anything is bound. Nothing prints without your review.
            </p>

            <dl className="mt-8 divide-y divide-line/80 border-y border-line/80">
              {bookEditions.map((edition) => (
                <div key={edition.id} className="py-4 flex items-start justify-between gap-4 group">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <dt className="text-[15.5px] font-medium text-ink group-hover:text-clay transition-colors">{edition.name}</dt>
                      {edition.featured ? (
                        <span className="rounded-full bg-clay/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-clay">
                          Most Loved
                        </span>
                      ) : null}
                    </div>
                    <dd className="mt-1 text-[13.5px] leading-[1.6] text-ink-soft">
                      {edition.summary}
                    </dd>
                  </div>
                  <span className="shrink-0 text-[14.5px] font-semibold tabular-nums text-ink">
                    {formatPrice(edition.price)}
                  </span>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative md:flex md:justify-center">
            <div className="relative w-full max-w-[460px] overflow-hidden rounded-panel shadow-lift border border-line">
              <img
                src={asset('/images/book.jpg')}
                alt="Hands turning the pages of a printed photo book"
                className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                width={1100}
                height={1100}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 inset-x-5 rounded-card bg-paper/95 p-4 shadow-card backdrop-blur-md border border-line/80">
                <p className="text-[11px] uppercase tracking-wide2 font-semibold text-clay">Crafted to Endure</p>
                <p className="mt-1 text-[13px] leading-snug text-ink font-serif italic">
                  “The weight of the paper, the smell of fresh ink, and the memories of an entire year in your hands.”
                </p>
                <p className="mt-2 text-[10.5px] text-ink-faint flex items-center gap-2">
                  <span>✦ 120gsm Munken cream stock</span>
                  <span>✦ Linen cloth bound</span>
                  <span>✦ Gold foil spine</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 6-Step Book Creation Journey */}
        <div className="mt-16 sm:mt-20 border-t border-line/80 pt-12 sm:pt-16">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="eyebrow text-clay">From Spoken Word to Bookshelf</span>
            <h3 className="heading mt-2 text-[22px] sm:text-[24px] text-ink">
              How your year becomes a book
            </h3>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookFlow.map((flow) => (
              <li
                key={flow.step}
                className="card card-hover p-5 border border-line bg-paper shadow-soft"
              >
                <span className="text-[12px] font-bold tabular-nums text-clay tracking-wider">{flow.step}</span>
                <h4 className="heading mt-2 text-[16px] text-ink">{flow.title}</h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{flow.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
