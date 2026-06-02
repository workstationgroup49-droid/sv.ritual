'use client'

import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Divider } from '@/components/ui/Divider'
import { useReveal } from '@/hooks/useReveal'

const stats = [
  { value: '20+', label: 'Років досвіду' },
  { value: '5 000+', label: 'Родин підтримали' },
  { value: '24/7', label: 'Працюємо без вихідних' },
  { value: '100%', label: 'Гарантія виконання' },
]

const reasons = [
  'Повний супровід на всіх етапах — від дзвінка до завершення',
  'Власний автопарк ритуального транспорту',
  'Документальне оформлення без черг',
  'Прозорі фіксовані ціни без прихованих доплат',
  'Психологічна підтримка для близьких',
]

export function AboutSection() {
  const ref = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="about" className="py-24 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="reveal relative">
            <div className="relative h-[520px] overflow-hidden">
              <Image
                src="/images/about-team.jpg"
                alt="Наша команда"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/15 -z-10" />

            <div className="absolute bottom-8 left-8 right-8 bg-obsidian/80 backdrop-blur-sm border border-white/10 p-6">
              <p className="font-display text-lg italic text-cream/80 leading-relaxed">
                «Наша місія — допомогти родині пройти цей шлях з гідністю, не турбуючись ні про що.»
              </p>
              <p className="font-body text-gold text-xs tracking-wider mt-3">— Засновник агентства</p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <SectionTitle
              eyebrow="Про нас"
              title="Понад 20 років поруч у важкий момент"
              centered={false}
            />

            <ul className="space-y-4 mb-10">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-gold mt-1 shrink-0 text-lg">◆</span>
                  <span className="font-body text-mist text-sm leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>

            <Divider />

            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map(stat => (
                <div key={stat.label}>
                  <p className="font-display text-4xl font-light text-gold">{stat.value}</p>
                  <p className="font-body text-mist text-xs tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
