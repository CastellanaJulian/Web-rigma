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
  locationTitle: string
  locationDescription?: string
  pois: POI[]
}

export default function LocationSection({ coordinates, projectName, projectStatus, locationTitle, locationDescription, pois }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let cancelled = false

    import('leaflet').then(async (L) => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }
      if (!document.getElementById('leaflet-gesture-css')) {
        const style = document.createElement('style')
        style.id = 'leaflet-gesture-css'
        style.textContent = `
          @keyframes leaflet-gestures-fadein { 0% { opacity: 0; } 100% { opacity: 1; } }
          .leaflet-container:after {
            animation: leaflet-gestures-fadein 0.8s backwards;
            color: #fff; font-family: 'Montserrat', sans-serif; font-size: 15px;
            justify-content: center; display: flex; align-items: center;
            padding: 20px; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.52); z-index: 461; pointer-events: none;
          }
          .leaflet-gesture-handling-touch-warning:after,
          .leaflet-gesture-handling-scroll-warning:after { animation: leaflet-gestures-fadein 0.8s forwards; }
          .leaflet-gesture-handling-touch-warning:after { content: attr(data-gesture-handling-touch-content); }
          .leaflet-gesture-handling-scroll-warning:after { content: attr(data-gesture-handling-scroll-content); }
        `
        document.head.appendChild(style)
      }

      try {
        const ghModule = await import('leaflet-gesture-handling')
        const GH = (ghModule as any).GestureHandling ?? (ghModule as any).default
        if (GH && !(L.Map as any).__gestureHandlingRegistered) {
          L.Map.addInitHook('addHandler', 'gestureHandling', GH)
          ;(L.Map as any).__gestureHandlingRegistered = true
        }
      } catch (_) { /* gesture handling no disponible */ }

      if (cancelled || !mapRef.current || mapInstanceRef.current) return

      // Inject popup overrides after Leaflet CSS so they always win
      if (!document.getElementById('leaflet-overrides')) {
        const style = document.createElement('style')
        style.id = 'leaflet-overrides'
        style.textContent = `
          .leaflet-popup-content-wrapper {
            padding: 0 !important;
            border-radius: 2px !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.14) !important;
            overflow: hidden !important;
            border: none !important;
          }
          .leaflet-popup-content { margin: 0 !important; }
          .leaflet-popup-tip { background: #FBFBFB !important; }
          .leaflet-popup-close-button {
            width: 24px !important;
            height: 24px !important;
            line-height: 24px !important;
            text-align: center !important;
            top: 8px !important;
            right: 8px !important;
            font-size: 14px !important;
            color: #1E1E1E !important;
            background: rgba(255,255,255,0.92) !important;
            border-radius: 2px !important;
          }
        `
        document.head.appendChild(style)
      }

      const map = L.map(mapRef.current!, {
        scrollWheelZoom: false,
        attributionControl: false,
        gestureHandling: true,
        gestureHandlingOptions: {
          text: {
            touch: 'Usá dos dedos para mover el mapa',
            scroll: 'Usá Ctrl + scroll para hacer zoom',
            scrollMac: 'Usá ⌘ + scroll para hacer zoom',
          },
        },
      } as any).setView([coordinates.lat, coordinates.lng], 15)
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

      const isTouch = window.matchMedia('(pointer: coarse)').matches

      // En touch, gesture-handling cancela el click sintético del browser.
      // Adjuntamos un touchend nativo al elemento del marker para abrir el popup
      // sin depender del sistema de clicks de Leaflet.
      const bindTouchTap = (marker: { getElement?: () => HTMLElement | undefined }, onTap: () => void) => {
        const el = marker.getElement?.()
        if (!el) return
        // Frenamos el touchstart para que gesture-handling no muestre el warning
        // de "dos dedos" cuando el tap arranca sobre un marker.
        el.addEventListener('touchstart', (ev) => {
          ev.stopPropagation()
        }, { passive: true })
        el.addEventListener('touchend', (ev) => {
          ev.stopPropagation()
          ev.preventDefault()
          onTap()
        }, { passive: false })
      }

      const projectMarker = L.marker([coordinates.lat, coordinates.lng], { icon: projectIcon })
      projectMarker
        .on('mouseover', () => { if (!isTouch) projectMarker.openPopup() })
        .on('mouseout', () => { if (!isTouch) projectMarker.closePopup() })
        .on('click', (e) => { L.DomEvent.stopPropagation(e); projectMarker.openPopup() })
        .bindPopup(`<div style="padding:16px 18px 18px;font-family:'Montserrat',sans-serif;min-width:200px;">
          <div style="font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(30,30,30,0.45);margin-bottom:6px;">${projectStatus.toUpperCase()}</div>
          <div style="font-size:15px;font-weight:700;letter-spacing:-0.01em;text-transform:uppercase;color:#1E1E1E;line-height:1.1;margin-bottom:4px;">${projectName}</div>
          <div style="font-size:11px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:rgba(30,30,30,0.55);">${locationTitle}</div>
        </div>`, { maxWidth: 220, minWidth: 220 })
        .addTo(map)

      if (isTouch) bindTouchTap(projectMarker, () => projectMarker.openPopup())

      // POI markers
      pois.forEach((poi, i) => {
        const svg = POI_SVGS[poi.iconType] ?? POI_SVGS.commerce
        const poiIcon = L.divIcon({
          html: `<div style="width:28px;height:28px;background:#FBFBFB;border:1.5px solid #E9E9E9;border-radius:2px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.10);transition:border-color 0.2s ease,transform 0.2s ease;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>
          </div>`,
          className: '', iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -18],
        })

        const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
        marker
          .on('mouseover', () => { if (!isTouch) { setActiveIdx(i); marker.openPopup() } })
          .on('mouseout', () => { if (!isTouch) setActiveIdx(null) })
          .on('click', (e) => { L.DomEvent.stopPropagation(e); setActiveIdx(i); marker.openPopup() })
          .bindPopup(`<div style="padding:14px 16px;font-family:'Montserrat',sans-serif;min-width:180px;">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(30,30,30,0.45);margin-bottom:5px;">${poi.category}</div>
            <div style="font-size:13px;font-weight:600;color:#1E1E1E;margin-bottom:3px;">${poi.name}</div>
            <div style="font-size:11px;color:rgba(30,30,30,0.55);">${poi.detail}</div>
          </div>`, { maxWidth: 200 })
          .addTo(map)

        if (isTouch) bindTouchTap(marker, () => { setActiveIdx(i); marker.openPopup() })

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

  // Sync activeIdx → CSS class on marker DOM elements
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      if (!marker) return
      const m = marker as { getElement?: () => HTMLElement | undefined }
      const el = m.getElement?.()
      if (!el) return
      const inner = el.querySelector<HTMLElement>('div')
      if (!inner) return
      if (i === activeIdx) {
        inner.style.borderColor = '#1E1E1E'
        inner.style.transform = 'translateY(-2px)'
        inner.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)'
      } else {
        inner.style.borderColor = '#E9E9E9'
        inner.style.transform = 'translateY(0)'
        inner.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)'
      }
    })
  }, [activeIdx])

  const handlePoiHover = (i: number) => {
    setActiveIdx(i)
    const marker = markersRef.current[i] as { openPopup?: () => void } | undefined
    marker?.openPopup?.()
  }
  const handlePoiLeave = (i: number) => {
    setActiveIdx(null)
    const marker = markersRef.current[i] as { closePopup?: () => void } | undefined
    marker?.closePopup?.()
  }

  return (
    <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 56px)', borderTop: '1px solid #E9E9E9', background: '#E3E3E3' }}>
      <SectionLabel>Ubicación</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]" style={{ gap: 'clamp(32px, 4vw, 64px)' }}>
        <div ref={mapRef} style={{ height: 440 }} />

        <div style={{ paddingTop: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1E1E1E', marginBottom: locationDescription ? 6 : 24 }}>
            {locationTitle}
          </div>
          {locationDescription && (
            <p style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.8, color: 'rgba(30,30,30,0.65)', marginBottom: 24 }}>
              {locationDescription}
            </p>
          )}

          {pois.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {pois.map((poi, i) => {
                const svg = POI_SVGS[poi.iconType] ?? POI_SVGS.commerce
                const isActive = activeIdx === i
                return (
                  <div
                    key={i}
                    onMouseEnter={() => handlePoiHover(i)}
                    onMouseLeave={() => handlePoiLeave(i)}
                    className="poi-item"
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      padding: '12px 14px', borderRadius: 2,
                      background: isActive ? 'rgba(181,153,105,0.08)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(181,153,105,0.22)' : 'transparent'}`,
                      transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                  >
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke={isActive ? '#B59969' : 'rgba(30,30,30,0.65)'}
                        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition: 'stroke 0.2s ease' }}
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    </div>
                    <div>
                      <div style={{
                        fontSize: 12, fontWeight: 600, marginBottom: 2,
                        color: isActive ? '#B59969' : '#1E1E1E',
                        transition: 'color 0.2s ease',
                      }}>
                        {poi.name}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 400, color: 'rgba(30,30,30,0.45)', lineHeight: 1.5 }}>
                        {poi.detail}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
