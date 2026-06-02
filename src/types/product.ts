export type ProductCategory =
  | 'caskets'
  | 'wreaths'
  | 'accessories'
  | 'flowers'
  | 'monuments'
  |  'forone'

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  caskets:     'Труни',
  wreaths:     'Вінки',
  accessories: 'Аксесуари',
  flowers:     'Квіти',
  forone: 'Для однієї особи',
  monuments:   'Пам\'ятники',
  }

export interface Product {
  id:          string
  name:        string
  description: string | null
  price:       number
  category:    ProductCategory
  image_url:   string | null
  in_stock:    boolean
  sort_order:  number
  created_at:  string
  updated_at:  string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>
export type ProductUpdate = Partial<ProductInsert>
