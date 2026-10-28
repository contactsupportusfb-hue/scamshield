import { useEffect, useState } from 'react'
import Icon from './Icon'
import Avatar from './Avatar'
import { supabase } from '../lib/supabase'
import useSession, { profileOf } from '../hooks/useSession'

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
)

// Supabase sends sign-in failures back as ?error_code=… in the address.
function oauthErrorFromUrl() {
  const params = new URLSearchParams(window.location.search + '&' + window.location.hash.slice(1))
  const code = params.get('error_code') || params.get('error')
  if (!code) return ''
  if (code === 'signup_disabled') return 'New sign-ups are switched off, so this Google account cannot be used yet.'
  if (code === 'access_denied') return 'Google sign-in was cancelled.'
  return 'Google sign-in did not complete. Please try again.'
}

// Wraps a public form: visitors sign in with Google first. In demo mode (no Supabase keys) the form shows straight away.
export default function SignInGate({ action, children }) {
  const session = useSession()
  const [fail, setFail] = useState(oauthErrorFromUrl)

  useEffect(() => {
    if (/[?&#](error|error_code)=/.test(window.location.href)) window.history.replaceState(null, '', window.location.pathname)
  }, [])

  async function google() {
    setFail('')
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } })
    if (error) setFail('Google sign-in is not available right now. Please try again later.')
  }

  if (!supabase) return children(null)
  if (session === undefined) return <div className="py-16 text-center text-on-surface-variant font-body-md" role="status">Loading…</div>
  if (session) {
    const p = profileOf(session.user)
    return (
      <>
        <div className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3 mb-4">
          <Avatar src={p.avatar} name={p.name} size={36} />
          <div className="min-w-0 flex-1">
            <div className="font-label-md text-label-md text-on-surface truncate">{p.name}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">{p.email}</div>
          </div>
          <button type="button" onClick={() => supabase.auth.signOut()} className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary">Sign out</button>
        </div>
        {children(session.user)}
      </>
    )
  }

  return (
    <div className="bg-surface-container-low rounded-xl p-6 text-center">
      <Icon name="account_circle" className="text-primary text-[40px]" />
      <h2 className="font-headline-sm text-headline-sm text-on-surface mt-2">Sign in to {action}</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">We use your Google account so the Bureau knows who sent it.</p>
      <button type="button" onClick={google} className="mt-5 w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-[#1f1f1f] font-label-md text-label-md font-semibold hover:bg-white/90">
        <GoogleMark />Continue with Google
      </button>
      {fail && <p role="alert" className="text-error font-body-sm text-body-sm mt-3">{fail}</p>}
      <p className="font-body-sm text-[12px] text-outline mt-5 text-left">
        VERITAS is a fictional demo agency, not a real one. Do not submit real reports here. To report real fraud or cybercrime in the US use <span className="text-on-surface-variant">ic3.gov</span> or <span className="text-on-surface-variant">reportfraud.ftc.gov</span>; elsewhere, contact your local police.
      </p>
    </div>
  )
}
