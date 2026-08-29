export const site = {
  name: 'Aura',
  tagline: 'Your life, beautifully remembered.',
  supportingLine: "Talk about your day. We'll remember the rest.",
  description:
    'Aura turns the stories you tell about your day into a beautiful personal diary, helps you rediscover your memories, and lets you turn your year into a book.',
  url: 'https://aura.app',
  year: 2026,
  /** Wire these to the real store listings before launch. */
  links: {
    ios: '#ios',
    android: '#android',
    contact: 'mailto:hello@aura.app',
  },
} as const;

export const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Memories', href: '#memories' },
  { label: 'Your Book', href: '#book' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Pricing', href: '#pricing' },
] as const;

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Memories', href: '#memories' },
      { label: 'Your Book', href: '#book' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: 'mailto:hello@aura.app' },
      { label: 'Help', href: '#help' },
    ],
  },
  {
    title: 'Privacy',
    links: [
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Data & AI', href: '#privacy' },
    ],
  },
  {
    title: 'App',
    links: [
      { label: 'iOS', href: '#ios' },
      { label: 'Android', href: '#android' },
    ],
  },
] as const;
