import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  
  // Parallax effect for the background video
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
        <video
          src="/videos/Hero%20section%20video%202.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Soft, luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

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

