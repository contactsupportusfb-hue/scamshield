export const SITE = {
  name: 'ScamShield',
  tagline: 'SPOT IT · STOP IT · REPORT IT',
  blurb: 'An independent guide that helps people recognise scams and report them to the right authorities. ScamShield is not a government agency or law enforcement.',
  // Fill these in with your own details before sharing the site.
  email: 'hello@scamshield.example',
}

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/scammed', label: 'Been scammed?' },
  { to: '/spot', label: 'Spot the scam' },
  { to: '/report', label: 'Where to report' },
  { to: '/about', label: 'About' },
]

export const BOTTOM_NAV = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/scammed', label: 'Help', icon: 'health_and_safety' },
  { to: '/spot', label: 'Spot', icon: 'visibility' },
  { to: '/report', label: 'Report', icon: 'flag' },
  { to: '/about', label: 'About', icon: 'info' },
]

export const FOOTER_GROUPS = [
  { title: 'Guides', links: [['Been scammed?', '/scammed'], ['Spot the scam', '/spot'], ['Where to report', '/report']] },
  { title: 'About', links: [['What ScamShield is', '/about'], ['Official help', '/report']] },
]
