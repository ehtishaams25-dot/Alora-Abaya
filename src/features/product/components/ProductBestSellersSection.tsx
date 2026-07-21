import { useTranslation } from 'react-i18next'
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
      <div className="container-layali">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3">
              {t('product.bestSellers.eyebrow', isArabic ? 'الأكثر طلباً وتقديراً' : 'Most Cherished')}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-snug">
              {t('product.bestSellers.title', isArabic ? 'القطع الأكثر مبيعاً' : 'Best Sellers')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-mocha font-sans leading-relaxed max-w-md lg:text-end">
            {t('product.bestSellers.desc', isArabic
              ? 'التصاميم الأيقونية التي حازت على إعجاب نخبة عميلاتنا في صالونات ليالي حول العالم.'
              : 'Iconic silhouettes that have captivated our most discerning clientele across global salons.')}
          </p>
        </div>

        {/* Harmonious Symmetrical Grid with Luxury Ranking Indicators (Double sided on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10 items-stretch">
          {bestSellers.map((item, idx) => {
            const ranksEn = ['#1 Most Loved', '#2 Atelier Icon', '#3 VIP Favorite', '#4 Couture Staple']
            const ranksAr = ['#1 الأكثر تقديراً', '#2 أيقونة الأتليه', '#3 اختيار النخبة', '#4 تصميم خالد']

            return (
              <div key={item.id} className="flex flex-col h-full relative group">
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
