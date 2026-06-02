'use client'

import { useState } from 'react'
import { Product, ProductCategory, ProductInsert, CATEGORY_LABELS } from '@/types/product'
import { ImageUploader } from './ImageUploader'

interface ProductFormProps {
  initial?:   Product | null
  onSubmit:   (data: Omit<ProductInsert, 'image_url'>, file?: File) => Promise<boolean>
  onCancel:   () => void
  isLoading?: boolean
}

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/40
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 transition-colors duration-300
`

export function ProductForm({ initial, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [name,        setName]        = useState(initial?.name        ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [price,       setPrice]       = useState(initial ? String(initial.price / 100) : '')
  const [category,    setCategory]    = useState<ProductCategory>(initial?.category ?? 'caskets')
  const [inStock,     setInStock]     = useState(initial?.in_stock    ?? true)
  const [imageFile,   setImageFile]   = useState<File | undefined>()
  const [error,       setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Введіть коректну ціну')
      return
    }

    const ok = await onSubmit(
      {
        name,
        description: description || null,
        price:       Math.round(priceNum * 100),
        category,
        in_stock:    inStock,
        sort_order:  initial?.sort_order ?? 0,
      },
      imageFile
    )

    if (!ok) setError('Помилка збереження. Спробуйте ще раз.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Назва *
        </label>
        <input
          value={name} onChange={e => setName(e.target.value)}
          required placeholder="Труна преміум «Дубова»"
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Опис
        </label>
        <textarea
          value={description} onChange={e => setDescription(e.target.value)}
          rows={3} placeholder="Короткий опис товару..."
          className={inputClass + ' resize-none'}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
            Ціна (грн) *
          </label>
          <input
            type="number" min="0" step="0.01"
            value={price} onChange={e => setPrice(e.target.value)}
            required placeholder="1500"
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
            Категорія *
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as ProductCategory)}
            className={inputClass + ' cursor-pointer'}
          >
            {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Фотографія
        </label>
        <ImageUploader
          currentUrl={initial?.image_url}
          onFileSelect={setImageFile}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox" id="inStock"
          checked={inStock} onChange={e => setInStock(e.target.checked)}
          className="w-4 h-4 accent-bordeaux cursor-pointer"
        />
        <label htmlFor="inStock" className="font-body text-sm text-mist cursor-pointer">
          В наявності
        </label>
      </div>

      {error && (
        <p className="font-body text-red-400 text-xs">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit" disabled={isLoading}
          className="flex-1 bg-bordeaux text-cream font-body text-xs tracking-widest
                     uppercase py-3 hover:bg-burgundy transition-colors duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Збереження...' : initial ? 'Зберегти' : 'Додати товар'}
        </button>
        <button
          type="button" onClick={onCancel}
          className="flex-1 border border-white/10 text-mist font-body text-xs
                     tracking-widest uppercase py-3 hover:text-cream hover:border-white/20
                     transition-colors duration-300"
        >
          Скасувати
        </button>
      </div>

    </form>
  )
}
