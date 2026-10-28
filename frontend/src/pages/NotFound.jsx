import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <section className="px-4 py-20 max-w-lg mx-auto text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center"><Icon name="search_off" className="text-[32px]" /></div>
      <span className="block mt-4 font-label-caps text-label-caps text-primary uppercase tracking-widest">404</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">Page not found</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">The page you are looking for does not exist.</p>
      <Link to="/" className="inline-block mt-6 px-6 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold">Back to Home</Link>
    </section>
  )
}
