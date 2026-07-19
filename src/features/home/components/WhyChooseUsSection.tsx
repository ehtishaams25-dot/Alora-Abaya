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
    },
    {
      id: "wc-3",
      title: t('home.whyChooseUs.pillars.2.title'),
      description: t('home.whyChooseUs.pillars.2.description')
    },
    {
      id: "wc-4",
      title: t('home.whyChooseUs.pillars.3.title'),
      description: t('home.whyChooseUs.pillars.3.description')
    }
  ]

  // Direction-aware and clean luxury vector icons
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <svg className="w-6 h-6 text-walnut" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        )
      case 1:
        return (
          <svg className="w-6 h-6 text-walnut" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
        )
      case 2:
        return (
          <svg className="w-6 h-6 text-walnut" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        )
      case 3:
      default:
        return (
          <svg className="w-6 h-6 text-walnut" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )
    }
  }

  return (
    <section className="section-padding bg-cream border-t border-border2">
      <div className="container-layali">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.25em] block">
            {t('home.whyChooseUs.eyebrow')}
          </span>
          <h2 className="text-h2 font-serif text-espresso">
            {t('home.whyChooseUs.title')}
          </h2>
          <p className="text-body text-mocha mt-3 text-sm sm:text-base">
            {t('home.whyChooseUs.description')}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="bg-sand/90 rounded-2xl p-6 sm:p-8 border border-border2/80 hover:border-walnut/60 transition-all duration-300 flex flex-col justify-between hover:shadow-md group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream border border-border2 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {getIcon(idx)}
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-espresso font-medium mb-3 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-mocha leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border2/50 flex items-center justify-between text-[11px] text-walnut uppercase tracking-widest font-medium">
                <span>Layali Standard</span>
                <span>0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
