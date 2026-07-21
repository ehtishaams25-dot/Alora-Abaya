import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ProductEditorialReviewsSectionProps {
  isArabic: boolean
}

interface ReviewItem {
  id: string
  authorEn: string
  authorAr: string
  locationEn: string
  locationAr: string
  dateEn: string
  dateAr: string
  rating: number
  titleEn: string
  titleAr: string
  quoteEn: string
  quoteAr: string
  sizeEn: string
  sizeAr: string
  fitEn: string
  fitAr: string
  helpfulCount: number
  verified: boolean
  hasPhoto: boolean
}

export function ProductEditorialReviewsSection({ isArabic }: ProductEditorialReviewsSectionProps) {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'photos' | 'fit'>('all')
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({})
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({})
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Form State
  const [ratingInput, setRatingInput] = useState(5)
  const [nameInput, setNameInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [commentInput, setCommentInput] = useState('')

  const reviews: ReviewItem[] = [
    {
      id: 'rev-pdp-1',
      authorEn: "Princess Amira K.",
      authorAr: "سمو الأميرة أميرة ك.",
      locationEn: "Riyadh, Saudi Arabia",
      locationAr: "الرياض، المملكة العربية السعودية",
      dateEn: "3 days ago",
      dateAr: "منذ 3 أيام",
      rating: 5,
      titleEn: "Exquisite French tailoring and fluid drape — true to size",
      titleAr: "خياطة فرنسية فائقة الإتقان وانسيابية ساحرة — المقاس دقيق تماماً",
      quoteEn: "I ordered Size 54 for a formal evening gathering in Riyadh, and the quality exceeded all my expectations. The double-layered crepe falls beautifully without adding any unwanted weight or bulk. Every hidden French seam inside is immaculately finished. I strongly recommend ordering your standard length — the proportions are spot on.",
      quoteAr: "طلبت مقاس 54 لحضور مناسبة مسائية خاصة في الرياض، وكانت الجودة تفوق كل توقعاتي. طبقتان من الكريب تنسبان بنعومة بالغة دون أي ثقل إضافي. كل درزة مخفية في الداخل مشطبة بعناية فائقة. أنصح بشدة باختيار مقاسك المعتاد — النسب والتفاصيل مثالية تماماً.",
      sizeEn: "Size 54",
      sizeAr: "مقاس 54",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 24,
      verified: true,
      hasPhoto: true
    },
    {
      id: 'rev-pdp-2',
      authorEn: "Sheikha A. Al-Thani",
      authorAr: "الشيخة أ. آل ثاني",
      locationEn: "Doha, Qatar",
      locationAr: "الدوحة، قطر",
      dateEn: "1 week ago",
      dateAr: "منذ أسبوع",
      rating: 5,
      titleEn: "The golden zari embroidery has a quiet, bespoke luster",
      titleAr: "تطريز الزري الذهبي يتمتع ببريق هادئ ولمسة ملكية خاصة",
      quoteEn: "In an era where most evening wear feels rushed and lightweight, wearing Alora is an exercise in dignity. The zari gold thread has a subtle antique patina that photographs magnificently under salon lighting without ever looking gaudy. The Japanese Nidha fabric has the exact right weight and swing.",
      quoteAr: "في زمن تبدو فيه معظم تصاميم السهرات مستعجلة، يمنحك ارتداء قطع ألورا إحساساً عميقاً بالهيبة والوقار. خيوط الزري الذهب تتميز بتعتيق كلاسيكي رائع يظهر في الصور بجمال فائق دون أي مبالغة. قماش الندا الياباني ذو ثقل وانسيابية مذهلة.",
      sizeEn: "Size 56",
      sizeAr: "مقاس 56",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 19,
      verified: true,
      hasPhoto: true
    },
    {
      id: 'rev-pdp-3',
      authorEn: "Lady S. Kensington",
      authorAr: "ليدي س. كينسينغتون",
      locationEn: "London, United Kingdom",
      locationAr: "لندن، المملكة المتحدة",
      dateEn: "2 weeks ago",
      dateAr: "منذ أسبوعين",
      rating: 5,
      titleEn: "An heirloom piece designed to transcend generations",
      titleAr: "قطعة فنية متوارثة صُممت لتبقى وتتألق عبر الأجيال",
      quoteEn: "I was initially hesitant about ordering couture online for delivery to London, but the client service and presentation were impeccable. The garment arrived pressed inside a signature velvet-trimmed garment bag. The French draping around the collar and sleeves is sculptural. Worth every penny of the investment.",
      quoteAr: "كنت مترددة في البداية بشأن طلب قطعة كوتور عبر الإنترنت وتوصيلها إلى لندن، لكن خدمة العميلات وتغليف التقديم كانا استثنائيين. وصلت القطعة مكوية بعناية داخل حقيبة حفظ فاخرة بلمسات مخملية. الثنيات الفرنسية حول الياقة والأكمام أشبه بنحت فني.",
      sizeEn: "Size 52",
      sizeAr: "مقاس 52",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 31,
      verified: true,
      hasPhoto: false
    },
    {
      id: 'rev-pdp-4',
      authorEn: "Dr. Fatimah Al-Mansoor",
      authorAr: "د. فاطمة المنصور",
      locationEn: "Dubai, United Arab Emirates",
      locationAr: "دبي، الإمارات العربية المتحدة",
      dateEn: "3 weeks ago",
      dateAr: "منذ 3 أسابيع",
      rating: 5,
      titleEn: "Breathable luxury that maintains its sharp architecture",
      titleAr: "فخامة تتنفس وتحافظ على هويتها المعمارية الحادة طوال المساء",
      quoteEn: "What surprised me most is how breathable the structured gabardine feels even during warm coastal evenings in Dubai. It holds its sharp architectural lines all evening without wrinkling at the hem. If you are between lengths, I suggest going up one size for a slightly more dramatic floor sweep.",
      quoteAr: "أكثر ما أدهشني هو مدى تهوية قماش الجاباردين المنظم حتى خلال الأمسيات الدافئة في دبي. يحافظ على خطوطه المعمارية الحادة طوال الحفل دون أي تجاعيد عند الحاشية. إذا كنتِ بين طولين، أنصح باختيار المقاس الأكبر للحصول على انسيابية أطول وأكثر فخامة.",
      sizeEn: "Size 58",
      sizeAr: "مقاس 58",
      fitEn: "Slightly Long (Dramatic)",
      fitAr: "انسيابي طويل (فخم)",
      helpfulCount: 15,
      verified: true,
      hasPhoto: true
    }
  ]

  const handleHelpfulClick = (id: string, initialCount: number) => {
    if (votedIds[id]) return
    const current = helpfulVotes[id] !== undefined ? helpfulVotes[id] : initialCount
    setHelpfulVotes({ ...helpfulVotes, [id]: current + 1 })
    setVotedIds({ ...votedIds, [id]: true })
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setShowWriteModal(false)
      setFormSubmitted(false)
      setNameInput('')
      setTitleInput('')
      setCommentInput('')
      setRatingInput(5)
    }, 2000)
  }

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === 'verified') return r.verified
    if (activeFilter === 'photos') return r.hasPhoto
    if (activeFilter === 'fit') return r.fitEn.includes('True') || r.fitAr.includes('مطابق')
    return true
  })

  return (
    <section className="min-h-[85svh] flex flex-col justify-center py-24 sm:py-32 lg:py-40 bg-cream border-b border-border2/60 relative font-sans">
      <div className="container-layali">
        
        {/* SECTION HEADER & E-COMMERCE RATING DASHBOARD */}
        <div className="bg-sand/60 border border-border2/80 rounded-3xl p-6 sm:p-10 lg:p-12 mb-14 sm:mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Eyebrow & Title */}
            <div className="lg:col-span-4 text-center lg:text-start">
              <span className="text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3">
                {t('product.reviews.eyebrow', isArabic ? 'تقييمات صالون ليالي الموثقة' : 'Verified Client Reviews')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-snug mb-3">
                {t('product.reviews.title', isArabic ? 'آراء وتجارب العميلات' : 'Client Testimonials')}
              </h2>
              <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                {isArabic
                  ? 'تجارب وانطباعات حقيقية موثقة من نخبة عميلات صالوناتنا في الرياض، دبي، الدوحة، ولندن.'
                  : 'Authentic evaluations from our discerning clientele across Riyadh, Dubai, Doha, and London.'}
              </p>
              
              {/* Write Review Trigger Button */}
              <button
                type="button"
                onClick={() => setShowWriteModal(true)}
                className="mt-6 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-[0.22em] font-medium hover:bg-walnut transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>{isArabic ? 'إضافة تقييم للقطعة' : 'Write a Client Review'}</span>
                <span aria-hidden="true" className="text-sm">+</span>
              </button>
            </div>

            {/* Center: Overall Rating & Summary */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 bg-cream/80 border border-border2/60 rounded-2xl text-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif text-4xl sm:text-5xl font-normal text-espresso tracking-tight">4.9</span>
                <div className="flex flex-col items-start text-xs text-mocha">
                  <div className="flex text-walnut text-base">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <span className="uppercase tracking-[0.16em] text-[10px] text-taupe mt-0.5">
                    {isArabic ? 'من أصل 5.0 نجوم' : 'out of 5.0 stars'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-espresso font-medium tracking-wide">
                {isArabic ? 'بناءً على 48 تقييماً موثقاً لشراء القطعة' : 'Based on 48 verified purchases across global salons'}
              </p>
              <div className="w-full h-[1px] bg-border2/60 my-4" />
              <div className="flex items-center justify-between w-full text-[11px] text-mocha uppercase tracking-wider">
                <span>{isArabic ? 'نسبة التوصية بالقطعة' : 'Client Recommendation'}</span>
                <span className="font-medium text-success">98% {isArabic ? 'ينصحن بها' : 'Recommended'}</span>
              </div>
            </div>

            {/* Right: Bespoke Fit & Craftsmanship Breakdown */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-espresso mb-1.5 font-medium">
                  <span>{isArabic ? 'دقة المقاس (Fit Accuracy)' : 'Fit Accuracy'}</span>
                  <span className="text-walnut">{isArabic ? 'مطابق للمقاس (96%)' : '96% True to Size'}</span>
                </div>
                <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden border border-border2/40">
                  <div className="h-full bg-walnut rounded-full w-[96%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-espresso mb-1.5 font-medium">
                  <span>{isArabic ? 'جودة الخياطة والأقمشة' : 'Fabric & Craftsmanship'}</span>
                  <span className="text-walnut">{isArabic ? 'استثنائية (100%)' : '100% Bespoke Quality'}</span>
                </div>
                <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden border border-border2/40">
                  <div className="h-full bg-walnut rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-espresso mb-1.5 font-medium">
                  <span>{isArabic ? 'انسيابية الثنيات والحركة' : 'Drape & Movement'}</span>
                  <span className="text-walnut">{isArabic ? 'فائقة الرقي (98%)' : '98% Exceptional'}</span>
                </div>
                <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden border border-border2/40">
                  <div className="h-full bg-walnut rounded-full w-[98%]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* E-COMMERCE FILTER & TABS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border2/60">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', labelEn: 'All Reviews (48)', labelAr: 'جميع التقييمات (48)' },
              { id: 'verified', labelEn: 'Verified Purchases (48)', labelAr: 'مشترية موثقة (48)' },
              { id: 'photos', labelEn: 'Client Styling (14)', labelAr: 'مع صور العميلات (14)' },
              { id: 'fit', labelEn: 'True to Size (45)', labelAr: 'المقاس الدقيق (45)' }
            ].map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-espresso text-cream font-medium shadow-xs'
                      : 'bg-sand text-espresso hover:bg-border2/60 border border-border2/60'
                  }`}
                >
                  {isArabic ? tab.labelAr : tab.labelEn}
                </button>
              )
            })}
          </div>

          <div className="text-xs text-mocha uppercase tracking-wider">
            {isArabic ? 'ترتيب حسب: الأحدث والتقييم الأعلى' : 'Sort by: Most Helpful & Recent'}
          </div>
        </div>

        {/* REVIEWS GRID / LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredReviews.map((item) => {
            const currentHelpful = helpfulVotes[item.id] !== undefined ? helpfulVotes[item.id] : item.helpfulCount
            const hasVoted = Boolean(votedIds[item.id])

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-sand/40 border border-border2/60 transition-all duration-300 hover:border-walnut/50 hover:bg-sand/70 hover:shadow-sm"
              >
                <div>
                  {/* Top Header: Stars, Verified Badge, Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-walnut text-sm">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 bg-cream border border-border2/80 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-success font-medium">
                          <svg className="w-3 h-3 stroke-current fill-none" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>{isArabic ? 'شراء موثق' : 'Verified Salon Purchase'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-mocha font-normal">
                      {isArabic ? item.dateAr : item.dateEn}
                    </span>
                  </div>

                  {/* Review Headline */}
                  <h3 className="font-serif text-base sm:text-lg text-espresso font-normal tracking-tight mb-3">
                    &ldquo;{isArabic ? item.titleAr : item.titleEn}&rdquo;
                  </h3>

                  {/* Review Body Quote */}
                  <p className="text-xs sm:text-sm text-mocha leading-relaxed font-normal mb-6">
                    {isArabic ? item.quoteAr : item.quoteEn}
                  </p>
                </div>

                <div>
                  {/* Product Attribute & Fit Pill Bar */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 pt-4 border-t border-border2/50 text-[11px]">
                    <span className="bg-cream px-3 py-1 rounded-full border border-border2/60 text-espresso font-medium">
                      {isArabic ? item.sizeAr : item.sizeEn}
                    </span>
                    <span className="bg-cream px-3 py-1 rounded-full border border-border2/60 text-walnut font-medium">
                      {isArabic ? 'المقاس: ' : 'Fit: '} {isArabic ? item.fitAr : item.fitEn}
                    </span>
                    {item.hasPhoto && (
                      <span className="bg-espresso/10 text-espresso px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                        <span>📷</span>
                        <span>{isArabic ? 'صورة مرفقة' : 'Verified Photo'}</span>
                      </span>
                    )}
                  </div>

                  {/* Reviewer Attribution & Helpful Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border2/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-espresso text-cream font-serif text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {(isArabic ? item.authorAr : item.authorEn).replace(/[^a-zA-Zأ-ي]/g, '').charAt(0) || 'A'}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm text-espresso font-normal leading-tight">
                          {isArabic ? item.authorAr : item.authorEn}
                        </h4>
                        <p className="text-[10px] text-mocha uppercase tracking-wider mt-0.5">
                          {isArabic ? item.locationAr : item.locationEn}
                        </p>
                      </div>
                    </div>

                    {/* Helpful Action Button */}
                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(item.id, item.helpfulCount)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                        hasVoted
                          ? 'bg-walnut text-cream border-walnut font-medium shadow-2xs'
                          : 'bg-cream text-mocha hover:text-espresso border-border2/80 hover:border-espresso/40'
                      }`}
                    >
                      <span>{isArabic ? 'مفيد' : 'Helpful'}</span>
                      <span className="font-medium">({currentHelpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* WRITE A REVIEW MODAL */}
        {showWriteModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-espresso/75 backdrop-blur-md animate-fade-up">
            <div className="absolute inset-0" onClick={() => setShowWriteModal(false)} />
            
            <div className="relative w-full max-w-xl bg-cream rounded-3xl border border-border2 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border2/60 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-walnut font-medium block">
                    {isArabic ? 'صالون ليالي للأزياء الراقية' : 'Alora Salon Curators'}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal mt-0.5">
                    {isArabic ? 'إضافة تقييم للقطعة' : 'Submit a Bespoke Review'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="p-2 text-mocha hover:text-espresso rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-up">
                  <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto text-2xl font-serif">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl text-espresso">
                    {isArabic ? 'شكراً لمشاركة تجربتك الراقية' : 'Thank You for Your Bespoke Review'}
                  </h4>
                  <p className="text-xs text-mocha max-w-sm mx-auto leading-relaxed">
                    {isArabic
                      ? 'تم إرسال تقييمك إلى فريق إدارة الجودة في صالون ليالي للمراجعة والتوثيق قريباً.'
                      : 'Your evaluation has been submitted to the Alora Quality Curators and will be verified shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-start">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-espresso font-medium mb-2">
                      {isArabic ? 'التقييم العام' : 'Overall Rating'}
                    </label>
                    <div className="flex gap-2 text-2xl text-walnut cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingInput(star)}
                          className="transition-transform hover:scale-110 focus:outline-none"
                        >
                          {star <= ratingInput ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-espresso font-medium mb-1.5">
                        {isArabic ? 'الاسم بالكامل' : 'Your Name / Title'}
                      </label>
                      <input
                        type="text"
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder={isArabic ? 'مثال: الأميرة سارة المانع' : 'e.g. Sheikha Amira K.'}
                        className="w-full bg-sand/60 border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso focus:outline-none focus:border-walnut"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-espresso font-medium mb-1.5">
                        {isArabic ? 'المدينة / الصالون' : 'City / Salon Location'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'الرياض، السعودية' : 'e.g. Riyadh, Saudi Arabia'}
                        className="w-full bg-sand/60 border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso focus:outline-none focus:border-walnut"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'عنوان التقييم' : 'Review Headline'}
                    </label>
                    <input
                      type="text"
                      required
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder={isArabic ? 'مثال: جودة خياطة استثنائية وانسيابية فخمة' : 'e.g. Exquisite French tailoring and fluid drape'}
                      className="w-full bg-sand/60 border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso focus:outline-none focus:border-walnut"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'تفاصيل التجربة والقطعة' : 'Bespoke Experience Details'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder={isArabic
                        ? 'شاركي تفاصيل قماش القطعة، دقة المقاس، وجودة التشطيبات الداخلية...'
                        : 'Share your impressions regarding the French seams, Nidha weight, and drape...'
                      }
                      className="w-full bg-sand/60 border border-border2 rounded-xl px-4 py-2.5 text-xs text-espresso focus:outline-none focus:border-walnut resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowWriteModal(false)}
                      className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider text-mocha hover:text-espresso transition-colors"
                    >
                      {isArabic ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full bg-espresso text-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-walnut transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      {isArabic ? 'إرسال التقييم الموثق' : 'Submit Evaluation'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
