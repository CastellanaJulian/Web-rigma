'use client'

import { useEffect, useRef } from 'react'
import { Project } from '@/types/project'
import SectionLabel from '@/components/shared/SectionLabel'

type Props = {
  projects: Project[]
}

type LeafletMap = ReturnType<typeof import('leaflet')['map']>

export default function MapaSection({ projects }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)

  const withCoords = projects.filter((p) => p.coordinates)

  useEffect(() => {
    if (!mapRef.current) return

    let cancelled = false
    let localMap: LeafletMap | null = null

    function initMap() {
      import('leaflet').then(async (L) => {
        if (cancelled || !mapRef.current) return

        // Leaflet CSS (una sola vez)
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link')
          link.id = 'leaflet-css'
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)
        }

        // Gesture handling CSS inline (una sola vez)
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

        // CSS hover del popup (una sola vez)
        if (!document.getElementById('rigma-map-styles')) {
          const style = document.createElement('style')
          style.id = 'rigma-map-styles'
          style.textContent = `.rigma-popup-link:hover { color: #B59969 !important; border-color: #B59969 !important; }`
          document.head.appendChild(style)
        }

        // Registrar gesture handling (una sola vez, defensivo)
        try {
          const ghModule = await import('leaflet-gesture-handling')
          const GH = (ghModule as any).GestureHandling ?? (ghModule as any).default
          if (GH && !(L.Map as any).__gestureHandlingRegistered) {
            L.Map.addInitHook('addHandler', 'gestureHandling', GH)
            ;(L.Map as any).__gestureHandlingRegistered = true
          }
        } catch (_) { /* gesture handling no disponible, continuar sin él */ }

        if (cancelled || !mapRef.current) return

        // Si el container ya tiene una instancia Leaflet previa (Router Cache sin desmontar),
        // se destruye para poder reinicializar limpio
        const container = mapRef.current!
        if ((container as any)._leaflet_id) {
          try { localMap?.remove() } catch (_) {}
          localMap = null
          mapInstanceRef.current = null
          delete (container as any)._leaflet_id
        }

        localMap = L.map(container, {
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
        } as any).setView([-34.657, -58.504], 15)

        mapInstanceRef.current = localMap

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
        }).addTo(localMap)

        // Fuerza recalculo de tiles en varios momentos para cubrir distintos escenarios de timing
        ;[100, 400, 900].forEach((delay) =>
          setTimeout(() => localMap?.invalidateSize(), delay)
        )

        // Delimitación del barrio de Mataderos
        fetch(
          'https://nominatim.openstreetmap.org/search?q=Mataderos,Buenos+Aires,Argentina&format=geojson&polygon_geojson=1&limit=1'
        )
          .then((r) => r.json())
          .then((data) => {
            if (cancelled || !localMap) return
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
            }).addTo(localMap)
          })
          .catch(() => {})

        const pinIcon = L.divIcon({
          html: `<div style="width:36px;height:36px;background:#B59969;border-radius:2px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.22);cursor:pointer;">
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
          if (!localMap) return
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
                <div style="font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:rgba(30,30,30,0.55);margin-bottom:14px;">${p.neighborhood ?? ''}</div>
                <a href="/proyectos/${p.slug}" class="rigma-popup-link"
                  style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#1E1E1E;border-bottom:1px solid #1E1E1E;padding-bottom:2px;display:inline-block;cursor:pointer;text-decoration:none;transition:color 0.2s,border-color 0.2s;">
                  VER PROYECTO →
                </a>
              </div>
            </div>`

          L.marker([p.coordinates!.lat, p.coordinates!.lng], { icon: pinIcon })
            .bindPopup(popupHtml, { maxWidth: 260, minWidth: 260 })
            .addTo(localMap)
        })
      })
    }

    // Pequeño delay inicial para que el container tenga dimensiones reales antes de que Leaflet las lea
    const initTimer = setTimeout(initMap, 50)

    // Cuando el usuario vuelve con el botón back, el componente puede no remontar
    // (Next.js Router Cache). El evento popstate nos permite reinicializar el mapa.
    function handlePopState() {
      setTimeout(() => {
        if (!mapRef.current) return
        const container = mapRef.current as any
        // Si hay una instancia activa, solo invalida el tamaño
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize()
          return
        }
        // Si no hay instancia (fue limpiada), reinicializa
        initMap()
      }, 100)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      cancelled = true
      clearTimeout(initTimer)
      window.removeEventListener('popstate', handlePopState)
      if (localMap) {
        try { localMap.remove() } catch (_) {}
        if (mapInstanceRef.current === localMap) mapInstanceRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section style={{ padding: 'clamp(48px, 8vw, 96px) 0 clamp(56px, 9vw, 120px)' }}>
      <div style={{ padding: '0 clamp(20px, 5vw, 56px)', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
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
