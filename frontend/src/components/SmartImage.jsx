import { useId, useState } from 'react'
import Icon from './Icon'

// Loads /images/<name>.jpg, then /images/<fallback>.jpg, then a designed placeholder.
// Drop a real photo into public/images with the same name and it replaces the placeholder.
export default function SmartImage({ name, fallback, alt, label, icon = 'image', className = '', imgClassName = '', children }) {
  const sources = [name, fallback].filter(Boolean)
  const [tried, setTried] = useState(0)
  const gid = useId().replace(/:/g, '')
  const src = sources[tried]

  return (
    <div className={`relative overflow-hidden bg-surface-container-lowest ${className}`}>
      {src ? (
        <img src={`/images/${src}.jpg`} alt={alt} loading="lazy" onError={() => setTried((t) => t + 1)} className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`} />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id={`g${gid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#191f30" />
                <stop offset="1" stopColor="#080e1e" />
              </linearGradient>
              <pattern id={`p${gid}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="#e8b33a" strokeOpacity="0.08" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#g${gid})`} />
            <rect width="100%" height="100%" fill={`url(#p${gid})`} />
          </svg>
          <span className="relative w-16 h-16 rounded-full border border-primary-container/50 flex items-center justify-center text-primary-container">
            <Icon name={icon} className="text-[32px]" />
          </span>
          {label && <span className="relative font-label-caps text-label-caps text-primary/80 uppercase tracking-widest px-4 text-center">{label}</span>}
        </div>
      )}
      {children}
    </div>
  )
}
