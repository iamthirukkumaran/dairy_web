'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Every decorative animation asks this first.
 * `enabled === false` means: render the final state, skip the journey.
 *
 * The answer is deliberately `true` for the server render and the first client
 * render, and only becomes real after mount. Several components change their
 * markup on this value — a static rail instead of a scroll stack, a CSS book
 * instead of WebGL — and deciding that during hydration would mismatch the
 * server's HTML. One frame later the real preference takes over.
 */
export function useCalmMotion() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const enabled = mounted ? !reduced : true;

  return {
    enabled,
    /** Motion props that make a component static when motion is reduced. */
    still: enabled ? {} : { initial: false, animate: undefined, transition: { duration: 0 } },
  };
}
