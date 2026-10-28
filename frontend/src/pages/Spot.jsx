import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { WARNING_SIGNS, SCAM_TYPES } from '../data/content'

export default function Spot() {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Spot the scam</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Catch it before any harm is done</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">Most scams share the same handful of tells. If a message hits one of these, slow down and check it out.</p>

      <h2 className="font-headline-md text-headline-md text-on-surface mt-7 mb-3">Warning signs</h2>
      <ul className="grid gap-3">
        {WARNING_SIGNS.map((w) => (
          <li key={w.title} className="bg-surface-container-low rounded-xl p-4 flex gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-surface-container flex items-center justify-center text-primary"><Icon name={w.icon} className="text-[20px]" /></div>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface">{w.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">{w.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <Reveal as="h2" className="font-headline-md text-headline-md text-on-surface mt-10 mb-3">Common scams</Reveal>
      <div className="grid grid-cols-2 gap-3">
        {SCAM_TYPES.map((t) => (
          <Reveal key={t.title} className="bg-surface-container-low rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon name={t.icon} className="text-[20px]" /></div>
            <h3 className="font-label-md text-label-md text-on-surface mt-2">{t.title}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">{t.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="bg-surface-container rounded-xl p-6 mt-8 text-center">
        <Icon name="shield" className="text-primary text-[28px]" />
        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-2">One simple habit</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">If someone contacts you out of the blue, stop and reach them back through a number or website you find yourself — never the details they gave you.</p>
        <Link to="/scammed" className="inline-flex items-center gap-1 mt-4 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Already caught out? Start here<Icon name="arrow_forward" className="text-[18px]" /></Link>
      </div>
    </section>
  )
}
