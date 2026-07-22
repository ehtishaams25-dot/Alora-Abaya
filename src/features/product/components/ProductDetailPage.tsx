import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { type ProductDress } from '../../../data/dressesData'
import { QuickViewModal } from '../../../components/QuickViewModal'
import { useProductDetail } from '../hooks/useProductDetail'
import { ProductGallery } from './ProductGallery'
import { ProductPurchasePanel } from './ProductPurchasePanel'
import { ProductCraftsmanshipSection } from './ProductCraftsmanshipSection'
import { ProductDetailsAccordion } from './ProductDetailsAccordion'
import { ProductSizeGuidePreview } from './ProductSizeGuidePreview'
import { ProductEditorialGallery } from './ProductEditorialGallery'
import { ProductEditorialBreak } from './ProductEditorialBreak'
import { ProductYouMayAlsoLikeSection } from './ProductYouMayAlsoLikeSection'
import { ProductNewArrivalsCarousel } from './ProductNewArrivalsCarousel'
import { ProductBestSellersSection } from './ProductBestSellersSection'
import { ProductEditorialReviewsSection } from './ProductEditorialReviewsSection'
import { ProductRecentlyViewedSection } from './ProductRecentlyViewedSection'

interface ProductDetailPageProps {
  product: ProductDress
  isModal?: boolean
}

