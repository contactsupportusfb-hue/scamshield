import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Emblem from '../components/Emblem'
import { supabase } from '../lib/supabase'
import Dashboard from './Dashboard'

// Two-step verification (authenticator app) is paused for now. Set to true to require it again.
const REQUIRE_MFA = false

const inputCls ='w-full px-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline'
const btnCls = 'w-full py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-60'
const linkBtnCls = 'font-label-md text-label-md text-on-surface-variant hover:text-primary'

const tooMany = (error) => error?.status === 429
const cleanCode = (v) => v.replace(/\D/g, '').slice(0, 6)
const codeFail = (error) => tooMany(error)
  ? 'Too many attempts. Wait a few minutes and try again.'
  : `That code was not accepted (${error.code || error.status}). Check your app and try again.`

function Panel({ eyebrow, title, children }) {
  return (
    <section className="px-4 py-12 max-w-sm mx-auto">
      <div className="text-center">
        <Emblem size={44} className="mx-auto" />
        <span className="block mt-4 font-label-caps text-label-caps text-primary uppercase tracking-widest">{eyebrow}</span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">{title}</h1>
      </div>
      <div className="bg-surface-container-low rounded-xl p-5 mt-6">{children}</div>
    </section>
  )
}

function CodeField({ code, setCode }) {
  return (
    <label className="block"><span className="font-label-md text-label-md text-on-surface">6-digit code</span>
      <input value={code} onChange={(e) => setCode(cleanCode(e.target.value))} inputMode="numeric" autoComplete="one-time-code" placeholder="000000" className={`${inputCls} mt-1 text-center tracking-[0.5em] font-metric-lg text-headline-sm`} />
    </label>
  )
}

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.email.trim() || !form.password) { setFail('Enter your email and password.'); return }
    setBusy(true); setFail('')
    const { error } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password })
    setBusy(false)
    if (error) setFail(tooMany(error) ? 'Too many attempts. Wait a few minutes and try again.' : 'Sign-in failed. Check your email and password.')
  }

  return (
    <Panel eyebrow="Authorized personnel" title="Staff Sign In">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <label className="block"><span className="font-label-md text-label-md text-on-surface">Email address</span>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="username" maxLength={200} className={`${inputCls} mt-1`} />
        </label>
        <label className="block"><span className="font-label-md text-label-md text-on-surface">Password</span>
          <input type="password" value={form.password} onChange={set('password')} autoComplete="current-password" maxLength={200} className={`${inputCls} mt-1`} />
        </label>
        {fail && <p role="alert" className="text-error font-body-sm text-body-sm">{fail}</p>}
        <button disabled={busy} className={btnCls}>{busy ? 'Signing in…' : 'Continue'}</button>
      </form>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-4 flex gap-2"><Icon name="lock" className="text-primary text-[18px]" />Accounts are issued by the Bureau.{REQUIRE_MFA && ' Every sign-in requires two-step verification.'}</p>
    </Panel>
  )
}

function Enroll({ onDone }) {
  const [factor, setFactor] = useState(null)
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')

  async function start() {
    setBusy(true); setFail('')
    // Clear abandoned set-up attempts so they do not pile up on the account.
    const { data: list } = await supabase.auth.mfa.listFactors()
    for (const f of list?.all ?? []) {
      if (f.factor_type === 'totp' && f.status === 'unverified') await supabase.auth.mfa.unenroll({ factorId: f.id })
    }
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: `Authenticator ${new Date().toISOString()}` })
    setBusy(false)
    if (error) { setFail('Could not start set-up. Please try again.'); return }
    setFactor({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (code.length !== 6) { setFail('Enter the 6-digit code from your app.'); return }
    setBusy(true); setFail('')
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code })
    setBusy(false)
    if (error) { setCode(''); setFail(codeFail(error)); return }
    onDone()
  }

  return (
    <Panel eyebrow="Step 2 of 2" title="Set Up Two-Step Verification">
      {!factor ? (
        <div className="flex flex-col gap-4">
          <p className="font-body-md text-body-md text-on-surface-variant">Staff accounts must be protected with an authenticator app such as Google Authenticator, Microsoft Authenticator or 1Password. You only do this once.</p>
          {fail && <p role="alert" className="text-error font-body-sm text-body-sm">{fail}</p>}
          <button onClick={start} disabled={busy} className={btnCls}>{busy ? 'Preparing…' : 'Set up authenticator app'}</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant">Scan this code with your authenticator app, then enter the 6-digit code it shows.</p>
          <div className="bg-white rounded-lg p-3 w-48 h-48 mx-auto"><img src={factor.qr} alt="QR code for your authenticator app" className="w-full h-full" /></div>
          <details className="font-body-sm text-body-sm text-on-surface-variant">
            <summary className="cursor-pointer text-primary">Can't scan? Enter the key manually</summary>
            <code className="block mt-2 p-2 rounded bg-surface-container text-on-surface break-all select-all">{factor.secret}</code>
          </details>
          <CodeField code={code} setCode={setCode} />
          {fail && <p role="alert" className="text-error font-body-sm text-body-sm">{fail}</p>}
          <button disabled={busy} className={btnCls}>{busy ? 'Verifying…' : 'Verify and finish'}</button>
        </form>
      )}
      <button onClick={() => supabase.auth.signOut()} className={`${linkBtnCls} mt-4 w-full`}>Cancel and sign out</button>
    </Panel>
  )
}

