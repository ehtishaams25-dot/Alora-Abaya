import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import aloraLogo from '../assets/logos/Artboard 13@4x.png'

export function Footer() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  return (
    <footer className="bg-ink border-t border-ink pt-10 lg:pt-12 pb-0 text-cream font-sans mt-auto overflow-hidden">
      <div className="container-alora relative z-10">
        


        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-6 lg:py-10 text-xs border-b border-cream/10">
          <div className="flex flex-col gap-6">
            <h4 className="uppercase tracking-[0.25em] font-medium text-cream/90 font-sans text-[10px]">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-4 text-cream/60 text-sm">
              <li><Link to="/dresses" className="hover:text-cream transition-colors">{t('navigation.allDresses')}</Link></li>
              <li><Link to="/#new" className="hover:text-cream transition-colors">{t('navigation.newArrivals')}</Link></li>
              <li><Link to="/#bestsellers" className="hover:text-cream transition-colors">{t('navigation.bestSellers')}</Link></li>
              <li><Link to="/#categories" className="hover:text-cream transition-colors">{t('navigation.categories')}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="uppercase tracking-[0.25em] font-medium text-cream/90 font-sans text-[10px]">
              {t('footer.customerCare')}
            </h4>
            <ul className="flex flex-col gap-4 text-cream/60 text-sm">
              <li><Link to="/#about" className="hover:text-cream transition-colors">{t('navigation.aboutUs')}</Link></li>
              <li><Link to="/#faq" className="hover:text-cream transition-colors">{t('navigation.faq')}</Link></li>
              <li><Link to="/#returns" className="hover:text-cream transition-colors">{t('navigation.returns')}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="uppercase tracking-[0.25em] font-medium text-cream/90 font-sans text-[10px]">
              {t('footer.boutique')}
            </h4>
            <ul className="flex flex-col gap-4 text-cream/60 text-sm font-sans">
              <li>Flagship Salon</li>
              <li>Riyadh, KSA</li>
              <li>By Appointment Only</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="uppercase tracking-[0.25em] font-medium text-cream/90 font-sans text-[10px]">
              {isArabic ? 'تواصل معنا' : 'CONNECT'}
            </h4>
            <div className="flex flex-col gap-4 text-cream/60 text-sm">
              <a href="https://instagram.com/alloorraa1" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors inline-flex items-center gap-2 group/link">
                <Instagram className="w-4 h-4 group-hover/link:-translate-y-0.5 transition-transform" />
                <span dir="ltr">@alloorraa1</span>
              </a>
              <a href="https://tiktok.com/@alloora1" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors inline-flex items-center gap-2 group/link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:-translate-y-0.5 transition-transform">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <span dir="ltr">@alloora1</span>
              </a>
              <a href="https://wa.me/966560344904" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors inline-flex items-center gap-2 group/link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:-translate-y-0.5 transition-transform">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
                <span dir="ltr">+966 560344904</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-cream/40 font-sans tracking-wide uppercase">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <span>Privately Handcrafted in Riyadh, KSA</span>
            <span>✦</span>
            <span className="font-medium text-cream/60">ALORA</span>
          </div>
        </div>
      </div>
      
      {/* Giant Logo at the very bottom */}
      <div 
        className="w-full flex justify-center items-start overflow-hidden pointer-events-none select-none -mt-4 lg:-mt-8"
        style={{
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          maxHeight: '40vh'
        }}
      >
        <img 
          src={aloraLogo} 
          alt="ALORA" 
          className="w-[95%] lg:w-full h-auto object-contain opacity-90 filter brightness-0 invert" 
        />
      </div>
    </footer>
  )
}
