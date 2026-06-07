'use client'

import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useReveal } from '@/hooks/useReveal'

const services = [
  {
    id: 1,
    title: 'Гранітні пам\'ятники',
    description: 'Виготовляємо пам\'ятники будь-якої складності з натурального граніту. Власне виробництво — без посередників.',
    image: '/images/service-monuments.jpg',
    icon: '✦',
  },
  {
    id: 2,
    title: 'Індивідуальне різьблення',
    description: 'Портрети, орнаменти, написи та будь-які індивідуальні елементи. Гравіювання лазером та вручну.',
    image: '/images/service-funeral.jpg',
    icon: '✧',
  },
  {
    id: 3,
    title: 'Гранітні комплекси',
    description: 'Повні меморіальні комплекси: пам\'ятник, тумба, квітник, огорожа — усе з одного матеріалу.',
    image: '/images/service-goods.jpg',
    icon: '◆',
  },
  {
    id: 4,
    title: 'Встановлення та доставка',
    description: 'Доставляємо та встановлюємо вироби на місці. Працюємо по всій області.',
    image: '/images/service-cremation.jpg',
    icon: '◇',
  },
]

export function ServicesSection() {
  const ref = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="services" className="py-24 bg-graphite">
      <div className="max-w-7xl mx-auto px-6">

        <div className="reveal">
          <SectionTitle
            eyebrow="Що ми робимо"
            title="Наші послуги"
            subtitle="Повний цикл виробництва — від вибору моделі до встановлення на місці поховання."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`reveal reveal-delay-${i + 1} group relative bg-ash border border-white/5 overflow-hidden
                         hover:border-gold/20 transition-all duration-500 cursor-pointer`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ash to-transparent" />
              </div>

              <div className="absolute top-4 right-4 text-gold/40 text-xl group-hover:text-gold/70 transition-colors duration-300">
                {service.icon}
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-mist text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-bordeaux/60 to-transparent
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
