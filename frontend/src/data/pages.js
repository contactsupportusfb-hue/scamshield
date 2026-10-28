// Content for Departments, Services, Investigations, Careers and the legal pages.
// Everything here is fictional demonstration content.

export const DEPT_FILTERS = ['All', 'Digital', 'Fraud & Assets', 'National Security', 'Enterprise', 'Science']

export const DEPARTMENTS = [
  {
    id: 'cyber', code: 'DIV · CYBER', category: 'Digital', name: 'Cyber Crime Division', image: 'dept-cyber', icon: 'terminal',
    summary: 'Investigates intrusions, ransomware groups and online fraud, and helps victims recover systems and data.',
    stats: ['212 agents', '14 offices', '24/7 response'],
    duties: ['Respond to intrusions against hospitals, utilities and public services', 'Trace and disrupt ransomware and extortion groups', 'Recover stolen data and decryption keys', 'Publish cyber safety guidance for the public'],
  },
  {
    id: 'financial', code: 'DIV · FIN', category: 'Fraud & Assets', name: 'Financial Crimes', image: 'dept-financial', icon: 'account_balance',
    summary: 'Follows the money behind investment fraud, laundering networks and corporate misconduct.',
    stats: ['168 agents', '$310M recovered'],
    duties: ['Investigate investment and romance fraud schemes', 'Map money-laundering networks across borders', 'Seize and return criminal proceeds to victims', 'Work with banks to flag suspicious activity'],
  },
  {
    id: 'terror', code: 'DIV · CT', category: 'National Security', name: 'Counter Terrorism', image: 'dept-terror', icon: 'shield',
    summary: 'Detects and disrupts violent extremist plots before they reach the public.',
    stats: ['240 agents', '9 joint task forces'],
    duties: ['Assess and investigate credible threats', 'Coordinate joint task forces with regional partners', 'Protect major public events', 'Support community-led prevention programs'],
  },
  {
    id: 'organized', code: 'DIV · ORG', category: 'Enterprise', name: 'Organized Crime', image: 'dept-organized', icon: 'groups',
    summary: 'Dismantles trafficking rings, racketeering enterprises and the networks that fund them.',
    stats: ['195 agents', '11 offices', '62 networks disrupted'],
    duties: ['Investigate trafficking of people, drugs and weapons', 'Build racketeering cases against network leaders', 'Run long-term undercover operations', 'Share intelligence with partner agencies'],
  },
  {
    id: 'forensics', code: 'DIV · LAB', category: 'Science', name: 'Forensics Lab', image: 'dept-forensics', icon: 'biotech',
    summary: 'Turns physical and digital evidence into findings that stand up in court.',
    stats: ['86 scientists', '41,000 exhibits a year'],
    duties: ['Analyse DNA, fingerprints and trace evidence', 'Recover data from phones and computers', 'Maintain a strict chain of custody', 'Train field teams in evidence collection'],
  },
  {
    id: 'intel', code: 'DIV · INTEL', category: 'National Security', name: 'Intelligence Analysis', image: 'dept-intel', icon: 'insights',
    summary: 'Connects tips, records and field reports to spot threats early and point investigators in the right direction.',
    stats: ['130 analysts', '3 fusion centers'],
    duties: ['Review and prioritise public tips', 'Produce threat assessments for every division', 'Spot patterns across cases and regions', 'Brief leadership and partner agencies'],
  },
]

