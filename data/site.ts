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

/** Hrefs are absolute so the nav works from every page, not just the home page. */
export const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Your Book', href: '/#book' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Privacy', href: '/privacy' },
] as const;

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Your Book', href: '/#book' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
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
      { label: 'Privacy', href: '/privacy' },
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Terms', href: '#terms' },
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
