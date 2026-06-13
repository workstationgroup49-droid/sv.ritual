'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'
import { useCategories } from '@/hooks/useCategories'
import { formatPrice } from '@/lib/utils'
import { X, ShoppingCart, Check, ArrowLeft, ClipboardList, ZoomIn } from 'lucide-react'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const MAGNIFIER_SIZE = 140
const ZOOM_LEVEL     = 2.8

export function ProductModal({ product, onClose }: ProductModalProps) {
  const addItem        = useCartStore(s => s.addItem)
  const items          = useCartStore(s => s.items)
  const { categories } = useCategories()

  const [added,   setAdded]   = useState(false)
  const [shown,   setShown]   = useState(false)
  const [zoomed,  setZoomed]  = useState(false)
  const [magPos,  setMagPos]  = useState({ x: 0, y: 0, show: false })

  const imgContainerRef = useRef<HTMLDivElement>(null)

  const categoryLabel = product
    ? (categories.find(c => c.slug === product.category)?.label ?? product.category)
    : ''

  useEffect(() => {
    setAdded(false)
    setShown(false)
    setZoomed(false)
    setMagPos({ x: 0, y: 0, show: false })
  }, [product?.id])

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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgContainerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setMagPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMagPos(prev => ({ ...prev, show: false }))
  }, [])

  if (!product) return null

  const half     = MAGNIFIER_SIZE / 2
  const cW       = imgContainerRef.current?.clientWidth  ?? 400
  const cH       = imgContainerRef.current?.clientHeight ?? 400
  const magBgW   = cW * ZOOM_LEVEL
  const magBgH   = cH * ZOOM_LEVEL
  const magBgX   = -(magPos.x * ZOOM_LEVEL - half)
  const magBgY   = -(magPos.y * ZOOM_LEVEL - half)

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
          className="relative w-full max-w-3xl max-h-[90vh] bg-graphite border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Закрити */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-mist hover:text-cream bg-obsidian/60 hover:bg-obsidian transition-colors duration-200"
          >
            <X size={16} />
          </button>

          {/* == Ліва частина: фото + лупа == */}
          <div
            ref={imgContainerRef}
            className="relative w-full md:w-1/2 bg-obsidian shrink-0 cursor-zoom-in select-none"
            style={{ aspectRatio: '1 / 1' }}
            onMouseMove={product.image_url ? handleMouseMove : undefined}
            onMouseLeave={product.image_url ? handleMouseLeave : undefined}
            onClick={product.image_url ? () => setZoomed(true) : undefined}
          >
            {product.image_url ? (
              <>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6 pointer-events-none"
                  priority
                />

                {/* Підказка */}
                {!magPos.show && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-obsidian/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 pointer-events-none">
                    <ZoomIn size={12} className="text-gold" />
                    <span className="font-body text-[10px] tracking-wider text-mist">Натисніть для збільшення</span>
                  </div>
                )}

                {/* Лупа */}
                {magPos.show && (
                  <div
                    className="absolute pointer-events-none z-20 rounded-full border-2 border-gold/70 shadow-[0_0_0_1px_rgba(0,0,0,0.9),0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden"
                    style={{
                      width:              MAGNIFIER_SIZE,
                      height:             MAGNIFIER_SIZE,
                      left:               magPos.x - half,
                      top:                magPos.y - half,
                      backgroundImage:    `url(${product.image_url})`,
                      backgroundRepeat:   'no-repeat',
                      backgroundSize:     `${magBgW}px ${magBgH}px`,
                      backgroundPosition: `${magBgX}px ${magBgY}px`,
                    }}
                  />
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-mist/20">
                Фото відсутнє
              </div>
            )}
          </div>

          {/* == Права частина: інфо == */}
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
              <span className="font-body text-sm text-mist/60 mr-1">від</span>{formatPrice(product.price)}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={handleAdd}
                disabled={!product.in_stock}
                className="flex items-center justify-center gap-2 w-full py-3 font-body text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-bordeaux hover:bg-burgundy text-cream"
              >
                {added
                  ? <><Check size={14} /> Додано до кошика</>
                  : <><ShoppingCart size={14} /> У кошик</>
                }
              </button>

              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 w-full py-3 font-body text-xs tracking-widest uppercase border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-500"
                style={{ opacity: shown ? 1 : 0, pointerEvents: shown ? 'auto' : 'none' }}
              >
                <ClipboardList size={14} />
                До замовлення
              </Link>

              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 font-body text-xs tracking-widest uppercase border border-white/10 text-mist hover:text-cream hover:border-white/20 transition-all duration-300"
              >
                <ArrowLeft size={13} />
                Повернутись до каталогу
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* == Повноекранний zoom == */}
      {zoomed && product.image_url && (
        <div
          className="fixed inset-0 z-[60] bg-obsidian/98 flex items-center justify-center cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-mist hover:text-cream bg-white/5 hover:bg-white/10 transition-colors duration-200 z-10"
          >
            <X size={18} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-mist/40 tracking-wider select-none">
            Натисніть щоб закрити
          </p>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] m-8"
            onClick={e => e.stopPropagation()}
          >
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
