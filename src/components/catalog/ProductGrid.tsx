'use client'

'use client'

import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { Package } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

interface ProductGridProps {
  products:  Product[]
  isLoading: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const ref = useReveal()

  if (isLoading) {
    return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((product, i) => (
    <div key={product.id} className={`reveal reveal-delay-${Math.min(i % 3 + 1, 4)}`}>
      <ProductCard product={product} />
    </div>
  ))}
      </div> </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
