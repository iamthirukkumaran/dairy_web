import { yearStats } from '@/data/year';
import type { Spread } from '@/data/book';

/**
 * Printed-page renderer. Every page shares the same paper, margins and
 * running foot so a spread reads like one book rather than six slides.
 */
export function BookPage({ spread, side }: { spread: Spread; side: 'left' | 'right' }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-[#FCF7EC] px-[9%] py-[9%]">
      {/* Gutter shading — the page curving into the spine */}
      <div
        aria-hidden="true"
        className={
          side === 'right'
            ? 'pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-[#DFD2BC]/70 to-transparent'
            : 'pointer-events-none absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#DFD2BC]/70 to-transparent'
        }
      />
      <PageBody spread={spread} />
      <div className="mt-auto flex items-end justify-between pt-4">
        <span className="font-sans text-[7px] uppercase tracking-wide2 text-ink/30">
          {spread.kind === 'final' ? '' : 'Aura'}
        </span>
        <span className="font-sans text-[8px] tabular-nums text-ink/35">{spread.pageNumber}</span>
      </div>
    </div>
  );
}

function PageBody({ spread }: { spread: Spread }) {
  if (spread.kind === 'chapter') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="font-sans text-[7.5px] uppercase tracking-wide2 text-ink/40">{spread.kicker}</p>
        <p className="mt-3 font-serif text-[clamp(20px,4.2vw,34px)] leading-none tracking-editorial text-ink">
          {spread.title}
        </p>
        <div className="my-4 h-px w-10 bg-ink/20" />
        <p className="font-sans text-[7.5px] text-ink/45">{spread.meta}</p>
      </div>
    );
  }

  if (spread.kind === 'photo') {
    return (
      <div className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#E8E1D2]">
          <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden="true">
            <rect width="200" height="150" fill="#DCE3DA" />
            <circle cx="150" cy="42" r="18" fill="#F1DDB4" />
            <path d="M0 92 C36 78 62 88 92 84 C124 80 150 66 200 76 L200 150 L0 150 Z" fill="#AFC6A8" />
            <path d="M0 112 C40 100 78 110 116 104 C150 99 176 92 200 96 L200 150 L0 150 Z" fill="#7E9C77" />
            <g stroke="#4F6A4B" strokeWidth="1.4" opacity="0.6">
              <path d="M22 150 v-16 M30 150 v-22 M38 150 v-13 M170 150 v-18 M178 150 v-12" />
            </g>
          </svg>
        </div>
        <p className="mt-3 font-sans text-[7.5px] uppercase tracking-wide2 text-ink/40">
          {spread.kicker}
        </p>
        <p className="mt-1.5 font-serif text-[12px] leading-snug tracking-editorial text-ink">
          {spread.title}
        </p>
        <p className="mt-1 font-sans text-[7.5px] text-ink/45">{spread.meta}</p>
      </div>
    );
  }

  if (spread.kind === 'reflection') {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-sans text-[7.5px] uppercase tracking-wide2 text-ink/40">{spread.kicker}</p>
        <blockquote className="mt-4 font-serif text-[15px] leading-[1.28] tracking-editorial text-ink">
          &ldquo;{spread.title}&rdquo;
        </blockquote>
        <p className="mt-4 font-sans text-[7.5px] leading-relaxed text-ink/45">{spread.body?.[0]}</p>
      </div>
    );
  }

  if (spread.kind === 'summary') {
    return (
      <div className="flex flex-1 flex-col">
        <p className="font-sans text-[7.5px] uppercase tracking-wide2 text-ink/40">{spread.kicker}</p>
        <p className="mt-2 font-serif text-[16px] leading-tight tracking-editorial text-ink">
          {spread.title}
        </p>
        <dl className="mt-4 space-y-2.5">
          {yearStats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between border-b border-ink/10 pb-1.5">
              <dt className="font-sans text-[8px] text-ink/55">{s.label}</dt>
              <dd className="font-serif text-[13px] tabular-nums text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 space-y-1.5">
          {['Slowing down', 'Work', 'Home', 'Long walks'].map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <span className="font-sans text-[7.5px] text-ink/45">{t}</span>
              <span
                className="h-px flex-1 bg-ink/15"
                style={{ maxWidth: `${70 - i * 12}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (spread.kind === 'final') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <svg viewBox="0 0 60 60" className="h-9 w-9 opacity-40" aria-hidden="true">
          <path d="M30 54 C30 40 29 30 30 20" stroke="#6F8C69" strokeWidth="1.6" fill="none" />
          <ellipse cx="22" cy="34" rx="10" ry="4" fill="#A9C0A2" transform="rotate(-24 22 34)" />
          <ellipse cx="38" cy="26" rx="10" ry="4" fill="#8FAE88" transform="rotate(24 38 26)" />
          <circle cx="30" cy="14" r="5" fill="#F2C7A9" />
        </svg>
        <p className="mt-4 font-serif text-[14px] leading-snug tracking-editorial text-ink">
          {spread.title}
        </p>
      </div>
    );
  }

  // Diary entry
  return (
    <div className="flex flex-1 flex-col">
      <p className="font-sans text-[7.5px] uppercase tracking-wide2 text-ink/40">
        {spread.kicker} · {spread.meta}
      </p>
      <p className="mt-2.5 font-serif text-[14px] leading-[1.22] tracking-editorial text-ink">
        {spread.title}
      </p>
      <div className="mt-3 space-y-2">
        {spread.body?.map((p, i) => (
          <p key={i} className="font-sans text-[7.5px] leading-[1.75] text-ink/65">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
