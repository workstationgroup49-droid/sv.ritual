'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useCategories } from '@/hooks/useCategories'
import { formatPrice } from '@/lib/utils'
import { X, ShoppingCart, Check, ZoomIn, ArrowLeft, ClipboardList } from 'lucide-react'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const addItem        = useCartStore(s => s.addItem)
  const items          = useCartStore(s => s.items)
  const { categories } = useCategories()

  const [added,  setAdded]  = useState(false)
  const [shown,  setShown]  = useState(false) // кнопка "До замовлення"
  const [zoomed, setZoomed] = useState(false)

  const categoryLabel = product
    ? (categories.find(c => c.slug === product.category)?.label ?? product.category)
    : ''

  // Скидаємо стан при зміні товару
  useEffect(() => {
    setAdded(false)
    setShown(false)
    setZoomed(false)
  }, [product?.id])

  // Закриття на Escape
  useEffect(() => {
    if (!product) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false)
        else onClose()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [product, onClose, zoomed])

  // Блокуємо скрол body
  useEffect(() => {
    if (product) document.body.style.overflow = 'hidden'
    else         document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [product])

  const handleAdd = () => {
    if (!product) return
    addItem(product)
    setAdded(true)
    setShown(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return null

  const alreadyInCart = items.some(i => i.id === product.id)
  void alreadyInCart

  return (
    <>
      {/* Затемнення */}
      <div
        className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Модальне вікно */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-3xl max-h-[90vh] bg-graphite border border-white/10
                     shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Кнопка закриття */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                       text-mist hover:text-cream bg-obsidian/60 hover:bg-obsidian
                       transition-colors duration-200"
          >
            <X size={16} />
          </button>

          {/* Ліва частина — фото */}
          <div className="relative w-full md:w-1/2 bg-obsidian shrink-0"
               style={{ minHeight: '300px' }}>
            {product.image_url ? (
              <>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
                <button
                  onClick={() => setZoomed(true)}
                  className="absolute bottom-4 right-4 flex items-center gap-1.5
                             bg-obsidian/70 hover:bg-obsidian border border-white/10
                             text-mist hover:text-gold px-3 py-2 font-body text-xs
                             tracking-wider transition-all duration-200"
                >
                  <ZoomIn size={13} />
                  Збільшити
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-mist/20">
                Фото відсутнє
              </div>
            )}
          </div>

          {/* Права частина — інфо */}
          <div className="flex flex-col flex-1 p-7 overflow-y-auto">

            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">
              {categoryLabel}
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-light text-cream leading-snug mb-4">
              {product.name}
            </h2>

            <div className="h-px bg-gradient-to-r from-gold/30 to-transparent mb-5" />

            {product.description && (
              <p className="font-body text-sm text-mist leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-2 mb-6">
              <span className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500/60'}`} />
              <span className="font-body text-xs text-mist tracking-wider">
                {product.in_stock ? 'В наявності' : 'Немає в наявності'}
              </span>
            </div>

            <p className="font-display text-3xl text-gold mb-8">
              {formatPrice(product.price)}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              {/* Кнопка У кошик */}
              <button
                onClick={handleAdd}
                disabled={!product.in_stock}
                className="flex items-center justify-center gap-2 w-full py-3
                           font-body text-xs tracking-widest uppercase
                           transition-all duration-300
                           disabled:opacity-40 disabled:cursor-not-allowed
                           bg-bordeaux hover:bg-burgundy text-cream"
              >
                {added ? (
                  <><Check size={14} /> Додано до кошика</>
                ) : (
                  <><ShoppingCart size={14} /> У кошик</>
                )}
              </button>

              {/* Кнопка До замовлення — з'являється після додавання */}
              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 w-full py-3
                           font-body text-xs tracking-widest uppercase
                           border border-gold/40 text-gold
                           hover:bg-gold/10 hover:border-gold
                           transition-all duration-500"
                style={{
                  opacity:    shown ? 1 : 0,
                  transform:  shown ? 'translateY(0)' : 'translateY(8px)',
                  pointerEvents: shown ? 'auto' : 'none',
                }}
              >
                <ClipboardList size={14} />
                До замовлення
              </Link>

              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3
                           font-body text-xs tracking-widest uppercase
                           border border-white/10 text-mist
                           hover:text-cream hover:border-white/20
                           transition-all duration-300"
              >
                <ArrowLeft size={13} />
                Повернутись до каталогу
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Повноекранний зум */}
      {zoomed && product.image_url && (
        <div
          className="fixed inset-0 z-[60] bg-obsidian/98 flex items-center justify-center cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center
                       text-mist hover:text-cream bg-white/5 hover:bg-white/10
                       transition-colors duration-200"
          >
            <X size={18} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs
                        text-mist/40 tracking-wider">
            Натисніть щоб закрити
          </p>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] m-8">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
