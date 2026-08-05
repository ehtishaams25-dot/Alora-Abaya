import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { type ReviewItem } from '../types'

export function CustomerReviewsSection() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  const reviews: ReviewItem[] = [
    {
      id: "rev-1",
      author: t('home.reviews.items.0.author'),
      location: t('home.reviews.items.0.location'),
      quote: t('home.reviews.items.0.quote'),
      rating: t('home.reviews.items.0.rating')
    },
    {
      id: "rev-2",
      author: t('home.reviews.items.1.author'),
      location: t('home.reviews.items.1.location'),
      quote: t('home.reviews.items.1.quote'),
      rating: t('home.reviews.items.1.rating')
    },
    {
      id: "rev-3",
      author: t('home.reviews.items.2.author'),
      location: t('home.reviews.items.2.location'),
      quote: t('home.reviews.items.2.quote'),
      rating: t('home.reviews.items.2.rating')
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-ink text-cream relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-espresso/20 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-walnut/10 blur-3xl opacity-50 pointer-events-none" />

      <div className="container-alora relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Section Header (Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:pb-16">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              <motion.span 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
                className="text-cream/70 text-[10px] sm:text-[11px] tracking-[0.3em] block uppercase mb-6"
              >
                {t('home.reviews.eyebrow')}
              </motion.span>
              <motion.h2 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream font-normal tracking-tight leading-[1.1] mb-6"
              >
                {isArabic ? 'بأصواتهم' : 'In Their Words'}
              </motion.h2>
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
                className="text-cream/80 text-sm sm:text-base leading-relaxed font-sans max-w-sm"
              >
                {isArabic 
                  ? 'اكتشف كيف تنسق عميلاتنا المميزات تصاميم ألورا، ليعبرن عن الأناقة الخالدة بأسلوبهن الخاص.' 
                  : 'Discover how our distinguished clientele style their Alora pieces, embodying timeless elegance in every setting.'}
              </motion.p>
            </motion.div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.div 
              className="flex flex-col gap-12 sm:gap-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
              }}
            >
              {reviews.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start group"
                >
                  {/* Avatar / Monogram */}
                  <div className="w-16 sm:w-20 h-16 sm:h-20 shrink-0 rounded-full border border-cream/20 flex items-center justify-center bg-espresso/30 text-cream font-serif text-xl sm:text-2xl transition-colors duration-500 group-hover:bg-cream group-hover:text-ink">
                    {item.author.charAt(0)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-10 sm:pb-12 border-b border-cream/10">
                    <div className="flex text-cream/90 text-sm mb-6 gap-1">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    
                    <blockquote className="font-serif text-xl sm:text-2xl text-cream leading-relaxed font-light italic mb-8 relative">
                      <span className="absolute -start-4 -top-3 text-4xl text-cream/20 font-sans">"</span>
                      {item.quote}
                    </blockquote>
                    
                    <div>
                      <h4 className="font-sans text-sm sm:text-base font-semibold tracking-wide text-cream uppercase mb-1">
                        {item.author}
                      </h4>
                      <p className="text-xs font-sans text-cream/60 uppercase tracking-[0.15em]">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
