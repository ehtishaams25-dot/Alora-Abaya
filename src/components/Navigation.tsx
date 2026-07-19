import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function Navigation() {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('ar') ? 'en' : 'ar'
    i18n.changeLanguage(nextLang)
  }

  const navLinks = [
    { label: t('navigation.allDresses'), href: '#dresses' },
    { label: t('navigation.newArrivals'), href: '#new' },
    { label: t('navigation.bestSellers'), href: '#bestsellers' },
    { label: t('navigation.aboutUs'), href: '#about' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-sand/95 backdrop-blur-xl border-b border-border2 py-3 shadow-sm'
          : 'bg-transparent py-4.5 border-b border-transparent'
      }`}
    >
      <div className="container-layali flex items-center justify-between gap-2 sm:gap-4">
        {/* Start Side: Mobile Menu Toggle & All Dress / Collection Navigation Links */}
        <div className="flex items-center justify-start gap-4 xl:gap-7 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-espresso hover:text-walnut transition-colors p-2 -ms-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 stroke-current fill-none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 truncate">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs xl:text-[13px] uppercase tracking-[0.2em] xl:tracking-[0.22em] text-espresso hover:text-walnut transition-colors font-sans font-medium whitespace-nowrap py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Luxury ALORA Brand Logo */}
        <div className="flex flex-col items-center justify-center text-center flex-shrink-0 px-2 sm:px-6">
          <a
            href="/"
            className="group flex flex-col items-center transition-transform hover:scale-[1.02] duration-500 py-1"
            aria-label="Alora Home"
          >
            <img
              src="/logos/Artboard 13@4x.png"
              alt="ALORA"
              className="h-9 sm:h-11 xl:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-500"
            />
          </a>
        </div>

        {/* End Side: Utilitarian Actions (Language, Search, Profile, Wishlist, Cart) */}
        <div className="flex items-center justify-end gap-1 sm:gap-3 xl:gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-full border border-border2 text-xs font-medium text-espresso hover:border-walnut hover:text-walnut transition-all cursor-pointer tracking-wider uppercase font-sans min-h-[36px] flex items-center justify-center"
              aria-label="Switch Language"
            >
              {i18n.language.startsWith('ar') ? 'English / EN' : 'العربية / AR'}
            </button>

            {/* Search Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1.5 min-h-[42px] min-w-[42px] flex items-center justify-center"
              aria-label="Search collection"
              title="Search"
            >
              <svg
                className="w-5 h-5 stroke-current fill-none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            {/* Profile / Account Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1.5 min-h-[42px] min-w-[42px] flex items-center justify-center"
              aria-label="User Profile & Account"
              title="Profile"
            >
              <svg
                className="w-5 h-5 stroke-current fill-none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1.5 relative min-h-[42px] min-w-[42px] flex items-center justify-center"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <svg
                className="w-5 h-5 stroke-current fill-none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className="absolute top-2 end-2 w-1.5 h-1.5 bg-taupe rounded-full" />
            </button>

            {/* Shopping Bag / Cart Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1.5 relative flex items-center gap-1.5 min-h-[42px] min-w-[42px] justify-center"
              aria-label="Shopping Cart"
              title="Cart"
            >
              <svg
                className="w-5 h-5 stroke-current fill-none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="hidden sm:inline-block font-sans text-xs tracking-widest text-espresso font-medium">
                (0)
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-sand/98 backdrop-blur-2xl border-b border-border2 px-6 py-8 shadow-2xl animate-fade-up">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-espresso hover:text-walnut transition-colors py-2 font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-border2 flex flex-col gap-4 items-center">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage()
                  setMobileMenuOpen(false)
                }}
                className="px-6 py-2.5 rounded-full border border-walnut/40 bg-cream/60 text-xs font-medium text-espresso hover:border-walnut transition-all cursor-pointer tracking-widest uppercase font-sans w-full max-w-xs"
              >
                {i18n.language.startsWith('ar') ? 'Switch to English (EN)' : 'التبديل إلى العربية (AR)'}
              </button>
              <div className="flex justify-center gap-6 text-xs uppercase tracking-[0.2em] text-mocha pt-2">
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-espresso">{t('navigation.faq')}</a>
                <a href="#returns" onClick={() => setMobileMenuOpen(false)} className="hover:text-espresso">{t('navigation.returns')}</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-espresso">{t('navigation.contact')}</a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
