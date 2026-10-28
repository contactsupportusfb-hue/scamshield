import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Emblem from '../components/Emblem'
import { WARNING_SIGNS } from '../data/content'

function Card({ to, icon, title, text, cta }) {
  return (
    <Link to={to} className="group bg-surface-container-low rounded-xl p-5 flex flex-col hover:bg-surface-container transition-colors">
      <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon name={icon} className="text-[24px]" /></div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-3">{title}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed flex-1">{text}</p>
      <span className="font-label-md text-label-md text-primary mt-3 flex items-center gap-1">{cta}<Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" /></span>
    </Link>
  )
}

export default function Home() {
  return (
    <>
      <section className="px-4 pt-12 pb-8 max-w-lg mx-auto text-center">
        <Emblem size={56} className="mx-auto" />
        <span className="block mt-4 font-label-caps text-label-caps text-primary uppercase tracking-widest">Spot it · Stop it · Report it</span>
        <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface mt-2">Been scammed, or worried you're about to be?</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-3">ScamShield helps you recognise scams, take the right steps fast, and report them to the real authorities. Free, independent, and here to help.</p>
        <div className="flex flex-col gap-2.5 mt-6">
          <Link to="/scammed" className="w-full py-3.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">I've been scammed — what do I do?</Link>
          <Link to="/report" className="w-full py-3.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-bright">Where to report a scam</Link>
        </div>
      </section>

      <Reveal as="section" className="px-4 pt-6 max-w-lg mx-auto grid gap-3">
        <Card to="/scammed" icon="health_and_safety" title="Just been scammed?" text="A clear, ordered checklist of what to do in the first hours — stop payments, secure your accounts and protect your identity." cta="Start the steps" />
        <Card to="/spot" icon="visibility" title="Spot the scam" text="Learn the warning signs and the most common scams, so you can catch them before any harm is done." cta="See the signs" />
        <Card to="/report" icon="flag" title="Report to the authorities" text="Official places to report fraud in your country, with direct links you can trust." cta="Find where" />
      </Reveal>

      <Reveal as="section" className="px-4 pt-10 max-w-lg mx-auto">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Quick check</span>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-1 mb-4">Six signs it might be a scam</h2>
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
      </Reveal>

      <Reveal as="section" className="px-4 my-10 max-w-lg mx-auto">
        <div className="bg-surface-container-low rounded-xl p-6 text-center border border-error/30">
          <Icon name="emergency" className="text-error text-[28px]" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface mt-2">In immediate danger or being threatened?</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Contact your local emergency number right away (911 in the US, 999 in the UK, 112 in the EU). ScamShield is an information guide, not an emergency service.</p>
        </div>
      </Reveal>
    </>
  )
}
