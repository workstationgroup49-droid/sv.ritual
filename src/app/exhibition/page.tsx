import fs from 'fs'
import path from 'path'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExhibitionGallery } from '@/components/exhibition/ExhibitionPage'

export const metadata = {
  title: 'Виставка — СВ Ритуал',
  description: 'Фотогалерея наших робіт з натурального граніту.',
}

export default function ExhibitionPage() {
  const dir = path.join(process.cwd(), 'public', 'images', 'exhib')

  let photos: string[] = []
  try {
    photos = fs
      .readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort()
  } catch {
    photos = []
  }

  return (
    <>
      <Header />
      <main>
        <ExhibitionGallery photos={photos} />
      </main>
      <Footer />
    </>
  )
}
