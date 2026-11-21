import { useTranslation } from 'react-i18next'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function EditorialBreakSection() {
  const { i18n } = useTranslation()
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const isArabic = i18n.language.startsWith('ar')

  return (
    <section ref={ref} className="relative h-[65svh] lg:h-[100svh] w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[140%] -top-[20%]">
        <img
          src="/images/testimonial and middle parallax img 1.png"
          alt="Alora Craftsmanship"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/90" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 container-alora flex flex-col items-center justify-center text-center">
        <motion.div 
          className="max-w-2xl flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >


          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cream font-normal tracking-tight leading-[1.1] mb-8"
          >
            {isArabic ? 'حيث يلتقي الفن مع الأناقة المحتشمة في كل غرزة.' : 'Where art meets modest elegance in every stitch.'}
          </motion.h2>


        </motion.div>
      </div>
    </section>
  )
}
