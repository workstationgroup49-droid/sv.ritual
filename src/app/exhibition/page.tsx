import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExhibitionPage } from '@/components/exhibition/ExhibitionPage'

export const metadata = {
  title: 'Наша виставка — Ритуал',
  description: 'Відеоогляд та фотогалерея нашої виставки пам\'ятників з натурального граніту.',
}

export default function Exhibition() {
  return (
    <>
      <Header />
      <main>
        <ExhibitionPage />
      </main>
      <Footer />
    </>
  )
}
