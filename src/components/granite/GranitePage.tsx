'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

const BASE = 'https://gmcgzlctynqcfcrieoyp.supabase.co/storage/v1/object/public/upline1/granite'

const graniteTypes = [
  {
    id: 1,
    name: 'Капустинський',
    origin: 'Україна',
    description: 'Насичений червоно-коричневий відтінок з великим зерном. Один з найвідоміших українських гранітів, видобувається на Кіровоградщині.',
    url: `${BASE}/_1_20250326_1440998818.jpg`,
  },
  {
    id: 2,
    name: 'Чорний Абсолют',
    origin: 'Індія',
    description: 'Ідеально чорний, однорідна дрібнозерниста структура без прожилок. Найпопулярніший вибір для пам\'ятників.',
    url: `${BASE}/_2_20250326_1661533640.jpg`,
  },
  {
    id: 3,
    name: 'Роговський Чорний',
    origin: 'Україна',
    description: 'Один з найтемніших українських гранітів. Рівномірна дрібна структура, відмінно полірується.',
    url: `${BASE}/_3_20250326_1782074586.jpg`,
  },
  {
    id: 4,
    name: 'Токівський Червоний',
    origin: 'Україна',
    description: 'Яскравий червоний граніт з крупними включеннями польового шпату. Ефектно виглядає у поліровці.',
    url: `${BASE}/_4_20250326_2025693597.jpg`,
  },
  {
    id: 5,
    name: 'Покостівський Сірий',
    origin: 'Україна',
    description: 'Світло-сірий середньозернистий граніт. Добре піддається різьбленню та гравіюванню портретів.',
    url: `${BASE}/_5_20250326_1359636857.jpg`,
  },
  {
    id: 6,
    name: 'Лабрадорит',
    origin: 'Україна',
    description: 'Унікальний темний граніт з характерним синім переблиском — лабрадоресценцією. Один з найкрасивіших українських гранітів.',
    url: `${BASE}/_6_20250326_1458720802.jpg`,
  },
  {
    id: 7,
    name: 'Емеліянівський',
    origin: 'Україна',
    description: 'Рожево-червоний граніт з рівномірною структурою. Теплий відтінок надає виробам особливого вигляду.',
    url: `${BASE}/_7_20250326_2025129477.jpg`,
  },
  {
    id: 8,
    name: 'Корнінський Зелений',
    origin: 'Україна',
    description: 'Темно-зелений граніт з характерними світлими включеннями. Рідкісна порода, що надає пам\'ятнику неповторного вигляду.',
    url: `${BASE}/_8_20250326_1474582936.jpg`,
  },
  {
    id: 9,
    name: 'Мармур Білий',
    origin: 'Україна',
    description: 'Світлий мармур з природними прожилками. Класичний матеріал для меморіальних виробів.',
    url: `${BASE}/_9_20250326_1090008837.jpg`,
  },
  {
    id: 10,
    name: 'Білий Каррара',
    origin: 'Імпорт',
    description: 'Однорідний білий мармур без вираженої текстури. Преміальний матеріал для особливих замовлень.',
    url: `${BASE}/_10_20250326_1644990981.jpg`,
  },
  {
    id: 11,
    name: 'Габро Зелений',
    origin: 'Україна',
    description: 'Насичений темно-зелений габро. Щільна однорідна структура, відмінна довговічність.',
    url: `${BASE}/_11_20250326_1437637476.jpg`,
  },
  {
    id: 12,
    name: 'Межирічківський',
    origin: 'Україна',
    description: 'Сірий граніт з вираженою крупнозернистою текстурою. Природний вигляд, добре підходить для великих виробів.',
    url: `${BASE}/_12_20250326_1860810394.jpg`,
  },
  {
    id: 13,
    name: 'Букинський',
    origin: 'Україна',
    description: 'Темно-коричневий граніт Київської області. Рівномірна структура, теплий насичений колір.',
    url: `${BASE}/_13_20250326_1975068222.jpg`,
  },
]

export function GranitePage() {
  const [zoomed, setZoomed] = useState<typeof graniteTypes[0] | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">
            Матеріали виробництва
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
            Зразки граніту
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Граніт — матеріал вічності. Ми працюємо з найкращими породами українського та імпортного
            видобутку. Кожен зразок відрізняється структурою, кольором та характером —
            оберіть той, що відповідає вашому задуму.
          </p>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-16 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {graniteTypes.map(granite => (
              <div
                key={granite.id}
                className="group relative overflow-hidden border border-white/5
                           hover:border-gold/30 transition-all duration-500 cursor-zoom-in"
                onClick={() => setZoomed(granite)}
              >
                <div className="relative aspect-square bg-graphite">
                  <Image
                    src={granite.url}
                    alt={granite.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover opacity-90 group-hover:opacity-100
                               group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Оверлей */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent" />

                  {/* Іконка зуму */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 bg-obsidian/60 flex items-center justify-center border border-white/20">
                      <ZoomIn size={13} className="text-gold" />
                    </div>
                  </div>

                  {/* Назва */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-display text-sm text-cream group-hover:text-gold
                                  transition-colors duration-300 leading-snug">
                      {granite.name}
                    </p>
                    <p className="font-body text-[10px] text-mist/60 tracking-wider uppercase mt-0.5">
                      {granite.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-body text-mist/40 text-xs tracking-wider mt-10">
            * Для точного підбору кольору рекомендуємо відвідати нашу виставку або замовити фізичний зразок.
          </p>
        </div>
      </section>

      {/* Модалка */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-graphite border border-white/10 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomed(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                         bg-obsidian/60 hover:bg-obsidian text-mist hover:text-cream
                         transition-colors duration-200"
            >
              <X size={16} />
            </button>

            <div className="relative h-80 bg-graphite">
              <Image
                src={zoomed.url}
                alt={zoomed.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-display text-2xl text-cream">{zoomed.name}</h2>
                <span className="font-body text-xs text-gold tracking-widest uppercase border border-gold/30 px-3 py-1 shrink-0 ml-4">
                  {zoomed.origin}
                </span>
              </div>
              <div className="h-px bg-gold/20 mb-4" />
              <p className="font-body text-mist text-sm leading-relaxed">{zoomed.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
