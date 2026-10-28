export default function Emblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 4 8 13v18c0 15 10 25 24 29 14-4 24-14 24-29V13L32 4Z" fill="none" stroke="#e8b33a" strokeWidth="4" strokeLinejoin="round" />
      <path d="m21 24 11 22 11-22" fill="none" stroke="#e8b33a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
