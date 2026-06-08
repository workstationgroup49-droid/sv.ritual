'use client'

import Script from 'next/script'

export function ReviewsSection() {
  return (
    <section className="py-24 bg-graphite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-4">Відгуки</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream">Що кажуть наші клієнти</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </div>
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div
          className="elfsight-app-fcd380aa-9763-43ef-8d14-ee21011252e3"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  )
}
