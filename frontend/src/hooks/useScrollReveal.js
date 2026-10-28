import { useEffect } from 'react'

// Animates every [data-reveal] element in and out as it enters or leaves the screen.
// data-reveal="left|right|up|pop"; left empty, cards alternate left and right.
export default function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    root.classList.add('reveal-on')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('is-visible', e.isIntersecting)
    }, { rootMargin: '-6% 0px -6% 0px' })
    let n = 0
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-reveal-bound])').forEach((el) => {
        el.setAttribute('data-reveal-bound', '')
        if (!el.dataset.reveal) el.dataset.reveal = n++ % 2 ? 'right' : 'left'
        io.observe(el)
      })
    }
    scan()
    // Pages, tabs and filters render new cards later; pick those up too.
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      mo.disconnect(); io.disconnect()
      root.classList.remove('reveal-on')
      document.querySelectorAll('[data-reveal-bound]').forEach((el) => el.removeAttribute('data-reveal-bound'))
    }
  }, [])
}
