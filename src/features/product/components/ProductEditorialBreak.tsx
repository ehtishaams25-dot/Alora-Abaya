import { useTranslation } from 'react-i18next'

interface ProductEditorialBreakProps {
  isArabic: boolean
}

export function ProductEditorialBreak({ isArabic }: ProductEditorialBreakProps) {
  const { t } = useTranslation()

  // Large cinematic lifestyle banner image (High-res luxury editorial photography)
  const bannerImg = "https://images.unsplash.com/photo-1772474500365-c2c520545f44?auto=format&fit=crop&w=2400&q=90"

  return (
    <section className="hidden md:flex relative w-full min-h-[70svh] lg:min-h-[85svh] items-center justify-center overflow-hidden bg-espresso">
      {/* Cinematic Background Image with True Fixed Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('${bannerImg}')`,
          backgroundAttachment: 'fixed',
        }}
        role="img"
        aria-label={t('product.editorialBreak.imageAlt', isArabic ? 'صورة إعلانية للأتليه الملكي' : 'Alora Atelier Luxury Editorial Banner')}
      />
      {/* Deep atmospheric gradient overlays for serene, distraction-free pause */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-espresso/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] pointer-events-none" />
    </section>
  )
}



