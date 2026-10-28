import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import { SectionTitle } from '../components/Cards'
import { PRESS, PRESS_FILTERS, GALLERY } from '../data/content'

export default function Press() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('All')
  const [article, setArticle] = useState(null)
  const [lb, setLb] = useState(null)
  const [touchX, setTouchX] = useState(null)

  const list = PRESS.filter((p) => (type === 'All' || p.type === type) && p.title.toLowerCase().includes(q.trim().toLowerCase()))
  const featured = PRESS.find((p) => p.featured)
  const step = (d) => setLb((i) => (i + d + GALLERY.length) % GALLERY.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setArticle(null); setLb(null) }
      if (lb !== null && e.key === 'ArrowRight') step(1)
      if (lb !== null && e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lb])

  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Newsroom</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Press Center</h1>

      {featured && !q && type === 'All' && (
        <button data-reveal="pop" onClick={() => setArticle(featured)} className="text-left w-full mt-5 bg-surface-container-low rounded-xl p-5 border border-primary-container/30">
          <span className="font-label-caps text-label-caps text-primary uppercase">Featured · {featured.type}</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">{featured.title}</h2>
          <p className="font-label-sm text-label-sm text-outline mt-2">{featured.date}</p>
        </button>
      )}

      <div className="relative mt-5">
        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search press releases" aria-label="Search press releases" className="w-full pl-10 pr-3 py-3 rounded-lg bg-surface-container text-on-surface border border-outline-variant/40 placeholder:text-outline" />
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
        {PRESS_FILTERS.map((f) => (
          <button key={f} onClick={() => setType(f)} className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md border ${type === f ? 'bg-primary-container text-on-primary border-primary-container' : 'border-outline-variant text-on-surface-variant'}`}>{f}</button>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {list.map((p) => (
          <button key={p.id} data-reveal onClick={() => setArticle(p)} className="text-left bg-surface-container-low rounded-xl p-4 hover:bg-surface-container transition-colors">
            <span className="font-label-caps text-label-caps text-primary uppercase">{p.type}</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">{p.title}</h3>
            <p className="font-label-sm text-label-sm text-outline mt-1">{p.date}</p>
          </button>
        ))}
        {list.length === 0 && <p className="text-center py-8 text-on-surface-variant">No results found.</p>}
      </div>

      <SectionTitle eyebrow="Gallery" title="From recent operations" />
      <div className="grid grid-cols-2 gap-3">
        {GALLERY.map((g, i) => (
          <button key={g.name} data-reveal="pop" onClick={() => setLb(i)} className="overflow-hidden rounded-xl" aria-label={g.caption}>
            <SmartImage name={g.name} alt={g.caption} label={g.caption} icon="photo_camera" className="aspect-square" imgClassName="hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>

      {article && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center" onClick={() => setArticle(null)} role="dialog" aria-modal="true">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-surface-container rounded-t-2xl sm:rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start gap-3">
              <span className="font-label-caps text-label-caps text-primary uppercase">{article.type} · {article.date}</span>
              <button onClick={() => setArticle(null)} aria-label="Close"><Icon name="close" /></button>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-2">{article.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">{article.body}</p>
          </div>
        </div>
      )}

      {lb !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setLb(null)} role="dialog" aria-modal="true"
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => { if (touchX !== null) { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1) } setTouchX(null) }}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setLb(null)} aria-label="Close"><Icon name="close" className="text-[32px]" /></button>
          <button className="absolute left-2 text-white" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous"><Icon name="chevron_left" className="text-[40px]" /></button>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg"><SmartImage key={GALLERY[lb].name} name={GALLERY[lb].name} alt={GALLERY[lb].caption} label={GALLERY[lb].caption} icon="photo_camera" className="aspect-square rounded-lg" /></div>
          <p className="text-white/80 mt-3 font-body-sm">{GALLERY[lb].caption} · {lb + 1}/{GALLERY.length}</p>
          <button className="absolute right-2 text-white" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next"><Icon name="chevron_right" className="text-[40px]" /></button>
        </div>
      )}
    </section>
  )
}
