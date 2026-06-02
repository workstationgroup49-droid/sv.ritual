import { createClient } from './client'
import { Product, ProductInsert, ProductUpdate } from '@/types/product'

// Получить все товары
export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getProducts error:', error.message)
    return []
  }

  return data ?? []
}

// Получить один товар
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

// Добавить товар
export async function addProduct(product: ProductInsert): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error('addProduct error:', error.message)
    return null
  }

  return data
}

// Обновить товар
export async function updateProduct(
  id: string,
  updates: ProductUpdate
): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateProduct error:', error.message)
    return null
  }

  return data
}

// Удалить товар
export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('deleteProduct error:', error.message)
    return false
  }

  return true
}