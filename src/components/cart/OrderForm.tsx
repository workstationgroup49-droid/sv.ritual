'use client'

import { useOrderForm } from '@/hooks/useOrderForm'

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/40
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 transition-colors duration-300
`

export function OrderForm() {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
  } = useOrderForm()

  if (isSubmitted) {
    return (
      <div className="bg-graphite border border-white/5 p-8 text-center">
        <p className="text-gold text-4xl mb-4">◆</p>
        <p className="font-display text-2xl text-cream mb-3">
          Замовлення прийнято
        </p>
        <p className="font-body text-mist text-sm leading-relaxed">
          Наш спеціаліст зв&apos;яжеться з вами найближчим часом для підтвердження замовлення.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-graphite border border-white/5 p-6 space-y-4">
      <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">
        Оформлення замовлення
      </p>

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Ім&apos;я *
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Іван Іваненко"
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Телефон *
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+380 (___) ___-__-__"
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Адреса доставки
        </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="м. Київ, вул. Прикладна, буд. 1"
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-wider text-mist uppercase mb-2 block">
          Коментар
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={3}
          placeholder="Додаткові побажання..."
          className={inputClass + ' resize-none'}
        />
      </div>

      {error && (
        <p className="font-body text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-bordeaux text-cream font-body text-xs tracking-widest
                   uppercase py-4 hover:bg-burgundy transition-colors duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? 'Надсилаємо...' : 'Оформити замовлення'}
      </button>

      <p className="font-body text-mist/40 text-xs text-center">
        Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних
      </p>
    </form>
  )
}
