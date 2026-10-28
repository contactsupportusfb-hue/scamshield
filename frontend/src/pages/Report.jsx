import { useRef, useState } from 'react'
import Icon from '../components/Icon'
import SignInGate from '../components/SignInGate'
import { REPORT_CATEGORIES, URGENCY_LEVELS } from '../data/content'
import { submitReport } from '../lib/api'

const inputCls = 'w-full px-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline [color-scheme:dark]'
const EMPTY = { name: '', email: '', location: '', description: '', started: '', ended: '' }
const toIso = (v) => (v ? new Date(v).toISOString() : null)

function ReportForm({ user }) {
  const step2 = useRef(null)
  const [cat, setCat] = useState(null)
  const [urgency, setUrgency] = useState('MEDIUM')
  const [f, setF] = useState(EMPTY)
  const [coords, setCoords] = useState(null)
  const [geo, setGeo] = useState('')
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const [ref, setRef] = useState(null)
  const [fail, setFail] = useState('')
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  const pick = (id) => { setCat(id); setErr((e) => ({ ...e, cat: undefined })); setTimeout(() => step2.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80) }

  function shareLocation() {
    if (!navigator.geolocation) { setGeo('Your browser cannot share its location.'); return }
    setGeo('Finding your location…')
    navigator.geolocation.getCurrentPosition(
      (p) => { setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }); setGeo(`Location attached (accurate to about ${Math.round(p.coords.accuracy)} m).`) },
      () => setGeo('Location was not shared. You can still type it above.'),
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  async function onSubmit(e) {
    e.preventDefault()
    const er = {}
    if (!cat) er.cat = 'Select a category.'
    if (f.description.trim().length < 20) er.description = 'Please describe the incident (at least 20 characters).'
    if (!user && f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Enter a valid email or leave it blank.'
    if (f.started && f.ended && new Date(f.ended) < new Date(f.started)) er.ended = 'The end time must be after the start time.'
    setErr(er)
    if (Object.keys(er).length) return
    setBusy(true); setFail('')
    try {
      const r = await submitReport({
        category: cat,
        urgency,
        reporter_name: user ? null : f.name.trim() || null,
        reporter_email: user ? null : f.email.trim() || null,
        location: f.location.trim() || null,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        started_at: toIso(f.started),
        ended_at: toIso(f.ended),
        description: f.description.trim(),
      })
      setRef(r)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (x) { setFail(x.message) } finally { setBusy(false) }
  }

  if (ref) return (
    <div className="py-10 text-center">
      <Icon name="verified" fill className="text-primary text-[56px]" />
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-2">Report submitted</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">Thank you. Keep this reference number to follow up.</p>
      <p className="font-metric-lg text-metric-lg text-primary mt-4">{ref}</p>
      <button onClick={() => { setRef(null); setCat(null); setF(EMPTY); setCoords(null); setGeo(''); setUrgency('MEDIUM') }} className="mt-6 px-6 py-3 rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md">File another report</button>
    </div>
  )

  return (
    <form onSubmit={onSubmit} noValidate>
      <h2 className="font-headline-sm text-headline-sm text-on-surface mt-2 mb-3">Step 1 · What happened?</h2>
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

        <fieldset>
          <legend className="font-label-md text-label-md text-on-surface">When did it happen? <span className="text-outline">(optional)</span></legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            <label className="block"><span className="font-body-sm text-body-sm text-on-surface-variant">Started</span><input type="datetime-local" value={f.started} onChange={set('started')} className={`${inputCls} mt-1`} /></label>
            <label className="block"><span className="font-body-sm text-body-sm text-on-surface-variant">Ended <span className="text-outline">(blank if ongoing)</span></span><input type="datetime-local" value={f.ended} onChange={set('ended')} min={f.started || undefined} className={`${inputCls} mt-1`} aria-invalid={!!err.ended} /></label>
          </div>
          {err.ended && <span className="text-error font-body-sm">{err.ended}</span>}
        </fieldset>

        <div>
          <label className="block"><span className="font-label-md text-label-md text-on-surface">Location <span className="text-outline">(optional)</span></span><input value={f.location} onChange={set('location')} maxLength={200} placeholder="City, street or landmark" className={`${inputCls} mt-1`} /></label>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {coords
              ? <button type="button" onClick={() => { setCoords(null); setGeo('') }} className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary flex items-center gap-1"><Icon name="location_off" className="text-[18px]" />Remove my location</button>
              : <button type="button" onClick={shareLocation} className="font-label-sm text-label-sm text-primary flex items-center gap-1"><Icon name="my_location" className="text-[18px]" />Use my current location</button>}
            {geo && <span className="font-body-sm text-body-sm text-on-surface-variant">{geo}</span>}
          </div>
        </div>

        <label className="block"><span className="font-label-md text-label-md text-on-surface">Description</span><textarea rows={6} value={f.description} onChange={set('description')} maxLength={5000} placeholder="What did you see or learn?" className={`${inputCls} mt-1`} aria-invalid={!!err.description} />{err.description && <span className="text-error font-body-sm">{err.description}</span>}</label>
        {!user && <>
          <label className="block"><span className="font-label-md text-label-md text-on-surface">Your name <span className="text-outline">(optional)</span></span><input value={f.name} onChange={set('name')} maxLength={120} className={`${inputCls} mt-1`} /></label>
          <label className="block"><span className="font-label-md text-label-md text-on-surface">Email <span className="text-outline">(optional)</span></span><input type="email" value={f.email} onChange={set('email')} maxLength={200} className={`${inputCls} mt-1`} aria-invalid={!!err.email} />{err.email && <span className="text-error font-body-sm">{err.email}</span>}</label>
        </>}
        {fail && <p className="text-error font-body-sm">{fail}</p>}
        <button disabled={busy} className="py-3.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-60">{busy ? 'Submitting…' : 'Submit report'}</button>
      </div>
    </form>
  )
}

export default function Report() {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Public Tip Line</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Report an Incident</h1>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 mb-6">In immediate danger? Call your local emergency number first. Demo site: do not submit real personal data.</p>
      <SignInGate action="file a report">{(user) => <ReportForm user={user} />}</SignInGate>
    </section>
  )
}
