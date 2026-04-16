import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/components/cn';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = 'solid',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' ? 'h-9 px-4 text-sm' : 'h-11 px-5 text-sm',
        variant === 'solid' &&
          'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200',
        variant === 'outline' &&
          'border border-zinc-900/10 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-white/15 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900',
        variant === 'ghost' &&
          'bg-transparent text-zinc-900 hover:bg-zinc-900/5 dark:text-white dark:hover:bg-white/10',
        className,
      )}
      {...props}
    />
  );
}

