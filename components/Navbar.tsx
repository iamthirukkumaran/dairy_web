'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { Wordmark } from '@/components/Mark';
import { navLinks } from '@/data/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* The header only earns a border once there is content behind it. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* An open sheet owns the screen: no background scrolling, Escape closes it. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previous = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  /* A sheet left open across a resize would strand the desktop nav. */
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && setOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-ivory/80 backdrop-blur-md transition-colors duration-200',
        (scrolled || open) && 'border-b border-line bg-ivory/95',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <Container className="flex h-[var(--nav-height)] items-center justify-between gap-4">
        <NavLink href="/" aria-label="Aura — home" className="-my-2 flex shrink-0 items-center rounded-pill py-2">
          <Wordmark />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="transition-ui py-1.5 text-[14px] text-ink-soft hover:text-ink"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button href="#get" variant="accent" size="sm">
            Download
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="transition-ui -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-cream lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {/*
       * Absolute, not fixed: the bar's `backdrop-filter` makes it a containing
       * block for fixed descendants, which would collapse the sheet to nothing.
       * Anchored to the bottom of a bar that is itself stuck to the top of the
       * screen, this lands in the same place and cannot be caught out by it.
       */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-height))] overflow-y-auto overscroll-contain border-t border-line bg-ivory lg:hidden"
      >
        <Container className="flex flex-col pb-10 pt-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="transition-ui flex min-h-[52px] items-center border-b border-line text-[16px] text-ink-soft hover:text-ink"
            >
              {link.label}
            </NavLink>
          ))}

          <Button
            href="#get"
            variant="primary"
            size="lg"
            onClick={() => setOpen(false)}
            className="mt-8 w-full"
          >
            Download Aura
          </Button>
        </Container>
      </div>
    </header>
  );
}
