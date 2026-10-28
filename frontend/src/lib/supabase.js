import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Read invite / password-reset links before the client clears them from the URL.
const hash = new URLSearchParams(window.location.hash.slice(1))
export const authLink = { type: hash.get('type'), error: hash.get('error_description') }
// Invite and reset emails can land on any page; move them to staff sign-in before the app starts.
if ((authLink.type || authLink.error) && window.location.pathname !== '/admin') {
  window.history.replaceState(null, '', `/admin${window.location.hash}`)
}

export const supabase = url && key ? createClient(url, key) : null
export const isBackendConnected = Boolean(supabase)
