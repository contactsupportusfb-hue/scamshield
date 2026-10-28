import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { BOTTOM_NAV } from '../data/site'

export default function BottomNav() {
  return (
    <nav aria-label="Primary" className="fixed z-30 left-4 right-4 mx-auto max-w-sm bottom-[calc(14px+env(safe-area-inset-bottom))] rounded-full bg-surface-container-low/90 backdrop-blur-md border border-outline-variant/30 shadow-lg shadow-black/40">
      <ul className="grid grid-cols-5 gap-1 p-1.5">
        {BOTTOM_NAV.map((n) => (
          <li key={n.to}>
            <NavLink
              to={n.to}
              end={n.end}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 rounded-full py-1.5 transition-colors duration-200 active:scale-95 ${isActive ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {({ isActive }) => (
                <>
                  <Icon name={n.icon} fill={isActive} className="text-[22px]" />
                  <span className="font-label-sm text-[11px] font-normal leading-none">{n.label}</span>
                  <span className={`w-1 h-1 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary' : 'bg-transparent'}`} aria-hidden="true" />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
