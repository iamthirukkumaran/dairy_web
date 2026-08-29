'use client';

import { useEffect, useState } from 'react';
import { sound } from '@/lib/sound';
import { cn } from '@/lib/utils';

/** Sound is off until asked for. This is the only control that turns it on. */
export function SoundToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    sound.init();
    return sound.subscribe(setOn);
  }, []);

  return (
    <button
      type="button"
      onClick={() => sound.toggle()}
      aria-pressed={on}
      aria-label={on ? 'Turn page sounds off' : 'Turn page sounds on'}
      title={on ? 'Sound on' : 'Sound off'}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:text-ink',
        className,
      )}
      data-cursor="cta"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" strokeLinejoin="round" />
        {on ? (
          <>
            <path d="M15.6 9.6a3.4 3.4 0 0 1 0 4.8" />
            <path d="M18.2 7a7 7 0 0 1 0 10" opacity="0.55" />
          </>
        ) : (
          <path d="M16.5 10.2l3.6 3.6m0-3.6l-3.6 3.6" />
        )}
      </svg>
    </button>
  );
}
