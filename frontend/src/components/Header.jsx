import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import Emblem from './Emblem'
import { SITE, NAV_LINKS } from '../data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false) }
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 pt-safe">
      <div className="max-w-lg mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="VERITAS home">
          <Emblem />
          <span className="flex flex-col leading-none">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-wide">{SITE.name}</span>
            <span className="font-label-caps text-[9px] text-primary tracking-[0.2em]">{SITE.tagline}</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link to="/admin" aria-label="Staff sign in" className="p-2 text-on-surface-variant hover:text-primary"><Icon name="person" /></Link>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu" className="p-2 text-on-surface hover:text-primary">
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="absolute left-0 right-0 top-full bg-surface-container-lowest border-b border-outline-variant/40 shadow-2xl">
          <ul className="max-w-lg mx-auto">
            {NAV_LINKS.map((l) => (
              <li key={l.to} className="border-b border-outline-variant/20 last:border-0">
                <NavLink to={l.to} end={l.end} className={({ isActive }) => `flex items-center justify-between px-5 py-3.5 font-label-md text-label-md ${isActive ? 'text-primary bg-surface-container-low' : 'text-on-surface hover:bg-surface-container-low'}`}>
                  {({ isActive }) => (<>{l.label}{isActive && <span className="font-label-caps text-[9px] tracking-widest text-primary">ACTIVE</span>}</>)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
