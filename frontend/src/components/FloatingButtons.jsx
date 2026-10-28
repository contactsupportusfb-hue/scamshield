import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function FloatingButtons() {
  const [top, setTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <Link to="/scammed" aria-label="Been scammed? Get help" className="fixed left-4 bottom-24 z-30 flex items-center gap-2 h-12 px-4 rounded-full bg-primary-container text-on-primary shadow-xl active:scale-95 transition">
        <Icon name="health_and_safety" fill /><span className="font-label-md text-label-md font-semibold">Get help</span>
      </Link>
      {top && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="fixed right-4 bottom-24 z-30 w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface shadow-xl flex items-center justify-center active:scale-95 transition">
          <Icon name="keyboard_arrow_up" />
        </button>
      )}
    </>
  )
}
