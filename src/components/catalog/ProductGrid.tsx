'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import { Package } from 'lucide-react'

interface ProductGridProps {
  products:  Product[]
  isLoading: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const [selected, setSelected] = useState<Product | null>(null)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-graphite border border-white/5 animate-pulse"
               style={{ paddingBottom: '120%' }} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Package size={40} className="text-mist/20 mx-auto mb-4" />
        <p className="font-display text-2xl text-mist/40 mb-2">Товари не знайдено</p>
        <p className="font-body text-mist/30 text-sm">Спробуйте змінити параметри пошуку</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOpen={setSelected}
          />
        ))}
      </div>

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
