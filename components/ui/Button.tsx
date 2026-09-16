import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'accent';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-[#39332d]',
  secondary: 'border border-line bg-paper text-ink hover:border-ink/25 hover:bg-cream',
  accent: 'bg-clay text-ivory hover:bg-[#8A4729]',
};

/** `sm` is the header CTA: small enough for a 64px bar, still a 40px target. */
const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-12 px-6 text-[15px]',
};

type Props = ComponentPropsWithoutRef<'a'> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  return (
    <a
      className={cn(
        'transition-ui inline-flex select-none items-center justify-center whitespace-nowrap rounded-pill font-medium',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
