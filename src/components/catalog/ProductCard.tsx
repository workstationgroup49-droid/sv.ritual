'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import { Package } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onOpen:  (product: Product) => void
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer
                 bg-[#1e1e21] border border-white/[0.07]
                 hover:border-gold/25
                 shadow-[0_2px_12px_rgba(0,0,0,0.4)]
                 hover:shadow-[0_4px_24px_rgba(201,169,110,0.12)]
                 transition-all duration-400"
      onClick={() => onOpen(product)}
    >
      {/* Фото */}
      <div className="relative bg-[#141416]" style={{ paddingBottom: '100%' }}>
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 opacity-85
                       group-hover:opacity-100 group-hover:scale-[1.04]
                       transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={32} className="text-white/10" />
          </div>
        )}

        {!product.in_stock && (
          <div className="absolute top-2.5 left-2.5 z-10
                          bg-obsidian/85 backdrop-blur-sm
                          px-2 py-0.5 font-body text-[10px] text-mist/70 tracking-wider">
            Немає в наявності
          </div>
        )}

        {/* Оверлей при ховері */}
        <div className="absolute inset-0 bg-obsidian/50
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        flex items-center justify-center">
          <span className="font-body text-[11px] tracking-[0.25em] uppercase text-cream/90
                           border border-white/25 px-4 py-2
                           bg-obsidian/40 backdrop-blur-sm">
            Детальніше
          </span>
        </div>

        {/* Золота лінія знизу при ховері */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-transparent via-gold/50 to-transparent
                        scale-x-0 group-hover:scale-x-100
                        transition-transform duration-500" />
      </div>

      {/* Назва */}
      <div className="px-4 py-3 border-t border-white/[0.05]">
        <h3 className="font-display text-[15px] md:text-base text-cream/90 leading-snug
                       group-hover:text-gold transition-colors duration-300
                       line-clamp-2">
          {product.name}
        </h3>
      </div>
    </div>
  )
}
