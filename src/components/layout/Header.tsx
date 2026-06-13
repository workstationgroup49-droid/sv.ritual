'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ShoppingCart, Phone, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useCategories } from '@/hooks/useCategories'

const PHONE = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 0-187-187'

const navLinks = [
  { href: '/',           label: 'Головна' },
  { href: '/ritualni-poslugy', label: 'Послуги' },
  { href: '/granite',    label: 'Зразки граніту' },
  { href: '/exhibition', label: 'Виставка' },
  { href: '/#about',     label: 'Про нас' },
  { href: '/#contact',   label: 'Контакти' },
]

const messengers = [
  {
    name: 'Telegram',
    href: `https://t.me/+${PHONE.replace('+', '')}`,
    color: 'hover:text-[#2AABEE]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: 'Viber',
    href: `viber://chat?number=${PHONE}`,
    color: 'hover:text-[#7360F2]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.4 0C6.39 0 3.15 2.37 3.15 2.37S0 5.37 0 10.5c0 3.82.87 6.5 2.53 8.13l.03.03v3.86s-.01.7.42.84c.52.17.82-.32 1.33-.87l1.38-1.54c.76.67 1.6 1.18 2.51 1.5C9.27 23.42 10.33 24 11.4 24c4.95 0 10.6-3.68 10.6-3.68S24 17.14 24 10.5c0-3.82-.87-6.5-2.53-8.13C19.81 0 11.4 0 11.4 0zm.06 1.78c3.68 0 8.37.77 10.04 3.5 1.17 1.9 1.72 4.14 1.72 5.22 0 5.12-2.24 7.62-2.24 7.62S16.5 21.33 11.4 21.33c-.82 0-1.68-.17-2.5-.5-1.26-.5-2.36-1.37-3.17-2.47l-1.13 1.26c-.08.09-.14.1-.14.02v-2.81c-1.23-1.25-1.93-3.34-1.93-6.33 0-5.11 2.25-7.62 2.25-7.62S7.72 1.78 11.46 1.78zM8.26 6.2c-.19.01-.35.07-.48.18-.3.25-1.85 1.53-1.85 4.57s1.85 4.32 1.85 4.32l.01.01c.12.1.28.16.45.16.43 0 .78-.35.78-.78 0-.2-.08-.4-.21-.54-.08-.09-1.38-1.04-1.38-3.17 0-2.14 1.29-3.09 1.38-3.17.13-.14.21-.33.21-.54 0-.43-.35-.06-.76-.04zm7.06.48c-.22 0-.41.09-.55.24l-.01.01c-.32.36-.44.88-.12 1.19.47.47 1.28 1.4 1.28 2.88s-.81 2.41-1.28 2.88c-.32.31-.2.83.12 1.19.14.15.34.24.55.24.43 0 .78-.35.78-.78 0-.19-.07-.37-.18-.51.47-.61 1.57-1.88 1.57-3.02 0-1.14-1.1-2.41-1.57-3.02.11-.14.18-.32.18-.51 0-.43-.35-.79-.77-.79zm-3.56.41c-.43 0-.78.35-.78.78 0 .22.09.42.24.56.5.47.77 1.11.77 1.84s-.27 1.37-.77 1.84c-.15.14-.24.34-.24.56 0 .43.35.78.78.78.21 0 .4-.08.54-.22.75-.71 1.17-1.69 1.17-2.96s-.42-2.25-1.17-2.96c-.14-.14-.33-.22-.54-.22z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${PHONE.replace('+', '')}`,
    color: 'hover:text-[#25D366]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

export function Header() {
  const pathname   = usePathname()
  const totalItems = useCartStore(s => s.totalItems())
  const { categories } = useCategories()

  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [catalogOpen,   setCatalogOpen]   = useState(false)
  const [mobileCatOpen, setMobileCatOpen] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
        setCatalogOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src="/images/logo.png"
              alt="Ритуал"
              width={58}
              height={58}
              className="object-contain rounded-sm"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl md:text-3xl font-light text-cream tracking-widest group-hover:text-gold transition-colors duration-300">
                Ритуал
              </span>
              <span className="font-body text-[9px] md:text-[10px] tracking-[0.4em] text-gold/70 uppercase">
                Ритуальна служба
              </span>
            </div>
          </Link>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'font-body text-xs tracking-widest uppercase transition-colors duration-300',
                  pathname === link.href ? 'text-gold' : 'text-mist hover:text-cream'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Каталог с динамическим подменю */}
            <div className="relative" ref={catalogRef}>
              <button
                onClick={() => setCatalogOpen(v => !v)}
                className={cn(
                  'flex items-center gap-1 font-body text-xs tracking-widest uppercase transition-colors duration-300',
                  pathname === '/catalog' ? 'text-gold' : 'text-mist hover:text-cream'
                )}
              >
                Каталог
                <ChevronDown size={11} className={cn('transition-transform duration-200', catalogOpen && 'rotate-180')} />
              </button>

              {catalogOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-graphite border border-white/10 shadow-2xl z-50 max-h-[70vh] overflow-y-auto">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-graphite border-l border-t border-white/10 rotate-45" />

                  <Link
                    href="/catalog"
                    onClick={() => setCatalogOpen(false)}
                    className="block px-4 py-3 font-body text-xs tracking-wider text-gold uppercase border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    Всі товари
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      onClick={() => setCatalogOpen(false)}
                      className="block px-4 py-2.5 font-body text-sm text-mist hover:text-cream hover:bg-white/5 transition-colors duration-200"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={`tel:${PHONE}`}
              className="hidden lg:flex items-center gap-2 text-mist hover:text-gold transition-colors duration-300"
            >
              <Phone size={13} />
              <span className="font-body text-xs tracking-wider">{PHONE_DISPLAY}</span>
            </a>

            <div className="hidden md:flex items-center gap-2.5">
              {messengers.map(m => (
                <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer" title={m.name}
                  className={cn('text-mist transition-colors duration-300', m.color)}>
                  {m.icon}
                </a>
              ))}
            </div>

            <Link href="/cart" className="relative text-mist hover:text-cream transition-colors duration-300">
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-bordeaux text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                  {totalItems}
                </span>
              )}
            </Link>

            <a href={`tel:${PHONE}`} className="md:hidden text-mist hover:text-gold transition-colors duration-300">
              <Phone size={18} />
            </a>

            <button
              className="md:hidden text-mist hover:text-cream transition-colors duration-300 p-1"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Меню"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={cn('fixed inset-0 z-40 md:hidden transition-all duration-300', mobileOpen ? 'visible' : 'invisible')}>
        <div
          className={cn('absolute inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity duration-300', mobileOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMobileOpen(false)}
        />

        <div className={cn(
          'absolute top-20 right-0 bottom-0 w-72 bg-graphite border-l border-white/5 flex flex-col transition-transform duration-300 overflow-y-auto',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          {/* Телефон + мессенджеры */}
          <div className="p-5 border-b border-white/5">
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-cream hover:text-gold transition-colors duration-300 mb-4">
              <div className="w-9 h-9 border border-gold/30 flex items-center justify-center shrink-0">
                <Phone size={15} className="text-gold" />
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-mist mb-0.5">Цілодобово</p>
                <p className="font-body text-sm tracking-wider">{PHONE_DISPLAY}</p>
              </div>
            </a>
            <div className="flex items-center gap-5">
              {messengers.map(m => (
                <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer"
                  className={cn('flex items-center gap-1.5 font-body text-xs text-mist transition-colors duration-300', m.color)}>
                  {m.icon}
                  <span>{m.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex-1 p-3">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                className="flex items-center h-11 px-3 font-body text-sm tracking-widest uppercase text-mist hover:text-cream hover:bg-white/5 transition-colors duration-200 border-b border-white/5">
                {link.label}
              </Link>
            ))}

            {/* Каталог с раскрытием */}
            <div className="border-b border-white/5">
              <button
                onClick={() => setMobileCatOpen(v => !v)}
                className="w-full flex items-center justify-between h-11 px-3 font-body text-sm tracking-widest uppercase text-mist hover:text-cream hover:bg-white/5 transition-colors duration-200"
              >
                Каталог
                <ChevronDown size={13} className={cn('transition-transform duration-200', mobileCatOpen && 'rotate-180')} />
              </button>

              <div className={cn('overflow-hidden transition-all duration-300', mobileCatOpen ? 'max-h-[500px]' : 'max-h-0')}>
                <Link href="/catalog"
                  className="flex items-center h-9 pl-7 pr-3 font-body text-xs tracking-wider text-gold uppercase hover:bg-white/5 transition-colors duration-200">
                  Всі товари
                </Link>
                {categories.map(cat => (
                  <Link key={cat.id} href={`/catalog?category=${cat.slug}`}
                    className="flex items-center h-9 pl-7 pr-3 font-body text-sm text-mist hover:text-cream hover:bg-white/5 transition-colors duration-200">
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-5 border-t border-white/5">
            <p className="font-display text-lg text-cream/20 tracking-widest text-center">Ритуал</p>
          </div>
        </div>
      </div>
    </>
  )
}
