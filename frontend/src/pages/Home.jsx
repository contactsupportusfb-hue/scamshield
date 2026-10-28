import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import useCountUp from '../hooks/useCountUp'
import ReportCta from '../components/ReportCta'
import SmartImage from '../components/SmartImage'
import { STATS, MANDATE, DIVISIONS, TESTIMONIALS } from '../data/content'

function Stat({ value, suffix, label }) {
  const [ref, v] = useCountUp(value)
  return (
    <div ref={ref} data-reveal="pop" className="bg-surface-container-low rounded-xl p-4 text-center">
      <div className="font-metric-lg text-metric-lg text-primary">{v.toLocaleString()}{suffix}</div>
      <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">{label}</div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="relative h-[520px] overflow-hidden">
        <SmartImage name="home-hero" alt="Bureau headquarters building at dusk" icon="account_balance" className="!absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/20" />
        <div className="relative h-full max-w-lg mx-auto px-4 flex flex-col justify-end pb-8">
          <span className="self-start px-3 py-1 rounded-full bg-primary-container/15 border border-primary-container/40 text-primary font-label-caps text-label-caps tracking-widest">EST. 1908</span>
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface mt-3">Fidelity. Bravery. Integrity.</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">VERITAS Bureau of Investigation protects the public through intelligence, investigation and the rule of law.</p>
          <div className="flex gap-3 mt-5">
            <a href="#mandate" className="flex-1 py-3 rounded-lg text-center bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Learn More</a>
            <Link to="/contact" className="flex-1 py-3 rounded-lg text-center border border-outline-variant text-on-surface font-label-md text-label-md">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="px-4 -mt-2 max-w-lg mx-auto grid grid-cols-2 gap-3">
        {STATS.map((s) => <Stat key={s.label} {...s} />)}
      </section>

      <section id="mandate" className="px-4 pt-10 max-w-lg mx-auto scroll-mt-20">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Our Mandate</span>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-1 mb-4">Protect. Investigate. Uphold.</h2>
        <div className="flex flex-col gap-3">
          {MANDATE.map((m) => (
            <div key={m.title} data-reveal className="bg-surface-container-low rounded-xl p-5 shadow-md hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary"><Icon name={m.icon} className="text-[20px]" /></div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{m.title}</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-10 max-w-lg mx-auto">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Divisions</span>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-1 mb-4">Specialized expertise, unified purpose.</h2>
        <div className="flex flex-col gap-3">
          {DIVISIONS.map((d) => (
            <Link to="/departments" key={d.title} data-reveal className="group bg-surface-container-low rounded-xl p-4 flex items-start justify-between hover:bg-surface-container transition-colors">
              <div className="pr-2">
                <span className="font-label-caps text-label-caps text-primary uppercase">{d.tag}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">{d.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{d.text}</p>
              </div>
              <Icon name="arrow_forward" className="text-outline text-[20px] mt-2 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
        <Link to="/departments" className="block text-center mt-3 py-2 font-label-md text-label-md font-semibold text-primary">View all divisions →</Link>
      </section>

      <section className="px-4 my-8 max-w-lg mx-auto">
        <ReportCta />
      </section>

      <section className="pt-2 max-w-lg mx-auto">
        <div className="px-4">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Voices</span>
          <h2 className="font-headline-md text-headline-md text-on-surface mt-1 mb-4">Trusted by the communities we serve.</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x px-4 pb-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} data-reveal="pop" className="snap-start shrink-0 w-72 bg-surface-container-low rounded-xl p-5">
              <Icon name="format_quote" className="text-primary" />
              <blockquote className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{t.text}</blockquote>
              <figcaption className="mt-3 font-label-md text-label-md text-on-surface">{t.name}<span className="block font-label-sm text-label-sm text-outline">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
