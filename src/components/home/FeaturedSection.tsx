'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProductCard } from '@/components/catalog/ProductCard'
import { ProductModal } from '@/components/catalog/ProductModal'
import { getProducts } from '@/services/supabase/products'
import { Product } from '@/types/product'

export function FeaturedSection() {
  const [products,  setProducts]  = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selected,  setSelected]  = useState<Product | null>(null)

  useEffect(() => {
    getProducts().then(all => {
      const inStock = all.filter(p => p.in_stock)
      // Shuffle and take 8
      const shuffled = [...inStock].sort(() => Math.random() - 0.5)
      setProducts(shuffled.slice(0, 8))
      setIsLoading(false)
    })
  }, [])

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
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={() => setSelected(product)}
                />
              ))}
            </div>
          )}

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
