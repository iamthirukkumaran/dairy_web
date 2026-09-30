export const site = {
  name: 'Aura',
  tagline: 'Your life, beautifully remembered.',
  supportingLine: 'Speak your thoughts. Preserve your life.',
  description:
    'Aura turns your daily reflections, voice notes, and photographs into a beautiful personal journal, completely private with zero AI, and binds your year into a timeless printed keepsake book.',
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
  { label: 'Keepsake Book', href: '/#book' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Policies', href: '/legal' },
] as const;

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Your Book', href: '/#book' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Privacy', href: '/privacy' },
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
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Refunds', href: '/legal/refunds' },
      { label: 'Shipping', href: '/legal/shipping' },
      { label: 'Cookies', href: '/legal/cookies' },
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
