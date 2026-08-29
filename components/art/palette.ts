/** Shared artwork palette. Keep in sync with styles/globals.css. */
export const art = {
  ivory: '#FBF6EC',
  paper: '#FFFCF6',
  cream: '#F3E9DA',
  sand: '#EADCC6',
  ink: '#2A2521',
  sage: '#A9C0A2',
  sageDeep: '#6F8C69',
  moss: '#4F6A4B',
  mossDark: '#3E5540',
  peach: '#F2C7A9',
  peachDeep: '#DE9E72',
  clay: '#BE6F4C',
  sun: '#F3D693',
  sunDeep: '#E5B65C',
  lavender: '#CBC2E0',
  lavenderDeep: '#9E93BC',
  sky: '#D8E4E6',
} as const;

export type Hue = 'peach' | 'sage' | 'lavender' | 'sun' | 'clay' | 'cream';

export const hueFill: Record<Hue, { petal: string; center: string }> = {
  peach: { petal: art.peach, center: art.clay },
  sage: { petal: art.sage, center: art.sageDeep },
  lavender: { petal: art.lavender, center: art.lavenderDeep },
  sun: { petal: art.sun, center: art.sunDeep },
  clay: { petal: art.peachDeep, center: art.clay },
  cream: { petal: art.cream, center: art.sand },
};

/** Card surface tints used across memory / output cards. */
export const toneSurface: Record<string, string> = {
  peach: 'bg-[#FBEADD] border-[#E7C7AC]',
  sage: 'bg-[#E9F0E5] border-[#C3D5BD]',
  lavender: 'bg-[#EDEAF5] border-[#CFC7E1]',
  cream: 'bg-[#F7EFE1] border-[#E3D3B9]',
  sun: 'bg-[#FAEFD3] border-[#EBD69F]',
};
