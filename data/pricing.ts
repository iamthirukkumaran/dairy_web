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

/**
 * Whether a real number has been supplied. A card with no price renders a
 * plain "Pricing soon" line rather than a row of underscores, which reads as a
 * broken layout rather than as a value nobody has filled in yet.
 */
export function hasPrice(price: Price): boolean {
  return price.amount !== null;
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
    summary: 'Voice dictation and daily journaling for everyone.',
    features: [
      'Unlimited written entries',
      'Daily voice dictation notes',
      'Private encrypted cloud sync',
      'Search memories by date & keyword',
      'Export entries to plain text',
    ],
    cta: 'Start free',
  },
  {
    id: 'plus',
    name: 'Aura Plus',
    kind: 'subscription',
    price: { currency: '₹', amount: 299 },
    cadence: 'per month',
    summary: 'The complete archive with permanent audio storage and keepsake tools.',
    features: [
      'Everything in Free',
      'Permanent high-fidelity audio vault',
      'Intelligent tagging (people & places)',
      'Annual retrospective timeline',
      'Export to typeset print-ready PDF',
      '15% discount on printed books',
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
    price: { currency: '₹', amount: 499 },
    summary: 'Your year, typeset in elegant typography and ready to keep or self-print.',
    features: ['Full-year layout', 'Print-ready vector PDF', 'Instant digital download'],
    cta: 'Preview',
  },
  {
    id: 'softcover',
    name: 'Softcover Edition',
    kind: 'physical',
    price: { currency: '₹', amount: 1499 },
    summary: 'Matte laminate cover, uncoated warm cream paper, sewn to lie flat on a table.',
    features: ['120 – 240 pages', 'Matte velvet cover', 'Uncoated 120gsm cream paper'],
    cta: 'Preview',
  },
  {
    id: 'hardcover',
    name: 'Heirloom Hardcover',
    kind: 'physical',
    price: { currency: '₹', amount: 2499 },
    summary: 'Woven cloth binding, embossed metallic foil spine, and sewn ribbon marker.',
    features: ['Natural linen cloth', 'Gold foil-stamped spine', 'Silk ribbon marker'],
    cta: 'Preview',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Collector’s Slipcase',
    kind: 'physical',
    price: { currency: '₹', amount: 3999 },
    summary: 'Heavyweight archival stock, handmade custom slipcase, and personalized cover plaque.',
    features: ['160gsm archival cotton paper', 'Protective handmade slipcase', 'Custom cover embossing'],
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
