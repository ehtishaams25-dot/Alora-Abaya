import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { type ProductDress } from '../../../data/dressesData'
import { useShop } from '../../../providers/ShopProvider'
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
  const { openSizeGuide } = useShop()

  const title = isArabic ? (product.nameAr || product.name) : product.name
  const desc = isArabic ? (product.descriptionAr || product.description) : product.description
  const categoryLabel = isArabic ? product.categoryAr : product.category
  const fabricLabel = isArabic ? product.fabricAr : product.fabric

  return (
    <div className={isModal
      ? "bg-transparent p-0 font-sans w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto no-scrollbar"
      : "bg-cream p-4 sm:p-5 lg:p-5 rounded-3xl border border-border2/80 shadow-xs font-sans w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto no-scrollbar"
    }>
      <div>
        {/* Category & Fabric Header */}
        <div className="text-[11px] uppercase tracking-[0.2em] text-mocha mb-2 animate-[fadeUp_0.6s_ease-out_0.25s_both]">
          <span>{categoryLabel} • {fabricLabel}</span>
        </div>

        {/* Optional link to Full Product Detail Page when inside Quick View Modal */}
        {isModal && (
          <div className="mb-2">
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-walnut hover:text-espresso transition-colors font-medium"
            >
              <span className="underline underline-offset-4 decoration-border2/80 group-hover:decoration-espresso transition-colors">{t('product.viewFullDetails', isArabic ? 'عرض الصفحة الكاملة للقطعة' : 'View Full Editorial Page')}</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">→</span>
            </Link>
          </div>
        )}

        {/* Product Title */}
        <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-espresso font-normal tracking-tight leading-snug mb-2.5 animate-[fadeUp_0.6s_ease-out_0.3s_both]">
          {title}
        </h1>

        {/* Price & Rating Row */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border2/70 animate-[fadeUp_0.6s_ease-out_0.35s_both]">
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
        <p className="text-xs text-mocha leading-relaxed mb-3 line-clamp-3 animate-[fadeUp_0.6s_ease-out_0.4s_both]">
          {desc}
        </p>
        
        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3 animate-[fadeUp_0.6s_ease-out_0.45s_both]">
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
                    className="group relative w-8 h-8 rounded-full p-0 flex-shrink-0 cursor-pointer focus:outline-none"
                    title={isArabic ? product.colorNamesAr?.[idx] : product.colorNames?.[idx]}
                  >
                    <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'border-2 border-espresso shadow-xs'
                        : 'border border-transparent group-hover:border-border2'
                    }`} />
                    <span
                      className="absolute inset-1 rounded-full border border-black/10 shadow-inner flex items-center justify-center transition-transform duration-300"
                      style={{ backgroundColor: hex }}
                    >
                      {isSelected && (
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === '#faf9f6'
                            ? 'bg-espresso'
                            : 'bg-cream'
                        }`} />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3 animate-[fadeUp_0.6s_ease-out_0.5s_both]">
            <div className="flex items-center justify-between text-[11px] text-espresso font-medium uppercase tracking-wider mb-2">
              <div className="flex items-center gap-2">
                <span>{t('product.sizeLabel', isArabic ? 'المقاس المختار:' : 'Select Size:')}</span>
                {state.selectedSize && (
                  <span className="text-walnut font-bold">{state.selectedSize}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  const section = document.getElementById('size-and-fit-guide')
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    openSizeGuide(product)
                  }
                }}
                className="text-taupe hover:text-espresso underline underline-offset-4 cursor-pointer text-[10px] sm:text-[11px] transition-colors font-sans"
              >
                {t('product.sizeGuide', isArabic ? 'دليل القياسات' : 'Size Guide')}
              </button>
            </div>
            <div className={`flex flex-wrap gap-2 p-1.5 -m-1.5 rounded-2xl transition-all duration-300 ${
              state.sizeError ? 'animate-shake ring-2 ring-[#8B2626]/60 bg-[#8B2626]/5' : ''
            }`}>
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
            {state.sizeError && (
              <p className="mt-2 text-[11px] text-[#8B2626] font-medium flex items-center gap-1.5 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B2626] inline-block shrink-0 animate-pulse" />
                <span>{t('product.sizeRequired', isArabic ? 'يرجى اختيار المقاس قبل الإضافة إلى الحقيبة.' : 'Please select your size.')}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Purchasing Actions Panel */}
      <div className="mt-auto pt-3 border-t border-border2/80 shrink-0 animate-[fadeUp_0.6s_ease-out_0.55s_both]">
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
                <svg className="w-4 h-4 stroke-current fill-none shrink-0" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span>{t('product.addToBag', isArabic ? 'أضف إلى الحقيبة' : 'Add to Bag')}</span>
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
