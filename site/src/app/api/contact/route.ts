import { NextResponse } from 'next/server'

// Código del <select> de proyecto → etiqueta legible para la hoja.
const PROYECTOS: Record<string, string> = {
  cosquin: 'Cosquín 1534',
  larrazabal: 'Av. Larrazábal 1255',
  zelada: 'Zelada 6171',
  otro: 'Otro / No sé aún',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CELULAR_RE = /^\d{8,15}$/

type Payload = {
  nombre?: string
  celular?: string
  email?: string
  proyecto?: string
  mensaje?: string
  website?: string // honeypot — debe llegar vacío
}

export async function POST(req: Request) {
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot: si viene completo es un bot. Respondemos ok para no delatarlo,
  // pero no escribimos nada en la hoja.
  if (body.website && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  // Validación server-side, espejo de la del formulario.
  const nombre = body.nombre?.trim() ?? ''
  const celular = body.celular?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const proyecto = body.proyecto?.trim() ?? ''
  const mensaje = body.mensaje?.trim() ?? ''

  const valido =
    nombre !== '' &&
    EMAIL_RE.test(email) &&
    CELULAR_RE.test(celular) &&
    proyecto !== '' &&
    mensaje !== ''

  if (!valido) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const url = process.env.APPS_SCRIPT_URL
  if (!url) {
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  const proyectoLabel = PROYECTOS[proyecto] ?? proyecto

  // text/plain evita el redirect de Google a la página de confirmación;
  // e.postData.contents recibe el body igual.
  const payload = JSON.stringify({
    nombre,
    celular,
    email,
    proyecto: proyectoLabel,
    mensaje,
  })

  // Apps Script tira un 500 transitorio cada tanto ("runtime ended
  // unexpectedly"). Reintentamos una vez para no perder leads reales.
  for (let intento = 0; intento < 2; intento++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload,
      })
      if (res.ok) {
        return NextResponse.json({ ok: true })
      }
    } catch {
      // error de red — cae al reintento
    }
    if (intento === 0) await new Promise((r) => setTimeout(r, 400))
  }

  return NextResponse.json({ ok: false }, { status: 502 })
}
