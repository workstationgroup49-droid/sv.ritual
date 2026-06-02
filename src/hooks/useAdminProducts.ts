'use client'

import { useState, useEffect, useCallback } from 'react'
import { Product, ProductInsert, ProductUpdate } from '@/types/product'
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '@/services/supabase/products'
import { uploadProductImage, deleteProductImage } from '@/services/supabase/storage'

export function useAdminProducts() {
  const [products, setProducts]   = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

const load = useCallback(async () => {
  setIsLoading(true)
  const data = await getProducts()
  setProducts(data)
  setIsLoading(false)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  load().catch(console.error)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const handleAdd = async (
    data: Omit<ProductInsert, 'image_url'>,
    imageFile?: File
  ) => {
    let image_url: string | null = null

    if (imageFile) {
      image_url = await uploadProductImage(imageFile)
      if (!image_url) {
        setError('Ошибка загрузки изображения')
        return false
      }
    }

    const result = await addProduct({ ...data, image_url })
    if (!result) {
      setError('Ошибка добавления товара')
      return false
    }

    await load()
    return true
  }

  const handleUpdate = async (
    id: string,
    data: ProductUpdate,
    imageFile?: File,
    oldImageUrl?: string | null
  ) => {
    let image_url = data.image_url

    if (imageFile) {
      if (oldImageUrl) await deleteProductImage(oldImageUrl)
      image_url = await uploadProductImage(imageFile)
      if (!image_url) {
        setError('Ошибка загрузки изображения')
        return false
      }
    }

    const result = await updateProduct(id, { ...data, image_url })
    if (!result) {
      setError('Ошибка обновления товара')
      return false
    }

    await load()
    return true
  }

  const handleDelete = async (id: string, imageUrl?: string | null) => {
    if (imageUrl) await deleteProductImage(imageUrl)
    const ok = await deleteProduct(id)
    if (!ok) {
      setError('Ошибка удаления товара')
      return false
    }
    await load()
    return true
  }

  return {
    products,
    isLoading,
    error,
    setError,
    handleAdd,
    handleUpdate,
    handleDelete,
    reload: load,
  }
}