import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import aloraLogo from '../assets/logos/Artboard 13@4x.png'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-cream border-t border-border2 pt-16 pb-12 text-espresso font-sans mt-auto">
      <div className="container-layali">
        {/* Top Section: VIP Circle Newsletter & Brand Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border2">
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="group mb-5 inline-block">
              <img
                src={aloraLogo}
                alt="ALORA"
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-500"
              />
            </Link>
            <p className="text-sm text-mocha leading-relaxed max-w-sm">
              {t('home.hero.description')}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-success uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
              <span>{t('footer.paymentSecure')}</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center bg-sand/80 p-6 sm:p-8 rounded-3xl border border-border2/80 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl text-espresso mb-2">
              {t('footer.newsletterTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-mocha mb-6 leading-relaxed max-w-xl">
              {t('footer.newsletterDesc')}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="bg-cream border border-border2 focus:border-espresso rounded-full px-5 py-3.5 text-sm text-espresso outline-none transition-colors w-full placeholder:text-mocha/60"
                required
              />
              <button
                type="submit"
                className="btn-primary py-3.5 px-8 flex-shrink-0 text-xs sm:text-sm tracking-[0.2em] shadow-md hover:shadow-lg transition-all"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Quick Links & Salons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs border-b border-border2">
          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.22em] font-medium text-espresso font-sans">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-mocha">
              <li><Link to="/#dresses" className="hover:text-espresso transition-colors">{t('navigation.allDresses')}</Link></li>
              <li><Link to="/#new" className="hover:text-espresso transition-colors">{t('navigation.newArrivals')}</Link></li>
              <li><Link to="/#bestsellers" className="hover:text-espresso transition-colors">{t('navigation.bestSellers')}</Link></li>
              <li><Link to="/#categories" className="hover:text-espresso transition-colors">{t('navigation.categories')}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.22em] font-medium text-espresso font-sans">
              {t('footer.customerCare')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-mocha">
              <li><Link to="/#about" className="hover:text-espresso transition-colors">{t('navigation.aboutUs')}</Link></li>
              <li><Link to="/#faq" className="hover:text-espresso transition-colors">{t('navigation.faq')}</Link></li>
              <li><Link to="/#returns" className="hover:text-espresso transition-colors">{t('navigation.returns')}</Link></li>
              <li><Link to="/#contact" className="hover:text-espresso transition-colors">{t('navigation.contact')}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.22em] font-medium text-espresso font-sans">
              {t('footer.boutique')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-mocha font-sans">
              <li>Flagship Salon: Via Riyadh, KSA</li>
              <li>Al Bujairi Heritage Suite, Diriyah</li>
              <li>Dubai International Financial Centre (DIFC)</li>
              <li>Harrods Concession, London UK</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.22em] font-medium text-espresso font-sans">
              {t('home.instagram.eyebrow')}
            </h4>
            <p className="text-mocha leading-relaxed">
              {t('home.instagram.description')}
            </p>
            <a
              href="#instagram"
              className="text-walnut hover:text-espresso font-medium inline-flex items-center gap-1 mt-1 transition-colors"
            >
              <span>{t('home.instagram.handle')}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright & Language */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-mocha font-sans">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <span>Privately Handcrafted in Riyadh, KSA</span>
            <span>•</span>
            <span className="font-medium text-espresso tracking-wider uppercase">Alora</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
