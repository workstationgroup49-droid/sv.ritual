import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GranitePage } from '@/components/granite/GranitePage'

export const metadata = {
  title: 'Зразки граніту — Ритуал',
  description: 'Каталог зразків натурального граніту для виготовлення пам\'ятників. Чорний, сірий, червоний, габро та інші породи.',
}

export default function Granite() {
  return (
    <>
      <Header />
      <main>
        <GranitePage />
      </main>
      <Footer />
    </>
  )
}
