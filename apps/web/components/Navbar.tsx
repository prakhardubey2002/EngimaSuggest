 'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/components/cn';

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'How it works', href: '/#how' },
  { label: 'Resources', href: '/#resources' },
  { label: 'Company', href: '/#company' },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
        <span className="text-sm font-semibold">E</span>
      </span>
      <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
        EnigmaSuggest
      </span>
    </div>
  );
}

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) =>
            item.href === '/' ? (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-900/10 bg-white text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {mounted ? (
              <Icon
                icon={resolvedTheme === 'dark' ? 'solar:sun-2-bold' : 'solar:moon-bold'}
                className="h-4 w-4"
              />
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>
          <Link
            href="/#login"
            className="hidden text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white sm:inline-flex"
          >
            Log in
          </Link>
          <Button variant="solid" size="sm" className="h-9">
            Upload resume
          </Button>
        </div>
      </div>
    </header>
  );
}

