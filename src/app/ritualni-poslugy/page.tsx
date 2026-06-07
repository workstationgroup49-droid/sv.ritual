import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RitualServicesPage } from '@/components/services/RitualServicesPage'

export const metadata = {
  title: 'Ритуальні послуги — Ритуал',
  description: 'Організація та проведення поховань, елітний катафалк, кремація, перевезення тіла по Україні, копка могил. Працюємо 24/7.',
}

export default function RitualServices() {
  return (
    <>
      <Header />
      <main><RitualServicesPage /></main>
      <Footer />
    </>
  )
}
