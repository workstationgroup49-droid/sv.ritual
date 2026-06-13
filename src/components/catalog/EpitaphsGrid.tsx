'use client'

import { useState } from 'react'

const SECTIONS = [
  { id: 'all',       label: 'Всі' },
  { id: 'zahalni',   label: 'Загальні' },
  { id: 'viiskovym', label: 'Для воїнів' },
  { id: 'relihiini', label: 'Релігійні' },
  { id: 'vidomi',    label: 'Відомі' },
]

const EPITAPHS: { text: string; cat: string }[] = [
  { cat: 'zahalni',   text: 'Забути не можна,\nповернути неможливо' },
  { cat: 'zahalni',   text: 'Ваш вічний сон – наш вічний сум' },
  { cat: 'zahalni',   text: 'Не серед нас, та разом з нами,\nв серцях, у пам’яті, в думках' },
  { cat: 'zahalni',   text: 'Такого рідного, святого,\nтакого доброго, як ти,\nтакого щирого, простого\nвже нам ніколи не знайти' },
  { cat: 'zahalni',   text: 'Спи спокійно наша люба,\nвзята волею судьби.\nХай наш сум, безмірна туга\nне тривожать твої сни' },
  { cat: 'zahalni',   text: 'Болить душа, сльози ллються\nі горю нашому нема кінця.\nВ життя Вас більше не вернуть,\nбо сил таких, на жаль, нема' },
  { cat: 'zahalni',   text: 'Не стримати сліз нам ніколи,\nбо важко повірити в те,\nщо ти не прийдеш вже додому.\nТвій дім тепер – небо святе...' },
  { cat: 'zahalni',   text: 'Вогонь життя неждано згас,\nпечаль і смуток серце ранять.\nНизький уклін тобі від нас\nі вічна пам’ять...' },
  { cat: 'zahalni',   text: 'Вскорботі голови схиляємо,\nсумуємо, любим, пам’ятаємо' },
  { cat: 'zahalni',   text: 'Неждано і рано пішла ти з життя,\nзалишила біль ти у наших серцях' },
  { cat: 'zahalni',   text: 'Помирають батьки.\nВідлітають від нас журавлями,\nтільки стомлені руки, як крила, складуть до грудей.\nБуде спогад – свіча переходити в завтрашній день' },
  { cat: 'zahalni',   text: 'Ми прийдемо сюди,\nпокладемо тут квіти.\nДуже важко, рідненька,\nнам без тебе прожити' },
  { cat: 'viiskovym', text: 'Вічна пам’ять і важкий біль втрати\nназавжди залишаться в наших серцях' },
  { cat: 'viiskovym', text: 'Прости за те, що не зуміли\nтебе від смерті зберегти.\nЗа те, що всі осиротіли,\nза все, за все ти нас прости' },
  { cat: 'viiskovym', text: 'Мій син-герой...\nГЕРОЇ НЕ ВМИРАЮТЬ' },
  { cat: 'viiskovym', text: 'Життя — єдина мить,\nдля смерті — вічність ціла...' },
  { cat: 'viiskovym', text: 'Відлітають лелеки у вирій\nі журливо так кличуть мене.\nАле дім мій – темна могила\nне пускає до доньки і друзів мене.\nПам’ятаємо, любимо повік' },
  { cat: 'viiskovym', text: 'Боже, дай, щоб з тої крові,\nщо землю зросила,\nще зійшла нам добра воля\nі слава, і сила' },
  { cat: 'viiskovym', text: 'І горів, і палав, і страждав він для неї одної' },
  { cat: 'viiskovym', text: 'Я смертю вирізьби:\nОдне святе є в світі – кров людей хоробрих' },
  { cat: 'relihiini', text: 'Пом’яни мене, Господи,\nколи прийдеш у Царствії Твоїм' },
  { cat: 'relihiini', text: 'Хай ангел Господній\nхранить твою душу.\nХай царство небесне\nГосподь тобі дасть' },
  { cat: 'relihiini', text: 'Свята Марія, мати Божа,\nмолись за нас, грішних,\nнині й в годину смерті нашої. Амінь' },
  { cat: 'relihiini', text: 'Не буде ні хвороб, ні печалі,\nні зітхання, але життя безконечне' },
  { cat: 'relihiini', text: 'Боже! Милостив будь\nдуші раба Твоєго' },
  { cat: 'relihiini', text: 'Хай буде воля Твоя, Боже!' },
  { cat: 'relihiini', text: 'Тихо гілки не шуміть,\nдитя моє не будіть.\nМолімо господа бога\nдушу твою берегти' },
  { cat: 'relihiini', text: 'Благословляю Господа всякчас' },
  { cat: 'vidomi',    text: 'Світ ловив мене, але не спіймав\n— На могилі Г. Сковороди' },
  { cat: 'vidomi',    text: 'Жив. Любив. Страждав\n— На могилі Стендаля' },
  { cat: 'vidomi',    text: 'Гірким сміхом своїм засміюсь\n— На могилі М. Гоголя' },
  { cat: 'vidomi',    text: 'Мене вже серце не болить\n— На могилі Н. Кобринської' },
  { cat: 'vidomi',    text: 'Смерть — найкращий лікар всіх хвороб\n— На могилі Свенцицького' },
  { cat: 'vidomi',    text: 'Зупинися, перехожий.\nНе топчи мій прах.\nБачиш ти, що я вже вдома,\nа ти ще в гостях' },
  { cat: 'vidomi',    text: 'Ми просто йшли,\nу нас нема зерна неправди за собою...' },
]

export function EpitaphsGrid() {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all' ? EPITAPHS : EPITAPHS.filter(e => e.cat === filter)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`font-body text-[11px] tracking-widest uppercase px-4 py-1.5 border transition-all duration-200 ${
              filter === s.id
                ? 'border-gold text-gold bg-gold/10'
                : 'border-white/20 text-cream/70 hover:border-gold/40 hover:text-cream'
            }`}
          >
            {s.label}
          </button>
        ))}
        <span className="ml-auto font-body text-[11px] text-white/80 uppercase tracking-widest self-center">
          {visible.length} написів
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((e, i) => (
          <div
            key={i}
            className="group relative border border-white/15 p-6 hover:border-gold/50 hover:bg-white/[0.03] transition-all duration-300 cursor-default"
          >
            <div className="font-display text-4xl text-gold/60 leading-none mb-3 select-none">
              &ldquo;
            </div>
            <p className="font-body text-sm text-white leading-relaxed whitespace-pre-line">
              {e.text}
            </p>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-gold/40
                            group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>

      <p className="mt-10 text-center font-body text-xs text-white/60 tracking-wider">
        * Оберіть напис і зв’яжіться з нами — ми виръємо його на граніті
      </p>
    </div>
  )
}
