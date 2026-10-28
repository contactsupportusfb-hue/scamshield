import Icon from './Icon'
import { PageIntro } from './Cards'

export default function LegalPage({ doc }) {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <PageIntro eyebrow="Legal" title={doc.title} />
      <p className="font-label-sm text-label-sm text-outline mt-2 flex items-center gap-1"><Icon name="calendar_today" className="text-[14px]" />Last updated {doc.updated}</p>

      <div className="mt-5 rounded-xl p-4 border border-primary-container/40 bg-primary-container/10 flex gap-3">
        <Icon name="info" className="text-primary" />
        <p className="font-body-sm text-body-sm text-on-surface">{doc.notice}</p>
      </div>

      <nav aria-label="Contents" className="mt-5 bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
        <h2 className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Contents</h2>
        <ol className="mt-2 space-y-1.5">
          {doc.sections.map((s, i) => (
            <li key={s.id}><a href={`#${s.id}`} className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary">{i + 1}. {s.title}</a></li>
          ))}
        </ol>
      </nav>

      <div className="flex flex-col gap-3 mt-5">
        {doc.sections.map((s, i) => (
          <article key={s.id} id={s.id} data-reveal="up" className="scroll-mt-20 bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold"><span className="text-primary">{i + 1}.</span> {s.title}</h2>
            {s.body.map((p) => <p key={p} className="font-body-sm text-body-sm text-on-surface-variant mt-2">{p}</p>)}
          </article>
        ))}
      </div>
    </section>
  )
}
