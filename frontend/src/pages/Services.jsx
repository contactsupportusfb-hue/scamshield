import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import { PageIntro, SectionTitle, Accordion } from '../components/Cards'
import { SERVICES, FAQ } from '../data/pages'

export default function Services() {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <PageIntro eyebrow="Public Services" title="How we serve the public.">
        From tips to records and victim support, here is how to get help from the Bureau.
      </PageIntro>

      <SmartImage name="services-hero" alt="Bureau public service desk" label="Public services" icon="support_agent" className="aspect-video rounded-xl mt-5" />

      <div className="flex flex-col gap-3 mt-6">
        {SERVICES.map((s) => (
          <article key={s.title} data-reveal className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center"><Icon name={s.icon} /></span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{s.title}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{s.text}</p>
              </div>
            </div>
            <Accordion title="How it works" className="mt-3">
              <ol className="space-y-2">
                {s.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-primary-container text-on-primary text-[12px] font-bold flex items-center justify-center">{i + 1}</span>{step}
                  </li>
                ))}
              </ol>
              <Link to={s.cta.to} className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">{s.cta.label}</Link>
            </Accordion>
          </article>
        ))}
      </div>

      <SectionTitle eyebrow="FAQ" title="Questions, answered." />
      <div data-reveal="up" className="bg-surface-container-low rounded-xl px-4 border border-outline-variant/20">
        {FAQ.map((f, i) => (
          <Accordion key={f.q} title={<span className="text-on-surface text-left pr-3">{f.q}</span>} className={i === 0 ? 'border-t-0' : ''}>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{f.a}</p>
          </Accordion>
        ))}
      </div>
    </section>
  )
}
