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
  photoUrl?: string
}

export function ProductEditorialReviewsSection({ isArabic }: ProductEditorialReviewsSectionProps) {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'photos' | 'fit'>('all')
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({})
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({})
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [lightboxReview, setLightboxReview] = useState<ReviewItem | null>(null)

  // Write Review Form State
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
      quoteEn: "I ordered Size 54 for a formal evening gathering in Riyadh, and the quality exceeded all my expectations. The double-layered crepe falls beautifully without adding unwanted bulk. Every hidden French seam inside is immaculately finished.",
      quoteAr: "طلبت مقاس 54 لحضور مناسبة مسائية خاصة في الرياض، وكانت الجودة تفوق كل توقعاتي. طبقتان من الكريب تنسبان بنعومة بالغة دون أي ثقل إضافي. كل درزة مخفية في الداخل مشطبة بعناية فائقة.",
      sizeEn: "Size 54",
      sizeAr: "مقاس 54",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 24,
      verified: true,
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1752794673269-dc356838c5fd?auto=format&fit=crop&w=600&q=85"
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
      quoteEn: "In an era where most evening wear feels rushed and lightweight, wearing Alora is an exercise in dignity. The zari gold thread has a subtle antique patina that photographs magnificently under salon lighting.",
      quoteAr: "في زمن تبدو فيه معظم تصاميم السهرات مستعجلة، يمنحك ارتداء قطع ألورا إحساساً عميقاً بالهيبة والوقار. خيوط الزري الذهب تتميز بتعتيق كلاسيكي رائع يظهر في الصور بجمال فائق دون أي مبالغة.",
      sizeEn: "Size 56",
      sizeAr: "مقاس 56",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 19,
      verified: true,
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1767469697194-ac997d70b1ee?auto=format&fit=crop&w=600&q=85"
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
      quoteEn: "I was initially hesitant about ordering couture online for delivery to London, but the client service and presentation were impeccable. The garment arrived pressed inside a signature velvet-trimmed garment bag.",
      quoteAr: "كنت مترددة في البداية بشأن طلب قطعة كوتور عبر الإنترنت وتوصيلها إلى لندن، لكن خدمة العميلات وتغليف التقديم كانا استثنائيين. وصلت القطعة مكوية بعناية داخل حقيبة حفظ فاخرة بلمسات مخملية.",
      sizeEn: "Size 52",
      sizeAr: "مقاس 52",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 31,
      verified: true,
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=600&q=85"
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
      quoteEn: "What surprised me most is how breathable the structured gabardine feels even during warm coastal evenings in Dubai. It holds its sharp architectural lines all evening without wrinkling at the hem.",
      quoteAr: "أكثر ما أدهشني هو مدى تهوية قماش الجاباردين المنظم حتى خلال الأمسيات الدافئة في دبي. يحافظ على خطوطه المعمارية الحادة طوال الحفل دون أي تجاعيد عند الحاشية.",
      sizeEn: "Size 58",
      sizeAr: "مقاس 58",
      fitEn: "Slightly Long",
      fitAr: "انسيابي طويل",
      helpfulCount: 15,
      verified: true,
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=600&q=85"
    },
    {
      id: 'rev-pdp-5',
      authorEn: "Reem Al-Otaibi",
      authorAr: "ريم العتيبي",
      locationEn: "Jeddah, Saudi Arabia",
      locationAr: "جدة، المملكة العربية السعودية",
      dateEn: "1 month ago",
      dateAr: "منذ شهر",
      rating: 5,
      titleEn: "Stunning movement and luminous finish",
      titleAr: "حركة مذهلة ولمعان حريري ساحر",
      quoteEn: "The fabric catches the light so beautifully when walking across the room. Every detail feels thoughtfully curated, right down to the bespoke mother-of-pearl buttons. I have received countless compliments.",
      quoteAr: "القماش يلتقط الإضاءة بشكل رائع عند المشي. كل تفصيلة مدروسة بعناية فائقة، حتى أزرار عرق اللؤلؤ المصنوعة خصيصاً. تلقيت عدداً لا يحصى من الإشادات.",
      sizeEn: "Size 54",
      sizeAr: "مقاس 54",
      fitEn: "True to Size",
      fitAr: "مطابق للمقاس المعتاد",
      helpfulCount: 18,
      verified: true,
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 'rev-pdp-6',
      authorEn: "Noura Al-Subaie",
      authorAr: "نورة السبيعي",
      locationEn: "Kuwait City, Kuwait",
      locationAr: "مدينة الكويت، الكويت",
      dateEn: "1 month ago",
      dateAr: "منذ شهر",
      rating: 4,
      titleEn: "Exceptional quality, slightly generous cut",
      titleAr: "جودة استثنائية، القصّة واسعة قليلاً انسيابياً",
      quoteEn: "The craftsmanship is world-class and comparable to top Parisian ateliers. The sleeves have a slightly more relaxed drape than expected, which actually adds to the modest regal feeling.",
      quoteAr: "الحرفية عالمية المستوى وتضاهي أرقى دور الأزياء الباريسية. الأكمام ذات انسيابية أوسع قليلاً مما توقعت، وهو ما يضيف في الواقع إلى الإحساس الملكي المحتشم.",
      sizeEn: "Size 56",
      sizeAr: "مقاس 56",
      fitEn: "Relaxed Fit",
      fitAr: "قصّة مريحة وانسيابية",
      helpfulCount: 12,
      verified: true,
      hasPhoto: true,
      photoUrl: "https://images.unsplash.com/photo-1724412665971-114bd351a42d?auto=format&fit=crop&w=600&q=88"
    }
  ]

  const photoReviews = reviews.filter(r => r.hasPhoto && r.photoUrl)

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
    <section className="py-12 sm:py-16 lg:py-20 bg-cream border-b border-border2/60 relative font-sans">
      <div className="container-alora">
        
        {/* MAIN TITLE & HEADER */}
        <div className="mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight">
            {t('product.reviews.title', isArabic ? 'التقييمات والآراء' : 'Ratings and reviews')}
          </h2>
        </div>

        {/* COMPACT SUMMARY & PHOTO STRIP */}
        <div className="bg-white border border-border2 shadow-sm rounded-2xl p-5 sm:p-7 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Column: Rating Score & Star Breakdown Bars */}
            <div className="lg:col-span-5 flex items-center gap-6 sm:gap-8 border-b lg:border-b-0 lg:border-e border-border2/80 pb-6 lg:pb-0 lg:pe-8">
              {/* Score Summary */}
              <div className="flex flex-col items-start shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-espresso tracking-tight">4.9</span>
                  <div className="flex text-walnut text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
                <span className="text-[11px] text-mocha font-medium tracking-wide mt-0.5">
                  ({reviews.length} {isArabic ? 'تقييماً موثقاً' : 'reviews'})
                </span>
              </div>

              {/* Compact Star Breakdown Bars */}
              <div className="w-full space-y-1.5 flex-1 max-w-xs">
                {[
                  { stars: 5, count: 45, percent: 94 },
                  { stars: 4, count: 3, percent: 6 },
                  { stars: 3, count: 0, percent: 0 },
                  { stars: 2, count: 0, percent: 0 },
                  { stars: 1, count: 0, percent: 0 }
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-2 text-[11px] text-espresso">
                    <span className="w-5 shrink-0 font-medium flex items-center gap-0.5">
                      {row.stars} <span className="text-[9px] text-walnut">★</span>
                    </span>
                    <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden border border-border2/60">
                      <div
                        className="h-full bg-espresso rounded-full transition-all duration-700"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-5 text-end text-mocha font-medium shrink-0">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Recommendation Metric & Customer Photo Strip */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              {/* Recommendation Metric */}
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-normal text-espresso">98%</span>
                <span className="text-xs text-mocha font-medium">
                  {isArabic
                    ? 'ينصحن بصديقاتهن باقتناء هذا التصميم الفاخر'
                    : 'Would recommend this piece to a friend'}
                </span>
              </div>

              {/* Compact Customer Photo Strip */}
              <div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-mocha mb-2 font-medium">
                  <span>{isArabic ? 'صور من العميلات' : 'Customer Styling Photos'}</span>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('photos')}
                    className="text-walnut hover:text-espresso transition-colors cursor-pointer font-medium"
                  >
                    {isArabic ? 'عرض الكل' : 'View all'} →
                  </button>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {photoReviews.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightboxReview(item)}
                      className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-border2 relative cursor-pointer group shadow-2xs hover:border-walnut transition-all duration-300"
                    >
                      <img
                        src={item.photoUrl}
                        alt={isArabic ? item.authorAr : item.authorEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-espresso/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cream text-[10px]">
                        🔍
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* MINIMAL NAVIGATION TABS & WRITE REVIEW BUTTON */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border2/80">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', labelEn: `All (${reviews.length})`, labelAr: `الكل (${reviews.length})` },
              { id: 'photos', labelEn: `Photos (${photoReviews.length})`, labelAr: `مع صور (${photoReviews.length})` },
              { id: 'verified', labelEn: `Verified (${reviews.filter(r => r.verified).length})`, labelAr: `شراء موثق (${reviews.filter(r => r.verified).length})` },
              { id: 'fit', labelEn: `True to size (${reviews.filter(r => r.fitEn.includes('True') || r.fitAr.includes('مطابق')).length})`, labelAr: `المقاس المعتاد (${reviews.filter(r => r.fitEn.includes('True') || r.fitAr.includes('مطابق')).length})` }
            ].map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs transition-all duration-300 cursor-pointer font-medium ${
                    isActive
                      ? 'bg-espresso text-cream shadow-sm'
                      : 'bg-white text-espresso hover:bg-sand border border-border2 shadow-2xs'
                  }`}
                >
                  {isArabic ? tab.labelAr : tab.labelEn}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowWriteModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-espresso text-cream text-xs uppercase tracking-wider font-medium hover:bg-walnut transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>{isArabic ? 'إضافة تقييم' : 'Write a review'}</span>
            <span aria-hidden="true">+</span>
          </button>
        </div>

        {/* COMPACT REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredReviews.map((item) => {
            const currentHelpful = helpfulVotes[item.id] !== undefined ? helpfulVotes[item.id] : item.helpfulCount
            const hasVoted = Boolean(votedIds[item.id])

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white border border-border2 shadow-sm transition-all duration-300 hover:border-walnut/60 hover:shadow-md"
              >
                <div>
                  {/* Top Header: Stars, Author, Verified Badge, Date */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex text-walnut text-xs">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < item.rating ? 'text-walnut' : 'text-border2'}>★</span>
                        ))}
                      </div>
                      <span className="font-serif text-xs text-espresso font-medium">
                        {isArabic ? item.authorAr : item.authorEn}
                      </span>
                      {item.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-success font-medium">
                          <svg className="w-2.5 h-2.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>{isArabic ? 'موثق' : 'Verified'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-mocha shrink-0">
                      {isArabic ? item.dateAr : item.dateEn}
                    </span>
                  </div>

                  {/* Review Headline */}
                  <h3 className="font-serif text-sm sm:text-base text-espresso font-medium tracking-tight mb-1.5">
                    &ldquo;{isArabic ? item.titleAr : item.titleEn}&rdquo;
                  </h3>

                  {/* Review Body Quote */}
                  <p className="text-xs text-mocha leading-relaxed font-normal mb-3 line-clamp-3 hover:line-clamp-none transition-all">
                    {isArabic ? item.quoteAr : item.quoteEn}
                  </p>
                </div>

                {/* Footer: Compact Pills, Inline Photo Thumbnail, and Helpful Button */}
                <div className="flex items-center justify-between pt-3 border-t border-border2/60 gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="bg-sand px-2.5 py-0.5 rounded-md border border-border2 text-[10px] text-espresso font-medium shrink-0">
                      {isArabic ? item.sizeAr : item.sizeEn}
                    </span>
                    <span className="bg-sand px-2.5 py-0.5 rounded-md border border-border2 text-[10px] text-walnut font-medium truncate">
                      {isArabic ? item.fitAr : item.fitEn}
                    </span>
                    {item.hasPhoto && item.photoUrl && (
                      <button
                        type="button"
                        onClick={() => setLightboxReview(item)}
                        className="w-7 h-7 rounded-md overflow-hidden border border-border2 shrink-0 cursor-pointer group relative shadow-2xs"
                        title={isArabic ? 'عرض الصورة المرفقة' : 'View attached photo'}
                      >
                        <img
                          src={item.photoUrl}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </button>
                    )}
                  </div>

                  {/* Helpful Action Button */}
                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(item.id, item.helpfulCount)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer border shrink-0 ${
                      hasVoted
                        ? 'bg-walnut text-cream border-walnut font-medium shadow-2xs'
                        : 'bg-sand text-mocha hover:text-espresso border-border2 hover:border-espresso/40 shadow-2xs'
                    }`}
                  >
                    <span>{isArabic ? 'مفيد' : 'Helpful'}</span>
                    <span className="font-medium">({currentHelpful})</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* CUSTOMER PHOTO LIGHTBOX MODAL */}
        {lightboxReview && lightboxReview.photoUrl && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-md animate-fade-up">
            <div className="absolute inset-0" onClick={() => setLightboxReview(null)} />
            <div className="relative max-w-3xl w-full bg-cream rounded-2xl border border-border2/80 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[85vh]">
              <div className="md:w-1/2 bg-ink/5 flex items-center justify-center p-4 relative min-h-[250px] md:min-h-full">
                <img
                  src={lightboxReview.photoUrl}
                  alt={isArabic ? lightboxReview.authorAr : lightboxReview.authorEn}
                  className="max-h-[65vh] md:max-h-[75vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border2/50 mb-3">
                    <div className="flex text-walnut text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < lightboxReview.rating ? 'text-walnut' : 'text-border2'}>★</span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightboxReview(null)}
                      className="p-1.5 text-mocha hover:text-espresso rounded-full transition-colors cursor-pointer text-base"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="font-serif text-base text-espresso font-medium tracking-tight mb-2">
                    &ldquo;{isArabic ? lightboxReview.titleAr : lightboxReview.titleEn}&rdquo;
                  </h3>
                  <p className="text-xs text-mocha leading-relaxed font-normal mb-4">
                    {isArabic ? lightboxReview.quoteAr : lightboxReview.quoteEn}
                  </p>
                </div>
                <div className="pt-3 border-t border-border2/50 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-serif text-espresso font-medium text-xs">
                      {isArabic ? lightboxReview.authorAr : lightboxReview.authorEn}
                    </h4>
                    <p className="text-[10px] text-mocha uppercase tracking-wider mt-0.5">
                      {isArabic ? lightboxReview.locationAr : lightboxReview.locationEn}
                    </p>
                  </div>
                  <span className="text-[10px] text-mocha">
                    {isArabic ? lightboxReview.dateAr : lightboxReview.dateEn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WRITE A REVIEW MODAL */}
        {showWriteModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-espresso/75 backdrop-blur-md animate-fade-up">
            <div className="absolute inset-0" onClick={() => setShowWriteModal(false)} />
            
            <div className="relative w-full max-w-lg bg-cream rounded-2xl border border-border2 shadow-2xl p-5 sm:p-7 z-10 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-border2/50 mb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-walnut font-medium block">
                    {isArabic ? 'صالون الورا للأزياء الراقية' : 'Alora Salon Curators'}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-espresso font-medium mt-0.5">
                    {isArabic ? 'إضافة تقييم للقطعة' : 'Submit a Bespoke Review'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="p-1.5 text-mocha hover:text-espresso rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-10 text-center space-y-3 animate-fade-up">
                  <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto text-xl font-serif">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-espresso">
                    {isArabic ? 'شكراً لمشاركة تجربتك الراقية' : 'Thank You for Your Bespoke Review'}
                  </h4>
                  <p className="text-xs text-mocha max-w-xs mx-auto leading-relaxed">
                    {isArabic
                      ? 'تم إرسال تقييمك إلى فريق إدارة الجودة في صالون الورا للمراجعة والتوثيق قريباً.'
                      : 'Your evaluation has been submitted to the Alora Quality Curators and will be verified shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-start">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-espresso font-medium mb-1.5">
                      {isArabic ? 'التقييم العام' : 'Overall Rating'}
                    </label>
                    <div className="flex gap-1.5 text-xl text-walnut cursor-pointer">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-espresso font-medium mb-1">
                        {isArabic ? 'الاسم بالكامل' : 'Your Name / Title'}
                      </label>
                      <input
                        type="text"
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder={isArabic ? 'مثال: الأميرة سارة المانع' : 'e.g. Sheikha Amira K.'}
                        className="w-full bg-sand/50 border border-border2/80 rounded-xl px-3 py-2 text-xs text-espresso focus:outline-none focus:border-walnut"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-espresso font-medium mb-1">
                        {isArabic ? 'المدينة / الصالون' : 'City / Salon Location'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'الرياض، السعودية' : 'e.g. Riyadh, Saudi Arabia'}
                        className="w-full bg-sand/50 border border-border2/80 rounded-xl px-3 py-2 text-xs text-espresso focus:outline-none focus:border-walnut"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-espresso font-medium mb-1">
                      {isArabic ? 'عنوان التقييم' : 'Review Headline'}
                    </label>
                    <input
                      type="text"
                      required
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder={isArabic ? 'مثال: جودة خياطة استثنائية وانسيابية فخمة' : 'e.g. Exquisite French tailoring and fluid drape'}
                      className="w-full bg-sand/50 border border-border2/80 rounded-xl px-3 py-2 text-xs text-espresso focus:outline-none focus:border-walnut"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-espresso font-medium mb-1">
                      {isArabic ? 'تفاصيل التجربة والقطعة' : 'Bespoke Experience Details'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder={isArabic
                        ? 'شاركي تفاصيل قماش القطعة، دقة المقاس، وجودة التشطيبات الداخلية...'
                        : 'Share your impressions regarding the French seams, Nidha weight, and drape...'
                      }
                      className="w-full bg-sand/50 border border-border2/80 rounded-xl px-3 py-2 text-xs text-espresso focus:outline-none focus:border-walnut resize-none"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowWriteModal(false)}
                      className="px-4 py-2 rounded-full text-xs uppercase tracking-wider text-mocha hover:text-espresso transition-colors"
                    >
                      {isArabic ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-espresso text-cream text-xs uppercase tracking-[0.16em] font-medium hover:bg-walnut transition-all duration-300 shadow-2xs cursor-pointer"
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


