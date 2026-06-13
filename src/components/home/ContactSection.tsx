'use client'

import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Phone, MapPin, Clock } from 'lucide-react'

const PHONE = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 0-187-187'

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/50
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 focus:bg-white/5
  transition-all duration-300
`

const messengers = [
  {
    name: 'Telegram',
    href: `https://t.me/+${PHONE.replace('+', '')}`,
    label: 'Написати в Telegram',
    hoverBg: 'hover:bg-[#2AABEE]/10 hover:border-[#2AABEE]/40 hover:text-[#2AABEE]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: 'Viber',
    href: `viber://chat?number=${PHONE}`,
    label: 'Написати у Viber',
    hoverBg: 'hover:bg-[#7360F2]/10 hover:border-[#7360F2]/40 hover:text-[#7360F2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.4 0C6.39 0 3.15 2.37 3.15 2.37S0 5.37 0 10.5c0 3.82.87 6.5 2.53 8.13l.03.03v3.86s-.01.7.42.84c.52.17.82-.32 1.33-.87l1.38-1.54c.76.67 1.6 1.18 2.51 1.5C9.27 23.42 10.33 24 11.4 24c4.95 0 10.6-3.68 10.6-3.68S24 17.14 24 10.5c0-3.82-.87-6.5-2.53-8.13C19.81 0 11.4 0 11.4 0zm.06 1.78c3.68 0 8.37.77 10.04 3.5 1.17 1.9 1.72 4.14 1.72 5.22 0 5.12-2.24 7.62-2.24 7.62S16.5 21.33 11.4 21.33c-.82 0-1.68-.17-2.5-.5-1.26-.5-2.36-1.37-3.17-2.47l-1.13 1.26c-.08.09-.14.1-.14.02v-2.81c-1.23-1.25-1.93-3.34-1.93-6.33 0-5.11 2.25-7.62 2.25-7.62S7.72 1.78 11.46 1.78zM8.26 6.2c-.19.01-.35.07-.48.18-.3.25-1.85 1.53-1.85 4.57s1.85 4.32 1.85 4.32l.01.01c.12.1.28.16.45.16.43 0 .78-.35.78-.78 0-.2-.08-.4-.21-.54-.08-.09-1.38-1.04-1.38-3.17 0-2.14 1.29-3.09 1.38-3.17.13-.14.21-.33.21-.54 0-.43-.35-.06-.76-.04zm7.06.48c-.22 0-.41.09-.55.24l-.01.01c-.32.36-.44.88-.12 1.19.47.47 1.28 1.4 1.28 2.88s-.81 2.41-1.28 2.88c-.32.31-.2.83.12 1.19.14.15.34.24.55.24.43 0 .78-.35.78-.78 0-.19-.07-.37-.18-.51.47-.61 1.57-1.88 1.57-3.02 0-1.14-1.1-2.41-1.57-3.02.11-.14.18-.32.18-.51 0-.43-.35-.79-.77-.79zm-3.56.41c-.43 0-.78.35-.78.78 0 .22.09.42.24.56.5.47.77 1.11.77 1.84s-.27 1.37-.77 1.84c-.15.14-.24.34-.24.56 0 .43.35.78.78.78.21 0 .4-.08.54-.22.75-.71 1.17-1.69 1.17-2.96s-.42-2.25-1.17-2.96c-.14-.14-.33-.22-.54-.22z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${PHONE.replace('+', '')}`,
    label: 'Написати у WhatsApp',
    hoverBg: 'hover:bg-[#25D366]/10 hover:border-[#25D366]/40 hover:text-[#25D366]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

export function ContactSection() {
  const { formData, isSubmitting, isSubmitted, handleChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="py-24 bg-graphite">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          eyebrow="Зв'язатися з нами"
          title="Зв'яжіться з нами"
          subtitle="Маєте питання або хочете замовити пам'ятник? Зателефонуйте або напишіть — відповімо швидко."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Ліва частина — контакти + мессенджери */}
          <div className="space-y-10">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Наші контакти</p>
              <ul className="space-y-6">
                {[
                  {
                    icon: Phone,
                    label: 'Телефон',
                    content: (
                      <a href={`tel:${PHONE}`} className="font-body text-cream text-sm hover:text-gold transition-colors duration-300">
                        {PHONE_DISPLAY}
                      </a>
                    ),
                    sub: '24/7 (цілодобово)',
                  },
                  {
                    icon: MapPin,
                    label: 'Адреса',
                    content: <p className="font-body text-cream text-sm">м. Світловодськ, вул. Миру, 48(б)</p>,
                    sub: '',
                  },
                  {
                    icon: Clock,
                    label: 'Режим роботи',
                    content: <p className="font-body text-cream text-sm">24/7 (цілодобово)</p>,
                    sub: '',
                  },
                ].map(item => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-gold/60" />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-wider text-mist uppercase mb-0.5">{item.label}</p>
                      {item.content}
                      {item.sub && <p className="font-body text-mist/60 text-xs">{item.sub}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Мессенджери */}
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Швидкий зв&apos;язок</p>
              <p className="font-body text-sm text-mist mb-5 leading-relaxed">
                Напишіть нам у зручний месенджер — відповімо якнайшвидше.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {messengers.map(m => (
                  <a
                    key={m.name}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 px-4 py-3 border border-white/10 text-mist font-body text-sm tracking-wide transition-all duration-300 ${m.hoverBg}`}
                  >
                    {m.icon}
                    {m.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Права частина — форма */}
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
