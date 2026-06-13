'use client'

import { useState } from 'react'
import { useCategories } from '@/hooks/useCategories'
import { cn } from '@/lib/utils'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc'

interface FilterPanelProps {
  category:   string
  sort:       SortOption
  inStock:    boolean
  onCategory: (c: string) => void
  onSort:     (s: SortOption) => void
  onInStock:  (v: boolean) => void
  total:      number
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default',    label: 'За замовчуванням' },
  { value: 'price_asc',  label: 'Ціна: зростання' },
  { value: 'price_desc', label: 'Ціна: спадання' },
  { value: 'name_asc',   label: 'За назвою' },
]

export function FilterPanel({
  category, sort, inStock,
  onCategory, onSort, onInStock,
  total,
}: FilterPanelProps) {
  const { categories, isLoading } = useCategories()
  const [catOpen, setCatOpen] = useState(true)
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <div className="bg-[#1a1a1d] border border-white/[0.08]">

      {/* Заголовок сайдбару */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]">
        <SlidersHorizontal size={14} className="text-gold/70" />
        <span className="font-body text-xs tracking-[0.3em] uppercase text-gold/80">Фільтри</span>
        <span className="ml-auto font-body text-[11px] text-mist/50">
          {total} товарів
        </span>
      </div>

      {/* Категорії — акордеон */}
      <div className="border-b border-white/[0.06]">
        <button
          onClick={() => setCatOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5
                     hover:bg-white/[0.03] transition-colors duration-200"
        >
          <span className="font-body text-xs tracking-[0.25em] uppercase text-mist/70">
            Категорія
          </span>
          <ChevronDown
            size={13}
            className={cn('text-mist/40 transition-transform duration-200', catOpen && 'rotate-180')}
          />
        </button>

        <div className={cn(
          'overflow-hidden transition-all duration-300',
          catOpen ? 'max-h-[1400px] opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="px-3 pb-4 space-y-0.5">

            {/* Всі товари */}
            <button
              onClick={() => onCategory('all')}
              className={cn(
                'w-full text-left flex items-center gap-3 px-3 py-2.5',
                'font-body text-sm transition-all duration-200 rounded-sm',
                category === 'all'
                  ? 'text-cream bg-white/[0.06] border-l-2 border-gold pl-[10px]'
                  : 'text-mist/70 hover:text-cream border-l-2 border-transparent hover:bg-white/[0.03]'
              )}
            >
              <span className={cn(
                'w-1.5 h-1.5 rounded-full shrink-0',
                category === 'all' ? 'bg-gold' : 'bg-white/20'
              )} />
              Всі товари
            </button>

            {isLoading ? (
              <div className="px-3 py-3 flex items-center gap-2 text-mist/30">
                <div className="w-3 h-3 border border-mist/20 border-t-gold/40 rounded-full animate-spin" />
                <span className="font-body text-xs">Завантаження...</span>
              </div>
            ) : (
              categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onCategory(cat.slug)}
                  className={cn(
                    'w-full text-left flex items-center gap-3 px-3 py-2',
                    'font-body text-sm transition-all duration-200',
                    category === cat.slug
                      ? 'text-cream bg-white/[0.06] border-l-2 border-gold pl-[10px]'
                      : 'text-mist/60 hover:text-cream border-l-2 border-transparent hover:bg-white/[0.03]'
                  )}
                >
                  <span className={cn(
                    'w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200',
                    category === cat.slug ? 'bg-gold' : 'bg-white/15'
                  )} />
                  {cat.label}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Сортування — акордеон */}
      <div className="border-b border-white/[0.06]">
        <button
          onClick={() => setSortOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5
                     hover:bg-white/[0.03] transition-colors duration-200"
        >
          <span className="font-body text-xs tracking-[0.25em] uppercase text-mist/70">
            Сортування
          </span>
          <ChevronDown
            size={13}
            className={cn('text-mist/40 transition-transform duration-200', sortOpen && 'rotate-180')}
          />
        </button>

        <div className={cn(
          'overflow-hidden transition-all duration-300',
          sortOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="px-3 pb-3 space-y-0.5">
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => onSort(opt.value)}
                className={cn(
                  'w-full text-left flex items-center gap-3 px-3 py-2',
                  'font-body text-sm transition-all duration-200',
                  sort === opt.value
                    ? 'text-gold bg-white/[0.04]'
                    : 'text-mist/60 hover:text-cream hover:bg-white/[0.03]'
                )}
              >
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full shrink-0',
                  sort === opt.value ? 'bg-gold' : 'bg-white/15'
                )} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Наявність — кастомний чекбокс */}
      <div className="px-5 py-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => onInStock(!inStock)}
            className={cn(
              'w-4 h-4 border flex items-center justify-center shrink-0',
              'transition-all duration-200',
              inStock
                ? 'bg-bordeaux border-bordeaux'
                : 'bg-transparent border-white/20 group-hover:border-white/40'
            )}
          >
            {inStock && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <span className={cn(
            'font-body text-sm transition-colors duration-200',
            inStock ? 'text-cream' : 'text-mist/60 group-hover:text-mist'
          )}>
            Тільки в наявності
          </span>
        </label>
      </div>

    </div>
  )
}
