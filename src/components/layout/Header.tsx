'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ShoppingCart, Phone } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const navLinks = [
  { href: '/',         label: 'Головна' },
  { href: '/catalog',  label: 'Каталог Пам\'ятників ' },
  { href: '/#about',   label: 'Про нас' },
  { href: '/#contact', label: 'Контакти' },
  { href: '/#contact', label: 'Зразки граніту' },
]

export function Header() {
  const pathname   = usePathname()
  const totalItems = useCartStore(s => s.totalItems())

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-2xl font-light text-cream tracking-widest group-hover:text-gold transition-colors duration-300">
            СВ-РІТУАЛ
          </span>
          <span className="font-body text-[9px] tracking-[0.4em] text-mist uppercase">
            Ритуальне агентство
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-body text-xs tracking-widest uppercase transition-colors duration-300',
                pathname === link.href ? 'text-gold' : 'text-mist hover:text-cream'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="tel:+380970187187"
            className="hidden md:flex items-center gap-2 text-mist hover:text-gold transition-colors duration-300"
          >
            <Phone size={14} />
            <span className="font-body text-xs tracking-wider">+380 (97) 018-71-87</span>
          </a>

          <Link href="/cart" className="relative text-mist hover:text-cream transition-colors duration-300">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-bordeaux text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  )
}
