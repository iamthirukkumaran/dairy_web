'use client';

import { useEffect, useState } from 'react';

/**
 * True on coarse pointers. Starts false so the server and the first client
 * paint agree; pointer-only enhancements simply mount a frame later.
 */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setTouch(!mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return touch;
}
