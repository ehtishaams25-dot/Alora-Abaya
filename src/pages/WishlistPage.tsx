import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { useShop } from '../providers/ShopProvider'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { type ProductItem } from '../features/home/types'
import { QuickViewModal } from '../components/QuickViewModal'
import { DRESSES_DATA, type ProductDress } from '../data/dressesData'
import { useLongPressQuickView } from '../hooks/useLongPressQuickView'

function WishlistProductCard({
  item,
  isArabic,
  t,
  addedIds,
  removeFromWishlist,
  handleAddToBag,
  setQuickViewProduct
}: {
  item: ProductItem
  isArabic: boolean
  t: any
  addedIds: { [key: string]: boolean }
  removeFromWishlist: (id: string) => void
  handleAddToBag: (item: ProductItem) => void
  setQuickViewProduct: (item: ProductDress | null) => void
}) {
  const navigate = useNavigate()
  const isAdded = addedIds[item.id]
  const title = isArabic ? (item.nameAr || item.name) : item.name
  const selectedColor = item.colors && item.colors.length > 0
    ? (isArabic ? "اللون المختار: أسود ملكي" : "Color: Midnight Black")
    : (isArabic ? "اللون: نيدا فاخرة" : "Color: Signature Shade")
  const selectedSize = isArabic ? "المقاس: 56" : "Size: 56"

  const { longPressProps } = useLongPressQuickView({
    product: item as unknown as ProductDress,
    onQuickView: () => {
      const found = DRESSES_DATA.find(p => p.id === item.id)
      if (found) setQuickViewProduct(found)
    },
    onNavigate: () => {
      navigate(`/product/${item.id}`)
    }
  })

  return (
    <div
      {...longPressProps}
      className="card-product group flex flex-col bg-cream border border-border2/70 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 relative cursor-pointer select-none"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          src={item.image}
          alt={title}
          className="card-product-img w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            removeFromWishlist(item.id)
          }}
          className="absolute top-3.5 end-3.5 bg-cream/90 backdrop-blur-md text-espresso hover:text-walnut hover:bg-cream p-2.5 rounded-full transition-all duration-300 shadow-sm z-10 cursor-pointer group/heart"
          aria-label={isArabic ? "إزالة من المفضلة" : "Remove from Wishlist"}
          title={isArabic ? "إزالة" : "Remove"}
        >
          <svg
            className="w-4 h-4 fill-espresso group-hover/heart:scale-110 transition-transform duration-200"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {item.category && (
          <span className="absolute top-3.5 start-3.5 bg-walnut/95 backdrop-blur-md text-cream text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-medium shadow-sm">
            {item.category}
          </span>
        )}

        <div className="absolute bottom-3 inset-x-3 hidden lg:flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleAddToBag(item)
            }}
            className="bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream py-1.5 px-2.5 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap border border-border2/50 shrink-0"
            title={isArabic ? 'إضافة للحقيبة' : 'Quick Add to Bag'}
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none shrink-0" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span>{isArabic ? 'إضافة' : 'Quick Add'}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              const found = DRESSES_DATA.find(p => p.id === item.id)
              if (found) setQuickViewProduct(found)
            }}
            className="flex-1 bg-cream/95 backdrop-blur-md text-espresso hover:bg-walnut hover:text-cream py-1.5 px-3 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap border border-border2/50"
          >
            <span>{isArabic ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleAddToBag(item)
          }}
          className="lg:hidden absolute bottom-3 end-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream shadow-sm flex items-center justify-center transition-colors z-10"
          title={t('common.addToBag')}
        >
          <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>

      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-cream">
        <div>
          <h3 className="font-serif text-sm sm:text-lg text-espresso font-medium leading-snug group-hover:text-walnut transition-colors line-clamp-1 mb-2">
            {title}
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-[10px] sm:text-xs text-mocha font-sans mb-1">
            <span className="truncate">{selectedColor}</span>
            <span>{selectedSize}</span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border2/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-sans text-espresso font-semibold uppercase tracking-wider">
              {item.price} {t('common.priceAed', 'SAR')}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleAddToBag(item)
            }}
            disabled={isAdded}
            className={`w-full rounded-full py-2.5 sm:py-3 px-3 sm:px-6 text-[9px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
              isAdded
                ? 'bg-success text-cream shadow-sm'
                : 'bg-espresso text-cream hover:bg-ink hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cream inline-block animate-pulse shrink-0" />
                <span className="truncate">{isArabic ? "تمت الإضافة" : "Added"}</span>
              </>
            ) : (
              <>
                <span className="truncate">{isArabic ? "أضف للحقيبة" : "Add to Bag"}</span>
                <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-current fill-none shrink-0" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export function WishlistPage() {
  const { t, i18n } = useTranslation()
  const { isLoggedIn, setIsLoggedIn, wishlistItems, removeFromWishlist, addToCart } = useShop()
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)
  useDocumentTitle(i18n.language.startsWith('ar') ? 'الورا للفساتين | قائمة الأمنيات' : 'Alora | Curated Wishlist')

  const isArabic = i18n.language.startsWith('ar')
  const [authMode, setAuthMode] = useState<'welcome' | 'login' | 'register'>('welcome')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({})

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleAddToBag = (item: ProductItem) => {
    const defaultColor = item.colors && item.colors.length > 0 ? "Signature Shade" : "Midnight Black"
    addToCart(item, defaultColor, "Size 56")
    setAddedIds((prev) => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }))
    }, 2000)
  }

  // 1. GUEST / NOT LOGGED IN STATE
  if (!isLoggedIn) {
    return (
      <div className="h-screen max-h-screen bg-sand text-espresso font-sans flex flex-col overflow-x-hidden md:overflow-hidden selection:bg-taupe/20 selection:text-espresso">
        {/* Exact existing sticky navigation bar (shrink-0 ensures it never squishes) */}
        <div className="shrink-0">
          <Navigation hideAnnouncement={true} />
        </div>

        {/* Main Split Layout: Desktop 50/50, Tablet 40/60. Takes exact remaining viewport height */}
        <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-y-auto md:overflow-hidden">
          {/* Left Column: Full-height luxury editorial campaign image */}
          <section className="hidden md:flex md:col-span-5 lg:col-span-6 relative overflow-hidden group md:min-h-0 md:h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=1600&q=90"
                alt={isArabic ? "مجموعتكِ الخاصة" : "Curate Your Collection"}
                className="w-full h-full object-cover object-top sm:object-center transition-transform duration-[3000ms] ease-out group-hover:scale-105 animate-scale-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-taupe/10 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-lg animate-fade-up">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-cream font-normal tracking-tight leading-[1.08] drop-shadow-sm">
                {isArabic ? "تنسيق مجموعتكِ المفضلة" : "Curate Your Collection"}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cream/85 tracking-wide mt-2 sm:mt-2.5 leading-relaxed max-w-md">
                {isArabic
                  ? "احفظي القطع التي تعشقينها وتصفحيها في أي وقت ومن أي جهاز."
                  : "Save the pieces you love and revisit them whenever inspiration strikes."}
              </p>
            </div>
          </section>

          {/* Right Column: Centered Authentication Card & Minimal Footer */}
          <section className="md:col-span-7 lg:col-span-6 h-full min-h-0 flex flex-col justify-between bg-sand overflow-y-auto md:overflow-hidden">
            <div className="w-full max-w-[420px] sm:max-w-[440px] mx-auto px-6 sm:px-8 my-auto py-4 sm:py-6 flex flex-col justify-center animate-fade-up min-h-0">
              
              {authMode === 'welcome' && (
                <div className="flex flex-col animate-fade-up">
                  <header className="mb-6 sm:mb-7 text-start shrink-0">
                    <span className="text-eyebrow block mb-1.5 font-medium">
                      {isArabic ? "الحساب الشخصي" : "ACCOUNT"}
                    </span>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso tracking-tight font-normal leading-tight">
                      {isArabic ? "احفظي قطعكِ المفضلة" : "Save Your Favorite Pieces"}
                    </h1>
                    <p className="text-[13px] text-mocha mt-1.5 leading-relaxed">
                      {isArabic
                        ? "سجلي الدخول أو أنشئي حساباً لبناء قائمة أمنياتكِ والوصول إليها في أي وقت عبر أجهزتكِ."
                        : "Sign in or create an account to build your personal wishlist and access it anytime across your devices."}
                    </p>
                  </header>

                  <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="w-full bg-espresso text-cream rounded-full py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 hover:shadow-lg transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
                    >
                      {isArabic ? "تسجيل الدخول" : "Sign In"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="w-full rounded-full border border-border2 bg-transparent hover:bg-cream hover:border-espresso text-espresso py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center gap-2.5 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      {isArabic ? "إنشاء حساب" : "Create Account"}
                    </button>
                  </div>

                  <div className="mt-6 text-center shrink-0">
                    <Link
                      to="/#dresses"
                      className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso underline underline-offset-4 font-medium py-2 inline-block transition-colors"
                    >
                      {isArabic ? "مواصلة التسوق" : "Continue Shopping"}
                    </Link>
                  </div>
                </div>
              )}

              {authMode === 'login' && (
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 animate-fade-up">
                  <header className="mb-4 text-start">
                    <span className="text-eyebrow block mb-1 font-medium">{isArabic ? "تسجيل الدخول" : "SIGN IN"}</span>
                    <h1 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal leading-tight">
                      {isArabic ? "الوصول لقائمة أمنياتكِ" : "Access Your Wishlist"}
                    </h1>
                  </header>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-espresso font-medium font-sans">
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="bg-transparent border-0 border-b border-taupe py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-espresso font-medium font-sans">
                      {isArabic ? "كلمة المرور" : "Password"}
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-transparent border-0 border-b border-taupe py-2.5 pe-10 rtl:pe-0 rtl:ps-10 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-0 bottom-2 text-mocha hover:text-espresso p-1 text-xs"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      type="submit"
                      className="w-full bg-espresso text-cream rounded-full py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
                    >
                      {isArabic ? "تسجيل الدخول" : "Sign In"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('welcome')}
                      className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso py-1 text-center font-medium"
                    >
                      {isArabic ? "العودة" : "Back"}
                    </button>
                  </div>
                </form>
              )}

              {authMode === 'register' && (
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 animate-fade-up">
                  <header className="mb-4 text-start">
                    <span className="text-eyebrow block mb-1 font-medium">{isArabic ? "حساب جديد" : "CREATE ACCOUNT"}</span>
                    <h1 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal leading-tight">
                      {isArabic ? "انضمي إلى دائرة ألورا" : "Join the Alora Circle"}
                    </h1>
                  </header>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-espresso font-medium font-sans">
                      {isArabic ? "الاسم الكامل" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isArabic ? "أدخلي اسمكِ الكامل" : "Enter your full name"}
                      className="bg-transparent border-0 border-b border-taupe py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-espresso font-medium font-sans">
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="bg-transparent border-0 border-b border-taupe py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[10px] uppercase tracking-[0.22em] text-espresso font-medium font-sans">
                      {isArabic ? "كلمة المرور" : "Password"}
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-transparent border-0 border-b border-taupe py-2.5 w-full text-espresso text-sm placeholder:text-mocha/45 focus:outline-none focus:ring-0 transition-colors font-sans"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      type="submit"
                      className="w-full bg-espresso text-cream rounded-full py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
                    >
                      {isArabic ? "إنشاء حساب" : "Create Account"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('welcome')}
                      className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso py-1 text-center font-medium"
                    >
                      {isArabic ? "العودة" : "Back"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sleek Zero-Scroll Minimal Footer */}
            <footer className="w-full border-t border-border2/80 bg-sand/80 py-3 sm:py-3.5 px-6 sm:px-10 shrink-0">
              <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-mocha font-sans text-[11px]">
                <nav className="flex items-center justify-center flex-wrap gap-5 sm:gap-7 uppercase tracking-[0.18em] font-medium">
                  <a href="#privacy" className="hover:text-espresso transition-colors">{t('auth.privacyPolicy', 'Privacy Policy')}</a>
                  <a href="#terms" className="hover:text-espresso transition-colors">{t('auth.terms', 'Terms')}</a>
                  <a href="#returns" className="hover:text-espresso transition-colors">{t('auth.returns', 'Returns')}</a>
                </nav>
                <div className="flex items-center gap-2 sm:gap-3 text-mocha/80 text-[11px]">
                  <span>© 2026 Alora</span>
                  <span>•</span>
                  <span className="tracking-wider uppercase text-espresso font-medium">Atelier Riyadh</span>
                </div>
              </div>
            </footer>
          </section>
        </main>
      </div>
    )
  }

  // 2. LOGGED IN STATE
  return (
    <div className="min-h-screen bg-sand text-espresso font-sans flex flex-col selection:bg-taupe/20 selection:text-espresso">
      <Navigation />

      <main className="flex-1 container-alora py-6 sm:py-8 lg:py-10">
        {/* Minimal Left-Aligned Header */}
        <header className="mb-6 sm:mb-8 animate-fade-up">
          <span className="text-eyebrow text-walnut mb-1 tracking-[0.28em] block">
            {isArabic ? "مجموعتكِ الخاصة" : "PRIVATE COLLECTION"}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal">
            {isArabic ? "قائمة أمنياتي" : "My Wishlist"}
          </h1>
        </header>

        {/* Check if Wishlist is Empty */}
        {wishlistItems.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-12 sm:py-16 bg-cream rounded-2xl border border-border2/60 p-8 sm:p-12 shadow-sm animate-fade-up my-auto">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-sand border border-border2/50">
              <img
                src="https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=1200&q=85"
                alt={isArabic ? "لا توجد قطع محفوظة" : "Nothing Saved Yet"}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-60" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal mb-3">
              {isArabic ? "لا توجد قطع محفوظة حتى الآن" : "Nothing Saved Yet"}
            </h2>
            <p className="font-sans text-sm sm:text-base text-mocha leading-relaxed max-w-md mx-auto mb-8">
              {isArabic
                ? "ابدئي باكتشاف قطعنا الخالدة المصنوعة بحرفية عالية واحفظي مفضلتكِ لاحقاً."
                : "Start discovering timeless pieces and save your favorites for later."}
            </p>
            <Link
              to="/#dresses"
              className="btn-primary inline-flex items-center justify-center px-10 py-4"
            >
              {isArabic ? "تصفح المجموعة" : "Browse Collection"}
            </Link>
          </div>
        ) : (
          /* Spacious Responsive Grid */
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 animate-fade-up">
            {wishlistItems.map((item) => (
              <WishlistProductCard
                key={item.id}
                item={item}
                isArabic={isArabic}
                t={t}
                addedIds={addedIds}
                removeFromWishlist={removeFromWishlist}
                handleAddToBag={handleAddToBag}
                setQuickViewProduct={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </main>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <Footer />
    </div>
  )
}
