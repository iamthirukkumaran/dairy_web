/**
 * The spoken entry, token by token.
 *
 * `keep: false` tokens are the filler that falls away when Aura writes the
 * entry; `final` is the polished form a kept word takes. The demo animates
 * between the two states, so this array is the single source of truth for
 * both the raw transcript and the finished diary paragraph.
 */
export type Token = {
  raw: string;
  keep: boolean;
  final?: string;
  /** Starts a new paragraph in the written entry. */
  break?: boolean;
};

export const transcript: Token[] = [
  { raw: 'so', keep: false },
  { raw: 'today', keep: true, final: 'Today' },
  { raw: 'was', keep: true, final: 'was' },
  { raw: 'actually', keep: false },
  { raw: 'kind', keep: false },
  { raw: 'of', keep: false },
  { raw: 'good?', keep: true, final: 'good.' },
  { raw: 'um', keep: false },
  { raw: 'i', keep: true, final: 'I', break: true },
  { raw: 'finished', keep: true },
  { raw: 'the', keep: true },
  { raw: 'thing', keep: true },
  { raw: "i've", keep: true, final: 'I had' },
  { raw: 'been', keep: true },
  { raw: 'avoiding', keep: true },
  { raw: 'since', keep: true },
  { raw: 'june,', keep: true, final: 'June.' },
  { raw: 'and', keep: false },
  { raw: 'then', keep: false },
  { raw: 'like,', keep: false },
  { raw: 'i', keep: true, final: 'I' },
  { raw: 'walked', keep: true },
  { raw: 'home', keep: true },
  { raw: 'the', keep: true },
  { raw: 'long', keep: true },
  { raw: 'way', keep: true },
  { raw: 'instead', keep: true },
  { raw: 'of', keep: true },
  { raw: 'taking', keep: true },
  { raw: 'the', keep: true },
  { raw: 'metro,', keep: true, final: 'metro.' },
  { raw: 'yeah', keep: false },
  { raw: 'and', keep: false },
  { raw: 'priya', keep: true, final: 'Priya', break: true },
  { raw: 'said', keep: true },
  { raw: 'something', keep: true },
  { raw: 'on', keep: true },
  { raw: 'the', keep: true },
  { raw: 'stairwell', keep: true },
  { raw: 'that', keep: true },
  { raw: 'i', keep: true, final: 'I' },
  { raw: 'keep', keep: true },
  { raw: 'thinking', keep: true },
  { raw: 'about.', keep: true },
];

export const entry = {
  date: 'August 26',
  weekday: 'Wednesday',
  title: 'The day things finally started to feel right.',
  mood: 'Steady',
  themes: ['Work', 'Growth'],
  people: ['Priya'],
};
