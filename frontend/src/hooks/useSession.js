import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// undefined = still checking, null = signed out, object = signed-in session
export default function useSession() {
  const [session, setSession] = useState(supabase ? undefined : null)
  useEffect(() => {
    if (!supabase) return
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])
  return session
}

export function profileOf(user) {
  const meta = user?.user_metadata ?? {}
  return { name: meta.full_name || meta.name || user?.email || '', email: user?.email || '', avatar: meta.avatar_url || '' }
}
