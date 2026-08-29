import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** A chapter of the page: generous vertical rhythm, optional tinted ground. */
export function Section({
  id,
  children,
  className,
  tone = 'ivory',
  label,
  clip = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'ivory' | 'cream' | 'paper' | 'none';
  label?: string;
  /** Clip decorative bleed (glows, oversized art) at the section edge.
   *  Only for sections with no sticky children. */
  clip?: boolean;
}) {
  // Translucent on purpose: StoryAtmosphere sits behind the whole page and
  // has to keep reading through, or the story cuts between worlds.
  const tones = {
    ivory: 'bg-ivory/45',
    cream: 'bg-cream/35',
    paper: 'bg-paper/60',
    none: '',
  } as const;

  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        'relative py-24 sm:py-32 lg:py-40',
        clip && 'overflow-hidden',
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
