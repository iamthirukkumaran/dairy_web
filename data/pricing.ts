/**
 * Pricing is deliberately not hard-coded to final numbers.
 * `PRICE_PLACEHOLDER` renders as "From ₹___" until a real value is supplied,
 * so a CMS or config service can fill these in without a layout change.
 */
export const PRICE_PLACEHOLDER = null;

export type Price = { currency: string; amount: number | null; suffix?: string };

export function formatPrice(price: Price, fallback = '___'): string {
  if (price.amount === null) return `${price.currency}${fallback}`;
  return `${price.currency}${price.amount.toLocaleString('en-IN')}${price.suffix ?? ''}`;
}

export type Plan = {
  id: string;
  name: string;
  kind: 'subscription' | 'physical';
  price: Price;
  cadence?: string;
  summary: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Aura Free',
    kind: 'subscription',
    price: { currency: '₹', amount: 0 },
    cadence: 'forever',
    summary: 'Start talking. Keep your days.',
    features: ['Basic journaling', 'Limited AI features', 'Your memories'],
    cta: 'Start free',
  },
  {
    id: 'plus',
    name: 'Aura Plus',
    kind: 'subscription',
    price: { currency: '₹', amount: PRICE_PLACEHOLDER },
    cadence: 'per month',
    summary: 'The full memory. The whole year.',
    features: [
      'Unlimited AI journaling',
      'Long-term memory',
      'Ask My Life',
      'Advanced insights',
      'Year in Review',
      'Advanced book creation',
    ],
    cta: 'Get Aura Plus',
    featured: true,
  },
];

export const bookEditions: Plan[] = [
  {
    id: 'pdf',
    name: 'Digital PDF',
    kind: 'physical',
    price: { currency: '₹', amount: PRICE_PLACEHOLDER },
    summary: 'Your year, typeset and ready to keep or print yourself.',
    features: ['Full-year layout', 'Print-ready file', 'Instant download'],
    cta: 'Preview',
  },
  {
    id: 'softcover',
    name: 'Softcover',
    kind: 'physical',
    price: { currency: '₹', amount: PRICE_PLACEHOLDER },
    summary: 'Matte cover, uncoated paper, lies flat on a table.',
    features: ['120 – 240 pages', 'Matte laminate cover', 'Uncoated cream stock'],
    cta: 'Preview',
  },
  {
    id: 'hardcover',
    name: 'Hardcover',
    kind: 'physical',
    price: { currency: '₹', amount: PRICE_PLACEHOLDER },
    summary: 'Cloth-bound, foil-stamped, made to sit on a shelf for years.',
    features: ['Cloth binding', 'Foil-stamped spine', 'Ribbon marker'],
    cta: 'Preview',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium edition',
    kind: 'physical',
    price: { currency: '₹', amount: PRICE_PLACEHOLDER },
    summary: 'Heavier stock, printed slipcase, and a hand-finished cover.',
    features: ['Archival paper', 'Printed slipcase', 'Custom cover artwork'],
    cta: 'Preview',
  },
];

export const bookFlow = [
  { step: '01', title: 'Preview your book', detail: 'See your real entries laid out before you decide anything.' },
  { step: '02', title: 'Choose your year', detail: 'Any full year, or a season you want to keep on its own.' },
  { step: '03', title: 'Customise the cover', detail: 'Title, colour, cloth, and the artwork on the front.' },
  { step: '04', title: 'Review the pages', detail: 'Edit, reorder or remove any entry. Nothing prints unread.' },
  { step: '05', title: 'Order', detail: 'Pick softcover, hardcover or the premium edition.' },
  { step: '06', title: 'Delivered to your door', detail: 'Printed and bound, then tracked to your address.' },
];
