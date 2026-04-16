'use client';

import { useId, useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/components/cn';

type ParseResponse =
  | {
      filename: string;
      mimetype: string;
      size: number;
      text: string;
      pages?: Array<{ pageNum: number; textItemsCount: number }>;
    }
  | { error: string; message?: string };

const ACCEPT =
  '.pdf,.docx,.txt,.tex,.latex,image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain';

export function UploadResumeCard() {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ParseResponse | null>(null);

  const helper = useMemo(() => {
    if (!file) return 'PDF, DOCX, TXT, images. Max 25MB.';
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return `${file.name} • ${sizeMb}MB`;
  }, [file]);

  async function onSubmit() {
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/parse', { method: 'POST', body: form });
      const json = (await res.json()) as ParseResponse;

      if (!res.ok) {
        const msg =
          'error' in json
            ? `${json.error}${json.message ? `: ${json.message}` : ''}`
            : 'Upload failed.';
        setError(msg);
        return;
      }

      setResult(json);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
            Upload your CV/Resume
          </div>
          <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            We’ll parse it and recommend roles that match your profile.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200">
          Private by default
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <label
          htmlFor={inputId}
          className={cn(
            'group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-zinc-900/15 bg-white px-4 py-4 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900',
            busy && 'pointer-events-none opacity-70',
          )}
        >
          <div className="min-w-0">
            <div className="font-medium text-zinc-900 dark:text-white">
              {file ? 'Ready to upload' : 'Choose a file'}
            </div>
            <div className="mt-0.5 truncate text-xs text-zinc-700 dark:text-zinc-300">
              {helper}
            </div>
          </div>
          <div className="shrink-0 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white transition-colors group-hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-200">
            Browse
          </div>
        </label>

        <input
          id={inputId}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
        />

        <Button
          onClick={onSubmit}
          disabled={!file || busy}
          className="h-12 rounded-2xl"
        >
          {busy ? 'Uploading…' : 'Upload & parse'}
        </Button>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {'text' in (result ?? {}) ? (
        <div className="mt-4 rounded-2xl border border-zinc-900/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-medium text-zinc-900 dark:text-white">
              Parsed preview
            </div>
            <div className="text-xs text-zinc-700 dark:text-zinc-300">
              {Math.min((result as any).text.length, 2000).toLocaleString()} chars shown
            </div>
          </div>
          <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-zinc-50 p-3 text-xs leading-5 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            {(result as any).text.slice(0, 2000)}
          </pre>
        </div>
      ) : null}
    </Card>
  );
}

