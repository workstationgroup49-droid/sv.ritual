'use client'

import Image from 'next/image'
import { CartItem as CartItemType } from '@/types/cart'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { Minus, Plus, Trash2, Package } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCartStore()

  return (
    <div className="flex gap-4 py-5 border-b border-white/5 group">

      <div className="relative w-20 h-20 bg-ash shrink-0 overflow-hidden">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={24} className="text-mist/20" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg text-cream leading-snug mb-1 truncate">
          {item.name}
        </h3>
        <p className="font-body text-xs text-mist/60 mb-3">
          {formatPrice(item.price)} за штуку
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQty(item.id, item.quantity - 1)}
            className="w-7 h-7 border border-white/10 flex items-center justify-center
                       text-mist hover:text-cream hover:border-white/30
                       transition-colors duration-200"
          >
            <Minus size={12} />
          </button>
          <span className="font-body text-sm text-cream w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="w-7 h-7 border border-white/10 flex items-center justify-center
                       text-mist hover:text-cream hover:border-white/30
                       transition-colors duration-200"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => removeItem(item.id)}
          className="text-mist/30 hover:text-red-400 transition-colors duration-200"
        >
          <Trash2 size={15} />
        </button>
        <span className="font-display text-lg text-gold">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>

    </div>
  )
}
