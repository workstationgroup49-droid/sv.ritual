export interface Category {
  id:         string
  slug:       string
  label:      string
  sort_order: number
  created_at: string
}

export type CategoryInsert = Omit<Category, 'id' | 'created_at'>
