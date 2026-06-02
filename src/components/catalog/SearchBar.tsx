'use client'

import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value:    string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-mist pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Пошук за назвою..."
        className="w-full bg-graphite border border-white/10 text-cream placeholder-mist/40
                   font-body text-sm pl-11 pr-10 py-3 outline-none
                   focus:border-gold/40 transition-colors duration-300"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-mist hover:text-cream
                     transition-colors duration-200"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
