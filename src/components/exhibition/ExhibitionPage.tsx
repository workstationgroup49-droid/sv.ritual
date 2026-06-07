'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingCart, Check } from 'lucide-react'
import { getProducts } from '@/services/supabase/products'
import { useCartStore } from '@/store/cartStore'
import { useCategories } from '@/hooks/useCategories'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types/product'
import { ProductModal } from '@/components/catalog/ProductModal'

const VIDEO_ID = 'z5YCjLTXUro'

export function ExhibitionPage() {
  const [products,  setProducts]  = useState<Product[]>([])
  const [selected,  setSelected]  = useState<Product | null>(null)
  const [zoomed,    setZoomed]    = useState<string | null>(null)
  const [zoomIndex, setZoomIndex] = useState(0)
  const { categories } = useCategories()

  useEffect(() => {
    getProducts().then(all => {
      // Беремо перші 20 товарів що мають фото
      const withPhoto = all.filter(p => p.image_url).slice(0, 20)
      setProducts(withPhoto)
    })
  }, [])

  const getCategoryLabel = (slug: string) =>
    categories.find(c => c.slug === slug)?.label ?? slug

  const openZoom = (url: string, index: number) => {
    setZoomed(url)
    setZoomIndex(index)
  }

  const photoUrls = products.map(p => p.image_url!)

  const prev = () => {
    const i = (zoomIndex - 1 + photoUrls.length) % photoUrls.length
    setZoomIndex(i); setZoomed(photoUrls[i])
  }
  const next = () => {
    const i = (zoomIndex + 1) % photoUrls.length
    setZoomIndex(i); setZoomed(photoUrls[i])
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">
            Живий погляд
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
            Наша виставка
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Запрошуємо на відеоогляд нашої виставкової зали. Тут можна побачити пам&apos;ятники
            наживо, відчути якість матеріалу та обрати готову модель або замовити індивідуальний проект.
          </p>
        </div>
      </section>

      {/* Відео — автостарт з mute */}
      <section className="bg-obsidian pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">Відеоогляд</p>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-light">
              Прогулянка по виставці
            </h2>
          </div>

          <div className="relative w-full border border-white/10" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&rel=0&modestbranding=1`}
              title="Огляд виставки"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Фото виставки — товари з каталогу */}
      <section className="py-16 bg-graphite">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-3">Фотогалерея</p>
            <h2 className="font-display text-3xl md:text-4xl text-cream font-light mb-4">
              Пам&apos;ятники на виставці
            </h2>
            <p className="font-body text-mist text-sm max-w-xl mx-auto">
              Реальні вироби з нашої виставкової зали. Натисніть на фото щоб переглянути деталі або додати до замовлення.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <ExhibitionCard
                key={product.id}
                product={product}
                categoryLabel={getCategoryLabel(product.category)}
                onOpen={() => setSelected(product)}
                onZoom={() => openZoom(product.image_url!, i)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/catalog"
              className="group flex items-center gap-3 border border-gold/30 text-gold
                         font-body text-xs tracking-[0.3em] uppercase px-10 py-4
                         hover:bg-gold/5 hover:border-gold transition-all duration-300"
            >
              Переглянути весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Модалка товару */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />

      {/* Lightbox фото */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/97 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setZoomed(null)}
        >
          <button onClick={() => setZoomed(null)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center
                       bg-white/5 hover:bg-white/10 text-mist hover:text-cream z-10">
            <X size={18} />
          </button>
          {photoUrls.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                           bg-white/5 hover:bg-white/10 text-mist hover:text-gold font-body text-2xl z-10">
                ‹
              </button>
              <button onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                           bg-white/5 hover:bg-white/10 text-mist hover:text-gold font-body text-2xl z-10">
                ›
              </button>
            </>
          )}
          <div className="relative w-full h-full max-w-4xl max-h-[85vh] m-16"
               onClick={e => e.stopPropagation()}>
            <Image src={zoomed} alt="Пам'ятник" fill sizes="100vw" className="object-contain" priority />
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-mist/30 tracking-wider">
            {zoomIndex + 1} / {photoUrls.length}
          </p>
        </div>
      )}
    </>
  )
}

// Картка виставки
function ExhibitionCard({ product, categoryLabel, onOpen, onZoom }: {
  product: Product
  categoryLabel: string
  onOpen: () => void
  onZoom: () => void
}) {
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="group bg-ash border border-white/5 overflow-hidden
                    hover:border-gold/20 transition-all duration-500 flex flex-col">
      <div
        className="relative bg-obsidian shrink-0 cursor-zoom-in"
        style={{ paddingBottom: '100%' }}
        onClick={onZoom}
      >
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 opacity-90 group-hover:opacity-100
                       group-hover:scale-105 transition-all duration-700"
          />
        )}
        <div className="absolute inset-0 bg-obsidian/20 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center">
          <span className="font-body text-xs tracking-widest uppercase text-cream
                           border border-white/30 px-3 py-1.5">Збільшити</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="font-body text-[10px] text-gold/50 tracking-wider uppercase truncate mb-0.5">
          {categoryLabel}
        </p>
        <p className="font-display text-sm text-cream truncate group-hover:text-gold
                      transition-colors duration-300 mb-3 cursor-pointer"
           onClick={onOpen}>
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-base text-gold">{formatPrice(product.price)}</span>
          <button onClick={handleAdd}
            className="w-7 h-7 flex items-center justify-center
                       bg-bordeaux/20 border border-bordeaux/30 text-cream
                       hover:bg-bordeaux transition-all duration-300">
            {added ? <Check size={11} /> : <ShoppingCart size={11} />}
          </button>
        </div>
      </div>
    </div>
  )
}
