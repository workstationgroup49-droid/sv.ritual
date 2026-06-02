/**
 * Скрипт для автоматичного заповнення товарів з Supabase Storage
 *
 * Запуск:
 *   npx tsx seed-products.ts
 *
 * Потрібно:
 *   npm install @supabase/supabase-js tsx --save-dev
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL     = 'https://gmcgzlctynqcfcrieoyp.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY2d6bGN0eW5xY2Zjcmllb3lwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA2ODM2MywiZXhwIjoyMDk1NjQ0MzYzfQ._QA4niC7wLX5rQpG8-f_GFeePyAAt3RDcfX0IMNHSCU'
const BUCKET           = 'upline1'
const DEFAULT_PRICE    = 10000 // в копійках — 10000 = 100.00 грн, або якщо ціни в грн то 10000 грн

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// -------------------------------------------------------
// Налаштування категорій
// -------------------------------------------------------
const CATEGORIES: Record<string, {
  slug:        string
  namePrefix:  string   // "Дитячі пам'ятники №"
  description: string
}> = {
  children: {
    slug:       'children',
    namePrefix: "Дитячий пам'ятник №",
    description: "Найкращі пам'ятники з натурального граніту. Дитячі пам'ятники виготовляються з особливою турботою та ніжністю — з м'якими формами, ніжним різьбленням та символікою, що відображає чистоту та світлість.",
  },
  crosses: {
    slug:       'crosses',
    namePrefix: "Пам'ятник з хрестом №",
    description: "Найкращі пам'ятники з натурального граніту. Пам'ятники з хрестами поєднують православну традицію з витонченим гранітним виконанням — символ віри та вічної пам'яті.",
  },
  forone: {
    slug:       'forone',
    namePrefix: "Пам'ятник на одного №",
    description: "Найкращі пам'ятники з натурального граніту. Одиночні пам'ятники — класичне рішення для вшанування пам'яті близької людини, виготовлені з довговічного полірованого граніту.",
  },
  horizontal: {
    slug:       'horizontal',
    namePrefix: "Горизонтальний пам'ятник №",
    description: "Найкращі пам'ятники з натурального граніту. Горизонтальні гранітні пам'ятники відрізняються стриманою елегантністю та стабільністю — сучасний стиль у поєднанні з вічним матеріалом.",
  },
  military: {
    slug:       'military',
    namePrefix: "Пам'ятник для військового №",
    description: "Найкращі пам'ятники з натурального граніту. Пам'ятники для військових виготовляються з особливою честю та повагою — з державною символікою, зірками та відповідними гравюрами.",
  },
  mixed: {
    slug:       'mixed',
    namePrefix: "Комбінований пам'ятник №",
    description: "Найкращі пам'ятники з натурального граніту. Комбіновані пам'ятники поєднують різні породи граніту та фактури — оригінальне індивідуальне рішення для створення неповторного меморіалу.",
  },
  rizbl: {
    slug:       'rizbl',
    namePrefix: "Різьблений пам'ятник №",
    description: "Найкращі пам'ятники з натурального граніту. Різьблені пам'ятники — справжній витвір мистецтва з детальним ручним різьбленням по граніту, квітковими орнаментами та індивідуальними мотивами.",
  },
}

// -------------------------------------------------------
// Допоміжні функції
// -------------------------------------------------------

function getPublicUrl(folder: string, filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folder}/${filename}`
}

async function listFiles(folder: string): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(folder, { limit: 500, sortBy: { column: 'name', order: 'asc' } })

  if (error) {
    console.error(`  ❌ Помилка читання папки "${folder}":`, error.message)
    return []
  }

  return (data ?? [])
    .filter(f => f.name && /\.(jpg|jpeg|png|webp)$/i.test(f.name))
    .map(f => f.name)
}

async function insertProduct(params: {
  name:        string
  description: string
  price:       number
  category:    string
  image_url:   string
  sort_order:  number
}): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .insert({
      name:        params.name,
      description: params.description,
      price:       params.price,
      category:    params.category,
      image_url:   params.image_url,
      in_stock:    true,
      sort_order:  params.sort_order,
    })

  if (error) {
    console.error(`  ❌ Помилка вставки "${params.name}":`, error.message)
    return false
  }
  return true
}

// -------------------------------------------------------
// Головна функція
// -------------------------------------------------------
async function main() {
  console.log('🚀 Починаємо заповнення товарів...\n')

  let totalInserted = 0
  let totalSkipped  = 0

  for (const [folder, config] of Object.entries(CATEGORIES)) {
    console.log(`📁 Папка: ${folder} (категорія: ${config.slug})`)

    const files = await listFiles(folder)

    if (files.length === 0) {
      console.log(`  ⚠️  Файлів не знайдено — пропускаємо\n`)
      continue
    }

    console.log(`  Знайдено файлів: ${files.length}`)

    let inserted = 0
    for (let i = 0; i < files.length; i++) {
      const filename  = files[i]
      const number    = i + 1
      const name      = `${config.namePrefix}${number}`
      const image_url = getPublicUrl(folder, filename)

      const ok = await insertProduct({
        name,
        description: config.description,
        price:       DEFAULT_PRICE,
        category:    config.slug,
        image_url,
        sort_order:  i,
      })

      if (ok) {
        inserted++
        process.stdout.write(`  ✅ ${name}\n`)
      } else {
        totalSkipped++
      }
    }

    totalInserted += inserted
    console.log(`  Додано: ${inserted}/${files.length}\n`)
  }

  console.log('─────────────────────────────')
  console.log(`✨ Готово! Додано товарів: ${totalInserted}, помилок: ${totalSkipped}`)
}

main().catch(console.error)
