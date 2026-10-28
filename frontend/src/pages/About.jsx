import Icon from '../components/Icon'

// Static content page ported from the Stitch design.
export default function About() {
  return (
    <>
<div className="flex flex-col w-full text-on-surface">
<div className="relative px-margin-mobile pt-space-md pb-space-lg flex flex-col gap-space-sm overflow-hidden">
<div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
<div className="inline-flex items-center gap-space-xs self-start px-space-sm py-0.5 rounded-full bg-surface-container-high shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">ABOUT THE BUREAU</span>
</div>
<h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface tracking-tight mt-space-xs font-semibold">
      A century of service, guided by an unchanging oath.
    </h1>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
      Founded on the principles of fidelity, bravery, and integrity, the Bureau exists to protect the public and uphold the rule of law against all adversaries, foreign and domestic.
    </p>
<div className="grid grid-cols-2 gap-space-sm mt-space-sm">
<div className="bg-surface-container rounded-xl p-space-md flex flex-col shadow-sm">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">ESTABLISHED</span>
<span className="font-metric-lg text-metric-lg text-primary font-bold mt-1">1908</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Sovereign Charter</span>
</div>
<div className="bg-surface-container rounded-xl p-space-md flex flex-col shadow-sm">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">FIELD DIVISIONS</span>
<span className="font-metric-lg text-metric-lg text-primary font-bold mt-1">56</span>
<span className="font-label-sm text-label-sm text-tertiary">Active National Reach</span>
</div>
</div>
</div>
<section className="px-margin-mobile py-space-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">MISSION · VISION · VALUES</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">DOC // 001-DIR</span>
</div>
<div className="flex flex-col gap-space-sm">
<div className="bg-surface-container rounded-xl p-space-lg shadow-md transition-all duration-300 active:scale-[0.99] flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm mb-space-xs">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-inner">
<Icon name="explore" className="text-[24px]" />
</div>
<div>
<span className="font-label-caps text-label-caps text-primary tracking-wider uppercase block">PRIMARY DIRECTIVE</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Mission</h3>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Protect the nation from serious crime, threats to national security, and complex transnational activity with relentless diligence and precision.
        </p>
</div>
<div className="bg-surface-container rounded-xl p-space-lg shadow-md transition-all duration-300 active:scale-[0.99] flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm mb-space-xs">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-inner">
<Icon name="visibility" className="text-[24px]" />
</div>
<div>
<span className="font-label-caps text-label-caps text-primary tracking-wider uppercase block">STRATEGIC HORIZON</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Vision</h3>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          A safer republic where justice is pursued impartially and truth is the ultimate arbiter across every jurisdiction and investigative domain.
        </p>
</div>
<div className="bg-surface-container rounded-xl p-space-lg shadow-md transition-all duration-300 active:scale-[0.99] flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm mb-space-xs">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-inner">
<span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: '\'FILL\' 1' }}>military_tech</span>
</div>
<div>
<span className="font-label-caps text-label-caps text-primary tracking-wider uppercase block">CORE ETHICS</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Values</h3>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Fidelity to the law, bravery under pressure, and uncompromising integrity in every action undertaken by our agents.
        </p>
</div>
</div>
</section>
<section className="px-margin-mobile py-space-md">
<div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-surface-container-high">
<img className="w-full h-44 object-cover" src="/images/hq.jpg" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent flex flex-col justify-end p-space-md">
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">HEADQUARTERS COMMAND</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-medium">Veritas Sovereign Annex</span>
</div>
</div>
</section>
<section className="px-margin-mobile py-space-sm flex flex-col gap-space-sm">
<div className="flex flex-col mb-space-xs">
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">LEADERSHIP</span>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">Executive team</h2>
</div>
<div className="flex flex-col gap-space-sm">
<div className="bg-surface-container rounded-xl p-space-md flex items-center gap-space-md shadow-sm transition-all duration-200 active:scale-[0.99]">
<div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold flex-shrink-0 shadow-md">
          H
        </div>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-bold truncate">Dir. Amelia Hartwell</span>
<span className="font-label-caps text-label-caps px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-bold">SEC-01</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Director of Bureau Operations</span>
</div>
</div>
<div className="bg-surface-container rounded-xl p-space-md flex items-center gap-space-md shadow-sm transition-all duration-200 active:scale-[0.99]">
<div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold flex-shrink-0 shadow-md">
          C
        </div>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-bold truncate">Dep. Dir. Marcus Chen</span>
<span className="font-label-caps text-label-caps px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-bold">SEC-02</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Deputy Director</span>
</div>
</div>
<div className="bg-surface-container rounded-xl p-space-md flex items-center gap-space-md shadow-sm transition-all duration-200 active:scale-[0.99]">
<div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold flex-shrink-0 shadow-md">
          R
        </div>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-bold truncate">AD Priya Ramanathan</span>
<span className="font-label-caps text-label-caps px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant">INTEL</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Assoc. Director, Intelligence</span>
</div>
</div>
<div className="bg-surface-container rounded-xl p-space-md flex items-center gap-space-md shadow-sm transition-all duration-200 active:scale-[0.99]">
<div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold flex-shrink-0 shadow-md">
          V
        </div>
