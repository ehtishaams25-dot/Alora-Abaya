import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'

interface ProductSizeGuidePreviewProps {
  product: ProductDress
  isArabic: boolean
}

export function ProductSizeGuidePreview({ isArabic }: ProductSizeGuidePreviewProps) {
  const { t } = useTranslation()
  const [showToast, setShowToast] = useState(false)

  const handleOpenSizeGuide = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 4500)
  }

  return (
    <section className="min-h-[85svh] flex items-center py-24 sm:py-32 lg:py-40 bg-cream border-b border-border2/60 relative overflow-hidden">
      <div className="container-layali w-full">
        <div className="max-w-5xl mx-auto">
          {/* Beautiful Premium Destination Card */}
          <div className="relative rounded-3xl bg-sand/85 border border-border2/80 p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-12 lg:gap-20 group">
            {/* Soft background glow */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-walnut/15 rounded-full blur-3xl pointer-events-none" />
            
            {/* Left Side: Elegant Illustration Placeholder */}
            <div className="w-full md:w-5/12 flex justify-center shrink-0">
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-3xl bg-cream border border-border2/90 shadow-lg p-6 sm:p-8 flex flex-col items-center justify-between relative group-hover:border-walnut transition-all duration-500">
                {/* Measuring Lines & Tailoring Silhouette SVG Placeholder */}
                <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-mocha/80 border-b border-border2/60 pb-2">
                  <span>{isArabic ? 'الأتليه' : 'ATELIER'}</span>
                  <span>{isArabic ? 'القياس' : 'FIT'}</span>
                </div>

                <div className="relative my-auto flex items-center justify-center w-full">
                  {/* Stylized Dress Drape Outline */}
                  <svg className="w-28 h-44 stroke-espresso/85 fill-none" strokeWidth="1.2" viewBox="0 0 100 140">
                    {/* Hanger / Neckline */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M35 20 C50 30, 50 30, 65 20" />
                    {/* Shoulders & Sleeves */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M35 20 L15 50 L25 55 L38 35" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M65 20 L85 50 L75 55 L62 35" />
                    {/* Torso & Flowing Hem */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M38 35 Q36 70, 25 125 L75 125 Q64 70, 62 35" />
                    {/* Center French Seam Line */}
                    <line x1="50" y1="26" x2="50" y2="125" strokeDasharray="3 3" className="stroke-walnut/70" />
                    {/* Horizontal Bust Measurement Line with Arrows */}
                    <line x1="32" y1="52" x2="68" y2="52" className="stroke-walnut" strokeWidth="1" />
                    <circle cx="32" cy="52" r="1.5" className="fill-walnut" />
                    <circle cx="68" cy="52" r="1.5" className="fill-walnut" />
                    {/* Vertical Length Measurement Line */}
                    <line x1="82" y1="20" x2="82" y2="125" className="stroke-taupe/70" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  
                  {/* Subtle Floating Tag */}
                  <span className="absolute -bottom-2 bg-espresso text-cream text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full font-medium shadow-md">
                    {isArabic ? 'أبعاد دقيقة' : 'Bespoke Fit'}
                  </span>
                </div>

                <div className="w-full text-center text-[10px] text-mocha/85 pt-2 border-t border-border2/60 tracking-wider uppercase font-sans">
                  {isArabic ? 'الطول والعرض والانسيابية' : 'LENGTH • BUST • SLEEVE'}
                </div>
              </div>
            </div>

            {/* Right Side: Short Measuring Description & Clear CTA */}
            <div className="w-full md:w-7/12 flex flex-col items-start text-start">
              <span className="text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3 sm:mb-4">
                {t('product.sizeCard.eyebrow', isArabic ? 'تناسق المقاسات والأبعاد' : 'Bespoke Proportions')}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-[1.25] mb-5 sm:mb-6">
                {t('product.sizeCard.title', isArabic ? 'دليل القياس والقصّات الملكية' : 'The Size & Fit Guide')}
              </h3>

              <p className="text-sm sm:text-base text-mocha leading-relaxed font-sans mb-8 sm:mb-10">
                {t('product.sizeCard.description', isArabic
                  ? 'تتميز قصاتنا باتساع انسيابي مدروس ليناسب مختلف الأطوال والقامات بأناقة متناهية. سواء كنتِ تفضلين الانسدال الطويل الملامس للأرض أو الطول المناسب للكعب العالي، فإن جدول أبعادنا يساعدك على الاختيار المثالي.'
                  : 'Our silhouettes are tailored with generous, flowing ease designed to flatter varied heights and forms. Whether you prefer a tailored floor-length drape or subtle elevation for heels, our measurement matrix guides your choice.')}
              </p>

              {/* Clear CTA Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
                <button
                  type="button"
                  onClick={handleOpenSizeGuide}
                  className="bg-espresso hover:bg-ink text-cream py-4 px-10 rounded-full text-xs sm:text-sm uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-3.5 cursor-pointer group/btn"
                >
                  <span>{t('product.sizeCard.cta', isArabic ? 'عرض دليل القياسات' : 'View Size Guide')}</span>
                  <svg
                    className="w-4 h-4 stroke-current fill-none rtl:rotate-180 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                {showToast && (
                  <span className="text-xs sm:text-sm text-walnut font-medium animate-fade-in bg-cream/95 px-5 py-2.5 rounded-xl border border-border2 shadow-xs">
                    {t('product.sizeCard.toast', isArabic ? 'سيتم فتح جدول مقاسات الأتليه التفاعلي هنا قريباً.' : 'The interactive atelier size guide table will open here shortly.')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
