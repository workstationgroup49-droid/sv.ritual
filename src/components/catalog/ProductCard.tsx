'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Package, Check } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem)
  const items   = useCartStore(s => s.items)
  const [added, setAdded] = useState(false)

  const inCart = items.some(i => i.id === product.id)
  void inCart

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="group bg-graphite border border-white/5 overflow-hidden
                    hover:border-gold/20 transition-all duration-500">

      <div className="relative h-52 overflow-hidden bg-ash">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover opacity-80 group-hover:opacity-100
                       group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-mist/20" />
          </div>
        )}

        {!product.in_stock && (
          <div className="absolute top-3 left-3 bg-obsidian/80 backdrop-blur-sm
                          px-2 py-1 font-body text-xs text-mist">
            Немає в наявності
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent" />
      </div>

      <div className="p-5">
        <p className="font-body text-xs text-mist/60 tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg text-cream mb-2 leading-snug
                       group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-mist text-xs leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-xl text-gold">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAdd}
            disabled={!product.in_stock}
            className="flex items-center gap-2 px-4 py-2 font-body text-xs
                       tracking-widest uppercase transition-all duration-300
                       disabled:opacity-40 disabled:cursor-not-allowed
                       bg-bordeaux/20 border border-bordeaux/40 text-cream
                       hover:bg-bordeaux hover:border-bordeaux"
          >
            {added ? (
              <><Check size={13} /> Додано</>
            ) : (
              <><ShoppingCart size={13} /> У кошик</>
            )}
          </button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-bordeaux/50 to-transparent
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}
