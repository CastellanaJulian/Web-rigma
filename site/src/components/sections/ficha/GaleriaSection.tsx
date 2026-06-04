'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/shared/SectionLabel'

type Props = { images: string[] }

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex)

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(30,30,30,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer', color: '#FFFFFF', fontSize: 20, lineHeight: 1, borderRadius: 2,
          userSelect: 'none',
        }}
      >
        ×
      </button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', fontSize: 12, fontWeight: 600, letterSpacing: '0.10em', color: 'rgba(255,255,255,0.65)' }}>
        {idx + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length) }}
          style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)',
            cursor: 'pointer', borderRadius: 2, userSelect: 'none',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '80vw', height: '80vh', maxWidth: 1200 }}
      >
        <Image
          src={images[idx]}
          alt={`imagen ${idx + 1}`}
          fill
          className="object-contain"
          sizes="80vw"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length) }}
          style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)',
            cursor: 'pointer', borderRadius: 2, userSelect: 'none',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
    </div>
  )
}

// ── GalleryImg ────────────────────────────────────────────────────────────────
function GalleryImg({ src, alt, style = {}, onClick }: { src: string; alt: string; style?: React.CSSProperties; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in', ...style }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          transform: hov ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `rgba(30,30,30,${hov ? '0.15' : '0'})`,
          transition: 'background 0.3s ease',
        }}
      />
    </div>
  )
}

// ── GaleriaSection ────────────────────────────────────────────────────────────
export default function GaleriaSection({ images }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [img0, img1, img2, img3, img4] = images

  return (
    <section style={{ background: '#FBFBFB', padding: '80px 0' }}>
      <div style={{ padding: '0 clamp(20px, 5vw, 56px)', marginBottom: 28 }}>
        <SectionLabel>Galería</SectionLabel>
      </div>
      <div style={{ padding: '0 clamp(20px, 5vw, 56px)' }}>
        {/* Main asymmetric grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '340px 200px', gap: 6 }}>
          {img0 && <GalleryImg src={img0} alt="render principal" style={{ gridRow: 'span 2' }} onClick={() => setLightboxIdx(0)} />}
          {img1 && <GalleryImg src={img1} alt="render interior" style={{ height: 340 }} onClick={() => setLightboxIdx(1)} />}
          {img2 && <GalleryImg src={img2} alt="render detalle" style={{ height: 200 }} onClick={() => setLightboxIdx(2)} />}
        </div>

        {/* Second row */}
        {(img3 || img4) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
            {img3 && <GalleryImg src={img3} alt="render dormitorio" style={{ height: 200 }} onClick={() => setLightboxIdx(3)} />}
            {img4 && <GalleryImg src={img4} alt="render terraza" style={{ height: 200 }} onClick={() => setLightboxIdx(4)} />}
          </div>
        )}

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setLightboxIdx(0)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              userSelect: 'none', fontFamily: 'inherit',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              color: 'rgba(30,30,30,0.65)',
              borderBottom: '1px solid rgba(30,30,30,0.25)',
              paddingBottom: 2,
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#B59969'
              e.currentTarget.style.borderBottomColor = '#B59969'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(30,30,30,0.65)'
              e.currentTarget.style.borderBottomColor = 'rgba(30,30,30,0.25)'
            }}
          >
            Ver galería completa →
          </button>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </section>
  )
}