export function ProductDetailPage({ product, isModal = false }: ProductDetailPageProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')
  const [state, actions] = useProductDetail(product)
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)

  const title = isArabic ? (product.nameAr || product.name) : product.name
  const categoryLabel = isArabic ? product.categoryAr : product.category

  if (isModal) {
    return (
      <div className="bg-sand w-full h-full flex flex-col justify-center py-4 sm:py-6 lg:py-3 animate-[fadeIn_0.6s_ease-out] min-h-0 overflow-y-auto lg:overflow-hidden">
        <div className="container-alora flex flex-col lg:h-full lg:max-h-[740px] my-auto min-h-0">
          {/* Editorial Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-[11px] font-sans text-mocha mb-3 sm:mb-4 tracking-wider uppercase shrink-0">
            <Link to="/" className="hover:text-espresso transition-colors">
              {t('common.home', isArabic ? 'الرئيسية' : 'Home')}
            </Link>
            <span>/</span>
            <Link
              to={`/dresses?category=${encodeURIComponent(product.category)}`}
              className="hover:text-espresso transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-espresso font-medium truncate max-w-[220px] sm:max-w-xs">
              {title}
            </span>
          </nav>

          {/* Zero-Scroll One-Section Layout inside Modal on Desktop, scrollable on mobile */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-10 items-stretch flex-1 min-h-0 lg:overflow-hidden">
            <div className="w-full lg:w-7/12 xl:w-2/3 lg:h-full min-h-0 flex flex-col lg:overflow-hidden">
              <ProductGallery
                product={product}
                galleryViews={state.galleryViews}
                selectedImageIdx={state.selectedImageIdx}
                onSelectImage={actions.setSelectedImageIdx}
                isArabic={isArabic}
              />
            </div>

            <div className="w-full lg:w-5/12 xl:w-1/3 lg:h-full min-h-0 flex flex-col lg:overflow-hidden">
              <ProductPurchasePanel
                product={product}
                state={state}
                actions={actions}
                isArabic={isArabic}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col font-sans animate-[fadeIn_0.6s_ease-out] pb-20 lg:pb-0">
      {/* Main Product Hero Section: Perfectly sized to fill the remaining browser window under the navigation bar so the next section never peeks from below on desktop */}
      <section className="bg-sand w-full py-4 sm:py-6 lg:py-5 border-b border-border2/60 flex flex-col justify-center lg:h-[calc(100vh-120px)] lg:min-h-[580px]">
        <div className="container-alora flex flex-col lg:h-full flex-1 min-h-0 justify-center">
          {/* Editorial Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-[11px] font-sans text-mocha mb-3 sm:mb-4 tracking-wider uppercase shrink-0">
            <Link to="/" className="hover:text-espresso transition-colors">
              {t('common.home', isArabic ? 'الرئيسية' : 'Home')}
            </Link>
            <span>/</span>
            <Link
              to={`/dresses?category=${encodeURIComponent(product.category)}`}
              className="hover:text-espresso transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-espresso font-medium truncate max-w-[220px] sm:max-w-xs">
              {title}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 items-stretch flex-1 min-h-0 lg:overflow-hidden">
            {/* Left Column: Photography Gallery */}
            <div className="w-full lg:w-7/12 xl:w-2/3 lg:h-full min-h-0 flex flex-col lg:overflow-hidden">
              <ProductGallery
                product={product}
                galleryViews={state.galleryViews}
                selectedImageIdx={state.selectedImageIdx}
                onSelectImage={actions.setSelectedImageIdx}
                isArabic={isArabic}
              />
            </div>

            {/* Right Column: Purchasing Details Panel */}
            <div className="w-full lg:w-5/12 xl:w-1/3 lg:h-full min-h-0 flex flex-col lg:overflow-hidden">
              <ProductPurchasePanel
                product={product}
                state={state}
                actions={actions}
                isArabic={isArabic}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FABRIC & CRAFTSMANSHIP */}
      <ProductCraftsmanshipSection product={product} isArabic={isArabic} />

      {/* SECTION 2: PRODUCT DETAILS ACCORDION */}
      <ProductDetailsAccordion product={product} isArabic={isArabic} />

      {/* SECTION 3: SIZE GUIDE PREVIEW CARD */}
      <ProductSizeGuidePreview product={product} isArabic={isArabic} />

      {/* SECTION 4: EDITORIAL PRODUCT GALLERY */}
      <ProductEditorialGallery product={product} isArabic={isArabic} />

      {/* SECTION 5: EDITORIAL BREAK */}
      <ProductEditorialBreak isArabic={isArabic} />

      {/* SECTION 1: YOU MAY ALSO LIKE */}
      <ProductYouMayAlsoLikeSection
        currentProductId={product.id}
        isArabic={isArabic}
        onQuickView={setQuickViewProduct}
      />

      {/* SECTION 2: NEW ARRIVALS */}
      <ProductNewArrivalsCarousel
        currentProductId={product.id}
        isArabic={isArabic}
        onQuickView={setQuickViewProduct}
      />

      {/* SECTION 3: BEST SELLERS */}
      <ProductBestSellersSection
        currentProductId={product.id}
        isArabic={isArabic}
        onQuickView={setQuickViewProduct}
      />

      {/* SECTION 4: CUSTOMER REVIEWS */}
      <ProductEditorialReviewsSection isArabic={isArabic} />

      {/* SECTION 5: RECENTLY VIEWED */}
      <ProductRecentlyViewedSection
        currentProductId={product.id}
        isArabic={isArabic}
      />

      {/* Quick View Modal when triggered from any recommendation card */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Mobile Sticky Add to Bag Bar - Bottom Sticky with Large Touch Targets & Perfect Thumb Reach */}
      {!isModal && (
        <div className="block lg:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-xl border-t border-border2/80 px-4 py-3 shadow-[0_-8px_30px_rgba(59,47,47,0.08)] animate-[fadeUp_0.7s_ease-out_0.75s_both]">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-xs sm:text-sm text-espresso font-medium truncate">
                {title}
              </h4>
              <span className="text-xs text-mocha font-sans block mt-0.5 font-semibold">
                {product.price} <span className="text-[10px] font-normal">{t('common.priceAed', 'SAR')}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                actions.handleAddToBag()
                if (!state.selectedSize) {
                  window.scrollTo({ top: 380, behavior: 'smooth' })
                }
              }}
              className={`min-h-[46px] px-6 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 shrink-0 shadow-md cursor-pointer ${state.sizeError
                ? 'bg-[#8B2626] text-cream animate-shake'
                : 'bg-espresso text-cream hover:bg-ink'
                }`}
            >
              <span>
                {state.sizeError
                  ? (isArabic ? 'اختر المقاس أولاً ↑' : 'Select Size ↑')
                  : (isArabic ? 'أضف إلى الحقيبة +' : 'Add to Bag +')}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
