'use client'

import { useState } from 'react'
import { useAdminCategories } from '@/hooks/useAdminCategories'
import { Plus, Trash2, Pencil, Check, X, RefreshCw, Tag, Copy, CheckCheck } from 'lucide-react'

const inputClass = `
  bg-ash border border-white/10 text-cream placeholder-mist/40
  font-body text-sm px-3 py-2 outline-none
  focus:border-gold/40 transition-colors duration-300 w-full
`

const SQL_INIT = `-- 1. Створити таблицю categories
CREATE TABLE IF NOT EXISTS categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       text UNIQUE NOT NULL,
  label      text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2. Вставити категорії
INSERT INTO categories (slug, label, sort_order) VALUES
  ('concrete',    'Бетонні пам''ятники',                  0),
  ('horizontal',  'Горизонтальні пам''ятники',             1),
  ('granite',     'Граніт',                               2),
  ('complexes',   'Гранітні комплекси',                   3),
  ('fences',      'Гранітні огорожі',                     4),
  ('double',      'Двійні пам''ятники',                    5),
  ('children',    'Дитячі пам''ятники',                    6),
  ('military',    'Для військових',                       7),
  ('forone',      'Для одного',                           8),
  ('columbarium', 'Колумбарії',                           9),
  ('single',      'Одинарні пам''ятники',                 10),
  ('european',    'Пам''ятники в європейському стилі',    11),
  ('mil_mem',     'Пам''ятники для військових',           12),
  ('colorful',    'Пам''ятники з кольоровим фото',        13),
  ('crosses',     'Пам''ятники з хрестами',               14)
ON CONFLICT (slug) DO NOTHING;`

