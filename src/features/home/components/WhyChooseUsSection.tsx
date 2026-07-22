import { useTranslation } from 'react-i18next'
import { type PillarItem } from '../types'

export function WhyChooseUsSection() {
  const { t } = useTranslation()

  const pillars: PillarItem[] = [
    {
      id: "wc-1",
      title: t('home.whyChooseUs.pillars.0.title'),
      description: t('home.whyChooseUs.pillars.0.description')
    },
    {
      id: "wc-2",
      title: t('home.whyChooseUs.pillars.1.title'),
      description: t('home.whyChooseUs.pillars.1.description')
    }
  ]

  // Direction-aware and clean luxury vector icons
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <svg className="w-5 h-5 text-walnut transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        )
      case 1:
      default:
        return (
          <svg className="w-5 h-5 text-walnut transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        )
    }
  }

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-cream border-t border-border2 relative overflow-hidden">
      <div className="container-alora max-w-5xl mx-auto px-4 sm:px-6">
        {/* Minimalist Centered Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2.5 tracking-[0.3em] block uppercase text-xs">
            {t('home.whyChooseUs.eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-espresso font-normal tracking-tight">
            {t('home.whyChooseUs.title')}
          </h2>
        </div>

        {/* Sleek Minimalist 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="group bg-sand/60 hover:bg-sand rounded-2xl p-6 sm:p-8 border border-border2/80 hover:border-walnut/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Minimal Header Line: Icon + Numeral + Quality Seal */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cream border border-border2 flex items-center justify-center text-walnut group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                      {getIcon(idx)}
                    </div>
                    <span className="font-serif text-xs tracking-[0.2em] text-walnut/90 uppercase font-semibold">
                      {idx === 0 ? '01' : '02'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream border border-border2/70 text-[10px] font-medium tracking-wider text-espresso/80 uppercase shadow-2xs">
                    <span className="w-1 h-1 rounded-full bg-walnut inline-block" />
                    {idx === 0
                      ? t('home.whyChooseUs.features.fabrics.seal', 'Certified Authentic')
                      : t('home.whyChooseUs.features.shipping.seal', 'VIP White-Glove Care')}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal mb-2.5 tracking-tight group-hover:text-black transition-colors duration-300">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-mocha leading-relaxed font-sans mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Minimal Bottom Hallmark Line */}
              <div className="pt-4 border-t border-border2/60 flex items-center justify-between text-xs tracking-[0.12em] uppercase text-walnut font-medium">
                <span className="flex items-center gap-2">
                  <span className="text-[10px]">✦</span>
                  {idx === 0
                    ? t('home.whyChooseUs.features.fabrics.tag', '100% Japanese & Korean Silks')
                    : t('home.whyChooseUs.features.shipping.tag', '24H Riyadh & GCC Express')}
                </span>
                <span className="text-[10px] text-espresso/60 font-serif">ALORA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

