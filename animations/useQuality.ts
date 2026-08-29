'use client';

import { useEffect, useState } from 'react';
import { pickQuality, type Quality } from '@/lib/webgl';
import { useIsTouch } from '@/lib/useIsTouch';
import { useCalmMotion } from './useCalmMotion';

/**
 * How much WebGL this visitor should get. Starts at 'off' so the server and
 * the first paint always agree, and so the CSS fallback is what renders if
 * anything about this device says no.
 */
export function useQuality(): Quality {
  const { enabled } = useCalmMotion();
  const touch = useIsTouch();
  const [quality, setQuality] = useState<Quality>('off');

  useEffect(() => {
    setQuality(pickQuality({ reducedMotion: !enabled, touch }));
  }, [enabled, touch]);

  return quality;
}