export function CategoriesPanel() {
  const { categories, isLoading, error, setError, handleAdd, handleDelete, handleUpdate } = useAdminCategories()

  const [newSlug,  setNewSlug]  = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [adding,   setAdding]   = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showSql,  setShowSql]  = useState(false)
  const [copied,   setCopied]   = useState(false)

  const [editingId,  setEditingId]  = useState<string | null>(null)
  const [editSlug,   setEditSlug]   = useState('')
  const [editLabel,  setEditLabel]  = useState('')
  const [editSaving, setEditSaving] = useState(false)

  const slugify = (str: string) =>
    str.toLowerCase().trim()
       .replace(/\s+/g, '_')
       .replace(/[^a-z0-9_]/g, '')

  const copySQL = () => {
    navigator.clipboard.writeText(SQL_INIT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const submitAdd = async () => {
    if (!newLabel.trim()) return
    const slug = newSlug.trim() || slugify(newLabel)
    setAdding(true)
    const ok = await handleAdd(slug, newLabel.trim())
    setAdding(false)
    if (ok) { setNewSlug(''); setNewLabel(''); setShowForm(false) }
  }

  const startEdit = (id: string, slug: string, label: string) => {
    setEditingId(id); setEditSlug(slug); setEditLabel(label)
  }

  const submitEdit = async () => {
    if (!editingId || !editLabel.trim()) return
    setEditSaving(true)
    await handleUpdate(editingId, editSlug || slugify(editLabel), editLabel.trim())
    setEditSaving(false)
    setEditingId(null)
  }

  return (
    <div>
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-cream">Категорії</h1>
          <p className="font-body text-mist text-sm mt-1">
            {isLoading ? 'Завантаження...' : `${categories.length} категорій`}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSql(v => !v)}
            className="flex items-center gap-2 border border-gold/30 text-gold
                       font-body text-xs tracking-widest uppercase px-4 py-3
                       hover:bg-gold/5 transition-colors duration-300"
          >
            SQL
          </button>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 bg-bordeaux text-cream
                       font-body text-xs tracking-widest uppercase px-5 py-3
                       hover:bg-burgundy transition-colors duration-300"
          >
            <Plus size={13} />
            Додати
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 font-body text-sm px-4 py-3 mb-6 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* SQL блок */}
      {showSql && (
        <div className="bg-graphite border border-gold/20 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold">
              Виконайте в Supabase → SQL Editor
            </p>
            <button
              onClick={copySQL}
              className="flex items-center gap-1.5 text-mist hover:text-cream font-body text-xs transition-colors duration-200"
            >
              {copied ? <CheckCheck size={13} className="text-green-400" /> : <Copy size={13} />}
              {copied ? 'Скопійовано!' : 'Копіювати'}
            </button>
          </div>
          <pre className="font-mono text-xs text-mist/80 overflow-x-auto whitespace-pre leading-relaxed bg-black/30 p-4 rounded">
            {SQL_INIT}
          </pre>
          <p className="font-body text-xs text-mist/50 mt-3">
            Після виконання — оновіть сторінку. Категорії з&apos;являться в таблиці нижче.
          </p>
        </div>
      )}

      {/* Форма добавления */}
      {showForm && (
        <div className="bg-graphite border border-white/5 p-6 mb-6">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Нова категорія</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">Назва *</label>
              <input
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                placeholder="Наприклад: Свічки"
                className={inputClass}
                onKeyDown={e => e.key === 'Enter' && submitAdd()}
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
                Slug (авто якщо пусто)
              </label>
              <input
                value={newSlug}
                onChange={e => setNewSlug(slugify(e.target.value))}
                placeholder={newLabel ? slugify(newLabel) : 'candles'}
                className={inputClass}
              />
              <p className="font-body text-mist/40 text-xs mt-1">
                URL: /catalog?category=<span className="text-gold">{newSlug || slugify(newLabel) || 'slug'}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={submitAdd}
              disabled={adding || !newLabel.trim()}
              className="flex items-center gap-2 bg-bordeaux text-cream font-body text-xs tracking-widest uppercase px-5 py-2.5
                         hover:bg-burgundy transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? <RefreshCw size={12} className="animate-spin" /> : <Plus size={12} />}
              {adding ? 'Додаємо...' : 'Додати'}
            </button>
            <button
              onClick={() => { setShowForm(false); setNewSlug(''); setNewLabel('') }}
              className="border border-white/10 text-mist font-body text-xs tracking-widest uppercase px-5 py-2.5
                         hover:text-cream hover:border-white/20 transition-colors duration-300"
            >
              Скасувати
            </button>
          </div>
        </div>
      )}

      {/* Таблица категорий */}
      <div className="bg-graphite border border-white/5">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-mist">
            <RefreshCw size={16} className="animate-spin" />
            <span className="font-body text-sm">Завантаження...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-mist">
            <Tag size={36} className="mb-4 opacity-20" />
            <p className="font-body text-sm mb-1">Категорій ще немає</p>
            <p className="font-body text-xs text-mist/40 mb-5">Спочатку виконайте SQL-скрипт щоб заповнити базові категорії</p>
            <button
              onClick={() => { setShowSql(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2 border border-gold/30 text-gold font-body text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-gold/5 transition-colors duration-300"
            >
              Показати SQL
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left font-body text-xs tracking-[0.2em] uppercase text-gold/70 px-6 py-4 w-8">#</th>
                <th className="text-left font-body text-xs tracking-[0.2em] uppercase text-gold/70 px-6 py-4">Назва</th>
                <th className="text-left font-body text-xs tracking-[0.2em] uppercase text-gold/70 px-6 py-4">Slug</th>
                <th className="text-right font-body text-xs tracking-[0.2em] uppercase text-gold/70 px-6 py-4">Дії</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors duration-150">
                  {editingId === cat.id ? (
                    <>
                      <td className="px-6 py-3 text-mist/40 font-body text-xs">{i + 1}</td>
                      <td className="px-6 py-3">
                        <input value={editLabel} onChange={e => setEditLabel(e.target.value)} className={inputClass} autoFocus />
                      </td>
                      <td className="px-6 py-3">
                        <input value={editSlug} onChange={e => setEditSlug(slugify(e.target.value))} className={inputClass} />
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={submitEdit} disabled={editSaving}
                            className="w-8 h-8 flex items-center justify-center text-green-400 hover:bg-white/5 transition-colors">
                            {editSaving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                          </button>
                          <button onClick={() => setEditingId(null)}
                            className="w-8 h-8 flex items-center justify-center text-mist hover:text-cream hover:bg-white/5 transition-colors">
                            <X size={13} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-mist/30 font-body text-xs">{i + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-body text-sm text-cream">{cat.label}</span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="font-mono text-xs text-gold bg-black/20 px-2 py-0.5">{cat.slug}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(cat.id, cat.slug, cat.label)}
                            className="w-8 h-8 flex items-center justify-center text-mist hover:text-gold hover:bg-white/5 transition-colors" title="Редагувати">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => { if (confirm(`Видалити «${cat.label}»?`)) handleDelete(cat.id) }}
                            className="w-8 h-8 flex items-center justify-center text-mist hover:text-red-400 hover:bg-white/5 transition-colors" title="Видалити">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
