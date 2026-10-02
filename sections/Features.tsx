import { Container } from '@/components/ui/Container';
import { auraOutputs } from '@/data/memories';

export function Features() {
  return (
    <section aria-label="What Aura remembers" className="section bg-paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16 items-center">
          <div className="w-full max-w-xl">
            <span className="eyebrow text-clay">The Anatomy of a Day</span>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,2.8rem)] text-ink">
              Every reflection,
              <br />
              <span className="italic font-normal text-clay">faithfully kept.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-ink-soft">
              Speak freely at the close of your day. Aura turns your raw audio recordings into beautifully formatted, private journal entries—preserving the milestones, emotions, and subtle details you will love revisiting years from now.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-card border border-line bg-ivory/80 p-4 text-[13px] text-ink-soft shadow-soft">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay font-serif font-semibold">
                ✦
              </span>
              <span>Zero algorithmic bots or ghostwriting. Strictly your own authentic words, catalogued with care.</span>
            </div>
          </div>

          <dl className="divide-y divide-line rounded-card border border-line bg-ivory/40 p-4 sm:p-6 shadow-soft">
            {auraOutputs.map((card) => (
              <div
                key={card.label}
                className="grid gap-1.5 py-4 sm:grid-cols-[minmax(140px,180px)_minmax(0,1fr)] sm:gap-6 items-baseline transition-colors hover:bg-paper/70 rounded-lg px-3"
              >
                <dt className="eyebrow text-clay/90">{card.label}</dt>
                <dd className="heading text-[15.5px] leading-[1.6] text-ink sm:text-[16px]">
                  {card.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
