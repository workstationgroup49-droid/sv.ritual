import { createClient } from './client'
import { AdminUser, AdminUserInsert } from '@/types/admin'

export async function getAdminUsers(): Promise<AdminUser[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('getAdminUsers error:', error.message)
    return []
  }
  return data ?? []
}

export async function addAdminUser(user: AdminUserInsert): Promise<AdminUser | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('admin_users')
    .insert(user)
    .select()
    .single()

  if (error) {
    console.error('addAdminUser error:', error.message)
    return null
  }
  return data
}

export async function toggleAdminUser(id: string, is_active: boolean): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('admin_users')
    .update({ is_active })
    .eq('id', id)

  return !error
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('id', id)

  return !error
}