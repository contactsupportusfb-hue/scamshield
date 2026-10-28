import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { RECOVERY_STEPS } from '../data/content'

export default function Scammed() {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">If you've been scammed</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">What to do now</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">Work through these steps in order. The first two matter most in the first hours. Take a breath — you can do this.</p>

      <div className="bg-surface-container-low rounded-xl p-4 mt-5 flex gap-3 border border-error/30">
        <Icon name="emergency" className="text-error text-[22px] shrink-0" />
        <p className="font-body-sm text-body-sm text-on-surface-variant">If you are in immediate danger or being threatened in person, call your local emergency number first (911 / 999 / 112).</p>
      </div>

      <ol className="mt-6 flex flex-col gap-3">
        {RECOVERY_STEPS.map((s, i) => (
          <Reveal as="li" key={s.title} delay={Math.min(i, 4) * 60} className="bg-surface-container-low rounded-xl p-5 flex gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center">{i + 1}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Icon name={s.icon} className="text-primary text-[20px]" />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{s.title}</h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="bg-surface-container rounded-xl p-6 mt-8 text-center">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Ready to report it?</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Find the official fraud authority for your country.</p>
        <Link to="/report" className="inline-flex items-center gap-1 mt-4 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Where to report<Icon name="arrow_forward" className="text-[18px]" /></Link>
      </div>

      <p className="font-body-sm text-[12px] text-outline mt-6">This page is general information, not legal or financial advice. ScamShield is independent and is not law enforcement or a government agency.</p>
    </section>
  )
}
