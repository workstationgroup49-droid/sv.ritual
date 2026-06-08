'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import { useCatalogFilter } from '@/hooks/useCatalogFilter'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterPanel } from '@/components/catalog/FilterPanel'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { CategoryQuickNav } from '@/components/catalog/CategoryQuickNav'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProductCategory } from '@/types/product'

function CatalogContent() {
  const { products, isLoading } = useProducts()
  const searchParams = useSearchParams()

  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    inStock,
    setInStock,
    filtered,
    total,
  } = useCatalogFilter(products)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) {
      setCategory(cat as ProductCategory | 'all')
    }
  }, [searchParams, setCategory])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-obsidian pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle
            eyebrow="Ритуальні товари"
            title="Каталог"
            subtitle="Широкий вибір товарів для гідного прощання"
            className="pt-10"
          />

          <div className="mb-6">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <CategoryQuickNav activeCategory={category} onSelect={setCategory} />

          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="w-full lg:w-56 shrink-0">
              <FilterPanel
                category={category}
                sort={sort}
                inStock={inStock}
                onCategory={setCategory}
                onSort={setSort}
                onInStock={setInStock}
                total={total}
              />
            </aside>

            <div className="flex-1" id="product-grid">
              <ProductGrid products={filtered} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <CatalogContent />
    </Suspense>
  )
}