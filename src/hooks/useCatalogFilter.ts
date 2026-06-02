'use client'

import { useState, useMemo } from 'react'
import { Product, ProductCategory } from '@/types/product'

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc'

export function useCatalogFilter(products: Product[]) {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')
  const [sort,     setSort]     = useState<SortOption>('default')
  const [inStock,  setInStock]  = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    // Поиск по названию
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    // Фильтр по категории
    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    // Только в наличии
    if (inStock) {
      result = result.filter(p => p.in_stock)
    }

    // Сортировка
    switch (sort) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price);          break
      case 'price_desc': result.sort((a, b) => b.price - a.price);          break
      case 'name_asc':   result.sort((a, b) => a.name.localeCompare(b.name)); break
    }

    return result
  }, [products, search, category, sort, inStock])

  return {
    search, setSearch,
    category, setCategory,
    sort, setSort,
    inStock, setInStock,
    filtered,
    total: filtered.length,
  }
}