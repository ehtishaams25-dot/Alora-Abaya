import { useTranslation } from 'react-i18next'
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
      <div className="container-layali">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3">
            {t('product.alsoLike.eyebrow', isArabic ? 'اختيارات متناسقة من الأتليه' : 'Curated Recommendations')}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-snug mb-4">
            {t('product.alsoLike.title', isArabic ? 'قد ينال إعجابك أيضاً' : 'You May Also Like')}
          </h2>
          <div className="w-12 h-[1px] bg-walnut/60 mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-mocha font-sans leading-relaxed max-w-xl mx-auto">
            {t('product.alsoLike.desc', isArabic
              ? 'قطع مكملة تم اختيارها بعناية فائقة لتتناغم مع خزانة ملابسك وتكمل إطلالتك الملكية.'
              : 'Complementary silhouettes tailored with exquisite craftsmanship to harmonize effortlessly with your collection.')}
          </p>
        </div>

        {/* 4 Premium Product Cards Grid with Generous Catalogue Spacing (Double sided on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10">
          {recommendations.map((item) => (
            <ProductCuratedCard
              key={item.id}
              product={item}
              isArabic={isArabic}
              onQuickView={onQuickView}
              variant="standard"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
