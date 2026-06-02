'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { useAdminProducts } from '@/hooks/useAdminProducts'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ProductTable } from '@/components/admin/ProductTable'
import { ProductForm } from '@/components/admin/ProductForm'
import { UsersPanel } from '@/components/admin/UsersPanel'
import { CategoriesPanel } from '@/components/admin/CategoriesPanel'
import { Plus, LogOut, RefreshCw, Package, Users, Tag } from 'lucide-react'

type Mode = 'list' | 'add' | 'edit'
type Tab  = 'products' | 'categories' | 'users'

export default function AdminDashboardPage() {
  const { products, isLoading, error, setError, handleAdd, handleUpdate, handleDelete } =
    useAdminProducts()
  const { handleLogout } = useAdminAuth()

  const [mode,    setMode]    = useState<Mode>('list')
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving,  setSaving]  = useState(false)
  const [tab,     setTab]     = useState<Tab>('products')

  const openEdit = (product: Product) => {
    setEditing(product)
    setMode('edit')
  }

  const confirmDelete = async (product: Product) => {
    if (!confirm(`Видалити «${product.name}»?`)) return
    await handleDelete(product.id, product.image_url)
  }

  const submitAdd = async (data: Parameters<typeof handleAdd>[0], file?: File) => {
    setSaving(true)
    const ok = await handleAdd(data, file)
    setSaving(false)
    if (ok) setMode('list')
    return ok
  }

  const submitEdit = async (data: Parameters<typeof handleAdd>[0], file?: File) => {
    if (!editing) return false
    setSaving(true)
    const ok = await handleUpdate(editing.id, data, file, editing.image_url)
    setSaving(false)
    if (ok) { setMode('list'); setEditing(null) }
    return ok
  }

  const tabs = [
    { id: 'products',   label: 'Товари',      icon: Package },
    { id: 'categories', label: 'Категорії',   icon: Tag     },
    { id: 'users',      label: 'Користувачі', icon: Users   },
  ]

  return (
    <main className="min-h-screen bg-obsidian">

      {/* Шапка */}
      <header className="bg-graphite border-b border-white/5 px-6 h-16 flex items-center justify-between">
        <div>
          <span className="font-display text-xl text-cream tracking-widest">СВ-РІТУАЛ</span>
          <span className="font-body text-xs text-mist ml-3 tracking-wider">/ Панель керування</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-mist hover:text-cream
                     font-body text-xs tracking-wider transition-colors duration-200"
        >
          <LogOut size={14} />
          Вийти
        </button>
      </header>

      {/* Вкладки */}
      <div className="border-b border-white/5 bg-graphite">
        <div className="max-w-6xl mx-auto px-6 flex">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id as Tab); setMode('list') }}
              className={`flex items-center gap-2 px-6 py-4 font-body text-xs tracking-widest uppercase
                          border-b-2 transition-colors duration-200 ${
                tab === t.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-mist hover:text-cream'
              }`}
            >
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Помилка */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-400
                          font-body text-sm px-4 py-3 mb-6 flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="text-red-400/60 hover:text-red-400">✕</button>
          </div>
        )}

        {/* Вкладка: Товари */}
        {tab === 'products' && (
          <>
            {mode === 'list' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="font-display text-3xl font-light text-cream">Товари</h1>
                    <p className="font-body text-mist text-sm mt-1">
                      {isLoading ? 'Завантаження...' : `${products.length} товарів`}
                    </p>
                  </div>
                  <button
                    onClick={() => setMode('add')}
                    className="flex items-center gap-2 bg-bordeaux text-cream
                               font-body text-xs tracking-widest uppercase px-6 py-3
                               hover:bg-burgundy transition-colors duration-300"
                  >
                    <Plus size={14} />
                    Додати товар
                  </button>
                </div>

                <div className="bg-graphite border border-white/5">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-20 gap-3 text-mist">
                      <RefreshCw size={16} className="animate-spin" />
                      <span className="font-body text-sm">Завантаження товарів...</span>
                    </div>
                  ) : (
                    <ProductTable
                      products={products}
                      onEdit={openEdit}
                      onDelete={confirmDelete}
                    />
                  )}
                </div>
              </>
            )}

            {mode === 'add' && (
              <div className="max-w-lg">
                <h1 className="font-display text-3xl font-light text-cream mb-8">
                  Новий товар
                </h1>
                <div className="bg-graphite border border-white/5 p-8">
                  <ProductForm
                    onSubmit={submitAdd}
                    onCancel={() => setMode('list')}
                    isLoading={saving}
                  />
                </div>
              </div>
            )}

            {mode === 'edit' && editing && (
              <div className="max-w-lg">
                <h1 className="font-display text-3xl font-light text-cream mb-8">
                  Редагувати товар
                </h1>
                <div className="bg-graphite border border-white/5 p-8">
                  <ProductForm
                    initial={editing}
                    onSubmit={submitEdit}
                    onCancel={() => { setMode('list'); setEditing(null) }}
                    isLoading={saving}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Вкладка: Категорії */}
        {tab === 'categories' && <CategoriesPanel />}

        {/* Вкладка: Користувачі */}
        {tab === 'users' && <UsersPanel />}

      </div>
    </main>
  )
}
