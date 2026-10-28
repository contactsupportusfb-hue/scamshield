export const SITE = {
  name: 'VERITAS',
  tagline: 'BUREAU OF INVESTIGATION',
  blurb: 'A national investigation agency serving the public.',
  phone: '+1 (555) 010-0100',
  phoneHref: 'tel:+15550100100',
  email: 'contact@veritas.example',
}

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/departments', label: 'Departments' },
  { to: '/services', label: 'Services' },
  { to: '/investigations', label: 'Investigations' },
  { to: '/arrests', label: 'Arrests' },
  { to: '/report', label: 'Report' },
  { to: '/press', label: 'Press Center' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

export const BOTTOM_NAV = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/arrests', label: 'Intel', icon: 'shield_person' },
  { to: '/report', label: 'Report', icon: 'campaign' },
  { to: '/press', label: 'Press', icon: 'newspaper' },
  { to: '/contact', label: 'Contact', icon: 'call' },
]

export const FOOTER_GROUPS = [
  { title: 'Explore', links: [['About', '/about'], ['Departments', '/departments'], ['Services', '/services'], ['Investigations', '/investigations']] },
  { title: 'Public', links: [['Press Center', '/press'], ['Careers', '/careers'], ['Contact', '/contact'], ['Admin', '/admin']] },
  { title: 'Legal', links: [['Privacy Policy', '/privacy'], ['Terms of Use', '/terms'], ['Accessibility', '/accessibility']] },
]

export const SOCIALS = ['Twitter', 'LinkedIn', 'YouTube', 'RSS']

export const OFFICES = [
  { id: 'hq', name: 'Headquarters', city: 'Capital District', address: '100 Veritas Plaza, Capital District', phone: '+1 (555) 010-0100', x: 328, y: 105 },
  { id: 'ne', name: 'North-East Field Office', city: 'Harbor City', address: '45 Granite Street, Harbor City', phone: '+1 (555) 010-0145', x: 340, y: 88 },
  { id: 'wc', name: 'West Coast Field Office', city: 'Bayview', address: '800 Pacific Avenue, Bayview', phone: '+1 (555) 010-0180', x: 75, y: 135 },
  { id: 'mw', name: 'Midwest Field Office', city: 'Lakeport', address: '12 Meridian Road, Lakeport', phone: '+1 (555) 010-0212', x: 230, y: 95 },
]
