import { useTranslation } from 'react-i18next'
import { type CategoryItem } from '../types'

export function CategoriesSection() {
  const { t, i18n } = useTranslation()

  const categories: CategoryItem[] = [
    {
      id: "cat-1",
      title: "Daily Modest Abayas",
      titleAr: "عبايات الاستخدام اليومي",
      count: "24 Pieces",
      countAr: "24 قطعة",
      image: "https://images.unsplash.com/photo-1752794673269-dc356838c5fd?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: "cat-2",
      title: "Occasion & Evening Gowns",
      titleAr: "فساتين السهرة والمناسبات",
      count: "18 Pieces",
      countAr: "18 قطعة",
      image: "https://images.unsplash.com/photo-1767469697194-ac997d70b1ee?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: "cat-3",
      title: "Bespoke Bisht & Kaftans",
      titleAr: "بشت وكفطان فاخر",
      count: "15 Pieces",
      countAr: "15 قطعة",
      image: "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: "cat-4",
      title: "Luxury Sets & Hijabs",
      titleAr: "أطقم فاخرة وشيلات",
      count: "32 Pieces",
      countAr: "32 قطعة",
      image: "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=800&q=85"
    }
  ]

  const isArabic = i18n.language.startsWith('ar')

  return (
    <section id="dresses" className="section-padding bg-cream border-t border-b border-border2">
      <div id="categories" className="container-layali">
        {/* Minimalist Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.28em] block">
            {t('home.categories.eyebrow')}
          </span>
          <h2 className="text-h2 font-serif text-espresso font-normal tracking-tight">
            {t('home.categories.title')}
          </h2>
        </div>

        {/* Mobile-First Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#category-${cat.id}`}
              className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden block bg-espresso shadow-lg sm:hover:shadow-2xl sm:hover:-translate-y-1 transition-all duration-500"
            >
              <img
                src={cat.image}
                alt={isArabic ? (cat.titleAr || cat.title) : cat.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Content Box */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end items-center text-center">
                <span className="text-[10px] sm:text-xs text-sand/80 uppercase tracking-[0.2em] mb-1 font-sans">
                  {isArabic ? (cat.countAr || cat.count) : cat.count}
                </span>
                <h3 className="font-serif text-base sm:text-xl text-cream font-medium leading-tight group-hover:text-sand transition-colors">
                  {isArabic ? (cat.titleAr || cat.title) : cat.title}
                </h3>
                
                <div className="w-8 h-0.5 bg-walnut mt-3 transform scale-x-75 group-hover:scale-x-125 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
