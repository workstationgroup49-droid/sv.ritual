'use client'

import Link from 'next/link'
import { useContactForm } from '@/hooks/useContactForm'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { Phone, MapPin, ChevronDown, Check } from 'lucide-react'

const PHONE         = '+380970187187'
const PHONE_DISPLAY = '+380 (97) 018-71-87'

const inputClass = `
  w-full bg-ash border border-white/10 text-cream placeholder-mist/50
  font-body text-sm px-4 py-3 outline-none
  focus:border-gold/40 focus:bg-white/5
  transition-all duration-300
`

const services = [
  {
    number: '01',
    title: 'Організація та проведення поховань',
    description: 'Допомагаємо організувати поховання від першого звернення до завершення всіх необхідних процедур. Беремо на себе вирішення організаційних питань та супроводжуємо родину на кожному етапі.',
    features: ['Оформлення всіх документів', 'Підготовка тіла до похорону', 'Організація церемонії прощання', 'Координація всіх служб', 'Супровід на кожному етапі'],
    image: '/images/service-funeral.jpg',
  },
  {
    number: '02',
    title: 'Елітні катафалки',
    description: 'Надаємо сучасний спеціалізований транспорт для перевезення померлих та супроводу похоронної процесії. Гарантуємо охайний вигляд транспорту та професійне обслуговування.',
    features: ['Представницькі автомобілі преміум-класу', 'Досвідчені та тактовні водії', 'Будь-який маршрут у межах регіону', 'Повна підготовка транспорту', 'Своєчасне прибуття'],
    image: '/images/service-hearse.png',
  },
  {
    number: '03',
    title: 'Кремація',
    description: 'Організовуємо кремацію та допомагаємо з оформленням необхідних документів. Надаємо консультації щодо всіх етапів проведення процедури та допомагаємо з вибором урни.',
    features: ['Оформлення дозволів та документів', 'Широкий вибір урн', 'Транспортування до крематорію', 'Організація прощальної церемонії', 'Повний консультаційний супровід'],
    image: '/images/service-cremation.jpg',
  },
  {
    number: '04',
    title: 'Перевезення померлих по Україні',
    description: 'Здійснюємо транспортування померлих між містами та областями України. Допомагаємо з оформленням документів та забезпечуємо дотримання всіх необхідних санітарних вимог.',
    features: ['По всій території України', 'Дотримання санітарних норм', 'Швидке реагування на виклик', 'Оформлення транспортних документів', 'Спеціалізований транспорт'],
    image: '/images/service-transport.png',
  },
  {
    number: '05',
    title: 'Підготовка місця поховання',
    description: 'Виконуємо копання могил та підготовку місця поховання відповідно до вимог кладовищ та побажань родини. Ручна та механізована копка, впорядкування після церемонії.',
    features: ['Ручна та механізована копка', 'Робота на будь-якому кладовищі', 'Відповідність вимогам кладовища', 'Впорядкування після церемонії', 'Швидко та якісно'],
    image: '/images/service-grave.png',
  },
]

const monumentTypes = [
  "Одинарні пам'ятники",
  "Подвійні пам'ятники",
  'Сімейні меморіальні комплекси',
  "Військові пам'ятники",
  "Дитячі пам'ятники",
  'Ексклюзивні авторські проєкти',
]

const artFeatures = [
  'Портретне гравіювання',
  'Кольорові фотографії на граніті',
  'Написи та епітафії',
  'Художнє різьблення',
  'Авторські ескізи та макети',
]

