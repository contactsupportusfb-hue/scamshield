import { useState } from 'react'
import Icon from '../components/Icon'
import { supabase, authLink } from '../lib/supabase'
import { useStaffAuth } from '../lib/auth'
import Dashboard from './Dashboard'

const inputCls = 'w-full px-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline'
const btnCls = 'w-full py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold disabled:opacity-60'
const linkBtnCls = 'font-label-md text-label-md text-primary hover:underline'
const MIN_PASSWORD = 10

function Card({ icon, eyebrow, title, children }) {
  return (
    <section className="px-4 pt-10 pb-16 max-w-md mx-auto">
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Icon name={icon} className="text-[28px]" /></div>
      <span className="block mt-4 font-label-caps text-label-caps text-primary uppercase tracking-widest">{eyebrow}</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">{title}</h1>
      <div className="mt-5">{children}</div>
    </section>
  )
}

const Field = ({ label, ...props }) => (
  <label className="block"><span className="font-label-md text-label-md text-on-surface">{label}</span>
    <input {...props} className={`${inputCls} mt-1`} />
  </label>
)

function PasswordField({ label, ...props }) {
  const [shown, setShown] = useState(false)
  return (
    <label className="block"><span className="font-label-md text-label-md text-on-surface">{label}</span>
      <span className="relative block mt-1">
        <input {...props} type={shown ? 'text' : 'password'} className={`${inputCls} pr-12`} />
        <button type="button" onClick={() => setShown((s) => !s)} aria-label={shown ? 'Hide password' : 'Show password'} aria-pressed={shown}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-on-surface-variant hover:text-primary">
          <Icon name={shown ? 'visibility_off' : 'visibility'} className="text-[22px]" />
        </button>
      </span>
    </label>
  )
}

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
)

const Note = ({ children, error }) => (
  <p className={`font-body-sm text-body-sm ${error ? 'text-error' : 'text-on-surface-variant'}`} role={error ? 'alert' : undefined}>{children}</p>
)

const codeOk = (v) => /^\d{6}$/.test(v)

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState(authLink.error || '')
  const [resetSent, setResetSent] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true); setFail('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setFail(error.code === 'email_not_confirmed'
      ? 'This account has not been activated. Open the invite email and choose a password first.'
      : 'Email or password is incorrect.')
    setBusy(false)
  }

  async function onGoogle() {
    setBusy(true); setFail('')
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/admin` } })
    // On success the browser leaves for Google, so only a failure lands here.
    if (error) { setFail('Could not start Google sign-in. Please try again.'); setBusy(false) }
  }

  async function onReset() {
    if (!email.trim()) { setFail('Enter your staff email first, then choose "Forgot password".'); return }
    setBusy(true); setFail('')
    await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/admin` })
    setResetSent(true); setBusy(false)
  }

  return (
    <Card icon="shield_person" eyebrow="Restricted area" title="Staff sign in">
      <button type="button" onClick={onGoogle} disabled={busy}
        className="w-full py-3 rounded-lg bg-white text-[#1f1f1f] font-label-md text-label-md font-semibold flex items-center justify-center gap-3 disabled:opacity-60">
        <GoogleLogo />Continue with Google
      </button>
      <div className="flex items-center gap-3 my-5 text-on-surface-variant font-body-sm text-body-sm">
        <span className="flex-1 h-px bg-outline-variant/40" />or use email and password<span className="flex-1 h-px bg-outline-variant/40" />
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Field label="Staff email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} />
        <PasswordField label="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {fail && <Note error>{fail}</Note>}
        {resetSent && <Note>If that email belongs to a staff account, a reset link is on its way.</Note>}
        <button disabled={busy} className={btnCls}>{busy ? 'Signing in…' : 'Sign in'}</button>
        <button type="button" onClick={onReset} disabled={busy} className={`${linkBtnCls} self-start`}>Forgot password?</button>
      </form>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-6">Access is by invitation only. There is no public registration.</p>
    </Card>
  )
}

function VerifyCode({ onSignOut }) {
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    if (!codeOk(code)) { setFail('Enter the 6-digit code from your authenticator app.'); return }
    setBusy(true); setFail('')
    const { data: factors } = await supabase.auth.mfa.listFactors()
    const factor = factors?.totp?.[0]
    const { error } = factor ? await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code }) : { error: true }
    if (error) { setFail('That code did not work. Wait for a new one and try again.'); setCode('') }
    setBusy(false)
  }

  return (
    <Card icon="pin" eyebrow="Step 2 of 2" title="Two-step verification">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Note>Open your authenticator app and enter the 6-digit code for VERITAS Bureau.</Note>
        <Field label="Verification code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} autoFocus />
        {fail && <Note error>{fail}</Note>}
        <button disabled={busy} className={btnCls}>{busy ? 'Checking…' : 'Verify'}</button>
        <button type="button" onClick={onSignOut} className={`${linkBtnCls} self-start`}>Use a different account</button>
      </form>
    </Card>
  )
}

