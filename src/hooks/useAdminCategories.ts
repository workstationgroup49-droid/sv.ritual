'use client'

import { useState, useEffect, useCallback } from 'react'
import { Category } from '@/types/category'
import { getCategories, addCategory, deleteCategory, updateCategory } from '@/services/supabase/categories'

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading,  setIsLoading]  = useState(true)
  const [error,      setError]      = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    const data = await getCategories()
    setCategories(data)
    setIsLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleAdd = async (slug: string, label: string): Promise<boolean> => {
    setError(null)
    const sortOrder = categories.length > 0
      ? Math.max(...categories.map(c => c.sort_order)) + 1
      : 0
    const result = await addCategory({ slug, label, sort_order: sortOrder })
    if (!result) { setError('Помилка при додаванні категорії'); return false }
    setCategories(prev => [...prev, result])
    return true
  }

  const handleDelete = async (id: string): Promise<void> => {
    const ok = await deleteCategory(id)
    if (!ok) { setError('Помилка при видаленні категорії'); return }
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  const handleUpdate = async (id: string, slug: string, label: string): Promise<boolean> => {
    const result = await updateCategory(id, { slug, label })
    if (!result) { setError('Помилка при оновленні'); return false }
    setCategories(prev => prev.map(c => c.id === id ? result : c))
    return true
  }

  return { categories, isLoading, error, setError, handleAdd, handleDelete, handleUpdate, reload: load }
}
