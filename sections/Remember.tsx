import { Container } from '@/components/ui/Container';
import { todayEntry } from '@/data/memories';
import { asset } from '@/lib/utils';

const searchResults = [
  { title: 'Trip to Ooty', detail: '12 memories', image: '/images/memory-hills.jpg' },
  { title: 'The long walk with Priya', detail: '8 memories', image: '/images/people.jpg' },
  { title: 'The evening it rained', detail: '5 memories', image: '/images/memory-sunset.jpg' },
];

export function Remember() {
  return (
    <section id="remember" aria-label="What Aura keeps" className="bg-ivory py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          <div>
            <h2 className="display display-broken text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
              Remember more than
              <br />
              what happened.
              <br />
              <span className="display-accent">Remember how it felt.</span>
            </h2>
            <p className="mt-6 max-w-sm font-sans text-[16px] leading-[1.7] text-ink-soft">
              Speak, capture and keep your memories in one quiet place. With Aura, every moment
              keeps the meaning you gave it.
            </p>
          </div>

          <Collage />
        </div>
      </Container>
    </section>
  );
}

/** Three app moments, laid out the way they might fall on a desk. */
function Collage() {
  return (
    <div className="wash relative rounded-panel px-4 py-10 sm:px-8 sm:py-14">
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:items-start">
        <div className="space-y-5">
          <EntryCard />
          <PhotoCard />
        </div>
        <SearchCard />
      </div>
    </div>
  );
}

function EntryCard() {
  return (
    <article className="card p-4 shadow-card sm:rotate-[-1.5deg]">
      <header className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream text-clay">
          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M10 3a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0v-4A2.5 2.5 0 0 1 10 3Zm5 6.5a5 5 0 0 1-10 0H3.5a6.5 6.5 0 0 0 5.5 6.4V18h2v-2.1a6.5 6.5 0 0 0 5.5-6.4H15Z" />
          </svg>
        </span>
        <p className="font-sans text-[13px] font-medium text-ink">A day that turned a corner</p>
      </header>
      <p className="mt-1 font-sans text-[11px] text-ink-faint">
        {todayEntry.weekday} · {todayEntry.date}
      </p>

      <p className="mt-3 font-sans text-[12.5px] leading-[1.7] text-ink-soft">
        {todayEntry.story[0]}
      </p>

      <img
        src={asset('/images/memory-sunset.jpg')}
        alt=""
        className="mt-3 h-24 w-full rounded-[10px] object-cover"
        width={900}
        height={620}
      />

      <div className="mt-3 flex flex-wrap gap-1.5">
        {todayEntry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill border border-line bg-ivory px-2.5 py-1 font-sans text-[10px] text-ink-soft"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function PhotoCard() {
  return (
    <figure className="card p-3 shadow-card sm:ml-8 sm:rotate-[2deg]">
      <img
        src={asset('/images/memory-lake.jpg')}
        alt="A lake between dark hills at golden hour"
        className="h-28 w-full rounded-[10px] object-cover"
        width={900}
        height={620}
      />
      <figcaption className="hand mt-2 text-[17px] leading-snug">
        Some places just feel like home.
      </figcaption>
      <p className="mt-1 flex items-center gap-1 font-sans text-[10px] text-ink-faint">
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
          <path d="M10 2a5.5 5.5 0 0 1 5.5 5.5c0 4-5.5 10.5-5.5 10.5S4.5 11.5 4.5 7.5A5.5 5.5 0 0 1 10 2Zm0 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
        Ooty · 14 Dec 2025
      </p>
    </figure>
  );
}

function SearchCard() {
  return (
    <article className="card p-4 shadow-card sm:mt-10">
      <div className="flex items-center gap-2 rounded-pill border border-line bg-ivory px-3 py-2">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="9" cy="9" r="5.5" />
          <path d="m13.5 13.5 3 3" strokeLinecap="round" />
        </svg>
        <p className="font-sans text-[12px] text-ink-soft">What did I do last December?</p>
      </div>

      <ul className="mt-3 space-y-2.5">
        {searchResults.map((result) => (
          <li key={result.title} className="flex items-center gap-3">
            <img
              src={asset(result.image)}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover"
              width={600}
              height={600}
            />
            <span>
              <span className="block font-sans text-[12.5px] font-medium text-ink">
                {result.title}
              </span>
              <span className="block font-sans text-[11px] text-ink-faint">{result.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
