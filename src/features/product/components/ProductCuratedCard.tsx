import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { type ProductDress } from '../../../data/dressesData'
import { useShop } from '../../../providers/ShopProvider'
import { useLongPressQuickView } from '../../../hooks/useLongPressQuickView'

interface ProductCuratedCardProps {
  product: ProductDress
  isArabic: boolean
  onQuickView?: (product: ProductDress) => void
  variant?: 'standard' | 'tall' | 'editorial-feature'
}

export function ProductCuratedCard({
  product,
  isArabic,
  onQuickView,
  variant = 'standard'
}: ProductCuratedCardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addToWishlist, removeFromWishlist, isInWishlist, openQuickView } = useShop()

  const inWishlist = isInWishlist(product.id)
  const title = isArabic ? (product.nameAr || product.name) : product.name
  const categoryLabel = isArabic ? (product.categoryAr || product.category) : product.category
  const descriptionText = isArabic ? (product.descriptionAr || product.description) : product.description

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onQuickView) {
      onQuickView(product)
    } else {
      openQuickView(product)
    }
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { longPressProps } = useLongPressQuickView({
    product,
    onQuickView,
    onNavigate: handleCardClick
  })

  const aspectRatioClass = variant === 'tall'
    ? 'aspect-[4/5]'
    : variant === 'editorial-feature'
    ? 'aspect-[3/4] sm:aspect-[4/5]'
    : 'aspect-[3/4]'

  return (
    <div
      {...longPressProps}
      className="group flex flex-col h-full bg-cream border border-border2/70 hover:border-espresso/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 ease-out cursor-pointer relative select-none"
    >
      {/* Large Boutique Photography Container */}
      <div className={`relative ${aspectRatioClass} overflow-hidden bg-sand`}>
        {/* Primary Image */}
        <img
          src={product.image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />

        {/* Secondary Image (Smooth Catalogue Hover Transition) */}
        {product.secondImage && (
          <img
            src={product.secondImage}
            alt={`${title} - Alternate View`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            loading="lazy"
          />
        )}

        {/* Subtle Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Category & Badge Top Bar */}
        <div className="absolute top-2.5 start-2.5 sm:top-3.5 sm:start-3.5 flex flex-col gap-1 sm:gap-1.5 z-10 pointer-events-none">
          {categoryLabel && (
            <span className="bg-espresso/80 backdrop-blur-md text-cream text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium shadow-sm">
              {categoryLabel}
            </span>
          )}
          {product.badge && (
            <span className="bg-walnut/90 backdrop-blur-md text-cream text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.18em] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium shadow-sm self-start">
              {isArabic ? (product.badgeAr || product.badge) : product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 end-2.5 sm:top-3.5 sm:end-3.5 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 shadow-md active:scale-95 ${
            inWishlist
              ? 'bg-walnut text-cream scale-105 shadow-walnut/20'
              : 'bg-cream/90 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream'
          }`}
          aria-label={inWishlist ? t('common.removeFromWishlist', 'Remove from wishlist') : t('common.addToWishlist', 'Add to wishlist')}
          title={inWishlist ? (isArabic ? 'إزالة من قائمة الأمنيات' : 'Remove from wishlist') : (isArabic ? 'إضافة إلى قائمة الأمنيات' : 'Add to wishlist')}
        >
          <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 ease-out ${inWishlist ? 'fill-current scale-110 rotate-0' : 'stroke-current fill-none hover:scale-110'}`}
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Hover Action Bar: Quick View */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 hidden lg:flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-full py-3 px-4 rounded-xl text-[10px] sm:text-xs uppercase tracking-[0.18em] font-medium shadow-lg transition-all duration-300 bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap border border-border2/60"
            title={isArabic ? 'نظرة سريعة على التفاصيل' : 'Quick View'}
          >
            <span>{isArabic ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      {/* Catalogue Card Details */}
      <div className="p-3 sm:p-5 lg:p-6 flex flex-col justify-between flex-1 bg-cream">
        <div>
          <h3 className="font-serif text-xs sm:text-base lg:text-lg text-espresso font-normal line-clamp-1 group-hover:text-walnut transition-colors duration-300 mb-1 sm:mb-2">
            {title}
          </h3>

          {variant === 'editorial-feature' && descriptionText ? (
            <p className="hidden sm:block text-xs sm:text-sm text-mocha line-clamp-2 font-sans leading-relaxed mb-4">
              {descriptionText}
            </p>
          ) : (
            <p className="hidden sm:block text-xs text-mocha line-clamp-1 font-sans leading-relaxed mb-3">
              {descriptionText}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 sm:pt-3.5 border-t border-border2/60 mt-auto">
          <span className="text-xs sm:text-base lg:text-lg font-serif font-medium text-espresso tracking-tight">
            {product.price} <span className="text-[9.5px] sm:text-xs font-sans font-normal text-mocha">{t('common.priceAed', 'SAR')}</span>
          </span>

          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-walnut font-medium flex items-center gap-0.5 sm:gap-1 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1 transition-transform duration-300">
            <span className="hidden sm:inline">{isArabic ? 'اكتشفي' : 'Explore'}</span>
            <span aria-hidden="true" className="rtl:rotate-180 inline-block">&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  )
}
