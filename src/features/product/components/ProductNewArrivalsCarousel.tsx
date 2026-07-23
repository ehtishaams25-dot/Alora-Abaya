import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { DRESSES_DATA, type ProductDress } from '../../../data/dressesData'
import { ProductCuratedCard } from './ProductCuratedCard'

interface ProductNewArrivalsCarouselProps {
  currentProductId: string
  isArabic: boolean
  onQuickView?: (product: ProductDress) => void
}

export function ProductNewArrivalsCarousel({
  currentProductId,
  isArabic,
  onQuickView
}: ProductNewArrivalsCarouselProps) {
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Select new arrivals or latest pieces
  const newArrivals = DRESSES_DATA
    .filter(p => p.id !== currentProductId && (p.collection === 'New Arrival' || p.badge === 'New' || p.badge === 'New Arrival' || p.id.startsWith('na-') || p.id.startsWith('dr-02') || p.id.startsWith('dr-04')))
    .slice(0, 8)

  // If not enough tagged as new, fallback to a clean slice of recent creations
  const carouselItems = newArrivals.length >= 4
    ? newArrivals
    : DRESSES_DATA.filter(p => p.id !== currentProductId).slice(0, 8)

  const checkScrollState = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const absScroll = Math.abs(scrollLeft)
    setCanScrollLeft(absScroll > 10)
    setCanScrollRight(absScroll < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScrollState()
    window.addEventListener('resize', checkScrollState)
    return () => window.removeEventListener('resize', checkScrollState)
  }, [carouselItems.length])

  if (carouselItems.length === 0) return null

  const handleScrollPrev = () => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 340
    const scrollAmount = cardWidth + 32
    scrollRef.current.scrollBy({
      left: isArabic ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleScrollNext = () => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 340
    const scrollAmount = cardWidth + 32
    scrollRef.current.scrollBy({
      left: isArabic ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-sand border-b border-border2/60 relative overflow-hidden">
      <div className="container-alora">
        {/* Editorial Section Header with Minimal Navigation Controls */}
        <motion.div 
          className="flex items-center justify-between gap-6 mb-10 sm:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-snug">
            {t('product.newArrivals.title', isArabic ? 'وصل حديثاً إلى الأتليه' : 'New Arrivals')}
          </h2>

          {/* Minimal Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleScrollPrev}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border border-border2 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-cream text-espresso hover:bg-espresso hover:text-cream shadow-sm cursor-pointer'
                  : 'bg-cream/40 text-mocha/30 cursor-not-allowed border-border2/40'
              }`}
              aria-label={isArabic ? 'السابق' : 'Previous items'}
            >
              <svg className="w-5 h-5 stroke-current fill-none rtl:rotate-180" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleScrollNext}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border border-border2 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'bg-cream text-espresso hover:bg-espresso hover:text-cream shadow-sm cursor-pointer'
                  : 'bg-cream/40 text-mocha/30 cursor-not-allowed border-border2/40'
              }`}
              aria-label={isArabic ? 'التالي' : 'Next items'}
            >
              <svg className="w-5 h-5 stroke-current fill-none rtl:rotate-180" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Horizontal Premium Carousel with Smooth Bidirectional Edge Fading (No Card Clipping) */}
        <div className="relative w-full">
          {/* Start Edge Fade Overlay (Left in LTR, Right in RTL when scrolled) */}
          <div
            className={`hidden sm:block absolute top-0 bottom-4 start-0 w-16 sm:w-28 lg:w-36 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-sand via-sand/80 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* End Edge Fade Overlay (Right in LTR, Left in RTL when overflow available) */}
          <div
            className={`hidden sm:block absolute top-0 bottom-4 end-0 w-16 sm:w-28 lg:w-36 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-sand via-sand/80 to-transparent pointer-events-none z-20 transition-opacity duration-500 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <motion.div
            ref={scrollRef}
            onScroll={checkScrollState}
            className="flex gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6 pt-2 -mx-5 px-5 sm:mx-0 sm:px-0 scroll-px-5 sm:scroll-px-0 after:content-[''] after:w-px after:shrink-0 sm:after:hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
              }
            }}
          >
            {carouselItems.map((item) => (
              <motion.div
                key={item.id}
                className="w-[280px] sm:w-[320px] lg:w-[350px] shrink-0 snap-start flex flex-col"
                variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <ProductCuratedCard
                  product={item}
                  isArabic={isArabic}
                  onQuickView={onQuickView}
                  variant="tall"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
