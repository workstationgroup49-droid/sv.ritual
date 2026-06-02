'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

interface ContactFormData {
  name:    string
  phone:   string
  message: string
}

const initialState: ContactFormData = { name: '', phone: '', message: '' }

export function useContactForm() {
  const [formData,     setFormData]     = useState<ContactFormData>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted,  setIsSubmitted]  = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/callback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error()

      setIsSubmitted(true)
      setFormData(initialState)

    } catch {
      setError('Помилка відправки. Зателефонуйте нам напряму.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { formData, isSubmitting, isSubmitted, error, handleChange, handleSubmit }
}
