import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { DRESSES_DATA } from '../../../data/dressesData'
import { LuxuryProductCard } from '../../../components/ui/LuxuryProductCard'

export function BestSellersSection() {
  const { t, i18n } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Use actual products from the database that are Best Sellers
  const allBestSellers = DRESSES_DATA.filter(d => d.collection === 'Best Seller')

  const filters = [
    { id: 'all', label: t('common.filterAll', 'All') },
    { id: 'Dresses', label: t('navigation.dresses', 'Dresses') },
    { id: 'Kaftans', label: t('navigation.kaftans', 'Kaftans') },
    { id: 'Occasion Wear', label: t('navigation.occasion', 'Occasion') },
  ]

  const filteredProducts = activeFilter === 'all'
    ? allBestSellers.slice(0, 4) // Show top 4 overall if 'all' is selected
    : allBestSellers.filter(p => p.category === activeFilter).slice(0, 4)

  const isArabic = i18n.language.startsWith('ar')

  return (
    <section id="bestsellers" className="section-padding bg-sand">
      <div className="container-alora">
        {/* Minimalist Centered Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-eyebrow text-walnut mb-3 tracking-[0.28em] block">
            {t('home.bestSellers.eyebrow')}
          </motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-h2 font-serif text-espresso font-normal tracking-tight">
            {t('home.bestSellers.title')}
          </motion.h2>

          {/* Centered Filter Tabs (Forced single line) */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="mt-8 flex flex-nowrap items-center justify-center gap-4 max-w-full w-full">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`text-[10px] sm:text-xs uppercase tracking-widest font-medium transition-colors border-b-2 pb-1 ${
                  activeFilter === filter.id
                    ? 'border-espresso text-espresso'
                    : 'border-transparent text-mocha hover:text-espresso hover:border-walnut/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Spacious Editorial Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          {filteredProducts.map((item) => (
            <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
              <LuxuryProductCard item={item} isArabic={isArabic} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

