import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'

interface ProductSizeGuideModalProps {
  product: ProductDress | null
  onClose: () => void
}

export function ProductSizeGuideModal({ product, onClose }: ProductSizeGuideModalProps) {
  const { i18n } = useTranslation()
  const [unit, setUnit] = useState<'cm' | 'in'>('cm')
  const isArabic = i18n.language.startsWith('ar')

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [product, onClose])

  if (!product) return null

  // Conversion rates and matrix data
  const matrix = [
    { size: 'Size 50 (XS)', bustCm: '106', waistCm: '102', hipsCm: '116', lengthCm: '127', bustIn: '41.5', waistIn: '40', hipsIn: '45.5', lengthIn: '50' },
    { size: 'Size 52 (S)', bustCm: '112', waistCm: '108', hipsCm: '122', lengthCm: '132', bustIn: '44', waistIn: '42.5', hipsIn: '48', lengthIn: '52' },
    { size: 'Size 54 (M)', bustCm: '118', waistCm: '114', hipsCm: '128', lengthCm: '137', bustIn: '46.5', waistIn: '45', hipsIn: '50.5', lengthIn: '54' },
    { size: 'Size 56 (L)', bustCm: '124', waistCm: '120', hipsCm: '134', lengthCm: '142', bustIn: '49', waistIn: '47', hipsIn: '53', lengthIn: '56' },
    { size: 'Size 58 (XL)', bustCm: '130', waistCm: '126', hipsCm: '140', lengthCm: '147', bustIn: '51', waistIn: '49.5', hipsIn: '55', lengthIn: '58' },
    { size: 'Size 60 (XXL)', bustCm: '136', waistCm: '132', hipsCm: '146', lengthCm: '152', bustIn: '53.5', waistIn: '52', hipsIn: '57.5', lengthIn: '60' },
  ]

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-ink/70 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-sand border border-border2/90 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative animate-scale-in">
        
        {/* Luxury Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-border2/80 bg-cream/60 shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block mb-1">
              {isArabic ? 'أتليه الرياض • القياسات' : 'ATELIER RIYADH • BESPOKE MEASUREMENTS'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-espresso font-normal tracking-tight">
              {isArabic ? 'دليل المقاسات الملكي' : 'Professional Size & Fit Guide'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* CM / IN Switcher */}
            <div className="bg-sand border border-border2 rounded-full p-1 flex items-center text-xs font-medium">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  unit === 'cm' ? 'bg-espresso text-cream shadow-xs' : 'text-mocha hover:text-espresso'
                }`}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  unit === 'in' ? 'bg-espresso text-cream shadow-xs' : 'text-mocha hover:text-espresso'
                }`}
              >
                INCHES
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-border2 bg-cream text-espresso hover:bg-sand hover:border-walnut transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto no-scrollbar flex-1 space-y-10">
          
          {/* Section 1: How To Measure (Illustrated Female Silhouette) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-cream/70 rounded-3xl p-6 sm:p-8 border border-border2/70">
            {/* Left/Center: Elegant Minimal Line Drawing Silhouette */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-52 h-72 rounded-2xl bg-sand border border-border2 shadow-sm p-4 flex flex-col items-center justify-between relative group">
                <span className="text-[10px] uppercase tracking-widest text-taupe font-medium">
                  {isArabic ? 'كيفية القياس' : 'HOW TO MEASURE'}
                </span>

                {/* Minimal Luxury Line Drawing of Female Silhouette & Abaya Proportions */}
                <svg className="w-32 h-52 stroke-espresso/85 fill-none my-auto" strokeWidth="1.1" viewBox="0 0 120 180">
                  {/* Elegant Neckline & Shoulders */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M45 25 Q60 38, 75 25" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M45 25 L20 60 L32 66 L48 42" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M75 25 L100 60 L88 66 L72 42" />
                  
                  {/* Torso, Waist & Flowing Hem */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M48 42 Q46 80, 32 160 L88 160 Q74 80, 72 42" />
                  
                  {/* Bust Line Indicator */}
                  <line x1="38" y1="58" x2="82" y2="58" className="stroke-walnut" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="38" cy="58" r="2" className="fill-walnut" />
                  <circle cx="82" cy="58" r="2" className="fill-walnut" />
                  <text x="60" y="55" textAnchor="middle" className="fill-walnut text-[7px] font-sans font-medium">1. BUST</text>

                  {/* Waist Line Indicator */}
                  <line x1="42" y1="88" x2="78" y2="88" className="stroke-walnut" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="42" cy="88" r="2" className="fill-walnut" />
                  <circle cx="78" cy="88" r="2" className="fill-walnut" />
                  <text x="60" y="85" textAnchor="middle" className="fill-walnut text-[7px] font-sans font-medium">2. WAIST</text>

                  {/* Hips Line Indicator */}
                  <line x1="37" y1="118" x2="83" y2="118" className="stroke-walnut" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="37" cy="118" r="2" className="fill-walnut" />
                  <circle cx="83" cy="118" r="2" className="fill-walnut" />
                  <text x="60" y="115" textAnchor="middle" className="fill-walnut text-[7px] font-sans font-medium">3. HIPS</text>

                  {/* Vertical Length Line Indicator */}
                  <line x1="102" y1="25" x2="102" y2="160" className="stroke-espresso" strokeWidth="1" />
                  <polyline points="99,28 102,25 105,28" className="stroke-espresso" />
                  <polyline points="99,157 102,160 105,157" className="stroke-espresso" />
                  <text x="108" y="95" className="fill-espresso text-[7px] font-sans font-medium" transform="rotate(90,108,95)">4. LENGTH</text>
                </svg>

                <span className="text-[9px] uppercase tracking-widest text-mocha">
                  {isArabic ? 'أبعاد دقيقة ومدروسة' : 'Bespoke Atelier Fit'}
                </span>
              </div>
            </div>

            {/* Right: Step-by-step measurement descriptions */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-serif text-lg sm:text-xl text-espresso">
                {isArabic ? 'إرشادات أخذ القياسات بدقة' : 'Measurement Guide'}
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-mocha leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-espresso text-cream flex items-center justify-center text-[10px] shrink-0 font-medium mt-0.5">1</span>
                  <div>
                    <strong className="text-espresso block font-medium uppercase tracking-wider text-xs">
                      {isArabic ? 'محيط الصدر (Bust)' : 'Bust'}
                    </strong>
                    <span>{isArabic ? 'قم بقياس الجزء الأوسع من الصدر مع الحفاظ على شريط القياس أفقياً وموازياً للأرض.' : 'Measure under your arms across the fullest part of your bust, keeping the measuring tape level.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-espresso text-cream flex items-center justify-center text-[10px] shrink-0 font-medium mt-0.5">2</span>
                  <div>
                    <strong className="text-espresso block font-medium uppercase tracking-wider text-xs">
                      {isArabic ? 'محيط الخصر (Waist)' : 'Waist'}
                    </strong>
                    <span>{isArabic ? 'قم بقياس الجزء الأضيق من الخصر الطبيعي، مع ترك متسع مريح للتنفس والحركة.' : 'Measure around your natural waistline, allowing a comfortable one-finger breathing ease.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-espresso text-cream flex items-center justify-center text-[10px] shrink-0 font-medium mt-0.5">3</span>
                  <div>
                    <strong className="text-espresso block font-medium uppercase tracking-wider text-xs">
                      {isArabic ? 'محيط الورك (Hips)' : 'Hips'}
                    </strong>
                    <span>{isArabic ? 'قم بقياس الجزء الأوسع من منطقة الورك مع الوقوف باستقامة والقدمين متلاصقتين.' : 'With feet together, measure around the fullest part of your hips and lower drape.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-espresso text-cream flex items-center justify-center text-[10px] shrink-0 font-medium mt-0.5">4</span>
                  <div>
                    <strong className="text-espresso block font-medium uppercase tracking-wider text-xs">
                      {isArabic ? 'الطول الكلي (Length)' : 'Length'}
                    </strong>
                    <span>{isArabic ? 'من أعلى نقطة في الكتف وحتى الطول المطلوب عند الكعب أو ملامسة الأرض.' : 'Measure vertically from the highest point of your shoulder down to your preferred floor drape.'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Size Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg sm:text-xl text-espresso">
                {isArabic ? 'جدول المقاسات' : 'Atelier Size Table'}
              </h3>
              <span className="text-xs text-mocha font-medium">
                {isArabic ? `القياس معروض بوحدة: ${unit === 'cm' ? 'السنتيمتر (CM)' : 'الإنش (INCHES)'}` : `Showing units in: ${unit.toUpperCase()}`}
              </span>
            </div>

            <div className="overflow-x-auto border border-border2 rounded-2xl bg-cream/30">
              <table className="w-full text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="bg-sand border-b border-border2 text-[11px] uppercase tracking-widest text-espresso font-medium">
                    <th className="py-3.5 px-5">{isArabic ? 'المقاس' : 'Size'}</th>
                    <th className="py-3.5 px-5">{isArabic ? 'الصدر (Bust)' : 'Bust'}</th>
                    <th className="py-3.5 px-5">{isArabic ? 'الخصر (Waist)' : 'Waist'}</th>
                    <th className="py-3.5 px-5">{isArabic ? 'الورك (Hips)' : 'Hips'}</th>
                    <th className="py-3.5 px-5">{isArabic ? 'الطول (Length)' : 'Length'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border2 text-xs sm:text-sm text-mocha font-sans">
                  {matrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-cream/80 transition-colors">
                      <td className="py-4 px-5 font-semibold text-espresso font-serif">{row.size}</td>
                      <td className="py-4 px-5">{unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn}"`}</td>
                      <td className="py-4 px-5">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn}"`}</td>
                      <td className="py-4 px-5">{unit === 'cm' ? `${row.hipsCm} cm` : `${row.hipsIn}"`}</td>
                      <td className="py-4 px-5">{unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn}"`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Fit Notes */}
          <div className="bg-sand border border-walnut/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-base text-espresso mb-1">
                {isArabic ? 'ملاحظات القصّة والانسيابية الملكية' : 'Fit Notes'}
              </h4>
              <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                {isArabic
                  ? 'صُممت قطعنا بانسيابية مريحة تمنحك حضوراً فاخراً. إذا كنتِ تفضلين قصة أكثر تحديداً على الكتفين والخصر، نوصي باختيار مقاس أصغر بدرجة واحدة.'
                  : 'Designed for a relaxed luxury silhouette with generous, flowing ease. If you prefer a more tailored fit across the shoulders and waist, choose one size smaller.'}
              </p>
            </div>
          </div>

          {/* Section 4: Stylist Concierge CTA (Commented out per user note ready for activation whenever requested) */}
          {/*
          <div className="border-t border-border2 pt-6 text-center">
            <span className="text-xs text-mocha block mb-2">Need help with custom measurements?</span>
            <button
              type="button"
              onClick={() => alert('Opening private WhatsApp VIP Stylist chat...')}
              className="bg-espresso text-cream px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-ink transition-colors cursor-pointer"
            >
              Contact Our Stylist
            </button>
          </div>
          */}

        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-sand border-t border-border2/80 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer"
          >
            {isArabic ? 'إغلاق الدليل' : 'Close Guide'}
          </button>
        </div>

      </div>
    </div>
  )
}
