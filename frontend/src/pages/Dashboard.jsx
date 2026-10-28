import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import Avatar from '../components/Avatar'
import LocationMap from '../components/LocationMap'
import { supabase } from '../lib/supabase'
import { fetchInbox, setStatus, removeRow } from '../lib/api'
import { profileOf } from '../hooks/useSession'
import { REPORT_CATEGORIES } from '../data/content'

const CATEGORY = Object.fromEntries(REPORT_CATEGORIES.map((c) => [c.id, c]))
const URGENCY_CLS = {
  CRITICAL: 'bg-error/15 text-error',
  HIGH: 'bg-primary-container/20 text-primary',
  MEDIUM: 'bg-secondary-container text-on-secondary-container',
  LOW: 'bg-surface-bright text-on-surface-variant',
}
const STATUSES = [
  { id: 'new', label: 'New', icon: 'fiber_new', cls: 'bg-tertiary-container/25 text-tertiary' },
  { id: 'fulfilled', label: 'Fulfilled', icon: 'task_alt', cls: 'bg-primary-container/20 text-primary' },
  { id: 'drill', label: 'Drill', icon: 'fitness_center', cls: 'bg-secondary-container text-on-secondary-container' },
  { id: 'false_alarm', label: 'False alarm', icon: 'cancel', cls: 'bg-surface-bright text-on-surface-variant' },
]
const STATUS = Object.fromEntries(STATUSES.map((s) => [s.id, s]))

const when = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

function duration(from, to) {
  const mins = Math.round((new Date(to) - new Date(from)) / 60000)
  const d = Math.floor(mins / 1440), h = Math.floor((mins % 1440) / 60), m = mins % 60
  return [d && `${d} day${d > 1 ? 's' : ''}`, h && `${h} hr`, m && `${m} min`].filter(Boolean).join(' ') || 'under a minute'
}

function Field({ label, children }) {
  return (
    <div>
      <div className="font-label-caps text-label-caps text-primary uppercase tracking-widest">{label}</div>
      <div className="font-body-md text-body-md text-on-surface mt-1">{children}</div>
    </div>
  )
}

function Sender({ avatar, name, email }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <Avatar src={avatar} name={name || email} />
      <div className="min-w-0">
        <div className="font-label-md text-label-md text-on-surface truncate">{name || 'No name given'}</div>
        <div className="font-body-sm text-body-sm text-on-surface-variant truncate">{email || 'No email given'}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.new
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide ${s.cls}`}><Icon name={s.icon} className="text-[14px]" />{s.label}</span>
}

// Shared status + delete controls for a report or a message.
function Actions({ row, table, onStatus, onDelete }) {
  const [confirm, setConfirm] = useState(false)
  return (
    <div className="flex flex-col gap-2 border-t border-outline-variant/20 pt-3">
      <div className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Set status</div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button key={s.id} onClick={() => onStatus(table, row.id, s.id)} aria-pressed={row.status === s.id}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-label-sm text-label-sm border ${row.status === s.id ? 'border-primary-container bg-surface-container text-primary' : 'border-outline-variant/40 text-on-surface-variant hover:text-on-surface'}`}>
            <Icon name={s.icon} className="text-[16px]" />{s.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-1">
        {confirm ? (
          <>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Delete permanently?</span>
            <button onClick={() => onDelete(table, row.id)} className="px-3 py-1.5 rounded-lg bg-error/90 text-on-error-container font-label-sm text-label-sm font-semibold">Yes, delete</button>
            <button onClick={() => setConfirm(false)} className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface">Cancel</button>
          </>
        ) : (
          <button onClick={() => setConfirm(true)} className="flex items-center gap-1 font-label-sm text-label-sm text-error/90 hover:text-error"><Icon name="delete" className="text-[18px]" />Delete</button>
        )}
      </div>
    </div>
  )
}

function ReportCard({ r, open, onToggle, onStatus, onDelete }) {
  const cat = CATEGORY[r.category]
  return (
    <li className="bg-surface-container-low rounded-xl border border-outline-variant/20">
      <button onClick={onToggle} aria-expanded={open} className="w-full text-left p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <Sender avatar={r.reporter_avatar} name={r.reporter_name} email={r.reporter_email} />
          <span className={`shrink-0 px-2 py-1 rounded text-[11px] font-bold tracking-wider ${URGENCY_CLS[r.urgency] || URGENCY_CLS.LOW}`}>{r.urgency}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
          <StatusBadge status={r.status} />
          <span className="flex items-center gap-1 text-on-surface"><Icon name={cat?.icon || 'report'} className="text-[18px] text-primary" />{cat?.label || r.category}</span>
          <span>{when(r.created_at)}</span>
          <span className="font-mono text-outline">{r.ref}</span>
          {(r.location || r.latitude != null) && <Icon name="location_on" className="text-[18px] text-primary" />}
          {(r.started_at || r.ended_at) && <Icon name="schedule" className="text-[18px] text-primary" />}
        </div>
        {!open && <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{r.description}</p>}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-outline-variant/20 pt-4">
          <Field label="Description"><p className="whitespace-pre-wrap break-words">{r.description}</p></Field>
          {(r.started_at || r.ended_at) && (
            <Field label="Time frame">
              <div>Started: {r.started_at ? when(r.started_at) : 'Not given'}</div>
              <div>Ended: {r.ended_at ? when(r.ended_at) : 'Ongoing / not given'}</div>
              {r.started_at && r.ended_at && <div className="text-on-surface-variant font-body-sm">Duration: {duration(r.started_at, r.ended_at)}</div>}
            </Field>
          )}
          {(r.location || r.latitude != null) && (
            <Field label="Location">
              {r.location && <div>{r.location}</div>}
              <LocationMap lat={r.latitude} lng={r.longitude} query={r.location} />
            </Field>
          )}
          {r.reporter_email && <a href={`mailto:${r.reporter_email}?subject=${encodeURIComponent(`Your report ${r.ref}`)}`} className="self-start font-label-md text-label-md text-primary flex items-center gap-1"><Icon name="mail" className="text-[18px]" />Reply by email</a>}
          <Actions row={r} table="reports" onStatus={onStatus} onDelete={onDelete} />
        </div>
      )}
    </li>
  )
}

