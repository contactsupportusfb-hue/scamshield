import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { BOTTOM_NAV } from '../data/site'

export default function BottomNav() {
  return (
    <nav aria-label="Primary" className="fixed bottom-0 inset-x-0 z-30 bg-surface-container-lowest/95 backdrop-blur border-t border-outline-variant/30 pb-safe">
      <ul className="max-w-lg mx-auto grid grid-cols-5">
        {BOTTOM_NAV.map((n) => (
          <li key={n.to}>
            <NavLink to={n.to} end={n.end} className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
              {({ isActive }) => (<><Icon name={n.icon} fill={isActive} /><span className="font-label-sm text-[11px]">{n.label}</span></>)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
