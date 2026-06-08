'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useCanHover } from '@/hooks/useCanHover'

type FormData = {
  nombre: string
  celular: string
  email: string
  proyecto: string
  mensaje: string
}

interface ContactFormProps {
  theme?: 'light' | 'dark'
  onSuccess?: () => void
}

export default function ContactForm({ theme = 'light', onSuccess }: ContactFormProps) {
  const dark = theme === 'dark'
  const canHover = useCanHover()
  const [hovSubmit, setHovSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (_data: FormData) => {
    setIsLoading(true)
    setSubmitError(false)
    try {
      // Simula envío — reemplazar con llamada real a API en Etapa 3
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Capturamos el contenedor de scroll ANTES de que el form se desmonte.
      // Es un ancestro estable (no se reemplaza al pasar a estado de éxito),
      // por lo que su posición sigue siendo válida después del re-render.
      const anchor = formRef.current?.closest('[data-contact-scroll]') as HTMLElement | null

      onSuccess?.()

      // Dos rAF: el primero espera el commit de React, el segundo el paint.
      // Recién entonces medimos la posición real y scrolleamos.
      if (anchor) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const y = anchor.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
          })
        })
      }
    } catch {
      setSubmitError(true)
      setIsLoading(false)
    }
  }

  const baseField: React.CSSProperties = dark
    ? {
        width: '100%',
        padding: '13px 16px',
        fontSize: 13,
        fontWeight: 400,
        color: '#FFFFFF',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 2,
        appearance: 'none',
        fontFamily: 'inherit',
        outline: 'none',
      }
    : {
        width: '100%',
        padding: '13px 16px',
        fontSize: 13,
        fontWeight: 400,
        color: '#1E1E1E',
        background: 'transparent',
        border: '1px solid #E9E9E9',
        borderRadius: 2,
        appearance: 'none',
        fontFamily: 'inherit',
        outline: 'none',
      }

  const errorColor = dark ? '#E07070' : '#C0392B'
  const errorBorder = dark ? '1px solid #E07070' : '1px solid #C0392B'
  const errorField: React.CSSProperties = { ...baseField, border: errorBorder }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(30,30,30,0.45)',
    marginBottom: 8,
  }

  const errMsg = (msg: string | undefined, hasError: boolean): React.CSSProperties => ({
    display: 'block',
    fontSize: 11,
    marginTop: 5,
    fontWeight: 400,
    height: 16,
    overflow: 'hidden',
    color: hasError ? errorColor : 'transparent',
  })

  const optBg = dark ? '#353631' : undefined

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label style={labelStyle}>Nombre completo</label>
          <input
            type="text"
            placeholder="Ej: María González"
            style={errors.nombre ? errorField : baseField}
            {...register('nombre', { required: 'Ingresá tu nombre completo' })}
          />
          <span style={errMsg(errors.nombre?.message, !!errors.nombre)}>
            {errors.nombre?.message ?? ' '}
          </span>
        </div>

        {/* Celular */}
        <div>
          <label style={labelStyle}>Celular</label>
          <input
            type="tel"
            placeholder="Celular"
            style={errors.celular ? errorField : baseField}
            onKeyDown={(e) => {
              const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
              if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault()
            }}
            {...register('celular', {
              required: 'Ingresá tu número de celular',
              pattern: {
                value: /^\d{8,15}$/,
                message: 'Ingresá solo números, sin espacios ni guiones',
              },
            })}
          />
          <span style={errMsg(errors.celular?.message, !!errors.celular)}>
            {errors.celular?.message ?? ' '}
          </span>
        </div>
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          placeholder="nombre@email.com"
          style={errors.email ? errorField : baseField}
          {...register('email', {
            required: 'Ingresá tu dirección de email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del email no es válido',
            },
          })}
        />
        <span style={errMsg(errors.email?.message, !!errors.email)}>
          {errors.email?.message ?? ' '}
        </span>
      </div>

      {/* Proyecto */}
      <div>
        <label style={labelStyle}>Proyecto de interés</label>
        <select
          style={{
            ...(errors.proyecto ? errorField : baseField),
            color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(30,30,30,0.65)',
          }}
          defaultValue=""
          {...register('proyecto', { required: 'Seleccioná un proyecto' })}
        >
          <option value="" disabled style={{ background: optBg }}>Seleccioná un proyecto</option>
          <option value="cosquin" style={{ background: optBg }}>Cosquín 1534</option>
          <option value="larrazabal" style={{ background: optBg }}>Av. Larrazábal 1255</option>
          <option value="zelada" style={{ background: optBg }}>Zelada 6171</option>
          <option value="otro" style={{ background: optBg }}>Otro / No sé aún</option>
        </select>
        <span style={errMsg(errors.proyecto?.message, !!errors.proyecto)}>
          {errors.proyecto?.message ?? ' '}
        </span>
      </div>

      {/* Mensaje */}
      <div>
        <label style={labelStyle}>Mensaje</label>
        <textarea
          placeholder="Contanos qué información necesitás..."
          rows={dark ? 3 : 4}
          style={{
            ...(errors.mensaje ? errorField : baseField),
            resize: 'none',
            overflow: 'hidden',
          }}
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + 'px'
          }}
          {...register('mensaje', { required: 'Escribí tu mensaje' })}
        />
        <span style={errMsg(errors.mensaje?.message, !!errors.mensaje)}>
          {errors.mensaje?.message ?? ' '}
        </span>
      </div>

      {/* Error de envío */}
      {submitError && (
        <p style={{ fontSize: 11, color: errorColor, fontWeight: 400, marginTop: 0 }}>
          Hubo un problema al enviar. Intentá nuevamente o contactanos por WhatsApp.
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={isLoading}
        onMouseEnter={() => canHover && !isLoading && setHovSubmit(true)}
        onMouseLeave={() => setHovSubmit(false)}
        style={{
          width: '100%',
          padding: '15px 24px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          background: hovSubmit && !isLoading ? '#B59969' : dark ? '#FFFFFF' : '#1E1E1E',
          color: dark ? '#1E1E1E' : '#FFFFFF',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          borderRadius: 2,
          fontFamily: 'inherit',
          transition: 'background 0.2s ease',
          opacity: isLoading ? 0.7 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 4,
        }}
      >
        {isLoading ? (
          <>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animation: 'spin 0.8s linear infinite' }}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            ENVIANDO...
          </>
        ) : (
          'ENVIAR CONSULTA'
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
}
