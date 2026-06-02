export interface AdminUser {
  id:         string
  name:       string
  chat_id:    string
  role:       'owner' | 'manager'
  is_active:  boolean
  created_at: string
}

export type AdminUserInsert = Omit<AdminUser, 'id' | 'created_at'>