'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Step = 'password' | 'code'

export function useAdminAuth() {
  const [step,      setStep]      = useState<Step>('password')
  const [password,  setPassword]  = useState('')
  const [code,      setCode]      = useState('')
  const [error,     setError]     = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Крок 1 — перевірка пароля і надсилання коду
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const res = await fetch('/api/admin/send-code', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    if (res.ok) {
      setStep('code')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Невірний пароль')
    }

    setIsLoading(false)
  }

  // Крок 2 — перевірка коду
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ code }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Невірний код')
    }

    setIsLoading(false)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleBack = () => {
    setStep('password')
    setCode('')
    setError('')
  }

  return {
    step,
    password, setPassword,
    code, setCode,
    error,
    isLoading,
    handleSendCode,
    handleLogin,
    handleLogout,
    handleBack,
  }
}
