import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'
import { cn } from '../../../utils/cn'

interface ProductSizeGuidePreviewProps {
  product: ProductDress
  isArabic: boolean
}

export function ProductSizeGuidePreview({ isArabic }: ProductSizeGuidePreviewProps) {
  const { t } = useTranslation()
  const [unit, setUnit] = useState<'cm' | 'in'>('cm')

  const matrix = [
    { size: '50 (XS)', bustCm: '106', waistCm: '102', hipsCm: '116', lengthCm: '127', bustIn: '41.5', waistIn: '40', hipsIn: '45.5', lengthIn: '50' },
    { size: '52 (S)', bustCm: '112', waistCm: '108', hipsCm: '122', lengthCm: '132', bustIn: '44', waistIn: '42.5', hipsIn: '48', lengthIn: '52' },
    { size: '54 (M)', bustCm: '118', waistCm: '114', hipsCm: '128', lengthCm: '137', bustIn: '46.5', waistIn: '45', hipsIn: '50.5', lengthIn: '54' },
    { size: '56 (L)', bustCm: '124', waistCm: '120', hipsCm: '134', lengthCm: '142', bustIn: '49', waistIn: '47', hipsIn: '53', lengthIn: '56' },
    { size: '58 (XL)', bustCm: '130', waistCm: '126', hipsCm: '140', lengthCm: '147', bustIn: '51', waistIn: '49.5', hipsIn: '55', lengthIn: '58' },
    { size: '60 (XXL)', bustCm: '136', waistCm: '132', hipsCm: '146', lengthCm: '152', bustIn: '53.5', waistIn: '52', hipsIn: '57.5', lengthIn: '60' },
  ]

  const points = [
    {
      id: 'bust',
      num: '01',
      titleEn: 'Bust Circumference',
      titleAr: 'محيط الصدر (Bust)',
      descEn: 'Measure under your arms across the fullest part of your chest.',
      descAr: 'القياس تحت الذراعين عبر الجزء الأوسع من الصدر.'
    },
    {
      id: 'waist',
      num: '02',
      titleEn: 'Natural Waistline',
      titleAr: 'محيط الخصر (Waist)',
      descEn: 'Around your natural waistline, keeping the tape comfortably relaxed.',
      descAr: 'حول خط الخصر الطبيعي مع ترك مسافة مريحة للتنفس.'
    },
    {
      id: 'hips',
      num: '03',
      titleEn: 'Hips & Lower Drape',
      titleAr: 'محيط الورك (Hips)',
      descEn: 'Around the fullest part of your hips with your feet standing together.',
      descAr: 'حول الجزء الأوسع من الوركين مع وقوف القدمين متلاصقتين.'
    },
    {
      id: 'length',
      num: '04',
      titleEn: 'Vertical Garment Length',
      titleAr: 'الطول الكلي (Length)',
      descEn: 'From high shoulder point down to the floor while wearing your heels.',
      descAr: 'من أعلى نقطة بالكتف حتى الأرض أثناء ارتداء الكعب أو الحذاء المخصص.'
    }
  ]

  return (
    <section id="size-and-fit-guide" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] relative overflow-hidden border-b border-border2/60">
      <div className="container-alora relative z-10 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 items-stretch min-h-[60svh]">

          {/* Column 1 (Left): Header + Unit Switcher + Size Matrix Table */}
          <div className="lg:col-span-3 flex flex-col justify-start text-start h-full space-y-6">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3 sm:mb-4">
                {t('product.sizeCard.eyebrow', isArabic ? 'أتليه الرياض • النسب الفنية' : 'BESPOKE PROPORTIONS')}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-espresso font-normal tracking-tight leading-[1.1] mb-6">
                {t('product.sizeCard.title', isArabic ? 'دليل المقاسات الملكي' : 'The Size & Fit Guide')}
              </h2>

              {/* Unit Switcher */}
              <div className="bg-sand border border-border2 rounded-full p-0.5 inline-flex items-center text-[10px] font-medium shadow-2xs">
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={cn(
                    "px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer tracking-wider uppercase font-sans text-[10px]",
                    unit === 'cm' ? 'bg-espresso text-cream shadow-2xs font-semibold' : 'text-mocha hover:text-espresso'
                  )}
                >
                  {isArabic ? 'سنتيمتر (CM)' : 'CM'}
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('in')}
                  className={cn(
                    "px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer tracking-wider uppercase font-sans text-[10px]",
                    unit === 'in' ? 'bg-espresso text-cream shadow-2xs font-semibold' : 'text-mocha hover:text-espresso'
                  )}
                >
                  {isArabic ? 'بوصة (INCHES)' : 'INCHES'}
                </button>
              </div>
            </div>

            {/* Atelier Size Matrix Table */}
            <div className="flex-1 flex flex-col justify-center pt-4">
              <div className="border border-border2/80 rounded-2xl bg-white/95 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="bg-sand/90 px-4 py-3.5 border-b border-border2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-walnut/15 border border-walnut/30 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-walnut" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                      </svg>
                    </div>
                    <span className="font-serif text-xs uppercase tracking-widest text-espresso font-semibold">
                      {isArabic ? 'جدول أبعاد الأتليه' : 'Atelier Size Matrix'}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-medium text-mocha/70 uppercase tracking-wider">
                    {unit === 'cm' ? (isArabic ? 'القياس بالسنتيمتر' : 'IN CM') : (isArabic ? 'القياس بالبوصة' : 'IN INCHES')}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse text-xs">
                    <thead>
                      <tr className="bg-sand/40 border-b border-border2/60 uppercase tracking-wider text-[11px] text-mocha font-semibold">
                        <th className="py-2.5 px-3.5 text-start">{isArabic ? 'المقاس' : 'Size'}</th>
                        <th className="py-2.5 px-3.5 text-center">{isArabic ? 'الصدر' : 'Bust'}</th>
                        <th className="py-2.5 px-3.5 text-center">{isArabic ? 'الخصر' : 'Waist'}</th>
                        <th className="py-2.5 px-3.5 text-center">{isArabic ? 'الورك' : 'Hips'}</th>
                        <th className="py-2.5 px-3.5 text-center">{isArabic ? 'الطول' : 'Length'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border2/60 font-sans text-mocha">
                      {matrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-sand/30 transition-colors group">
                          <td className="py-3 px-3.5 text-start font-semibold text-espresso font-serif group-hover:text-walnut transition-colors whitespace-nowrap">
                            {row.size}
                          </td>
                          <td className="py-3 px-3.5 text-center whitespace-nowrap">{unit === 'cm' ? `${row.bustCm}` : `${row.bustIn}"`}</td>
                          <td className="py-3 px-3.5 text-center whitespace-nowrap">{unit === 'cm' ? `${row.waistCm}` : `${row.waistIn}"`}</td>
                          <td className="py-3 px-3.5 text-center whitespace-nowrap">{unit === 'cm' ? `${row.hipsCm}` : `${row.hipsIn}"`}</td>
                          <td className="py-3 px-3.5 text-center font-bold text-espresso whitespace-nowrap">{unit === 'cm' ? `${row.lengthCm}` : `${row.lengthIn}"`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2 (Middle): Reference Illustration */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-2 h-full min-h-[400px]">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/new%20png.png`}
                alt={isArabic ? 'صورة دليل المقاسات' : 'Size and Fit Guide Illustration'}
                className="w-full h-full max-h-[75svh] object-contain mix-blend-multiply drop-shadow-sm"
              />
            </div>
          </div>

          {/* Column 3 (Right): Clean Text List Layout */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full">
            <div className="flex flex-col">
              {points.map((pt, idx) => (
                <div
                  key={pt.id}
                  className={cn(
                    "py-6 flex flex-col justify-center",
                    idx !== points.length - 1 ? "border-b border-border2/60" : ""
                  )}
                >
                  <div className="flex items-start gap-5 sm:gap-6">
                    <span className="font-serif text-xl sm:text-2xl text-walnut font-medium mt-0.5">
                      {pt.num}
                    </span>
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl text-espresso font-normal tracking-tight mb-2">
                        {isArabic ? pt.titleAr : pt.titleEn}
                      </h4>
                      <p className="text-sm sm:text-[15px] text-mocha leading-relaxed font-sans max-w-[280px]">
                        {isArabic ? pt.descAr : pt.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
