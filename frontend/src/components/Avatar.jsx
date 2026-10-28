import { useState } from 'react'

export default function Avatar({ src, name, size = 40 }) {
  const [broken, setBroken] = useState(false)
  const initial = (name || '?').trim().charAt(0).toUpperCase()
  if (src && !broken) {
    return <img src={src} alt="" width={size} height={size} referrerPolicy="no-referrer" onError={() => setBroken(true)} className="rounded-full object-cover shrink-0" style={{ width: size, height: size }} />
  }
  return (
    <span aria-hidden="true" className="rounded-full bg-primary/15 text-primary font-label-md font-semibold flex items-center justify-center shrink-0" style={{ width: size, height: size }}>{initial}</span>
  )
}
