import { BookOpen, Boxes, CheckCircle2, Layers3 } from 'lucide-react'

import { Button } from '../../../components/ui/Button'
import { cn } from '../../../utils/cn'
import { useTemplateOverview } from '../hooks/useTemplateOverview'
import { type TemplateStat } from '../types/template'

const toneClassName: Record<TemplateStat['tone'], string> = {
  blue: 'border-sky-200 bg-sky-50 text-sky-900',
  green: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  rose: 'border-rose-200 bg-rose-50 text-rose-900',
}

export function TemplateOverview() {
  const { stats, principles, isError, isLoading } = useTemplateOverview()

  if (isError) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-900">
        Template overview could not be loaded.
      </section>
    )
  }

  return (
    <section className="grid gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <Boxes className="size-4 text-sky-600" aria-hidden="true" />
          Feature-driven SPA template
        </div>

        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            React Tailwind TypeScript Template
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A practical starting point with strict typing, domain folders,
            layered data flow, Tailwind utilities, and agent-readable
            instructions built in from day one.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>Start building</Button>
          <Button variant="secondary">Read instructions</Button>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {isLoading
            ? ['Core stack', 'Styling', 'Architecture'].map((label) => (
                <div
                  className="h-24 animate-pulse rounded-lg border border-slate-200 bg-white"
                  key={label}
                />
              ))
            : stats.map((stat) => (
                <article
                  className={cn(
                    'rounded-lg border p-4 shadow-sm',
                    toneClassName[stat.tone],
                  )}
                  key={stat.label}
                >
                  <p className="text-xs font-semibold uppercase text-current">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-xl font-bold">{stat.value}</p>
                </article>
              ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <span className="flex size-10 items-center justify-center rounded-md bg-slate-950 text-white">
              <Layers3 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Included structure
              </h2>
              <p className="text-sm text-slate-500">
                Ready for agent-assisted feature work.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {principles.map((principle) => (
              <article className="flex gap-3" key={principle.title}>
                <CheckCircle2
                  className="mt-1 size-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {principle.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {principle.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
            <BookOpen className="size-4 text-slate-500" aria-hidden="true" />
            See Instruction.md and AGENTS.md before adding new features.
          </div>
        </div>
      </div>
    </section>
  )
}
