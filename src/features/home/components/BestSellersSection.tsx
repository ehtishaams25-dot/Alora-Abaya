import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { type ProductItem } from '../types'
import { useShop } from '../../../providers/ShopProvider'
import { QuickViewModal } from '../../../components/QuickViewModal'
import { DRESSES_DATA, type ProductDress } from '../../../data/dressesData'
import { useLongPressQuickView } from '../../../hooks/useLongPressQuickView'

function BestSellerProductCard({
  item,
  isArabic,
  t,
  addToCart,
  onQuickView
}: {
  item: ProductItem
  isArabic: boolean
  t: any
  addToCart: any
  onQuickView: (item: ProductItem) => void
}) {
  const navigate = useNavigate()
  const { longPressProps } = useLongPressQuickView({
    product: item,
    onQuickView: () => onQuickView(item),
    onNavigate: () => {
      navigate(`/product/${item.id}`)
    }
  })

  return (
    <div
      {...longPressProps}
      className="card-product group flex flex-col w-full bg-cream border border-border2/60 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer relative select-none"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          src={item.image}
          alt={isArabic ? (item.nameAr || item.name) : item.name}
          className="card-product-img w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Best Seller Badge */}
        <span className="absolute top-2.5 start-2.5 sm:top-3.5 sm:start-3.5 bg-walnut/95 backdrop-blur-md text-cream text-[8.5px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium shadow-md">
          {t('common.bestSellerBadge')}
        </span>

        {/* Rating Badge Top Right */}
        <div className="absolute top-2.5 end-2.5 sm:top-3.5 sm:end-3.5 bg-cream/90 backdrop-blur-md text-espresso text-[9.5px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
          <span className="text-taupe">★</span>
          <span>{item.rating}</span>
        </div>

        {/* Sleek, Compact Hover Actions (Desktop Only) */}
        <div className="absolute bottom-3 inset-x-3 hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView(item)
            }}
            className="w-full bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream py-2 px-3 rounded-xl text-[10px] uppercase tracking-[0.16em] font-medium shadow-sm transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap border border-border2/50"
          >
            <span>{isArabic ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between bg-cream">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 text-[9.5px] sm:text-[11px] text-mocha font-sans">
            <span className="uppercase tracking-wider truncate">{item.category}</span>
            <span className="shrink-0">({item.reviewsCount})</span>
          </div>
          <h3 className="font-serif text-xs sm:text-base lg:text-lg text-espresso font-medium leading-snug group-hover:text-walnut transition-colors line-clamp-1">
            {isArabic ? (item.nameAr || item.name) : item.name}
          </h3>
        </div>

        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border2/60 flex items-center justify-between gap-1.5">
          <span className="text-xs sm:text-sm font-sans text-espresso font-semibold uppercase tracking-wider truncate min-w-0">
            {item.price} {t('common.priceAed')}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addToCart(item, item.colors?.[0])
            }}
            className="text-[9.5px] sm:text-xs uppercase tracking-widest text-walnut hover:text-espresso font-medium transition-colors flex items-center gap-1 min-h-[30px] sm:min-h-[36px] flex-shrink-0 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none shrink-0" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="hidden sm:inline">{t('common.addToBag')}</span>
            <span className="sm:hidden">{isArabic ? 'إضافة' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function BestSellersSection() {
  const { t, i18n } = useTranslation()
  const { addToCart } = useShop()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)

  const products: ProductItem[] = [
    {
      id: "bs-1",
      name: "Noor Pearl-Trimmed Chiffon",
      nameAr: "عباية نور شيفون مزينة باللؤلؤ",
      price: "2,650",
      image: "https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=800&q=85",
      rating: "5.0",
      reviewsCount: "48",
      category: "Embroidered Silks"
    },
    {
      id: "bs-2",
      name: "Al-Dana Pleated Crepe Abaya",
      nameAr: "عباية الدانة كريب بكسرات أنيقة",
      price: "1,950",
      image: "https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=800&q=85",
      rating: "4.9",
      reviewsCount: "62",
      category: "Daily Modest"
    },
    {
      id: "bs-3",
      name: "Sultana Gold-Embroidered Bisht",
      nameAr: "بشت سلطانة مطرز بالذهب الملكي",
      price: "3,400",
      image: "https://images.unsplash.com/photo-1772474587292-08b3e8932acd?auto=format&fit=crop&w=800&q=85",
      rating: "5.0",
      reviewsCount: "35",
      category: "Occasion Gowns"
    },
    {
      id: "bs-4",
      name: "Lulwa Ivory Raw Silk Coat",
      nameAr: "معطف لولوة من الحرير الخام العاجي",
      price: "2,850",
      image: "https://images.unsplash.com/photo-1762376128087-bc29c6df08c0?auto=format&fit=crop&w=800&q=85",
      rating: "4.9",
      reviewsCount: "54",
      category: "Embroidered Silks"
    }
  ]

  const filters = [
    { id: 'all', label: t('common.filterAll') },
    { id: 'Embroidered Silks', label: t('common.filterEmbroidered') },
    { id: 'Daily Modest', label: t('common.filterDaily') },
    { id: 'Occasion Gowns', label: t('common.filterOccasion') },
  ]

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter)

  const isArabic = i18n.language.startsWith('ar')

  return (
    <section id="bestsellers" className="section-padding bg-sand">
      <div className="container-alora">
        {/* Minimalist Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.28em] block">
            {t('home.bestSellers.eyebrow')}
          </span>
          <h2 className="text-h2 font-serif text-espresso font-normal tracking-tight">
            {t('home.bestSellers.title')}
          </h2>

          {/* Centered Filter Tabs (Forced single line) */}
          <div className="mt-5 sm:mt-6 flex flex-nowrap items-center justify-center gap-1 sm:gap-2.5 md:gap-3 max-w-full w-full">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-1.5 sm:px-3 md:px-3.5 py-1 sm:py-1.5 rounded-full text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] md:text-[10.5px] uppercase tracking-wide font-medium transition-all min-h-[24px] sm:min-h-[28px] flex items-center justify-center whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-espresso text-cream shadow-sm'
                    : 'bg-cream text-espresso border border-border2 hover:border-walnut'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (Double sided on mobile: 2 columns side by side) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((item) => (
            <BestSellerProductCard
              key={item.id}
              item={item}
              isArabic={isArabic}
              t={t}
              addToCart={addToCart}
              onQuickView={(p) => {
                const found = DRESSES_DATA.find(d => d.id === p.id)
                if (found) setQuickViewProduct(found)
              }}
            />
          ))}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  )
}
