import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'

const SIGNED_OUT = { session: null, aal: null, nextAal: null, isStaff: false }

// Tracks the staff session: signed in, two-step level (aal1/aal2) and staff-list membership.
export function useStaffAuth() {
  const [state, setState] = useState({ loading: Boolean(supabase), recovery: false, ...SIGNED_OUT })

  const refresh = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setState((s) => ({ ...s, loading: false, ...SIGNED_OUT })); return }
    const { data: lvl } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    let isStaff = false
    if (lvl?.currentLevel === 'aal2') {
      const { data } = await supabase.from('staff').select('user_id').eq('user_id', session.user.id).maybeSingle()
      isStaff = Boolean(data)
    }
    setState((s) => ({ ...s, loading: false, session, aal: lvl?.currentLevel, nextAal: lvl?.nextLevel, isStaff }))
  }, [])

  useEffect(() => {
    if (!supabase) return
    const first = setTimeout(refresh, 0)
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setState((s) => ({ ...s, recovery: true }))
      // Supabase advises not to call other auth methods inside this callback directly.
      setTimeout(refresh, 0)
    })
    return () => { clearTimeout(first); sub.subscription.unsubscribe() }
  }, [refresh])

  return { ...state, refresh }
}
