import Icon from './Icon'

// Small shared pieces used by the content pages.

export function PageIntro({ eyebrow, title, children }) {
  return (
    <>
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">{eyebrow}</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">{title}</h1>
      {children && <p className="font-body-md text-body-md text-on-surface-variant mt-2">{children}</p>}
    </>
  )
}

export function SectionTitle({ eyebrow, title, className = 'mt-10' }) {
  return (
    <div className={`${className} mb-4`}>
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">{eyebrow}</span>
      <h2 className="font-headline-md text-headline-md text-on-surface mt-1">{title}</h2>
    </div>
  )
}

export function FilterChips({ options, value, onChange, label }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button key={o} role="tab" aria-selected={value === o} onClick={() => onChange(o)} className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md border ${value === o ? 'bg-primary-container text-on-primary border-primary-container' : 'border-outline-variant text-on-surface-variant'}`}>{o}</button>
      ))}
    </div>
  )
}

export function PhotoBadge({ children }) {
  return <span className="absolute top-3 left-3 px-2 py-1 rounded bg-primary-container text-on-primary text-[10px] font-bold tracking-wider uppercase shadow">{children}</span>
}

export function MetaRow({ items }) {
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-1 font-label-sm text-label-sm text-outline">
      {items.filter((i) => i.text).map((i) => <span key={i.icon} className="flex items-center gap-1"><Icon name={i.icon} className="text-[14px]" />{i.text}</span>)}
    </p>
  )
}

export function FictionNote() {
  return <p className="font-body-sm text-[11px] italic text-outline mt-3">Fictional depiction created for design demonstration only.</p>
}

export function Accordion({ title, children, className = '' }) {
  return (
    <details className={`group border-t border-outline-variant/30 ${className}`}>
      <summary className="list-none cursor-pointer flex items-center justify-between py-3 font-label-md text-label-md text-primary font-semibold">
        {title}<Icon name="expand_more" className="text-[20px] transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-2">{children}</div>
    </details>
  )
}

export function Initial({ name }) {
  return <span className="w-10 h-10 shrink-0 rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center">{name.charAt(0)}</span>
}
