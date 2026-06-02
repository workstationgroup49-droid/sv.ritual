'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useCategories } from '@/hooks/useCategories'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Package, Check } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  product:  Product
  onOpen:   (product: Product) => void
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem)
  const items   = useCartStore(s => s.items)
  const { categories } = useCategories()
  const [added, setAdded] = useState(false)

  const inCart = items.some(i => i.id === product.id)
  void inCart

  const categoryLabel = categories.find(c => c.slug === product.category)?.label ?? product.category

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="group bg-graphite border border-white/5 overflow-hidden
                    hover:border-gold/20 transition-all duration-500 flex flex-col">

      {/* Фото — клікабельне */}
      <div
        className="relative bg-obsidian overflow-hidden shrink-0 cursor-zoom-in"
        style={{ paddingBottom: '75%' }}
        onClick={() => onOpen(product)}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-3 opacity-90 group-hover:opacity-100
                       group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={40} className="text-mist/20" />
          </div>
        )}

        {!product.in_stock && (
          <div className="absolute top-3 left-3 bg-obsidian/80 backdrop-blur-sm
                          px-2 py-1 font-body text-xs text-mist z-10">
            Немає в наявності
          </div>
        )}

        {/* Підказка при ховері */}
        <div className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-obsidian/70 text-gold font-body text-xs tracking-widest
                           uppercase px-4 py-2 border border-gold/30">
            Переглянути
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12
                        bg-gradient-to-t from-graphite/60 to-transparent" />
      </div>

      {/* Контент */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-body text-xs text-gold/60 tracking-wider uppercase mb-1">
          {categoryLabel}
        </p>
        <h3
          className="font-display text-lg text-cream mb-2 leading-snug
                     group-hover:text-gold transition-colors duration-300 cursor-pointer"
          onClick={() => onOpen(product)}
        >
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-mist text-xs leading-relaxed line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
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
