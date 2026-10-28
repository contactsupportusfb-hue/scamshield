import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon'
import { supabase } from '../lib/supabase'
import { REPORT_CATEGORIES, URGENCY_LEVELS } from '../data/content'

const DAY = 86400000
const LIMIT = 1000
const TREND_DAYS = 14
const inputCls = 'w-full px-3 py-2.5 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline'
const categoryLabel = (id) => REPORT_CATEGORIES.find((c) => c.id === id)?.label ?? id ?? '—'
const fmtDate = (v) => (v ? new Date(v).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—')
const dayKey = (d) => new Date(d).toISOString().slice(0, 10)

async function loadDashboard() {
  const [r, m, s] = await Promise.all([
    supabase.from('reports').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(LIMIT),
    supabase.from('messages').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(LIMIT),
    supabase.rpc('staff_directory'),
  ])
  if (r.error || m.error || s.error) throw new Error('Could not load dashboard data.')
  return { reports: r.data, reportCount: r.count ?? r.data.length, messages: m.data, messageCount: m.count ?? m.data.length, staff: s.data, loadedAt: Date.now() }
}

function Stat({ icon, label, value, note }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-4">
      <Icon name={icon} className="text-primary" />
      <div className="font-metric-lg text-metric-lg text-on-surface mt-1">{value}</div>
      <div className="font-label-md text-label-md text-on-surface">{label}</div>
      {note && <div className="font-body-sm text-body-sm text-on-surface-variant">{note}</div>}
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-4">
      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3">{title}</h2>
      {children}
    </div>
  )
}

function BarList({ rows, unit }) {
  const max = Math.max(1, ...rows.map((r) => r.value))
  if (!rows.some((r) => r.value)) return <p className="font-body-sm text-body-sm text-on-surface-variant">No data yet.</p>
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((r) => (
        <li key={r.label} title={`${r.label}: ${r.value} ${unit}`} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-2">
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{r.label}</span>
          <span className="h-2.5">{r.value > 0 && <span className="block h-full bg-primary-container rounded-r" style={{ width: `${(r.value / max) * 100}%` }} />}</span>
          <span className="font-label-md text-label-md text-on-surface text-right">{r.value}</span>
        </li>
      ))}
    </ul>
  )
}

