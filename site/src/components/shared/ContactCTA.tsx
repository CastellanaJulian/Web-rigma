import Btn from '@/components/shared/Btn'

export default function ContactCTA() {
  return (
    <section className="bg-ink">
      <div
        className="max-w-[1440px] mx-auto px-6 md:px-14 py-20 md:py-28 flex flex-col items-center text-center gap-6"
      >
        <h2
          style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 300,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          ¿Tenés alguna consulta?
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Escribinos y te asesoramos sobre nuestros proyectos y disponibilidad de unidades.
        </p>
        <Btn variant="primary" href="/contacto" className="mt-2">
          CONTACTANOS →
        </Btn>
      </div>
    </section>
  )
}