export const SERVICES = [
  {
    icon: 'campaign', title: 'File a Tip', text: 'Share information about a crime or threat, by name or anonymously.',
    steps: ['Choose the category that best fits what you saw', 'Describe what happened, where and when', 'Add contact details only if you want a follow-up', 'Keep the reference number you receive'],
    cta: { label: 'File a tip', to: '/report' },
  },
  {
    icon: 'folder_open', title: 'Records Request', text: 'Ask for copies of public records the Bureau holds about you or a closed case.',
    steps: ['Send a request through the contact form with “Records request” as the subject', 'Include your full name and the record you are looking for', 'We confirm receipt and give you a reference', 'Most requests are answered within 30 working days'],
    cta: { label: 'Request records', to: '/contact' },
  },
  {
    icon: 'volunteer_activism', title: 'Victim Assistance', text: 'Support, information and referrals for victims of serious crimes.',
    steps: ['Contact us and tell us which case concerns you', 'A victim specialist is assigned to you', 'You receive updates as the case moves forward', 'We connect you with counselling and support services'],
    cta: { label: 'Get support', to: '/contact' },
  },
  {
    icon: 'badge', title: 'Background Checks', text: 'Identity history summaries for employment, licensing or adoption.',
    steps: ['Request an application pack through the contact form', 'Provide identification and fingerprints at a field office', 'Your request is processed and verified', 'Results are sent to you securely'],
    cta: { label: 'Start a request', to: '/contact' },
  },
  {
    icon: 'diversity_3', title: 'Community Outreach', text: 'Talks and workshops for schools, businesses and community groups.',
    steps: ['Tell us about your group and the topic you need', 'We match you with a trained outreach officer', 'Agree a date and format, in person or online', 'Receive materials to share afterwards'],
    cta: { label: 'Book a session', to: '/contact' },
  },
  {
    icon: 'security', title: 'Cyber Safety Guides', text: 'Practical guidance to protect yourself and your family online.',
    steps: ['Use strong, unique passwords and a password manager', 'Turn on two-step verification for email and banking', 'Never share codes or pay by gift card when asked unexpectedly', 'Report scams and suspicious messages to us'],
    cta: { label: 'Report a scam', to: '/report' },
  },
]

export const FAQ = [
  { q: 'Can I report a tip anonymously?', a: 'Yes. Name and email are optional on the tip form. If you leave them blank we cannot follow up with you, so include as much detail as you can.' },
  { q: 'What happens after I submit a tip?', a: 'Every tip is reviewed by an analyst. Credible information is passed to the right division. We do not always contact you, but your tip is read.' },
  { q: 'Should I use this site in an emergency?', a: 'No. If you or someone else is in immediate danger, call your local emergency number first.' },
  { q: 'How long does a records request take?', a: 'Most requests are answered within 30 working days. Complex requests may take longer, and we will tell you if so.' },
  { q: 'Do you charge for any services?', a: 'Tips, victim assistance and outreach are free. Background checks may have a processing fee, shown before you apply.' },
  { q: 'How do I know a message really came from the Bureau?', a: 'We never ask for payment, gift cards or passwords by phone or message. If in doubt, contact us directly using the details on this site.' },
]

export const WANTED = [
  { ref: '24-WN-00412', name: 'Victor Hale', charges: 'Wire fraud, money laundering', lastSeen: 'Harbor City, September 2026', reward: '$25,000' },
  { ref: '24-WN-00398', name: 'Mira Castell', charges: 'Ransomware extortion, computer intrusion', lastSeen: 'Bayview, August 2026', reward: '$50,000' },
  { ref: '24-WN-00377', name: 'Dorian Pike', charges: 'Racketeering, trafficking', lastSeen: 'Lakeport, July 2026', reward: '$40,000' },
  { ref: '24-WN-00351', name: 'Selene Ward', charges: 'Investment fraud, identity theft', lastSeen: 'Capital District, June 2026', reward: '$15,000' },
]

export const CASE_STATUSES = ['Open', 'Under review', 'Closed']