function DayChart({ days }) {
  const max = Math.max(1, ...days.map((d) => d.value))
  const label = (d) => new Date(d.key).toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })
  return (
    <div>
      <div className="flex items-end gap-[2px] h-32 border-b border-outline-variant/60" role="img" aria-label={`Reports per day over the last ${TREND_DAYS} days`}>
        {days.map((d) => (
          <div key={d.key} title={`${label(d)}: ${d.value} report${d.value === 1 ? '' : 's'}`} className="flex-1 h-full flex items-end hover:bg-surface-container">
            {d.value > 0 && <div className="w-full bg-primary-container rounded-t" style={{ height: `${(d.value / max) * 100}%` }} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1 font-body-sm text-body-sm text-on-surface-variant">
        <span>{label(days[0])}</span><span>Peak: {Math.max(0, ...days.map((d) => d.value))} / day</span><span>{label(days[days.length - 1])}</span>
      </div>
    </div>
  )
}

function UrgencyChip({ level }) {
  const cls = level === 'CRITICAL' ? 'bg-error text-on-error-container' : level === 'HIGH' ? 'bg-primary-container text-on-primary' : 'border border-outline-variant text-on-surface-variant'
  return <span className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wider ${cls}`}>{level ?? '—'}</span>
}

const Detail = ({ label, children }) => (
  <div><dt className="font-label-sm text-label-sm text-on-surface-variant">{label}</dt><dd className="font-body-sm text-body-sm text-on-surface break-words whitespace-pre-wrap">{children || '—'}</dd></div>
)

function ReportItem({ r }) {
  return (
    <details className="bg-surface-container-low rounded-xl group">
      <summary className="p-4 cursor-pointer list-none flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-label-md text-label-md text-primary">{r.ref}</span>
        <span className="font-body-md text-body-md text-on-surface flex-1 min-w-[8rem]">{categoryLabel(r.category)}</span>
        <UrgencyChip level={r.urgency} />
        <span className="font-body-sm text-body-sm text-on-surface-variant w-full">{fmtDate(r.created_at)}{r.location ? ` · ${r.location}` : ''}</span>
      </summary>
      <dl className="px-4 pb-4 grid gap-3 sm:grid-cols-2">
        <Detail label="Reporter">{r.reporter_name || 'Anonymous'}</Detail>
        <Detail label="Email">{r.reporter_email && <a href={`mailto:${r.reporter_email}`} className="text-primary hover:underline">{r.reporter_email}</a>}</Detail>
        <div className="sm:col-span-2"><Detail label="Description">{r.description}</Detail></div>
      </dl>
    </details>
  )
}

function MessageItem({ m }) {
  return (
    <details className="bg-surface-container-low rounded-xl">
      <summary className="p-4 cursor-pointer list-none flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-label-md text-label-md text-primary">{m.ref}</span>
        <span className="font-body-md text-body-md text-on-surface flex-1 min-w-[8rem]">{m.subject}</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant w-full">{fmtDate(m.created_at)} · {m.sender_name}</span>
      </summary>
      <dl className="px-4 pb-4 grid gap-3 sm:grid-cols-2">
        <Detail label="From">{m.sender_name}</Detail>
        <Detail label="Email">{m.sender_email && <a href={`mailto:${m.sender_email}`} className="text-primary hover:underline">{m.sender_email}</a>}</Detail>
        <div className="sm:col-span-2"><Detail label="Message">{m.body}</Detail></div>
      </dl>
    </details>
  )
}

const matches = (row, q) => !q || Object.values(row).some((v) => typeof v === 'string' && v.toLowerCase().includes(q))

export default function Dashboard({ email, onSignOut }) {
  const [data, setData] = useState(null)
  const [fail, setFail] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [tab, setTab] = useState('reports')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let alive = true
    loadDashboard()
      .then((d) => { if (alive) { setData(d); setFail('') } })
      .catch((e) => { if (alive) setFail(e.message) })
    return () => { alive = false }
  }, [reloadKey])

  const stats = useMemo(() => {
    if (!data) return null
    const now = data.loadedAt
    const recent = (rows) => rows.filter((x) => now - new Date(x.created_at) < 7 * DAY).length
    const byDay = new Map()
    for (let i = TREND_DAYS - 1; i >= 0; i--) byDay.set(dayKey(now - i * DAY), 0)
    for (const r of data.reports) { const k = dayKey(r.created_at); if (byDay.has(k)) byDay.set(k, byDay.get(k) + 1) }
    const count = (key, value) => data.reports.filter((r) => r[key] === value).length
    return {
      reports7: recent(data.reports),
      messages7: recent(data.messages),
      urgent: data.reports.filter((r) => r.urgency === 'HIGH' || r.urgency === 'CRITICAL').length,
      days: [...byDay].map(([key, value]) => ({ key, value })),
      categories: REPORT_CATEGORIES.map((c) => ({ label: c.label, value: count('category', c.id) })).sort((a, b) => b.value - a.value),
      urgency: URGENCY_LEVELS.map((u) => ({ label: u, value: count('urgency', u) })),
    }
  }, [data])

  const q = query.trim().toLowerCase()
  const list = data ? (tab === 'reports' ? data.reports : data.messages).filter((row) => matches(row, q)) : []
  const truncated = data && (tab === 'reports' ? data.reportCount : data.messageCount) > LIMIT

  return (
    <section className="px-4 pt-8 pb-16 max-w-3xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Staff area · two-step verified</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Dashboard</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant break-all">Signed in as {email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setReloadKey((k) => k + 1)} className="px-4 py-2.5 rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md flex items-center gap-1"><Icon name="refresh" className="text-[18px]" />Refresh</button>
          <button onClick={onSignOut} className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Sign out</button>
        </div>
      </div>

      {fail && <p className="text-error font-body-sm text-body-sm mt-4" role="alert">{fail} Run the latest supabase/schema.sql, then refresh.</p>}
      {!data && !fail && <p className="font-body-md text-body-md text-on-surface-variant mt-8">Loading…</p>}

      {data && stats && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <Stat icon="description" label="Reports" value={data.reportCount} note={`${stats.reports7} in last 7 days`} />
            <Stat icon="priority_high" label="High / critical" value={stats.urgent} note="reports" />
            <Stat icon="mail" label="Messages" value={data.messageCount} note={`${stats.messages7} in last 7 days`} />
            <Stat icon="badge" label="Staff" value={data.staff.length} note="with access" />
          </div>

          <div className="grid gap-3 mt-3 md:grid-cols-2">
            <div className="md:col-span-2"><Panel title={`Reports per day · last ${TREND_DAYS} days`}><DayChart days={stats.days} /></Panel></div>
            <Panel title="Reports by category"><BarList rows={stats.categories} unit="reports" /></Panel>
            <Panel title="Reports by urgency"><BarList rows={stats.urgency} unit="reports" /></Panel>
          </div>

          <div className="mt-3"><Panel title="Staff with access">
            <ul className="flex flex-col gap-1">
              {data.staff.map((s) => (
                <li key={s.email} className="flex flex-wrap justify-between gap-x-3 font-body-sm text-body-sm">
                  <span className="text-on-surface break-all">{s.email}</span>
                  <span className="text-on-surface-variant">added {fmtDate(s.added_at)}</span>
                </li>
              ))}
            </ul>
          </Panel></div>

          <div className="flex gap-2 mt-8" role="tablist">
            {[['reports', `Reports (${data.reportCount})`], ['messages', `Messages (${data.messageCount})`]].map(([id, label]) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-lg font-label-md text-label-md ${tab === id ? 'bg-primary-container text-on-primary font-semibold' : 'bg-surface-container-low text-on-surface-variant'}`}>{label}</button>
            ))}
          </div>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by reference, name, email, text…" className={`${inputCls} mt-3`} aria-label="Search" />
          {truncated && <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Showing the latest {LIMIT}.</p>}

          <div className="flex flex-col gap-2 mt-3">
            {list.length === 0 && <p className="font-body-md text-body-md text-on-surface-variant">{q ? 'No matches.' : `No ${tab} yet.`}</p>}
            {list.map((row) => (tab === 'reports' ? <ReportItem key={row.id ?? row.ref} r={row} /> : <MessageItem key={row.id ?? row.ref} m={row} />))}
          </div>
        </>
      )}
    </section>
  )
}
