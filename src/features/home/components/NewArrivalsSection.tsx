import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DRESSES_DATA } from '../../../data/dressesData'
import { LuxuryProductCard } from '../../../components/ui/LuxuryProductCard'

export function NewArrivalsSection() {
  const { t, i18n } = useTranslation()

  // Use actual products from the database instead of hardcoded placeholders
  const products = DRESSES_DATA.filter(d => d.collection === 'New Arrival').slice(0, 4)

  const isArabic = i18n.language.startsWith('ar')

  return (
    <section id="new" className="section-padding bg-sand min-h-[100svh] flex flex-col justify-center">
      <div className="container-alora">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-espresso font-normal tracking-tight text-start"
          >
            {t('home.newArrivals.title')}
          </motion.h2>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
            className="flex md:justify-end"
          >
            <Link
              to="/dresses"
              className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 border border-espresso/30 hover:border-espresso text-espresso overflow-hidden transition-all duration-500 ease-out"
            >
              <div className="absolute inset-0 bg-espresso translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-xs tracking-[0.2em] uppercase font-medium group-hover:text-cream transition-colors duration-500">
                {t('common.viewAll')}
              </span>
              <svg 
                className={`w-4 h-4 relative z-10 transform transition-all duration-500 group-hover:text-cream ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Spacious Editorial Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          {products.map((item) => (
            <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
              <LuxuryProductCard item={item} isArabic={isArabic} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
