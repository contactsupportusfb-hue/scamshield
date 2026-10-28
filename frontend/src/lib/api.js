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

// Staff only: the database rules return rows only to accounts on the staff list.
export async function fetchInbox() {
  const [r, m] = await Promise.all([
    supabase.from('reports').select('*').order('created_at', { ascending: false }).limit(200),
    supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(200),
  ])
  if (r.error || m.error) throw new Error('Could not load the inbox. Please try again.')
  return { reports: r.data, messages: m.data }
}

// Staff only: set a report/message status or remove it. The database rules enforce staff access.
export async function setStatus(table, id, status) {
  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) throw new Error('Could not update. Please try again.')
}

export async function removeRow(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw new Error('Could not delete. Please try again.')
}
