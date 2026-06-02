import { createClient } from './client'

const BUCKET = 'product-images'

// Загрузить изображение, вернуть публичный URL
export async function uploadProductImage(file: File): Promise<string | null> {
  const supabase = createClient()

  // Уникальное имя файла
  const ext      = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('uploadProductImage error:', error.message)
    return null
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filename)

  return data.publicUrl
}

// Удалить изображение по URL
export async function deleteProductImage(url: string): Promise<void> {
  const supabase = createClient()

  // Извлекаем имя файла из URL
  const filename = url.split('/').pop()
  if (!filename) return

  await supabase.storage
    .from(BUCKET)
    .remove([filename])
}