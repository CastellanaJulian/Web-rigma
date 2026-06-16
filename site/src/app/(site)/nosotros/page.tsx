import type { Metadata } from 'next'
import { getNosotrosPage } from '@/sanity/queries'
import NosotrosClient from './NosotrosClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Tres generaciones construyendo. Conocé la historia, la misión y la forma de trabajo de Rigma, una constructora familiar enfocada en la calidad y el detalle.',
}

export default async function NosotrosPage() {
  const nosotros = await getNosotrosPage()
  return (
    <NosotrosClient
      imagenHistoria={nosotros?.imagenHistoria}
      imagenFilosofia={nosotros?.imagenFilosofia}
      imagenMasSobreNosotros={nosotros?.imagenMasSobreNosotros}
    />
  )
}
