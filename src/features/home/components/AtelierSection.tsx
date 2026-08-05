import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function AtelierSection() {
  const { i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  return (
    <section className="py-24 lg:py-32 bg-cream border-t border-border2/50 overflow-hidden relative">
      <div className="container-alora">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="flex flex-col max-w-xl mx-auto lg:mx-0 text-center lg:text-start"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
              className="text-eyebrow text-walnut mb-6 tracking-[0.3em] uppercase block font-medium"
            >
              {isArabic ? 'الأتليه الخاص بنا' : 'THE ATELIER'}
            </motion.span>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight leading-[1.1] mb-8"
            >
              {isArabic 
                ? 'دقة في التفاصيل، فخامة في الملبس' 
                : 'Precision in detail, luxury in drape.'}
            </motion.h2>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} 
              className="text-mocha text-sm sm:text-base leading-relaxed font-sans mb-10"
            >
              {isArabic 
                ? 'كل قطعة من ألورا هي تحفة فنية تُصنع يدوياً في مشغلنا بالرياض. نختار أجود أنواع الحرير والأقمشة الفاخرة، مع اهتمام بالغ بالتفاصيل والتطريز الدقيق، لنقدم لكِ عباءات وفساتين تعكس جوهر الأناقة المحتشمة والفخامة الخالدة.' 
                : 'Every Alora piece is a masterpiece handcrafted in our Riyadh atelier. We select the finest silks and premium fabrics, with profound attention to detail and delicate embroidery, bringing you abayas and dresses that reflect the essence of modest elegance and timeless luxury.'}
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <Link
                to="/about"
                className="text-xs uppercase tracking-[0.2em] font-medium text-espresso border-b border-espresso pb-1 hover:text-walnut hover:border-walnut transition-colors inline-block"
              >
                {isArabic ? 'اكتشف حرفيتنا' : 'DISCOVER OUR CRAFT'}
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Content (Asymmetrical Offset) */}
          <motion.div 
            className="relative w-full h-[600px] lg:h-[800px] lg:-mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-sand/20 rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=1200&q=90"
                alt="Alora Craftsmanship Detail"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-espresso/10" />
            </div>
            
            {/* Small Floating Accent Image (Optional depth) */}
            <motion.div 
              className="absolute -bottom-10 -start-10 w-48 sm:w-64 aspect-[3/4] bg-sand p-2 shadow-2xl hidden md:block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1762376128087-bc29c6df08c0?auto=format&fit=crop&w=600&q=80"
                alt="Embroidery Detail"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
