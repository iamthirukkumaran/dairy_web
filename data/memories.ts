/** The entry shown inside the phone frame. Mock content, real layout. */
export const todayEntry = {
  weekday: 'Wednesday',
  date: 'August 26',
  title: 'The day things finally started to feel right.',
  story: [
    'I finished the thing I had been avoiding since June. It took two hours. The avoiding took nine weeks.',
    'Afterwards I walked home the long way instead of taking the metro. Nothing extraordinary happened, and somehow that was exactly the point.',
  ],
  tags: ['Priya', 'Work', 'Growth'],
};

/** What one spoken entry becomes. */
export const auraOutputs = [
  { label: "Today's story", body: 'A quiet Wednesday that turned a corner.' },
  { label: 'Important moment', body: 'You said out loud that you might actually be happy where you are.' },
  { label: 'People', body: 'Priya · Amma · Dev' },
  { label: 'Themes', body: 'Work · Growth · Slowing down' },
  { label: "Tomorrow's intentions", body: 'Call home. Leave the laptop shut after eight.' },
  { label: 'Reflection', body: 'The weeks you remember are rarely the loud ones.' },
];
