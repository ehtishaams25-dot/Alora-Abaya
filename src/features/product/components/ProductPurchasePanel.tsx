import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { type ProductDress } from '../../../data/dressesData'
import { type ProductDetailState, type ProductDetailActions } from '../types'
import { ProductTrustIndicators } from './ProductTrustIndicators'

interface ProductPurchasePanelProps {
  product: ProductDress
  state: ProductDetailState
  actions: ProductDetailActions
  isArabic: boolean
  isModal?: boolean
  onClose?: () => void
}

export function ProductPurchasePanel({
  product,
  state,
  actions,
  isArabic,
  isModal = false,
  onClose
}: ProductPurchasePanelProps) {
  const { t } = useTranslation()

  const title = isArabic ? (product.nameAr || product.name) : product.name
  const desc = isArabic ? (product.descriptionAr || product.description) : product.description
  const categoryLabel = isArabic ? product.categoryAr : product.category
  const fabricLabel = isArabic ? product.fabricAr : product.fabric
  const availabilityLabel = isArabic ? product.availabilityAr : product.availability

  return (
    <div className={isModal
      ? "bg-transparent p-0 font-sans w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto no-scrollbar"
      : "bg-cream p-5 sm:p-6 lg:p-7 rounded-3xl border border-border2/80 shadow-xs font-sans w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto no-scrollbar"
    }>
      <div>
        {/* Category & Availability Header */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-mocha mb-2">
          <span>{categoryLabel} • {fabricLabel}</span>
          <span className={`font-medium ${product.availability === 'In Stock' ? 'text-success' : 'text-taupe'}`}>
            {availabilityLabel}
          </span>
        </div>

        {/* Optional link to Full Product Detail Page when inside Quick View Modal */}
        {isModal && (
          <div className="mb-2">
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-[11px] uppercase tracking-[0.18em] text-walnut hover:text-espresso underline underline-offset-4 transition-colors font-medium flex items-center gap-1"
            >
              <span>{t('product.viewFullDetails', isArabic ? 'عرض الصفحة الكاملة للقطعة' : 'View Full Editorial Page')}</span>
              <span aria-hidden="true" className="rtl:rotate-180">→</span>
            </Link>
          </div>
        )}

        {/* Product Title */}
        <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-espresso font-normal tracking-tight leading-snug mb-2.5">
          {title}
        </h1>

        {/* Price & Rating Row */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border2/70">
          <span className="text-lg sm:text-xl font-semibold text-espresso tracking-wide">
            {product.price} {t('common.priceAed', 'SAR')}
          </span>
          <div className="flex items-center gap-1 bg-sand border border-border2 px-2.5 py-0.5 rounded-full text-[11px] text-mocha font-medium">
            <span className="text-taupe">★</span>
            <span className="font-semibold text-espresso">{product.rating}</span>
            <span className="text-mocha/60">({product.reviewsCount} {t('product.reviews', 'reviews')})</span>
          </div>
        </div>

        {/* Editorial Short Description (Constrained to fit one section without overflow) */}
        <p className="text-xs sm:text-sm text-mocha leading-relaxed mb-4 line-clamp-3 sm:line-clamp-4">
          {desc}
        </p>
        
        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] text-espresso font-medium uppercase tracking-wider mb-2">
              <span>{t('product.colorLabel', isArabic ? 'اللون المختار:' : 'Color Selection:')}</span>
              <span className="text-mocha font-normal">{state.colorName}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((hex, idx) => {
                const isSelected = state.selectedColorIdx === idx
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => actions.setSelectedColorIdx(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'border-espresso scale-110 shadow-sm ring-2 ring-espresso/15 ring-offset-2 ring-offset-cream'
                        : 'border-border2 hover:scale-105'
                    }`}
                    style={{ backgroundColor: hex }}
                    title={isArabic ? product.colorNamesAr?.[idx] : product.colorNames?.[idx]}
                  >
                    {isSelected && (
                      <span className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${
                        hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === '#faf9f6'
                          ? 'bg-espresso'
                          : 'bg-cream'
                      }`} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] text-espresso font-medium uppercase tracking-wider mb-2">
              <span>{t('product.sizeLabel', isArabic ? 'المقاس المختار:' : 'Select Size:')}</span>
              <button
                type="button"
                className="text-taupe hover:text-espresso underline underline-offset-4 cursor-pointer text-[10px] sm:text-[11px] transition-colors"
              >
                {t('product.sizeGuide', isArabic ? 'دليل القياسات' : 'Size Guide')}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = state.selectedSize === size
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => actions.setSelectedSize(size)}
                    className={`min-w-[42px] px-3.5 py-2 rounded-xl text-xs uppercase font-medium tracking-wider border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-espresso text-cream border-espresso shadow-sm scale-102'
                        : 'bg-sand text-espresso border-border2 hover:border-walnut'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Purchasing Actions Panel */}
      <div className="mt-auto pt-3 border-t border-border2/80 shrink-0">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={actions.handleAddToBag}
            className={`flex-1 rounded-full py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              state.isAddedToast
                ? 'bg-success text-cream shadow-md'
                : 'bg-espresso text-cream hover:bg-ink hover:shadow-lg'
            }`}
          >
            {state.isAddedToast ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-cream inline-block animate-pulse" />
                <span>{t('product.addedToBag', isArabic ? 'تمت الإضافة للحقيبة' : 'Added to Bag')}</span>
              </>
            ) : (
              <>
                <span>{t('product.addToBag', isArabic ? 'أضف إلى الحقيبة' : 'Add to Bag')}</span>
                <span aria-hidden="true" className="text-sm leading-none">+</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={actions.handleWishlistToggle}
            className={`px-5 py-3.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${
              state.inWishlist
                ? 'bg-sand border-walnut text-walnut shadow-sm'
                : 'border-border2 bg-transparent text-espresso hover:border-walnut hover:text-walnut'
            }`}
            title={state.inWishlist ? t('product.inWishlist', 'Saved in Wishlist') : t('product.saveToWishlist', 'Save to Wishlist')}
            aria-label={state.inWishlist ? t('product.inWishlist', 'Saved in Wishlist') : t('product.saveToWishlist', 'Save to Wishlist')}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${state.inWishlist ? 'fill-walnut scale-110' : 'fill-none stroke-current'}`}
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>

        {/* Minimal Trust Indicators Row */}
        <ProductTrustIndicators />
      </div>
    </div>
  )
}
