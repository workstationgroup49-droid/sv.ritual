'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useCategories } from '@/hooks/useCategories'

interface CategoryQuickNavProps {
  activeCategory: string
  onSelect: (slug: string) => void
}

function getCategoryImage(slug: string, label: string): string | null {
  const s = (slug + ' ' + label).toLowerCase()

  if (s.includes('атрибут') || s.includes('atryb'))    return '/images/cat-atrybutyka.png'
  if (s.includes('бетон')   || s.includes('beton'))               return '/images/cat-betonni.png'
  if (s.includes('військ')  || s.includes('зсу') || s.includes('milit')) return '/images/cat-viiskovyi.png'
  if (s.includes('горизонт') || s.includes('horiz'))  return '/images/cat-horizontalni.png'
  if (s.includes('комплекс') || s.includes('сімейн'))  return '/images/cat-kompleks.png'
  if (s.includes('огорож')  || s.includes('fence'))            return '/images/cat-ohorozhi.png'
  if (s.includes('дитяч')   || s.includes('child'))               return '/images/cat-dytyachi.png'
  if (s.includes('додатк')  || s.includes('element'))          return '/images/cat-dodatkovi.png'
  if (s.includes('єпітаф')  || s.includes('епітаф') || s.includes('epitaf')) return '/images/cat-epitafii.png'
  if (s.includes('кольор')  || s.includes('колір') || s.includes('фото'))  return '/images/cat-kolyorove-foto.png'
  if (s.includes('різьбл') || s.includes('різбл') || s.includes('carv'))   return '/images/cat-rizblennya.png'
  if (s.includes('хрест')   || s.includes('cross'))               return '/images/cat-khresty.png'
  if (s.includes('колумб')  || s.includes('kolumb'))           return '/images/cat-kolumbarii.png'
  if (s.includes('комбін')  || s.includes('комбин') || s.includes('mix'))  return '/images/cat-kombinovanyi.png'
  if (s.includes('на двох') || s.includes('подвійн') || s.includes('double')) return '/images/cat-na-dvokh.png'
  if (s.includes('на одн')  || s.includes('single'))               return '/images/cat-na-odnoho.png'
  if (s.includes('одинарн') || s.includes('одиноч'))           return '/images/cat-odynarnyi.png'
  if (s.includes('підвік')  || s.includes('ікон'))             return '/images/cat-pidvikonnya.png'
  if (s.includes('стільн')  || s.includes('столеш') || s.includes('counter')) return '/images/cat-stilnytsi.png'
  if (s.includes('євро')    || s.includes('euro') || s.includes('евро'))  return '/images/cat-ievrostyl.png'

  return null
}

function AllIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.3">
      <rect x="5"  y="5"  width="13" height="13" rx="1" />
      <rect x="22" y="5"  width="13" height="13" rx="1" />
      <rect x="5"  y="22" width="13" height="13" rx="1" />
      <rect x="22" y="22" width="13" height="13" rx="1" />
    </svg>
  )
}

export function CategoryQuickNav({ activeCategory, onSelect }: CategoryQuickNavProps) {
  const { categories, isLoading } = useCategories()

  // На мобільному (< lg) після вибору категорії скролимо до сітки товарів
  const handleSelect = (slug: string) => {
    onSelect(slug)
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const el = document.getElementById('product-grid')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-0 animate-pulse">
            <div className="w-full aspect-[3/2] bg-white/5" />
            <div className="w-full h-10 bg-white/5 mt-0.5" />
          </div>
        ))}
      </div>
    )
  }

  const allItem = { id: 'all', slug: 'all', label: 'Всі товари', sort_order: 0, created_at: '' }
  const items = [allItem, ...categories]

  return (
    <div className="mb-8">
      <p className="font-body text-[10px] tracking-[0.4em] uppercase text-mist/40 mb-3">
        Швидка навігація
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {items.map(cat => {
          const isActive = activeCategory === cat.slug
          const imgSrc   = getCategoryImage(cat.slug, cat.label)
          const isAll    = cat.slug === 'all'

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              title={cat.label}
              className={cn(
                'group flex flex-col items-stretch overflow-hidden',
                'transition-all duration-200 border',
                isActive
                  ? 'border-gold/60 shadow-[0_0_16px_rgba(201,169,110,0.2)]'
                  : 'border-white/[0.07] hover:border-gold/30 hover:scale-[1.03]'
              )}
            >
              {/* Photo area */}
              <div className="relative w-full aspect-[3/2] bg-[#141416]">
                {isAll ? (
                  <div className={cn(
                    'absolute inset-0 flex items-center justify-center transition-colors duration-200',
                    isActive ? 'text-gold' : 'text-white/40 group-hover:text-gold/70'
                  )}>
                    <AllIcon />
                  </div>
                ) : imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 13vw"
                    className={cn(
                      'object-cover transition-all duration-500',
                      isActive
                        ? 'opacity-100 brightness-110'
                        : 'opacity-70 group-hover:opacity-100 group-hover:scale-[1.07]'
                    )}
                  />
                ) : (
                  <div className={cn(
                    'absolute inset-0 flex items-center justify-center transition-colors duration-200',
                    isActive ? 'text-gold' : 'text-white/30 group-hover:text-gold/60'
                  )}>
                    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.3">
                      <path d="M15 6 Q15 4 20 4 Q25 4 25 6 L25 34 L15 34 Z" />
                      <path d="M13 34 L27 34" strokeLinecap="round" />
                    </svg>
                  </div>
                )}

                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
                )}
              </div>

              {/* Label — fixed height so all cards are equal */}
              <div className={cn(
                'h-10 px-2 flex items-center justify-center border-t text-center transition-colors duration-200',
                isActive
                  ? 'border-gold/30 bg-bordeaux/15'
                  : 'border-white/[0.05] bg-graphite/40 group-hover:bg-graphite/70'
              )}>
                <span className={cn(
                  'font-body text-[11px] leading-tight tracking-wide line-clamp-2',
                  isActive ? 'text-gold' : 'text-white/75 group-hover:text-white'
                )}>
                  {cat.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
