import type { Config } from 'tailwindcss';

/**
 * Aura design tokens — deliberately small.
 * Warm paper ground, one ink scale, one accent. No decorative animation.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sections/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F0',
        paper: '#FFFFFF',
        cream: '#F4EEE4',
        line: '#E7E0D4',
        ink: '#221F1C',
        'ink-soft': '#635C53',
        'ink-faint': '#968F85',
        clay: '#B4643F',
        sage: '#6F8C69',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'Bradley Hand', 'Segoe Script', 'cursive'],
      },
      maxWidth: {
        content: '1120px',
        prose: '62ch',
      },
      borderRadius: {
        card: '18px',
        panel: '28px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(34,31,28,0.04)',
        card: '0 18px 40px -28px rgba(34,31,28,0.30)',
        lift: '0 30px 70px -40px rgba(34,31,28,0.40)',
        phone: '0 24px 60px -30px rgba(34,31,28,0.35)',
      },
      letterSpacing: {
        editorial: '-0.02em',
        wide2: '0.12em',
      },
    },
  },
  plugins: [],
};

export default config;
