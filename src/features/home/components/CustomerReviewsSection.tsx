import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { type ReviewItem } from '../types'

export function CustomerReviewsSection() {
  const { t } = useTranslation()

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

  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [reviews.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-ink">
      
      {/* Full Bleed Background Cinematic Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/testimonial%20and%20middle%20parallax%20img%202.png`}
          alt="Alora Editorial Lifestyle"
          className="w-full h-full object-cover object-center"
        />
        {/* Darker, softer overlay for elegant contrast */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </motion.div>

      {/* Featured Review Slider */}
      <div className="container-alora relative z-10 flex flex-col items-center justify-center h-full px-6">
        

        <div className="relative w-full max-w-3xl h-[35svh] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              {/* Refined Star Rating */}
              <div className="flex text-cream/70 mb-8 gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v16M6 8l12 8M18 8L6 16" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream leading-[1.4] font-light mb-12">
                "{reviews[currentIndex].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <h4 className="font-sans text-xs font-semibold tracking-widest text-cream uppercase mb-1.5">
                  {reviews[currentIndex].author}
                </h4>
                <p className="text-[9px] font-sans text-cream/60 uppercase tracking-[0.2em]">
                  {reviews[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Navigation Indicators & Arrows */}
        <div className="flex items-center gap-6 mt-16">
          <button 
            onClick={handlePrev} 
            className="text-cream/40 hover:text-cream transition-colors duration-500 p-2 focus:outline-none"
            aria-label="Previous review"
          >
            <svg className="rtl:rotate-180" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="group py-4 px-1 focus:outline-none"
                aria-label={`Go to review ${idx + 1}`}
              >
                <div 
                  className={`h-[1px] transition-all duration-700 ease-out ${
                    idx === currentIndex 
                      ? 'w-10 bg-cream' 
                      : 'w-6 bg-cream/30 group-hover:bg-cream/70'
                  }`}
                />
              </button>
            ))}
          </div>

          <button 
            onClick={handleNext} 
            className="text-cream/40 hover:text-cream transition-colors duration-500 p-2 focus:outline-none"
            aria-label="Next review"
          >
            <svg className="rtl:rotate-180" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

      </div>

    </section>
  )
}
