import { useEffect, useState } from 'react'
import Icon from './Icon'

const cache = new Map()

// OpenStreetMap's free geocoder. Only called when a staff member opens a report, so usage stays tiny.
async function geocode(q) {
  if (cache.has(q)) return cache.get(q)
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=en&q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('lookup failed')
  const [hit] = await res.json()
  const out = hit ? { lat: Number(hit.lat), lng: Number(hit.lon), label: hit.display_name } : null
  cache.set(q, out)
  return out
}

export default function LocationMap({ lat, lng, query }) {
  const exact = lat != null && lng != null
  const [found, setFound] = useState(exact ? { lat, lng } : undefined)
  const [lookupFailed, setLookupFailed] = useState(false)

  useEffect(() => {
    if (exact || !query) return
    let live = true
    geocode(query).then((r) => live && setFound(r)).catch(() => live && setLookupFailed(true))
    return () => { live = false }
  }, [exact, query])

  if (!exact && !query) return null
  if (lookupFailed) return <p className="font-body-sm text-body-sm text-outline mt-2">Map lookup is unavailable right now.</p>
  if (found === undefined) return <p className="font-body-sm text-body-sm text-outline mt-2" role="status">Looking up the location…</p>
  if (found === null) return <p className="font-body-sm text-body-sm text-outline mt-2 flex items-center gap-1"><Icon name="location_off" className="text-[18px]" />This location could not be found on the map.</p>

  const { lat: y, lng: x } = found
  const bbox = [x - 0.01, y - 0.006, x + 0.01, y + 0.006].join(',')
  return (
    <div className="mt-2">
      <iframe title="Report location map" loading="lazy" className="w-full aspect-[16/9] rounded-lg border border-outline-variant/40 bg-surface-container" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${y},${x}`} />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-body-sm text-body-sm">
        <span className="text-outline">{exact ? 'Exact location shared by the reporter' : `Approximate: ${found.label}`}</span>
        <a href={`https://www.openstreetmap.org/?mlat=${y}&mlon=${x}#map=16/${y}/${x}`} target="_blank" rel="noreferrer" className="text-primary">OpenStreetMap</a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${y},${x}`} target="_blank" rel="noreferrer" className="text-primary">Google Maps</a>
      </div>
    </div>
  )
}
