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
    <section id="new" className="section-padding bg-sand">
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
            {t('home.newArrivals.eyebrow')}
          </motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-h2 font-serif text-espresso font-normal tracking-tight">
            {t('home.newArrivals.title')}
          </motion.h2>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="mt-8 flex justify-center">
            <Link
              to="/dresses"
              className="border-b border-walnut/50 text-walnut pb-1 hover:text-espresso hover:border-espresso transition-colors text-xs uppercase tracking-[0.2em] font-medium"
            >
              {t('common.viewAll')}
            </Link>
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
