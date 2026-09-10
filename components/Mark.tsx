import { cn } from '@/lib/utils';

/** The Aura mark: a single leaf, drawn once and reused at every size. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('h-6 w-6', className)} fill="none" aria-hidden="true">
      <path
        d="M12 21c-5-2.4-7.6-6-7.6-10.2C4.4 7 6.6 4.4 10 3.4c-.6 2 .2 3.6 1.6 4.8 2 1.7 3 3 3 5"
        fill="currentColor"
        opacity="0.28"
      />
      <path
        d="M12 21c5-2.4 7.6-6 7.6-10.2 0-3.8-2.2-6.4-5.6-7.4.6 2-.2 3.6-1.6 4.8-2 1.7-3 3-3 5"
        fill="currentColor"
        opacity="0.6"
      />
      <path d="M12 21v-8.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** The wordmark, mark and name together. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Mark className="h-6 w-6 text-clay" />
      <span className="font-serif text-[21px] tracking-editorial text-ink">Aura</span>
    </span>
  );
}
