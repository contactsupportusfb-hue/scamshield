import { useState } from 'react'

const MIN_FILL_MS = 3000
const COOLDOWN_MS = 60000
const LAST_KEY = 'veritas_last_submit'

// Browser-side spam checks. The database enforces its own limits too (see supabase/schema.sql).
export function useSpamGuard() {
  const [startedAt] = useState(() => Date.now())
  const [trap, setTrap] = useState('')

  // Hidden field people never see; simple bots fill in every input.
  const trapProps = { name: 'website', value: trap, onChange: (e) => setTrap(e.target.value), tabIndex: -1, autoComplete: 'off' }

  function check() {
    if (trap || Date.now() - startedAt < MIN_FILL_MS) return 'bot'
    try {
      if (Date.now() - Number(localStorage.getItem(LAST_KEY) || 0) < COOLDOWN_MS) return 'cooldown'
    } catch { /* storage unavailable */ }
    return null
  }

  function markSent() {
    try { localStorage.setItem(LAST_KEY, String(Date.now())) } catch { /* storage unavailable */ }
  }

  return { trapProps, check, markSent }
}
