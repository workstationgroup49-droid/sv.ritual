export interface OrderFormData {
  name:    string
  phone:   string
  address: string
  comment: string
}

export interface OrderItem {
  id:       string
  name:     string
  price:    number
  quantity: number
}

export interface Order {
  customer: OrderFormData
  items:    OrderItem[]
  total:    number
}