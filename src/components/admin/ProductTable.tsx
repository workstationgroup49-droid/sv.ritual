'use client'

import Image from 'next/image'
import { Product, CATEGORY_LABELS } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import { Pencil, Trash2, Package } from 'lucide-react'

interface ProductTableProps {
  products: Product[]
  onEdit:   (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Package size={40} className="text-mist/30 mx-auto mb-4" />
        <p className="font-body text-mist text-sm">Товарів поки немає</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {['Фото', 'Назва', 'Категорія', 'Ціна', 'Наявність', ''].map(h => (
              <th key={h} className="font-body text-xs tracking-widest uppercase
                                     text-mist text-left px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr
              key={product.id}
              className="border-b border-white/5 hover:bg-white/2 transition-colors duration-200"
            >
              <td className="px-4 py-3">
                <div className="relative w-12 h-12 bg-ash overflow-hidden">
                  {product.image_url ? (
                    <Image
                      src={product.image_url} alt={product.name}
                      fill className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={16} className="text-mist/30" />
                    </div>
                  )}
                </div>
              </td>

              <td className="px-4 py-3">
                <p className="font-body text-sm text-cream">{product.name}</p>
                {product.description && (
                  <p className="font-body text-xs text-mist/60 mt-0.5 line-clamp-1">
                    {product.description}
                  </p>
                )}
              </td>

              <td className="px-4 py-3">
                <span className="font-body text-xs text-mist">
                  {CATEGORY_LABELS[product.category]}
                </span>
              </td>

              <td className="px-4 py-3">
                <span className="font-body text-sm text-gold">
                  {formatPrice(product.price)}
                </span>
              </td>

              <td className="px-4 py-3">
                <span className={`font-body text-xs px-2 py-1 ${
                  product.in_stock
                    ? 'bg-green-900/30 text-green-400'
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {product.in_stock ? 'Є' : 'Немає'}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-mist hover:text-gold transition-colors duration-200"
                    title="Редагувати"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="p-2 text-mist hover:text-red-400 transition-colors duration-200"
                    title="Видалити"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
