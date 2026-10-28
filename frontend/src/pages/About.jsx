import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { SITE } from '../data/site'

const POINTS = [
  { icon: 'volunteer_activism', title: 'Free and independent', text: 'ScamShield is a free resource. We are not a government agency, the police, or a law-enforcement body, and we are not affiliated with any.' },
  { icon: 'lock', title: 'We don\'t collect your data', text: 'There is no sign-in and no report form here. We never ask for your personal details, and the site stores nothing about you.' },
  { icon: 'flag', title: 'We point you to the real help', text: 'For anything official — reporting a crime, recovering money, identity theft — we send you straight to the authorities who handle it.' },
]

export default function About() {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">About</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">What ScamShield is</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">ScamShield is an independent guide for anyone who has been targeted by a scam, or wants to avoid one. We explain the warning signs, the steps to take if you've been caught out, and exactly where to report. That's it — clear, honest help, with no catch.</p>

      <div className="grid gap-3 mt-6">
        {POINTS.map((p) => (
          <Reveal key={p.title} className="bg-surface-container-low rounded-xl p-5 flex gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon name={p.icon} className="text-[22px]" /></div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{p.title}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="bg-surface-container rounded-xl p-5 mt-6">
        <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2"><Icon name="mail" className="text-primary" />Get in touch</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Spotted something wrong on the site, or want to suggest a resource? Email <span className="text-on-surface break-all select-all">{SITE.email}</span>. Please note we can't investigate scams or recover money — that's what the official channels are for.</p>
      </div>

      <div className="bg-surface-container-low rounded-xl p-5 mt-4 border border-error/30">
        <p className="font-body-sm text-body-sm text-on-surface-variant"><span className="text-on-surface font-semibold">Important:</span> The information on ScamShield is general and may not fit your exact situation. It is not legal or financial advice. Always follow the guidance of the official authorities and your bank.</p>
      </div>

      <Link to="/scammed" className="block text-center mt-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">I've been scammed — what do I do?</Link>
    </section>
  )
}
