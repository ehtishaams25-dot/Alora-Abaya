import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'

export function Footer() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  return (
    <footer className="bg-ink border-t border-ink pt-20 pb-12 text-cream font-sans mt-auto overflow-hidden">
      <div className="container-alora relative z-10">
        
        {/* Top Section: Giant Logo & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-16 pb-20 border-b border-cream/10">
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              {isArabic ? 'انضمي إلى عالم ألورا' : 'Join the Alora Circle'}
            </h3>
            <p className="text-sm sm:text-base text-cream/70 mb-8 max-w-md leading-relaxed">
              {isArabic 
                ? 'اشتركي للحصول على دعوات حصرية، وصول مبكر لأحدث التشكيلات، وإلهام مخصص.'
                : 'Subscribe for exclusive invitations, early access to new collections, and tailored inspiration.'}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-0 w-full max-w-md border-b border-cream/30 pb-2 relative group">
              <input
                type="email"
                placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                className="bg-transparent border-none px-0 py-2 text-sm text-cream outline-none transition-colors w-full placeholder:text-cream/40 focus:ring-0"
                required
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.2em] font-medium text-cream hover:text-walnut transition-colors shrink-0 pt-2 sm:pt-0"
              >
                {isArabic ? 'اشتراك' : 'SUBSCRIBE'}
              </button>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cream scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left duration-500" />
            </form>
          </div>

          <div className="w-full lg:w-1/2 flex lg:justify-end items-end">
            <h2 className="font-serif text-[60px] sm:text-[100px] lg:text-[140px] leading-[0.7] tracking-tighter text-cream opacity-90 mix-blend-overlay">
              ALORA
            </h2>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 text-xs border-b border-cream/10">
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
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-cream/40 font-sans tracking-wide uppercase">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <span>Privately Handcrafted in Riyadh, KSA</span>
            <span>✦</span>
            <span className="font-medium text-cream/60">ALORA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
