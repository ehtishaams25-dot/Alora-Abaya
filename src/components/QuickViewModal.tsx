import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { type ProductDress } from '../data/dressesData'
import { useProductDetail, ProductGallery, ProductPurchasePanel } from '../features/product'

interface QuickViewModalProps {
  product: ProductDress | null
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [state, actions] = useProductDetail(product || ({} as ProductDress))

  useEffect(() => {
    if (product) {
      // Lock background scrolling when Quick View is active
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [product])

  if (!product) return null

  const isArabic = i18n.language.startsWith('ar')

  const handlePhotoClick = () => {
    onClose()
    navigate(`/product/${product.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-espresso/75 backdrop-blur-md transition-opacity duration-300">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* DESKTOP VIEW: Zero-Scroll One-Pager Modal Dialog */}
      <div className="relative hidden lg:flex w-full max-w-6xl bg-cream rounded-3xl border border-border2 shadow-2xl overflow-hidden z-10 flex-row h-[88vh] max-h-[680px] animate-fade-up">
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 z-30 bg-sand/90 hover:bg-espresso hover:text-cream text-espresso p-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Photography Gallery */}
        <div className="w-7/12 bg-sand relative p-5 h-full min-h-0 shrink-0 border-e border-border2/60 overflow-hidden">
          <ProductGallery
            product={product}
            galleryViews={state.galleryViews}
            selectedImageIdx={state.selectedImageIdx}
            onSelectImage={actions.setSelectedImageIdx}
            isArabic={isArabic}
          />
        </div>

        {/* Right Side: Editorial Product Details & Quick Actions */}
        <div className="w-5/12 p-7 h-full min-h-0 overflow-hidden flex flex-col justify-between">
          <ProductPurchasePanel
            product={product}
            state={state}
            actions={actions}
            isArabic={isArabic}
            isModal={true}
            onClose={onClose}
          />
        </div>
      </div>

      {/* MOBILE VIEW: Ultra-Compact Zero-Scroll Quick Card (Only Name, Colors, & Wishlist Icon) */}
      <div className="relative flex lg:hidden flex-col w-full max-w-[350px] sm:max-w-[396px] bg-cream rounded-2xl border border-border2 shadow-2xl overflow-hidden z-10 animate-fade-up">
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-3 end-3 z-30 bg-cream/90 backdrop-blur-md hover:bg-espresso hover:text-cream text-espresso p-2 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image (Clickable to navigate to full PDP) */}
        <div
          onClick={handlePhotoClick}
          className="relative aspect-[4/5] bg-sand overflow-hidden cursor-pointer group/img"
          title={isArabic ? 'انقري لعرض صفحة المنتج كاملة' : 'Tap to view full product page'}
        >
          <img
            src={state.currentImage}
            alt={isArabic ? (product.nameAr || product.name) : product.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-espresso/0 group-hover/img:bg-espresso/10 transition-colors duration-300" />
        </div>

        {/* Compact Details: Name, Wishlist Icon, & Colors */}
        <div className="p-4 sm:p-5 flex flex-col justify-between bg-cream gap-3.5">
          <div className="flex items-center justify-between gap-3">
            <h3
              onClick={handlePhotoClick}
              className="font-serif text-base sm:text-lg text-espresso font-medium leading-snug line-clamp-1 cursor-pointer hover:text-walnut transition-colors"
            >
              {isArabic ? (product.nameAr || product.name) : product.name}
            </h3>

            {/* Wishlist Adding Icon Button */}
            <button
              type="button"
              onClick={actions.handleWishlistToggle}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0 ${
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

          {/* Color Selection Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center justify-between pt-2.5 border-t border-border2/60">
              <span className="text-[11px] uppercase tracking-wider text-mocha font-medium">
                {t('product.colorLabel', isArabic ? 'اللون:' : 'Color:')} {state.colorName}
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((hex, idx) => {
                  const isSelected = state.selectedColorIdx === idx
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => actions.setSelectedColorIdx(idx)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'border-espresso scale-110 shadow-sm ring-1 ring-espresso/20 ring-offset-1 ring-offset-cream'
                          : 'border-border2 hover:scale-105'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={isArabic ? product.colorNamesAr?.[idx] : product.colorNames?.[idx]}
                    >
                      {isSelected && (
                        <span className={`w-1 h-1 rounded-full ${
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
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

