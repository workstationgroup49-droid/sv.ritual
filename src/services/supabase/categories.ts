import { createClient } from './client'
import { Category, CategoryInsert } from '@/types/category'

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('getCategories error:', error.message)
    return []
  }
  return data ?? []
}

export async function addCategory(cat: CategoryInsert): Promise<Category | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .insert(cat)
    .select()
    .single()

  if (error) {
    console.error('addCategory error:', error.message)
    return null
  }
  return data
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('deleteCategory error:', error.message)
    return false
  }
  return true
}

export async function updateCategory(id: string, updates: Partial<CategoryInsert>): Promise<Category | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateCategory error:', error.message)
    return null
  }
  return data
}
