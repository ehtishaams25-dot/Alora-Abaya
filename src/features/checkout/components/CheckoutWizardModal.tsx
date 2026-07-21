import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../../../providers/ShopProvider'

type WizardStep = 'auth' | 'shipping' | 'payment' | 'review' | 'confirmation'

export function CheckoutWizardModal() {
  const { i18n } = useTranslation()
  const {
    isCheckoutModalOpen,
    closeCheckoutModal,
    isLoggedIn,
    setIsLoggedIn,
    cartItems,
    subtotal,
    total,
    clearCart,
    userProfile,
    addOrder,
  } = useShop()
  const navigate = useNavigate()
  const isArabic = i18n.language.startsWith('ar')

  // Wizard state
  const [step, setStep] = useState<WizardStep>(() => (isLoggedIn ? 'shipping' : 'auth'))
  const [authMode, setAuthMode] = useState<'signin' | 'guest' | 'register'>('signin')
  const [loading, setLoading] = useState(false)

  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    fullName: isLoggedIn ? userProfile.name : '',
    phone: isLoggedIn ? userProfile.phone : '',
    email: isLoggedIn ? userProfile.email : '',
    city: 'Riyadh',
    district: 'Al-Olaya District',
    street: 'King Fahd Road, Villa 14',
    notes: 'Please ring bell twice. Fragile luxury packaging.',
  })

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay' | 'tabby' | 'tamara' | 'cod'>('card')
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '08/28',
    cvv: '882',
    name: isLoggedIn ? userProfile.name : 'Sarah Al-Mansoor',
  })

  // Generated order info after placing
  const [placedOrderNumber, setPlacedOrderNumber] = useState('')
  const [placedOrderDate, setPlacedOrderDate] = useState('')

  if (!isCheckoutModalOpen) return null

  const handleAuthSubmit = (e: React.FormEvent, mode: 'signin' | 'guest' | 'register') => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (mode !== 'guest') {
        setIsLoggedIn(true)
        setShippingData((prev) => ({
          ...prev,
          fullName: userProfile.name,
          phone: userProfile.phone,
          email: userProfile.email,
        }))
      }
      setStep('shipping')
    }, 1000)
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('review')
  }

  const handlePlaceOrder = () => {
    setLoading(true)
    setTimeout(() => {
      const orderNum = `#ALR-${Math.floor(10000 + Math.random() * 90000)}`
      const today = new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      setPlacedOrderNumber(orderNum)
      setPlacedOrderDate(today)

      // Add to user profile orders
      addOrder({
        id: orderNum,
        date: today,
        status: 'Tailoring in Atelier',
        statusAr: 'قيد الخياطة في الأتليه',
        total: `${total.toLocaleString()} SAR`,
        numericTotal: total,
        trackingNumber: `DHL-VIP-${Math.floor(1000000 + Math.random() * 9000000)}`,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          nameAr: item.nameAr || item.name,
          price: item.price,
          size: item.selectedSize || 'Size 56',
          color: item.selectedColor || 'Signature Color',
          image: item.image,
        })),
      })

      clearCart()
      setLoading(false)
      setStep('confirmation')
    }, 1500)
  }

  const handleClose = () => {
    closeCheckoutModal()
    // Reset wizard
    setTimeout(() => {
      setStep(isLoggedIn ? 'shipping' : 'auth')
    }, 300)
  }

  // Split payment calculations
  const tabbySplit = Math.ceil(total / 4)
  const tamaraSplit = Math.ceil(total / 3)

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-ink/70 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-cream rounded-3xl border border-border2 p-6 sm:p-8 lg:p-10 text-espresso shadow-2xl animate-scale-in my-auto overflow-hidden">
        
        {/* Top Header & Wizard Progress Indicator */}
        <div className="flex items-center justify-between border-b border-border2 pb-5 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block">
              {isArabic ? 'إتمام الشراء الملكي • أتليه الرياض' : 'ATELIER BESPOKE CHECKOUT'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight">
              {step === 'auth' && (isArabic ? 'المصادقة وتحديد البوابة' : 'VIP Access & Guest Checkout')}
              {step === 'shipping' && (isArabic ? 'عنوان الشحن والتوصيل المغلف' : 'Shipping & Insured Delivery')}
              {step === 'payment' && (isArabic ? 'بوابة الدفع والائتمان الفاخر' : 'Payment Method & Credit')}
              {step === 'review' && (isArabic ? 'مراجعة وتأكيد الطلب النهائي' : 'Review & Confirm Bespoke Order')}
              {step === 'confirmation' && (isArabic ? 'تم تأكيد طلبك الملكي بنجاح' : 'Order Confirmed successfully')}
            </h2>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-sand hover:bg-border2 text-espresso flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close checkout"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Pills (Unless confirmation step) */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'auth', labelEn: '1. Access', labelAr: '1. المصادقة' },
              { id: 'shipping', labelEn: '2. Shipping', labelAr: '2. الشحن' },
              { id: 'payment', labelEn: '3. Payment', labelAr: '3. الدفع' },
              { id: 'review', labelEn: '4. Review', labelAr: '4. المراجعة' },
            ].map((st, idx) => {
              const stepsOrder: WizardStep[] = ['auth', 'shipping', 'payment', 'review', 'confirmation']
              const currentIdx = stepsOrder.indexOf(step)
              const stepIdx = stepsOrder.indexOf(st.id as WizardStep)
              const isCurrent = step === st.id
              const isPast = currentIdx > stepIdx

              return (
                <div
                  key={st.id}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-espresso text-cream shadow-sm scale-[1.02]'
                      : isPast
                      ? 'bg-walnut/20 text-walnut'
                      : 'bg-sand/60 text-mocha/60'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-cream text-espresso' : isPast ? 'bg-walnut text-cream' : 'bg-mocha/20 text-mocha'
                  }`}>
                    {isPast ? '✓' : idx + 1}
                  </span>
                  <span>{isArabic ? st.labelAr : st.labelEn}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* STEP 1: AUTHENTICATION / GUEST CHOICE */}
        {step === 'auth' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {/* Sign In / Register Column */}
            <div className="bg-sand border border-border2 rounded-2xl p-6 sm:p-8 space-y-5">
              <span className="text-[10px] uppercase tracking-widest text-walnut block font-medium">
                {isArabic ? 'للعميلات المسجلات' : 'VIP CLIENTS'}
              </span>
              <h3 className="font-serif text-xl text-espresso">
                {authMode === 'signin'
                  ? (isArabic ? 'تسجيل الدخول الملكي' : 'Sign In To Your Account')
                  : (isArabic ? 'إنشاء حساب عضوية جديد' : 'Create New VIP Account')}
              </h3>
              <p className="text-xs text-mocha leading-relaxed">
                {isArabic
                  ? 'استمتعي بالدخول الفوري إلى تفاصيل الشحن المحفوظة ونقاط المكافآت الذهبية الخاصة بك.'
                  : 'Access your pre-saved shipping addresses, VIP tier points, and exclusive order timeline.'}
              </p>

              <form onSubmit={(e) => handleAuthSubmit(e, authMode === 'signin' ? 'signin' : 'register')} className="space-y-4 pt-2">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isArabic ? 'سارة المنصور' : 'Sarah Al-Mansoor'}
                      className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    defaultValue="sarah.almansoor@luxury.com"
                    className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                    {isArabic ? 'كلمة المرور' : 'Password'}
                  </label>
                  <input
                    type="password"
                    required
                    defaultValue="password123"
                    className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer"
                >
                  {loading
                    ? (isArabic ? 'جاري المصادقة...' : 'Authenticating...')
                    : authMode === 'signin'
                    ? (isArabic ? 'تسجيل الدخول والمتابعة' : 'Sign In & Continue')
                    : (isArabic ? 'إنشاء الحساب والمتابعة' : 'Register & Continue')}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'signin' ? 'register' : 'signin')}
                  className="text-xs text-walnut underline underline-offset-4 cursor-pointer"
                >
                  {authMode === 'signin'
                    ? (isArabic ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'No account? Create a VIP account')
                    : (isArabic ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Already registered? Sign in here')}
                </button>
              </div>
            </div>

            {/* Guest Checkout Column */}
            <div className="bg-sand/60 border border-border2/80 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-taupe block font-medium">
                  {isArabic ? 'شراء مباشر وسريع' : 'EXPRESS CHECKOUT'}
                </span>
                <h3 className="font-serif text-xl text-espresso">
                  {isArabic ? 'المتابعة كضيفة بدون تسجيل' : 'Continue As Guest'}
                </h3>
                <p className="text-xs text-mocha leading-relaxed">
                  {isArabic
                    ? 'يمكنك إتمام الشراء وتتبع شحنتك عبر البريد الإلكتروني دون الحاجة لإنشاء حساب في الوقت الحالي.'
                    : 'You can complete your order and track your bespoke abayas via email without registering right now.'}
                </p>
                <div className="space-y-2.5 pt-2 text-xs text-espresso/90">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-walnut/20 text-walnut flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span>{isArabic ? 'تغليف حريري فاخر ومؤمن' : 'Insured Scented Silk Packaging'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-walnut/20 text-walnut flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span>{isArabic ? 'توصيل مجاني خلال 24-48 ساعة' : 'Free Express Delivery in 24-48 Hours'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-walnut/20 text-walnut flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span>{isArabic ? 'تقسيط بدون فوائد عبر تابي وتمارا' : '0% Interest Split via Tabby & Tamara'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border2/60">
                <button
                  type="button"
                  onClick={(e) => handleAuthSubmit(e, 'guest')}
                  className="w-full py-3.5 rounded-full border border-espresso text-espresso text-xs uppercase tracking-widest font-medium hover:bg-espresso hover:text-cream transition-colors cursor-pointer"
                >
                  {isArabic ? 'المتابعة كضيفة ←' : 'Proceed As Guest →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SHIPPING ADDRESS */}
        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Form */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-espresso">
                  {isArabic ? 'بيانات المستلم والعنوان' : 'Recipient Details & Address'}
                </h3>
                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      setShippingData({
                        fullName: userProfile.name,
                        phone: userProfile.phone,
                        email: userProfile.email,
                        city: 'Riyadh',
                        district: 'Al-Olaya District',
                        street: 'King Fahd Road, Villa 14',
                        notes: 'Please ring bell twice. Fragile luxury packaging.',
                      })
                    }}
                    className="text-[11px] text-walnut underline cursor-pointer"
                  >
                    {isArabic ? 'استخدام العنوان الافتراضي للمنزل' : 'Auto-fill VIP Default Address'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                    {isArabic ? 'الاسم الكامل للمستلم' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                    placeholder="Sarah Al-Mansoor"
                    className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-xs text-espresso outline-none focus:border-espresso"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                    {isArabic ? 'رقم الهاتف للتواصل' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                    placeholder="+966 50 123 4567"
                    className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-xs text-espresso outline-none focus:border-espresso"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                  {isArabic ? 'البريد الإلكتروني لإرسال التتبع والفاتورة' : 'Email Address (For Tracking & Invoice)'} *
                </label>
                <input
                  type="email"
                  required
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                  placeholder="sarah.almansoor@luxury.com"
                  className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-xs text-espresso outline-none focus:border-espresso"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                    {isArabic ? 'المدينة' : 'City'} *
                  </label>
                  <select
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-xs text-espresso outline-none focus:border-espresso"
                  >
                    <option value="Riyadh">{isArabic ? 'الرياض (Riyadh)' : 'Riyadh'}</option>
                    <option value="Jeddah">{isArabic ? 'جدة (Jeddah)' : 'Jeddah'}</option>
                    <option value="Khobar">{isArabic ? 'الخبر (Khobar)' : 'Khobar'}</option>
                    <option value="Dubai">{isArabic ? 'دبي (Dubai - UAE)' : 'Dubai (UAE)'}</option>
                    <option value="Abu Dhabi">{isArabic ? 'أبوظبي (Abu Dhabi)' : 'Abu Dhabi'}</option>
                    <option value="Doha">{isArabic ? 'الدوحة (Doha - Qatar)' : 'Doha (Qatar)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                    {isArabic ? 'الحي / المنطقة' : 'District / Area'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingData.district}
                    onChange={(e) => setShippingData({ ...shippingData, district: e.target.value })}
                    placeholder="Al-Olaya District"
                    className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-xs text-espresso outline-none focus:border-espresso"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                  {isArabic ? 'اسم الشارع، رقم الفيلا / المبنى' : 'Street Address & Villa / Building Number'} *
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.street}
                  onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                  placeholder="King Fahd Road, Villa 14"
                  className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-xs text-espresso outline-none focus:border-espresso"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-espresso font-medium mb-1.5">
                  {isArabic ? 'ملاحظات التوصيل الخاصة بالأتليه (اختياري)' : 'Atelier Delivery Instructions (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={shippingData.notes}
                  onChange={(e) => setShippingData({ ...shippingData, notes: e.target.value })}
                  placeholder="Please deliver after 4 PM, call upon arrival..."
                  className="w-full bg-sand border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso outline-none focus:border-espresso"
                />
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('auth')}
                  className="text-xs uppercase tracking-wider text-taupe hover:text-espresso underline cursor-pointer"
                >
                  {isArabic ? '← العودة للخلف' : '← Back'}
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer shadow-md"
                >
                  {isArabic ? 'المتابعة لاختيار الدفع →' : 'Continue To Payment →'}
                </button>
              </div>
            </div>

            {/* Right Order Summary Mini Panel */}
            <div className="lg:col-span-5 bg-sand/80 border border-border2 rounded-2xl p-6 h-fit space-y-6">
              <h4 className="font-serif text-lg text-espresso border-b border-border2 pb-3">
                {isArabic ? 'ملخص القطع في الحقيبة' : 'Order Summary'}
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-espresso text-cream flex items-center justify-center text-[10px]">
                        {item.quantity}x
                      </span>
                      <div>
                        <span className="font-serif text-espresso font-medium block">{item.name}</span>
                        <span className="text-[10px] text-mocha">{item.selectedSize} • {item.selectedColor}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-espresso">{item.price} SAR</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border2 pt-4 space-y-2 text-xs text-mocha">
                <div className="flex justify-between">
                  <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>{subtotal.toLocaleString()} SAR</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>{isArabic ? 'شحن الملكي السريع المرفق بالحرير' : 'Insured Express Courier'}</span>
                  <span>{isArabic ? 'مجاني' : 'FREE'}</span>
                </div>
                <div className="flex justify-between border-t border-border2 pt-2 text-sm font-serif font-bold text-espresso">
                  <span>{isArabic ? 'الإجمالي النهائي (شامل الضريبة)' : 'Total (VAT Included)'}</span>
                  <span>{total.toLocaleString()} SAR</span>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT METHOD (Priority #7) */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Payment Selection */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-serif text-xl text-espresso mb-1">
                  {isArabic ? 'اختاري طريقة الدفع' : 'Select Payment Method'}
                </h3>
                <p className="text-xs text-mocha">
                  {isArabic ? 'جميع المعاملات مشفرة بالكامل ومعتمدة وفق أعلى معايير البنوك ومؤسسة النقد.' : 'All transactions are 256-bit SSL encrypted and fully verified.'}
                </p>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Credit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-2 border-espresso bg-cream shadow-md'
                      : 'border-border2 bg-sand hover:border-walnut'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-semibold text-espresso">
                      {isArabic ? 'بطاقة ائتمانية / مدى' : 'Card / Mada'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest bg-espresso/10 text-espresso px-2 py-0.5 rounded-full">
                      Visa • MC
                    </span>
                  </div>
                  <span className="text-xs text-mocha block">
                    {isArabic ? 'دفع آمن بالبطاقة المصرفية أو مدى' : 'Encrypted Credit/Debit Card'}
                  </span>
                </button>

                {/* 2. Apple Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'applepay'
                      ? 'border-2 border-espresso bg-cream shadow-md'
                      : 'border-border2 bg-sand hover:border-walnut'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-semibold text-espresso">Apple Pay</span>
                    <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                      
                    </span>
                  </div>
                  <span className="text-xs text-mocha block">
                    {isArabic ? 'إتمام الدفع الفوري ببصمة الوجه أو الإصبع' : 'Instant 1-Click Biometric Pay'}
                  </span>
                </button>

                {/* 3. Tabby (Split in 4) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tabby')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'tabby'
                      ? 'border-2 border-[#3ED3B9] bg-cream shadow-md'
                      : 'border-border2 bg-sand hover:border-[#3ED3B9]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-bold text-[#1F2937]">tabby</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-[#3ED3B9]/20 text-[#0F766E] px-2 py-0.5 rounded-full">
                      0% Interest
                    </span>
                  </div>
                  <span className="text-xs text-mocha block font-medium">
                    {isArabic ? `قسّميها على 4 دفعات بقيمة ${tabbySplit} SAR` : `4 payments of ${tabbySplit} SAR • No interest`}
                  </span>
                </button>

                {/* 4. Tamara (Split in 3) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tamara')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'tamara'
                      ? 'border-2 border-[#E18C79] bg-cream shadow-md'
                      : 'border-border2 bg-sand hover:border-[#E18C79]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-bold text-[#D97706]">tamara</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E18C79]/20 text-[#B45309] px-2 py-0.5 rounded-full">
                      0% Interest
                    </span>
                  </div>
                  <span className="text-xs text-mocha block font-medium">
                    {isArabic ? `قسّميها على 3 دفعات بقيمة ${tamaraSplit} SAR` : `3 payments of ${tamaraSplit} SAR • Sharia compliant`}
                  </span>
                </button>

                {/* 5. Google Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('googlepay')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'googlepay'
                      ? 'border-2 border-espresso bg-cream shadow-md'
                      : 'border-border2 bg-sand hover:border-walnut'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-semibold text-espresso">Google Pay</span>
                    <span className="text-[10px] uppercase font-bold text-taupe">GPay</span>
                  </div>
                  <span className="text-xs text-mocha block">
                    {isArabic ? 'دفع سريع وسهل عبر حساب جوجل' : 'Express checkout with GPay'}
                  </span>
                </button>

                {/* 6. Cash on Delivery (COD) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-2 border-espresso bg-cream shadow-md'
                      : 'border-border2 bg-sand hover:border-walnut'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-semibold text-espresso">
                      {isArabic ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest bg-walnut/20 text-walnut px-2 py-0.5 rounded-full">
                      VIP Courier
                    </span>
                  </div>
                  <span className="text-xs text-mocha block">
                    {isArabic ? 'ادفعي نقدًا أو بالشبكة عند وصول المندوب لباب منزلك' : 'Pay via Card or Cash upon door delivery'}
                  </span>
                </button>
              </div>

              {/* Conditional Form Inputs for Card */}
              {paymentMethod === 'card' && (
                <div className="bg-sand border border-border2 rounded-2xl p-5 space-y-4 animate-fade-in">
                  <span className="text-[10px] uppercase tracking-widest text-walnut block font-medium">
                    {isArabic ? 'بيانات البطاقة المصرفية' : 'CARD DETAILS'}
                  </span>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                      {isArabic ? 'الاسم على البطاقة' : 'Cardholder Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      placeholder="SARAH AL-MANSOOR"
                      className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso uppercase outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                      {isArabic ? 'رقم البطاقة' : 'Card Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      placeholder="•••• •••• •••• 4242"
                      className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso font-mono outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                        {isArabic ? 'تاريخ الانتهاء' : 'Expiry Date'}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-espresso mb-1">
                        {isArabic ? 'رمز الأمان (CVV)' : 'Security Code (CVV)'}
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="•••"
                        className="w-full bg-cream border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tabby/Tamara badge preview */}
              {(paymentMethod === 'tabby' || paymentMethod === 'tamara') && (
                <div className="bg-success/15 border border-success/40 rounded-2xl p-4 text-xs text-espresso flex items-center gap-3 animate-fade-in">
                  <span className="w-2.5 h-2.5 rounded-full bg-success shrink-0 animate-pulse" />
                  <span>
                    {isArabic
                      ? `تمت الموافقة المبدئية على حد الائتمان الملكي. سيتم توجيهك بأمان لإتمام التقسيط على ${paymentMethod === 'tabby' ? '4' : '3'} دفعات بدون أي رسوم.`
                      : `Instant VIP credit approved. You will split payment into ${paymentMethod === 'tabby' ? '4' : '3'} interest-free installments safely.`}
                  </span>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs uppercase tracking-wider text-taupe hover:text-espresso underline cursor-pointer"
                >
                  {isArabic ? '← العودة لعنوان الشحن' : '← Back To Shipping'}
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer shadow-md"
                >
                  {isArabic ? 'مراجعة الطلب النهائي →' : 'Review Bespoke Order →'}
                </button>
              </div>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-5 bg-sand/80 border border-border2 rounded-2xl p-6 h-fit space-y-4 text-xs text-espresso">
              <h4 className="font-serif text-lg text-espresso border-b border-border2 pb-3">
                {isArabic ? 'تفاصيل التوصيل المختارة' : 'Selected Shipping'}
              </h4>
              <div className="space-y-1 text-mocha">
                <strong className="text-espresso block">{shippingData.fullName}</strong>
                <span>{shippingData.phone}</span><br />
                <span>{shippingData.street}, {shippingData.district}, {shippingData.city}</span>
              </div>

              <div className="border-t border-border2 pt-4 space-y-2">
                <div className="flex justify-between font-serif font-bold text-base text-espresso">
                  <span>{isArabic ? 'الإجمالي الكلي (شامل الضريبة)' : 'Total Amount'}</span>
                  <span>{total.toLocaleString()} SAR</span>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 4: ORDER REVIEW & SUMMARY */}
        {step === 'review' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-espresso mb-1">
                  {isArabic ? 'مراجعة وتأكيد الطلب' : 'Final Order Review'}
                </h3>
                <p className="text-xs text-mocha">
                  {isArabic ? 'يرجى مراجعة قطعكِ الملكية، عنوان التوصيل، وطريقة الدفع قبل إرسال الطلب لخياطين الأتليه.' : 'Please review your bespoke selections, delivery address, and payment terms before finalizing.'}
                </p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <div className="bg-sand border border-border2 rounded-2xl p-5 flex justify-between items-start">
                  <div className="space-y-1 text-xs text-mocha">
                    <span className="text-[10px] uppercase tracking-widest text-walnut font-medium block">
                      {isArabic ? 'عنوان الشحن المعتمد' : 'SHIPPING DESTINATION'}
                    </span>
                    <strong className="text-espresso text-sm block">{shippingData.fullName}</strong>
                    <span>{shippingData.street}, {shippingData.district}, {shippingData.city}</span><br />
                    <span>Phone: {shippingData.phone}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="text-xs text-walnut underline cursor-pointer shrink-0"
                  >
                    {isArabic ? 'تغيير' : 'Change'}
                  </button>
                </div>

                <div className="bg-sand border border-border2 rounded-2xl p-5 flex justify-between items-center">
                  <div className="space-y-1 text-xs text-mocha">
                    <span className="text-[10px] uppercase tracking-widest text-walnut font-medium block">
                      {isArabic ? 'طريقة الدفع المختارة' : 'PAYMENT METHOD'}
                    </span>
                    <strong className="text-espresso text-sm uppercase block">
                      {paymentMethod === 'card' && `Card ending in ${cardDetails.number.slice(-4)}`}
                      {paymentMethod === 'applepay' && 'Apple Pay Biometric'}
                      {paymentMethod === 'tabby' && `Tabby Split (4x ${tabbySplit} SAR)`}
                      {paymentMethod === 'tamara' && `Tamara Split (3x ${tamaraSplit} SAR)`}
                      {paymentMethod === 'googlepay' && 'Google Pay'}
                      {paymentMethod === 'cod' && 'Cash on Delivery (COD)'}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="text-xs text-walnut underline cursor-pointer shrink-0"
                  >
                    {isArabic ? 'تغيير' : 'Change'}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="text-xs uppercase tracking-wider text-taupe hover:text-espresso underline cursor-pointer"
                >
                  {isArabic ? '← العودة للدفع' : '← Back To Payment'}
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="px-10 py-4 rounded-full bg-espresso text-cream text-xs sm:text-sm uppercase tracking-[0.22em] font-medium hover:bg-ink transition-all cursor-pointer shadow-lg animate-pulse flex items-center gap-3"
                >
                  {loading
                    ? (isArabic ? 'جاري إرسال الطلب للأتليه...' : 'Placing Bespoke Order...')
                    : (isArabic ? `تأكيد وإتمام الطلب • ${total.toLocaleString()} SAR` : `Place Bespoke Order • ${total.toLocaleString()} SAR`)}
                </button>
              </div>
            </div>

            {/* Right Items breakdown */}
            <div className="lg:col-span-5 bg-sand/80 border border-border2 rounded-2xl p-6 h-fit space-y-4 text-xs text-espresso">
              <h4 className="font-serif text-lg text-espresso border-b border-border2 pb-3">
                {isArabic ? 'القطع الملكية المختارة' : 'Bespoke Pieces Summary'}
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border2/40">
                    <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-serif text-espresso font-medium block truncate">{item.name}</span>
                      <span className="text-[10px] text-mocha">{item.quantity}x • {item.selectedSize} • {item.selectedColor}</span>
                    </div>
                    <span className="font-semibold text-espresso shrink-0">{item.price} SAR</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 space-y-2 text-mocha">
                <div className="flex justify-between font-serif font-bold text-base text-espresso pt-2 border-t border-border2">
                  <span>{isArabic ? 'المبلغ الإجمالي المعتمد' : 'Total Amount'}</span>
                  <span>{total.toLocaleString()} SAR</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CINEMATIC ORDER CONFIRMATION (Priority #8) */}
        {step === 'confirmation' && (
          <div className="py-8 sm:py-12 px-4 text-center max-w-2xl mx-auto space-y-8 animate-scale-in">
            {/* Animated Checkmark Icon */}
            <div className="w-20 h-20 rounded-full bg-success/15 border-2 border-success text-success mx-auto flex items-center justify-center animate-checkmark shadow-md">
              <svg className="w-10 h-10 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.28em] text-walnut font-medium block">
                {isArabic ? 'تم استلام طلبك وبدء العمل في الأتليه' : 'ORDER CONFIRMED & ATELIER NOTIFIED'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso tracking-tight">
                {isArabic ? 'شكراً لثقتك الملكية، سارة' : 'Thank You For Your Bespoke Order'}
              </h2>
              <p className="text-sm text-mocha leading-relaxed max-w-lg mx-auto">
                {isArabic
                  ? `تم إرسال تفاصيل الطلب رقم ${placedOrderNumber} إلى خياطين الأتليه في الرياض، وسيصلك إشعار بالبريد عند انتهاء حياكته وتغليفه بالحرير.`
                  : `Order ${placedOrderNumber} has been transmitted to our master tailors in Riyadh. An official tax invoice and status updates have been dispatched to ${shippingData.email}.`}
              </p>
            </div>

            {/* Atelier Status Timeline */}
            <div className="bg-sand border border-border2 rounded-3xl p-6 sm:p-8 text-left rtl:text-right space-y-5 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-walnut font-bold block border-b border-border2/60 pb-2">
                {isArabic ? 'مسار حياكة وتجهيز العباية الملكية' : 'ATELIER CRAFTSMANSHIP & DELIVERY TIMELINE'}
              </span>

              <div className="space-y-4 pt-1 text-xs sm:text-sm">
                <div className="flex items-start gap-4 text-espresso font-semibold">
                  <span className="w-6 h-6 rounded-full bg-success text-cream flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  <div>
                    <span>{isArabic ? 'تأكيد الطلب وحجز القماش الحريري' : 'Order Confirmed & Silk Fabric Reserved'}</span>
                    <span className="text-xs text-mocha block font-normal">{placedOrderDate} • Riyadh Master Tailor Atelier</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-espresso font-semibold">
                  <span className="w-6 h-6 rounded-full bg-walnut text-cream flex items-center justify-center text-xs shrink-0 mt-0.5 animate-pulse">⏳</span>
                  <div>
                    <span>{isArabic ? 'تخصيص الخياط المعتمد والبدء بالتطريز اليدوي' : 'Master Tailor Assignment & Hand Embroidery (In Progress)'}</span>
                    <span className="text-xs text-mocha block font-normal">{isArabic ? 'المدة المقدرة: 1-2 أيام عمل' : 'Estimated crafting window: 1-2 business days'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-mocha/60">
                  <span className="w-6 h-6 rounded-full border border-border2 bg-cream flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <span>{isArabic ? 'فحص الجودة 100% والتغليف بالحرير والمعطر الملكي' : '100% Quality Audit & Scented Silk Packaging'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-mocha/60">
                  <span className="w-6 h-6 rounded-full border border-border2 bg-cream flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                  <div>
                    <span>{isArabic ? 'التسليم للمندوب الخاص والشحن السريع باب إلى باب' : 'Handover to VIP Courier & Door-to-Door Delivery'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  closeCheckoutModal()
                  navigate('/orders')
                }}
                className="px-8 py-4 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer shadow-md"
              >
                {isArabic ? 'متابعة الطلب في لوحة التحكم' : 'View Order In Dashboard'}
              </button>

              <button
                type="button"
                onClick={() => {
                  closeCheckoutModal()
                  navigate('/dresses')
                }}
                className="px-8 py-4 rounded-full border border-espresso text-espresso text-xs uppercase tracking-widest font-medium hover:bg-cream transition-colors cursor-pointer"
              >
                {isArabic ? 'مواصلة استكشاف الأتليه' : 'Continue Exploring Atelier'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
