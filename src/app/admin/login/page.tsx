'use client'

import { useAdminAuth } from '@/hooks/useAdminAuth'
import { cn } from '@/lib/utils'

export default function AdminLoginPage() {
  const {
    step,
    password, setPassword,
    code, setCode,
    error, isLoading,
    handleSendCode, handleLogin, handleBack,
  } = useAdminAuth()

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <p className="font-display text-4xl font-light text-cream tracking-widest mb-2">
            РЕКВІЄМ
          </p>
          <p className="font-body text-xs tracking-[0.3em] text-gold uppercase">
            Панель керування
          </p>
        </div>

        {/* Крок 1 — пароль */}
        {step === 'password' && (
          <form onSubmit={handleSendCode} className="bg-graphite border border-white/5 p-8">
            <p className="font-body text-xs tracking-widest uppercase text-mist mb-2">
              Пароль
            </p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введіть пароль"
              required
              className={cn(
                'w-full bg-ash border text-cream placeholder-mist/40',
                'font-body text-sm px-4 py-3 outline-none mb-4',
                'focus:border-gold/40 transition-colors duration-300',
                error ? 'border-red-500/60' : 'border-white/10'
              )}
            />
            {error && (
              <p className="font-body text-red-400 text-xs mb-4">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bordeaux text-cream font-body text-xs tracking-widest
                         uppercase py-3 hover:bg-burgundy transition-colors duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Надсилаємо код...' : 'Отримати код у Telegram'}
            </button>
          </form>
        )}

        {/* Крок 2 — код з Telegram */}
        {step === 'code' && (
          <form onSubmit={handleLogin} className="bg-graphite border border-white/5 p-8">
            <p className="font-body text-xs tracking-widest uppercase text-mist mb-1">
              Код з Telegram
            </p>
            <p className="font-body text-mist/50 text-xs mb-4">
              Перевірте повідомлення від бота. Код діє 5 хвилин.
            </p>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="000000"
              required
              maxLength={6}
              className={cn(
                'w-full bg-ash border text-cream placeholder-mist/40',
                'font-body text-sm px-4 py-3 outline-none mb-4',
                'focus:border-gold/40 transition-colors duration-300',
                'tracking-[0.5em] text-center text-lg',
                error ? 'border-red-500/60' : 'border-white/10'
              )}
            />
            {error && (
              <p className="font-body text-red-400 text-xs mb-4">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bordeaux text-cream font-body text-xs tracking-widest
                         uppercase py-3 hover:bg-burgundy transition-colors duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {isLoading ? 'Перевіряємо...' : 'Увійти'}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full border border-white/10 text-mist font-body text-xs
                         tracking-widest uppercase py-3 hover:text-cream
                         transition-colors duration-300"
            >
              Назад
            </button>
          </form>
        )}

      </div>
    </main>
  )
}
