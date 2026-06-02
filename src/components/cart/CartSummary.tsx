'use client'

import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { Divider } from '@/components/ui/Divider'

export function CartSummary() {
  const items      = useCartStore(s => s.items)
  const totalPrice = useCartStore(s => s.totalPrice())
  const totalItems = useCartStore(s => s.totalItems())

  return (
    <div className="bg-graphite border border-white/5 p-6">
      <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">
        Разом
      </p>

      <div className="space-y-3 mb-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between">
            <span className="font-body text-sm text-mist truncate mr-4">
              {item.name} × {item.quantity}
            </span>
            <span className="font-body text-sm text-cream shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      <div className="flex justify-between items-center mt-4">
        <span className="font-body text-sm text-mist">
          Товарів: {totalItems}
        </span>
        <span className="font-display text-2xl text-gold">
          {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  )
}
