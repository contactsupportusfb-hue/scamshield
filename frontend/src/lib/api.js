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

async function submit(table, localKey, prefix, row) {
  const ref = makeRef(prefix)
  const payload = { ref, ...row }
  if (supabase) {
    const { error } = await supabase.from(table).insert(payload)
    if (error) throw new Error('Submission failed. Please try again.')
  } else {
    saveLocal(localKey, payload)
  }
  return ref
}

export const submitReport = (data) => submit('reports', 'veritas_reports', 'RPT', data)
export const submitMessage = (data) => submit('messages', 'veritas_contact_messages', 'MSG', data)
