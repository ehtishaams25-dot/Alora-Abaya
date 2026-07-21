import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../providers/ShopProvider'
import { DRESSES_DATA } from '../data/dressesData'
import { ProductTrustIndicators } from '../features/product'

export function CartDrawerModal() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    taxes,
    total,
    addToCart,
    openCheckoutModal
  } = useShop()

  const isArabic = i18n.language.startsWith('ar')

  useEffect(() => {
    if (isCartDrawerOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isCartDrawerOpen])

  if (!isCartDrawerOpen) return null

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const recommendations = DRESSES_DATA.filter(d => !cartItems.some(ci => ci.id === d.id)).slice(0, 3)

  const handleQuickAddRecommendation = (rec: typeof DRESSES_DATA[0]) => {
    const defaultColor = rec.colors?.[0] || rec.colorNames?.[0] || 'Midnight Nidha'
    const defaultSize = rec.sizes?.[0] || 'Size 56'
    addToCart(rec, defaultColor, defaultSize)
  }

  const handleProceedToCheckout = () => {
    closeCartDrawer()
    openCheckoutModal()
  }

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-espresso/75 backdrop-blur-md transition-opacity duration-500 animate-[fadeIn_0.4s_ease-out]">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={closeCartDrawer} />

      {/* Slide-In Drawer Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-cream h-full z-10 shadow-2xl flex flex-col border-s border-border2/80 animate-[slideInEnd_0.5s_ease-out]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border2/70 flex items-center justify-between bg-sand/60 shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-walnut font-medium block mb-0.5">
              {isArabic ? 'صالون ألورا الخاص' : 'Alora Private Salon'}
            </span>
            <h2 className="font-serif text-lg sm:text-xl text-espresso font-normal">
              {isArabic ? 'حقيبة التسوق' : 'Atelier Bag'} ({totalItemCount})
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCartDrawer}
            className="w-10 h-10 rounded-full bg-cream hover:bg-espresso hover:text-cream text-espresso border border-border2/80 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xs shrink-0"
            aria-label="Close cart drawer"
          >
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Items & Recommendations Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-sand border border-border2 flex items-center justify-center text-mocha mb-4">
                <svg className="w-7 h-7 stroke-current fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-espresso mb-2">
                {isArabic ? 'حقيبة التسوق فارغة حالياً' : 'Your Bag is Currently Empty'}
              </h3>
              <p className="text-xs text-mocha max-w-xs mx-auto leading-relaxed mb-6">
                {isArabic
                  ? 'استكشفي مجموعتنا الملكية المصنوعة يدوياً واختاري ما يليق بذوقك الرفيع.'
                  : 'Explore our handcrafted seasonal masterpieces and select your next editorial silhouette.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer()
                  navigate('/dresses')
                }}
                className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-[0.18em] font-medium hover:bg-ink transition-all cursor-pointer shadow-md"
              >
                {isArabic ? 'استكشاف التشكيلة الملكية' : 'Explore The Collection'}
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="divide-y divide-border2/70">
                {cartItems.map((item, idx) => {
                  const title = isArabic ? (item.nameAr || item.name) : item.name
                  return (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="py-5 first:pt-0 flex gap-4 items-start group">
                      {/* Thumbnail */}
                      <div
                        onClick={() => {
                          closeCartDrawer()
                          navigate(`/product/${item.id}`)
                        }}
                        className="w-20 sm:w-24 aspect-[3/4] rounded-2xl overflow-hidden bg-sand border border-border2/60 shrink-0 cursor-pointer relative"
                      >
                        <img
                          src={item.image}
                          alt={title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              onClick={() => {
                                closeCartDrawer()
                                navigate(`/product/${item.id}`)
                              }}
                              className="font-serif text-sm sm:text-base text-espresso font-normal leading-snug truncate cursor-pointer hover:text-walnut transition-colors"
                            >
                              {title}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                              className="text-taupe hover:text-espresso p-1 transition-colors cursor-pointer"
                              title={isArabic ? 'إزالة من الحقيبة' : 'Remove from bag'}
                            >
                              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-[11px] text-mocha font-sans uppercase tracking-wider">
                            <span>{item.selectedColor || 'Midnight'}</span>
                            <span>•</span>
                            <span>{item.selectedSize || 'Size 56'}</span>
                          </div>
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-border2/40">
                          <div className="flex items-center border border-border2 rounded-full overflow-hidden bg-sand/60">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1, item.selectedColor, item.selectedSize)}
                              className="w-8 h-8 flex items-center justify-center text-espresso hover:bg-border2/60 transition-colors cursor-pointer text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-espresso font-sans">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1, item.selectedColor, item.selectedSize)}
                              className="w-8 h-8 flex items-center justify-center text-espresso hover:bg-border2/60 transition-colors cursor-pointer text-sm"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-serif text-sm sm:text-base font-semibold text-espresso">
                            {(item.numericPrice * item.quantity).toLocaleString()} <span className="text-[10px] font-sans font-normal text-mocha">{t('common.priceAed', 'SAR')}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Recommendations / Complete the Look */}
              <div className="pt-6 border-t border-border2/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-walnut font-medium">
                    {isArabic ? 'أكملي إطلالتك الفاخرة' : 'Complete The Editorial Look'}
                  </span>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec) => {
                    const recTitle = isArabic ? (rec.nameAr || rec.name) : rec.name
                    return (
                      <div key={rec.id} className="p-3 rounded-2xl bg-sand/60 border border-border2/60 flex items-center justify-between gap-3 group/rec">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={rec.image}
                            alt={recTitle}
                            className="w-12 h-16 rounded-xl object-cover object-top shrink-0 border border-border2/60"
                          />
                          <div className="min-w-0">
                            <h5 className="font-serif text-xs sm:text-sm text-espresso truncate group-hover/rec:text-walnut transition-colors">
                              {recTitle}
                            </h5>
                            <span className="text-xs font-semibold text-espresso block mt-0.5">
                              {rec.price} <span className="text-[9px] font-normal text-mocha">SAR</span>
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleQuickAddRecommendation(rec)}
                          className="px-3.5 py-2 rounded-xl bg-cream border border-border2 hover:bg-espresso hover:text-cream text-[10px] uppercase tracking-wider font-medium transition-all cursor-pointer shrink-0 shadow-2xs"
                        >
                          + {isArabic ? 'إضافة' : 'Add'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Footer Order Summary & CTA (Only if cart has items) */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-cream border-t border-border2/80 space-y-4 shrink-0 shadow-lg">
            <div className="space-y-2 text-xs font-sans text-mocha">
              <div className="flex justify-between">
                <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-semibold text-espresso font-serif text-sm">{subtotal.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? 'الشحن السريع الفاخر' : 'Luxury Express Dispatch'}</span>
                <span className="text-success font-medium">{isArabic ? 'مجاني بالكامل' : 'Complimentary'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border2/60 font-medium text-sm text-espresso">
                <span>{isArabic ? 'المجموع الكلي المعتمد' : 'Estimated Total'}</span>
                <span className="font-serif text-base font-bold">{total.toLocaleString()} SAR</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-full bg-espresso text-cream hover:bg-ink transition-all duration-300 font-medium text-xs uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{isArabic ? 'إتمام الطلب الملكي الفاخر' : 'Proceed to Luxury Checkout'}</span>
                <span aria-hidden="true" className="rtl:rotate-180">→</span>
              </button>

              <Link
                to="/bag"
                onClick={closeCartDrawer}
                className="w-full py-2.5 text-center text-[11px] uppercase tracking-[0.16em] text-walnut hover:text-espresso font-medium transition-colors"
              >
                {isArabic ? 'عرض حقيبة التسوق الكاملة' : 'View Full Shopping Bag Page'}
              </Link>
            </div>

            <ProductTrustIndicators />
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(drawerContent, document.body)
}
