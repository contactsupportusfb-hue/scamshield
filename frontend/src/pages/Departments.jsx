import { useState } from 'react'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import ReportCta from '../components/ReportCta'
import { PageIntro, FilterChips, PhotoBadge, Accordion } from '../components/Cards'
import { DEPARTMENTS, DEPT_FILTERS } from '../data/pages'

export default function Departments() {
  const [filter, setFilter] = useState('All')
  const list = DEPARTMENTS.filter((d) => filter === 'All' || d.category === filter)

  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <PageIntro eyebrow="Departments" title="Specialized expertise, unified purpose.">
        Six divisions work as one Bureau, sharing intelligence, science and field teams to solve complex cases.
      </PageIntro>

      <div className="mt-5"><FilterChips options={DEPT_FILTERS} value={filter} onChange={setFilter} label="Filter divisions" /></div>

      <div className="flex flex-col gap-4 mt-5">
        {list.map((d) => (
          <article key={d.id} data-reveal className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20">
            <SmartImage name={d.image} alt={`${d.name} at work`} label={d.name} icon={d.icon} className="aspect-video">
              <PhotoBadge>{d.code}</PhotoBadge>
            </SmartImage>
            <div className="p-4">
              <span className="font-label-caps text-label-caps text-primary uppercase">{d.category}</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">{d.name}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{d.summary}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {d.stats.map((s) => <span key={s} className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/30">{s}</span>)}
              </div>
              <Accordion title="Responsibilities" className="mt-4">
                <ul className="space-y-1.5">
                  {d.duties.map((t) => <li key={t} className="font-body-sm text-body-sm text-on-surface-variant flex gap-2"><Icon name="check_circle" className="text-primary text-[16px] mt-0.5" />{t}</li>)}
                </ul>
              </Accordion>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="text-center py-10 text-on-surface-variant font-body-md">No divisions in this category.</p>}
      </div>

      <div className="mt-8"><ReportCta /></div>
    </section>
  )
}