function MessageCard({ m, open, onToggle, onStatus, onDelete }) {
  return (
    <li className="bg-surface-container-low rounded-xl border border-outline-variant/20">
      <button onClick={onToggle} aria-expanded={open} className="w-full text-left p-4 flex flex-col gap-3">
        <Sender avatar={m.sender_avatar} name={m.sender_name} email={m.sender_email} />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1"><StatusBadge status={m.status} /><span className="font-label-md text-label-md text-on-surface">{m.subject}</span></div>
        <div className="flex flex-wrap gap-x-3 font-body-sm text-body-sm text-on-surface-variant"><span>{when(m.created_at)}</span><span className="font-mono text-outline">{m.ref}</span></div>
        {!open && <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{m.body}</p>}
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-outline-variant/20 pt-4">
          <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap break-words">{m.body}</p>
          <a href={`mailto:${m.sender_email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`} className="self-start font-label-md text-label-md text-primary flex items-center gap-1"><Icon name="mail" className="text-[18px]" />Reply by email</a>
          <Actions row={m} table="messages" onStatus={onStatus} onDelete={onDelete} />
        </div>
      )}
    </li>
  )
}

const matches = (row, q) => !q || Object.values(row).some((v) => typeof v === 'string' && v.toLowerCase().includes(q))

export default function Dashboard({ user, verified }) {
  const me = profileOf(user)
  const [data, setData] = useState(null)
  const [fail, setFail] = useState('')
  const [tab, setTab] = useState('reports')
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)

  const load = () => fetchInbox().then((d) => { setData(d); setFail('') }).catch((e) => setFail(e.message))
  useEffect(() => { load() }, [])

  async function onStatus(table, id, status) {
    setData((d) => ({ ...d, [table]: d[table].map((row) => (row.id === id ? { ...row, status } : row)) }))
    try { await setStatus(table, id, status) } catch (e) { setFail(e.message); load() }
  }

  async function onDelete(table, id) {
    setData((d) => ({ ...d, [table]: d[table].filter((row) => row.id !== id) }))
    if (open === id) setOpen(null)
    try { await removeRow(table, id) } catch (e) { setFail(e.message); load() }
  }

  const all = data ? data[tab] : []
  const rows = all.filter((row) => (filter === 'all' || row.status === filter) && matches(row, q.trim().toLowerCase()))
  const urgent = data ? data.reports.filter((r) => r.urgency === 'CRITICAL' || r.urgency === 'HIGH').length : 0

  return (
    <section className="px-4 py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar src={me.avatar} name={me.name} />
          <div className="min-w-0">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Staff dashboard</span>
            <div className="font-body-sm text-body-sm text-on-surface-variant truncate">{me.email} · {verified ? 'Two-step verified' : 'Signed in with password'}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setData(null); load() }} className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1"><Icon name="refresh" className="text-[18px]" />Refresh</button>
          <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md">Sign out</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-6">
        {[['Reports', data?.reports.length], ['High / critical', urgent], ['Messages', data?.messages.length]].map(([label, n]) => (
          <div key={label} className="bg-surface-container-low rounded-xl p-4">
            <div className="font-metric-lg text-metric-lg text-primary">{n ?? '–'}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-6">
        <div className="flex bg-surface-container-low rounded-lg p-1" role="tablist">
          {[['reports', 'Reports'], ['messages', 'Messages']].map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => { setTab(id); setOpen(null) }} className={`px-4 py-2 rounded-md font-label-md text-label-md ${tab === id ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant'}`}>{label}</button>
          ))}
        </div>
        <label className="flex-1 min-w-[12rem] relative">
          <span className="sr-only">Search</span>
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, text, ref…" className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline" />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {[['all', 'All'], ...STATUSES.map((s) => [s.id, s.label])].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} aria-pressed={filter === id} className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm border ${filter === id ? 'border-primary-container bg-surface-container text-primary' : 'border-outline-variant/40 text-on-surface-variant'}`}>
            {label}{id !== 'all' && data ? ` (${all.filter((r) => r.status === id).length})` : ''}
          </button>
        ))}
      </div>

      {fail && <p role="alert" className="text-error font-body-sm text-body-sm mt-4">{fail}</p>}
      {!data && !fail && <p className="text-on-surface-variant font-body-md mt-8 text-center" role="status">Loading…</p>}
      {data && rows.length === 0 && <p className="text-on-surface-variant font-body-md mt-8 text-center">{q || filter !== 'all' ? 'Nothing matches your filters.' : `No ${tab} yet.`}</p>}

      <ul className="flex flex-col gap-3 mt-4">
        {rows.map((row) => tab === 'reports'
          ? <ReportCard key={row.id} r={row} open={open === row.id} onToggle={() => setOpen(open === row.id ? null : row.id)} onStatus={onStatus} onDelete={onDelete} />
          : <MessageCard key={row.id} m={row} open={open === row.id} onToggle={() => setOpen(open === row.id ? null : row.id)} onStatus={onStatus} onDelete={onDelete} />)}
      </ul>
    </section>
  )
}
