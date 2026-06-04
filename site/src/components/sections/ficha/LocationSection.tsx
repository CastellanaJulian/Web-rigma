'use client'

import { useEffect, useRef, useState } from 'react'
import { POI } from '@/types/project'
import SectionLabel from '@/components/shared/SectionLabel'

const POI_SVGS: Record<string, string> = {
  transport: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/><line x1="2" y1="12" x2="22" y2="12"/>',
  health:    '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  education: '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
  commerce:  '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>',
}

type Props = {
  coordinates: { lat: number; lng: number }
  projectName: string
  projectStatus: string
  pois: POI[]
}

export default function LocationSection({ coordinates, projectName, projectStatus, pois }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)

      const map = L.map(mapRef.current!, { scrollWheelZoom: false, attributionControl: false })
        .setView([coordinates.lat, coordinates.lng], 15)
      mapInstanceRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map)

      // Barrio boundary
      fetch('https://nominatim.openstreetmap.org/search?q=Mataderos,Buenos+Aires,Argentina&format=geojson&polygon_geojson=1&limit=1')
        .then(r => r.json())
        .then(data => {
          const feature = data.features?.[0]
          if (!feature || feature.geometry.type === 'Point') return
          L.geoJSON(feature, { style: { color: '#B59969', weight: 1.5, fillColor: '#B59969', fillOpacity: 0.08, dashArray: '5 5' } }).addTo(map)
        })
        .catch(() => {})

      // Project marker
      const projectIcon = L.divIcon({
        html: `<div style="width:36px;height:36px;background:#B59969;border-radius:2px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.22);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/>
            <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
            <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
          </svg></div>`,
        className: '', iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -22],
      })

      const projectMarker = L.marker([coordinates.lat, coordinates.lng], { icon: projectIcon })
      projectMarker
        .bindPopup(`<div style="padding:14px 16px;font-family:'Montserrat',sans-serif;min-width:180px;">
          <div style="font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(30,30,30,0.45);margin-bottom:5px;">${projectStatus.toUpperCase()}</div>
          <div style="font-size:15px;font-weight:700;text-transform:uppercase;color:#1E1E1E;">${projectName}</div>
        </div>`, { maxWidth: 200 })
        .addTo(map)

      // POI markers
      pois.forEach((poi, i) => {
        const svg = POI_SVGS[poi.iconType] ?? POI_SVGS.commerce
        const poiIcon = L.divIcon({
          html: `<div style="width:28px;height:28px;background:#FBFBFB;border:1px solid #E9E9E9;border-radius:2px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.12);">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>
          </div>`,
          className: '', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -18],
        })

        const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
        marker
          .on('click', () => setActiveIdx(i))
          .on('popupclose', () => setActiveIdx(null))
          .bindPopup(`<div style="padding:14px 16px;font-family:'Montserrat',sans-serif;min-width:180px;">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(30,30,30,0.45);margin-bottom:5px;">${poi.category}</div>
            <div style="font-size:13px;font-weight:600;color:#1E1E1E;margin-bottom:3px;">${poi.name}</div>
            <div style="font-size:11px;color:rgba(30,30,30,0.55);">${poi.detail}</div>
          </div>`, { maxWidth: 200 })
          .addTo(map)

        markersRef.current[i] = marker
      })
    })

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        ;(mapInstanceRef.current as { remove: () => void }).remove()
        mapInstanceRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePoiHover = (idx: number) => setActiveIdx(idx)
  const handlePoiLeave = () => setActiveIdx(null)

  return (
    <section style={{ padding: '80px clamp(20px, 5vw, 56px)', borderTop: '1px solid #E9E9E9' }}>
      <SectionLabel>Ubicación</SectionLabel>
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.015em', color: '#1E1E1E', lineHeight: 1, marginBottom: 48 }}>
        Dónde está el proyecto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px]" style={{ gap: 48 }}>
        <div ref={mapRef} style={{ height: 480, background: '#E9E9E9' }} />

        {pois.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(30,30,30,0.45)', marginBottom: 20 }}>
              Puntos de interés
            </div>
            {pois.map((poi, i) => {
              const svg = POI_SVGS[poi.iconType] ?? POI_SVGS.commerce
              const isActive = activeIdx === i
              return (
                <div
                  key={i}
                  onMouseEnter={() => handlePoiHover(i)}
                  onMouseLeave={handlePoiLeave}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '16px 0',
                    borderBottom: '1px solid #E9E9E9',
                    cursor: 'default',
                    background: isActive ? 'rgba(181,153,105,0.06)' : 'transparent',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <div style={{ width: 32, height: 32, background: isActive ? '#B59969' : '#E9E9E9', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s ease' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isActive ? 'white' : '#1E1E1E'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: svg }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(30,30,30,0.45)', marginBottom: 3 }}>{poi.category}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1E1E1E', marginBottom: 2 }}>{poi.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(30,30,30,0.55)' }}>{poi.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
