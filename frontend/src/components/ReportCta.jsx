import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function ReportCta() {
  return (
    <div data-reveal="pop" className="bg-surface-container-low rounded-xl p-6 shadow-2xl text-center flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3"><Icon name="radar" className="text-[28px] animate-pulse" /></div>
      <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Public Vigilance</span>
      <h2 className="font-headline-md text-headline-md text-on-surface mt-1">See something? Report it.</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-xs leading-relaxed">The public plays a vital role in every investigation. Tips are reviewed promptly by operational analysts.</p>
      <div className="w-full flex flex-col gap-2.5 mt-5">
        <Link to="/report" className="w-full py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">File an Official Tip →</Link>
        <Link to="/arrests" className="w-full py-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-bright">Search Arrest &amp; Warrant Records</Link>
      </div>
    </div>
  )
}
