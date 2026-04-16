import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export type JobCardProps = {
  title: string;
  description: string;
  tags: string[];
};

export function JobCard({ title, description, tags }: JobCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </div>
        <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="shrink-0 sm:pt-1">
        <Button variant="ghost" className="rounded-full">
          Apply <span aria-hidden>↗</span>
        </Button>
      </div>
    </Card>
  );
}

