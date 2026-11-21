import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { DRESSES_DATA } from '../../../data/dressesData'
import { Link } from 'react-router-dom'

export function BestSellersSection() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  const bestSellers = DRESSES_DATA.filter(d => d.collection === 'Best Seller').slice(0, 5)

  if (bestSellers.length === 0) return null

  return (
    <section id="bestsellers" className="bg-cream w-full pt-32 lg:pt-48 pb-24 lg:pb-32 overflow-hidden">
      
      {/* Section Header */}
      <motion.div 
        className="container-alora flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
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
          {isArabic ? 'القطع الأكثر طلباً' : 'The Most Coveted'}
        </motion.h2>
        
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
          className="flex md:justify-end"
        >
          <Link
            to="/shop"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 border border-espresso/30 hover:border-espresso text-espresso overflow-hidden transition-all duration-500 ease-out"
          >
            <div className="absolute inset-0 bg-espresso translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 text-xs tracking-[0.2em] uppercase font-medium group-hover:text-cream transition-colors duration-500">
              {t('home.bestSellers.viewAll', 'EXPLORE THE COLLECTION')}
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

      {/* Product Accordion - Edge to Edge */}
      <div className="w-full">
        <div className="w-full grid grid-cols-2 lg:flex lg:flex-row lg:h-[80svh] gap-1 sm:gap-2">
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[75vw] sm:h-[60vw] lg:h-full lg:flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-out overflow-hidden bg-sand"
            >
              <Link to={`/product/${item.id}`} className="block w-full h-full relative flex items-center justify-center">
                <img
                  src={item.image}
                  alt={isArabic ? (item.nameAr || item.name) : item.name}
                  className="w-full lg:w-[45vw] lg:min-w-[45vw] h-full object-cover object-center saturate-50 sepia-[.30] group-hover:saturate-100 group-hover:sepia-0 group-hover:scale-105 transition-[filter,transform] duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 lg:p-8 flex flex-col items-center justify-end text-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none translate-y-4 group-hover:translate-y-0">
                  <h3 className="font-serif text-[13px] sm:text-base lg:text-2xl text-cream mb-1 sm:mb-2 drop-shadow-sm leading-tight">
                    {isArabic ? (item.nameAr || item.name) : item.name}
                  </h3>
                  <span className="font-sans text-[10px] sm:text-xs tracking-[0.1em] lg:tracking-[0.2em] rtl:tracking-[0.05em] text-cream/90 uppercase drop-shadow-sm whitespace-nowrap">
                    {item.price} SAR
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
