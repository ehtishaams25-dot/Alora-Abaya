import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function AtelierSection() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[90svh] bg-cream">
      
      {/* Left side: Imagery */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] relative overflow-hidden rounded-2xl aspect-[3/4] shadow-md">
          <img
            src="https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=1000&q=88"
            alt="Alora Craftsmanship"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>
      </motion.div>

      {/* Right side: Elegant Typography & Whitespace */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-20 lg:py-0">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="max-w-xl mx-auto lg:mx-0 w-full"
        >
          <motion.span 
            variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
            className="text-eyebrow text-walnut mb-8 tracking-[0.3em] uppercase block"
          >
            {isArabic ? 'الأتليه الخاص بنا' : 'THE ATELIER'}
          </motion.span>
          
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight leading-[1.15] mb-10"
          >
            {isArabic 
              ? 'دقة في التفاصيل، فخامة في الملبس' 
              : 'Precision in detail, luxury in drape.'}
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
            className="text-mocha text-sm sm:text-base leading-relaxed font-sans mb-14"
          >
            {isArabic 
              ? 'كل قطعة من ألورا هي تحفة فنية تُصنع يدوياً في مشغلنا بالرياض. نختار أجود أنواع الحرير والأقمشة الفاخرة، مع اهتمام بالغ بالتفاصيل والتطريز الدقيق، لنقدم لكِ عباءات وفساتين تعكس جوهر الأناقة المحتشمة والفخامة الخالدة.' 
              : 'Every Alora piece is a masterpiece handcrafted in our Riyadh atelier. We select the finest silks and premium fabrics, with profound attention to detail and delicate embroidery, bringing you abayas and dresses that reflect the essence of modest elegance and timeless luxury.'}
          </motion.p>
          
          {/* Why Choose Us Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-espresso/10 pt-10">
            {[0, 1, 2].map((index) => (
              <motion.div 
                key={index}
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="flex flex-col"
              >
                <span className="text-xs font-serif text-walnut mb-3 block">0{index + 1}</span>
                <h3 className="font-serif text-lg text-espresso mb-2">
                  {t(`home.whyChooseUs.pillars.${index}.title`)}
                </h3>
                <p className="text-mocha text-sm leading-relaxed">
                  {t(`home.whyChooseUs.pillars.${index}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}
