import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import { FilterChips, PhotoBadge, MetaRow, FictionNote } from '../components/Cards'
import { ARRESTS, ARREST_FILTERS } from '../data/content'

export default function Arrests() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const list = ARRESTS.filter((a) => filter === 'All' || a.category === filter)
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Public Records</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Arrest Reports</h1>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Recent arrests announced by the Bureau. All records are fictional demo content.</p>
      <div className="mt-5"><FilterChips options={ARREST_FILTERS} value={filter} onChange={(f) => { setFilter(f); setOpen(null) }} label="Filter arrests" /></div>
      <div className="flex flex-col gap-4 mt-5">
        {list.map((a) => {
          const isOpen = open === a.ref
          return (
            <article key={a.ref} data-reveal className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20">
              <SmartImage name={a.image} alt={a.title} label={a.title} icon="gavel" className="aspect-video">
                <PhotoBadge>Arrest · {a.ref}</PhotoBadge>
              </SmartImage>
              <div className="p-4">
                <MetaRow items={[{ icon: 'calendar_today', text: a.date }, { icon: 'location_on', text: a.location }, { icon: 'sell', text: a.category }]} />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">{a.title}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{a.summary}</p>
                <button onClick={() => setOpen(isOpen ? null : a.ref)} aria-expanded={isOpen} className="mt-3 flex items-center gap-1 text-primary font-label-md text-label-md font-semibold">
                  {isOpen ? 'Hide details' : 'View details'}<Icon name={isOpen ? 'expand_less' : 'expand_more'} className="text-[20px]" />
                </button>
                {isOpen && <ul className="mt-2 space-y-1.5 border-t border-outline-variant/30 pt-3">{a.details.map((d) => <li key={d} className="font-body-sm text-body-sm text-on-surface-variant flex gap-2"><Icon name="check_circle" className="text-primary text-[16px] mt-0.5" />{d}</li>)}</ul>}
                <FictionNote />
              </div>
            </article>
          )
        })}
        {list.length === 0 && <p className="text-center py-10 text-on-surface-variant font-body-md">No records in this category.</p>}
      </div>
      <div data-reveal="pop" className="bg-surface-container-low rounded-xl p-6 text-center mt-8">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Know something?</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Help us close more cases.</p>
        <Link to="/report" className="inline-block mt-4 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">File a Tip</Link>
      </div>
    </section>
  )
}
