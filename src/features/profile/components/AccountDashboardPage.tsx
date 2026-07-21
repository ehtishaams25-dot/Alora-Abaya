import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useShop } from '../../../providers/ShopProvider'
import { DRESSES, type ProductDress } from '../../../data/dressesData'
import { Navigation } from '../../../components/Navigation'
import { Footer } from '../../../components/Footer'

type TabType =
  | 'dashboard'
  | 'orders'
  | 'wishlist'
  | 'addresses'
  | 'payments'
  | 'account'
  | 'password'
  | 'notifications'

export function AccountDashboardPage() {
  const { i18n } = useTranslation()
  const { isLoggedIn, userProfile, logout, wishlistItems, removeFromWishlist, addToCart } = useShop()
  const navigate = useNavigate()
  const location = useLocation()
  const isArabic = i18n.language.startsWith('ar')

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (location.pathname.includes('orders') || location.hash.includes('orders')) return 'orders'
    if (location.pathname.includes('wishlist') || location.hash.includes('wishlist')) return 'wishlist'
    return 'dashboard'
  })

  useEffect(() => {
    if (location.pathname.includes('orders') || location.hash.includes('orders')) {
      setActiveTab('orders')
    } else if (location.pathname.includes('wishlist') || location.hash.includes('wishlist')) {
      setActiveTab('wishlist')
    }
  }, [location.pathname, location.hash])

  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<typeof userProfile.orders[0] | null>(null)
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<typeof userProfile.orders[0] | null>(null)
  const [reorderToast, setReorderToast] = useState<string | null>(null)
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null)

  // Local editable form states
  const [name, setName] = useState(userProfile.name)
  const [email, setEmail] = useState(userProfile.email)
  const [phone, setPhone] = useState(userProfile.phone)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Mock restock notifications list
  const [restockList, setRestockList] = useState([
    { id: 'restock-1', productName: 'Royal Velvet Abaya', size: 'Size 56 (L)', dateAdded: 'July 10, 2026', status: 'In Production' },
    { id: 'restock-2', productName: 'Silk Organza Evening Drape', size: 'Size 54 (M)', dateAdded: 'June 28, 2026', status: 'Restocking Soon' }
  ])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-sand">
        <Navigation />
        <div className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="bg-cream border border-border2 rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-lg space-y-6 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-sand border border-border2 text-walnut mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-espresso">
              {isArabic ? 'تسجيل الدخول مطلوب' : 'VIP Access Required'}
            </h2>
            <p className="text-sm text-mocha leading-relaxed">
              {isArabic ? 'يرجى تسجيل الدخول للوصول إلى لوحة التحكم الملكية ومتابعة طلباتك الخاصة.' : 'Please sign in to access your bespoke account dashboard, order history, and exclusive tier privileges.'}
            </p>
            <Link
              to="/login"
              className="block w-full py-4 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors shadow-md"
            >
              {isArabic ? 'تسجيل الدخول الآن' : 'Sign In To Your Account'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleReorder = (order: typeof userProfile.orders[0]) => {
    // Find matching products or mock adding to cart
    order.items.forEach((item) => {
      const matched = DRESSES.find((d: ProductDress) => d.name === item.name || d.nameAr === item.name) || DRESSES[0]
      if (matched) {
        addToCart(matched, item.color, item.size)
      }
    })
    setReorderToast(isArabic ? `تم إضافة عناصر الطلب ${order.id} إلى حقيبة التسوق بنجاح!` : `Items from order ${order.id} added to your bag!`)
    setTimeout(() => setReorderToast(null), 3500)
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccessMessage(isArabic ? 'تم حفظ التعديلات الملكية بنجاح.' : 'Account details updated successfully.')
    setTimeout(() => setSaveSuccessMessage(null), 3500)
  }

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword !== confirmPassword) {
      alert(isArabic ? 'كلمات المرور الجديدة غير متطابقة!' : 'New passwords do not match!')
      return
    }
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setSaveSuccessMessage(isArabic ? 'تم تحديث كلمة المرور بأمان.' : 'Password updated securely.')
    setTimeout(() => setSaveSuccessMessage(null), 3500)
  }

  const tabs: { id: TabType; labelEn: string; labelAr: string; icon: string; count?: number }[] = [
    {
      id: 'dashboard',
      labelEn: 'Dashboard',
      labelAr: 'لوحة التحكم',
      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
    },
    {
      id: 'orders',
      labelEn: 'Orders History',
      labelAr: 'سجل الطلبات',
      icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
      count: userProfile.orders.length,
    },
    {
      id: 'wishlist',
      labelEn: 'Wishlist',
      labelAr: 'المفضلة الملكية',
      icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
      count: wishlistItems.length,
    },
    {
      id: 'addresses',
      labelEn: 'Saved Addresses',
      labelAr: 'عناوين التوصيل',
      icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    },
    {
      id: 'payments',
      labelEn: 'Payment Methods',
      labelAr: 'طرق الدفع والائتمان',
      icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
    },
    {
      id: 'account',
      labelEn: 'Account Information',
      labelAr: 'البيانات الشخصية',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
    {
      id: 'password',
      labelEn: 'Change Password',
      labelAr: 'تغيير كلمة المرور',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
    },
    {
      id: 'notifications',
      labelEn: 'Restock Notifications',
      labelAr: 'تنبيهات توفر المقاسات',
      icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
      count: restockList.length,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-sand">
      <Navigation />
      <div className="flex-1 py-12 sm:py-16 lg:py-24 animate-fade-in">
        <div className="container-layali">
        
        {/* Top Header Section with Personalized Greeting */}
        <div className="border-b border-border2/80 pb-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-walnut font-medium block mb-2">
              {isArabic ? 'بوابة العميل الملكي • ATELIER RIYADH' : 'VIP CLIENT PORTAL • ATELIER RIYADH'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso">
              {/* Mandatory User Requirement #2: "Welcome back, Sarah." instead of generic "My Account" */}
              {isArabic ? `أهلاً بك مجدداً، ${userProfile.name.split(' ')[0]}` : `Welcome back, ${userProfile.name.split(' ')[0]}.`}
            </h1>
          </div>

          {/* VIP Status Badge & Quick Logout */}
          <div className="flex items-center gap-4">
            <div className="bg-cream border border-border2 px-4 py-2 rounded-full flex items-center gap-2.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-serif text-espresso font-medium">
                {isArabic ? 'عضوية ذهبية • 1,450 نقطة' : 'VIP Gold Tier • 1,450 Pts'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="text-xs uppercase tracking-wider text-taupe hover:text-espresso border border-border2 bg-sand hover:bg-cream px-4 py-2 rounded-full transition-all cursor-pointer"
            >
              {isArabic ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Global Success / Toast Notice */}
        {(reorderToast || saveSuccessMessage) && (
          <div className="mb-8 bg-success/15 border border-success/40 rounded-2xl p-4 text-xs sm:text-sm text-espresso font-medium flex items-center gap-3 animate-scale-in">
            <span className="w-2.5 h-2.5 rounded-full bg-success shrink-0" />
            <span>{reorderToast || saveSuccessMessage}</span>
          </div>
        )}

        {/* Mobile Horizontal Scrollable Tab Bar (Sleek Luxury Boutique Pill Navigation) */}
        <div className="lg:hidden mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 border-b border-border2/80">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-espresso text-cream shadow-md scale-105'
                      : 'bg-cream/80 border border-border2 text-mocha hover:bg-sand hover:text-espresso'
                  }`}
                >
                  <svg
                    className={`w-3.5 h-3.5 stroke-current fill-none ${isActive ? 'text-cream' : 'text-taupe'}`}
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive ? 'bg-cream/20 text-cream' : 'bg-sand text-mocha'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Grid: Sidebar Navigation + Content Panel (Amazon / Luxury Boutique Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar Menu (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-cream/70 border border-border2 rounded-3xl p-4 shadow-sm lg:sticky lg:top-28">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left rtl:text-right px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-espresso text-cream shadow-md scale-[1.01]'
                        : 'text-mocha hover:bg-sand/80 hover:text-espresso'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <svg
                        className={`w-4 h-4 stroke-current fill-none ${isActive ? 'text-cream' : 'text-taupe'}`}
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                      </svg>
                      <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
                    </span>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-cream/20 text-cream' : 'bg-sand text-mocha'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}

              <div className="pt-3 mt-3 border-t border-border2/60">
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="w-full text-left rtl:text-right px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#8B2626] font-medium hover:bg-[#8B2626]/10 transition-colors flex items-center gap-3 cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span>{isArabic ? 'تسجيل الخروج' : 'Logout'}</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Right Content Panel */}
          <main className="lg:col-span-8 xl:col-span-9 bg-cream/40 border border-border2 rounded-3xl p-6 sm:p-8 lg:p-10 min-h-[500px]">
            
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="font-serif text-2xl text-espresso mb-2">
                    {isArabic ? 'نظرة عامة على حسابك' : 'Account Overview'}
                  </h2>
                  <p className="text-sm text-mocha">
                    {isArabic
                      ? 'من هنا يمكنك متابعة طلباتك الأخيرة، العناوين المحفوظة، وتفضيلات القياس الملكية الخاصة بك.'
                      : 'From your bespoke dashboard, review recent orders, manage shipping addresses, and explore your exclusive VIP benefits.'}
                  </p>
                </div>

                {/* Quick Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-sand border border-border2 rounded-2xl p-5 hover:border-walnut transition-all">
                    <span className="text-[10px] uppercase tracking-widest text-taupe block mb-1">
                      {isArabic ? 'إجمالي الطلبات' : 'TOTAL ORDERS'}
                    </span>
                    <span className="font-serif text-3xl text-espresso font-semibold block">
                      {userProfile.orders.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-walnut underline underline-offset-4 mt-3 inline-block cursor-pointer"
                    >
                      {isArabic ? 'عرض سجل الطلبات ←' : 'View Orders →'}
                    </button>
                  </div>

                  <div className="bg-sand border border-border2 rounded-2xl p-5 hover:border-walnut transition-all">
                    <span className="text-[10px] uppercase tracking-widest text-taupe block mb-1">
                      {isArabic ? 'القطع المفضلة' : 'WISHLIST ITEMS'}
                    </span>
                    <span className="font-serif text-3xl text-espresso font-semibold block">
                      {wishlistItems.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('wishlist')}
                      className="text-xs text-walnut underline underline-offset-4 mt-3 inline-block cursor-pointer"
                    >
                      {isArabic ? 'استعراض المفضلة ←' : 'View Wishlist →'}
                    </button>
                  </div>

                  <div className="bg-sand border border-border2 rounded-2xl p-5 hover:border-walnut transition-all">
                    <span className="text-[10px] uppercase tracking-widest text-taupe block mb-1">
                      {isArabic ? 'رصيد ومكافآت VIP' : 'VIP REWARDS'}
                    </span>
                    <span className="font-serif text-3xl text-espresso font-semibold block">
                      1,450 <span className="text-xs font-normal font-sans">Pts</span>
                    </span>
                    <span className="text-xs text-success font-medium mt-3 inline-block">
                      {isArabic ? 'مؤهلة لخصم 15% على طلبك القادم' : '15% Reward active for next order'}
                    </span>
                  </div>
                </div>

                {/* Recent Order Snapshot */}
                {userProfile.orders.length > 0 && (
                  <div className="bg-sand border border-border2 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-lg text-espresso">
                        {isArabic ? 'آخر طلب تم تنفيذه' : 'Latest Order'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('orders')}
                        className="text-xs uppercase tracking-wider text-taupe hover:text-espresso underline underline-offset-4 cursor-pointer"
                      >
                        {isArabic ? 'عرض كل الطلبات' : 'See All Orders'}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border2/60 pt-4">
                      <div>
                        <span className="text-xs font-mono font-semibold text-espresso block">
                          {userProfile.orders[0].id}
                        </span>
                        <span className="text-xs text-mocha">
                          {userProfile.orders[0].date} • {userProfile.orders[0].items.length} {isArabic ? 'عنصر' : 'item(s)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-success/15 text-success text-[11px] font-medium">
                          {userProfile.orders[0].status}
                        </span>
                        <span className="font-serif font-semibold text-espresso text-base">
                          {userProfile.orders[0].total} SAR
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ORDERS HISTORY (Priority #3) */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-border2 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-espresso">
                      {isArabic ? 'سجل الطلبات' : 'Order History'}
                    </h2>
                    <p className="text-sm text-mocha">
                      {isArabic ? 'تتبع شحناتك، تصفح فواتير الأتليه الرسمية، أو أعيدي طلب قطعك المفضلة بنقرة واحدة.' : 'Track live shipments, download official atelier invoices, and reorder signature pieces effortlessly.'}
                    </p>
                  </div>
                </div>

                {userProfile.orders.length === 0 ? (
                  <div className="text-center py-16 bg-sand rounded-2xl border border-border2 p-8">
                    <h4 className="font-serif text-xl text-espresso mb-2">
                      {isArabic ? 'لا توجد طلبات سابقة' : 'No previous orders'}
                    </h4>
                    <p className="text-sm text-mocha mb-6">
                      {isArabic ? 'ابدئي رحلة التسوق واستكشفي مجموعتنا الملكية الجديدة.' : 'Start your atelier journey and explore our exclusive signature collection.'}
                    </p>
                    <Link
                      to="/dresses"
                      className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors inline-block"
                    >
                      {isArabic ? 'تصفح التشكيلة الملكية' : 'Explore Collection'}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userProfile.orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-sand border border-border2 rounded-2xl p-6 hover:border-walnut transition-all shadow-2xs space-y-5"
                      >
                        {/* Order Top Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border2/60 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-espresso text-sm sm:text-base">
                                {order.id}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-success/15 text-success text-[11px] font-medium uppercase tracking-wider">
                                {order.status}
                              </span>
                            </div>
                            <span className="text-xs text-mocha block">
                              {isArabic ? 'تاريخ الطلب: ' : 'Order Date: '} {order.date}
                            </span>
                          </div>

                          <div className="text-left sm:text-right rtl:sm:text-left">
                            <span className="text-[10px] uppercase tracking-widest text-taupe block">
                              {isArabic ? 'الإجمالي الكلي' : 'TOTAL AMOUNT'}
                            </span>
                            <span className="font-serif text-lg sm:text-xl font-bold text-espresso">
                              {order.total} <span className="text-xs font-sans font-normal">SAR</span>
                            </span>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4 py-2 bg-cream/50 px-4 rounded-xl">
                              <div className="flex items-center gap-3.5 min-w-0">
                                <span className="w-6 h-6 rounded-full bg-espresso text-cream text-xs flex items-center justify-center font-medium shrink-0">
                                  {item.quantity}x
                                </span>
                                <div className="min-w-0">
                                  <span className="font-serif text-sm text-espresso font-medium block truncate">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-mocha block">
                                    {item.color} • {item.size}
                                  </span>
                                </div>
                              </div>
                              <span className="text-xs font-semibold text-espresso shrink-0">
                                {item.price} SAR
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Action Buttons: Tracking, Invoice, Reorder */}
                        <div className="pt-3 border-t border-border2/60 flex flex-wrap items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedOrderForTracking(order)}
                            className="px-4 py-2 rounded-full border border-border2 bg-cream text-espresso text-xs uppercase tracking-wider font-medium hover:border-walnut transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <svg className="w-4 h-4 text-taupe stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <span>{isArabic ? 'تتبع الشحنة' : 'Track Order'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedOrderForInvoice(order)}
                            className="px-4 py-2 rounded-full border border-border2 bg-cream text-espresso text-xs uppercase tracking-wider font-medium hover:border-walnut transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <svg className="w-4 h-4 text-taupe stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span>{isArabic ? 'الفاتورة والأبعاد' : 'Invoice & Details'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReorder(order)}
                            className="px-5 py-2 rounded-full bg-espresso text-cream text-xs uppercase tracking-wider font-medium hover:bg-ink transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                          >
                            <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <span>{isArabic ? 'إعادة الطلب' : 'Reorder'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-border2 pb-4">
                  <h2 className="font-serif text-2xl text-espresso">
                    {isArabic ? 'المفضلة الملكية' : 'Saved Wishlist'}
                  </h2>
                  <p className="text-sm text-mocha">
                    {isArabic ? 'القطع التي قمتِ بحفظها للعودة إليها لاحقاً.' : 'Bespoke pieces curated for your personal collection.'}
                  </p>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-16 bg-sand rounded-2xl border border-border2 p-8">
                    <p className="text-sm text-mocha mb-6">
                      {isArabic ? 'قائمتك المفضلة فارغة حالياً.' : 'Your luxury wishlist is currently empty.'}
                    </p>
                    <Link
                      to="/dresses"
                      className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors inline-block"
                    >
                      {isArabic ? 'استكشاف العبايات' : 'Explore Abayas'}
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlistItems.map((product) => {
                      const title = isArabic ? (product.nameAr || product.name) : product.name
                      return (
                        <div key={product.id} className="bg-sand border border-border2 rounded-2xl p-4 flex gap-4 items-center">
                          <img src={product.image} alt={title} className="w-20 h-28 object-cover rounded-xl shrink-0" />
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="font-serif text-sm sm:text-base text-espresso truncate">{title}</h4>
                            <span className="text-xs text-espresso font-semibold block">{product.price} SAR</span>
                            <div className="pt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => addToCart(product, 'Signature', 'Size 54 (M)')}
                                className="px-3.5 py-1.5 rounded-full bg-espresso text-cream text-[10px] uppercase tracking-wider font-medium hover:bg-ink cursor-pointer"
                              >
                                {isArabic ? 'إضافة للحقيبة' : 'Add to Bag'}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeFromWishlist(product.id)}
                                className="text-[10px] text-taupe hover:text-[#8B2626] underline cursor-pointer"
                              >
                                {isArabic ? 'إزالة' : 'Remove'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-border2 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-espresso">
                      {isArabic ? 'عناوين التوصيل' : 'Saved Addresses'}
                    </h2>
                    <p className="text-sm text-mocha">
                      {isArabic ? 'عناوين التوصيل الخاصة بك لشحن سريع ومؤمن باب إلى باب.' : 'Your delivery destinations for insured, door-to-door courier service.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(isArabic ? 'إضافة عنوان جديد...' : 'Adding new address...')}
                    className="px-5 py-2.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-wider font-medium hover:bg-ink cursor-pointer shrink-0"
                  >
                    {isArabic ? '+ عنوان جديد' : '+ Add Address'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-sand border-2 border-espresso rounded-2xl p-6 space-y-3 relative">
                    <span className="absolute top-4 end-4 bg-espresso text-cream text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {isArabic ? 'الافتراضي' : 'Default'}
                    </span>
                    <h4 className="font-serif text-base text-espresso font-semibold">
                      {isArabic ? 'المنزل • الرياض' : 'Home • Riyadh'}
                    </h4>
                    <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                      Sarah Al-Maktoum<br />
                      King Fahd Road, Al-Olaya District<br />
                      Villa 14, Riyadh 12214<br />
                      Saudi Arabia (+966 50 123 4567)
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs">
                      <button type="button" className="text-walnut underline font-medium cursor-pointer">
                        {isArabic ? 'تعديل العنوان' : 'Edit'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-sand border border-border2 rounded-2xl p-6 space-y-3 hover:border-walnut transition-all">
                    <h4 className="font-serif text-base text-espresso font-semibold">
                      {isArabic ? 'مكتب الأتليه • دبي' : 'Atelier Office • Dubai'}
                    </h4>
                    <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                      Sarah Al-Maktoum<br />
                      DIFC Gate Avenue, Level 3<br />
                      Suite 302, Dubai<br />
                      United Arab Emirates (+971 50 987 6543)
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs">
                      <button type="button" className="text-walnut underline font-medium cursor-pointer">
                        {isArabic ? 'تعديل العنوان' : 'Edit'}
                      </button>
                      <button type="button" className="text-taupe hover:text-espresso underline cursor-pointer">
                        {isArabic ? 'تعيين كافتراضي' : 'Set as Default'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PAYMENT METHODS */}
            {activeTab === 'payments' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-border2 pb-4">
                  <h2 className="font-serif text-2xl text-espresso">
                    {isArabic ? 'طرق الدفع والائتمان' : 'Payment Methods'}
                  </h2>
                  <p className="text-sm text-mocha">
                    {isArabic ? 'إدارة البطاقات المحفوظة، وتسهيلات الدفع المرنة عبر تابي وتمارا.' : 'Manage encrypted cards and check your Tabby & Tamara buy-now-pay-later credit availability.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-sand border border-border2 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-semibold text-espresso">Apple Pay / Visa</span>
                      <span className="text-xs bg-success/15 text-success px-2.5 py-0.5 rounded-full font-medium">
                        {isArabic ? 'مفعل ومؤمن' : 'Encrypted'}
                      </span>
                    </div>
                    <span className="font-mono text-sm sm:text-base text-espresso block tracking-widest">
                      •••• •••• •••• 4242
                    </span>
                    <div className="text-xs text-mocha flex justify-between pt-2 border-t border-border2/60">
                      <span>Expires 08/28</span>
                      <span>Sarah Al-Maktoum</span>
                    </div>
                  </div>

                  <div className="bg-[#121212] text-[#FAF9F6] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base tracking-wide font-medium">Tabby & Tamara VIP Limit</span>
                      <span className="text-[10px] uppercase tracking-widest bg-white/15 px-2.5 py-1 rounded-full">
                        0% Interest
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#FAF9F6]/70 block mb-1">
                        {isArabic ? 'الحد الائتماني المتاح للتسوق الملكي' : 'Available Buy-Now-Pay-Later Limit'}
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37] font-semibold">
                        5,000 SAR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: ACCOUNT INFORMATION */}
            {activeTab === 'account' && (
              <form onSubmit={handleProfileSave} className="space-y-6 animate-fade-in max-w-xl">
                <div className="border-b border-border2 pb-4">
                  <h2 className="font-serif text-2xl text-espresso">
                    {isArabic ? 'البيانات الشخصية' : 'Account Information'}
                  </h2>
                  <p className="text-sm text-mocha">
                    {isArabic ? 'تحديث الاسم الرسمي وبيانات التواصل المعتمدة لدى الأتليه.' : 'Update your personal details for bespoke communications and invitation-only previews.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-sm text-espresso focus:border-espresso outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-sm text-espresso focus:border-espresso outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'رقم الجوال الفاخر' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-sm text-espresso focus:border-espresso outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer shadow-md"
                  >
                    {isArabic ? 'حفظ التعديلات' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 7: CHANGE PASSWORD */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSave} className="space-y-6 animate-fade-in max-w-xl">
                <div className="border-b border-border2 pb-4">
                  <h2 className="font-serif text-2xl text-espresso">
                    {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
                  </h2>
                  <p className="text-sm text-mocha">
                    {isArabic ? 'حافظي على أمان بوابة حسابك الملكية بتحديث كلمة المرور.' : 'Ensure the security of your VIP account with an encrypted password.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'كلمة المرور الحالية' : 'Current Password'}
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-sm text-espresso focus:border-espresso outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'كلمة المرور الجديدة' : 'New Password'}
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-sm text-espresso focus:border-espresso outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-sand border border-border2 rounded-xl px-4 py-3 text-sm text-espresso focus:border-espresso outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer shadow-md"
                  >
                    {isArabic ? 'تحديث كلمة المرور' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 8: RESTOCK NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-border2 pb-4">
                  <h2 className="font-serif text-2xl text-espresso">
                    {isArabic ? 'تنبيهات توفر المقاسات' : 'Restock Notifications'}
                  </h2>
                  <p className="text-sm text-mocha">
                    {isArabic ? 'القطع والمقاسات التي اشتركتِ في إشعار توفرها فور حياكتها في الأتليه.' : 'Bespoke pieces you have requested priority notifications for once re-crafted.'}
                  </p>
                </div>

                {restockList.length === 0 ? (
                  <p className="text-sm text-mocha italic py-8">
                    {isArabic ? 'لا توجد تنبيهات توفر حالية.' : 'You have no active restock notification requests.'}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {restockList.map((item) => (
                      <div key={item.id} className="bg-sand border border-border2 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div>
                          <h4 className="font-serif text-base text-espresso font-semibold">{item.productName}</h4>
                          <span className="text-xs text-mocha block">{item.size} • Added {item.dateAdded}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-full bg-walnut/15 text-walnut text-[11px] font-medium">
                            {item.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => setRestockList(restockList.filter((r) => r.id !== item.id))}
                            className="text-xs text-taupe hover:text-[#8B2626] underline cursor-pointer"
                          >
                            {isArabic ? 'إلغاء التنبيه' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>
      </div>

      {/* TRACKING MODAL */}
      {selectedOrderForTracking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedOrderForTracking(null)}
        >
          <div
            className="bg-sand border border-border2 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border2 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-walnut font-medium block">
                  {isArabic ? 'تتبع الشحنة الملكية' : 'ATELIER SHIPMENT TRACKING'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-espresso">
                  {selectedOrderForTracking.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForTracking(null)}
                className="w-9 h-9 rounded-full bg-cream text-espresso hover:bg-border2 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 py-2">
              <div className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-success text-cream flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-serif text-sm text-espresso font-semibold">{isArabic ? 'تم تأكيد الطلب الملكي' : 'Order Confirmed & Atelier Assigned'}</h4>
                  <p className="text-xs text-mocha">{selectedOrderForTracking.date} • Riyadh Master Tailor Atelier</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-success text-cream flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-serif text-sm text-espresso font-semibold">{isArabic ? 'الفحص والتغليف بالحرير والمعطر' : 'Quality Inspection & Scented Silk Packaging'}</h4>
                  <p className="text-xs text-mocha">{isArabic ? 'تم اجتياز فحص الجودة اليدوي بدقة 100%' : 'Passed 100% manual stitching and embroidery audit'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-walnut text-cream flex items-center justify-center text-xs shrink-0 mt-0.5 animate-pulse">🚚</span>
                <div>
                  <h4 className="font-serif text-sm text-espresso font-semibold">{isArabic ? 'مع المندوب الخاص في الطريق إليك' : 'Out with VIP Insured Courier'}</h4>
                  <p className="text-xs text-mocha">{isArabic ? 'التوصيل المتوقع اليوم قبل الساعة 6:00 مساءً' : 'Estimated arrival today before 6:00 PM'}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-6 py-2.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium cursor-pointer"
              >
                {isArabic ? 'إغلاق نافذة التتبع' : 'Close Tracking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVOICE PREVIEW MODAL */}
      {selectedOrderForInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedOrderForInvoice(null)}
        >
          <div
            className="bg-cream border border-border2 rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl relative space-y-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border2 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-walnut font-medium block">
                  ALORA ATELIER • OFFICIAL TAX INVOICE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-espresso">
                  Invoice #{selectedOrderForInvoice.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForInvoice(null)}
                className="w-9 h-9 rounded-full bg-sand text-espresso hover:bg-border2 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-sand border border-border2/80 rounded-2xl p-5 space-y-4 text-xs sm:text-sm font-sans text-espresso">
              <div className="flex justify-between border-b border-border2/60 pb-3">
                <span><strong>Client:</strong> Sarah Al-Maktoum</span>
                <span><strong>Date:</strong> {selectedOrderForInvoice.date}</span>
              </div>
              <div className="space-y-2">
                {selectedOrderForInvoice.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.quantity}x {it.name} ({it.size})</span>
                    <span className="font-semibold">{it.price} SAR</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-border2 pt-3 font-serif font-bold text-base">
                <span>Total Amount Paid (VAT Included):</span>
                <span>{selectedOrderForInvoice.total} SAR</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[11px] text-mocha italic">
                {isArabic ? 'شكراً لاختيارك أتليه ألورا الملكي.' : 'Thank you for choosing Alora Atelier.'}
              </span>
              <button
                type="button"
                onClick={() => {
                  alert(isArabic ? 'جاري تحميل الفاتورة (PDF)...' : 'Downloading official PDF receipt...')
                }}
                className="px-6 py-2.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>{isArabic ? 'تحميل الفاتورة PDF' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
