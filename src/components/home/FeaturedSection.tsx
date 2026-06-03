'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useCategories } from '@/hooks/useCategories'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { getProducts } from '@/services/supabase/products'
import { Product } from '@/types/product'
import { ShoppingCart, Check, ArrowRight, Package } from 'lucide-react'
import { ProductModal } from '@/components/catalog/ProductModal'

export function FeaturedSection() {
  const [products,  setProducts]  = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selected,  setSelected]  = useState<Product | null>(null)
  const { categories } = useCategories()
  const router = useRouter()

  useEffect(() => {
    getProducts().then(all => {
      // Беремо по 2 товари з кожної категорії — рівномірно, максимум 8
      const counts: Record<string, number> = {}
      const featured: Product[] = []
      for (const p of all) {
        if (!p.in_stock) continue
        const c = counts[p.category] ?? 0
        if (c < 2) {
          counts[p.category] = c + 1
          featured.push(p)
          if (featured.length >= 8) break
        }
      }
      setProducts(featured)
      setIsLoading(false)
    })
  }, [])

  const getCategoryLabel = (slug: string) =>
    categories.find(c => c.slug === slug)?.label ?? slug

  if (!isLoading && products.length === 0) return null

  return (
    <>
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">

          <SectionTitle
            eyebrow="Наші вироби"
            title="Популярні товари"
            subtitle="Широкий вибір пам'ятників з натурального граніту власного виробництва"
          />

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-graphite border border-white/5 animate-pulse aspect-square" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {products.map(product => (
                <FeaturedCard
                  key={product.id}
                  product={product}
                  categoryLabel={getCategoryLabel(product.category)}
                  onOpen={() => setSelected(product)}
                />
              ))}
            </div>
          )}

          {/* Кнопка до каталогу */}
          <div className="flex justify-center">
            <Link
              href="/catalog"
              className="group flex items-center gap-3 border border-gold/30 text-gold
                         font-body text-xs tracking-[0.3em] uppercase px-10 py-4
                         hover:bg-gold/5 hover:border-gold transition-all duration-300"
            >
              Переглянути весь каталог
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}

// ——— Картка товару для головної ———
function FeaturedCard({
  product,
  categoryLabel,
  onOpen,
}: {
  product:       Product
  categoryLabel: string
  onOpen:        () => void
}) {
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className="group relative bg-graphite border border-white/5 overflow-hidden
                 hover:border-gold/20 transition-all duration-500 cursor-pointer"
      onClick={onOpen}
    >
      {/* Фото */}
      <div className="relative bg-obsidian" style={{ paddingBottom: '100%' }}>
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain p-3 opacity-90
                       group-hover:opacity-100 group-hover:scale-105
                       transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={32} className="text-mist/20" />
          </div>
        )}

        {/* Оверлей при ховері */}
        <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center">
          <span className="font-body text-xs tracking-widest uppercase text-cream
                           border border-white/30 px-3 py-1.5">
            Детальніше
          </span>
        </div>
      </div>

      {/* Інфо */}
      <div className="p-3">
        <p className="font-body text-[10px] text-gold/50 tracking-wider uppercase truncate mb-0.5">
          {categoryLabel}
        </p>
        <p className="font-display text-sm text-cream truncate group-hover:text-gold
                      transition-colors duration-300 mb-2">
          {product.name}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-display text-base text-gold">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAdd}
            className="w-7 h-7 flex items-center justify-center
                       bg-bordeaux/20 border border-bordeaux/30 text-cream
                       hover:bg-bordeaux hover:border-bordeaux
                       transition-all duration-300"
            title="У кошик"
          >
            {added ? <Check size={11} /> : <ShoppingCart size={11} />}
          </button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-bordeaux/40 to-transparent
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}
