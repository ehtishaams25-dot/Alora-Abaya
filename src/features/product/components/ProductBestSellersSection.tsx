import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { DRESSES_DATA, type ProductDress } from '../../../data/dressesData'
import { ProductCuratedCard } from './ProductCuratedCard'

interface ProductBestSellersSectionProps {
  currentProductId: string
  isArabic: boolean
  onQuickView?: (product: ProductDress) => void
}

export function ProductBestSellersSection({
  currentProductId,
  isArabic,
  onQuickView
}: ProductBestSellersSectionProps) {
  const { t } = useTranslation()

  // Select best sellers sorted by salesCount or marked Best Seller
  const bestSellers = DRESSES_DATA
    .filter(p => p.id !== currentProductId)
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 4)

  if (bestSellers.length === 0) return null

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-sand border-b border-border2/60 relative overflow-hidden">
      <div className="container-alora">
        {/* Editorial Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-snug">
            {t('product.bestSellers.title', isArabic ? 'القطع الأكثر مبيعاً' : 'Best Sellers')}
          </h2>
        </motion.div>

        {/* Harmonious Symmetrical Grid with Luxury Ranking Indicators (Double sided on mobile) */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10 items-stretch"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
        >
          {bestSellers.map((item, idx) => {
            const ranksEn = ['#1 Most Loved', '#2 Atelier Icon', '#3 VIP Favorite', '#4 Couture Staple']
            const ranksAr = ['#1 الأكثر تقديراً', '#2 أيقونة الأتليه', '#3 اختيار النخبة', '#4 تصميم خالد']

            return (
              <motion.div key={item.id} className="flex flex-col h-full relative group" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
                {/* Discrete Ranking Header */}
                <div className="flex items-center justify-between text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.22em] font-sans text-walnut font-medium mb-2 sm:mb-3 px-1">
                  <span className="truncate">{isArabic ? ranksAr[idx] : ranksEn[idx]}</span>
                  <span className="text-taupe text-[10px] sm:text-xs shrink-0">★</span>
                </div>

                <div className="flex-1 flex flex-col">
                  <ProductCuratedCard
                    product={item}
                    isArabic={isArabic}
                    onQuickView={onQuickView}
                    variant="standard"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
