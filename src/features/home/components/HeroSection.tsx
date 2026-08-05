import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  
  // Parallax effect for the background image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink -mt-px">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1762605135376-ae5af70a5628?auto=format&fit=crop&w=2000&q=90"
          alt={t('home.hero.signatureTitle', 'Alora Signature')}
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Cinematic Content overlay */}
      <div className="relative z-10 h-full container-alora flex flex-col items-center justify-center pt-20">
        <motion.div 
          className="max-w-4xl text-center flex flex-col items-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
          }}
        >
          {/* Delicate Eyebrow */}
          <motion.span 
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-cream/80 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-sans mb-8 block font-medium"
          >
            {t('home.hero.eyebrow', 'EXCLUSIVELY HANDCRAFTED IN RIYADH, KSA')}
          </motion.span>

          {/* Grand Minimalist Serif Title */}
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-serif text-5xl sm:text-7xl lg:text-[100px] text-cream font-normal tracking-tight leading-[1] drop-shadow-lg"
          >
            {t('home.hero.title', 'Timeless Modest Elegance')}
          </motion.h1>

          {/* Refined Single Luxury Call-to-Action */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-12 sm:mt-16"
          >
            <Link
              to="/dresses"
              className="group relative overflow-hidden bg-cream/10 backdrop-blur-md border border-cream/30 text-cream rounded-full px-10 py-4.5 text-xs sm:text-sm uppercase tracking-[0.26em] font-sans font-medium transition-all hover:bg-cream hover:text-espresso shadow-2xl inline-flex items-center justify-center min-h-[50px]"
            >
              <span className="relative z-10">{t('home.hero.ctaExplore', 'EXPLORE THE COLLECTION')}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center z-10 text-cream"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] mb-4 opacity-70">
          {t('common.scrollDown', 'SCROLL TO EXPLORE')}
        </span>
        <motion.div 
          className="w-[1px] h-12 bg-cream/30 relative overflow-hidden"
        >
          <motion.div 
            className="w-full h-1/2 bg-cream absolute top-0"
            animate={{ 
              y: ["-100%", "200%"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "circInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

