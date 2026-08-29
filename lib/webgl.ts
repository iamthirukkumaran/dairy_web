'use client';

export type Quality = 'off' | 'low' | 'high';

let cached: boolean | null = null;

/** One cheap probe, cached — creating contexts repeatedly is expensive. */
export function supportsWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');
    cached = Boolean(gl);
    // Release it immediately; some drivers cap live contexts at ~8.
    const lose = (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context');
    lose?.loseContext();
  } catch {
    cached = false;
  }
  return cached;
}

/**
 * How much scene we can afford. Phones get the same picture with fewer
 * particles, fewer page segments and a lower pixel ratio — never a downgrade
 * in art direction, only in cost.
 */
export function pickQuality({
  reducedMotion,
  touch,
}: {
  reducedMotion: boolean;
  touch: boolean;
}): Quality {
  if (reducedMotion || !supportsWebGL()) return 'off';
  if (typeof navigator !== 'undefined') {
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    if (touch || cores <= 4 || mem <= 4) return 'low';
  }
  return touch ? 'low' : 'high';
}

/** Cap the pixel ratio: retina at 3× costs 9× the fill rate for no benefit here. */
export function pixelRatio(quality: Quality): number {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1.5);
}
