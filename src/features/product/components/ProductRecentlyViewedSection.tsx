import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { DRESSES_DATA, type ProductDress } from '../../../data/dressesData'

interface ProductRecentlyViewedSectionProps {
  currentProductId: string
  isArabic: boolean
}

const STORAGE_KEY = 'alora_recently_viewed_ids'

export function ProductRecentlyViewedSection({
  currentProductId,
  isArabic
}: ProductRecentlyViewedSectionProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [viewedProducts, setViewedProducts] = useState<ProductDress[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollState = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const absScroll = Math.abs(scrollLeft)
    setCanScrollLeft(absScroll > 10)
    setCanScrollRight(absScroll < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    // Read current history from sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      let ids: string[] = stored ? JSON.parse(stored) : []

      // Filter out current product id if already present, then prepend
      ids = [currentProductId, ...ids.filter(id => id !== currentProductId)].slice(0, 10)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids))

      // Resolve product objects for display (excluding the currently viewed product)
      const otherIds = ids.filter(id => id !== currentProductId)
      const resolved = otherIds
        .map(id => DRESSES_DATA.find(p => p.id === id))
        .filter((p): p is ProductDress => p !== undefined)

      // If user hasn't viewed enough other products in this session, provide graceful defaults
      if (resolved.length < 4) {
        const defaults = DRESSES_DATA
          .filter(p => p.id !== currentProductId && !resolved.some(r => r.id === p.id))
          .slice(0, 5 - resolved.length)
        setViewedProducts([...resolved, ...defaults].slice(0, 6))
      } else {
        setViewedProducts(resolved.slice(0, 6))
      }
    } catch {
      // Fallback in case sessionStorage is disabled
      const defaults = DRESSES_DATA.filter(p => p.id !== currentProductId).slice(0, 5)
      setViewedProducts(defaults)
    }
  }, [currentProductId])

  useEffect(() => {
    checkScrollState()
    window.addEventListener('resize', checkScrollState)
    return () => window.removeEventListener('resize', checkScrollState)
  }, [viewedProducts.length])

  if (viewedProducts.length === 0) return null

  return (
    <section className="py-14 sm:py-20 bg-sand/80 border-b border-border2/40 transition-colors">
      <div className="container-alora">
        {/* Simple Horizontal Section Header */}
        <div className="mb-8 sm:mb-10">
          <h3 className="font-serif text-sm sm:text-base lg:text-lg text-espresso tracking-wide font-normal uppercase">
            {t('product.recentlyViewed.title', isArabic ? 'شاهدتِ مؤخراً' : 'Recently Viewed')}
          </h3>
        </div>

        {/* Simple Horizontal Row of Small Cards with Soft Hover Animations and Bidirectional Edge Fading */}
        <div className="relative w-full">
          {/* Start Edge Fade Overlay */}
          <div
            className={`absolute top-0 bottom-4 start-0 w-16 sm:w-24 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-sand via-sand/80 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* End Edge Fade Overlay */}
          <div
            className={`absolute top-0 bottom-4 end-0 w-16 sm:w-24 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-sand via-sand/80 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={scrollRef}
            onScroll={checkScrollState}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
          {viewedProducts.map((item) => {
            const title = isArabic ? (item.nameAr || item.name) : item.name
            return (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/product/${item.id}`)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group w-44 sm:w-52 lg:w-56 shrink-0 cursor-pointer flex flex-col bg-cream rounded-xl sm:rounded-2xl overflow-hidden border border-border2/60 hover:border-espresso/30 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Small Photography Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Minimal Styling Details */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 bg-cream">
                  <h4 className="font-serif text-xs sm:text-sm text-espresso font-normal line-clamp-1 group-hover:text-walnut transition-colors mb-1">
                    {title}
                  </h4>
                  <div className="flex items-center justify-between pt-2 border-t border-border2/40 mt-auto">
                    <span className="text-xs sm:text-sm font-serif font-medium text-espresso">
                      {item.price} <span className="text-[10px] font-sans font-normal text-mocha">{t('common.priceAed', 'SAR')}</span>
                    </span>
                    <span className="text-[10px] text-walnut group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
                      <span aria-hidden="true" className="rtl:rotate-180 inline-block">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
