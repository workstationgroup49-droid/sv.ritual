'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden grain-overlay">

      <Image
        src="/images/hero-bg.jpg"
        alt="Фон головної сторінки"
        fill
        priority
        className="object-cover opacity-30"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian z-10" />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">

        <p className="deco-line font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-8 animate-fade-in animate-hidden">
          Ритуальне агентство
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.05] mb-6 animate-slide-up animate-hidden">
          Гідне прощання<br/>
          <span className="text-gold/80 italic">в останню путь</span>
        </h1>

        <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12 animate-slide-up-d animate-hidden">
          Ми беремо на себе організацію у найважчий момент. Шанобливо, професійно, з турботою про кожну деталь.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-d2 animate-hidden">
          <Button variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Зв&apos;язатися з нами
          </Button>
          <Link href="/catalog">
            <Button variant="outline">Переглянути каталог</Button>
          </Link>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gold/50">
        <ChevronDown size={24} />
      </div>

    </section>
  )
}
