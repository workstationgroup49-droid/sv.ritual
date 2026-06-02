export function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
      <div className="w-1.5 h-1.5 bg-gold/50 rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  )
}