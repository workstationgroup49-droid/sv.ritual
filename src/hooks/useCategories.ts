'use client'

import { useState, useEffect } from 'react'
import { Category } from '@/types/category'
import { getCategories } from '@/services/supabase/categories'

// Синглтон-кэш чтобы не делать лишних запросов при навигации
let _cache: Category[] | null = null
let _promise: Promise<Category[]> | null = null

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(_cache ?? [])
  const [isLoading,  setIsLoading]  = useState(!_cache)

  useEffect(() => {
    if (_cache) { setCategories(_cache); setIsLoading(false); return }
    if (!_promise) { _promise = getCategories() }
    _promise.then(data => {
      _cache = data
      setCategories(data)
      setIsLoading(false)
    })
  }, [])

  const invalidate = () => { _cache = null; _promise = null }

  return { categories, isLoading, invalidate }
}
