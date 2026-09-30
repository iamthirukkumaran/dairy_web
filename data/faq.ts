export type FaqItem = { q: string; a: string };

/**
 * Answers describe intended product behaviour only.
 * Nothing here claims a security or infrastructure guarantee — those lines
 * must be filled in from the shipped implementation before launch.
 */
export const faqs: FaqItem[] = [
  {
    q: 'How does Aura work?',
    a: 'You open Aura and speak freely about your day, or write by hand in the app. Aura transcribes your voice recordings accurately, organizes your reflections chronologically, and preserves the people and places that shaped your life.',
  },
  {
    q: 'Do you use AI or language models on my diary?',
    a: 'No. Aura is deliberately built with zero generative AI, synthetic ghostwriting, or model training. Your entries are pure, authentic human reflections recorded in your own words, completely private to you.',
  },
  {
    q: 'Do I have to type?',
    a: 'No. Voice recording is effortless—you can speak as if leaving a note for your future self. Pure dictation eliminates the friction of a blank page, but a full rich-text editor is always available if you prefer typing.',
  },
  {
    q: 'Can I edit my entries and audio?',
    a: 'Always. Every entry is yours to edit, expand, format, or delete at any time. You can choose to keep the original audio note alongside the text, or keep only the transcript.',
  },
  {
    q: 'Where are my memories stored?',
    a: 'Your entries and audio notes are encrypted with AES-256 at rest and TLS 1.3 in transit. They sync securely across your devices with optional biometric lock (Face ID / Fingerprint).',
  },
  {
    q: 'Can I export my diary?',
    a: 'Yes. You can export your entries anytime as clean plain text, markdown, or a beautifully typeset print-ready PDF, with no lock-in.',
  },
  {
    q: 'Can I turn my year into a printed book?',
    a: 'Yes. Any full year or custom date range can be compiled into a printed book. You can choose between softcover, cloth-bound heirloom hardcover, or collector’s slipcase, with complete page-by-page preview before ordering.',
  },
  {
    q: 'Can I delete my data?',
    a: 'Yes. You can permanently delete an individual entry, an entire season, or your entire account with immediate purge from our systems.',
  },
];
