'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { getProducts } from '@/services/supabase/products'

export function useProducts() {
  const [products,  setProducts]  = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Ошибка загрузки товаров'))
      .finally(() => setIsLoading(false))
  }, [])

  return { products, isLoading, error }
}