import type { Metadata, Viewport } from 'next';
import { Caveat, Fraunces, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { site } from '@/data/site';

/** Metadata URLs are not rewritten by `basePath`, so prefix them by hand. */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

/** Used only for the short margin notes written alongside the page. */
const hand = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hand',
  weight: ['500', '600'],
});

export const viewport: Viewport = {
  themeColor: '#FBF7F0',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aura — Your Life, Beautifully Remembered',
    template: '%s — Aura',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'voice journal',
    'AI diary',
    'personal memory app',
    'year in review book',
    'printed journal',
    'daily journaling app',
  ],
  alternates: { canonical: '/' },
  // Served as a plain static asset from /public: Next's generated icon route
  // 404s under `next start` in this version, which would ship no favicon.
  icons: {
    icon: [{ url: `${base}/icon.svg`, type: 'image/svg+xml' }],
    shortcut: [{ url: `${base}/icon.svg`, type: 'image/svg+xml' }],
    apple: [{ url: `${base}/icon.svg` }],
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: 'Aura — Your Life, Beautifully Remembered',
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura — Your Life, Beautifully Remembered',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'lifestyle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
