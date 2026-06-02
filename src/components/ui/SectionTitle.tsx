import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({ eyebrow, title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-14', centered && 'text-center', className)}>
      {eyebrow && (
        <p className="deco-line font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-mist text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}