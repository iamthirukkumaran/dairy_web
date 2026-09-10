import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';

/**
 * next/link adds the deploy `basePath` to real paths; hash and mailto links
 * must stay untouched, so they render as a plain anchor.
 */
export function NavLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<'a'> & { href: string; children: ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
