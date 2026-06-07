'use client'

import { useContactForm } from '@/hooks/useContactForm'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { Phone, MapPin, ChevronDown, Check } from 'lucide-react'

const PHONE         = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 018-71-87'

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/50
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 focus:bg-white/5
  transition-all duration-300
`

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Організація та проведення поховань',
    description: 'Повний супровід похоронної церемонії та оформлення всіх необхідних документів. Беремо на себе всі організаційні питання, щоб ви могли зосередитись на прощанні.',
    features: ['Оформлення документів', 'Підготовка тіла', 'Організація церемонії', 'Координація всіх служб'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z"/>
        <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
        <path d="M3 11h18"/>
      </svg>
    ),
    title: 'Елітні катафалки',
    description: 'Сучасний представницький транспорт для проведення похоронних процесій. Гідне прощання з урахуванням усіх традицій та побажань родини.',
    features: ['Сучасні автомобілі', 'Досвідчені водії', 'Будь-який маршрут', 'Повна підготовка'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Кремація',
    description: 'Організація кремації з усіма необхідними документами та вибором урни. Індивідуальний підхід та повний супровід усіх процедур.',
    features: ['Оформлення дозволів', 'Вибір урни', 'Транспортування', 'Організація прощання'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17H5l-1-1V8l1-1h4m6 10h4l1-1V8l-1-1h-4"/>
        <rect x="9" y="6" width="6" height="12" rx="1"/>
      </svg>
    ),
    title: 'Перевезення тіла по Україні',
    description: 'Транспортування померлих між містами та областями України. Спеціалізований транспорт, дотримання всіх санітарних норм та законодавчих вимог.',
    features: ['По всій Україні', 'Санітарні норми', 'Швидке реагування', 'Документальний супровід'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 20h18M5 20V8l7-5 7 5v12"/>
        <path d="M9 20v-5h6v5"/>
      </svg>
    ),
    title: 'Копка могил',
    description: 'Підготовка місця поховання відповідно до вимог кладовища. Ручна та механізована копка, оформлення та впорядкування місця поховання.',
    features: ['Ручна та механізована', 'Будь-яке кладовище', 'Оформлення місця', 'Швидко та якісно'],
  },
]

export function RitualServicesPage() {
  const { formData, isSubmitting, isSubmitted, handleChange, handleSubmit } = useContactForm()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="deco-line font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">
            Ритуальна служба · 24/7
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
            Ритуальні послуги
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Повний спектр ритуальних послуг з повагою та гідністю. Ми поруч у найважчу хвилину —
            беремо на себе всі організаційні питання, щоб ви могли гідно попрощатись з близькою людиною.
          </p>

          {/* Швидкий дзвінок */}
          <a href={`tel:${PHONE}`}
             className="inline-flex items-center gap-3 bg-bordeaux hover:bg-burgundy text-cream
                        font-body text-sm tracking-widest uppercase px-10 py-4
                        transition-all duration-300 mb-6">
            <Phone size={16} />
            Зателефонувати зараз — {PHONE_DISPLAY}
          </a>
          <p className="font-body text-mist/40 text-xs tracking-wider">Цілодобово, без вихідних</p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-mist/20">Послуги</span>
          <ChevronDown size={18} className="text-gold/30 animate-bounce" />
        </div>
      </section>

      {/* Картки послуг */}
      <section className="py-20 bg-graphite">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Що ми пропонуємо"
            title="Наші послуги"
            subtitle="Кожна послуга виконується з максимальною турботою та повагою до вашої родини"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i}
                className="group bg-ash border border-white/5 p-8
                           hover:border-gold/20 hover:bg-ash/60
                           transition-all duration-500 flex flex-col">

                {/* Іконка */}
                <div className="text-gold/60 group-hover:text-gold mb-6
                                transition-colors duration-300 w-12 h-12 flex items-center justify-center
                                border border-gold/20 group-hover:border-gold/40">
                  {service.icon}
                </div>

                {/* Назва */}
                <h3 className="font-display text-xl text-cream mb-3
                               group-hover:text-gold transition-colors duration-300 leading-snug">
                  {service.title}
                </h3>

                {/* Опис */}
                <p className="font-body text-mist text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                {/* Фічі */}
                <ul className="space-y-2 pt-4 border-t border-white/5">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 font-body text-xs text-mist/70">
                      <Check size={11} className="text-gold/60 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="h-px bg-gradient-to-r from-transparent via-bordeaux/50 to-transparent
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секція */}
      <section className="py-20 bg-bordeaux/10 border-y border-bordeaux/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-body text-gold text-xs tracking-[0.4em] uppercase mb-4">Термінова допомога</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-6 leading-tight">
            Потрібна допомога прямо зараз?
          </h2>
          <p className="font-body text-mist text-base leading-relaxed max-w-xl mx-auto mb-10">
            Наші спеціалісти доступні цілодобово. Ми відповімо негайно і організуємо все необхідне
            у найкоротші терміни.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${PHONE}`}
               className="flex items-center gap-3 bg-bordeaux hover:bg-burgundy text-cream
                          font-body text-sm tracking-widest uppercase px-10 py-4
                          transition-all duration-300 w-full sm:w-auto justify-center">
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>
            <a href="#contact-form"
               className="flex items-center gap-3 border border-gold/30 text-gold
                          font-body text-sm tracking-widest uppercase px-10 py-4
                          hover:bg-gold/5 hover:border-gold
                          transition-all duration-300 w-full sm:w-auto justify-center">
              Написати нам
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {[
              { value: '24/7', label: 'Цілодобово' },
              { value: '10+', label: 'Років досвіду' },
              { value: '1000+', label: 'Родин довірились нам' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl text-gold font-light">{stat.value}</p>
                <p className="font-body text-mist/60 text-xs tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма зв'язку */}
      <section id="contact-form" className="py-20 bg-obsidian">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Ліво — контакти */}
            <div>
              <SectionTitle
                eyebrow="Зв'яжіться з нами"
                title="Ми завжди поруч"
                centered={false}
              />

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-mist/50 uppercase tracking-wider mb-1">Телефон</p>
                    <a href={`tel:${PHONE}`}
                       className="font-body text-cream text-lg hover:text-gold transition-colors duration-300">
                      {PHONE_DISPLAY}
                    </a>
                    <p className="font-body text-mist/50 text-xs mt-0.5">24/7 (цілодобово)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-mist/50 uppercase tracking-wider mb-1">Адреса</p>
                    <p className="font-body text-cream text-sm">м. Світловодськ, вул. Миру, 48(б)</p>
                  </div>
                </div>
              </div>

              <div className="bg-graphite border border-white/5 p-6">
                <p className="font-body text-xs text-gold tracking-widest uppercase mb-3">Важливо знати</p>
                <p className="font-body text-mist text-sm leading-relaxed">
                  Після звернення наш спеціаліст зв&apos;яжеться з вами протягом декількох хвилин.
                  Ми розуміємо, що кожна ситуація унікальна, тому підходимо індивідуально.
                </p>
              </div>
            </div>

            {/* Право — форма */}
            <div className="bg-graphite border border-white/5 p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <p className="text-gold text-4xl mb-4">◆</p>
                  <p className="font-display text-2xl text-cream mb-3">Дякуємо за звернення</p>
                  <p className="font-body text-mist text-sm leading-relaxed">
                    Наш спеціаліст зв&apos;яжеться з вами найближчим часом.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="font-display text-xl text-cream mb-6">Залишити заявку</p>

                  <div>
                    <label className="font-body text-xs tracking-wider text-mist/60 uppercase mb-2 block">
                      Ваше ім&apos;я *
                    </label>
                    <input type="text" name="name" required placeholder="Іван Іваненко"
                      value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="font-body text-xs tracking-wider text-mist/60 uppercase mb-2 block">
                      Телефон *
                    </label>
                    <input type="tel" name="phone" required placeholder="+380 (___) ___-__-__"
                      value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="font-body text-xs tracking-wider text-mist/60 uppercase mb-2 block">
                      Повідомлення
                    </label>
                    <textarea name="message" rows={4}
                      placeholder="Опишіть ситуацію або поставте запитання..."
                      value={formData.message} onChange={handleChange}
                      className={inputClass + ' resize-none'} />
                  </div>

                  <Button type="submit" variant="primary"
                    className="w-full justify-center py-4"
                    disabled={isSubmitting}>
                    {isSubmitting ? 'Надсилаємо...' : 'Надіслати заявку'}
                  </Button>

                  <p className="font-body text-mist/40 text-xs text-center">
                    Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
