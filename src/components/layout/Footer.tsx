import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
import { Divider } from '@/components/ui/Divider'

const PHONE         = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 0-187-187'

const messengers = [
  {
    name: 'Telegram',
    href: `https://t.me/+${PHONE.replace('+', '')}`,
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
        <path d="M11.4 0C6.39 0 3.15 2.37 3.15 2.37S0 5.37 0 10.5c0 3.82.87 6.5 2.53 8.13l.03.03v3.86s-.01.7.42.84c.52.17.82-.32 1.33-.87l1.38-1.54c.76.67 1.6 1.18 2.51 1.5C9.27 23.42 10.33 24 11.4 24c4.95 0 10.6-3.68 10.6-3.68S24 17.14 24 10.5c0-3.82-.87-6.5-2.53-8.13C19.81 0 11.4 0 11.4 0zm.06 1.78c3.68 0 8.37.77 10.04 3.5 1.17 1.9 1.72 4.14 1.72 5.22 0 5.12-2.24 7.62-2.24 7.62S16.5 21.33 11.4 21.33c-.82 0-1.68-.17-2.5-.5-1.26-.5-2.36-1.37-3.17-2.47l-1.13 1.26c-.08.09-.14.1-.14.02v-2.81c-1.23-1.25-1.93-3.34-1.93-6.33 0-5.11 2.25-7.62 2.25-7.62S7.72 1.78 11.46 1.78z"/>
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

const navLinks = [
  { href: '/',           label: 'Головна' },
  { href: '/catalog',    label: 'Каталог' },
  { href: '/ritualni-poslugy', label: 'Ритуальні послуги' },
  { href: '/granite',    label: 'Зразки граніту' },
  { href: '/exhibition', label: 'Виставка' },
  { href: '/#about',     label: 'Про нас' },
  { href: '/#contact',   label: 'Контакти' },
]

const catalogLinks = [
  { href: '/catalog?category=forone',     label: "Пам'ятники на одного" },
  { href: '/catalog?category=military',   label: 'Для військових' },
  { href: '/catalog?category=crosses',    label: 'З хрестами' },
  { href: '/catalog?category=horizontal', label: 'Горизонтальні' },
  { href: '/catalog?category=children',   label: 'Дитячі' },
  { href: '/catalog?category=rizbl',      label: 'Різьблені' },
  { href: '/catalog?category=mixed',      label: 'Комбіновані' },
]

export function Footer() {
  return (
    <footer className="bg-graphite border-t border-white/5 pt-16 pb-8 relative overflow-hidden">

      {/* Ангел зліва */}
      <div className="absolute bottom-0 left-0 w-48 md:w-64 lg:w-72 pointer-events-none select-none opacity-20 md:opacity-30">
        <Image src="/images/angel-left.svg" alt="" width={335} height={513} className="w-full h-auto" />
      </div>

      {/* Ангел справа */}
      <div className="absolute bottom-0 right-0 w-32 md:w-44 lg:w-52 pointer-events-none select-none opacity-20 md:opacity-30 translate-y-16">
        <Image src="/images/angel-right.svg" alt="" width={208} height={513} className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Лого + опис */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/images/logo.png" alt="Ритуал" width={56} height={56} className="object-contain rounded-sm" />
              <p className="font-display text-3xl font-light text-cream tracking-widest">Ритуал</p>
            </div>
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-4">Ритуальна служба</p>
            <p className="font-body text-mist text-sm leading-relaxed mb-6">
              Власне виробництво пам&apos;ятників з натурального граніту. Широкий вибір, доступні ціни, доставка по області.
            </p>
            <div className="flex items-center gap-4">
              {messengers.map(m => (
                <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer"
                   title={m.name} className={`text-mist transition-colors duration-300 ${m.color}`}>
                  {m.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Навігація сайтом */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Навігація</p>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                        className="font-body text-sm text-mist hover:text-cream transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Каталог категорій */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Пам&apos;ятники</p>
            <ul className="space-y-3">
              {catalogLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                        className="font-body text-sm text-mist hover:text-cream transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">Контакти</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <a href={`tel:${PHONE}`}
                     className="font-body text-sm text-mist hover:text-gold transition-colors duration-300 block">
                    {PHONE_DISPLAY}
                  </a>
                  <span className="font-body text-xs text-mist/60">24/7 (цілодобово)</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-mist">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">м. Світловодськ, вул. Миру, 48(б)</span>
              </li>
              <li className="pt-2">
                <p className="font-body text-xs tracking-wider text-mist uppercase mb-3">Написати нам:</p>
                <div className="flex flex-col gap-2">
                  {messengers.map(m => (
                    <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer"
                       className={`flex items-center gap-2 font-body text-sm text-mist transition-colors duration-300 ${m.color}`}>
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
          © {new Date().getFullYear()} Ритуал. Всі права захищені.
        </p>
      </div>
    </footer>
  )
}
