import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { DRESSES_DATA, type ProductDress } from '../../../data/dressesData'
import { ProductCuratedCard } from './ProductCuratedCard'

interface ProductYouMayAlsoLikeSectionProps {
  currentProductId: string
  isArabic: boolean
  onQuickView?: (product: ProductDress) => void
}

export function ProductYouMayAlsoLikeSection({
  currentProductId,
  isArabic,
  onQuickView
}: ProductYouMayAlsoLikeSectionProps) {
  const { t } = useTranslation()

  // Select 4 complementary pieces from the collection, excluding current item
  const recommendations = DRESSES_DATA
    .filter(p => p.id !== currentProductId)
    .slice(0, 4)

  if (recommendations.length === 0) return null

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
            {t('product.alsoLike.title', isArabic ? 'قد ينال إعجابك أيضاً' : 'You May Also Like')}
          </h2>
        </motion.div>

        {/* 4 Premium Product Cards Grid with Generous Catalogue Spacing (Double sided on mobile) */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10"
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
          {recommendations.map((item) => (
            <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
              <ProductCuratedCard
                product={item}
                isArabic={isArabic}
                onQuickView={onQuickView}
                variant="standard"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
