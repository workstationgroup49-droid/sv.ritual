'use client'

import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/50
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 focus:bg-white/5
  transition-all duration-300
`

export function ContactSection() {
  const { formData, isSubmitting, isSubmitted, handleChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="py-24 bg-graphite">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          eyebrow="Зв'язатися з нами"
          title="Ми готові допомогти"
          subtitle="Звертайтеся до нас у будь-який час. Спеціалісти агентства доступні цілодобово."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="space-y-8">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Наші контакти</p>
              <ul className="space-y-6">
                {[
                  { icon: Phone, label: 'Телефон', value: '+380 (97) 018-71-87', sub: '08:00-17:00, без вихідних' },
                  { icon: MapPin,label: 'Адреса',  value: 'м. Світловодськ, вул. Миру, 48(б)', sub: '' },
                  { icon: Clock, label: 'Режим',   value: '08:00-17:00, ', sub: '' },
                ].map(item => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-gold/60" />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-wider text-mist uppercase mb-0.5">{item.label}</p>
                      <p className="font-body text-cream text-sm">{item.value}</p>
                      {item.sub && <p className="font-body text-mist/60 text-xs">{item.sub}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-ash border border-white/5 p-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <p className="text-gold text-3xl mb-4">◆</p>
                <p className="font-display text-2xl text-cream mb-3">Дякуємо за звернення</p>
                <p className="font-body text-mist text-sm">Наш спеціаліст зв&apos;яжеться з вами найближчим часом.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Ваше ім&apos;я</label>
                  <input
                    type="text" name="name" required
                    placeholder="Іван Іваненко"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Телефон</label>
                  <input
                    type="tel" name="phone" required
                    placeholder="+380 (___) ___-__-__"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Повідомлення</label>
                  <textarea
                    name="message" rows={4}
                    placeholder="Опишіть ситуацію або поставте запитання..."
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <Button
                  type="submit" variant="primary"
                  className="w-full justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Надсилаємо...' : 'Надіслати повідомлення'}
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
  )
}
