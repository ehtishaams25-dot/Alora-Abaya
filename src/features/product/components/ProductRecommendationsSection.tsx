import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { DRESSES_DATA, type ProductDress } from '../../../data/dressesData'
import { useShop } from '../../../providers/ShopProvider'
import { QuickViewModal } from '../../../components/QuickViewModal'
import { useLongPressQuickView } from '../../../hooks/useLongPressQuickView'

interface ProductRecommendationsSectionProps {
  currentProductId: string
  isArabic: boolean
}

function RecommendedProductCard({
  item,
  isArabic,
  t,
  addToCart,
  setQuickViewProduct
}: {
  item: ProductDress
  isArabic: boolean
  t: any
  addToCart: (item: any, color?: string) => void
  setQuickViewProduct: (item: ProductDress | null) => void
}) {
  const navigate = useNavigate()
  const { longPressProps } = useLongPressQuickView({
    product: item,
    onQuickView: () => {
      setQuickViewProduct(item)
    },
    onNavigate: () => {
      navigate(`/product/${item.id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })

  return (
    <div
      {...longPressProps}
      className="card-product group flex flex-col shrink-0 w-[270px] sm:w-auto snap-start bg-cream border border-border2/70 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer relative select-none"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          src={item.image}
          alt={isArabic ? (item.nameAr || item.name) : item.name}
          className="card-product-img w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {item.category && (
          <span className="absolute top-3.5 start-3.5 bg-walnut/95 backdrop-blur-md text-cream text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-medium shadow-sm z-10">
            {isArabic ? item.categoryAr : item.category}
          </span>
        )}

        {item.rating && (
          <div className="absolute top-3.5 end-3.5 bg-cream/90 backdrop-blur-md text-espresso text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm flex items-center gap-1 z-10">
            <span className="text-taupe">★</span>
            <span>{item.rating}</span>
          </div>
        )}

        <div className="absolute bottom-3 inset-x-3 hidden lg:flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addToCart(item, item.colors?.[0])
            }}
            className="bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream py-2 px-3 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap border border-border2/50 shrink-0"
            title={isArabic ? 'إضافة للحقيبة' : 'Quick Add'}
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
              setQuickViewProduct(item)
            }}
            className="flex-1 bg-cream/95 backdrop-blur-md text-espresso hover:bg-walnut hover:text-cream py-2 px-3 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap border border-border2/50"
          >
            <span>{isArabic ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-cream">
        <div>
          <h3 className="font-serif text-sm sm:text-base text-espresso font-normal line-clamp-1 group-hover:text-walnut transition-colors mb-1.5">
            {isArabic ? (item.nameAr || item.name) : item.name}
          </h3>
          <p className="text-xs text-mocha line-clamp-2 leading-relaxed mb-3 font-sans">
            {isArabic ? (item.descriptionAr || item.description) : item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border2/60 mt-auto">
          <span className="text-sm sm:text-base font-semibold text-espresso tracking-wide">
            {item.price} {t('common.priceAed', 'SAR')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-walnut font-medium flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
            <span>{isArabic ? 'التفاصيل' : 'Explore'}</span>
            <span aria-hidden="true" className="rtl:rotate-180">→</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProductRecommendationsSection({ currentProductId, isArabic }: ProductRecommendationsSectionProps) {
  const { t } = useTranslation()
  const { addToCart } = useShop()
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)

  // Select up to 4 complementary dresses excluding the current product
  const recommended = DRESSES_DATA.filter(p => p.id !== currentProductId).slice(0, 4)

  if (recommended.length === 0) return null

  return (
    <section className="py-12 sm:py-16 lg:py-16 bg-sand border-b border-border2/60 relative">
      <div className="container-layali">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-walnut font-medium block mb-3">
            {t('product.recommendations.eyebrow', isArabic ? 'تناغم واختيارات متناسقة' : 'Curated Harmony')}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-snug mb-4">
            {t('product.recommendations.title', isArabic ? 'قطع مكملة من إبداعات الأتليه' : 'Complementary Atelier Pieces')}
          </h2>
          <p className="text-xs sm:text-sm text-mocha font-sans leading-relaxed">
            {t('product.recommendations.description', isArabic
              ? 'اكتشفي تصاميم تم اختيارها بعناية لتتناغم مع خزانة ملابسك وتكمل أناقتك الفاخرة.'
              : 'Discover garments styled to complete and elevate your wardrobe collection.')}
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory pb-6 sm:pb-0 sm:overflow-visible no-scrollbar px-1 sm:px-0">
          {recommended.map((item) => (
            <RecommendedProductCard
              key={item.id}
              item={item}
              isArabic={isArabic}
              t={t}
              addToCart={addToCart}
              setQuickViewProduct={setQuickViewProduct}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal if triggered */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  )
}