function SetPassword({ onDone, onSignOut }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    if (password.length < MIN_PASSWORD) { setFail(`Use at least ${MIN_PASSWORD} characters.`); return }
    if (password !== confirm) { setFail('The two passwords do not match.'); return }
    setBusy(true); setFail('')
    const { error } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (error) setFail('Could not save the password. Please try again.')
    else onDone()
  }

  return (
    <Card icon="key" eyebrow="Account setup" title="Choose a password">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <PasswordField label="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField label="Confirm password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {fail && <Note error>{fail}</Note>}
        <button disabled={busy} className={btnCls}>{busy ? 'Saving…' : 'Save password'}</button>
        <button type="button" onClick={onSignOut} className={`${linkBtnCls} self-start`}>Cancel and sign out</button>
      </form>
    </Card>
  )
}

function Enroll({ onSignOut }) {
  const [factor, setFactor] = useState(null)
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState('')

  async function start() {
    setBusy(true); setFail('')
    // Clear any half-finished setup so a fresh QR code can be issued.
    const { data: list } = await supabase.auth.mfa.listFactors()
    for (const f of list?.all ?? []) if (f.status !== 'verified') await supabase.auth.mfa.unenroll({ factorId: f.id })
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp', issuer: 'VERITAS Bureau' })
    if (error) setFail('Could not start setup. Please try again.')
    else setFactor({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret })
    setBusy(false)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!codeOk(code)) { setFail('Enter the 6-digit code shown in your app.'); return }
    setBusy(true); setFail('')
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code })
    if (error) { setFail('That code did not work. Wait for a new one and try again.'); setCode('') }
    setBusy(false)
  }

  return (
    <Card icon="qr_code_2" eyebrow="Required for staff" title="Set up two-step verification">
      {!factor ? (
        <div className="flex flex-col gap-3">
          <Note>Every staff account needs an authenticator app, such as Google Authenticator, Microsoft Authenticator or 1Password. You will enter a code from it each time you sign in.</Note>
          {fail && <Note error>{fail}</Note>}
          <button onClick={start} disabled={busy} className={btnCls}>{busy ? 'Preparing…' : 'Set up authenticator app'}</button>
          <button type="button" onClick={onSignOut} className={`${linkBtnCls} self-start`}>Sign out</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Note>1. Scan this QR code with your authenticator app.</Note>
          <div className="bg-white rounded-xl p-3 w-48 h-48 mx-auto"><img src={factor.qr} alt="QR code for your authenticator app" className="w-full h-full" /></div>
          <Note>Can't scan it? Enter this key in the app instead:</Note>
          <code className="block bg-surface-container rounded-lg px-3 py-2 text-primary font-body-sm text-body-sm break-all select-all">{factor.secret}</code>
          <Note>2. Enter the 6-digit code the app shows.</Note>
          <Field label="Verification code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
          {fail && <Note error>{fail}</Note>}
          <button disabled={busy} className={btnCls}>{busy ? 'Checking…' : 'Confirm and finish'}</button>
        </form>
      )}
    </Card>
  )
}

export default function Admin() {
  const auth = useStaffAuth()
  const [passwordSet, setPasswordSet] = useState(false)
  const needsPassword = !passwordSet && (auth.recovery || ['invite', 'recovery'].includes(authLink.type))
  // The email link is single-use: forget it once the password is saved or the user signs out.
  const finishPassword = () => { authLink.type = null; setPasswordSet(true) }
  const signOut = () => { authLink.type = null; authLink.error = null; supabase.auth.signOut() }

  if (!supabase) {
    return (
      <Card icon="cloud_off" eyebrow="Demo mode" title="Staff sign in">
        <Note>Sign-in needs the Supabase keys in <code className="text-primary">.env</code> (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).</Note>
      </Card>
    )
  }
  if (auth.loading) return <Card icon="hourglass_top" eyebrow="Please wait" title="Checking your session…" />
  if (!auth.session) return <SignIn />
  if (auth.aal === 'aal1' && auth.nextAal === 'aal2') return <VerifyCode onSignOut={signOut} />
  if (needsPassword) return <SetPassword onDone={finishPassword} onSignOut={signOut} />
  if (auth.nextAal !== 'aal2') return <Enroll onSignOut={signOut} />

  if (!auth.isStaff) {
    return (
      <Card icon="block" eyebrow="Access denied" title="Not on the staff list">
        <Note>This account is signed in but has not been granted staff access. Ask an administrator to add it.</Note>
        <button onClick={signOut} className={`${btnCls} mt-5`}>Sign out</button>
      </Card>
    )
  }

  return <Dashboard email={auth.session.user.email} onSignOut={signOut} />
}
