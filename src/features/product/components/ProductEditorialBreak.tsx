import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface ProductEditorialBreakProps {
  isArabic: boolean
}

export function ProductEditorialBreak({ isArabic }: ProductEditorialBreakProps) {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Check if element is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2
        const distanceFromCenter = viewportCenter - elementCenter
        
        // This gives a parallax effect relative to the center of the screen
        // Reduced speed to -0.1 to limit max travel
        setOffsetY(distanceFromCenter * -0.1)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // The requested new image. 
  const bannerImg = "/images/photo-1767469697194-ac997d70b1ee.avif"

  return (
    <section ref={sectionRef} className="hidden md:flex relative w-full min-h-[50svh] lg:min-h-[65svh] items-center justify-center overflow-hidden bg-espresso">
      {/* Subtle Parallax Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('${bannerImg}')`,
          // Increased scale to 1.25 to create a larger buffer around the image, preventing edges from showing
          transform: `translateY(${offsetY}px) scale(1.25)`,
          willChange: 'transform'
        }}
        role="img"
        aria-label={t('product.editorialBreak.imageAlt', isArabic ? 'صورة إعلانية للأتليه الملكي' : 'Alora Atelier Luxury Editorial Banner')}
      />
      {/* Solid low opacity overlay as requested */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
    </section>
  )
}



