'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { navLinks } from '@/data/site';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <Container className="flex h-[var(--nav-height)] items-center justify-between">
        <NavLink href="/" className="font-serif text-[20px] tracking-[0.18em] text-ink">
          AURA
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="font-sans text-[14px] text-ink-soft hover:text-ink"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#get" size="sm" className="hidden sm:inline-flex">
            Get the app
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </Container>

      <div id="mobile-nav" hidden={!open} className="border-t border-line lg:hidden">
        <Container className="flex flex-col py-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3.5 font-sans text-[15px] text-ink-soft"
            >
              {link.label}
            </NavLink>
          ))}
          <Button href="#get" size="md" onClick={() => setOpen(false)} className="my-4 w-full">
            Get the app
          </Button>
        </Container>
      </div>
    </header>
  );
}
