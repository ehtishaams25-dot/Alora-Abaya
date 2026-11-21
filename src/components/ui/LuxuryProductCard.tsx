import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { type ProductDress } from '../../data/dressesData'
import { useShop } from '../../providers/ShopProvider'
import { useLongPressQuickView } from '../../hooks/useLongPressQuickView'

export function LuxuryProductCard({
  item,
  isArabic,
  onClick
}: {
  item: ProductDress
  isArabic: boolean
  onClick?: (item: ProductDress) => void
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isInWishlist, addToWishlist, removeFromWishlist, openQuickView } = useShop()
  
  const [isHovered, setIsHovered] = useState(false)
  const inWishlist = isInWishlist(item.id)

  const title = isArabic ? (item.nameAr || item.name) : item.name
  const badgeText = isArabic ? (item.badgeAr || item.badge) : item.badge
  const categoryText = isArabic ? (item.categoryAr || item.category) : item.category

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(item)
  }

  const { longPressProps } = useLongPressQuickView({
    product: item,
    onQuickView: () => {
      onClick?.(item)
      openQuickView(item)
    },
    onNavigate: () => {
      onClick?.(item)
      navigate(`/product/${item.id}`)
    }
  })

  return (
    <motion.div
      className="group flex flex-col relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      {...longPressProps}
      onMouseLeave={() => {
        setIsHovered(false)
        longPressProps.onMouseLeave?.()
      }}
    >
      <Link to={`/product/${item.id}`} className="relative block aspect-[2/3] overflow-hidden bg-sand/30 mb-8 rounded-[2px] shadow-sm">
        {/* Primary Image */}
        <img
          src={item.image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1.5s] ease-[0.16,1,0.3,1] transform ${
            isHovered && item.secondImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />
        
        {/* Secondary Hover Image */}
        {item.secondImage && (
          <img
            src={item.secondImage}
            alt={`${title} alternate angle`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1.5s] ease-[0.16,1,0.3,1] transform ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            loading="lazy"
          />
        )}

        {/* Subtle Dark Gradient at bottom for text readability if needed */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Badge */}
        {badgeText && (
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-cream/95 backdrop-blur-sm px-3.5 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest text-espresso font-medium shadow-sm">
            {badgeText}
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2.5 rounded-full bg-cream/0 hover:bg-cream/50 backdrop-blur-[2px] hover:backdrop-blur-md transition-all duration-500 z-10 group/btn"
          aria-label="Toggle Wishlist"
        >
          <svg 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
              inWishlist ? 'fill-walnut text-walnut' : 'text-cream group-hover/btn:text-espresso drop-shadow-md'
            }`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Desktop Quick View Overlay Button */}
        <div className="absolute bottom-6 inset-x-6 hidden lg:block opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1] z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-cream/95 backdrop-blur-md text-espresso border border-border2/30 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-espresso hover:text-cream transition-colors duration-500 shadow-lg shadow-black/5"
          >
            {t('product.quickView', 'QUICK VIEW')}
          </button>
        </div>
      </Link>

      <Link to={`/product/${item.id}`} className="flex flex-col gap-2 px-1 group/text">
        <div className="flex flex-col">
          <span className="text-[9px] sm:text-[10px] text-taupe uppercase tracking-[0.2em] font-sans mb-1.5 sm:mb-2.5">
            {categoryText}
          </span>
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-1 xl:gap-4">
            <h3 className="font-serif text-[13px] sm:text-[15px] lg:text-lg text-espresso font-normal tracking-wide group-hover/text:text-walnut transition-colors duration-500 leading-tight">
              {title}
            </h3>
            <span className="text-[11px] sm:text-sm lg:text-base font-sans text-mocha font-medium tracking-wider whitespace-nowrap xl:mt-0.5">
              {item.price} SAR
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
