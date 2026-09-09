import type { ReactNode } from 'react';
import Link from 'next/link';

/**
 * next/link adds the deploy `basePath` to real paths; hash and mailto links
 * must stay untouched, so they render as a plain anchor.
 */
export function NavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
