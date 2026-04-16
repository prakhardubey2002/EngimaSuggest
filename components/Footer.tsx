import Link from 'next/link';

const links = [
  { label: 'Privacy', href: '/#privacy' },
  { label: 'Terms', href: '/#terms' },
  { label: 'Contact', href: '/#contact' },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-900/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="text-sm text-zinc-700 dark:text-zinc-300">
          © {new Date().getFullYear()} EnigmaSuggest. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

