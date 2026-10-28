import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import { PageIntro, FilterChips, PhotoBadge, MetaRow, FictionNote } from '../components/Cards'
import { WANTED, CASES } from '../data/pages'

const TABS = ['Most Wanted', 'Active Cases']
const STATUS_CLS = {
  Open: 'bg-primary-container text-on-primary',
  'Under review': 'border border-primary-container text-primary',
  Closed: 'bg-surface-bright text-on-surface-variant',
}

// Generic silhouette: never a real face.
function Silhouette() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <rect width="200" height="200" fill="#151b2c" />
      <path d="M0 40H200M0 80H200M0 120H200M0 160H200" stroke="#e8b33a" strokeOpacity="0.08" />
      <circle cx="100" cy="78" r="34" fill="#2f3446" />
      <path d="M38 200c4-46 30-72 62-72s58 26 62 72z" fill="#2f3446" />
    </svg>
  )
}

export default function Investigations() {
  const [tab, setTab] = useState(TABS[0])
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const cases = CASES.filter((c) => !term || [c.id, c.title, c.division, c.status, c.summary].some((v) => v.toLowerCase().includes(term)))

  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <PageIntro eyebrow="Investigations" title="Cases that matter, handled with care.">
        Help us find people wanted for serious crimes, and follow the progress of active cases.
      </PageIntro>

      <SmartImage name="investigations-hero" alt="Investigators reviewing case files" label="Investigations" icon="search" className="aspect-video rounded-xl mt-5" />

      <div className="mt-5"><FilterChips options={TABS} value={tab} onChange={setTab} label="Investigation views" /></div>

      {tab === 'Most Wanted' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {WANTED.map((w) => (
            <article key={w.ref} data-reveal className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20">
              <div className="relative aspect-square"><Silhouette /><PhotoBadge>Wanted · {w.ref}</PhotoBadge></div>
              <div className="p-4">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{w.name}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1"><span className="text-on-surface">Charges:</span> {w.charges}</p>
                <div className="mt-2"><MetaRow items={[{ icon: 'location_on', text: `Last seen ${w.lastSeen}` }]} /></div>
                <p className="mt-3 font-label-caps text-label-caps text-on-surface-variant uppercase">Reward up to</p>
                <p className="font-metric-lg text-headline-md text-primary">{w.reward}</p>
                <Link to="/report" className="block text-center mt-3 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Submit a tip</Link>
                <FictionNote />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <>
          <div className="relative mt-5">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cases" aria-label="Search cases" className="w-full pl-10 pr-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline" />
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {cases.map((c) => (
              <article key={c.id} data-reveal className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label-sm text-label-sm text-outline">{c.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider ${STATUS_CLS[c.status]}`}>{c.status}</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">{c.title}</h2>
                <div className="mt-1"><MetaRow items={[{ icon: 'calendar_today', text: c.date }, { icon: 'sell', text: c.division }]} /></div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{c.summary}</p>
              </article>
            ))}
            {cases.length === 0 && <p className="text-center py-8 text-on-surface-variant">No cases match “{q}”.</p>}
          </div>
        </>
      )}
    </section>
  )
}
