export type FaqItem = { q: string; a: string };

/**
 * Answers describe intended product behaviour only.
 * Nothing here claims a security or infrastructure guarantee — those lines
 * must be filled in from the shipped implementation before launch.
 */
export const faqs: FaqItem[] = [
  {
    q: 'How does Aura work?',
    a: 'You open Aura and talk about your day the way you would tell a friend. Aura listens, writes the entry for you in your own voice, and keeps the parts that mattered so you can find them again later.',
  },
  {
    q: 'Do I have to type?',
    a: 'No. Speaking is the whole point — the blank page is what stops most people from keeping a diary. Typing is there if you prefer it, or if you want to add something later.',
  },
  {
    q: 'Can I speak naturally?',
    a: 'Yes. Ramble, backtrack, trail off, change the subject. Aura is built for how people actually talk, not for dictation.',
  },
  {
    q: 'Can I edit the diary?',
    a: 'Always. Every entry Aura writes is yours to rewrite, trim or delete. Your edits become the version Aura remembers.',
  },
  {
    q: 'Where are my memories stored?',
    a: 'Your entries are stored in your Aura account so they sync across your devices. The exact storage and processing details are described in full in the Privacy Policy — we only describe what the app actually does.',
  },
  {
    q: 'Can I export my diary?',
    a: 'Yes. You can export your entries as plain text so your writing is never locked inside one app.',
  },
  {
    q: 'Can I download a PDF?',
    a: 'Yes. Any year — or a shorter stretch of it — can be laid out as a typeset PDF you can keep or print yourself.',
  },
  {
    q: 'Can I print my year?',
    a: 'Yes. The PDF is print-ready, and Aura can also print and bind it for you.',
  },
  {
    q: 'Can I order a physical book?',
    a: 'Printed books are the next thing we are shipping. You can preview the full book from your own entries today, and order once printing opens in your region.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Books are printed to order, so timing depends on the edition and where you are. Exact production and shipping windows are shown before you pay — never estimated after.',
  },
  {
    q: 'Can I choose the cover?',
    a: 'Yes. Title, colour, material and the cover artwork are all yours to choose during the preview step.',
  },
  {
    q: 'Can I delete my data?',
    a: 'Yes. You can delete a single entry, a stretch of time, or your entire account and everything in it.',
  },
  {
    q: 'Can I use Aura on Android and iPhone?',
    a: 'Aura is a mobile app built for both iPhone and Android. Your memories sync to whichever one you are holding.',
  },
];
