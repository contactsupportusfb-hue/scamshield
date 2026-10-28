import { useEffect, useState } from 'react'
import Icon from './Icon'
import { SITE } from '../data/site'

export default function FloatingButtons() {
  const [modal, setModal] = useState(false)
  const [top, setTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <>
      <button onClick={() => setModal(true)} aria-label="Call the Bureau" className="fixed left-4 bottom-28 z-30 w-12 h-12 rounded-full bg-primary-container text-on-primary shadow-xl flex items-center justify-center active:scale-95 transition">
        <Icon name="call" fill />
      </button>
      {top && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="fixed right-4 bottom-28 z-30 w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/40 text-on-surface shadow-xl flex items-center justify-center active:scale-95 transition">
          <Icon name="keyboard_arrow_up" />
        </button>
      )}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6" onClick={() => setModal(false)} role="dialog" aria-modal="true" aria-label="Call the Bureau">
          <div className="w-full max-w-xs bg-surface-container rounded-xl p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-headline-sm text-headline-sm text-on-surface text-center">Call the Bureau</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-1">For emergencies, contact your local emergency number.</p>
            <a href={SITE.phoneHref} className="block mt-4 py-3 rounded-lg text-center font-label-md text-label-md font-semibold bg-tertiary-container text-on-tertiary">Call {SITE.phone}</a>
            <button onClick={() => setModal(false)} className="block w-full mt-2 py-3 rounded-lg text-center font-label-md text-label-md bg-surface-bright text-on-surface">Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}
