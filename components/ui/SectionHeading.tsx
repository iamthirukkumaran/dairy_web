import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 display text-[clamp(1.9rem,4vw,2.9rem)] text-ink">{title}</h2>
      {intro ? (
        <p
          className={cn(
            'mt-4 max-w-prose font-sans text-[16px] leading-[1.65] text-ink-soft',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
