import { Container } from '@/components/ui/Container';
import { asset } from '@/lib/utils';

const nodes = [
  { title: 'People', body: 'The ones who make your story.', image: '/images/people.jpg' },
  { title: 'Places', body: 'The places that shaped you.', image: '/images/place.jpg' },
  { title: 'Memories', body: 'The moments that matter.', image: '/images/memory-lake.jpg' },
  { title: 'Moments', body: 'Your life, connected.', image: null },
];

export function Connections() {
  return (
    <section aria-label="Aura Connections" className="bg-ivory pb-20 sm:pb-24">
      <Container>
        <div className="wash rounded-panel border border-line px-6 py-12 sm:px-10 sm:py-14">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
            <div>
              <h2 className="display text-[clamp(1.6rem,3vw,2.1rem)] text-ink">Aura Connections</h2>
              <p className="mt-4 max-w-xs text-[15px] leading-[1.7] text-ink-soft">
                Your people. Your places. Your stories. All connected.
              </p>
              <a
                href="#book"
                aria-label="See how your memories connect"
                className="mt-7 flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 text-ink hover:bg-paper"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 10h13M11.5 5.5 16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="relative">
              {/* The thread that runs behind the four circles. */}
              <svg
                viewBox="0 0 800 120"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-[38px] hidden h-16 w-full text-clay/35 sm:block"
                aria-hidden="true"
              >
                <path
                  d="M40 70C140 10 200 110 300 60S460 0 560 60s140 10 200-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="1 7"
                  strokeLinecap="round"
                />
              </svg>

              <ul className="relative grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-4">
                {nodes.map((node) => (
                  <li key={node.title} className="min-w-0 text-center">
                    <span className="mx-auto block h-[84px] w-[84px] overflow-hidden rounded-full border-[3px] border-paper shadow-card">
                      {node.image ? (
                        <img
                          src={asset(node.image)}
                          alt=""
                          className="h-full w-full object-cover"
                          width={600}
                          height={600}
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-clay text-ivory">
                          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
                            <path d="M12 2.5 13.6 8 19 9.6 13.6 11.2 12 16.7 10.4 11.2 5 9.6 10.4 8 12 2.5Z" />
                            <path d="M18.5 14.5 19.3 17l2.5.8-2.5.8-.8 2.5-.8-2.5-2.5-.8 2.5-.8.8-2.5Z" opacity="0.75" />
                          </svg>
                        </span>
                      )}
                    </span>
                    <p className="mt-3 text-[14px] font-medium text-ink">{node.title}</p>
                    <p className="mt-1 text-[12px] leading-[1.5] text-ink-faint">
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
