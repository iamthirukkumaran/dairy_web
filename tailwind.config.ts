import type { Config } from 'tailwindcss';

/**
 * Aura design tokens.
 * Colours are intentionally warm, paper-like and low-contrast against ivory.
 * Every value is also mirrored as a CSS custom property in styles/globals.css
 * so artwork components (SVG) can reference the same palette.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './animations/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF6EC',
        paper: '#FFFCF6',
        cream: '#F3E9DA',
        sand: '#EADCC6',
        ink: '#2A2521',
        'ink-soft': '#6B6157',
        'ink-faint': '#9A9086',
        sage: '#A9C0A2',
        'sage-deep': '#6F8C69',
        moss: '#4F6A4B',
        peach: '#F2C7A9',
        'peach-deep': '#DE9E72',
        clay: '#BE6F4C',
        sun: '#F3D693',
        'sun-deep': '#E5B65C',
        lavender: '#CBC2E0',
        'lavender-deep': '#9E93BC',
        sky: '#D8E4E6',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
        prose: '62ch',
      },
      borderRadius: {
        card: '24px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(42,37,33,0.04), 0 8px 24px -12px rgba(42,37,33,0.12)',
        lift: '0 2px 4px rgba(42,37,33,0.05), 0 20px 44px -20px rgba(42,37,33,0.22)',
        phone: '0 40px 90px -40px rgba(42,37,33,0.45), 0 8px 24px -12px rgba(42,37,33,0.18)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      letterSpacing: {
        editorial: '-0.02em',
        wide2: '0.14em',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(120px,0,0)' },
        },
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        shimmer: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        wave: {
          '0%,100%': { transform: 'scaleY(0.26)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        drift: 'drift 90s linear infinite',
        float: 'float 7s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        shimmer: 'shimmer 5s ease-in-out infinite',
        wave: 'wave 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
