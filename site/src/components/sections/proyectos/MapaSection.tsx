'use client'

import { useEffect, useRef } from 'react'
import { Project } from '@/types/project'
import SectionLabel from '@/components/shared/SectionLabel'

type Props = {
  projects: Project[]
}

export default function MapaSection({ projects }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  const withCoords = projects.filter((p) => p.coordinates)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let map: unknown = null
    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return
      // Load Leaflet CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)

      map = L.map(mapRef.current!, {
        scrollWheelZoom: false,
        attributionControl: false,
      }).setView([-34.657, -58.504], 15)
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map as ReturnType<typeof L.map>)

      // Delimitación del barrio de Mataderos desde Nominatim
      fetch(
        'https://nominatim.openstreetmap.org/search?q=Mataderos,Buenos+Aires,Argentina&format=geojson&polygon_geojson=1&limit=1'
      )
        .then((r) => r.json())
        .then((data) => {
          const feature = data.features?.[0]
          if (!feature || feature.geometry.type === 'Point') return
          L.geoJSON(feature, {
            style: {
              color: '#B59969',
              weight: 1.5,
              fillColor: '#B59969',
              fillOpacity: 0.10,
              dashArray: '5 5',
            },
          }).addTo(map as ReturnType<typeof L.map>)
        })
        .catch(() => {})

      const pinIcon = L.divIcon({
        html: `<div style="width:36px;height:36px;background:#B59969;border-radius:2px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.22);cursor:pointer;transition:background 0.2s ease,transform 0.2s ease">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 12h4"/><path d="M10 8h4"/>
            <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>
            <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
            <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
          </svg>
        </div>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -22],
      })

      withCoords.forEach((p) => {
        const isActive = p.status === 'En Ejecución'
        const dotColor = isActive ? '#B59969' : 'rgba(30,30,30,0.45)'
        const pillLabel = isActive ? 'EN EJECUCIÓN' : 'TERMINADO'

        const popupHtml = `
          <div style="width:260px;font-family:'Montserrat',sans-serif;">
            <div style="height:164px;overflow:hidden;background:#E9E9E9;">
              <img src="${p.coverImage}" alt="${p.title}"
                style="width:100%;height:100%;object-fit:cover;display:block;"
                onerror="this.style.display='none'" />
            </div>
            <div style="padding:16px 18px 18px;">
              <div style="display:inline-flex;align-items:center;gap:6px;font-size:9px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;border:1px solid #E9E9E9;border-radius:2px;color:#1E1E1E;margin-bottom:10px;">
                <span style="width:5px;height:5px;border-radius:50%;background:${dotColor};flex-shrink:0;"></span>
                ${pillLabel}
              </div>
              <div style="font-size:15px;font-weight:700;letter-spacing:-0.01em;text-transform:uppercase;color:#1E1E1E;line-height:1.1;margin-bottom:5px;">${p.title}</div>
              <div style="font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:rgba(30,30,30,0.55);margin-bottom:14px;">${p.neighborhood ?? p.location}</div>
              <a href="/proyectos/${p.slug}"
                style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#1E1E1E;border-bottom:1px solid #1E1E1E;padding-bottom:2px;display:inline-block;cursor:pointer;text-decoration:none;">
                VER PROYECTO →
              </a>
            </div>
          </div>`

        L.marker([p.coordinates!.lat, p.coordinates!.lng], { icon: pinIcon })
          .bindPopup(popupHtml, { maxWidth: 260, minWidth: 260 })
          .addTo(map as ReturnType<typeof L.map>)
      })
    })

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        ;(mapInstanceRef.current as ReturnType<typeof import('leaflet').map>).remove()
        mapInstanceRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section style={{ padding: '96px 0 120px' }}>
      <div style={{ padding: '0 clamp(20px, 5vw, 56px)', marginBottom: 48 }}>
        <SectionLabel>Ubicaciones</SectionLabel>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '-0.015em',
            color: '#1E1E1E',
            lineHeight: 1,
          }}
        >
          Dónde construimos
        </h2>
      </div>
      <div style={{ padding: '0 clamp(20px, 5vw, 56px)' }}>
        <div
          ref={mapRef}
          style={{
            height: 480,
            width: '100%',
            background: '#E9E9E9',
          }}
        />
      </div>
    </section>
  )
}
