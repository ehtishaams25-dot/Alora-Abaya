import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'
import { cn } from '../../../utils/cn'

interface ProductSizeGuidePreviewProps {
  product: ProductDress
  isArabic: boolean
}

type MeasurePoint = 'bust' | 'waist' | 'hips' | 'length' | 'all'

export function ProductSizeGuidePreview({ isArabic }: ProductSizeGuidePreviewProps) {
  const { t } = useTranslation()
  const [unit, setUnit] = useState<'cm' | 'in'>('cm')
  const [activePoint, setActivePoint] = useState<MeasurePoint>('all')

  const matrix = [
    { size: '50 (XS)', bustCm: '106', waistCm: '102', hipsCm: '116', lengthCm: '127', bustIn: '41.5', waistIn: '40', hipsIn: '45.5', lengthIn: '50' },
    { size: '52 (S)', bustCm: '112', waistCm: '108', hipsCm: '122', lengthCm: '132', bustIn: '44', waistIn: '42.5', hipsIn: '48', lengthIn: '52' },
    { size: '54 (M)', bustCm: '118', waistCm: '114', hipsCm: '128', lengthCm: '137', bustIn: '46.5', waistIn: '45', hipsIn: '50.5', lengthIn: '54' },
    { size: '56 (L)', bustCm: '124', waistCm: '120', hipsCm: '134', lengthCm: '142', bustIn: '49', waistIn: '47', hipsIn: '53', lengthIn: '56' },
    { size: '58 (XL)', bustCm: '130', waistCm: '126', hipsCm: '140', lengthCm: '147', bustIn: '51', waistIn: '49.5', hipsIn: '55', lengthIn: '58' },
    { size: '60 (XXL)', bustCm: '136', waistCm: '132', hipsCm: '146', lengthCm: '152', bustIn: '53.5', waistIn: '52', hipsIn: '57.5', lengthIn: '60' },
  ]

  const points: { id: MeasurePoint; num: string; titleEn: string; titleAr: string; descEn: string; descAr: string }[] = [
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
        
        {/* ========================================================================= */}
        {/* SIDE-BY-SIDE-BY-SIDE: FULL VERTICAL STRETCH (`items-stretch min-h-[580px]`) */}
        {/* Column 1: Header + Unit Switcher + Open Atelier Size Matrix Table        */}
        {/* Column 2: Majestic Tall Silhouette Illustration (`h-[540px]`)            */}
        {/* Column 3: 4 Measurement Guidance Specifications Stretched Top-to-Bottom  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch min-h-[60svh]">
          
          {/* Column 1 (Left): Header + Unit Switcher + Stretched Size Matrix Table */}
          <div className="lg:col-span-4 flex flex-col justify-between text-start h-full space-y-6">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3 sm:mb-4">
                {t('product.sizeCard.eyebrow', isArabic ? 'أتليه الرياض • النسب الفنية' : 'BESPOKE PROPORTIONS')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-[1.2] mb-5">
                {t('product.sizeCard.title', isArabic ? 'دليل المقاسات الملكي' : 'The Size & Fit Guide')}
              </h2>

              {/* Unit Switcher */}
              <div className="bg-sand border border-border2 rounded-full p-1 inline-flex items-center text-xs font-medium shadow-2xs">
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all duration-300 cursor-pointer tracking-wider uppercase font-sans text-xs",
                    unit === 'cm' ? 'bg-espresso text-cream shadow-2xs font-semibold' : 'text-mocha hover:text-espresso'
                  )}
                >
                  {isArabic ? 'سنتيمتر (CM)' : 'CM'}
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('in')}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all duration-300 cursor-pointer tracking-wider uppercase font-sans text-xs",
                    unit === 'in' ? 'bg-espresso text-cream shadow-2xs font-semibold' : 'text-mocha hover:text-espresso'
                  )}
                >
                  {isArabic ? 'بوصة (INCHES)' : 'INCHES'}
                </button>
              </div>
            </div>

            {/* Atelier Size Matrix Table (Open, Permanent & Proportioned to fill remaining vertical height!) */}
            <div className="flex-1 flex flex-col justify-end pt-4">
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
                        <th className="py-2.5 px-3.5">{isArabic ? 'المقاس' : 'Size'}</th>
                        <th className="py-2.5 px-3.5">{isArabic ? 'الصدر' : 'Bust'}</th>
                        <th className="py-2.5 px-3.5">{isArabic ? 'الخصر' : 'Waist'}</th>
                        <th className="py-2.5 px-3.5">{isArabic ? 'الورك' : 'Hips'}</th>
                        <th className="py-2.5 px-3.5">{isArabic ? 'الطول' : 'Length'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border2/60 font-sans text-mocha">
                      {matrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-sand/30 transition-colors group">
                          <td className="py-3 px-3.5 font-semibold text-espresso font-serif group-hover:text-walnut transition-colors whitespace-nowrap">
                            {row.size}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">{unit === 'cm' ? `${row.bustCm}` : `${row.bustIn}"`}</td>
                          <td className="py-3 px-3.5 whitespace-nowrap">{unit === 'cm' ? `${row.waistCm}` : `${row.waistIn}"`}</td>
                          <td className="py-3 px-3.5 whitespace-nowrap">{unit === 'cm' ? `${row.hipsCm}` : `${row.hipsIn}"`}</td>
                          <td className="py-3 px-3.5 font-bold text-espresso whitespace-nowrap">{unit === 'cm' ? `${row.lengthCm}` : `${row.lengthIn}"`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2 (Middle): Tall, Majestic Silhouette Blueprint commanding full height */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-2 h-full">
            <div className="relative flex items-center justify-center w-full h-full min-h-[50svh]">
              <svg className="w-80 sm:w-96 max-h-[60svh] transition-all duration-500 select-none drop-shadow-md" viewBox="0 0 360 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Luxury Silk & Satin Multi-Stop Drape Gradient */}
                  <linearGradient id="abayaGradLuxury" x1="180" y1="35" x2="180" y2="400" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0.98" />
                    <stop offset="35%" stopColor="#F0EBE0" stopOpacity="0.92" />
                    <stop offset="70%" stopColor="#E3DCD0" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#D5CCBD" stopOpacity="0.96" />
                  </linearGradient>
                  
                  {/* Subtle Shimmer Highlight for Center Placket & Fold Crests */}
                  <linearGradient id="silkHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Atelier Gold Shimmer for Hanger & Accents */}
                  <linearGradient id="goldHangerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#F3E5AB" />
                    <stop offset="100%" stopColor="#AA7C11" />
                  </linearGradient>

                  <filter id="goldGlowLuxury" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  
                  <filter id="badgeShadowLuxury" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#2A2421" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* ========================================================= */}
                {/* 1. ATELIER GOLD BOUTIQUE HANGER                           */}
                {/* ========================================================= */}
                <circle cx="180" cy="24" r="5.5" stroke="url(#goldHangerGrad)" strokeWidth="1.6" fill="none" />
                <path d="M 180 29.5 L 180 44" stroke="url(#goldHangerGrad)" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M 142 48 C 160 43, 200 43, 218 48" stroke="url(#goldHangerGrad)" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="142" cy="48" r="2" fill="#AA7C11" />
                <circle cx="218" cy="48" r="2" fill="#AA7C11" />

                {/* ========================================================= */}
                {/* 2. THE HAUTE COUTURE ABAYA / DRESS SILHOUETTE           */}
                {/* Graceful sloped shoulders, sweeping Bisht/Kimono sleeves, */}
                {/* tailored waist curvature, and majestic undulating hem     */}
                {/* ========================================================= */}
                <path
                  d="M 180 44
                     C 162 44, 144 48, 122 58
                     C 96 70, 72 94, 56 130
                     C 52 140, 66 148, 82 152
                     C 96 156, 110 142, 118 120
                     C 122 150, 126 190, 118 252
                     C 108 314, 94 360, 78 392
                     C 108 402, 144 390, 180 398
                     C 216 390, 252 402, 282 392
                     C 266 360, 252 314, 242 252
                     C 234 190, 238 150, 242 120
                     C 250 142, 264 156, 278 152
                     C 294 148, 308 140, 304 130
                     C 288 94, 264 70, 238 58
                     C 216 48, 198 44, 180 44 Z"
                  fill="url(#abayaGradLuxury)"
                  stroke="#2A2421"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                {/* Silk Shimmer Overlay across Bodice & Skirt */}
                <path
                  d="M 148 56 C 148 180, 154 300, 146 394 C 168 398, 192 398, 214 394 C 206 300, 212 180, 212 56 Z"
                  fill="url(#silkHighlight)"
                  opacity="0.6"
                />

                {/* Neckline & Collar Stitch Detail */}
                <path d="M 162 45 C 172 56, 188 56, 198 45" stroke="#2A2421" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 166 48 C 174 55, 186 55, 194 48" stroke="#C4A47C" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />

                {/* ========================================================= */}
                {/* 3. INTERNAL SILK DRAPE PLEATS & FOLD CONTOURS           */}
                {/* Gives realistic 3D fabric volume from waist to sweep hem  */}
                {/* ========================================================= */}
                {/* Center Placket Seam */}
                <line x1="180" y1="54" x2="180" y2="397" stroke="#8A7D70" strokeWidth="1" strokeDasharray="3 4" opacity="0.45" />
                
                {/* Left & Right Flowing Skirt Pleats */}
                <path d="M 152 230 Q 146 310 128 395" stroke="#8A7D70" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none" />
                <path d="M 208 230 Q 214 310 232 395" stroke="#8A7D70" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none" />
                <path d="M 166 280 Q 162 340 156 396" stroke="#A89880" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" fill="none" />
                <path d="M 194 280 Q 198 340 204 396" stroke="#A89880" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" fill="none" />

                {/* Sleeve Drape Crease Lines */}
                <path d="M 122 58 Q 106 88 94 136" stroke="#8A7D70" strokeWidth="1" opacity="0.3" fill="none" />
                <path d="M 238 58 Q 254 88 266 136" stroke="#8A7D70" strokeWidth="1" opacity="0.3" fill="none" />

                {/* ========================================================= */}
                {/* 4. PRECISION DIAMOND MEASURING GUIDES & BADGES            */}
                {/* ========================================================= */}

                {/* 01. BUST CIRCUMFERENCE */}
                <g
                  onMouseEnter={() => setActivePoint('bust')}
                  onMouseLeave={() => setActivePoint('all')}
                  onClick={() => setActivePoint(activePoint === 'bust' ? 'all' : 'bust')}
                  className={cn("transition-all duration-300 cursor-pointer", activePoint === 'bust' || activePoint === 'all' ? "opacity-100" : "opacity-35")}
                >
                  <line x1="118" y1="126" x2="242" y2="126" stroke="#A8845E" strokeWidth={activePoint === 'bust' ? "2.6" : "1.5"} strokeDasharray={activePoint === 'bust' ? "none" : "3 3"} />
                  <polygon points="118,126 114,122 118,118 122,122" fill="#A8845E" filter={activePoint === 'bust' ? "url(#goldGlowLuxury)" : undefined} />
                  <polygon points="242,126 238,122 242,118 246,122" fill="#A8845E" filter={activePoint === 'bust' ? "url(#goldGlowLuxury)" : undefined} />
                  <g transform="translate(180, 126)" filter="url(#badgeShadowLuxury)">
                    <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#FFFFFF" stroke="#C4A47C" strokeWidth="1.4" />
                    <text x="0" y="4.5" textAnchor="middle" fill="#2A2421" fontSize="11" fontWeight="700" letterSpacing="0.8">{isArabic ? '١. الصدر' : '01. BUST'}</text>
                  </g>
                </g>

                {/* 02. NATURAL WAISTLINE */}
                <g
                  onMouseEnter={() => setActivePoint('waist')}
                  onMouseLeave={() => setActivePoint('all')}
                  onClick={() => setActivePoint(activePoint === 'waist' ? 'all' : 'waist')}
                  className={cn("transition-all duration-300 cursor-pointer", activePoint === 'waist' || activePoint === 'all' ? "opacity-100" : "opacity-35")}
                >
                  <line x1="124" y1="192" x2="236" y2="192" stroke="#A8845E" strokeWidth={activePoint === 'waist' ? "2.6" : "1.5"} strokeDasharray={activePoint === 'waist' ? "none" : "3 3"} />
                  <polygon points="124,192 120,188 124,184 128,188" fill="#A8845E" filter={activePoint === 'waist' ? "url(#goldGlowLuxury)" : undefined} />
                  <polygon points="236,192 232,188 236,184 240,188" fill="#A8845E" filter={activePoint === 'waist' ? "url(#goldGlowLuxury)" : undefined} />
                  <g transform="translate(180, 192)" filter="url(#badgeShadowLuxury)">
                    <rect x="-44" y="-12" width="88" height="24" rx="12" fill="#FFFFFF" stroke="#C4A47C" strokeWidth="1.4" />
                    <text x="0" y="4.5" textAnchor="middle" fill="#2A2421" fontSize="11" fontWeight="700" letterSpacing="0.8">{isArabic ? '٢. الخصر' : '02. WAIST'}</text>
                  </g>
                </g>

                {/* 03. HIPS & LOWER DRAPE */}
                <g
                  onMouseEnter={() => setActivePoint('hips')}
                  onMouseLeave={() => setActivePoint('all')}
                  onClick={() => setActivePoint(activePoint === 'hips' ? 'all' : 'hips')}
                  className={cn("transition-all duration-300 cursor-pointer", activePoint === 'hips' || activePoint === 'all' ? "opacity-100" : "opacity-35")}
                >
                  <line x1="118" y1="258" x2="242" y2="258" stroke="#A8845E" strokeWidth={activePoint === 'hips' ? "2.6" : "1.5"} strokeDasharray={activePoint === 'hips' ? "none" : "3 3"} />
                  <polygon points="118,258 114,254 118,250 122,254" fill="#A8845E" filter={activePoint === 'hips' ? "url(#goldGlowLuxury)" : undefined} />
                  <polygon points="242,258 238,254 242,250 246,254" fill="#A8845E" filter={activePoint === 'hips' ? "url(#goldGlowLuxury)" : undefined} />
                  <g transform="translate(180, 258)" filter="url(#badgeShadowLuxury)">
                    <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#FFFFFF" stroke="#C4A47C" strokeWidth="1.4" />
                    <text x="0" y="4.5" textAnchor="middle" fill="#2A2421" fontSize="11" fontWeight="700" letterSpacing="0.8">{isArabic ? '٣. الورك' : '03. HIPS'}</text>
                  </g>
                </g>

                {/* 04. VERTICAL GARMENT LENGTH */}
                <g
                  onMouseEnter={() => setActivePoint('length')}
                  onMouseLeave={() => setActivePoint('all')}
                  onClick={() => setActivePoint(activePoint === 'length' ? 'all' : 'length')}
                  className={cn("transition-all duration-300 cursor-pointer", activePoint === 'length' || activePoint === 'all' ? "opacity-100" : "opacity-35")}
                >
                  <line x1="244" y1="58" x2="320" y2="58" stroke="#A8845E" strokeWidth="1" strokeDasharray="2 2" opacity="0.75" />
                  <line x1="282" y1="392" x2="320" y2="392" stroke="#A8845E" strokeWidth="1" strokeDasharray="2 2" opacity="0.75" />
                  <line x1="310" y1="58" x2="310" y2="392" stroke="#A8845E" strokeWidth={activePoint === 'length' ? "2.6" : "1.6"} />
                  <polyline points="305,66 310,58 315,66" stroke="#A8845E" strokeWidth={activePoint === 'length' ? "2.2" : "1.6"} fill="none" />
                  <polyline points="305,384 310,392 315,384" stroke="#A8845E" strokeWidth={activePoint === 'length' ? "2.2" : "1.6"} fill="none" />
                  <circle cx="310" cy="58" r={activePoint === 'length' ? "4.5" : "3"} fill="#A8845E" filter={activePoint === 'length' ? "url(#goldGlowLuxury)" : undefined} />
                  <circle cx="310" cy="392" r={activePoint === 'length' ? "4.5" : "3"} fill="#A8845E" filter={activePoint === 'length' ? "url(#goldGlowLuxury)" : undefined} />
                  <g transform="translate(310, 225)" filter="url(#badgeShadowLuxury)">
                    <rect x="-46" y="-12" width="92" height="24" rx="12" fill="#FFFFFF" stroke="#C4A47C" strokeWidth="1.4" />
                    <text x="0" y="4.5" textAnchor="middle" fill="#2A2421" fontSize="11" fontWeight="700" letterSpacing="0.8">{isArabic ? '٤. الطول الكلي' : '04. LENGTH'}</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* Column 3 (Right): 4 Measurement Guidance Specifications Distributed Vertically Across Full Height */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
            {points.map((pt) => {
              const isActive = activePoint === pt.id
              return (
                <div
                  key={pt.id}
                  onMouseEnter={() => setActivePoint(pt.id)}
                  onMouseLeave={() => setActivePoint('all')}
                  onClick={() => setActivePoint(pt.id === activePoint ? 'all' : pt.id)}
                  className={cn(
                    "flex-1 py-4 px-5 sm:px-6 transition-all duration-300 cursor-pointer flex flex-col justify-center rounded-2xl border group",
                    isActive
                      ? "bg-sand/90 border-walnut/40 shadow-sm translate-x-1"
                      : "bg-white/40 hover:bg-sand/50 border-border2/60"
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "font-serif text-xs font-semibold tracking-wider transition-colors px-2 py-0.5 rounded-full bg-cream/80 border border-border2",
                        isActive ? "text-walnut font-bold bg-cream border-walnut/40" : "text-mocha/70 group-hover:text-espresso"
                      )}>
                        {pt.num}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl text-espresso font-normal tracking-tight">
                        {isArabic ? pt.titleAr : pt.titleEn}
                      </h4>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-walnut animate-ping shrink-0" />
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-mocha leading-relaxed font-sans ps-9">
                    {isArabic ? pt.descAr : pt.descEn}
                  </p>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
