'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

const services = [
  {
    number: '01',
    title: 'Організація та проведення поховань',
    description:
      'Повний супровід від моменту звернення до завершення церемонії. Беремо на себе всі організаційні питання, документи та підготовку.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Елітні катафалки',
    description:
      'Представницькі катафалки преміум-класу. Гідне та шанобливе перевезення в межах міста та за його межами.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="1" y="9" width="22" height="9" rx="1"/>
        <path d="M1 12h22"/>
        <circle cx="6" cy="20" r="2"/>
        <circle cx="18" cy="20" r="2"/>
        <path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Кремація',
    description:
      'Організація кремації з усіма необхідними процедурами. Супровід родини на кожному етапі процесу.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Перевезення тіла по Україні',
    description:
      'Транспортування в будь-яку точку України. Власний спеціалізований транспорт, дотримання всіх норм та вимог.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 12h18M3 12l4-4m-4 4 4 4"/>
        <path d="M21 12l-4-4m4 4-4 4"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Копка могил',
    description:
      'Професійна підготовка місця поховання. Ручна та механізована копка, впорядкування після церемонії.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 3v11"/>
        <path d="M8 7l4-4 4 4"/>
        <path d="M3 20h18"/>
        <path d="M5 20v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Пам\'ятники з граніту',
    description:
      'Власне виробництво пам\'ятників з натурального граніту. Індивідуальне різьблення, портрети, написи. Доставка та встановлення.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L6 8v12h12V8L12 2z"/>
        <path d="M9 22V12h6v10"/>
        <path d="M9 12h6"/>
      </svg>
    ),
  },
]

export function ServicesSection() {
  const ref = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="services"
      className="py-28 bg-obsidian relative overflow-hidden"
    >
      {/* Декоративний фон */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-bordeaux/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Заголовок */}
        <div className="reveal text-center mb-20">
          <p className="deco-line font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-5">
            Що ми робимо
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-6">
            Ритуальна служба <span className="text-gold/70 italic">повного циклу</span>
          </h2>
          <p className="font-body text-mist text-base max-w-2xl mx-auto leading-relaxed">
            Ми поруч у найважчий момент — від організації прощання до встановлення пам&apos;ятника.
            Наша команда з повагою та турботою бере на себе кожен крок.
          </p>
        </div>

        {/* Сітка послуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((service, i) => (
            <div
              key={service.number}
              className={`reveal reveal-delay-${(i % 3) + 1} group relative bg-obsidian p-8 md:p-10
                         hover:bg-graphite transition-colors duration-500 overflow-hidden`}
            >
              {/* Номер — великий задній декор */}
              <span className="absolute top-4 right-6 font-display text-7xl font-light
                               text-white/[0.03] group-hover:text-white/[0.05]
                               transition-colors duration-500 select-none leading-none">
                {service.number}
              </span>

              {/* Іконка */}
              <div className="relative w-14 h-14 border border-gold/20 flex items-center justify-center
                              text-gold/50 group-hover:text-gold group-hover:border-gold/50
                              transition-all duration-500 mb-7">
                {service.icon}
                {/* Кутові акценти */}
                <span className="absolute -top-px -left-px w-3 h-px bg-gold/40 group-hover:bg-gold transition-colors duration-500" />
                <span className="absolute -top-px -left-px w-px h-3 bg-gold/40 group-hover:bg-gold transition-colors duration-500" />
                <span className="absolute -bottom-px -right-px w-3 h-px bg-gold/40 group-hover:bg-gold transition-colors duration-500" />
                <span className="absolute -bottom-px -right-px w-px h-3 bg-gold/40 group-hover:bg-gold transition-colors duration-500" />
              </div>

              {/* Номер рядком */}
              <p className="font-body text-[10px] tracking-[0.4em] text-gold/40 uppercase mb-3
                            group-hover:text-gold/60 transition-colors duration-300">
                {service.number}
              </p>

              {/* Назва */}
              <h3 className="font-display text-xl md:text-2xl font-light text-cream mb-4
                             group-hover:text-gold transition-colors duration-400 leading-snug">
                {service.title}
              </h3>

              {/* Роздільник */}
              <div className="w-8 h-px bg-bordeaux/60 group-hover:w-16 group-hover:bg-gold/50
                              transition-all duration-500 mb-4" />

              {/* Опис */}
              <p className="font-body text-sm text-mist leading-relaxed group-hover:text-mist/80
                            transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA блок */}
        <div className="reveal mt-16 text-center">
          <p className="font-body text-mist text-sm mb-6">
            Потрібна консультація або термінова допомога?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+380970187187"
              className="flex items-center gap-3 bg-bordeaux hover:bg-burgundy text-cream
                         font-body text-xs tracking-widest uppercase px-10 py-4
                         transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +380 (97) 018-71-87
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 border border-gold/30 text-gold
                         font-body text-xs tracking-widest uppercase px-10 py-4
                         hover:bg-gold/5 hover:border-gold transition-all duration-300"
            >
              Написати нам
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