export function RitualServicesPage() {
  const { formData, isSubmitting, isSubmitted, handleChange, handleSubmit } = useContactForm()

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="deco-line font-body text-gold text-[11px] tracking-[0.5em] uppercase mb-6">
            Ритуальна служба · 24/7
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight">
            Ритуальні послуги
          </h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="font-body text-mist text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Повний спектр ритуальних послуг з повагою та гідністю. Ми поруч у найважчу хвилину —
            беремо на себе всі організаційні питання, щоб ви могли гідно попрощатись з близькою людиною.
          </p>
          <a href={`tel:${PHONE}`}
             className="inline-flex items-center gap-3 bg-bordeaux hover:bg-burgundy text-cream
                        font-body text-sm tracking-widest uppercase px-10 py-4
                        transition-all duration-300 mb-4">
            <Phone size={16} />
            Зателефонувати — {PHONE_DISPLAY}
          </a>
          <p className="font-body text-mist/40 text-xs tracking-wider">Цілодобово, без вихідних</p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <ChevronDown size={18} className="text-gold/30 animate-bounce" />
        </div>
      </section>

      {/* ═══ ПОСЛУГИ — у стилі AboutSection ═══ */}
      <section className="bg-obsidian">
        {services.map((service, i) => {
          const isEven = i % 2 === 0
          return (
            <div key={service.number} className="border-t border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:grid-flow-dense'}`}>

                  {/* Фото */}
                  <div className={`relative h-72 lg:h-auto min-h-[380px] overflow-hidden ${isEven ? '' : 'lg:col-start-2'}`}>
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
                    ) : (
                      /* Плейсхолдер — замінити на фото */
                      <div className="absolute inset-0 bg-ash flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 border border-gold/20 flex items-center justify-center">
                          <span className="font-display text-3xl text-gold/20">{service.number}</span>
                        </div>
                        <span className="font-body text-xs text-mist/30 tracking-widest uppercase">Фото буде додано</span>
                      </div>
                    )}
                    {/* Градієнт */}
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent to-obsidian/60`} />
                  </div>

                  {/* Контент */}
                  <div className={`flex flex-col justify-center px-10 py-16 lg:py-20 bg-obsidian ${isEven ? 'lg:pl-16 lg:pr-10' : 'lg:pr-16 lg:pl-10 lg:col-start-1 lg:row-start-1'}`}>

                    {/* Номер + роздільник */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/50">
                        {service.number}
                      </span>
                      <div className="flex-1 h-px bg-gold/15" />
                      <span className="text-gold/20 text-xs">◆</span>
                    </div>

                    {/* Назва */}
                    <h2 className="font-display text-3xl md:text-4xl font-light text-cream mb-5 leading-snug">
                      {service.title}
                    </h2>

                    {/* Опис */}
                    <p className="font-body text-mist text-sm leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Список */}
                    <ul className="space-y-3 mb-10">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-gold mt-1 shrink-0">◆</span>
                          <span className="font-body text-sm text-mist/80">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div>
                      <a href={`tel:${PHONE}`}
                         className="inline-flex items-center gap-2 border border-gold/30 text-gold
                                    font-body text-xs tracking-widest uppercase px-7 py-3
                                    hover:bg-gold/5 hover:border-gold transition-all duration-300">
                        <Phone size={12} />
                        Зателефонувати
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* ═══ ПАМ'ЯТНИКИ ═══ */}
      <section className="py-24 bg-obsidian border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Ліво */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/50">06</span>
                <div className="flex-1 h-px bg-gold/15" />
                <span className="text-gold/20 text-xs">◆</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-6 leading-tight">
                Виготовлення<br />
                <span className="text-gold/70 italic">пам&apos;ятників</span>
              </h2>
              <div className="w-12 h-px bg-bordeaux/60 mb-6" />
              <p className="font-body text-mist text-sm leading-relaxed mb-8">
                Окрім ритуальних послуг, ми спеціалізуємося на виготовленні пам&apos;ятників та меморіальних
                комплексів із натурального граніту. Власне виробництво — без посередників та переплат.
                Індивідуальний підхід до кожного замовлення.
              </p>

              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/60 mb-5">Пропонуємо</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {monumentTypes.map((type, i) => (
                  <div key={i}
                    className="flex items-center gap-3 bg-graphite border border-white/5
                               px-4 py-3 hover:border-gold/20 transition-colors duration-300">
                    <span className="text-gold/50 shrink-0">◆</span>
                    <span className="font-body text-sm text-mist">{type}</span>
                  </div>
                ))}
              </div>

              {/* Кнопки */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalog"
                  className="flex items-center justify-center gap-2 bg-bordeaux hover:bg-burgundy text-cream
                             font-body text-xs tracking-widest uppercase px-8 py-3.5
                             transition-colors duration-300">
                  Каталог
                </Link>
                <Link href="/exhibition"
                  className="flex items-center justify-center gap-2 border border-gold/30 text-gold
                             font-body text-xs tracking-widest uppercase px-8 py-3.5
                             hover:bg-gold/5 hover:border-gold transition-all duration-300">
                  Виставка пам&apos;ятників
                </Link>
              </div>
            </div>

            {/* Право — художнє оформлення */}
            <div>
              <div className="bg-graphite border border-white/5 p-8 mb-6">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">
                  Художнє оформлення
                </p>
                <p className="font-body text-mist text-sm leading-relaxed mb-6">
                  Створюємо індивідуальний вигляд пам&apos;ятника завдяки професійному художньому оформленню.
                  Кожен виріб — це унікальна робота, що зберігає пам&apos;ять.
                </p>
                <ul className="space-y-3">
                  {artFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 border border-gold/30 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-gold" />
                      </div>
                      <span className="font-body text-sm text-mist">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-2 gap-px bg-white/5">
                {[
                  { value: '10+',    label: 'Років у виробництві' },
                  { value: '1 000+', label: "Виготовлених пам'ятників" },
                  { value: '100%',   label: 'Натуральний граніт' },
                  { value: '5★',     label: 'Якість та гарантія' },
                ].map(stat => (
                  <div key={stat.label} className="bg-graphite px-6 py-6">
                    <p className="font-display text-3xl font-light text-gold mb-1">{stat.value}</p>
                    <p className="font-body text-mist/60 text-xs tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 bg-bordeaux/10 border-y border-bordeaux/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-body text-gold text-xs tracking-[0.4em] uppercase mb-4">Потрібна допомога?</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-6 leading-tight">
            Ми готові допомогти<br />прямо зараз
          </h2>
          <p className="font-body text-mist text-base leading-relaxed max-w-xl mx-auto mb-10">
            Розуміємо, наскільки важливо отримати підтримку та професійну консультацію у складний момент.
            Зв&apos;яжіться з нами у будь-який час — наші спеціалісти готові допомогти цілодобово.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href={`tel:${PHONE}`}
               className="flex items-center gap-3 bg-bordeaux hover:bg-burgundy text-cream
                          font-body text-sm tracking-widest uppercase px-10 py-4
                          transition-all duration-300 w-full sm:w-auto justify-center">
              <Phone size={16} />
              Зателефонувати зараз
            </a>
            <a href="#contact-form"
               className="flex items-center gap-3 border border-gold/30 text-gold
                          font-body text-sm tracking-widest uppercase px-10 py-4
                          hover:bg-gold/5 hover:border-gold
                          transition-all duration-300 w-full sm:w-auto justify-center">
              Залишити заявку
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[
              { value: '24/7',   label: 'Цілодобово' },
              { value: '10+',    label: 'Років досвіду' },
              { value: '1 000+', label: 'Родин довірились' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl text-gold font-light">{stat.value}</p>
                <p className="font-body text-mist/60 text-xs tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ФОРМА ЗВ'ЯЗКУ ═══ */}
      <section id="contact-form" className="py-20 bg-graphite border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div>
              <SectionTitle
                eyebrow="Зв'яжіться з нами"
                title="Ми завжди поруч"
                centered={false}
              />
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-mist/50 uppercase tracking-wider mb-1">Телефон</p>
                    <a href={`tel:${PHONE}`}
                       className="font-body text-cream text-lg hover:text-gold transition-colors duration-300">
                      {PHONE_DISPLAY}
                    </a>
                    <p className="font-body text-mist/50 text-xs mt-0.5">24/7, цілодобово</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-mist/50 uppercase tracking-wider mb-1">Адреса</p>
                    <p className="font-body text-cream text-sm">м. Світловодськ, вул. Миру, 48(б)</p>
                  </div>
                </div>
              </div>
              <div className="bg-ash border border-white/5 p-6">
                <p className="font-body text-xs text-gold tracking-widest uppercase mb-3">Важливо знати</p>
                <p className="font-body text-mist text-sm leading-relaxed">
                  Після звернення наш спеціаліст зв&apos;яжеться з вами протягом декількох хвилин.
                  Ми розуміємо, що кожна ситуація унікальна, тому підходимо індивідуально.
                </p>
              </div>
            </div>

            <div className="bg-ash border border-white/5 p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <p className="text-gold text-4xl mb-4">◆</p>
                  <p className="font-display text-2xl text-cream mb-3">Дякуємо за звернення</p>
                  <p className="font-body text-mist text-sm">
                    Наш спеціаліст зв&apos;яжеться з вами найближчим часом.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="font-display text-xl text-cream mb-6">Залишити заявку</p>
                  <div>
                    <label className="font-body text-xs tracking-wider text-mist/60 uppercase mb-2 block">
                      Ваше ім&apos;я *
                    </label>
                    <input type="text" name="name" required placeholder="Іван Іваненко"
                      value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-wider text-mist/60 uppercase mb-2 block">
                      Телефон *
                    </label>
                    <input type="tel" name="phone" required placeholder="+380 (___) ___-__-__"
                      value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-wider text-mist/60 uppercase mb-2 block">
                      Повідомлення
                    </label>
                    <textarea name="message" rows={4}
                      placeholder="Опишіть ситуацію або поставте запитання..."
                      value={formData.message} onChange={handleChange}
                      className={inputClass + ' resize-none'} />
                  </div>
                  <Button type="submit" variant="primary"
                    className="w-full justify-center py-4"
                    disabled={isSubmitting}>
                    {isSubmitting ? 'Надсилаємо...' : 'Надіслати заявку'}
                  </Button>
                  <p className="font-body text-mist/40 text-xs text-center">
                    Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
