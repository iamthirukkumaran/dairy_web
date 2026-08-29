/** The counted beats that open the recap — one number at a time, with pauses. */
export const yearCounters = [
  { value: 365, label: 'days', line: 'You lived all of them.' },
  { value: 284, label: 'memories', line: 'You told Aura about most of them.' },
  { value: 14, label: 'people', line: 'These are the ones who kept appearing.' },
  { value: 7, label: 'places', line: 'Some of them you only visited once.' },
];

/** Seven chapters, read like a photo book rather than a report. */
export const yearChapters = [
  {
    n: '01',
    kicker: 'The beginning',
    title: 'January was mostly waiting.',
    body: 'You wrote about restlessness eleven times before February. The word almost disappears after October.',
    tone: 'lavender' as const,
    quote: '“Nothing is wrong. That is somehow the problem.”',
    date: 'JAN 09',
  },
  {
    n: '02',
    kicker: 'What kept appearing',
    title: 'Long walks, and the lake at six in the morning.',
    body: 'Forty-one entries mention walking. Nine of them are the same stretch of road at the same hour.',
    tone: 'sage' as const,
    quote: '“Two herons, one very committed jogger, nobody else.”',
    date: 'AUG 04',
  },
  {
    n: '03',
    kicker: 'The people who mattered',
    title: 'Priya, Amma, Dev.',
    body: 'Not the people you saw most. The people who turned up in the entries you wrote carefully.',
    tone: 'peach' as const,
    quote: '“She was quiet for a second and then said good.”',
    date: 'AUG 17',
  },
  {
    n: '04',
    kicker: 'The hardest days',
    title: 'March, and the fortnight you barely wrote.',
    body: 'Six entries in fourteen days, all short. Aura kept them exactly as short as you left them.',
    tone: 'cream' as const,
    quote: '“Not today. Tomorrow maybe.”',
    date: 'MAR 12',
  },
  {
    n: '05',
    kicker: 'The small wins',
    title: 'Two hours of work at the end of nine weeks.',
    body: 'You called it small four separate times. You also came back to it four separate times.',
    tone: 'sun' as const,
    quote: '“Counted it anyway.”',
    date: 'AUG 11',
  },
  {
    n: '06',
    kicker: 'What changed',
    title: 'You stopped waiting for a better week.',
    body: 'The entries get longer after August, and they stop starting with an apology for not writing.',
    tone: 'peach' as const,
    quote: '“The day things finally started to feel right.”',
    date: 'AUG 26',
  },
  {
    n: '07',
    kicker: 'What you learned',
    title: 'The weeks you remember are rarely the loud ones.',
    body: 'Your own sentence, written in August, quoted back to you in December.',
    tone: 'sage' as const,
    quote: '“I want to see if it still means the same thing next month.”',
    date: 'DEC 31',
  },
];

export const yearStats = [
  { value: '284', label: 'Days remembered', note: 'You showed up more than you think.' },
  { value: '41', label: 'Moments worth keeping', note: 'The ones you starred, and the ones Aura noticed.' },
  { value: '14', label: 'People who mattered', note: 'Named in your own words, not a contact list.' },
];

export const yearThemes = [
  { name: 'Slowing down', weight: 0.92, months: 'Feb — Dec' },
  { name: 'Work', weight: 0.78, months: 'All year' },
  { name: 'Home', weight: 0.64, months: 'Mar — Sep' },
  { name: 'Long walks', weight: 0.51, months: 'Jun — Nov' },
  { name: 'Saying no', weight: 0.37, months: 'Aug — Dec' },
];