function Verify({ onDone }) {
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    if (code.length !== 6) { setFail('Enter the 6-digit code from your app.'); return }
    setBusy(true); setFail('')
    const { data: list, error: listError } = await supabase.auth.mfa.listFactors()
    const factor = list?.totp?.[0]
    if (listError || !factor) { setBusy(false); setFail('No authenticator is set up for this account. Contact an administrator.'); return }
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code })
    setBusy(false)
    if (error) { setCode(''); setFail(codeFail(error)); return }
    onDone()
  }

  return (
    <Panel eyebrow="Step 2 of 2" title="Two-Step Verification">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <p className="font-body-sm text-body-sm text-on-surface-variant">Open your authenticator app and enter the current code for VERITAS.</p>
        <CodeField code={code} setCode={setCode} />
        {fail && <p role="alert" className="text-error font-body-sm text-body-sm">{fail}</p>}
        <button disabled={busy} className={btnCls}>{busy ? 'Verifying…' : 'Verify'}</button>
      </form>
      <button onClick={() => supabase.auth.signOut()} className={`${linkBtnCls} mt-4 w-full`}>Use a different account</button>
    </Panel>
  )
}

function NotStaff({ user }) {
  return (
    <Panel eyebrow="Staff area" title="No staff access">
      <p className="font-body-md text-body-md text-on-surface-variant">You are signed in as <span className="text-on-surface break-all">{user.email}</span>, but this account is not on the staff list.</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-5 w-full py-3 rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md">Sign out</button>
    </Panel>
  )
}

function StaffPortal() {
  const [state, setState] = useState({ step: 'loading' })

  async function refresh() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setState({ step: 'signin' }); return }
    const { data: aal, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (error) { setState({ step: 'signin' }); return }
    const verified = aal.currentLevel === 'aal2'
    if (!verified && aal.nextLevel === 'aal2') { setState({ step: 'verify' }); return }
    if (!verified && REQUIRE_MFA) { setState({ step: 'enroll' }); return }
    // The database decides who is staff; the page only uses this to pick a screen.
    const { data: isStaff } = await supabase.rpc('is_staff')
    setState(isStaff ? { step: 'ready', user: session.user, verified } : { step: 'denied', user: session.user })
  }

  useEffect(() => {
    // Supabase warns against awaiting auth calls inside this callback, so defer the check.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { setTimeout(refresh, 0) })
    return () => subscription.unsubscribe()
  }, [])

  if (state.step === 'loading') return <div className="py-24 text-center text-on-surface-variant font-body-md" role="status">Loading…</div>
  if (state.step === 'signin') return <SignIn />
  if (state.step === 'enroll') return <Enroll onDone={refresh} />
  if (state.step === 'verify') return <Verify onDone={refresh} />
  if (state.step === 'denied') return <NotStaff user={state.user} />
  return <Dashboard user={state.user} verified={state.verified} />
}

export default function Admin() {
  if (supabase) return <StaffPortal />
  return (
    <Panel eyebrow="Demo mode" title="Staff Sign In">
      <p className="font-body-md text-body-md text-on-surface-variant">Staff sign-in needs the Supabase connection. Add <code className="text-primary">VITE_SUPABASE_URL</code> and <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> to <code className="text-primary">.env</code> and restart the site.</p>
      <Link to="/" className="block text-center mt-5 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Back to Home</Link>
    </Panel>
  )
}
