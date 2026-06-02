'use client'

import { useState } from 'react'
import { useAdminUsers } from '@/hooks/useAdminUsers'
import { AdminUserInsert } from '@/types/admin'
import { UserPlus, Trash2, ToggleLeft, ToggleRight, Crown, User } from 'lucide-react'

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/40
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 transition-colors duration-300
`

export function UsersPanel() {
  const { users, isLoading, error, setError, handleAdd, handleToggle, handleDelete } =
    useAdminUsers()

  const [showForm, setShowForm] = useState(false)
  const [name,     setName]     = useState('')
  const [chatId,   setChatId]   = useState('')
  const [saving,   setSaving]   = useState(false)
  const [formError, setFormError] = useState('')

  const submitAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!chatId.match(/^\d+$/)) {
      setFormError('Chat ID повинен містити тільки цифри')
      return
    }

    setSaving(true)
    const user: AdminUserInsert = {
      name,
      chat_id:   chatId,
      role:      'manager',
      is_active: true,
    }
    const ok = await handleAdd(user)
    setSaving(false)

    if (ok) {
      setName('')
      setChatId('')
      setShowForm(false)
    }
  }

  return (
    <div>
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-light text-cream">Користувачі</h2>
          <p className="font-body text-mist text-sm mt-1">
            Люди які мають доступ до адмін-панелі
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-bordeaux text-cream
                     font-body text-xs tracking-widest uppercase px-6 py-3
                     hover:bg-burgundy transition-colors duration-300"
        >
          <UserPlus size={14} />
          Додати
        </button>
      </div>

      {/* Помилка */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400
                        font-body text-sm px-4 py-3 mb-6 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Форма додавання */}
      {showForm && (
        <form onSubmit={submitAdd} className="bg-graphite border border-gold/20 p-6 mb-6 space-y-4">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-2">
            Новий користувач
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
                Ім&apos;я
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Менеджер Іван"
                className={inputClass}
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
                Telegram Chat ID
              </label>
              <input
                value={chatId}
                onChange={e => setChatId(e.target.value)}
                required
                placeholder="123456789"
                className={inputClass}
              />
            </div>
          </div>

          <p className="font-body text-mist/50 text-xs">
            Щоб дізнатись Chat ID — нехай людина напише боту @userinfobot і скопіює свій id
          </p>

          {formError && (
            <p className="font-body text-red-400 text-xs">{formError}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-bordeaux text-cream font-body text-xs tracking-widest
                         uppercase py-3 hover:bg-burgundy transition-colors duration-300
                         disabled:opacity-50"
            >
              {saving ? 'Збереження...' : 'Додати'}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setFormError('') }}
              className="flex-1 border border-white/10 text-mist font-body text-xs
                         tracking-widest uppercase py-3 hover:text-cream
                         transition-colors duration-300"
            >
              Скасувати
            </button>
          </div>
        </form>
      )}

      {/* Список користувачів */}
      <div className="bg-graphite border border-white/5">
        {isLoading ? (
          <p className="font-body text-mist text-sm text-center py-10">Завантаження...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Користувач', 'Chat ID', 'Роль', 'Статус', ''].map(h => (
                  <th key={h} className="font-body text-xs tracking-widest uppercase
                                         text-mist text-left px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/5">

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.role === 'owner'
                        ? <Crown size={14} className="text-gold" />
                        : <User  size={14} className="text-mist" />
                      }
                      <span className="font-body text-sm text-cream">{user.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-body text-xs text-mist/60 font-mono">
                      {user.chat_id}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-body text-xs text-mist">
                      {user.role === 'owner' ? 'Власник' : 'Менеджер'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={`font-body text-xs px-2 py-1 ${
                      user.is_active
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {user.is_active ? 'Активний' : 'Вимкнений'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* Увімкнути/вимкнути — не можна вимкнути власника */}
                      {user.role !== 'owner' && (
                        <button
                          onClick={() => handleToggle(user.id, !user.is_active)}
                          className="p-2 text-mist hover:text-gold transition-colors duration-200"
                          title={user.is_active ? 'Вимкнути' : 'Увімкнути'}
                        >
                          {user.is_active
                            ? <ToggleRight size={16} />
                            : <ToggleLeft  size={16} />
                          }
                        </button>
                      )}

                      {/* Видалити — тільки менеджерів */}
                      {user.role !== 'owner' && (
                        <button
                          onClick={() => {
                            if (confirm(`Видалити ${user.name}?`)) handleDelete(user.id)
                          }}
                          className="p-2 text-mist hover:text-red-400 transition-colors duration-200"
                          title="Видалити"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Підказка */}
      <p className="font-body text-mist/40 text-xs mt-4">
        💡 Щоб дізнатись свій Chat ID — напишіть боту <span className="text-gold">@userinfobot</span> в Telegram
      </p>
    </div>
  )
}