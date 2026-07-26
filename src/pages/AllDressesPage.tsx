import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { QuickViewModal } from '@/components/QuickViewModal'
import { useShop } from '@/providers/ShopProvider'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ProductDress, DRESSES_DATA } from '@/data/dressesData'

import {
  useCatalogFilters,
  CatalogProductCard,
  CatalogRecentlyViewedCard,
  CatalogSidebarFilters,
  CatalogMobileFilters
} from '@/features/catalog'

export function AllDressesPage() {
  const { t, i18n } = useTranslation()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop()
  const isArabic = i18n.language.startsWith('ar')

  useDocumentTitle(isArabic ? 'الورا للفساتين | كافة العبايات والفساتين الفاخرة' : 'Alora | All Dresses & Gowns')

  // Catalog Filters State (from new feature module)
  const filters = useCatalogFilters()

  // Mobile Bottom Sheet Filter State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false)

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)

  // Recently Viewed State (stored in localStorage + state)
  const [recentlyViewed, setRecentlyViewed] = useState<ProductDress[]>(() => {
    const saved = localStorage.getItem('alora_recently_viewed')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* fallback */ }
    }
    return DRESSES_DATA.slice(0, 6)
  })

  // Toast State for Quick Add
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleProductInteract = (product: ProductDress) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      const updated = [product, ...filtered].slice(0, 8)
      localStorage.setItem('alora_recently_viewed', JSON.stringify(updated))
      return updated
    })
  }

  const handleQuickAdd = (e: React.MouseEvent, product: ProductDress) => {
    e.stopPropagation()
    handleProductInteract(product)
    const defaultColor = product.colorNames?.[0] || "Signature"
    const defaultSize = product.sizes?.[0] || "S"
    addToCart(product, `${defaultColor} (${product.colors?.[0] || '#3B2F2F'})`, `Size ${defaultSize}`)
    setToastMessage(isArabic ? `تمت إضافة "${product.nameAr || product.name}" إلى الحقيبة` : `Added "${product.name}" to bag`)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  return (
    <div className="min-h-screen bg-sand text-espresso font-sans flex flex-col selection:bg-taupe/20 selection:text-espresso">
      {/* Navigation Top Bar */}
      <Navigation />

      {/* Toast Notification for Quick Add */}
      {toastMessage && (
        <div className="fixed bottom-6 sm:bottom-8 end-6 sm:end-8 z-[100] bg-espresso text-cream px-6 py-3.5 rounded-full shadow-2xl text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2.5 animate-fade-up pointer-events-auto border border-cream/10">
          <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area: Persistent Left Sidebar + Spacious Product Grid */}
      <main className="flex-1 container-alora px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Header Bar (when sidebar is hidden on mobile screens) */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border2/60 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-espresso font-semibold">
              {isArabic ? `${filters.filteredProducts.length} قطعة` : `${filters.filteredProducts.length} Pieces`}
            </span>
            {filters.activeFilterCount > 0 && (
              <span className="bg-cream border border-border2 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-mocha font-medium">
                ({filters.activeFilterCount})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="bg-espresso text-cream rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2 shadow-xs cursor-pointer hover:bg-ink transition-colors"
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <span>{isArabic ? 'تصفية وترتيب' : 'Filter & Sort'}</span>
          </button>
        </div>

        <div className="flex items-start gap-8 xl:gap-12">
          {/* Desktop Persistent Sidebar */}
          <aside data-lenis-prevent="true" aria-label="Filters" className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 border-e border-border2/80 pe-4 xl:pe-6 sticky top-[100px] h-[calc(100vh-120px)]">
            <div data-lenis-prevent="true" className="h-full overflow-y-auto custom-scrollbar overscroll-contain pr-2 pb-10">
              <CatalogSidebarFilters isArabic={isArabic} t={t} {...filters} />
            </div>
          </aside>




          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Active filters summary bar on desktop if filtered */}
            {filters.activeFilterCount > 0 && (
              <div className="hidden lg:flex items-center justify-between pb-6 mb-6 border-b border-border2/60 text-xs text-mocha">
                <span>
                  {isArabic ? `عرض ${filters.filteredProducts.length} من ${DRESSES_DATA.length} قطعة` : `Showing ${filters.filteredProducts.length} of ${DRESSES_DATA.length} Pieces`}
                </span>
                <button
                  type="button"
                  onClick={filters.clearAllFilters}
                  className="text-taupe hover:text-espresso underline underline-offset-4 font-medium transition-colors cursor-pointer"
                >
                  {isArabic ? 'مسح كافة الفلاتر' : 'Clear All Filters'}
                </button>
              </div>
            )}

            {filters.filteredProducts.length === 0 ? (
              /* Editorial Empty State */
              <div className="max-w-xl mx-auto text-center py-16 sm:py-24 animate-fade-up bg-cream/70 rounded-3xl border border-border2 p-6 sm:p-12">
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-full bg-sand border border-border2 flex items-center justify-center text-taupe">
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 stroke-current fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal mb-3">
                  {isArabic ? 'لم يتم العثور على فساتين' : 'No Dresses Found'}
                </h2>
                <p className="font-sans text-sm sm:text-base text-mocha leading-relaxed max-w-md mx-auto mb-8">
                  {isArabic
                    ? 'جربي تعديل خيارات التصفية أو استكشفي مجموعتنا الملكية الكاملة بدون قيود.'
                    : 'Try adjusting your filters or explore our complete collection.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={filters.clearAllFilters}
                    className="btn-primary px-8 py-3.5 w-full sm:w-auto"
                  >
                    {isArabic ? 'مسح كافة الفلاتر' : 'Clear Filters'}
                  </button>
                  <Link
                    to="/"
                    className="btn-secondary py-3.5 px-6 w-full sm:w-auto text-center"
                  >
                    {isArabic ? 'تصفح المجموعة' : 'Browse Collection'}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                    }
                  }}
                >
                  {filters.displayedProducts.map((item) => (
                    <motion.div key={item.id} variants={{
                      hidden: { opacity: 0, y: 40 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}>
                      <CatalogProductCard
                        item={item}
                        isArabic={isArabic}
                        t={t}
                        isInWishlist={isInWishlist}
                        addToWishlist={addToWishlist}
                        removeFromWishlist={removeFromWishlist}
                        handleQuickAdd={handleQuickAdd}
                        handleProductInteract={handleProductInteract}
                        setQuickViewProduct={setQuickViewProduct}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {filters.hasMore && (
                  <div className="mt-12 sm:mt-16 text-center animate-fade-up">
                    <button
                      type="button"
                      onClick={filters.handleLoadMore}
                      className="rounded-full bg-espresso text-cream hover:bg-ink px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      {isArabic
                        ? `تحميل المزيد من الفساتين (${filters.filteredProducts.length - filters.displayedProducts.length} باقية)`
                        : `Load More (${filters.filteredProducts.length - filters.displayedProducts.length} remaining)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Recently Viewed Carousel Section */}
      {recentlyViewed.length > 0 && (
        <section aria-label="Recently Viewed" className="py-12 sm:py-16 bg-sand border-t border-border2/60 overflow-hidden">
          <div className="container-alora px-4 sm:px-6 lg:px-8">
            <header className="mb-8 text-start flex items-center justify-between">
              <div>
                <span className="text-eyebrow text-walnut block mb-1">
                  {isArabic ? 'سجل تصفحكِ الفاخر' : 'YOUR BROWSING HISTORY'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal">
                  {isArabic ? 'شوهدت مؤخراً بالأتليه' : 'Recently Viewed'}
                </h2>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-mocha">
                {isArabic ? `${recentlyViewed.length} قطع` : `${recentlyViewed.length} Pieces`}
              </span>
            </header>

            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="absolute top-0 bottom-4 end-0 w-16 sm:w-28 bg-gradient-to-l rtl:bg-gradient-to-r from-sand via-sand/80 to-transparent pointer-events-none z-10" />

              <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 sm:gap-6 pb-4 pe-16 sm:pe-28">
                {recentlyViewed.map((item) => (
                  <CatalogRecentlyViewedCard
                    key={item.id}
                    item={item}
                    isArabic={isArabic}
                    t={t}
                    handleProductInteract={handleProductInteract}
                    setQuickViewProduct={setQuickViewProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Small Elegant Newsletter Section before Footer */}
      <section className="py-12 sm:py-16 bg-cream border-t border-border2/80 text-center px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <span className="text-eyebrow text-walnut block mb-2">
            {isArabic ? 'انضمي لدائرة كبار العميلات' : 'VIP ATELIER CIRCLE'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal mb-2.5">
            {isArabic ? 'ابقِ على تواصل واستلهام' : 'Stay Inspired'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-mocha leading-relaxed mb-8">
            {isArabic
              ? 'احصلي على وصول حصري ومبكر للمجموعات الملكية الجديدة والإصدارات الخالدة قبل الجميع.'
              : 'Receive exclusive access to new collections and timeless releases.'}
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder={isArabic ? 'أدخلي بريدكِ الإلكتروني الملكي...' : 'Enter your email address...'}
              className="input-underline text-center sm:text-start w-full sm:flex-1 py-2 text-sm"
            />
            <button
              type="submit"
              className="btn-primary py-3 px-8 w-full sm:w-auto flex-shrink-0 text-xs tracking-[0.2em]"
            >
              {isArabic ? 'انضمام' : 'Join'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Mobile Full-Height Bottom Sheet Filters & Sort */}
      <CatalogMobileFilters 
        isArabic={isArabic} 
        t={t} 
        isOpen={isMobileFiltersOpen} 
        onClose={() => setIsMobileFiltersOpen(false)} 
        filteredCount={filters.filteredProducts.length} 
        {...filters} 
      />
    </div>
  )
}
