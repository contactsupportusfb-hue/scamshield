import { Link } from 'react-router-dom'
import Emblem from './Emblem'
import { SITE, FOOTER_GROUPS, SOCIALS } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-10 px-4 pt-8 pb-28">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2"><Emblem size={32} /><span className="font-headline-sm text-headline-sm text-on-surface font-bold">{SITE.name}</span></div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{SITE.blurb}</p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {FOOTER_GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="font-label-caps text-label-caps text-primary uppercase">{g.title}</h3>
              <ul className="mt-2 space-y-2">
                {g.links.map(([label, to]) => (
                  <li key={to}><Link to={to} className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-outline-variant/30 my-6" />
        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 {SITE.name}. All rights reserved.</p>
        <div className="flex gap-4 mt-2">
          {SOCIALS.map((s) => <a key={s} href="#" onClick={(e) => e.preventDefault()} className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary">{s}</a>)}
        </div>
        <p className="font-body-sm text-[11px] text-outline mt-4">VERITAS is a fictional agency. All content on this site is demonstration content.</p>
      </div>
    </footer>
  )
}
