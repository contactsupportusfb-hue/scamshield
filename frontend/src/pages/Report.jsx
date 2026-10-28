import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { REPORT_CHANNELS } from '../data/content'

export default function Report() {
  return (
    <section className="px-4 pt-8 max-w-lg mx-auto">
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Where to report</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Report it to the real authorities</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">Reporting helps shut scams down and protects other people. ScamShield does not take reports itself — use the official channel for your country below. These links open the real government or police sites.</p>

      <div className="bg-surface-container-low rounded-xl p-4 mt-5 flex gap-3">
        <Icon name="info" className="text-primary text-[22px] shrink-0" />
        <p className="font-body-sm text-body-sm text-on-surface-variant">Have your evidence ready: what happened, dates, amounts, and any emails, numbers or usernames. You don't need all of it to file a report.</p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {REPORT_CHANNELS.map((group) => (
          <Reveal key={group.region}>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">{group.region}</h2>
            <ul className="grid gap-2">
              {group.items.map((it) => (
                <li key={it.name}>
                  <a href={it.href} target="_blank" rel="noreferrer" className="group bg-surface-container-low rounded-xl p-4 flex items-start gap-3 hover:bg-surface-container transition-colors">
                    <Icon name="open_in_new" className="text-primary text-[20px] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-label-md text-label-md text-on-surface group-hover:text-primary break-words">{it.name}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{it.note}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="bg-surface-container rounded-xl p-5 mt-8">
        <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2"><Icon name="public" className="text-primary" />Not listed here?</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Search for <span className="text-on-surface">"report fraud"</span> plus your country's name, and use the official government or police result. If money just left your account, contact your bank first — that is the same everywhere.</p>
      </div>

      <p className="font-body-sm text-[12px] text-outline mt-6">ScamShield is independent and is not affiliated with any government agency or police force. We simply point you to the official places to report.</p>
    </section>
  )
}
