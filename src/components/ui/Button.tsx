import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variants: Record<Variant, string> = {
  primary: 'bg-bordeaux text-cream border border-bordeaux hover:bg-burgundy hover:border-burgundy',
  outline: 'bg-transparent text-cream border border-gold hover:bg-gold/10',
  ghost:   'bg-transparent text-mist hover:text-cream border border-transparent',
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'font-body text-sm tracking-widest uppercase px-8 py-3',
        'transition-all duration-300 cursor-pointer',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}