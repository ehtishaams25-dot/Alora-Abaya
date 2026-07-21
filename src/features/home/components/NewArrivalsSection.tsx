import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { type ProductItem } from '../types'
import { useShop } from '../../../providers/ShopProvider'

export function NewArrivalsSection() {
  const { t, i18n } = useTranslation()
  const { addToCart } = useShop()

  const products: ProductItem[] = [
    {
      id: "na-1",
      name: "Royal Silk Bisht Abaya",
      nameAr: "عباية بشت ملكية من الحرير",
      price: "2,450",
      image: "https://images.unsplash.com/photo-1772474500365-c2c520545f44?auto=format&fit=crop&w=800&q=85",
      colors: ["#1A1A1A", "#3B2F2F", "#8B7355"],
      badge: "New Arrival"
    },
    {
      id: "na-2",
      name: "Midnight Velvet Gilded Abaya",
      nameAr: "عباية مخملية منتصف الليل مطرزة بالذهب",
      price: "3,100",
      image: "https://images.unsplash.com/photo-1724412665971-114bd351a42d?auto=format&fit=crop&w=800&q=85",
      colors: ["#0D1321", "#4A5D23"],
      badge: "Limited Edition"
    },
    {
      id: "na-3",
      name: "Desert Sand Double Nidha",
      nameAr: "عباية ندا مزدوجة بلون رمال الصحراء",
      price: "1,850",
      image: "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=800&q=85",
      colors: ["#FAF9F6", "#B38B6D", "#6E5C53"],
      badge: "New Arrival"
    },
    {
      id: "na-4",
      name: "Emerald Silk Organza Set",
      nameAr: "طقم أورجانزا حريري بلون الزمرد",
      price: "2,800",
      image: "https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=800&q=85",
      colors: ["#1B3B2B", "#1A1A1A"],
      badge: "Atelier Exclusive"
    }
  ]

  const isArabic = i18n.language.startsWith('ar')

  return (
    <section id="new" className="section-padding bg-sand">
      <div className="container-layali">
        {/* Minimalist Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.28em] block">
            {t('home.newArrivals.eyebrow')}
          </span>
          <h2 className="text-h2 font-serif text-espresso font-normal tracking-tight">
            {t('home.newArrivals.title')}
          </h2>
          <div className="mt-6 flex justify-center">
            <Link
              to="/dresses"
              className="btn-secondary flex items-center gap-2 group min-h-[44px]"
            >
              <span>{t('common.viewAll')}</span>
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Mobile-First Touch Swipe Carousel -> Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 sm:pb-0 sm:overflow-visible scrollbar-none px-4 sm:px-0">
          {products.map((item) => (
            <div
              key={item.id}
              className="card-product group flex flex-col flex-shrink-0 w-[270px] sm:w-auto snap-start bg-cream border border-border2/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <img
                  src={item.image}
                  alt={isArabic ? (item.nameAr || item.name) : item.name}
                  className="card-product-img w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {item.badge && (
                  <span className="absolute top-3.5 start-3.5 bg-espresso/90 backdrop-blur-md text-cream text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-medium shadow-md">
                    {t('common.newBadge')}
                  </span>
                )}

                {/* Sleek Quick Add button for desktop hover */}
                <div className="absolute bottom-3 inset-x-3 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    type="button"
                    onClick={() => addToCart(item, item.colors?.[0])}
                    className="w-full bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream py-2 px-3 rounded-xl text-[10px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center gap-1 cursor-pointer border border-border2/50"
                  >
                    <span>+ {t('common.addToBag')}</span>
                  </button>
                </div>

                {/* Mobile touch clean mini button */}
                <button
                  type="button"
                  onClick={() => addToCart(item, item.colors?.[0])}
                  className="lg:hidden absolute bottom-3 end-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream shadow-sm flex items-center justify-center transition-colors z-10"
                  title={t('common.addToBag')}
                >
                  <span className="text-base font-light leading-none mb-0.5">+</span>
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-cream">
                <div>
                  <h3 className="font-serif text-base sm:text-lg text-espresso font-medium leading-snug group-hover:text-walnut transition-colors line-clamp-1">
                    {isArabic ? (item.nameAr || item.name) : item.name}
                  </h3>
                  <p className="text-xs font-sans text-mocha mt-1 uppercase tracking-wider font-medium">
                    {item.price} {t('common.priceAed')}
                  </p>
                </div>

                {/* Color Swatches */}
                {item.colors && item.colors.length > 0 && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border2/60">
                    <span className="text-[10px] text-mocha uppercase tracking-wider">
                      {t('common.colorOptions')}:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-border2 shadow-2xs inline-block"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
