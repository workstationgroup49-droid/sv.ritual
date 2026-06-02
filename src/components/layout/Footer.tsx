import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'
import { Divider } from '@/components/ui/Divider'

const PHONE = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 018-71-87'

const messengers = [
  {
    name: 'Telegram',
    href: `https://t.me/${PHONE.replace('+', '')}`,
    color: 'hover:text-[#2AABEE]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: 'Viber',
    href: `viber://chat?number=${PHONE}`,
    color: 'hover:text-[#7360F2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.4 0C6.39 0 3.15 2.37 3.15 2.37S0 5.37 0 10.5c0 3.82.87 6.5 2.53 8.13l.03.03v3.86s-.01.7.42.84c.52.17.82-.32 1.33-.87l1.38-1.54c.76.67 1.6 1.18 2.51 1.5C9.27 23.42 10.33 24 11.4 24c4.95 0 10.6-3.68 10.6-3.68S24 17.14 24 10.5c0-3.82-.87-6.5-2.53-8.13C19.81 0 11.4 0 11.4 0zm.06 1.78c3.68 0 8.37.77 10.04 3.5 1.17 1.9 1.72 4.14 1.72 5.22 0 5.12-2.24 7.62-2.24 7.62S16.5 21.33 11.4 21.33c-.82 0-1.68-.17-2.5-.5-1.26-.5-2.36-1.37-3.17-2.47l-1.13 1.26c-.08.09-.14.1-.14.02v-2.81c-1.23-1.25-1.93-3.34-1.93-6.33 0-5.11 2.25-7.62 2.25-7.62S7.72 1.78 11.46 1.78zM8.26 6.2c-.19.01-.35.07-.48.18-.3.25-1.85 1.53-1.85 4.57s1.85 4.32 1.85 4.32l.01.01c.12.1.28.16.45.16.43 0 .78-.35.78-.78 0-.2-.08-.4-.21-.54-.08-.09-1.38-1.04-1.38-3.17 0-2.14 1.29-3.09 1.38-3.17.13-.14.21-.33.21-.54 0-.43-.35-.06-.76-.04zm7.06.48c-.22 0-.41.09-.55.24l-.01.01c-.32.36-.44.88-.12 1.19.47.47 1.28 1.4 1.28 2.88s-.81 2.41-1.28 2.88c-.32.31-.2.83.12 1.19.14.15.34.24.55.24.43 0 .78-.35.78-.78 0-.19-.07-.37-.18-.51.47-.61 1.57-1.88 1.57-3.02 0-1.14-1.1-2.41-1.57-3.02.11-.14.18-.32.18-.51 0-.43-.35-.79-.77-.79zm-3.56.41c-.43 0-.78.35-.78.78 0 .22.09.42.24.56.5.47.77 1.11.77 1.84s-.27 1.37-.77 1.84c-.15.14-.24.34-.24.56 0 .43.35.78.78.78.21 0 .4-.08.54-.22.75-.71 1.17-1.69 1.17-2.96s-.42-2.25-1.17-2.96c-.14-.14-.33-.22-.54-.22z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${PHONE.replace('+', '')}`,
    color: 'hover:text-[#25D366]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-graphite border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <p className="font-display text-3xl font-light text-cream tracking-widest mb-2">СВ-РІТУАЛ</p>
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-4">Ритуальне агентство</p>
            <p className="font-body text-mist text-sm leading-relaxed mb-6">
              Професійний супровід у найважчий момент життя. Працюємо з повагою, гідністю та турботою.
            </p>
            {/* Мессенджеры */}
            <div className="flex items-center gap-4">
              {messengers.map(m => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={m.name}
                  className={`text-mist transition-colors duration-300 ${m.color}`}
                >
                  {m.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Послуги</p>
            <ul className="space-y-3">
              {['Організація похорону', 'Кремація', 'Транспортування', 'Надгробки', 'Вінки та квіти'].map(s => (
                <li key={s}>
                  <Link href="/catalog" className="font-body text-sm text-mist hover:text-cream transition-colors duration-300">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Контакти</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <a
                    href={`tel:${PHONE}`}
                    className="font-body text-sm text-mist hover:text-gold transition-colors duration-300 block"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <span className="font-body text-xs text-mist/60">08:00–17:00</span>
                </div>
              </li>

              <li className="flex items-start gap-3 text-mist">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">м. Світловодськ, вул. Миру, 48(б)</span>
              </li>

              {/* Мессенджеры в контактах */}
              <li className="pt-2">
                <p className="font-body text-xs tracking-wider text-mist uppercase mb-3">Написати нам:</p>
                <div className="flex flex-col gap-2">
                  {messengers.map(m => (
                    <a
                      key={m.name}
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 font-body text-sm text-mist transition-colors duration-300 ${m.color}`}
                    >
                      {m.icon}
                      {m.name}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

        </div>

        <Divider />

        <p className="font-body text-center text-mist/40 text-xs tracking-wider">
          © {new Date().getFullYear()} СВ-РІТУАЛ. Всі права захищені.
        </p>
      </div>
    </footer>
  )
}
