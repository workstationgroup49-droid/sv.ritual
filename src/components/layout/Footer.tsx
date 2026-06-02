import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Divider } from '@/components/ui/Divider'

export function Footer() {
  return (
    <footer className="bg-graphite border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <p className="font-display text-3xl font-light text-cream tracking-widest mb-2">СВ-РІТУАЛ</p>
            <p className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-4">Ритуальне агентство</p>
            <p className="font-body text-mist text-sm leading-relaxed">
              Професійний супровід у найважчий момент життя. Працюємо з повагою, гідністю та турботою.
            </p>
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
              <li className="flex items-start gap-3 text-mist">
                <Phone size={14} className="mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">
                  +380 (97) 018-71-87<br/>
                  <span className="text-xs opacity-60">09-17:00</span>
                </span>
              </li>

              <li className="flex items-start gap-3 text-mist">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">м. Світловодськ, вул. Миру, 48(б)</span>
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
