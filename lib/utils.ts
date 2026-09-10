export type ClassValue = string | number | null | false | undefined | ClassValue[];

/** Tiny classnames helper — avoids a dependency for what is four lines of code. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(' ');
}

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export function seeded(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Static assets under /public are not rewritten by `basePath`, so plain
 * `<img src>` values have to be prefixed by hand the way metadata URLs are.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
