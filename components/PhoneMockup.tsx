import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** A plain phone frame. No tilt, no parallax — just a device holding a screen. */
export function PhoneMockup({
  children,
  className,
  width = 300,
}: {
  children: ReactNode;
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={cn('shrink-0 rounded-[38px] border border-line bg-paper p-[10px] shadow-phone', className)}
      style={{ width }}
    >
      <div className="relative overflow-hidden rounded-[30px] bg-ivory" style={{ aspectRatio: '9 / 17' }}>
        <div className="absolute left-1/2 top-2 h-[5px] w-16 -translate-x-1/2 rounded-full bg-ink/10" />
        {children}
      </div>
    </div>
  );
}
