'use client'

import { useState, useRef, useEffect } from 'react'
import Ukraine from '@react-map/ukraine'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Geographic bounds of Ukraine
const UA = { minLon: 22.15, maxLon: 40.22, minLat: 44.39, maxLat: 52.38 }

// Convert real lat/lng -> % position on the Ukraine SVG
function geoToSvgPct(lat: number, lon: number) {
  return {
    x: ((lon - UA.minLon) / (UA.maxLon - UA.minLon)) * 100,
    y: ((UA.maxLat - lat) / (UA.maxLat - UA.minLat)) * 100,
  }
}

const BRANCHES = [
  {
    id: 1,
    city: 'м. Світловодськ',
    region: 'Кіровоградська обл.',
    address: 'вул. Миру, 48(б)',
    phone: '+380 (97) 0-187-187',
    phoneHref: 'tel:+380970187187',
    mapsUrl: 'https://maps.app.goo.gl/yNN2hTXVJwE3VjTb8',
    // Exact geographic coordinates of Svitlovodsk
    lat: 49.0472,
    lon: 33.2286,
  },
]

export function BranchesSection() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [mapSize, setMapSize] = useState(770)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (mapRef.current) {
        setMapSize(Math.min(mapRef.current.offsetWidth, 770))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section className="py-24 bg-graphite">
      <div className="max-w-6xl mx-auto px-6">

        <SectionTitle
          eyebrow="Де нас знайти"
          title="Наші філії"
          subtitle="Натисніть на маркер щоб побачити адресу та контакти"
        />

        <div className="mt-10 flex flex-col lg:flex-row items-start gap-6 lg:gap-10">

          {/* MAP */}
          <div className="relative w-full lg:w-2/3">
            <div ref={mapRef} className="relative w-full">

              <Ukraine
                type="select-single"
                size={mapSize}
                mapColor="#1e1e24"
                strokeColor="#38383f"
                strokeWidth={0.8}
                hoverColor="#2c2c36"
                selectColor="#2c2c36"
                hints={false}
                onSelect={(region) => console.log('[map] region:', region)}
              />

              {/* City markers */}
              {BRANCHES.map((b) => {
                const pos = geoToSvgPct(b.lat, b.lon)
                const on = activeId === b.id
                return (
                  <button
                    key={b.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                    }}
                    onClick={() => setActiveId(on ? null : b.id)}
                    aria-label={b.city}
                  >
                    {/* Pulse ring */}
                    <span className={`absolute inset-0 rounded-full bg-gold/25
                      ${ on ? 'animate-none' : 'animate-ping' }`} />
                    {/* Outer glow */}
                    <span className="absolute -inset-2 rounded-full bg-gold/10" />
                    {/* Pin */}
                    <span className={`relative flex items-center justify-center
                      rounded-full border-2 border-cream shadow-lg
                      transition-all duration-200
                      ${ on
                        ? 'w-9 h-9 bg-cream'
                        : 'w-7 h-7 bg-gold group-hover:scale-125'
                      }`}>
                      <MapPin
                        size={on ? 16 : 13}
                        className={on ? 'text-obsidian' : 'text-obsidian'}
                        strokeWidth={2.5}
                      />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* BRANCH CARD */}
          {(() => {
            const b = BRANCHES.find(x => x.id === activeId) ?? BRANCHES[0]
            const isActive = activeId !== null
            return (
              <div className="w-full lg:w-1/3">
                <div className={`border transition-all duration-300 p-6 ${
                  isActive
                    ? 'border-gold/50 bg-obsidian shadow-[0_0_40px_rgba(201,169,110,0.12)]'
                    : 'border-white/8 bg-obsidian'
                }`}>

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold mb-1">
                        Філія №1
                      </p>
                      <p className="font-display text-2xl text-cream leading-snug">{b.city}</p>
                      <p className="font-body text-xs text-mist mt-0.5">{b.region}</p>
                    </div>
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-gold" />
                    </div>
                  </div>

                  <div className="h-px bg-white/5 mb-4" />

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-mist">{b.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-gold shrink-0" />
                      <a href={b.phoneHref}
                         className="font-body text-sm text-mist hover:text-gold transition-colors duration-200">
                        {b.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink size={14} className="text-gold shrink-0" />
                      <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
                         className="font-body text-sm text-gold underline underline-offset-2
                                    hover:text-cream transition-colors duration-200">
                        Відкрити в Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 my-4" />
                  <p className="font-body text-xs text-mist/60 leading-relaxed">
                    {isActive
                      ? 'Натисніть на маркер щоб сховати картку.'
                      : 'Натисніть на золотий маркер на карті щоб побачити адресу.'}
                  </p>
                </div>
              </div>
            )
          })()}

        </div>
      </div>
    </section>
  )
}
