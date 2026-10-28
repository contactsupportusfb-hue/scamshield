import { supabase } from './supabase'

function makeRef(prefix) {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  const rand = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, 5)
  return `${prefix}-${new Date().getFullYear()}-${rand}`
}

function saveLocal(key, row) {
  try {
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    list.push({ ...row, created_at: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(list))
  } catch { /* storage unavailable */ }
}

async function submit(table, localKey, prefix, row, guard) {
  const ref = makeRef(prefix)
  const verdict = guard?.check()
  if (verdict === 'cooldown') throw new Error('Please wait a minute before sending another.')
  if (verdict === 'bot') return ref // pretend success so bots get no signal
  const payload = { ref, ...row }
  if (supabase) {
    const { error } = await supabase.from(table).insert(payload)
    // P0001 = message raised by the spam guard in the database; safe to show.
    if (error) throw new Error(error.code === 'P0001' ? error.message : 'Submission failed. Please try again.')
  } else {
    saveLocal(localKey, payload)
  }
  guard?.markSent()
  return ref
}

export const submitReport = (data, guard) => submit('reports', 'veritas_reports', 'RPT', data, guard)
export const submitMessage = (data, guard) => submit('messages', 'veritas_contact_messages', 'MSG', data, guard)
export const submitApplication = (data, guard) => submit('applications', 'veritas_applications', 'APP', data, guard)
