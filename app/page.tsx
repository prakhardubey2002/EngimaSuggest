import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UploadResumeCard } from '@/components/UploadResumeCard';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/components/cn';

export default function Home() {
  return (
    <div className="min-h-full">
      <Navbar />

      <main className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-28 top-8 h-[420px] w-[420px] rounded-full bg-linear-to-br from-rose-300/70 via-purple-300/50 to-amber-200/60 blur-3xl dark:from-rose-500/20 dark:via-purple-500/20 dark:to-amber-400/10" />
          <div className="absolute left-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-linear-to-br from-zinc-200/80 via-zinc-100/30 to-white/10 blur-3xl dark:from-white/10 dark:via-white/5 dark:to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <div className="flex flex-col gap-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <section>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-200 dark:shadow-none">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  Now matching resumes to jobs
                </div>

                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                  Upload your resume and get relevant jobs in minutes.
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  EnigmaSuggest parses your CV, understands your skills, and surfaces roles that
                  actually fit — no endless scrolling.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button className="h-12 rounded-2xl">Upload resume</Button>
                  <Button variant="outline" className="h-12 rounded-2xl">
                    See how it works
                  </Button>
                </div>

                <div className="mt-8">
                  <div className="text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                    Browse by category
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      'All',
                      'Development',
                      'Design',
                      'Marketing',
                      'Customer Service',
                      'Operations',
                      'Finance',
                      'Management',
                    ].map((label, idx) => (
                      <button
                        key={label}
                        className={cn(
                          'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                          idx === 0
                            ? 'border-transparent bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200'
                            : 'border-zinc-900/10 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900',
                        )}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <aside className="lg:pt-2">
                <UploadResumeCard />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-900/10 bg-white p-4 text-sm text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-200 dark:shadow-none">
                    <div className="font-semibold text-zinc-900 dark:text-white">Fast parsing</div>
                    <div className="mt-1 text-xs leading-5">
                      PDF, DOCX, images. Preview extracted text instantly.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-zinc-900/10 bg-white p-4 text-sm text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-200 dark:shadow-none">
                    <div className="font-semibold text-zinc-900 dark:text-white">AI matching</div>
                    <div className="mt-1 text-xs leading-5">
                      Coming next: rank jobs by fit using your skills.
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <section className="pt-6">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    Suggested roles
                  </h2>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    Example cards — these will become your AI-ranked results.
                  </p>
                </div>
                <Button variant="ghost" className="hidden sm:inline-flex">
                  View all
                </Button>
              </div>

              <div className="mt-6 grid gap-4">
                <JobCard
                  title="Product Designer"
                  description="Design end-to-end flows, craft delightful UI, and collaborate with engineering to ship polished experiences."
                  tags={['100% remote', 'Full-time', 'Mid-level']}
                />
                <JobCard
                  title="Engineering Manager"
                  description="Lead a product-focused team, improve delivery, and coach engineers while keeping a high quality bar."
                  tags={['Remote', 'Full-time', 'Leadership']}
                />
                <JobCard
                  title="Customer Success Manager"
                  description="Own onboarding, drive renewals, and help customers get real outcomes from the product."
                  tags={['Hybrid', 'Full-time', 'Customer']}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
