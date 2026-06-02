'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { OrderForm } from '@/components/cart/OrderForm'
import { ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const items = useCartStore(s => s.items)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-obsidian pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="pt-10 mb-10">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">
              Ваш вибір
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-cream">
              Кошик
            </h1>
          </div>

          {items.length === 0 ? (

            <div className="text-center py-20">
              <ShoppingCart size={48} className="text-mist/20 mx-auto mb-6" />
              <p className="font-display text-2xl text-mist/40 mb-3">
                Кошик порожній
              </p>
              <p className="font-body text-mist/30 text-sm mb-8">
                Додайте товари з каталогу
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-bordeaux text-cream font-body text-xs
                           tracking-widest uppercase px-8 py-3
                           hover:bg-burgundy transition-colors duration-300"
              >
                Перейти до каталогу
              </Link>
            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              <div className="lg:col-span-2">
                <div className="bg-graphite border border-white/5 px-6">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <CartSummary />
                <OrderForm />
              </div>

            </div>

          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
