export const STATS = [
  { value: 11479, suffix: '+', label: 'Cases Resolved' },
  { value: 51, suffix: '', label: 'Field Offices' },
  { value: 33575, suffix: '+', label: 'Personnel' },
  { value: 104, suffix: '', label: 'Years of Service' },
]

export const MANDATE = [
  { icon: 'shield', title: 'Protect', text: 'Safeguard the public from serious crimes and hostile threats across international, domestic, and digital jurisdictions.' },
  { icon: 'fingerprint', title: 'Investigate', text: 'Pursue truth through rigorous, evidence-based investigation, forensic analysis, and comprehensive intelligence aggregation.' },
  { icon: 'lock', title: 'Uphold', text: 'Defend the law with unyielding integrity, absolute transparency, and sworn impartiality.' },
]

export const DIVISIONS = [
  { tag: 'Digital', title: 'Cyber Crime Division', text: 'Investigating cyber intrusions, hostile infrastructure, ransomware syndicates, and online threats to national security.' },
  { tag: 'Fraud & Assets', title: 'Financial Crimes', text: 'Tracing complex money laundering networks, offshore shadow finance, corporate malfeasance, and systemic fraud schemes.' },
  { tag: 'National Security', title: 'Counter Terrorism', text: 'Neutralizing hostile threat vectors and disrupting extremist activities both at home and across allied operational theaters.' },
  { tag: 'Enterprise', title: 'Organized Crime', text: 'Dismantling multi-jurisdictional criminal enterprises, cross-border trafficking rings, and racketeering syndicates.' },
]

export const TESTIMONIALS = [
  { name: 'Dana R.', role: 'Community Leader', text: 'The Bureau responded within hours of our tip and kept us informed throughout.' },
  { name: 'Marcus T.', role: 'Small Business Owner', text: 'Professional, discreet and thorough. They recovered what we thought was lost for good.' },
  { name: 'Elena V.', role: 'University Researcher', text: 'Their cyber division helped us secure our network after a serious intrusion.' },
  { name: 'Samuel O.', role: 'Retired Teacher', text: 'I reported a scam targeting seniors and saw arrests within weeks.' },
  { name: 'Priya K.', role: 'Hospital Administrator', text: 'Clear communication and real expertise. We felt supported at every step.' },
  { name: 'Jonas B.', role: 'Local Official', text: 'A trustworthy partner for our region. Their field office is outstanding.' },
]

export const ARREST_FILTERS = ['All', 'Financial', 'Organized', 'Cyber']

export const ARRESTS = [
  { ref: '24-AR-01203', image: 'arrest-1', category: 'Financial', title: 'Offshore Fraud Ring Dismantled', date: 'Oct 12, 2026', location: 'Capital District', summary: 'Seven suspects arrested in connection with a coordinated investment fraud scheme.',
    details: ['Charges: wire fraud, money laundering, conspiracy', 'Estimated losses: $48 million across 1,200 victims', 'Lead office: Headquarters, Financial Crimes Division', 'Status: Awaiting trial'] },
  { ref: '24-AR-01195', image: 'arrest-2', category: 'Organized', title: 'Cross-Border Trafficking Network', date: 'Oct 03, 2026', location: 'Harbor City', summary: 'A joint operation led to the arrest of twelve members of a racketeering syndicate.',
    details: ['Charges: racketeering, trafficking, weapons offences', 'Joint operation with three regional partners', 'Lead office: North-East Field Office', 'Status: In custody, hearing scheduled'] },
  { ref: '24-AR-01187', image: 'arrest-3', category: 'Cyber', title: 'Ransomware Operators Apprehended', date: 'Sep 21, 2026', location: 'Bayview', summary: 'Two operators of a ransomware group targeting hospitals were taken into custody.',
    details: ['Charges: computer intrusion, extortion', 'Servers seized and decryption keys recovered', 'Lead office: West Coast Field Office, Cyber Crime Division', 'Status: Pre-trial detention'] },
]

export const PRESS_FILTERS = ['All', 'Press Release', 'Statement', 'Announcement']

export const PRESS = [
  { id: 1, type: 'Press Release', title: 'Bureau Announces Record Year in Fraud Recoveries', date: 'Oct 20, 2026', featured: true, body: 'The Bureau today announced that fraud recoveries reached a record high this year, returning funds to thousands of victims. Director statements highlighted the role of public tips and inter-agency partnerships.' },
  { id: 2, type: 'Statement', title: 'Statement on Recent Cyber Intrusions', date: 'Oct 14, 2026', body: 'We are aware of a series of intrusions affecting regional hospitals. Our Cyber Crime Division is working with affected organizations and will share further guidance shortly.' },
  { id: 3, type: 'Announcement', title: 'New Field Office Opens in Lakeport', date: 'Oct 08, 2026', body: 'The Midwest Field Office opens its doors, expanding the Bureau’s ability to support local partners and communities.' },
  { id: 4, type: 'Press Release', title: 'Public Tip Line Receives Upgrade', date: 'Sep 30, 2026', body: 'The secure tip line now supports encrypted submissions and faster triage by operational analysts.' },
  { id: 5, type: 'Announcement', title: 'Applications Open for Analyst Training Program', date: 'Sep 18, 2026', body: 'Applications are now open for the Bureau’s annual analyst training program for early-career professionals.' },
]

export const GALLERY = [
  { name: 'gallery-1', caption: 'Bureau headquarters at dusk' },
  { name: 'gallery-2', caption: 'Cyber Crime Division at work' },
  { name: 'gallery-3', caption: 'Special agents on operation' },
  { name: 'gallery-4', caption: 'Joint task force briefing' },
  { name: 'gallery-5', caption: 'Forensics Lab evidence review' },
  { name: 'gallery-6', caption: 'Community outreach session' },
]

export const REPORT_CATEGORIES = [
  { id: 'fraud', label: 'Fraud & Scams', icon: 'payments' },
  { id: 'cyber', label: 'Cyber Crime', icon: 'terminal' },
  { id: 'terror', label: 'Terrorism', icon: 'warning' },
  { id: 'organized', label: 'Organized Crime', icon: 'groups' },
  { id: 'trafficking', label: 'Trafficking', icon: 'local_shipping' },
  { id: 'corruption', label: 'Corruption', icon: 'gavel' },
  { id: 'violent', label: 'Violent Crime', icon: 'personal_injury' },
  { id: 'child', label: 'Child Safety', icon: 'child_care' },
  { id: 'drugs', label: 'Narcotics', icon: 'medication' },
  { id: 'weapons', label: 'Weapons', icon: 'security' },
  { id: 'missing', label: 'Missing Persons', icon: 'person_search' },
  { id: 'other', label: 'Other', icon: 'help' },
]

export const URGENCY_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
