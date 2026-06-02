// category теперь просто строка-slug из таблицы categories
export type ProductCategory = string

export interface Product {
  id:          string
  name:        string
  description: string | null
  price:       number
  category:    string
  image_url:   string | null
  in_stock:    boolean
  sort_order:  number
  created_at:  string
  updated_at:  string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>
export type ProductUpdate = Partial<ProductInsert>
