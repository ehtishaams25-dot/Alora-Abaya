import { useState, useEffect } from 'react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'All Dresses', href: '#dresses' },
    { label: 'New Arrivals', href: '#new' },
    { label: 'Best Sellers', href: '#bestsellers' },
    { label: 'About Us', href: '#about' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-sand/90 backdrop-blur-xl border-b border-border2 py-4 shadow-sm'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container-layali flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Secondary Links (Desktop) */}
        <div className="flex items-center gap-8 lg:w-1/3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-espresso hover:text-walnut transition-colors p-1"
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

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.22em] text-espresso hover:text-walnut transition-colors font-sans font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Luxury Brand Logo */}
        <div className="flex flex-col items-center justify-center text-center lg:w-1/3">
          <a
            href="/"
            className="group flex flex-col items-center transition-transform hover:scale-[1.02] duration-500"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-espresso uppercase">
              Layali
            </span>
            <span className="font-arabic text-sm text-walnut -mt-1 tracking-widest font-normal">
              ليالي
            </span>
          </a>
        </div>

        {/* Right: Remaining Links & Action Icons */}
        <div className="flex items-center justify-end gap-6 lg:gap-8 lg:w-1/3">
          <nav className="hidden lg:flex items-center gap-8 mr-2">
            {navLinks.slice(2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.22em] text-espresso hover:text-walnut transition-colors font-sans font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {/* Search Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1"
              aria-label="Search collection"
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

            {/* Wishlist Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1 relative"
              aria-label="Wishlist"
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
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-taupe rounded-full" />
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              className="text-espresso hover:text-walnut transition-colors p-1 relative flex items-center gap-2"
              aria-label="Shopping Bag"
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-sand border-b border-border2 px-6 py-8 shadow-xl animate-fade-up">
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
            <div className="pt-4 border-t border-border2 flex justify-center gap-6 text-xs uppercase tracking-[0.2em] text-mocha">
              <a href="#faq" className="hover:text-espresso">FAQ</a>
              <a href="#returns" className="hover:text-espresso">Returns</a>
              <a href="#contact" className="hover:text-espresso">Contact</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
