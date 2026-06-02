'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useCartStore } from '@/store/cartStore'
import { OrderFormData } from '@/types/order'

const initialState: OrderFormData = {
  name:    '',
  phone:   '',
  address: '',
  comment: '',
}

export function useOrderForm() {
  const [formData,    setFormData]    = useState<OrderFormData>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted,  setIsSubmitted]  = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  const items      = useCartStore(s => s.items)
  const totalPrice = useCartStore(s => s.totalPrice())
  const clearCart  = useCartStore(s => s.clearCart)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map(i => ({
            id:       i.id,
            name:     i.name,
            price:    i.price,
            quantity: i.quantity,
          })),
          total: totalPrice,
        }),
      })

      if (!res.ok) {
        throw new Error('Ошибка отправки заказа')
      }

      clearCart()
      setIsSubmitted(true)
      setFormData(initialState)

    } catch {
      setError('Не удалось отправить заказ. Позвоните нам по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
  }
}