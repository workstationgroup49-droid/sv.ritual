'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminUser, AdminUserInsert } from '@/types/admin'
import {
  getAdminUsers,
  addAdminUser,
  toggleAdminUser,
  deleteAdminUser,
} from '@/services/supabase/adminUsers'

export function useAdminUsers() {
  const [users,     setUsers]     = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    const data = await getAdminUsers()
    setUsers(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    load().catch(console.error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = async (user: AdminUserInsert) => {
    const result = await addAdminUser(user)
    if (!result) { setError('Помилка додавання користувача'); return false }
    await load()
    return true
  }

  const handleToggle = async (id: string, is_active: boolean) => {
    const ok = await toggleAdminUser(id, is_active)
    if (!ok) { setError('Помилка оновлення'); return }
    await load()
  }

  const handleDelete = async (id: string) => {
    const ok = await deleteAdminUser(id)
    if (!ok) { setError('Помилка видалення'); return }
    await load()
  }

  return { users, isLoading, error, setError, handleAdd, handleToggle, handleDelete }
}