'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ChevronDown, Phone } from 'lucide-react'

const PHONE = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 018-71-87'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden grain-overlay">

      <Image
        src="/images/hero-bg.jpg"
<<<<<<< HEAD
        alt="Ритуальна служба Ритуал"
=======
        alt="Гранітна майстерня"
>>>>>>> f8ceaecb29affe076f6ffc7656c19ba9c276c44a
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian z-10" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p className="deco-line font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-8 animate-fade-in animate-hidden">
<<<<<<< HEAD
          Світловодськ · 24/7
        </p>

        {/* Головний заголовок */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream leading-[1.1] mb-6 animate-slide-up animate-hidden">
          Ритуальні послуги<br/>
          <span className="text-gold/80 italic">та виготовлення пам&apos;ятників</span>
        </h1>

        {/* Підзаголовок */}
        <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4 animate-slide-up-d animate-hidden">
          Повний супровід у важку хвилину — від організації похорону до встановлення меморіального пам&apos;ятника.
          Працюємо з повагою, гідністю та турботою.
=======
          Гранітна майстерня
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.05] mb-6 animate-slide-up animate-hidden">
          Пам&apos;ятники з граніту<br/>
          <span className="text-gold/80 italic">власного виробництва</span>
        </h1>

        <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12 animate-slide-up-d animate-hidden">
          Виготовляємо гранітні пам&apos;ятники, надгробки та меморіальні вироби. Широкий вибір моделей, індивідуальне різьблення, доступні ціни.
>>>>>>> f8ceaecb29affe076f6ffc7656c19ba9c276c44a
        </p>

        {/* Три переваги */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-12 animate-slide-up-d animate-hidden">
          {['Організація поховань', 'Елітний катафалк', 'Пам\'ятники з граніту'].map((item, i) => (
            <span key={i} className="flex items-center gap-2 font-body text-xs text-mist/70 tracking-wider">
              <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0" />
              {item}
            </span>
          ))}
        </div>

        {/* CTA кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-d2 animate-hidden">
          <a href={`tel:${PHONE}`}
             className="flex items-center gap-2.5 bg-bordeaux hover:bg-burgundy text-cream
                        font-body text-sm tracking-widest uppercase px-8 py-3
                        transition-all duration-300">
            <Phone size={15} />
            {PHONE_DISPLAY}
          </a>
          <Link href="/catalog">
            <Button variant="outline">Переглянути каталог</Button>
          </Link>
        </div>

      </div>

      {/* Скрол вниз */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-body text-[9px] tracking-[0.4em] uppercase text-mist/30">Гортайте</span>
        <ChevronDown size={20} className="animate-bounce text-gold/40" />
      </div>

    </section>
  )
}
