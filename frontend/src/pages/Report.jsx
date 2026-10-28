import { useRef, useState } from 'react'
import Icon from '../components/Icon'
import { REPORT_CATEGORIES, URGENCY_LEVELS } from '../data/content'
import { submitReport } from '../lib/api'
import { useSpamGuard } from '../lib/spam'

const inputCls = 'w-full px-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline'

export default function Report() {
  const step2 = useRef(null)
  const [cat, setCat] = useState(null)
  const [urgency, setUrgency] = useState('MEDIUM')
  const [f, setF] = useState({ name: '', email: '', location: '', description: '' })
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const [ref, setRef] = useState(null)
  const [fail, setFail] = useState('')
  const guard = useSpamGuard()
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  const pick = (id) => { setCat(id); setErr((e) => ({ ...e, cat: undefined })); setTimeout(() => step2.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80) }

  async function onSubmit(e) {
    e.preventDefault()
    const er = {}
    if (!cat) er.cat = 'Select a category.'
    if (f.description.trim().length < 20) er.description = 'Please describe the incident (at least 20 characters).'
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Enter a valid email or leave it blank.'
    setErr(er)
    if (Object.keys(er).length) return
    setBusy(true); setFail('')
    try {
      const r = await submitReport({ category: cat, urgency, reporter_name: f.name.trim() || null, reporter_email: f.email.trim() || null, location: f.location.trim() || null, description: f.description.trim() }, guard)
      setRef(r)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (x) { setFail(x.message) } finally { setBusy(false) }
  }

  if (ref) return (
    <section className="px-4 py-16 max-w-lg mx-auto text-center">
      <Icon name="verified" fill className="text-primary text-[56px]" />
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-2">Report submitted</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">Thank you. Keep this reference number to follow up.</p>
      <p className="font-metric-lg text-metric-lg text-primary mt-4">{ref}</p>
      <button onClick={() => { setRef(null); setCat(null); setF({ name: '', email: '', location: '', description: '' }); setUrgency('MEDIUM') }} className="mt-6 px-6 py-3 rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md">File another report</button>
    </section>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Public Tip Line</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Report an Incident</h1>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">In immediate danger? Call your local emergency number first. Demo site: do not submit real personal data.</p>

      <h2 className="font-headline-sm text-headline-sm text-on-surface mt-6 mb-3">Step 1 · What happened?</h2>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Category">
        {REPORT_CATEGORIES.map((c) => (
          <button type="button" key={c.id} role="radio" aria-checked={cat === c.id} onClick={() => pick(c.id)} className={`flex items-center gap-2 p-3 rounded-xl border text-left ${cat === c.id ? 'border-primary-container bg-surface-container text-primary' : 'border-outline-variant/30 bg-surface-container-low text-on-surface'}`}>
            <Icon name={c.icon} className="text-[22px]" /><span className="font-label-md text-label-md">{c.label}</span>
          </button>
        ))}
      </div>
      {err.cat && <p className="text-error font-body-sm mt-2">{err.cat}</p>}

      <div ref={step2} className="scroll-mt-20" />
      <h2 className="font-headline-sm text-headline-sm text-on-surface mt-8 mb-3">Step 2 · Details</h2>
      <div className="flex flex-col gap-3">
        <div>
          <span className="font-label-md text-label-md text-on-surface">Urgency</span>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {URGENCY_LEVELS.map((u) => (
              <button type="button" key={u} onClick={() => setUrgency(u)} aria-pressed={urgency === u} className={`py-2 rounded-lg text-[11px] font-bold tracking-wider border ${urgency === u ? (u === 'CRITICAL' ? 'bg-error text-on-error-container' : 'bg-primary-container text-on-primary') + ' border-transparent' : 'border-outline-variant text-on-surface-variant'}`}>{u}</button>
            ))}
          </div>
        </div>
        <label className="block"><span className="font-label-md text-label-md text-on-surface">Location</span><input value={f.location} onChange={set('location')} maxLength={200} placeholder="City, street or landmark" className={`${inputCls} mt-1`} /></label>
        <label className="block"><span className="font-label-md text-label-md text-on-surface">Description</span><textarea rows={6} value={f.description} onChange={set('description')} maxLength={5000} placeholder="What did you see or learn?" className={`${inputCls} mt-1`} aria-invalid={!!err.description} />{err.description && <span className="text-error font-body-sm">{err.description}</span>}</label>
        <label className="block"><span className="font-label-md text-label-md text-on-surface">Your name <span className="text-outline">(optional)</span></span><input value={f.name} onChange={set('name')} maxLength={120} className={`${inputCls} mt-1`} /></label>
        <label className="block"><span className="font-label-md text-label-md text-on-surface">Email <span className="text-outline">(optional)</span></span><input type="email" value={f.email} onChange={set('email')} maxLength={200} className={`${inputCls} mt-1`} aria-invalid={!!err.email} />{err.email && <span className="text-error font-body-sm">{err.email}</span>}</label>
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden"><label>Website<input {...guard.trapProps} /></label></div>
        {fail && <p className="text-error font-body-sm">{fail}</p>}
        <button disabled={busy} className="py-3.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-60">{busy ? 'Submitting…' : 'Submit report'}</button>
      </div>
    </form>
  )
}
