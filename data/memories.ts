export type Tone = 'peach' | 'sage' | 'lavender' | 'cream' | 'sun';

export type Memory = {
  id: string;
  date: string;
  longDate: string;
  weekday: string;
  title: string;
  excerpt: string;
  /** Full entry, revealed when a card opens into a page. */
  story: string[];
  tone: Tone;
  mood: string;
  people: string[];
  tags: string[];
  /** Which botanical mark is printed on the card. */
  botanical: number;
};

/** Mock content. Swap for CMS/API records without touching layout. */
export const memories: Memory[] = [
  {
    id: 'aug-26',
    date: 'AUG 26',
    longDate: 'August 26, 2026',
    weekday: 'Wednesday',
    title: 'The day things finally started to feel right.',
    excerpt:
      'I walked home the long way for once. Nothing extraordinary happened, and somehow that was the point.',
    story: [
      'I finished the thing I had been avoiding since June. It took two hours. The avoiding took nine weeks.',
      'Afterwards I walked home the long way instead of taking the metro. The light was doing that thing it does in late August, going gold about twenty minutes before you expect it.',
      'Nothing extraordinary happened, and somehow that was exactly the point — the noise had gone quiet enough for me to notice.',
      'Priya said something on the stairwell that I keep coming back to. I am not going to write it down properly yet. I want to see if it still means the same thing next month.',
    ],
    tone: 'peach',
    mood: 'Steady',
    people: ['Priya'],
    tags: ['Growth', 'Work'],
    botanical: 0,
  },
  {
    id: 'aug-25',
    date: 'AUG 25',
    longDate: 'August 25, 2026',
    weekday: 'Tuesday',
    title: 'The walk home.',
    excerpt:
      'Ten minutes on the stairwell turned into something honest. She said the thing I had been circling for weeks.',
    story: [
      'Ten minutes on the stairwell with Priya turned into something honest, which is not what stairwells are usually for.',
      'She said the thing I had been circling for weeks, except she said it in one sentence and it took me about four seconds to stop arguing with it.',
      'Walked the rest of the way home instead of waiting for the lift.',
    ],
    tone: 'sage',
    mood: 'Open',
    people: ['Priya'],
    tags: ['Friendship'],
    botanical: 1,
  },
  {
    id: 'aug-21',
    date: 'AUG 21',
    longDate: 'August 21, 2026',
    weekday: 'Friday',
    title: 'Rain, and the whole street smelled like beginnings.',
    excerpt:
      'The first proper monsoon evening. We stood under the awning until it passed and nobody checked their phone.',
    story: [
      'The first proper monsoon evening. It came down hard enough that the whole road went quiet underneath it.',
      'We stood under the awning outside the bakery until it passed. Nobody checked their phone the entire time, which I only noticed afterwards.',
      'The street smelled like wet dust and something sweet, the way it does exactly twice a year.',
    ],
    tone: 'lavender',
    mood: 'Light',
    people: ['Dev', 'Priya'],
    tags: ['Travel', 'Friendship'],
    botanical: 2,
  },
  {
    id: 'aug-17',
    date: 'AUG 17',
    longDate: 'August 17, 2026',
    weekday: 'Monday',
    title: "The call I didn't expect.",
    excerpt:
      "She was quiet for a second and then said 'good'. I have been carrying that one word around all week.",
    story: [
      'Told Amma about the new plan, finally, after rehearsing it in my head for most of the month.',
      "She was quiet for a second — the specific quiet where you cannot tell which way it is going to go — and then said 'good'.",
      'I have been carrying that one word around all week like something in a coat pocket.',
    ],
    tone: 'sun',
    mood: 'Relieved',
    people: ['Amma'],
    tags: ['Family'],
    botanical: 0,
  },
  {
    id: 'aug-11',
    date: 'AUG 11',
    longDate: 'August 11, 2026',
    weekday: 'Tuesday',
    title: 'The small win.',
    excerpt: 'Shipped the thing I had been avoiding since June. It took two hours. The avoiding took nine weeks.',
    story: [
      'Shipped it. Two hours of actual work at the end of nine weeks of not doing two hours of work.',
      'Sat there afterwards feeling less triumphant than I expected and more like something had loosened.',
      'Counted it anyway.',
    ],
    tone: 'cream',
    mood: 'Lighter',
    people: [],
    tags: ['Work', 'Growth'],
    botanical: 1,
  },
  {
    id: 'aug-04',
    date: 'AUG 04',
    longDate: 'August 4, 2026',
    weekday: 'Tuesday',
    title: 'The morning walk is becoming a habit.',
    excerpt: 'Six days in a row now. The lake is different at 6am — mist sitting on it like it is waiting.',
    story: [
      'Six days in a row now, which is the longest I have kept anything going this year.',
      'The lake is a completely different object at 6am. Mist sitting flat on it, like it is waiting for something to be decided.',
      'Two herons, one very committed jogger, nobody else.',
    ],
    tone: 'sage',
    mood: 'Quiet',
    people: [],
    tags: ['Growth', 'Dreams'],
    botanical: 2,
  },
];

/** Cards that Aura writes from a single spoken entry (Section 3). */
export const auraOutputs = [
  {
    label: "Today's story",
    tone: 'cream' as const,
    body: 'A quiet Wednesday that turned a corner. You walked home the long way and let the week settle.',
  },
  {
    label: 'Important moment',
    tone: 'peach' as const,
    body: 'You said out loud, for the first time, that you might actually be happy where you are.',
  },
  { label: 'People', tone: 'sage' as const, body: 'Priya · Amma · Dev' },
  { label: 'Themes', tone: 'lavender' as const, body: 'Work · Growth · Slowing down' },
  {
    label: "Tomorrow's intentions",
    tone: 'sun' as const,
    body: 'Call home. Leave the laptop shut after eight.',
  },
  { label: 'Reflection', tone: 'cream' as const, body: 'The weeks you remember are rarely the loud ones.' },
];
