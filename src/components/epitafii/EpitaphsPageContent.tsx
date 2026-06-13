'use client'

import { EpitaphsGrid } from '@/components/catalog/EpitaphsGrid'

export function EpitaphsPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-obsidian overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">
            Ритуальні послуги
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
            Епітафії на пам’ятник
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Готові написи та епітафії для гравіювання на пам’ятнику.\n            Оберіть напис, який найкраще відобразить пам’ять про рідну людину.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <EpitaphsGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-graphite border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-4">
            Замовити
          </p>
          <h2 className="font-display text-4xl text-cream mb-4">
            Обрали напис?
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />
          <p className="font-body text-mist text-sm mb-8 leading-relaxed">
            Зв’яжіться з нами — ми виконаємо гравіювання обраної епітафії на пам’ятнику з граніту.
          </p>
          <a
            href="tel:+380970187187"
            className="inline-flex items-center gap-3 px-8 py-3.5
                       bg-gold text-obsidian font-body text-xs tracking-widest uppercase
                       hover:bg-cream transition-colors duration-300"
          >
            +380 (97) 0-187-187
          </a>
        </div>
      </section>
    </>
  )
}
