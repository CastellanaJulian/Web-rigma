import type { Metadata } from 'next'
import LegalDoc, { type LegalSection } from '@/components/shared/LegalDoc'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Rigma',
  description:
    'Cómo Rigma recopila, utiliza y protege los datos personales que los usuarios proporcionan a través del sitio.',
}

// ⚠️ Placeholders a completar con el cliente antes del cutover a producción:
//   [RAZÓN SOCIAL] — nombre jurídico real (ej. "Rigma S.R.L.")
//   [CUIT]         — CUIT de la empresa
// Revisar el texto con un profesional. La inscripción de la base de datos
// ante la AAIP (Registro Nacional de Bases de Datos) la gestiona el cliente.

const sections: LegalSection[] = [
  {
    heading: 'Responsable de la base de datos',
    paragraphs: [
      'El responsable del tratamiento de los datos personales recopilados a través de este sitio es [RAZÓN SOCIAL] (en adelante, «Rigma»), CUIT [CUIT], con domicilio en Guardia Nacional 739, Planta Baja, Ciudad Autónoma de Buenos Aires, Argentina. Para cualquier consulta vinculada a sus datos personales puede escribir a Rigmagrupo@gmail.com.',
    ],
  },
  {
    heading: 'Datos que recopilamos',
    paragraphs: [
      'Recopilamos únicamente los datos que el usuario nos proporciona de forma voluntaria al completar el formulario de contacto del sitio:',
    ],
    bullets: [
      'Nombre',
      'Número de celular',
      'Correo electrónico',
      'Proyecto de interés',
      'El mensaje o consulta que el usuario decida enviarnos',
    ],
  },
  {
    heading: 'Finalidad del tratamiento',
    paragraphs: [
      'Utilizamos estos datos con el único fin de responder las consultas recibidas, brindar información sobre nuestros proyectos y mantener el contacto comercial con quienes manifiestan interés. No utilizamos los datos para fines distintos a los aquí descriptos, no realizamos decisiones automatizadas sobre los usuarios ni cedemos, vendemos o alquilamos los datos a terceros con fines comerciales.',
    ],
  },
  {
    heading: 'Consentimiento',
    paragraphs: [
      'Al completar y enviar el formulario de contacto, el usuario presta su consentimiento libre, expreso e informado para que sus datos sean tratados conforme a esta Política y a la Ley N° 25.326 de Protección de los Datos Personales. La provisión de los datos solicitados es voluntaria; sin ellos no podremos dar curso a la consulta.',
    ],
  },
  {
    heading: 'Almacenamiento y transferencia internacional',
    paragraphs: [
      'Las consultas enviadas a través del sitio se almacenan en servicios de Google (Google Workspace / Google Sheets), provistos por Google LLC, cuyos servidores pueden encontrarse fuera de la Argentina, incluyendo los Estados Unidos. Esto implica una transferencia internacional de datos, que el usuario acepta al enviar su consulta. El sitio se encuentra alojado en la plataforma Vercel y su contenido se administra mediante el sistema Sanity.',
    ],
  },
  {
    heading: 'Conservación de los datos',
    paragraphs: [
      'Conservamos los datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recabados y mientras exista una relación o interés comercial vigente. El usuario puede solicitar su supresión en cualquier momento conforme se indica más abajo.',
    ],
  },
  {
    heading: 'Derechos del titular de los datos',
    paragraphs: [
      'El titular de los datos tiene derecho a acceder, rectificar, actualizar y suprimir sus datos personales. Para ejercer estos derechos puede enviar su solicitud a Rigmagrupo@gmail.com indicando su nombre y el dato a modificar o eliminar.',
      'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto, conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326.',
      'La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.',
    ],
  },
  {
    heading: 'Seguridad',
    paragraphs: [
      'Adoptamos medidas técnicas y organizativas razonables para resguardar los datos personales y evitar su adulteración, pérdida, consulta o tratamiento no autorizado. No obstante, ningún sistema es completamente infalible, por lo que no podemos garantizar una seguridad absoluta.',
    ],
  },
  {
    heading: 'Cambios en esta política',
    paragraphs: [
      'Podemos actualizar esta Política de Privacidad en cualquier momento. La versión vigente será siempre la publicada en esta página, con su fecha de última actualización.',
    ],
  },
  {
    heading: 'Contacto',
    paragraphs: [
      'Ante cualquier duda sobre esta Política o sobre el tratamiento de sus datos, puede comunicarse con nosotros a Rigmagrupo@gmail.com o al teléfono +54 11 6596 2401.',
    ],
  },
]

export default function PrivacidadPage() {
  return (
    <LegalDoc
      title="Política de Privacidad"
      updated="10 de junio de 2026"
      intro="En Rigma valoramos la privacidad de quienes nos visitan. Esta Política describe qué datos personales recopilamos a través de este sitio, con qué finalidad los utilizamos y cuáles son los derechos que asisten a sus titulares conforme a la Ley N° 25.326 de Protección de los Datos Personales de la República Argentina."
      sections={sections}
    />
  )
}
