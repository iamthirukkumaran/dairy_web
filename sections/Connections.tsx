import { Container } from '@/components/ui/Container';
import { asset } from '@/lib/utils';

const nodes = [
  { title: 'People', body: 'The loved ones who shape your journey.', image: '/images/people.jpg' },
  { title: 'Places', body: 'The corners of the world that feel like home.', image: '/images/place.jpg' },
  { title: 'Memories', body: 'The quiet afternoons and golden hours.', image: '/images/memory-lake.jpg' },
  { title: 'Milestones', body: 'The turning points you never want to forget.', image: '/images/horizon.jpg' },
];

export function Connections() {
  return (
    <section aria-label="Aura Connections" className="section-b bg-ivory">
      <Container>
        <div className="wash rounded-panel border border-line/80 px-6 py-10 sm:px-10 sm:py-14 shadow-soft">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12 xl:gap-16">
            <div className="w-full max-w-md lg:max-w-lg">
              <span className="eyebrow text-clay">The Tapestry</span>
              <h2 className="display mt-2 text-[clamp(1.7rem,4vw,2.4rem)] text-ink">
                Aura Connections
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-ink-soft">
                Your people. Your places. Your stories. All woven naturally into a living personal archive that grows with you.
              </p>
              <a
                href="#book"
                className="transition-ui group mt-6 inline-flex items-center gap-2.5 text-[14px] font-medium text-ink hover:text-clay"
              >
                <span>See your year as a keepsake book</span>
                <span className="transition-ui flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 group-hover:border-clay group-hover:bg-clay group-hover:text-ivory">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            <div className="relative">
              {/* Connected thread line across nodes */}
              <svg
                viewBox="0 0 800 120"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-3 hidden h-[76px] w-full text-clay/30 sm:block"
                aria-hidden="true"
              >
                <path
                  d="M50 60 C150 10, 250 110, 350 50 S550 10, 750 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                />
              </svg>

              <ul className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
                {nodes.map((node) => (
                  <li key={node.title} className="group min-w-0 text-center">
                    <span className="mx-auto block h-[92px] w-[92px] overflow-hidden rounded-full border-4 border-paper shadow-card transition-transform duration-300 group-hover:scale-105 group-hover:border-clay/40 group-hover:shadow-lift">
                      <img
                        src={asset(node.image)}
                        alt={node.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={600}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <p className="mt-3.5 text-[15px] font-medium text-ink transition-colors group-hover:text-clay">{node.title}</p>
                    <p className="mt-1 min-h-[36px] text-balance text-[12.5px] leading-[1.5] text-ink-faint">
                      {node.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
