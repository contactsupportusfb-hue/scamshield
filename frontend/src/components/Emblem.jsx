// Site logo (same image as the favicon). Decorative: the site name is always shown beside it.
export default function Emblem({ size = 36, className = '' }) {
  return <img src="/icon-192.png" width={size} height={size} alt="" aria-hidden="true" className={`rounded-lg shrink-0 ${className}`} />
}
