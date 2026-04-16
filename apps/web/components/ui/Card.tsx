import type { HTMLAttributes } from 'react';
import { cn } from '@/components/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-900/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950/50 dark:shadow-none',
        className,
      )}
      {...props}
    />
  );
}

