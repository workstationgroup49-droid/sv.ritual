import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Форматування ціни з копійок у гривні
export function formatPrice(kopecks: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style:    'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(kopecks / 100)
}