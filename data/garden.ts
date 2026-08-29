import { seeded } from '@/lib/utils';

export type GardenLabel = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** 0–1 scroll progress at which the label fades in. */
  at: number;
};

export const gardenLabels: GardenLabel[] = [
  { id: 'family', label: 'Family', x: 16, y: 62, at: 0.24 },
  { id: 'work', label: 'Work', x: 78, y: 55, at: 0.36 },
  { id: 'travel', label: 'Travel', x: 47, y: 50, at: 0.48 },
  { id: 'friendship', label: 'Friendship', x: 26, y: 84, at: 0.6 },
  { id: 'growth', label: 'Growth', x: 60, y: 78, at: 0.72 },
  { id: 'dreams', label: 'Dreams', x: 88, y: 70, at: 0.84 },
];

export type Bloom = {
  id: number;
  x: number;
  y: number;
  scale: number;
  hue: 'peach' | 'sage' | 'lavender' | 'sun' | 'clay';
  at: number;
  glowing: boolean;
};

const hues: Bloom['hue'][] = ['peach', 'sage', 'lavender', 'sun', 'clay'];

/**
 * Deterministic bloom field — generated once at module load so server and
 * client markup match exactly. Each bloom carries the scroll progress at
 * which it should sprout.
 */
export const blooms: Bloom[] = Array.from({ length: 44 }, (_, i) => {
  const r1 = seeded(i + 1);
  const r2 = seeded(i + 91);
  const r3 = seeded(i + 313);
  const r4 = seeded(i + 707);
  // Everything grows below the horizon (~42%), and the closer to the viewer
  // the larger it reads.
  const y = 40 + r2 * 55;
  const depth = (y - 40) / 55;
  return {
    id: i,
    x: 2 + r1 * 96,
    y,
    scale: 0.3 + depth * 1.25 + r3 * 0.14,
    hue: hues[Math.floor(r4 * hues.length)],
    at: 0.08 + r1 * 0.06 + (i / 44) * 0.76,
    glowing: r3 > 0.88,
  };
});

/**
 * The people who keep appearing. Symbolic figures, not contacts — they stand
 * for memories somebody is in, which is why they are named and not listed.
 */
export const figures = [
  { id: 'f1', name: 'Amma', x: 20, y: 72, at: 0.34 },
  { id: 'f2', name: 'Priya', x: 28, y: 78, at: 0.4 },
  { id: 'f3', name: 'Dev', x: 68, y: 66, at: 0.62 },
  { id: 'f4', name: 'Ravi', x: 82, y: 86, at: 0.78 },
];

/** Trees fill in the middle distance as the years accumulate. */
export const trees = Array.from({ length: 12 }, (_, i) => {
  const r = seeded(i + 1301);
  return {
    id: i,
    x: 4 + r * 92,
    // Just below the horizon: mid-distance, and smaller than the foreground.
    y: 36 + seeded(i + 1409) * 7,
    scale: 0.45 + seeded(i + 1511) * 0.4,
    at: 0.16 + (i / 12) * 0.6,
  };
});

/**
 * Seasons the landscape passes through. Each is a wash that cross-fades over
 * the scene, so the garden communicates elapsed time rather than a filter.
 */
export const seasons = [
  { id: 'spring', label: 'Spring', at: 0.06, wash: 'rgba(228,244,222,0.30)', ground: '#A9C0A2' },
  { id: 'summer', label: 'Summer', at: 0.32, wash: 'rgba(255,236,178,0.42)', ground: '#93B58C' },
  { id: 'autumn', label: 'Autumn', at: 0.58, wash: 'rgba(240,190,132,0.52)', ground: '#B9A87A' },
  { id: 'winter', label: 'Winter', at: 0.82, wash: 'rgba(198,212,232,0.55)', ground: '#B4BFB6' },
];
