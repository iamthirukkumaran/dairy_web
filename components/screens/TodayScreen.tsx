import { todayEntry } from '@/data/memories';

/** A still of the app's diary screen: one written entry, the way Aura keeps it. */
export function TodayScreen() {
  return (
    <div className="flex h-full flex-col px-5 pb-6 pt-9 text-left">
      <p className="eyebrow">
        {todayEntry.weekday} · {todayEntry.date}
      </p>
      <h3 className="mt-2 font-serif text-[19px] leading-snug tracking-editorial text-ink">
        {todayEntry.title}
      </h3>

      <div className="mt-4 space-y-3 font-sans text-[12px] leading-[1.7] text-ink-soft">
        {todayEntry.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {todayEntry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill border border-line bg-paper px-2.5 py-1 font-sans text-[10px] text-ink-soft"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3 rounded-card border border-line bg-paper p-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay text-ivory">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V22h2v-3.08A7 7 0 0 0 19 12h-2Z" />
          </svg>
        </span>
        <span className="font-sans text-[12px] text-ink-soft">Hold to talk about today</span>
      </div>
    </div>
  );
}