<div className="flex flex-col min-w-0 flex-1">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-bold truncate">AD Jonathan Vega</span>
<span className="font-label-caps text-label-caps px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant">CYBER</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Assoc. Director, Cyber Special Operations</span>
</div>
</div>
</div>
</section>
<section className="px-margin-mobile py-space-md flex flex-col gap-space-sm">
<div className="flex flex-col mb-space-xs">
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">STRUCTURE</span>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">Organizational structure</h2>
</div>
<div className="bg-surface-container rounded-xl p-space-lg shadow-md flex flex-col gap-space-lg">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">EXECUTIVE</span>
</div>
<div className="bg-surface-container-high rounded-lg p-space-md flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm text-on-surface">
<Icon name="account_balance" className="text-[18px] text-primary" />
<span className="font-body-md text-body-md font-medium">Office of the Director</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface">
<Icon name="shield" className="text-[18px] text-primary" />
<span className="font-body-md text-body-md font-medium">Deputy Director Executive Command</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface">
<Icon name="badge" className="text-[18px] text-primary" />
<span className="font-body-md text-body-md font-medium">Chief of Staff & Legal Counsel</span>
</div>
</div>
</div>
<div className="h-px w-full bg-surface-variant/40"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">BRANCHES</span>
</div>
<div className="grid grid-cols-1 gap-space-xs">
<div className="bg-surface-container-high rounded-lg p-space-md flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">National Security Branch</span>
<Icon name="lock" className="text-[18px] text-tertiary" />
</div>
<div className="bg-surface-container-high rounded-lg p-space-md flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">Criminal Investigative Branch</span>
<Icon name="policy" className="text-[18px] text-tertiary" />
</div>
<div className="bg-surface-container-high rounded-lg p-space-md flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">Intelligence Branch</span>
<Icon name="radar" className="text-[18px] text-tertiary" />
</div>
<div className="bg-surface-container-high rounded-lg p-space-md flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">Science & Technology Branch</span>
<Icon name="biotech" className="text-[18px] text-tertiary" />
</div>
</div>
</div>
<div className="h-px w-full bg-surface-variant/40"></div>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">SUPPORT</span>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<div className="bg-surface-container-high rounded-lg p-space-sm flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface font-medium">Human Resources</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Personnel & Academy</span>
</div>
<div className="bg-surface-container-high rounded-lg p-space-sm flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface font-medium">Information Tech</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Secure Mesh & Cloud</span>
</div>
<div className="bg-surface-container-high rounded-lg p-space-sm flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface font-medium">Finance & Facilities</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Logistics & Ordnance</span>
</div>
<div className="bg-surface-container-high rounded-lg p-space-sm flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface font-medium">Public Affairs</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Congressional Liaison</span>
</div>
</div>
</div>
</div>
</section>
<section className="px-margin-mobile py-space-md flex flex-col gap-space-sm">
<div className="flex flex-col mb-space-xs">
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">HISTORY</span>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">A timeline of milestones</h2>
</div>
<div className="relative pl-6 flex flex-col gap-space-lg my-space-xs">
<div className="absolute left-2 top-2 bottom-3 w-0.5 bg-surface-container-highest"></div>
<div className="relative flex flex-col group">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/30"></span>
</div>
<div className="bg-surface-container rounded-xl p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99]">
<div className="flex items-center justify-between">
<span className="font-metric-lg text-metric-lg text-on-surface font-bold">1908</span>
<span className="font-label-caps text-label-caps text-primary">FOUNDATIONAL</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Bureau established under executive mandate to investigate interstate commercial fraud and statutory violations.
          </p>
</div>
</div>
<div className="relative flex flex-col group">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div className="bg-surface-container rounded-xl p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99]">
<div className="flex items-center justify-between">
<span className="font-metric-lg text-metric-lg text-on-surface font-bold">1945</span>
<span className="font-label-caps text-label-caps text-tertiary">JURISDICTION</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Post-war expansion of national jurisdiction, consolidating counter-espionage and sovereign sabotage investigations.
          </p>
</div>
</div>
<div className="relative flex flex-col group">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div className="bg-surface-container rounded-xl p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99]">
<div className="flex items-center justify-between">
<span className="font-metric-lg text-metric-lg text-on-surface font-bold">1972</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">FORENSICS</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Behavioral Analysis Unit founded, pioneering scientific psychological profiling of serial offenders.
          </p>
</div>
</div>
<div className="relative flex flex-col group">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div className="bg-surface-container rounded-xl p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99]">
<div className="flex items-center justify-between">
<span className="font-metric-lg text-metric-lg text-on-surface font-bold">2001</span>
<span className="font-label-caps text-label-caps text-primary">SECURITY</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Counter Terrorism Division reorganized to establish modern multi-agency intelligence fusion task forces.
          </p>
</div>
</div>
<div className="relative flex flex-col group">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div className="bg-surface-container rounded-xl p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99]">
<div className="flex items-center justify-between">
<span className="font-metric-lg text-metric-lg text-on-surface font-bold">2014</span>
<span className="font-label-caps text-label-caps text-tertiary">CYBERSPACE</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Cyber Crime Division formalized to combat state-sponsored digital espionage, ransomware cartels, and critical infrastructure attacks.
          </p>
</div>
</div>
<div className="relative flex flex-col group">
<div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
</div>
<div className="bg-surface-container rounded-xl p-space-md shadow-sm transition-transform duration-200 active:scale-[0.99]">
<div className="flex items-center justify-between">
<span className="font-metric-lg text-metric-lg text-primary font-bold">2026</span>
<span className="font-label-caps text-label-caps px-space-xs py-0.5 rounded bg-primary-container text-on-primary font-bold">EXPANSION</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Digital Forensics Lab expansion integrates real-time autonomous cryptographic tracing and quantum decryption defense.
          </p>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-high self-start mt-space-xs">
<Icon name="group" className="text-[16px] text-on-surface-variant" />
<span className="font-body-sm text-body-sm text-on-surface-variant italic">Fictional history for demonstration only.</span>
</div>
</section>

</div>
    </>
  )
}
