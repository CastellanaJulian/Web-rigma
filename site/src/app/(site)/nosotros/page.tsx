import { getNosotrosPage } from '@/sanity/queries'
import NosotrosClient from './NosotrosClient'

export const revalidate = 60

export default async function NosotrosPage() {
  const nosotros = await getNosotrosPage()
  return (
    <NosotrosClient
      imagenHistoria={nosotros?.imagenHistoria}
      imagenFilosofia={nosotros?.imagenFilosofia}
    />
  )
}
