import { useState } from 'react'
import Icon from '../components/Icon'
import { SITE, OFFICES } from '../data/site'
import { submitMessage } from '../lib/api'
import { useSpamGuard } from '../lib/spam'

const inputCls = 'w-full px-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline'
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function Contact() {
  const [office, setOffice] = useState('hq')
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [ref, setRef] = useState(null)
  const [fail, setFail] = useState('')
  const guard = useSpamGuard()
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name.'
    if (!emailOk(form.email)) er.email = 'Enter a valid email address.'
    if (form.subject.trim().length < 3) er.subject = 'Please add a subject.'
    if (form.body.trim().length < 10) er.body = 'Message must be at least 10 characters.'
    setErrors(er)
    if (Object.keys(er).length) return
    setBusy(true); setFail('')
    try {
      const r = await submitMessage({ sender_name: form.name.trim(), sender_email: form.email.trim(), subject: form.subject.trim(), body: form.body.trim() }, guard)
      setRef(r)
    } catch (err) { setFail(err.message) } finally { setBusy(false) }
  }

  const active = OFFICES.find((o) => o.id === office)

  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Get in touch</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Contact the Bureau</h1>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <a href={SITE.phoneHref} className="bg-surface-container-low rounded-xl p-4 hover:bg-surface-container"><Icon name="call" className="text-primary" /><div className="font-label-md text-label-md text-on-surface mt-1">Phone</div><div className="font-body-sm text-body-sm text-on-surface-variant break-words">{SITE.phone}</div></a>
        <a href={`mailto:${SITE.email}`} className="bg-surface-container-low rounded-xl p-4 hover:bg-surface-container"><Icon name="mail" className="text-primary" /><div className="font-label-md text-label-md text-on-surface mt-1">Email</div><div className="font-body-sm text-body-sm text-on-surface-variant break-all">{SITE.email}</div></a>
      </div>

      <h2 className="font-headline-md text-headline-md text-on-surface mt-8 mb-3">Our offices</h2>
      <div data-reveal="pop" className="bg-surface-container-low rounded-xl p-3">
        <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Map of office locations">
          <rect width="400" height="200" rx="10" fill="#111a2e" />
          <path d="M30 60 L110 40 L200 50 L300 40 L370 70 L360 120 L330 150 L250 160 L180 150 L120 170 L60 150 L35 110 Z" fill="#191f30" stroke="#4f4635" strokeWidth="1.5" />
          {OFFICES.map((o) => (
            <g key={o.id} onClick={() => setOffice(o.id)} className="cursor-pointer" tabIndex={0} role="button" aria-label={o.name} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOffice(o.id)}>
              <circle cx={o.x} cy={o.y} r={office === o.id ? 11 : 7} fill={office === o.id ? '#ffd071' : '#e8b33a'} opacity={office === o.id ? 1 : 0.7} />
              <circle cx={o.x} cy={o.y} r="3" fill="#0d1323" />
            </g>
          ))}
        </svg>
        <p className="font-body-sm text-body-sm text-on-surface-variant px-1 pb-1">Selected: <span className="text-primary">{active.name}</span></p>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        {OFFICES.map((o) => (
          <button key={o.id} data-reveal onClick={() => setOffice(o.id)} className={`text-left rounded-xl p-4 border ${office === o.id ? 'border-primary-container bg-surface-container' : 'border-transparent bg-surface-container-low'}`}>
            <div className="font-headline-sm text-headline-sm text-on-surface">{o.name}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">{o.address}</div>
            <div className="font-body-sm text-body-sm text-primary">{o.phone}</div>
          </button>
        ))}
      </div>

      <h2 className="font-headline-md text-headline-md text-on-surface mt-8 mb-3">Send a message</h2>
      {ref ? (
        <div className="bg-surface-container-low rounded-xl p-6 text-center">
          <Icon name="check_circle" fill className="text-primary text-[40px]" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">Message received</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Your reference number is</p>
          <p className="font-metric-lg text-headline-sm text-primary mt-1">{ref}</p>
          <button onClick={() => { setRef(null); setForm({ name: '', email: '', subject: '', body: '' }) }} className="mt-4 px-5 py-2.5 rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md">Send another</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
          {[['name', 'Full name', 'text'], ['email', 'Email address', 'email'], ['subject', 'Subject', 'text']].map(([k, label, type]) => (
            <label key={k} className="block"><span className="font-label-md text-label-md text-on-surface">{label}</span>
              <input type={type} value={form[k]} onChange={set(k)} maxLength={200} className={`${inputCls} mt-1`} aria-invalid={!!errors[k]} />
              {errors[k] && <span className="text-error font-body-sm text-body-sm">{errors[k]}</span>}
            </label>
          ))}
          <label className="block"><span className="font-label-md text-label-md text-on-surface">Message</span>
            <textarea rows={5} value={form.body} onChange={set('body')} maxLength={4000} className={`${inputCls} mt-1`} aria-invalid={!!errors.body} />
            {errors.body && <span className="text-error font-body-sm text-body-sm">{errors.body}</span>}
          </label>
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden"><label>Website<input {...guard.trapProps} /></label></div>
          {fail && <p className="text-error font-body-sm">{fail}</p>}
          <button disabled={busy} className="py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-60">{busy ? 'Sending…' : 'Send message'}</button>
        </form>
      )}
    </section>
  )
}
