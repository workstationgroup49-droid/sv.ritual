'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types/product'

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc'

export function useCatalogFilter(products: Product[]) {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState<string>('all')
  const [sort,     setSort]     = useState<SortOption>('default')
  const [inStock,  setInStock]  = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    if (inStock) {
      result = result.filter(p => p.in_stock)
    }

    switch (sort) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price);           break
      case 'price_desc': result.sort((a, b) => b.price - a.price);           break
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
