import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Форматирование цены из копеек в рубли
export function formatPrice(kopecks: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style:    'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(kopecks / 100)
}