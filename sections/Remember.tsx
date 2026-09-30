import { Container } from '@/components/ui/Container';
import { todayEntry } from '@/data/memories';
import { asset } from '@/lib/utils';

const searchResults = [
  { title: 'Trip to Ooty', detail: '12 memories · Dec 2025', image: '/images/memory-hills.jpg' },
  { title: 'The long walk with Priya', detail: '8 memories · Aug 2025', image: '/images/people.jpg' },
  { title: 'The evening it rained', detail: '5 memories · Jul 2025', image: '/images/place.jpg' },
];

export function Remember() {
  return (
    <section id="remember" aria-label="What Aura keeps" className="section-t bg-ivory pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="max-w-md">
            <span className="eyebrow text-clay">The Private Archive</span>
            <h2 className="display display-broken mt-3 text-[clamp(2rem,5vw,2.8rem)] text-ink">
              Remember more than
              <br />
              <span className="italic font-normal text-clay">what happened.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-ink-soft sm:mt-6">
              Remember how it felt. Record voice notes or write in total peace. Aura keeps your memories in one private, encrypted vault—where every moment keeps the personal meaning you gave it, without third-party models or algorithmic feeds.
            </p>

            <div className="mt-8 space-y-3 border-t border-line/80 pt-6">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-clay">
                  ✓
                </span>
                <p className="text-[14px] leading-snug text-ink-soft">
                  <strong className="font-medium text-ink">Audio & Text Synchronized:</strong> Keep raw voice recordings alongside your transcribed text.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-clay">
                  ✓
                </span>
                <p className="text-[14px] leading-snug text-ink-soft">
                  <strong className="font-medium text-ink">Full Chronological Timeline:</strong> Instant search by date, person, place, or custom tag.
                </p>
              </div>
            </div>
          </div>

          <Collage />
        </div>
      </Container>
    </section>
  );
}

function Collage() {
  return (
    <div className="wash rounded-panel border border-line/70 p-4 sm:p-7 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
        <EntryCard />
        <div className="grid content-start gap-5">
          <SearchCard />
          <PhotoCard />
        </div>
      </div>
    </div>
  );
}

function EntryCard() {
  return (
    <article className="card card-hover p-5 shadow-card">
      <header className="flex items-center justify-between border-b border-line/70 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-clay">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M10 3a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0v-4A2.5 2.5 0 0 1 10 3Zm5 6.5a5 5 0 0 1-10 0H3.5a6.5 6.5 0 0 0 5.5 6.4V18h2v-2.1a6.5 6.5 0 0 0 5.5-6.4H15Z" />
            </svg>
          </span>
          <div>
            <p className="text-[13.5px] font-medium leading-tight text-ink">A day that turned a corner</p>
            <p className="text-[11px] text-ink-faint">
              {todayEntry.weekday} · {todayEntry.date}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-sage/10 px-2 py-0.5 text-[10px] font-medium text-sage">
          Transcribed
        </span>
      </header>

      {/* Mini Audio Player preview */}
      <div className="mt-3 flex items-center justify-between rounded-card border border-line/60 bg-ivory/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-ivory">
            <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 ml-0.5" fill="currentColor" aria-hidden="true">
              <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
            </svg>
          </span>
          <span className="text-[11px] font-medium text-ink-soft">Voice note (02:14)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-1 rounded-full bg-clay/60" />
          <span className="h-4 w-1 rounded-full bg-clay" />
          <span className="h-5 w-1 rounded-full bg-clay" />
          <span className="h-3 w-1 rounded-full bg-clay/70" />
          <span className="h-1.5 w-1 rounded-full bg-clay/40" />
        </div>
      </div>

      <div className="mt-3.5 space-y-2.5 text-[13px] leading-[1.7] text-ink-soft">
        {todayEntry.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-[12px] border border-line/60 shadow-soft">
        <img
          src={asset('/images/memory-sunset.jpg')}
          alt="Sunset over mountain ridges from the evening walk"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-105"
          width={900}
          height={620}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {todayEntry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill border border-line bg-ivory px-2.5 py-1 text-[10.5px] font-medium text-ink-soft"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function PhotoCard() {
  return (
    <figure className="card card-hover p-3.5 shadow-card">
      <div className="overflow-hidden rounded-[10px] border border-line/60">
        <img
          src={asset('/images/memory-lake.jpg')}
          alt="A lake between dark hills at golden hour"
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-105"
          width={900}
          height={620}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="mt-3 text-[13px] font-medium leading-snug text-ink">
        Some places just feel like home.
      </figcaption>
      <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-ink-faint">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-clay" fill="currentColor" aria-hidden="true">
          <path d="M10 2a5.5 5.5 0 0 1 5.5 5.5c0 4-5.5 10.5-5.5 10.5S4.5 11.5 4.5 7.5A5.5 5.5 0 0 1 10 2Zm0 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
        <span>Ooty · 14 Dec 2025</span>
      </p>
    </figure>
  );
}

function SearchCard() {
  return (
    <article className="card card-hover p-4 shadow-card">
      <div className="flex items-center gap-2 rounded-pill border border-line bg-ivory px-3 py-2 shadow-inner">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="9" cy="9" r="5.5" />
          <path d="m13.5 13.5 3 3" strokeLinecap="round" />
        </svg>
        <p className="min-w-0 truncate text-[11.5px] text-ink-soft">Search memories, places, people...</p>
      </div>

      <ul className="mt-3.5 space-y-2.5">
        {searchResults.map((result) => (
          <li key={result.title} className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-ivory">
            <img
              src={asset(result.image)}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover border border-line"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] font-medium text-ink">
                {result.title}
              </span>
              <span className="block text-[11px] text-ink-faint">{result.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
