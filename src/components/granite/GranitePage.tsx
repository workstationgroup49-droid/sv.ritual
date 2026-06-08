'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const BASE = '/images/granite/'

const graniteTypes = [
  {
    id: 1,
    name: 'Покостівський',
    international: 'Grey Ukraine',
    origin: 'Україна',
    color: 'сірий',
    description: 'Найпопулярніший сірий граніт України. Світло-сірий колір, дрібнозерниста структура, чудово поєднується з іншими кольорами. Ідеальний для фасадів, сходів, підвіконь.',
    url: `${BASE}1689088508.webp`,
  },
  {
    id: 2,
    name: 'Лабрадорит Осниківський',
    international: 'Irina Blue',
    origin: 'Україна',
    color: 'чорний з синім',
    description: 'Унікальний анортозит із синьо-фіолетовим переблиском (іридесценцією). Один з чотирьох родовищ у світі. Ефектно виглядає при попаданні прямого світла.',
    url: `${BASE}1689088739.webp`,
  },
  {
    id: 3,
    name: 'Лабрадорит Добринь',
    international: 'Extra Blue Ukraine',
    origin: 'Україна',
    color: 'чорний з синім',
    description: 'Чорна основа з тонкими сірими прожилками та насиченою синьою іридесценцією. Кожна плита — неповторний витвір природи.',
    url: `${BASE}1719989986.webp`,
  },
  {
    id: 4,
    name: 'Лабрадорит Невирівський',
    international: 'Black Ice',
    origin: 'Україна',
    color: 'чорний',
    description: 'Глибокий чорний з дрібнозернистою структурою. Численні кристали створюють переливи фіолетового, зеленого та блакитного — ефект «живого каменю».',
    url: `${BASE}1689088739.webp`,
  },
  {
    id: 5,
    name: 'Омелянівський',
    international: 'Rosso Toledo',
    origin: 'Україна',
    color: 'помаранчево-червоний',
    description: 'Виразна помаранчево-червона структура. Відомий з часів СРСР, зустрічається у метро, на мостах та набережних. Добре піддається всім видам обробки.',
    url: `${BASE}1689090469.webp`,
  },
  {
    id: 6,
    name: 'Капустянський',
    international: 'Rosso Santiago',
    origin: 'Україна',
    color: 'яскраво-червоний',
    description: 'Яскраво-червоний із чорними включеннями, крупнозерниста структура. Видобувається на Кіровоградщині — один з найвідоміших українських гранітів.',
    url: `${BASE}1694612856.webp`,
  },
  {
    id: 7,
    name: 'Корнинський Червоний',
    international: 'Leopard Red',
    origin: 'Україна',
    color: 'червоний',
    description: 'Середньозернистий граніт з унікальним «леопардовим» малюнком — чорні, сірі, червоні та бежеві вкраплення. Популярний в архітектурі та ландшафтному дизайні.',
    url: `${BASE}1694613198.webp`,
  },
  {
    id: 8,
    name: 'Корнинський Сірий',
    international: 'Leopard Grey',
    origin: 'Україна',
    color: 'сірий',
    description: 'Сірий аналог Корнинського червоного з тією ж «леопардовою» структурою. Бежеві вкраплення замість червоних надають каменю стриманого характеру.',
    url: `${BASE}1689105341.webp`,
  },
  {
    id: 9,
    name: 'Межирічський',
    international: 'Flower of Ukraine',
    origin: 'Україна',
    color: 'бежевий',
    description: 'Пастельний бежевий з чорними плямами — класичний, універсальний відтінок. Гармонійно поєднується з 90% дизайн-проектів будинків і громадських просторів.',
    url: `${BASE}1689088287.webp`,
  },
  {
    id: 10,
    name: 'Токівський',
    international: 'Carpazi',
    origin: 'Україна',
    color: 'яскраво-червоний',
    description: 'Виразний яскраво-червоний граніт з Дніпропетровської області. Ефектно виглядає у поліруванні, використовується для фасадів, огорож та сходів.',
    url: `${BASE}1689088402.webp`,
  },
  {
    id: 11,
    name: 'Габро',
    international: 'Gabbro',
    origin: 'Україна',
    color: 'чорний',
    description: 'Магматична порода з ідеально вугільно-чорним кольором. Рівномірнозерниста, однорідна структура без прожилок. Популярна для пам\'ятників та меморіальних комплексів.',
    url: `${BASE}1689279640.webp`,
  },
  {
    id: 12,
    name: 'Жадківський',
    international: 'Rosa Raveno',
    origin: 'Україна',
    color: 'червоний',
    description: 'Новий дрібнозернистий червоний граніт з Рівненщини, видобуток з 2015 р. Доступна ціна серед червоних гранітів, чудова альтернатива Лізниківському.',
    url: `${BASE}1690199971.webp`,
  },
  {
    id: 13,
    name: 'Новоданилівський',
    international: 'Withered',
    origin: 'Україна',
    color: 'червоно-помаранчевий',
    description: 'Червоно-помаранчевий із чорними включеннями, дрібна структура. Спокійний відтінок порівняно з іншими червоними гранітами, родовище в Миколаївській обл.',
    url: `${BASE}1689275865.webp`,
  },
  {
    id: 14,
    name: 'Лізниківський',
    international: 'Maple Red',
    origin: 'Україна',
    color: 'малиново-червоний',
    description: 'Один з найпопулярніших червоних гранітів України та світу. Яскравий малиновий колір з дрібними чорними крапками. Вважається елітним матеріалом.',
    url: `${BASE}1689276320.webp`,
  },
  {
    id: 15,
    name: 'Василівський',
    international: 'Ukrainian Autumn',
    origin: 'Україна',
    color: 'зелено-рожевий',
    description: 'Унікальне поєднання зеленого та рожево-бежевого кольорів з чорними крапками. Один з найпопулярніших зелених гранітів, родовище на Житомирщині.',
    url: `${BASE}1689104058.webp`,
  },
  {
    id: 16,
    name: 'Човновський',
    international: 'Chovnovske',
    origin: 'Україна',
    color: 'темно-зелений',
    description: 'Найтемніший з трьох зелених гранітів України. Щільна рівномірна структура без зайвих домішок, глибокий темно-зелений колір. Часто поєднують з чорним габро.',
    url: `${BASE}1689105793.webp`,
  },
  {
    id: 17,
    name: 'Дідковицький',
    international: 'Star of Ukraine',
    origin: 'Україна',
    color: 'бежевий',
    description: 'Теплий бежевий з чорними включеннями та темними прожилками. Один з найпопулярніших різновидів завдяки унікальному кольору та постійній наявності сировини.',
    url: `${BASE}1691657636.webp`,
  },
  {
    id: 18,
    name: 'Жаданів',
    international: 'Zhadani',
    origin: 'Україна',
    color: 'темно-бежевий',
    description: 'Темно-бежевий з сірими включеннями та градієнтним малюнком схожим на мармур. Середньо-крупнозерниста структура, родовище на Вінниччині.',
    url: `${BASE}1689278680.webp`,
  },
  {
    id: 19,
    name: 'Софіївський',
    international: 'Skifiya Gold',
    origin: 'Україна',
    color: 'жовтий',
    description: 'Єдиний граніт в Україні з вираженим жовтим кольором із сірими та чорними домішками. Середньо-крупнозерниста структура з поздовжніми смугами, родовище на Миколаївщині.',
    url: `${BASE}1690199108.webp`,
  },
  {
    id: 20,
    name: 'Рахни-Поліський',
    international: 'Pantera Grey',
    origin: 'Україна',
    color: 'темно-сірий',
    description: 'Унікальний темно-сірий граніт зі світлими прожилками. Видобуток почався 20–30 років тому, але широка популярність прийшла лише нещодавно. Преміальна порода.',
    url: `${BASE}1689277184.webp`,
  },
  {
    id: 21,
    name: 'Танський',
    international: 'Tansky',
    origin: 'Україна',
    color: 'сірий',
    description: 'Один з трьох найпопулярніших сірих гранітів України. Унікальна дрібнозерниста структура, стабільний сірий колір зі світлими та темними включеннями.',
    url: `${BASE}1692718617.webp`,
  },
  {
    id: 22,
    name: 'Новоселівський',
    international: 'Caviale Nero',
    origin: 'Україна',
    color: 'темно-сірий',
    description: 'Темно-сірий граніт з Миколаївської обл. Щільна дрібнозерниста структура, схожа на ікру — звідси міжнародна назва CAVIALE NERO (чорна ікра).',
    url: `${BASE}1689280273.webp`,
  },
  {
    id: 23,
    name: 'Крутнів',
    international: 'Granat',
    origin: 'Україна',
    color: 'рожево-сірий',
    description: 'Унікальний рожево-сірий граніт з мармуровими переходами та смугами. Колір варіює від світло-сірого до рожевого залежно від місця видобутку, родовище на Вінниччині.',
    url: `${BASE}1689281020.webp`,
  },
  {
    id: 24,
    name: 'Кишинський',
    international: 'Rosa Kyshyn',
    origin: 'Україна',
    color: 'рожево-червоний',
    description: 'Рожево-червоний середньозернистий граніт з Житомирщини. Відтінок варіює від рожевого до світло-рожевого. Застосовується в архітектурі, будівництві та ландшафтному дизайні.',
    url: `${BASE}1689281710.webp`,
  },
  {
    id: 25,
    name: 'Малофедорівський',
    international: 'Konstantin Imperialis',
    origin: 'Україна',
    color: 'сірий з червоним',
    description: 'Середньозернистий граніт з Миколаївської обл. Поєднує відтінки сірого, червоного та коричневого з мармуровим малюнком. Перший клас радіаційної безпеки.',
    url: `${BASE}1722747461.webp`,
  },
]

