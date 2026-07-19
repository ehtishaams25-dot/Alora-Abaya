import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'signature' | 'runway'>('signature')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:py-20">
      {/* Soft background ambient gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cream/80 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container-layali">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start animate-fade-up">
            <span className="text-eyebrow text-walnut mb-3 sm:mb-4 tracking-[0.25em] sm:tracking-[0.3em] font-medium">
              {t('home.hero.eyebrow')}
            </span>

            <h1 className="text-h1 font-serif text-espresso leading-[1.05] sm:leading-[1.02]">
              {t('home.hero.title')}
            </h1>

            <p className="text-body text-mocha max-w-xl mt-4 sm:mt-6 font-normal leading-relaxed text-sm sm:text-base">
              {t('home.hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6 items-center w-full sm:w-auto">
              <a
                href="#new"
                className="btn-primary shadow-xl shadow-espresso/15 hover:shadow-2xl hover:shadow-espresso/25 transition-all w-full sm:w-auto text-center justify-center min-h-[48px]"
              >
                {t('home.hero.ctaExplore')}
              </a>
              <a
                href="#craftsmanship"
                className="btn-secondary group flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px] py-2"
              >
                <span>{t('home.hero.ctaCraftsmanship')}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Trust Indicators - Mobile-First Grid */}
            <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border2 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 text-espresso font-medium text-[11px] sm:text-xs uppercase tracking-wider">
                  <svg className="w-4 h-4 text-walnut flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">{t('home.hero.trust.securePayment')}</span>
                </div>
                <span className="text-[11px] text-mocha font-sans leading-snug">{t('home.hero.trust.securePaymentDesc')}</span>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 text-espresso font-medium text-[11px] sm:text-xs uppercase tracking-wider">
                  <svg className="w-4 h-4 text-walnut flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span className="truncate">{t('home.hero.trust.fastShipping')}</span>
                </div>
                <span className="text-[11px] text-mocha font-sans leading-snug">{t('home.hero.trust.fastShippingDesc')}</span>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 text-espresso font-medium text-[11px] sm:text-xs uppercase tracking-wider">
                  <svg className="w-4 h-4 text-walnut flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span className="truncate">{t('home.hero.trust.easyReturns')}</span>
                </div>
                <span className="text-[11px] text-mocha font-sans leading-snug">{t('home.hero.trust.easyReturnsDesc')}</span>
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 text-espresso font-medium text-[11px] sm:text-xs uppercase tracking-wider">
                  <svg className="w-4 h-4 text-walnut flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  <span className="truncate">{t('home.hero.trust.atelierSupport')}</span>
                </div>
                <span className="text-[11px] text-mocha font-sans leading-snug">{t('home.hero.trust.atelierSupportDesc')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Collection Banner & Runway Showcase Tabs */}
          <div className="lg:col-span-6 relative animate-scale-in">
            {/* View Mode Toggle Pill Bar */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('signature')}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all min-h-[38px] flex items-center ${
                  activeTab === 'signature'
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-cream text-espresso border border-border2 hover:border-walnut'
                }`}
              >
                Signature Image
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('runway')}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all min-h-[38px] flex items-center ${
                  activeTab === 'runway'
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-cream text-espresso border border-border2 hover:border-walnut'
                }`}
              >
                Atelier Runway Video
              </button>
            </div>

            <div className="aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden relative group bg-cream shadow-2xl shadow-espresso/15 border border-border2/80">
              
              {activeTab === 'signature' ? (
                /* Large Signature Collection Image Banner */
                <div className="w-full h-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
                    alt={t('home.hero.signatureTitle')}
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                  
                  {/* Signature Badge Top Left */}
                  <div className="absolute top-5 start-5 z-10">
                    <span className="bg-espresso/90 backdrop-blur-md text-cream text-[10px] uppercase tracking-[0.25em] px-4 py-2 rounded-full font-sans border border-cream/20 shadow-lg font-medium">
                      {t('home.hero.signatureBadge')}
                    </span>
                  </div>

                  {/* Signature Detail Box Bottom */}
                  <div className="absolute bottom-6 start-6 end-6 sm:end-auto sm:max-w-md bg-sand/95 backdrop-blur-2xl rounded-2xl p-5 border border-border2 shadow-2xl animate-fade-up">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-walnut font-semibold">
                        Exclusive Edition 01
                      </span>
                      <div className="flex text-taupe text-xs">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-espresso font-medium leading-snug">
                      {t('home.hero.signatureTitle')}
                    </h3>
                    <p className="text-[12px] sm:text-xs text-mocha mt-1.5 font-sans leading-normal">
                      {t('home.hero.signatureDesc')}
                    </p>
                  </div>
                </div>
              ) : (
                /* High-Resolution Luxury Video Showcase */
                <div className="w-full h-full relative">
                  <video
                    autoPlay={isPlaying}
                    loop
                    muted={isMuted}
                    playsInline
                    poster="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85"
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  >
                    <source
                      src="https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-showcasing-an-elegant-dress-41618-large.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Soft Gradient Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent pointer-events-none" />

                  {/* Video Control Pills */}
                  <div className="absolute top-5 end-5 flex items-center gap-2 z-10">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-10 h-10 rounded-full bg-sand/85 backdrop-blur-md text-espresso hover:bg-sand flex items-center justify-center shadow-md transition-all"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 rounded-full bg-sand/85 backdrop-blur-md text-espresso hover:bg-sand flex items-center justify-center shadow-md transition-all"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Floating Craftsmanship Card */}
                  <div className="absolute bottom-6 start-6 end-6 sm:end-auto sm:max-w-xs bg-sand/95 backdrop-blur-xl rounded-2xl p-5 border border-border2 shadow-xl animate-fade-up">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-walnut font-medium">
                        Atelier Craftsmanship
                      </span>
                      <div className="flex text-taupe text-xs">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base text-espresso font-medium leading-snug">
                      {t('home.hero.cardTitle')}
                    </h3>
                    <p className="text-[12px] text-mocha mt-1 font-sans leading-normal">
                      {t('home.hero.cardDesc')}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
