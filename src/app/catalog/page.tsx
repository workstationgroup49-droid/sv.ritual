'use client'

import { useProducts } from '@/hooks/useProducts'
import { useCatalogFilter } from '@/hooks/useCatalogFilter'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterPanel } from '@/components/catalog/FilterPanel'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { SectionTitle } from '@/components/ui/SectionTitle'

export default function CatalogPage() {
  const { products, isLoading } = useProducts()

  const {
    search, setSearch,
    category, setCategory,
    sort, setSort,
    inStock, setInStock,
    filtered,
    total,
  } = useCatalogFilter(products)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-obsidian pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <SectionTitle
            eyebrow="Ритуальні товари"
            title="Каталог"
            subtitle="Широкий вибір товарів для гідного прощання"
            className="pt-10"
          />

          <div className="mb-8">
            <SearchBar value={search} onChange={setSearch} />
          </div>

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

            <div className="flex-1">
              <ProductGrid products={filtered} isLoading={isLoading} />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
