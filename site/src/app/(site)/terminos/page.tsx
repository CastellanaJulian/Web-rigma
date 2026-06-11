import type { Metadata } from 'next'
import LegalDoc, { type LegalSection } from '@/components/shared/LegalDoc'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Rigma',
  description:
    'Términos y condiciones de uso del sitio web institucional de Rigma.',
}

// Razón social y CUIT confirmados por el cliente (10/06/2026).
// ⚠️ Placeholder pendiente:
//   [MATRÍCULA] — matrícula de corredor inmobiliario (CUCICBA en CABA),
//                 SI corresponde. Si Rigma no comercializa directamente,
//                 eliminar la sección "Corretaje inmobiliario".
// Revisar el texto con un profesional antes de publicar.

const sections: LegalSection[] = [
  {
    heading: 'Aceptación de los términos',
    paragraphs: [
      'El acceso y la utilización de este sitio web (en adelante, el «Sitio») implican la aceptación plena de los presentes Términos y Condiciones por parte del usuario. Si no está de acuerdo con ellos, le solicitamos que no utilice el Sitio.',
    ],
  },
  {
    heading: 'Titularidad',
    paragraphs: [
      'El Sitio es operado por RIGMA GROUP S.R.L. (en adelante, «Rigma»), CUIT 30-71893343-5, con domicilio en Guardia Nacional 739, Planta Baja, Ciudad Autónoma de Buenos Aires, Argentina.',
    ],
  },
  {
    heading: 'Objeto del Sitio',
    paragraphs: [
      'El Sitio tiene carácter institucional e informativo: presenta a la empresa, su trayectoria y sus proyectos inmobiliarios, y ofrece un canal de contacto para quienes deseen recibir más información. El Sitio no constituye una plataforma de comercialización ni permite realizar operaciones, reservas ni pagos en línea.',
    ],
  },
  {
    heading: 'Información no vinculante',
    paragraphs: [
      'La información sobre proyectos —incluyendo superficies, tipologías, cantidad de unidades, disponibilidad, amenities, estado de avance de obra, plazos y fechas de entrega— es de carácter referencial y se encuentra sujeta a confirmación y a posibles modificaciones sin previo aviso.',
      'El contenido publicado no constituye una oferta comercial vinculante en los términos del Código Civil y Comercial de la Nación. Toda eventual operación se perfeccionará exclusivamente a través de los instrumentos contractuales que las partes suscriban por separado.',
    ],
  },
  {
    heading: 'Imágenes y representaciones',
    paragraphs: [
      'Las imágenes, renders, planos e ilustraciones presentes en el Sitio tienen fines meramente ilustrativos y pueden no coincidir exactamente con el producto final construido. Las medidas y superficies indicadas son aproximadas.',
    ],
  },
  {
    heading: 'Propiedad intelectual',
    paragraphs: [
      'Todos los contenidos del Sitio —incluyendo textos, imágenes, logotipos, la marca «Rigma», diseños y demás material— son de titularidad de Rigma o de sus respectivos licenciantes, y se encuentran protegidos por la normativa de propiedad intelectual. Queda prohibida su reproducción, distribución o uso sin autorización previa y por escrito.',
    ],
  },
  {
    heading: 'Uso del Sitio',
    paragraphs: [
      'El usuario se compromete a utilizar el Sitio de manera lícita y a no realizar conductas que puedan dañarlo, inutilizarlo, sobrecargarlo o impedir su normal funcionamiento. Los datos que el usuario suministre a través del formulario de contacto deben ser veraces y propios.',
    ],
  },
  {
    heading: 'Enlaces y servicios de terceros',
    paragraphs: [
      'El Sitio puede integrar servicios o enlaces de terceros (por ejemplo, mapas o redes sociales). Rigma no es responsable por el contenido, las políticas ni las prácticas de dichos terceros.',
    ],
  },
  {
    heading: 'Protección de datos personales',
    paragraphs: [
      'El tratamiento de los datos personales que el usuario proporcione a través del Sitio se rige por nuestra Política de Privacidad, que forma parte integrante de estos Términos y Condiciones.',
    ],
  },
  {
    heading: 'Corretaje inmobiliario',
    paragraphs: [
      'La intermediación en la comercialización de las unidades, en caso de corresponder, se realiza conforme a la normativa aplicable. Matrícula de corredor inmobiliario: [MATRÍCULA]. (Si Rigma no realiza corretaje directo, eliminar esta sección.)',
    ],
  },
  {
    heading: 'Limitación de responsabilidad',
    paragraphs: [
      'Rigma procura mantener la información del Sitio actualizada y correcta, pero no garantiza la ausencia de errores ni la disponibilidad ininterrumpida del Sitio. Rigma no será responsable por daños derivados del uso o de la imposibilidad de uso del Sitio.',
    ],
  },
  {
    heading: 'Ley aplicable y jurisdicción',
    paragraphs: [
      'Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Ante cualquier controversia, las partes se someten a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia a cualquier otro fuero que pudiera corresponder.',
    ],
  },
  {
    heading: 'Modificaciones',
    paragraphs: [
      'Rigma podrá modificar estos Términos y Condiciones en cualquier momento. La versión vigente será la publicada en esta página, con su fecha de última actualización.',
    ],
  },
  {
    heading: 'Contacto',
    paragraphs: [
      'Ante cualquier consulta sobre estos Términos y Condiciones, puede comunicarse con nosotros a Rigmagrupo@gmail.com o al teléfono +54 11 6596 2401.',
    ],
  },
]

export default function TerminosPage() {
  return (
    <LegalDoc
      title="Términos y Condiciones"
      updated="10 de junio de 2026"
      intro="Los presentes Términos y Condiciones regulan el acceso y la utilización del sitio web institucional de Rigma. Le recomendamos leerlos con atención."
      sections={sections}
    />
  )
}