export const CASES = [
  { id: 'C-2026-1184', title: 'Hospital network intrusion', status: 'Open', division: 'Cyber Crime Division', date: 'Oct 18, 2026', summary: 'Coordinated attack on three regional hospitals; systems restored, attackers being traced.' },
  { id: 'C-2026-1172', title: 'Pension investment scheme', status: 'Open', division: 'Financial Crimes', date: 'Oct 09, 2026', summary: 'Over 400 retirees targeted by a fake pension consolidation service.' },
  { id: 'C-2026-1150', title: 'Port smuggling network', status: 'Under review', division: 'Organized Crime', date: 'Sep 27, 2026', summary: 'Evidence from a joint port operation is being reviewed for charges.' },
  { id: 'C-2026-1139', title: 'Online marketplace fraud', status: 'Open', division: 'Cyber Crime Division', date: 'Sep 15, 2026', summary: 'Fake sellers taking payment for goods that never arrive.' },
  { id: 'C-2026-1121', title: 'Public contract bribery', status: 'Under review', division: 'Financial Crimes', date: 'Sep 02, 2026', summary: 'Allegations of kickbacks on regional infrastructure contracts.' },
  { id: 'C-2026-1098', title: 'Forged identity documents', status: 'Closed', division: 'Forensics Lab', date: 'Aug 20, 2026', summary: 'Print workshop dismantled; forensic analysis linked 900 forged documents.' },
  { id: 'C-2026-1076', title: 'Threats against a public event', status: 'Closed', division: 'Counter Terrorism', date: 'Aug 04, 2026', summary: 'Threat assessed and disrupted before the event; no harm to the public.' },
  { id: 'C-2026-1052', title: 'Romance scam ring', status: 'Closed', division: 'Financial Crimes', date: 'Jul 22, 2026', summary: 'Six arrests and $2.1M returned to victims across four regions.' },
]

export const CAREER_WHY = [
  { icon: 'flag', title: 'Mission', text: 'Work that protects people every day, from stopping fraud to solving serious crimes.' },
  { icon: 'trending_up', title: 'Growth', text: 'Paid training, mentoring and clear paths to specialist and leadership roles.' },
  { icon: 'health_and_safety', title: 'Benefits', text: 'Competitive pay, health cover, pension, generous leave and family support.' },
]

export const TRACKS = [
  { id: 'agent', title: 'Special Agent', image: 'track-agent', icon: 'shield_person', text: 'Lead investigations, interview witnesses and work in the field with partner agencies.' },
  { id: 'analyst', title: 'Intelligence Analyst', image: 'track-analyst', icon: 'insights', text: 'Turn data, tips and records into insights that guide investigations.' },
  { id: 'tech', title: 'Technology & Cyber', image: 'track-tech', icon: 'terminal', text: 'Defend systems, investigate cyber crime and build the tools our teams rely on.' },
]

export const JOBS = [
  { id: 'J-101', title: 'Special Agent, Financial Crimes', track: 'Special Agent', location: 'Capital District', type: 'Full time',
    summary: 'Investigate fraud and money laundering cases from first tip to trial.',
    duties: ['Lead and support financial investigations', 'Interview witnesses and suspects', 'Prepare evidence for prosecutors'],
    requirements: ['Degree or equivalent experience', 'Strong written communication', 'Able to pass a background check'] },
  { id: 'J-102', title: 'Special Agent, Field Operations', track: 'Special Agent', location: 'Harbor City', type: 'Full time',
    summary: 'Join a field team handling organized crime and trafficking cases.',
    duties: ['Plan and carry out field operations', 'Work with regional partner agencies', 'Write clear case reports'],
    requirements: ['Physical fitness standard', 'Valid driving licence', 'Able to pass a background check'] },
  { id: 'J-201', title: 'Intelligence Analyst', track: 'Intelligence Analyst', location: 'Capital District', type: 'Full time',
    summary: 'Review tips and records to spot patterns and emerging threats.',
    duties: ['Prioritise incoming public tips', 'Write threat assessments', 'Brief investigators and leadership'],
    requirements: ['Analytical degree or experience', 'Comfort with data tools', 'Clear, concise writing'] },
  { id: 'J-202', title: 'Junior Analyst (Graduate Program)', track: 'Intelligence Analyst', location: 'Lakeport', type: 'Graduate',
    summary: 'A two-year program for early-career analysts with full training.',
    duties: ['Rotate across three divisions', 'Support senior analysts on live cases', 'Complete the analyst training course'],
    requirements: ['Recent graduate in any subject', 'Curiosity and attention to detail', 'Able to pass a background check'] },
  { id: 'J-301', title: 'Cyber Incident Responder', track: 'Technology & Cyber', location: 'Bayview', type: 'Full time',
    summary: 'Respond to live cyber attacks against public services.',
    duties: ['Contain and investigate intrusions', 'Recover systems and evidence', 'Advise victims on next steps'],
    requirements: ['Incident response experience', 'Networking and OS fundamentals', 'On-call availability'] },
  { id: 'J-302', title: 'Software Engineer, Case Tools', track: 'Technology & Cyber', location: 'Remote', type: 'Full time',
    summary: 'Build secure tools investigators use every day.',
    duties: ['Develop and maintain internal web tools', 'Work closely with investigators', 'Follow secure development practices'],
    requirements: ['Experience with modern web stacks', 'Security-minded approach', 'Able to pass a background check'] },
]

