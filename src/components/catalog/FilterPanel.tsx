'use client'

import { ProductCategory, CATEGORY_LABELS } from '@/types/product'
import { cn } from '@/lib/utils'

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc'

interface FilterPanelProps {
  category:   ProductCategory | 'all'
  sort:       SortOption
  inStock:    boolean
  onCategory: (c: ProductCategory | 'all') => void
  onSort:     (s: SortOption) => void
  onInStock:  (v: boolean) => void
  total:      number
}

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all',         label: 'Всі товари' },
  { value: 'caskets',     label: CATEGORY_LABELS.caskets },
  { value: 'wreaths',     label: CATEGORY_LABELS.wreaths },
  { value: 'accessories', label: CATEGORY_LABELS.accessories },
  { value: 'flowers',     label: CATEGORY_LABELS.flowers },
  { value: 'monuments',   label: CATEGORY_LABELS.monuments },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default',    label: 'За замовчуванням' },
  { value: 'price_asc',  label: 'Ціна: за зростанням' },
  { value: 'price_desc', label: 'Ціна: за спаданням' },
  { value: 'name_asc',   label: 'За назвою' },
]

export function FilterPanel({
  category, sort, inStock,
  onCategory, onSort, onInStock,
  total,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">

      <p className="font-body text-mist text-xs tracking-wider">
        Знайдено: <span className="text-gold">{total}</span> товарів
      </p>

      <div>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Категорія
        </p>
        <ul className="space-y-1">
          {categories.map(cat => (
            <li key={cat.value}>
              <button
                onClick={() => onCategory(cat.value)}
                className={cn(
                  'w-full text-left font-body text-sm px-3 py-2 transition-colors duration-200',
                  category === cat.value
                    ? 'text-cream bg-white/5 border-l-2 border-gold'
                    : 'text-mist hover:text-cream border-l-2 border-transparent'
                )}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Сортування
        </p>
        <select
          value={sort}
          onChange={e => onSort(e.target.value as SortOption)}
          className="w-full bg-graphite border border-white/10 text-cream
                     font-body text-sm px-3 py-2 outline-none
                     focus:border-gold/40 transition-colors duration-300 cursor-pointer"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox" id="inStock"
          checked={inStock}
          onChange={e => onInStock(e.target.checked)}
          className="w-4 h-4 accent-bordeaux cursor-pointer"
        />
        <label htmlFor="inStock" className="font-body text-sm text-mist cursor-pointer">
          Тільки в наявності
        </label>
      </div>

    </div>
  )
}
