import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-[#39332d]',
  secondary: 'border border-line bg-paper text-ink hover:bg-cream',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
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
        'inline-flex select-none items-center justify-center rounded-pill font-sans font-medium',
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
