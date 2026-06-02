'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  currentUrl?: string | null
  onFileSelect: (file: File) => void
}

export function ImageUploader({ currentUrl, onFileSelect }: ImageUploaderProps) {
  const inputRef                    = useRef<HTMLInputElement>(null)
  const [preview, setPreview]       = useState<string | null>(currentUrl ?? null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    onFileSelect(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'relative border-2 border-dashed cursor-pointer transition-colors duration-300',
        'flex items-center justify-center h-40 overflow-hidden',
        isDragging ? 'border-gold/60 bg-gold/5' : 'border-white/10 hover:border-white/20'
      )}
    >
      {preview ? (
        <Image src={preview} alt="Preview" fill className="object-cover opacity-70" />
      ) : (
        <p className="font-body text-mist text-xs text-center px-4">
          Нажмите или перетащите фото сюда
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}