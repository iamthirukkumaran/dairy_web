export type Spread = {
  id: string;
  kind: 'chapter' | 'entry' | 'photo' | 'reflection' | 'summary' | 'final';
  kicker?: string;
  title?: string;
  meta?: string;
  body?: string[];
  pageNumber?: string;
};

/** The six pages the book preview turns through. Mock content, real layout. */
export const spreads: Spread[] = [
  {
    id: 'chapter',
    kind: 'chapter',
    kicker: 'Chapter Eight',
    title: 'August',
    meta: 'Thirty-one days · Twenty-six remembered',
    pageNumber: '148',
  },
  {
    id: 'entry',
    kind: 'entry',
    kicker: 'August 26',
    meta: 'Wednesday',
    title: 'The day things finally started to feel right.',
    body: [
      'I finished the thing I had been avoiding since June. It took two hours. The avoiding took nine weeks.',
      'Afterwards I walked home the long way instead of taking the metro. Nothing extraordinary happened, and somehow that was exactly the point — the noise had gone quiet enough for me to notice.',
      'Priya said something on the stairwell that I keep coming back to.',
    ],
    pageNumber: '162',
  },
  {
    id: 'photo',
    kind: 'photo',
    kicker: 'August 21',
    title: 'The first proper monsoon evening.',
    meta: 'Cathedral Road, 7:40pm',
    pageNumber: '155',
  },
  {
    id: 'reflection',
    kind: 'reflection',
    kicker: 'A reflection',
    title: 'The weeks you remember are rarely the loud ones.',
    body: ['Written 26 August. Quoted back to you in December.'],
    pageNumber: '164',
  },
  {
    id: 'summary',
    kind: 'summary',
    kicker: 'Your year',
    title: 'What 2026 was made of',
    pageNumber: '288',
  },
  {
    id: 'final',
    kind: 'final',
    title: 'Your year. Preserved.',
    pageNumber: '',
  },
];

/** Cover options offered during the preview step. */
export type Cover = {
  id: string;
  title: string;
  subtitle: string;
  cloth: string;
  foil: string;
  label: string;
};

export const covers: Cover[] = [
  { id: 'aura', title: 'AURA', subtitle: 'Twenty twenty-six', cloth: '#4F6A4B', foil: '#E5C98C', label: 'Sage cloth' },
  { id: 'year', title: 'YOUR 2026', subtitle: 'A year in my life', cloth: '#BE6F4C', foil: '#F6E3C0', label: 'Clay cloth' },
  { id: 'mine', title: 'MY YEAR', subtitle: 'Written out loud', cloth: '#4A4A6A', foil: '#D8CFEA', label: 'Indigo cloth' },
  { id: 'became', title: 'THE YEAR I BECAME ME', subtitle: 'Volume one', cloth: '#2A2521', foil: '#E8C98F', label: 'Charcoal cloth' },
];
