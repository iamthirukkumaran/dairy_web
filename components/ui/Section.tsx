import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** A section of the page: even vertical rhythm, optional tinted ground. */
export function Section({
  id,
  children,
  className,
  tone = 'ivory',
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: 'ivory' | 'cream' | 'paper';
  label?: string;
}) {
  const tones = {
    ivory: 'bg-ivory',
    cream: 'bg-cream',
    paper: 'bg-paper',
  } as const;

  return (
    <section
      id={id}
      aria-label={label}
      className={cn('border-t border-line py-20 sm:py-24', tones[tone], className)}
    >
      {children}
    </section>
  );
}
