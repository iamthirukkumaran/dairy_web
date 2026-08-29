'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { navLinks } from '@/data/site';
import { SoundToggle } from '@/components/SoundToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-calm',
        scrolled || open ? 'glass border-b border-ink/[0.06]' : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <Container wide className="flex h-[var(--nav-height)] items-center justify-between">
        <a
          href="#top"
          className="font-serif text-[22px] tracking-[0.2em] text-ink"
          aria-label="Aura — home"
          data-cursor="cta"
        >
          AURA
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="cta"
              className="link-underline font-sans text-[14px] text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <SoundToggle className="hidden sm:flex" />
          <Button href="#start" size="sm" arrow className="hidden sm:inline-flex">
            Get Aura
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-cursor="cta"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <span className="relative block h-[10px] w-[18px]">
              <span
                className={cn(
                  'absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-300 ease-calm',
                  open ? 'top-[4px] rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-300 ease-calm',
                  open ? 'top-[4px] -rotate-45' : 'top-[9px]',
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <Container className="flex flex-col gap-1 pb-8 pt-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  className="border-b border-ink/[0.06] py-4 font-serif text-[26px] tracking-editorial text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
              <Button href="#start" size="lg" arrow className="mt-6 w-full">
                Get Aura
              </Button>
              <div className="mt-4 flex items-center gap-2">
                <SoundToggle />
                <span className="font-sans text-[13px] text-ink-faint">Page sounds</span>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
