import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { useShop } from '../providers/ShopProvider'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CartPage() {
  const { t, i18n } = useTranslation()
  const {
    isLoggedIn,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    taxes,
    total,
    openCheckoutModal
  } = useShop()

  const isArabic = i18n.language.startsWith('ar')
  useDocumentTitle(isArabic ? 'ليالي | حقيبة التسوق' : 'Layali | Shopping Bag')

  const [checkoutNotice, setCheckoutNotice] = useState(false)

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      openCheckoutModal()
    } else {
      setCheckoutNotice(true)
      setTimeout(() => {
        setCheckoutNotice(false)
      }, 3500)
    }
  }

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-sand text-espresso font-sans flex flex-col selection:bg-taupe/20 selection:text-espresso">
      <Navigation />

      <main className="flex-1 container-layali py-10 sm:py-16 lg:py-20">
        {checkoutNotice && (
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-xl bg-success/10 border border-success/30 text-success text-xs sm:text-sm font-medium tracking-wide animate-fade-up flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-success inline-block animate-pulse shrink-0" />
            <span>
              {isArabic
                ? "جاري توجيهكِ إلى بوابة الدفع المشفرة والآمنة لعميلات VIP..."
                : "Proceeding to secure VIP encrypted atelier checkout..."}
            </span>
          </div>
        )}

        {/* Check if Cart is Empty */}
        {cartItems.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-12 sm:py-16 bg-cream rounded-2xl border border-border2/60 p-8 sm:p-12 shadow-sm animate-fade-up my-auto">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-sand border border-border2/50">
              <img
                src="https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=1200&q=85"
                alt={isArabic ? "حقيبة التسوق بانتظاركِ" : "Your Shopping Bag is Waiting"}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-60" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso tracking-tight font-normal mb-3">
              {isArabic ? "حقيبة التسوق بانتظاركِ" : "Your Shopping Bag is Waiting"}
            </h1>
            <p className="font-sans text-sm sm:text-base text-mocha leading-relaxed max-w-md mx-auto mb-8">
              {isArabic
                ? "اكتشفي قطعنا المصنوعة بحرفية فائقة، والمصممة لتمنحكِ أناقة هادئة وحضوراً استثنائياً."
                : "Discover beautifully crafted pieces designed for effortless elegance."}
            </p>
            <Link
              to="/#dresses"
              className="btn-primary inline-flex items-center justify-center px-10 py-4"
            >
              {isArabic ? "تصفح المجموعة" : "Browse Collection"}
            </Link>
          </div>
        ) : (
          /* Split Layout for Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 animate-fade-up">
            
            {/* Left: Product List (`lg:col-span-7 xl:col-span-8`) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <header className="pb-6 border-b border-border2 flex items-baseline justify-between">
                <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-tight">
                  {isArabic ? "حقيبة التسوق" : "Shopping Bag"}
                </h1>
                <span className="text-xs sm:text-sm text-mocha font-sans uppercase tracking-widest font-medium">
                  {totalItemCount} {isArabic ? (totalItemCount === 1 ? "قطعة" : "قطع") : (totalItemCount === 1 ? "Item" : "Items")}
                </span>
              </header>

              <div className="divide-y divide-border2/80">
                {cartItems.map((item) => {
                  const title = isArabic ? (item.nameAr || item.name) : item.name
                  const priceStr = `${item.price} ${t('common.priceAed', 'SAR')}`
                  const itemTotalNum = item.numericPrice * item.quantity
                  const itemTotalStr = `${itemTotalNum.toLocaleString()} ${t('common.priceAed', 'SAR')}`

                  return (
                    <div
                      key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="py-6 sm:py-8 flex flex-col sm:flex-row gap-5 sm:gap-7 group"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/#dresses`}
                        className="w-24 h-32 sm:w-32 sm:h-44 rounded-xl overflow-hidden bg-sand shrink-0 border border-border2/60"
                      >
                        <img
                          src={item.image}
                          alt={title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>

                      {/* Product Info & Controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            {item.category && (
                              <span className="text-[10px] uppercase tracking-[0.22em] text-taupe font-medium block mb-1">
                                {item.category}
                              </span>
                            )}
                            <h3 className="font-serif text-lg sm:text-xl text-espresso font-normal leading-snug">
                              {title}
                            </h3>
                            
                            <div className="mt-2 space-y-1 text-xs text-mocha font-sans">
                              {item.selectedColor && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-espresso/70">{isArabic ? "اللون:" : "Color:"}</span>
                                  <span className="font-medium text-espresso">{item.selectedColor}</span>
                                </p>
                              )}
                              {item.selectedSize && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-espresso/70">{isArabic ? "المقاس:" : "Size:"}</span>
                                  <span className="font-medium text-espresso">{item.selectedSize}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Unit Price */}
                          <div className="text-sm font-sans text-espresso font-medium sm:text-end mt-1 sm:mt-0">
                            {priceStr}
                          </div>
                        </div>

                        {/* Bottom Row: Quantity Selector & Remove Action */}
                        <div className="mt-6 pt-4 border-t border-border2/40 flex items-center justify-between gap-4">
                          {/* Quantity Selector Box */}
                          <div className="flex items-center border border-border2 rounded-full bg-cream/70 px-3 py-1.5 gap-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1, item.selectedColor, item.selectedSize)}
                              className="text-mocha hover:text-espresso w-6 h-6 flex items-center justify-center font-serif text-sm transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="text-xs font-semibold text-espresso min-w-[20px] text-center font-sans">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1, item.selectedColor, item.selectedSize)}
                              className="text-mocha hover:text-espresso w-6 h-6 flex items-center justify-center font-serif text-sm transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-6">
                            {item.quantity > 1 && (
                              <span className="text-xs font-semibold text-espresso font-sans">
                                {isArabic ? "المجموع:" : "Total:"} {itemTotalStr}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                              className="text-mocha hover:text-espresso text-xs uppercase tracking-[0.18em] underline underline-offset-4 transition-colors font-medium cursor-pointer"
                            >
                              {isArabic ? "إزالة" : "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Continue Shopping Link at bottom of list */}
              <div className="pt-6 mt-2 border-t border-border2 flex items-center justify-between">
                <Link
                  to="/#dresses"
                  className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso underline underline-offset-4 font-medium transition-colors inline-flex items-center gap-2 group/back"
                >
                  <svg className="w-3.5 h-3.5 stroke-current fill-none transition-transform duration-300 group-hover/back:-translate-x-1 rtl:group-hover/back:translate-x-1 rtl:rotate-180 shrink-0" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span>{isArabic ? "مواصلة التسوق" : "Continue Shopping"}</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="text-xs uppercase tracking-[0.2em] text-walnut hover:text-espresso font-medium transition-colors inline-flex items-center gap-2 group/wish"
                >
                  <span>{isArabic ? "عرض قائمة الأمنيات" : "View Wishlist"}</span>
                  <svg className="w-3.5 h-3.5 stroke-current fill-none transition-transform duration-300 group-hover/wish:translate-x-1 rtl:group-hover/wish:-translate-x-1 rtl:rotate-180 shrink-0" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Sticky Order Summary (`lg:col-span-5 xl:col-span-4`) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-28 bg-cream p-6 sm:p-8 lg:p-10 rounded-2xl border border-border2/80 shadow-sm flex flex-col gap-6">
                <h2 className="font-serif text-2xl text-espresso font-normal tracking-tight pb-4 border-b border-border2">
                  {isArabic ? "ملخص الطلب" : "Order Summary"}
                </h2>

                <div className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="flex items-center justify-between text-mocha">
                    <span>{isArabic ? "المجموع الفرعي" : "Subtotal"}</span>
                    <span className="font-medium text-espresso">{subtotal.toLocaleString()} {t('common.priceAed', 'SAR')}</span>
                  </div>

                  <div className="flex items-center justify-between text-mocha">
                    <span>{isArabic ? "الشحن الدولي السريع" : "Express Shipping"}</span>
                    <span className="font-medium text-success">
                      {shipping === 0
                        ? (isArabic ? "مجاني (هدية الأتليه)" : "Complimentary")
                        : `${shipping} ${t('common.priceAed', 'SAR')}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-mocha">
                    <span>{isArabic ? "الضرائب التقديرية (15%)" : "Estimated Taxes (15%)"}</span>
                    <span className="font-medium text-espresso">{taxes.toLocaleString()} {t('common.priceAed', 'SAR')}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border2 flex items-center justify-between font-serif text-lg sm:text-xl text-espresso font-normal">
                  <span>{isArabic ? "المجموع الإجمالي" : "Estimated Total"}</span>
                  <span className="font-semibold">{total.toLocaleString()} {t('common.priceAed', 'SAR')}</span>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="btn-primary w-full py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
                  >
                    {isArabic ? "المتابعة لإتمام الشراء" : "Proceed to Checkout"}
                  </button>

                  <p className="text-[11px] text-center text-mocha/80 leading-relaxed pt-1">
                    {isArabic
                      ? "جميع الشحنات مغلفة بصناديق ألورا الملكية مع ضمان الخصوصية التامة والاستبدال المجاني."
                      : "All orders arrive wrapped in signature Alora bespoke boxes with complimentary exchanges."}
                  </p>
                </div>

                {/* Atelier Assurance Perks with Premium Vector Icons */}
                <div className="pt-4 border-t border-border2/60 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-wider text-mocha text-center">
                  <div className="flex flex-col items-center gap-2 p-2.5 bg-sand/60 rounded-xl border border-border2/40">
                    <svg className="w-4 h-4 text-taupe stroke-current fill-none shrink-0" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span>{isArabic ? "دفع آمن ومشفر" : "Encrypted Checkout"}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-2.5 bg-sand/60 rounded-xl border border-border2/40">
                    <svg className="w-4 h-4 text-taupe stroke-current fill-none shrink-0" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                    <span>{isArabic ? "حياكة يدوية خاصة" : "Hand-Tailored"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
