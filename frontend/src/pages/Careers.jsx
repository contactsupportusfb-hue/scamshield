import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import { PageIntro, SectionTitle, FilterChips, PhotoBadge, MetaRow } from '../components/Cards'
import { CAREER_WHY, TRACKS, JOBS } from '../data/pages'
import { submitApplication } from '../lib/api'
import { useSpamGuard } from '../lib/spam'

const inputCls = 'w-full px-3 py-3 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant/40 placeholder:text-outline'
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const TRACK_OPTIONS = ['All tracks', ...TRACKS.map((t) => t.title)]
const LOCATION_OPTIONS = ['All locations', ...new Set(JOBS.map((j) => j.location))]

function ApplyForm({ job }) {
  const [f, setF] = useState({ name: '', email: '', track: job.track, message: '' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')
  const [ref, setRef] = useState(null)
  const guard = useSpamGuard()
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    const er = {}
    if (f.name.trim().length < 2) er.name = 'Please enter your full name.'
    if (!emailOk(f.email)) er.email = 'Enter a valid email address.'
    if (f.message.trim().length < 20) er.message = 'Tell us a little about yourself (at least 20 characters).'
    setErr(er)
    if (Object.keys(er).length) return
    setBusy(true); setFail('')
    try {
      setRef(await submitApplication({ job_id: job.id, job_title: job.title, track: f.track, applicant_name: f.name.trim(), applicant_email: f.email.trim(), message: f.message.trim() }, guard))
    } catch (x) { setFail(x.message) } finally { setBusy(false) }
  }

  if (ref) return (
    <div className="text-center py-4">
      <Icon name="check_circle" fill className="text-primary text-[40px]" />
      <h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">Application received</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Your reference number is</p>
      <p className="font-metric-lg text-headline-sm text-primary mt-1">{ref}</p>
    </div>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 mt-4">
      {[['name', 'Full name', 'text', 120], ['email', 'Email address', 'email', 200]].map(([k, label, type, max]) => (
        <label key={k} className="block"><span className="font-label-md text-label-md text-on-surface">{label}</span>
          <input type={type} value={f[k]} onChange={set(k)} maxLength={max} className={`${inputCls} mt-1`} aria-invalid={!!err[k]} />
          {err[k] && <span className="text-error font-body-sm text-body-sm">{err[k]}</span>}
        </label>
      ))}
      <label className="block"><span className="font-label-md text-label-md text-on-surface">Track</span>
        <select value={f.track} onChange={set('track')} className={`${inputCls} mt-1`}>{TRACKS.map((t) => <option key={t.id}>{t.title}</option>)}</select>
      </label>
      <label className="block"><span className="font-label-md text-label-md text-on-surface">Why this role?</span>
        <textarea rows={4} value={f.message} onChange={set('message')} maxLength={2000} className={`${inputCls} mt-1`} aria-invalid={!!err.message} />
        {err.message && <span className="text-error font-body-sm text-body-sm">{err.message}</span>}
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden"><label>Website<input {...guard.trapProps} /></label></div>
      {fail && <p className="text-error font-body-sm">{fail}</p>}
      <button disabled={busy} className="py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-60">{busy ? 'Sending…' : 'Submit application'}</button>
    </form>
  )
}

function JobSheet({ job, onClose }) {
  const [applying, setApplying] = useState(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center" onClick={onClose} role="dialog" aria-modal="true" aria-label={job.title}>
      <div className="w-full max-w-lg max-h-[88vh] overflow-y-auto bg-surface-container rounded-t-2xl sm:rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-outline-variant mx-auto mb-4 sm:hidden" />
        <div className="flex justify-between items-start gap-3">
          <span className="font-label-caps text-label-caps text-primary uppercase">{job.track} · {job.id}</span>
          <button onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-1">{job.title}</h2>
        <div className="mt-1"><MetaRow items={[{ icon: 'location_on', text: job.location }, { icon: 'work', text: job.type }]} /></div>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">{job.summary}</p>
        {[['What you will do', job.duties], ['What you need', job.requirements]].map(([title, items]) => (
          <div key={title} className="mt-4">
            <h3 className="font-label-md text-label-md text-on-surface font-semibold">{title}</h3>
            <ul className="mt-2 space-y-1.5">{items.map((t) => <li key={t} className="font-body-sm text-body-sm text-on-surface-variant flex gap-2"><Icon name="check_circle" className="text-primary text-[16px] mt-0.5" />{t}</li>)}</ul>
          </div>
        ))}
        {applying ? <ApplyForm job={job} /> : (
          <button onClick={() => setApplying(true)} className="w-full mt-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Apply</button>
        )}
      </div>
    </div>
  )
}

export default function Careers() {
  const [track, setTrack] = useState(TRACK_OPTIONS[0])
  const [location, setLocation] = useState(LOCATION_OPTIONS[0])
  const [job, setJob] = useState(null)
  const jobs = JOBS.filter((j) => (track === TRACK_OPTIONS[0] || j.track === track) && (location === LOCATION_OPTIONS[0] || j.location === location))

  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <PageIntro eyebrow="Careers" title="Serve something larger than yourself.">
        Join investigators, analysts and engineers who protect the public every day.
      </PageIntro>

      <SmartImage name="careers-hero" alt="Bureau team members" label="Careers" icon="work" className="aspect-video rounded-xl mt-5" />

      <SectionTitle eyebrow="Why join us" title="A career with purpose." />
      <div className="flex flex-col gap-3">
        {CAREER_WHY.map((c) => (
          <div key={c.title} data-reveal className="bg-surface-container-low rounded-xl p-4 flex gap-3 border border-outline-variant/20">
            <span className="w-11 h-11 shrink-0 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center"><Icon name={c.icon} /></span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{c.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle eyebrow="Tracks" title="Find your path." />
      <div className="flex flex-col gap-4">
        {TRACKS.map((t) => (
          <article key={t.id} data-reveal className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20">
            <SmartImage name={t.image} alt={`${t.title} at work`} label={t.title} icon={t.icon} className="aspect-[4/3]">
              <PhotoBadge>Track · {t.title}</PhotoBadge>
            </SmartImage>
            <div className="p-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{t.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t.text}</p>
            </div>
          </article>
        ))}
      </div>

      <SectionTitle eyebrow="Open positions" title={`${jobs.length} role${jobs.length === 1 ? '' : 's'} available`} />
      <FilterChips options={TRACK_OPTIONS} value={track} onChange={setTrack} label="Filter by track" />
      <div className="mt-2"><FilterChips options={LOCATION_OPTIONS} value={location} onChange={setLocation} label="Filter by location" /></div>
      <div className="flex flex-col gap-3 mt-4">
        {jobs.map((j) => (
          <button key={j.id} data-reveal onClick={() => setJob(j)} className="text-left bg-surface-container-low rounded-xl p-4 border border-outline-variant/20 hover:bg-surface-container flex items-center justify-between gap-3">
            <div>
              <span className="font-label-caps text-label-caps text-primary uppercase">{j.track}</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">{j.title}</h3>
              <div className="mt-1"><MetaRow items={[{ icon: 'location_on', text: j.location }, { icon: 'work', text: j.type }]} /></div>
            </div>
            <Icon name="arrow_forward" className="text-outline" />
          </button>
        ))}
        {jobs.length === 0 && <p className="text-center py-8 text-on-surface-variant">No open roles match these filters.</p>}
      </div>

      {job && <JobSheet job={job} onClose={() => setJob(null)} />}
    </section>
  )
}
