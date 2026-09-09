export type FaqItem = { q: string; a: string };

/**
 * Answers describe intended product behaviour only.
 * Nothing here claims a security or infrastructure guarantee — those lines
 * must be filled in from the shipped implementation before launch.
 */
export const faqs: FaqItem[] = [
  {
    q: 'How does Aura work?',
    a: 'You open Aura and talk about your day the way you would tell a friend. Aura writes the entry for you in your own voice, and keeps the parts that mattered so you can find them again later.',
  },
  {
    q: 'Do I have to type?',
    a: 'No. Speaking is the whole point — the blank page is what stops most people from keeping a diary. Typing is there if you prefer it.',
  },
  {
    q: 'Can I edit the diary?',
    a: 'Always. Every entry Aura writes is yours to rewrite, trim or delete. Your edits become the version Aura remembers.',
  },
  {
    q: 'Where are my memories stored?',
    a: 'Your entries are stored in your Aura account so they sync across your devices. The exact storage and processing details are described in full in the Privacy Policy.',
  },
  {
    q: 'Can I export my diary?',
    a: 'Yes. You can export your entries as plain text or a typeset PDF, so your writing is never locked inside one app.',
  },
  {
    q: 'Can I print my year?',
    a: 'Yes. Any year can be laid out as a print-ready book, and Aura can print and bind it for you.',
  },
  {
    q: 'Can I delete my data?',
    a: 'Yes. You can delete a single entry, a stretch of time, or your entire account and everything in it.',
  },
];