const COLOR_GROUPS = [
  { label: 'Всі', value: 'all' },
  { label: 'Чорний', value: 'чорний' },
  { label: 'Сірий', value: 'сірий' },
  { label: 'Червоний', value: 'червоний' },
  { label: 'Бежевий', value: 'бежевий' },
  { label: 'Зелений', value: 'зелений' },
  { label: 'Рожевий', value: 'рожевий' },
  { label: 'Жовтий', value: 'жовтий' },
]

export function GranitePage() {
  const [zoomed, setZoomed] = useState<typeof graniteTypes[0] | null>(null)
  const [filter, setFilter] = useState('all')

  const zoomedIdx = zoomed ? graniteTypes.findIndex(g => g.id === zoomed.id) : -1

  const filtered = filter === 'all'
    ? graniteTypes
    : graniteTypes.filter(g => g.color.includes(filter))

  function prev() {
    if (zoomedIdx > 0) setZoomed(graniteTypes[zoomedIdx - 1])
  }
  function next() {
    if (zoomedIdx < graniteTypes.length - 1) setZoomed(graniteTypes[zoomedIdx + 1])
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-obsidian overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">
            Матеріали виробництва
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
            Зразки граніту
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Граніт — матеріал вічності. Ми працюємо з понад 25 породами українського видобутку.
            Кожен зразок відрізняється структурою, кольором та характером —
            оберіть той, що відповідає вашому задуму.
          </p>
        </div>
      </section>

      {/* Фільтри */}
      <section className="bg-obsidian border-b border-white/5 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {COLOR_GROUPS.map(g => (
            <button
              key={g.value}
              onClick={() => setFilter(g.value)}
              className={`font-body text-[11px] tracking-widest uppercase px-4 py-1.5 border transition-all duration-200
                ${ filter === g.value
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-white/10 text-mist/60 hover:border-white/30 hover:text-mist'
                }`}
            >
              {g.label}
            </button>
          ))}
          <span className="ml-auto font-body text-[11px] text-mist/30 uppercase tracking-widest self-center">
            {filtered.length} зразків
          </span>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-16 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map(granite => (
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
                    <p className="font-body text-[10px] text-gold/50 tracking-wider uppercase mt-0.5">
                      {granite.international}
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

            {/* Стрілки */}
            {zoomedIdx > 0 && (
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center
                           bg-obsidian/70 hover:bg-obsidian text-mist hover:text-gold transition-colors duration-200 border border-white/10">
                <ChevronLeft size={18} />
              </button>
            )}
            {zoomedIdx < graniteTypes.length - 1 && (
              <button onClick={next}
                className="absolute right-14 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center
                           bg-obsidian/70 hover:bg-obsidian text-mist hover:text-gold transition-colors duration-200 border border-white/10">
                <ChevronRight size={18} />
              </button>
            )}

            <div className="relative h-80 bg-graphite">
              <Image
                src={zoomed.url}
                alt={zoomed.name}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-display text-2xl text-cream">{zoomed.name}</h2>
                  <p className="font-body text-xs text-gold/60 tracking-widest uppercase mt-1">{zoomed.international}</p>
                </div>
                <span className="font-body text-xs text-mist/50 tracking-widest uppercase border border-white/10 px-3 py-1 shrink-0 ml-4">
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
