'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, ZoomIn, LayoutGrid, MessageCircle } from 'lucide-react'
import { useContactForm } from '@/hooks/useContactForm'

type Props = { photos: string[] }

const inputClass = 'w-full bg-obsidian border border-white/10 text-cream placeholder-mist/50 font-body text-sm px-4 py-3 outline-none focus:border-gold/40 transition-all duration-300'

export function ExhibitionGallery({ photos }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const { formData, isSubmitting, isSubmitted, handleChange, handleSubmit } = useContactForm()

  const prev = useCallback(() =>
    setActive(i => (i != null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(() =>
    setActive(i => (i != null && i < photos.length - 1 ? i + 1 : i)), [])

  useEffect(() => {
    if (active == null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, prev, next])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">Наші роботи</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">Виставка</h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Фотогалерея наших робіт з натурального граніту.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2.5 px-8 py-3 bg-gold text-obsidian font-body text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors duration-300"
            >
              <LayoutGrid size={16} />
              Перейти до каталогу
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3 border border-gold/40 text-gold font-body text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors duration-300"
            >
              <MessageCircle size={16} />
              Зв'язатись з нами
            </button>
          </div>
          <p className="font-body text-mist/40 text-xs tracking-widest uppercase">{photos.length} фотографій</p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12 bg-obsidian">
        <div className="max-w-7xl mx-auto px-4 columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2.5">
          {photos.map((src, idx) => (
            <div
              key={src}
              className="group relative overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 cursor-zoom-in mb-2.5 break-inside-avoid"
              onClick={() => setActive(idx)}
            >
              <Image
                src={`/images/exhib/${src}`}
                alt={`Виставка ${idx + 1}`}
                width={600}
                height={800}
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 bg-obsidian/60 border border-white/20 flex items-center justify-center">
                  <ZoomIn size={16} className="text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {active != null && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          {active > 0 && (
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-obsidian/70 hover:bg-obsidian border border-white/10 text-mist hover:text-gold transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-obsidian/70 hover:bg-obsidian border border-white/10 text-mist hover:text-cream transition-colors"
          >
            <X size={18} />
          </button>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <Image
              src={`/images/exhib/${photos[active]}`}
              alt={`Виставка ${active + 1}`}
              width={1200}
              height={1600}
              className="w-full h-auto max-h-[88vh] object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 900px"
            />
            <p className="text-center font-body text-mist/30 text-xs tracking-widest mt-3">{active + 1} / {photos.length}</p>
          </div>
          {active < photos.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-obsidian/70 hover:bg-obsidian border border-white/10 text-mist hover:text-gold transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      )}

      {/* Contact modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-graphite border border-white/10 p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-obsidian/60 hover:bg-obsidian text-mist hover:text-cream transition-colors border border-white/10"
            >
              <X size={16} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <p className="text-gold text-3xl mb-4">◆</p>
                <p className="font-display text-2xl text-cream mb-3">Дякуємо за звернення</p>
                <p className="font-body text-mist text-sm">Наш спеціаліст зв'яжеться з вами найближчим часом.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl text-cream mb-2">Зв'яжіться з нами</h2>
                <p className="font-body text-mist text-sm mb-6">Відповімо якнайшвидше.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Ім'я</label>
                    <input type="text" name="name" required placeholder="Іван Іваненко" value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Телефон</label>
                    <input type="tel" name="phone" required placeholder="+380 (___) ___-__-__" value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Повідомлення</label>
                    <textarea name="message" rows={3} placeholder="Опишіть ваш запит..." value={formData.message} onChange={handleChange} className={inputClass + ' resize-none'} />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-obsidian font-body text-sm tracking-widest uppercase py-3 hover:bg-gold/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Надсилаємо...' : 'Надіслати повідомлення'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
