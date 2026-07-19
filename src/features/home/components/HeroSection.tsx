import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-ink text-cream -mt-px">
      {/* Full-Bleed High-Fashion Editorial Banner Container (House of CB / Meshki style) */}
      <div className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Editorial Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1762605135376-ae5af70a5628?auto=format&fit=crop&w=2000&q=90"
            alt={t('home.hero.signatureTitle')}
            className="w-full h-full object-cover object-top sm:object-center scale-100 animate-scale-in duration-1000"
          />
          {/* Multi-layered luxury editorial dark gradients for high-contrast typography readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/60 to-espresso/30 rtl:from-espresso/30 rtl:via-espresso/60 rtl:to-espresso/90 sm:from-espresso/80 sm:via-espresso/45 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30" />
        </div>

        {/* Minimalist Luxury Content Overlay */}
        <div className="container-layali relative z-10 py-24 lg:py-32 flex flex-col items-center justify-center text-center min-h-[80vh] lg:min-h-[85vh]">
          {/* Editorial Typography Showcase */}
          <div className="max-w-4xl my-auto py-12 animate-fade-up flex flex-col items-center">
            {/* Delicate Eyebrow */}
            <span className="text-cream/90 text-[11px] sm:text-xs tracking-[0.32em] uppercase font-sans mb-6 block font-medium">
              {t('home.hero.eyebrow', 'EXCLUSIVELY HANDCRAFTED IN RIYADH, KSA')}
            </span>

            {/* Grand Minimalist Serif Title */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[90px] text-cream font-normal tracking-tight leading-[0.95] drop-shadow-sm">
              {t('home.hero.title', 'Timeless Modest Elegance')}
            </h1>

            {/* Refined Single Luxury Call-to-Action */}
            <div className="mt-10 sm:mt-12">
              <a
                href="#new"
                className="bg-cream text-espresso rounded-full px-10 py-4.5 text-xs sm:text-sm uppercase tracking-[0.26em] hover:bg-white hover:scale-[1.02] transition-all duration-500 font-sans font-semibold shadow-2xl inline-flex items-center justify-center min-h-[50px]"
              >
                {t('home.hero.ctaExplore', 'EXPLORE THE COLLECTION')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
