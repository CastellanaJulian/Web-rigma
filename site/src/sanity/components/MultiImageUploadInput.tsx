'use client'

import { useCallback, useRef, useState } from 'react'
import {
  type ArrayOfObjectsInputProps,
  insert,
  setIfMissing,
  useClient,
} from 'sanity'

/**
 * Input custom para el array `images` (galería).
 *
 * Reemplaza el botón nativo "Añadir elemento" (que sube de a una imagen)
 * por un botón que abre el selector de archivos con selección múltiple y
 * sube todas las imágenes elegidas de una sola vez. Conserva la grilla,
 * el preview y el reordenamiento por arrastre del input por defecto.
 */
export function MultiImageUploadInput(props: ArrayOfObjectsInputProps) {
  const { onChange, renderDefault } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const inputRef = useRef<HTMLInputElement>(null)

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const files = Array.from(fileList)
      if (files.length === 0) return

      setUploading(true)
      setError(null)
      setProgress({ done: 0, total: files.length })

      try {
        const items = []
        let done = 0
        for (const file of files) {
          const asset = await client.assets.upload('image', file, { filename: file.name })
          items.push({
            _type: 'image',
            _key: crypto.randomUUID().replace(/-/g, '').slice(0, 12),
            asset: { _type: 'reference', _ref: asset._id },
          })
          done += 1
          setProgress({ done, total: files.length })
        }
        onChange([setIfMissing([]), insert(items, 'after', [-1])])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron subir las imágenes.')
      } finally {
        setUploading(false)
        setProgress(null)
      }
    },
    [client, onChange],
  )

  const label = uploading
    ? progress
      ? `Subiendo… (${progress.done}/${progress.total})`
      : 'Subiendo…'
    : 'Subir imágenes (varias a la vez)'

  return (
    <div className="rigma-multi-image">
      {/* Oculta el botón nativo "Añadir elemento" que sube de a una */}
      <style>{`
        .rigma-multi-image [data-testid="add-item"],
        .rigma-multi-image [data-testid="add-single-object-button"],
        .rigma-multi-image [data-testid="add-multiple-object-button"] {
          display: none !important;
        }
      `}</style>

      {renderDefault(props)}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files)
          e.target.value = '' // permite volver a elegir los mismos archivos
        }}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        style={{
          marginTop: 12,
          width: '100%',
          padding: '12px 16px',
          fontSize: 13,
          fontWeight: 500,
          color: uploading ? '#9ca3af' : '#1e1e1e',
          background: '#f2f3f5',
          border: '1px solid #e2e3e6',
          borderRadius: 6,
          cursor: uploading ? 'default' : 'pointer',
        }}
      >
        + {label}
      </button>

      {error && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#dc2626' }}>{error}</div>
      )}
    </div>
  )
}
