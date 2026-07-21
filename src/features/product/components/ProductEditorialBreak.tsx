import { useTranslation } from 'react-i18next'

interface ProductEditorialBreakProps {
  isArabic: boolean
}

export function ProductEditorialBreak({ isArabic }: ProductEditorialBreakProps) {
  const { t } = useTranslation()

  // Large cinematic lifestyle banner image (High-res luxury editorial photography)
  const bannerImg = "https://images.unsplash.com/photo-1772474500365-c2c520545f44?auto=format&fit=crop&w=2400&q=90"

  return (
    <section className="hidden md:flex relative w-full min-h-[70svh] lg:min-h-[85svh] items-center justify-center overflow-hidden bg-espresso group">
      {/* Cinematic Background Image with Slow Zoom on Hover */}
      <div className="absolute inset-0">
        <img
          src={bannerImg}
          alt={t('product.editorialBreak.quote', isArabic ? 'أناقة ملكية في كل خطوة.' : 'Grace in Every Step.')}
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80"
          loading="lazy"
        />
        {/* Deep atmospheric gradient overlays for serene, distraction-free pause */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-espresso/60" />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      {/* Minimal Typography: One Elegant Sentence Only */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl mx-auto animate-fade-up">
        <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream font-light tracking-wide leading-tight sm:leading-tight drop-shadow-md">
          {t('product.editorialBreak.quote', isArabic ? 'أناقة ملكية في كل خطوة.' : 'Grace in Every Step.')}
        </p>
      </div>
    </section>
  )
}