const DEMO_NOTICE = 'This is a fictional demonstration website. It is not operated by any real agency, and nothing here is legal advice.'

export const LEGAL = {
  privacy: {
    title: 'Privacy Policy', updated: 'October 28, 2026', notice: DEMO_NOTICE,
    sections: [
      { id: 'collect', title: 'Information we collect', body: ['Information you choose to give us through the tip, contact and job application forms, such as your name, email and message.', 'Basic technical data needed to run the site securely, such as your browser type.'] },
      { id: 'use', title: 'How we use it', body: ['To review tips, answer messages and process applications.', 'To keep the site secure and prevent spam and abuse.'] },
      { id: 'share', title: 'Sharing', body: ['We do not sell your information. Submissions are only visible to authorised staff.'] },
      { id: 'keep', title: 'How long we keep it', body: ['Submissions are kept only as long as needed for the purpose they were sent for, then deleted.'] },
      { id: 'rights', title: 'Your choices', body: ['You can submit tips without giving your name or email.', 'You can ask us to correct or delete information you sent by contacting us.'] },
      { id: 'contact', title: 'Contact', body: ['Questions about this policy can be sent through the Contact page.'] },
    ],
  },
  terms: {
    title: 'Terms of Use', updated: 'October 28, 2026', notice: DEMO_NOTICE,
    sections: [
      { id: 'accept', title: 'Using this site', body: ['By using this site you agree to these terms. If you do not agree, please do not use it.'] },
      { id: 'emergency', title: 'Not for emergencies', body: ['This site is not monitored around the clock. In an emergency, call your local emergency number.'] },
      { id: 'conduct', title: 'Acceptable use', body: ['Do not submit false reports, spam, threats or anyone else’s private data.', 'Do not try to access areas of the site you are not authorised to use.'] },
      { id: 'content', title: 'Site content', body: ['All names, cases and records shown on this site are fictional and for demonstration only.'] },
      { id: 'liability', title: 'Liability', body: ['The site is provided as is, without warranties of any kind.'] },
      { id: 'changes', title: 'Changes to these terms', body: ['We may update these terms. The date at the top shows the latest version.'] },
    ],
  },
  accessibility: {
    title: 'Accessibility', updated: 'October 28, 2026', notice: DEMO_NOTICE,
    sections: [
      { id: 'commitment', title: 'Our commitment', body: ['We want everyone to be able to use this site, including people who use assistive technology.'] },
      { id: 'features', title: 'What we do', body: ['High-contrast colours and readable text sizes.', 'Full keyboard navigation with visible focus outlines.', 'Text alternatives for images and labelled form fields.', 'Animations are turned off if your device asks for reduced motion.'] },
      { id: 'limits', title: 'Known limitations', body: ['Some placeholder images do not yet have detailed descriptions.'] },
      { id: 'feedback', title: 'Feedback', body: ['If something is hard to use, tell us through the Contact page and we will work to fix it.'] },
    ],
  },
}
