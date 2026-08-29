'use client';

import { useEffect, useState } from 'react';

/**
 * Mobile-first: returns `false` during SSR and the first paint, then the real
 * answer after mount. Callers must render the small-screen layout by default
 * so nothing shifts for phone visitors.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Tailwind's `lg` breakpoint. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
