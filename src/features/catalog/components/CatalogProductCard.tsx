import { useNavigate } from 'react-router-dom'
import { TFunction } from 'i18next'
import { ProductDress } from '@/data/dressesData'
import { useLongPressQuickView } from '@/hooks/useLongPressQuickView'

interface CatalogProductCardProps {
  item: ProductDress
  isArabic: boolean
  t: TFunction
  isInWishlist: (id: string) => boolean
  addToWishlist: (item: ProductDress) => void
  removeFromWishlist: (id: string) => void
  handleQuickAdd: (e: React.MouseEvent, item: ProductDress) => void
  handleProductInteract: (item: ProductDress) => void
  setQuickViewProduct: (item: ProductDress | null) => void
}

export function CatalogProductCard({
  item,
  isArabic,
  t,
  isInWishlist,
  addToWishlist,
  removeFromWishlist,
  handleQuickAdd,
  handleProductInteract,
  setQuickViewProduct
}: CatalogProductCardProps) {
  const navigate = useNavigate()
  const inWishlist = isInWishlist(item.id)
  const title = isArabic ? (item.nameAr || item.name) : item.name
  const badgeText = isArabic ? (item.badgeAr || item.badge) : item.badge

  const { longPressProps } = useLongPressQuickView({
    product: item,
    onQuickView: () => {
      handleProductInteract(item)
      setQuickViewProduct(item)
    },
    onNavigate: () => {
      handleProductInteract(item)
      navigate(`/product/${item.id}`)
    }
  })

  return (
    <div
      {...longPressProps}
      className="card-product group flex flex-col bg-cream rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-none relative select-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img
          src={item.image}
          alt={title}
          className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${item.secondImage ? 'group-hover:opacity-0 transition-opacity duration-700' : ''}`}
          loading="lazy"
        />

        {item.secondImage && (
          <img
            src={item.secondImage}
            alt={`${title} back view`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {badgeText && (
          <span className="absolute top-3 start-3 sm:top-3.5 sm:start-3.5 bg-walnut/95 backdrop-blur-md text-cream text-[9px] sm:text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium shadow-xs z-10">
            {badgeText}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (inWishlist) {
              removeFromWishlist(item.id)
            } else {
              addToWishlist(item)
            }
          }}
          className="absolute top-3 end-3 sm:top-3.5 sm:end-3.5 bg-cream/90 backdrop-blur-md text-espresso hover:text-walnut p-2 sm:p-2.5 rounded-full shadow-2xs transition-all duration-300 z-10 cursor-pointer group/heart"
          aria-label={inWishlist ? (isArabic ? 'إزالة من المفضلة' : 'Remove from Wishlist') : (isArabic ? 'أضف للمفضلة' : 'Add to Wishlist')}
        >
          <svg
            className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 ${inWishlist ? 'fill-espresso text-espresso scale-110' : 'fill-none stroke-current'}`}
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

        <div className="absolute bottom-3 inset-x-3 hidden lg:flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={(e) => handleQuickAdd(e, item)}
            className="bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream py-1.5 px-2.5 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap border border-border2/50 shrink-0"
            title={isArabic ? 'إضافة للحقيبة' : 'Quick Add to Bag'}
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none shrink-0" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span>{isArabic ? 'إضافة' : 'Quick Add'}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleProductInteract(item)
              setQuickViewProduct(item)
            }}
            className="flex-1 bg-cream/95 backdrop-blur-md text-espresso hover:bg-walnut hover:text-cream py-1.5 px-3 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap border border-border2/50"
          >
            <span>{isArabic ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => handleQuickAdd(e, item)}
          className="lg:hidden absolute bottom-3 end-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream shadow-sm flex items-center justify-center transition-colors z-10"
          title={isArabic ? 'إضافة سريعة للحقيبة' : 'Quick Add to Bag'}
        >
          <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>

      <div className="p-3.5 sm:p-4.5 flex flex-col flex-1 justify-between bg-cream">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-mocha font-sans mb-1">
            <span className="uppercase tracking-wider">{isArabic ? item.categoryAr : item.category}</span>
            <span className="text-taupe">★ {item.rating}</span>
          </div>
          <h3 className="font-serif text-xs sm:text-sm lg:text-base text-espresso font-medium leading-snug group-hover:text-walnut transition-colors line-clamp-1">
            {title}
          </h3>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border2/60 flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-sans text-espresso font-semibold uppercase tracking-wider truncate">
            {item.price} {t('common.priceAed', 'SAR')}
          </span>

          {item.colors && item.colors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              {item.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-border2 shadow-2xs inline-block"
                  style={{ backgroundColor: col }}
                  title={isArabic ? item.colorNamesAr?.[idx] : item.colorNames?.[idx]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
