import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductItem } from '../types'

export function BestSellersSection() {
  const { t, i18n } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const products: ProductItem[] = [
    {
      id: "bs-1",
      name: "Noor Pearl-Trimmed Chiffon",
      nameAr: "عباية نور شيفون مزينة باللؤلؤ",
      price: "2,650",
      image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=85",
      rating: "5.0",
      reviewsCount: "48",
      category: "Embroidered Silks"
    },
    {
      id: "bs-2",
      name: "Al-Dana Pleated Crepe Abaya",
      nameAr: "عباية الدانة كريب بكسرات أنيقة",
      price: "1,950",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85",
      rating: "4.9",
      reviewsCount: "62",
      category: "Daily Modest"
    },
    {
      id: "bs-3",
      name: "Sultana Gold-Embroidered Bisht",
      nameAr: "بشت سلطانة مطرز بالذهب الملكي",
      price: "3,400",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85",
      rating: "5.0",
      reviewsCount: "35",
      category: "Occasion Gowns"
    },
    {
      id: "bs-4",
      name: "Lulwa Ivory Raw Silk Coat",
      nameAr: "معطف لولوة من الحرير الخام العاجي",
      price: "2,850",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",
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
      <div className="container-layali">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <span className="text-eyebrow text-walnut mb-2 tracking-[0.25em] block">
              {t('home.bestSellers.eyebrow')}
            </span>
            <h2 className="text-h2 font-serif text-espresso">
              {t('home.bestSellers.title')}
            </h2>
            <p className="text-body text-mocha max-w-xl mt-3 text-sm sm:text-base">
              {t('home.bestSellers.description')}
            </p>
          </div>

          {/* Touch-scrollable Filter Tabs for Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all flex-shrink-0 min-h-[40px] flex items-center justify-center ${
                  activeFilter === filter.id
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-cream text-espresso border border-border2 hover:border-walnut'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid / Horizontal Swipe on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 sm:overflow-visible scrollbar-none">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="card-product group flex flex-col flex-shrink-0 w-[270px] sm:w-auto snap-start bg-cream border border-border2/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
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
                <span className="absolute top-3.5 start-3.5 bg-walnut/95 backdrop-blur-md text-cream text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-medium shadow-md">
                  {t('common.bestSellerBadge')}
                </span>

                {/* Rating Badge Top Right */}
                <div className="absolute top-3.5 end-3.5 bg-cream/90 backdrop-blur-md text-espresso text-[11px] px-2.5 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
                  <span className="text-taupe">★</span>
                  <span>{item.rating}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between bg-cream">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] text-mocha font-sans">
                    <span className="uppercase tracking-wider">{item.category}</span>
                    <span>({item.reviewsCount} reviews)</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-espresso font-medium leading-snug group-hover:text-walnut transition-colors line-clamp-1">
                    {isArabic ? (item.nameAr || item.name) : item.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-border2/60 flex items-center justify-between gap-2">
                  <span className="text-sm font-sans text-espresso font-semibold uppercase tracking-wider truncate min-w-0">
                    {item.price} {t('common.priceAed')}
                  </span>
                  <button
                    type="button"
                    className="text-xs uppercase tracking-widest text-walnut hover:text-espresso font-medium transition-colors flex items-center gap-1 min-h-[36px] flex-shrink-0"
                  >
                    <span>{t('common.addToBag')}</span>
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
