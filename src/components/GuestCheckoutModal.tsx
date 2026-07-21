import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useShop } from '../providers/ShopProvider'

export function GuestCheckoutModal() {
  const { i18n } = useTranslation()
  const { isCheckoutModalOpen, closeCheckoutModal, setIsLoggedIn } = useShop()
  const isArabic = i18n.language.startsWith('ar')

  const [mode, setMode] = useState<'welcome' | 'signin' | 'register'>('welcome')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isCheckoutModalOpen) return null

  const handleAuthSuccess = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsLoggedIn(true)
      closeCheckoutModal()
      setMode('welcome')
    }, 1200)
  }

  const benefits = isArabic
    ? [
        "تتبع مسار طلباتكِ الحالية والسابقة",
        "عرض سجل مشترياتكِ وحفظ المفضلات",
        "حفظ عناوين التسليم لطلب أسرع في المستقبل",
        "إتمام عملية الدفع بسرعة وسلاسة فائقة"
      ]
    : [
        "Track your orders",
        "View purchase history",
        "Save delivery addresses",
        "Faster checkout"
      ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-ink/45 transition-opacity animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      {/* Background click to dismiss */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => {
          closeCheckoutModal()
          setMode('welcome')
        }}
        aria-hidden="true"
      />

      {/* Modal Container: Solid cream background, rounded-2xl, thin border, no glassmorphism, no heavy shadows */}
      <div className="relative w-full max-w-lg bg-cream rounded-2xl border border-border2 p-6 sm:p-10 text-espresso shadow-md animate-scale-in z-10 overflow-hidden">
        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={() => {
            closeCheckoutModal()
            setMode('welcome')
          }}
          className="absolute top-5 end-5 text-mocha hover:text-espresso transition-colors p-2 rounded-full cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {mode === 'welcome' && (
          <div className="flex flex-col animate-fade-up">
            <span className="text-eyebrow mb-2 block font-medium">
              {isArabic ? "إتمام الطلب" : "ATELIER CHECKOUT"}
            </span>
            <h2 id="checkout-modal-title" className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal leading-snug">
              {isArabic ? "المتابعة لإتمام الشراء" : "Continue to Checkout"}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-mocha mt-2 leading-relaxed">
              {isArabic
                ? "سجلي الدخول أو أنشئي حساباً جديداً لإتمام عملية الشراء بأمان وإدارة طلباتكِ المستقبلية."
                : "Sign in or create an account to securely complete your purchase and manage your future orders."}
            </p>

            {/* Benefits Section */}
            <div className="my-6 sm:my-8 py-5 border-y border-border2/80 flex flex-col gap-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-sans text-espresso/90">
                  <span className="w-5 h-5 rounded-full bg-sand border border-border2 flex items-center justify-center text-taupe font-serif text-xs font-bold shrink-0">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col gap-3 sm:gap-3.5">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="w-full bg-espresso text-cream rounded-full py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
              >
                {isArabic ? "تسجيل الدخول" : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => setMode('register')}
                className="w-full rounded-full border border-border2 bg-transparent hover:bg-sand hover:border-espresso text-espresso py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:-translate-y-0.5 transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
              >
                {isArabic ? "إنشاء حساب" : "Create Account"}
              </button>
            </div>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  closeCheckoutModal()
                  setMode('welcome')
                }}
                className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso underline underline-offset-4 font-medium py-1 inline-block cursor-pointer"
              >
                {isArabic ? "مواصلة التسوق" : "Continue Shopping"}
              </button>
            </div>
          </div>
        )}

        {mode === 'signin' && (
          <form onSubmit={handleAuthSuccess} className="flex flex-col gap-4 animate-fade-up">
            <span className="text-eyebrow block font-medium">
              {isArabic ? "تسجيل الدخول" : "SIGN IN"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal leading-snug">
              {isArabic ? "مرحباً بكِ في أتليه ألورا" : "Welcome Back to Alora"}
            </h2>
            <p className="font-sans text-xs text-mocha leading-relaxed mb-1">
              {isArabic
                ? "أدخلي بيانات حسابكِ للمتابعة الفورية إلى مرحلة الدفع المشفرة."
                : "Enter your details to seamlessly proceed to encrypted checkout."}
            </p>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-[0.22em] text-espresso font-medium font-sans">
                {isArabic ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vip@alora-atelier.com"
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
                className="absolute end-0 bottom-2 text-mocha hover:text-espresso p-1 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
              >
                <span className="text-[11px] uppercase tracking-wider">{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-espresso text-cream rounded-full py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
              >
                {loading ? (isArabic ? "جاري المصادقة..." : "Authenticating...") : (isArabic ? "متابعة للدفع" : "Proceed to Checkout")}
              </button>

              <button
                type="button"
                onClick={() => setMode('welcome')}
                className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso py-2 text-center font-medium cursor-pointer"
              >
                {isArabic ? "العودة للخيارات" : "Back to Options"}
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleAuthSuccess} className="flex flex-col gap-4 animate-fade-up">
            <span className="text-eyebrow block font-medium">
              {isArabic ? "حساب جديد" : "NEW VIP ACCOUNT"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal leading-snug">
              {isArabic ? "انضمي إلى دائرة ألورا" : "Join the Alora Circle"}
            </h2>
            <p className="font-sans text-xs text-mocha leading-relaxed mb-1">
              {isArabic
                ? "أنشئي حسابكِ للتمتع بمزايا الحفظ التلقائي وتتبع الطلبات الخاصة."
                : "Create your account to enjoy seamless checkout, order tracking, and bespoke drops."}
            </p>

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

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-espresso text-cream rounded-full py-3.5 px-8 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans hover:bg-ink hover:-translate-y-0.5 transition-all duration-500 cursor-pointer min-h-[46px] flex items-center justify-center"
              >
                {loading ? (isArabic ? "جاري الإنشاء..." : "Creating Account...") : (isArabic ? "إنشاء ومتابعة الدفع" : "Create & Proceed to Checkout")}
              </button>

              <button
                type="button"
                onClick={() => setMode('welcome')}
                className="text-xs uppercase tracking-[0.2em] text-mocha hover:text-espresso py-2 text-center font-medium cursor-pointer"
              >
                {isArabic ? "العودة للخيارات" : "Back to Options"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
