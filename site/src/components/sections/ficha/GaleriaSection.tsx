'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import SectionLabel from '@/components/shared/SectionLabel'
import { useCanHover } from '@/hooks/useCanHover'
import type { GalleryImage } from '@/types/project'

type Props = { images: GalleryImage[] }

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: { images: GalleryImage[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex })

  useEffect(() => {
    const sb = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${sb}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', () => setIdx(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') emblaApi?.scrollNext()
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [emblaApi, onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(30,30,30,0.95)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.10em', color: 'rgba(255,255,255,0.65)' }}>
          {idx + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          style={{
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.25)',
            cursor: 'pointer', color: '#FFFFFF', borderRadius: 2, userSelect: 'none',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Embla viewport — fills remaining height */}
      <div
        ref={emblaRef}
        onClick={(e) => e.stopPropagation()}
        style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}
      >
        <div style={{ display: 'flex', height: '100%' }}>
          {images.map((im, i) => (
            <div key={i} style={{ position: 'relative', flex: '0 0 100%', height: '100%' }}>
              <Image
                src={im.src}
                alt={im.caption || `imagen ${i + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority={i === idx}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      {images[idx]?.caption && (
        <div style={{ textAlign: 'center', padding: '12px 20px 0', flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
            {images[idx].caption}
          </span>
        </div>
      )}

      {/* Arrows — solo desktop (mobile/tablet usan swipe + dots) */}
      <button
        className="hidden lg:flex"
        onClick={(e) => { e.stopPropagation(); emblaApi?.scrollPrev() }}
        style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer', borderRadius: 2, userSelect: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button
        className="hidden lg:flex"
        onClick={(e) => { e.stopPropagation(); emblaApi?.scrollNext() }}
        style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer', borderRadius: 2, userSelect: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* Dots — mobile/tablet */}
      <div className="flex lg:hidden" style={{ justifyContent: 'center', gap: 6, padding: '16px 0', flexShrink: 0 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); emblaApi?.scrollTo(i) }}
            style={{
              width: i === idx ? 20 : 6, height: 2, borderRadius: 1, padding: 0, border: 'none',
              background: i === idx ? '#B59969' : 'rgba(255,255,255,0.30)',
              transition: 'width 0.3s ease, background 0.3s ease', cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── GalleryImg ────────────────────────────────────────────────────────────────
function GalleryImg({ src, alt, style = {}, onClick }: { src: string; alt: string; style?: React.CSSProperties; onClick: () => void }) {
  const canHover = useCanHover()
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in', ...style }}
      onMouseEnter={() => canHover && setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <Image
        src={src} alt={alt} fill className="object-cover"
        style={{ transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `rgba(30,30,30,${hov ? '0.15' : '0'})`, transition: 'background 0.3s ease',
      }} />
    </div>
  )
}

// ── GaleriaSection ────────────────────────────────────────────────────────────
export default function GaleriaSection({ images }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const srcs = images.map((i) => i.src)
  const [img0, img1, img2, img3, img4] = srcs

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', () => setActive(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), [])

  return (
    <section style={{ background: '#FBFBFB', padding: 'clamp(48px, 8vw, 80px) 0' }}>
      <div style={{ padding: '0 clamp(20px, 5vw, 56px)', marginBottom: 28 }}>
        <SectionLabel>Galería</SectionLabel>
      </div>

      {/* ── Mobile/tablet: carousel ── */}
      <div className="block lg:hidden">
        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex' }}>
            {images.map((im, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                style={{ position: 'relative', flex: '0 0 100%', aspectRatio: '4/3', cursor: 'zoom-in' }}
              >
                <Image src={im.src} alt={im.caption || `render ${i + 1}`} fill className="object-cover" sizes="100vw" />
              </div>
            ))}
          </div>
        </div>
        {/* Dots + counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '16px clamp(20px,5vw,56px) 0' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                style={{
                  width: i === active ? 20 : 5, height: 2, borderRadius: 1, padding: 0, border: 'none',
                  background: i === active ? '#B59969' : 'rgba(30,30,30,0.20)',
                  transition: 'width 0.3s ease, background 0.3s ease', cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', color: 'rgba(30,30,30,0.45)' }}>
            {active + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* ── Desktop: grid ── */}
      <div className="hidden lg:block" style={{ padding: '0 clamp(20px, 5vw, 56px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '340px 200px', gap: 6 }}>
          {img0 && <GalleryImg src={img0} alt="render principal" style={{ gridRow: 'span 2' }} onClick={() => openLightbox(0)} />}
          {img1 && <GalleryImg src={img1} alt="render interior" style={{ height: 340 }} onClick={() => openLightbox(1)} />}
          {img2 && <GalleryImg src={img2} alt="render detalle" style={{ height: 200 }} onClick={() => openLightbox(2)} />}
        </div>
        {(img3 || img4) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
            {img3 && <GalleryImg src={img3} alt="render dormitorio" style={{ height: 200 }} onClick={() => openLightbox(3)} />}
            {img4 && <GalleryImg src={img4} alt="render terraza" style={{ height: 200 }} onClick={() => openLightbox(4)} />}
          </div>
        )}
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => openLightbox(0)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              color: 'rgba(30,30,30,0.65)', borderBottom: '1px solid rgba(30,30,30,0.25)',
              paddingBottom: 2,
            }}
          >
            Ver galería completa →
          </button>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={images} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </section>
  )
}
