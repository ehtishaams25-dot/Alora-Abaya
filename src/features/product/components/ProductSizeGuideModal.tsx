import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'
import { cn } from '../../../utils/cn'

interface ProductSizeGuideModalProps {
  product: ProductDress | null
  onClose: () => void
}

type ModalTab = 'measure' | 'matrix' | 'ease'
type MeasureStep = 'all' | 'bust' | 'waist' | 'hips' | 'length'
type HeightRange = 'under160' | '160to168' | '169plus'
type DrapePref = 'floor' | 'ankle'

export function ProductSizeGuideModal({ product, onClose }: ProductSizeGuideModalProps) {
  const { i18n } = useTranslation()
  const [unit, setUnit] = useState<'cm' | 'in'>('cm')
  const [activeTab, setActiveTab] = useState<ModalTab>('measure')
  const [activeStep, setActiveStep] = useState<MeasureStep>('bust')
  const [selectedSizeRow, setSelectedSizeRow] = useState<string | null>('Size 54 (M)')
  
  // Interactive Fit Advisor State
  const [advisorHeight, setAdvisorHeight] = useState<HeightRange>('160to168')
  const [advisorDrape, setAdvisorDrape] = useState<DrapePref>('floor')

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
    { size: 'Size 50 (XS)', bustCm: '106', waistCm: '102', hipsCm: '116', lengthCm: '127', bustIn: '41.5', waistIn: '40', hipsIn: '45.5', lengthIn: '50', recHeightCm: '152 - 158 cm', recHeightIn: "5'0\" - 5'2\"" },
    { size: 'Size 52 (S)', bustCm: '112', waistCm: '108', hipsCm: '122', lengthCm: '132', bustIn: '44', waistIn: '42.5', hipsIn: '48', lengthIn: '52', recHeightCm: '158 - 163 cm', recHeightIn: "5'2\" - 5'4\"" },
    { size: 'Size 54 (M)', bustCm: '118', waistCm: '114', hipsCm: '128', lengthCm: '137', bustIn: '46.5', waistIn: '45', hipsIn: '50.5', lengthIn: '54', recHeightCm: '163 - 168 cm', recHeightIn: "5'4\" - 5'6\"" },
    { size: 'Size 56 (L)', bustCm: '124', waistCm: '120', hipsCm: '134', lengthCm: '142', bustIn: '49', waistIn: '47', hipsIn: '53', lengthIn: '56', recHeightCm: '168 - 173 cm', recHeightIn: "5'6\" - 5'8\"" },
    { size: 'Size 58 (XL)', bustCm: '130', waistCm: '126', hipsCm: '140', lengthCm: '147', bustIn: '51', waistIn: '49.5', hipsIn: '55', lengthIn: '58', recHeightCm: '173 - 178 cm', recHeightIn: "5'8\" - 5'10\"" },
    { size: 'Size 60 (XXL)', bustCm: '136', waistCm: '132', hipsCm: '146', lengthCm: '152', bustIn: '53.5', waistIn: '52', hipsIn: '57.5', lengthIn: '60', recHeightCm: '178+ cm', recHeightIn: "5'10\"+" },
  ]

  // Calculate recommended size from advisor
  const getRecommendedSize = () => {
    if (advisorHeight === 'under160') {
      return advisorDrape === 'floor' ? 'Size 52 (S)' : 'Size 50 (XS)'
    }
    if (advisorHeight === '160to168') {
      return advisorDrape === 'floor' ? 'Size 54 (M)' : 'Size 52 (S)'
    }
    return advisorDrape === 'floor' ? 'Size 58 (XL)' : 'Size 56 (L)'
  }

  const recommendedSizeName = getRecommendedSize()

  const stepDetails: Record<MeasureStep, {
    titleEn: string
    titleAr: string
    instructionEn: string
    instructionAr: string
    proTipEn: string
    proTipAr: string
  }> = {
    all: {
      titleEn: 'Complete Atelier Proportions Overview',
      titleAr: 'نظرة شاملة على تناسق أبعاد الأتليه',
      instructionEn: 'Our bespoke silhouettes are engineered with a generous 4 to 6 inches of flowing ease across the bust and hips, ensuring graceful movement and royal drape across all heights.',
      instructionAr: 'تتميز تصاميمنا الملكية باتساع مدروس يراوح بين ٤ و٦ بوصات إضافية عند الصدر والوركين، لضمان انسيابية استثنائية وحركةสงيمة تناسب مختلف القامات.',
      proTipEn: 'When selecting your abaya size, your vertical length with heels is the most critical factor for achieving a floor-sweeping luxury finish.',
      proTipAr: 'عند اختيار مقاس العباءة، يُعد الطول الكلي مع الحذاء أو الكعب هو العامل الأهم للحصول على مظهر فاخر يلامس الأرض بانسيابية.'
    },
    bust: {
      titleEn: '1. Bust Circumference',
      titleAr: '١. محيط الصدر (Bust)',
      instructionEn: 'Pass the measuring tape under your arms and wrap it across the fullest part of your bust. Ensure the tape rests horizontally flat right across your shoulder blades.',
      instructionAr: 'مرري شريط القياس تحت ذراعيك وحول الجزء الأوسع من الصدر. تأكدي من أن الشريط مستوٍ تماماً وأفقي عبر لوحي الكتف من الخلف.',
      proTipEn: 'Keep the tape comfortably level without pulling tight. Our abayas inherently provide generous ease over your actual bust measurement.',
      proTipAr: 'حافظي على استواء الشريط دون شده بقوة. عباءاتنا مصممة باتساع مريح وراقي يتجاوز قياس الصدر الفعلي لمنحك حرية تامة.'
    },
    waist: {
      titleEn: '2. Natural Waistline',
      titleAr: '٢. محيط الخصر الطبيعي (Waist)',
      instructionEn: 'Locate your natural waistline—the narrowest indentation of your torso slightly above your belly button and below your ribcage. Wrap the tape smoothly around.',
      instructionAr: 'حددي خط الخصر الطبيعي—وهو الجزء الأضيق من الجذع فوق السرة مباشرة وتحت القفص الصدري. لفي شريط القياس بسلاسة وحرية.',
      proTipEn: 'Insert one finger between the measuring tape and your body to allow for comfortable breathing and effortless seating movement throughout the day.',
      proTipAr: 'ضعي إصبعاً واحداً بين شريط القياس وجسمك للسماح بالتنفس المريح وحركة الجلوس الطبيعية بأناقة طوال اليوم.'
    },
    hips: {
      titleEn: '3. Hips & Lower Drape',
      titleAr: '٣. محيط الورك والانسيابية (Hips)',
      instructionEn: 'Stand upright with your heels together. Measure right around the fullest part of your hips and upper thighs where the abaya begins its fluid A-line fall.',
      instructionAr: 'قفي باستقامة مع تقريب الكعبين من بعضهما. قيسي حول الجزء الأوسع من الوركين وأعلى الفخذين حيث يبدأ انسدال العباءة بانسيابية.',
      proTipEn: 'Our bespoke cut widens gracefully down from the waist, ensuring ample silhouette room across the hips without any unwanted clinging.',
      proTipAr: 'تتسع قصتنا الملكية بانسيابية رائعة ابتداءً من الخصر، مما يضمن اتساعاً أريحيّاً ورقياً حول الوركين دون أي الالتصاق.'
    },
    length: {
      titleEn: '4. Vertical Garment Length',
      titleAr: '٤. الطول الكلي للعباءة (Length)',
      instructionEn: 'Measure straight down vertically from the highest point of your shoulder (HPS)—where your neck meets the shoulder seam—over the bust down to your desired hemline.',
      instructionAr: 'قيسي عمودياً من أعلى نقطة في الكتف—حيث يلتقي العنق بمسار الكتف—مروراً بالصدر وصولاً إلى الحاشية المطلوبة عند الأرض أو الكاحل.',
      proTipEn: 'Crucial Atelier Tip: Always wear the exact heel height you plan to style with this piece during measuring so your drape sweeps the floor perfectly.',
      proTipAr: 'نصيحة الأتليه الذهبية: ارتدِ دائماً الكعب أو الحذاء الذي تنوين تنسيقه مع هذه القطعة عند قياس الطول لضمان انسدال ملامس للأرض بأناقة متناهية.'
    }
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-ink/75 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-sand border border-border2/90 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden relative animate-scale-in">
        
        {/* Luxury Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-5 border-b border-border2/80 bg-cream/80 shrink-0 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block mb-1">
              {isArabic ? 'أتليه الرياض • القياسات الاحترافية' : 'ATELIER RIYADH • BESPOKE MEASUREMENTS'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-espresso font-normal tracking-tight">
              {isArabic ? 'دليل المقاسات والقصّات الملكية' : 'Professional Size & Fit Guide'}
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* CM / IN Switcher */}
            <div className="bg-sand border border-border2 rounded-full p-1 flex items-center text-xs font-medium shadow-2xs">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={cn(
                  "px-3.5 py-1 rounded-full transition-all duration-300 cursor-pointer",
                  unit === 'cm' ? 'bg-espresso text-cream shadow-xs' : 'text-mocha hover:text-espresso'
                )}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={cn(
                  "px-3.5 py-1 rounded-full transition-all duration-300 cursor-pointer",
                  unit === 'in' ? 'bg-espresso text-cream shadow-xs' : 'text-mocha hover:text-espresso'
                )}
              >
                INCHES
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-border2 bg-cream text-espresso hover:bg-sand hover:border-walnut transition-colors flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center px-6 sm:px-8 border-b border-border2/70 bg-cream/40 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('measure')}
            className={cn(
              "py-3.5 px-4 sm:px-6 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 border-b-2 cursor-pointer shrink-0",
              activeTab === 'measure'
                ? "border-walnut text-espresso font-semibold"
                : "border-transparent text-mocha hover:text-espresso"
            )}
          >
            {isArabic ? '١. كيفية أخذ القياسات' : '1. How To Measure'}
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={cn(
              "py-3.5 px-4 sm:px-6 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 border-b-2 cursor-pointer shrink-0",
              activeTab === 'matrix'
                ? "border-walnut text-espresso font-semibold"
                : "border-transparent text-mocha hover:text-espresso"
            )}
          >
            {isArabic ? '٢. جدول الأبعاد ومستشار المقاس' : '2. Size Matrix & Advisor'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ease')}
            className={cn(
              "py-3.5 px-4 sm:px-6 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 border-b-2 cursor-pointer shrink-0",
              activeTab === 'ease'
                ? "border-walnut text-espresso font-semibold"
                : "border-transparent text-mocha hover:text-espresso"
            )}
          >
            {isArabic ? '٣. انسيابية القصّة وأسرار الأتليه' : '3. Bespoke Ease & Fit Notes'}
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto no-scrollbar flex-1">
          
          {/* ========================================================= */}
          {/* TAB 1: HOW TO MEASURE (Interactive Animated Studio)       */}
          {/* ========================================================= */}
          {activeTab === 'measure' && (
            <div className="space-y-8 animate-fade-in">
              {/* Interactive Step Selector Pills */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 border-b border-border2/60 pb-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-espresso me-2 hidden sm:inline">
                  {isArabic ? 'اختر نقطة القياس لعرض التوضيح التفاعلي:' : 'Select Measurement Point:'}
                </span>
                {(['bust', 'waist', 'hips', 'length', 'all'] as MeasureStep[]).map((step) => {
                  const labelMap: Record<MeasureStep, { en: string; ar: string }> = {
                    bust: { en: '1. Bust', ar: '١. الصدر' },
                    waist: { en: '2. Waist', ar: '٢. الخصر' },
                    hips: { en: '3. Hips', ar: '٣. الورك' },
                    length: { en: '4. Length', ar: '٤. الطول' },
                    all: { en: 'All / Overview', ar: 'نظرة شاملة' }
                  }
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setActiveStep(step)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-2",
                        activeStep === step
                          ? "bg-espresso text-cream shadow-md scale-105"
                          : "bg-cream border border-border2 text-mocha hover:bg-sand hover:text-espresso"
                      )}
                    >
                      <span>{isArabic ? labelMap[step].ar : labelMap[step].en}</span>
                      {activeStep === step && (
                        <span className="w-1.5 h-1.5 rounded-full bg-walnut animate-ping" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Main Studio Display: Illustration Left, Details Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Simple, Elegant Animated Studio Illustration */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-cream/70 rounded-3xl p-6 sm:p-8 border border-border2/80 shadow-sm relative">
                  <div className="w-full flex items-center justify-between text-[10px] uppercase tracking-widest text-mocha border-b border-border2/60 pb-3 mb-4">
                    <span>{isArabic ? 'الرسم البياني التفاعلي' : 'INTERACTIVE ILLUSTRATION'}</span>
                    <span className="text-walnut font-medium">{isArabic ? stepDetails[activeStep].titleAr.split(' ')[1] : stepDetails[activeStep].titleEn}</span>
                  </div>

                  {/* Elegant Line Drawing Female & Abaya Silhouette with Animated Measuring Tapes */}
                  <div className="relative py-4 flex items-center justify-center w-full min-h-[300px]">
                    <svg className="w-48 h-72 stroke-espresso/85 fill-none" strokeWidth="1.2" viewBox="0 0 120 190">
                      {/* Neckline & Shoulders */}
                      <path strokeLinecap="round" strokeLinejoin="round" d="M45 25 C60 38, 60 38, 75 25" className="stroke-espresso/70" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M45 25 L20 62 L32 68 L48 44" className="stroke-espresso/80" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M75 25 L100 62 L88 68 L72 44" className="stroke-espresso/80" />
                      
                      {/* Flowing Torso & Hemline */}
                      <path strokeLinecap="round" strokeLinejoin="round" d="M48 44 Q46 82, 32 165 L88 165 Q74 82, 72 44" className="stroke-espresso/90" />
                      
                      {/* Subtle Center Seam */}
                      <line x1="60" y1="32" x2="60" y2="165" strokeDasharray="3 3" className="stroke-taupe/40" />

                      {/* --- 1. BUST MEASURING TAPE --- */}
                      <g className={cn(
                        "transition-all duration-500",
                        activeStep === 'bust' || activeStep === 'all' ? "opacity-100 scale-100" : "opacity-20"
                      )}>
                        <line 
                          x1="38" y1="60" x2="82" y2="60" 
                          className={cn(
                            "stroke-walnut transition-all duration-500",
                            activeStep === 'bust' ? "stroke-[2.2]" : "stroke-[1.2]"
                          )}
                          strokeDasharray={activeStep === 'bust' ? "none" : "2 2"}
                        />
                        <circle cx="38" cy="60" r={activeStep === 'bust' ? "3" : "1.8"} className="fill-walnut animate-pulse" />
                        <circle cx="82" cy="60" r={activeStep === 'bust' ? "3" : "1.8"} className="fill-walnut animate-pulse" />
                        {activeStep === 'bust' && (
                          <g>
                            <rect x="44" y="52" width="32" height="15" rx="3" className="fill-espresso" />
                            <text x="60" y="62" textAnchor="middle" className="fill-cream text-[7px] font-sans font-bold tracking-wider">BUST</text>
                          </g>
                        )}
                      </g>

                      {/* --- 2. WAIST MEASURING TAPE --- */}
                      <g className={cn(
                        "transition-all duration-500",
                        activeStep === 'waist' || activeStep === 'all' ? "opacity-100 scale-100" : "opacity-20"
                      )}>
                        <line 
                          x1="42" y1="92" x2="78" y2="92" 
                          className={cn(
                            "stroke-walnut transition-all duration-500",
                            activeStep === 'waist' ? "stroke-[2.2]" : "stroke-[1.2]"
                          )}
                          strokeDasharray={activeStep === 'waist' ? "none" : "2 2"}
                        />
                        <circle cx="42" cy="92" r={activeStep === 'waist' ? "3" : "1.8"} className="fill-walnut animate-pulse" />
                        <circle cx="78" cy="92" r={activeStep === 'waist' ? "3" : "1.8"} className="fill-walnut animate-pulse" />
                        {activeStep === 'waist' && (
                          <g>
                            <rect x="43" y="84" width="34" height="15" rx="3" className="fill-espresso" />
                            <text x="60" y="94" textAnchor="middle" className="fill-cream text-[7px] font-sans font-bold tracking-wider">WAIST</text>
                          </g>
                        )}
                      </g>

                      {/* --- 3. HIPS MEASURING TAPE --- */}
                      <g className={cn(
                        "transition-all duration-500",
                        activeStep === 'hips' || activeStep === 'all' ? "opacity-100 scale-100" : "opacity-20"
                      )}>
                        <line 
                          x1="36" y1="124" x2="84" y2="124" 
                          className={cn(
                            "stroke-walnut transition-all duration-500",
                            activeStep === 'hips' ? "stroke-[2.2]" : "stroke-[1.2]"
                          )}
                          strokeDasharray={activeStep === 'hips' ? "none" : "2 2"}
                        />
                        <circle cx="36" cy="124" r={activeStep === 'hips' ? "3" : "1.8"} className="fill-walnut animate-pulse" />
                        <circle cx="84" cy="124" r={activeStep === 'hips' ? "3" : "1.8"} className="fill-walnut animate-pulse" />
                        {activeStep === 'hips' && (
                          <g>
                            <rect x="45" y="116" width="30" height="15" rx="3" className="fill-espresso" />
                            <text x="60" y="126" textAnchor="middle" className="fill-cream text-[7px] font-sans font-bold tracking-wider">HIPS</text>
                          </g>
                        )}
                      </g>

                      {/* --- 4. VERTICAL LENGTH MEASURING TAPE --- */}
                      <g className={cn(
                        "transition-all duration-500",
                        activeStep === 'length' || activeStep === 'all' ? "opacity-100 scale-100" : "opacity-20"
                      )}>
                        <line 
                          x1="102" y1="25" x2="102" y2="165" 
                          className={cn(
                            "stroke-walnut transition-all duration-500",
                            activeStep === 'length' ? "stroke-[2.2]" : "stroke-[1.2]"
                          )}
                          strokeDasharray={activeStep === 'length' ? "none" : "2 2"}
                        />
                        <polyline points="98,28 102,25 106,28" className="stroke-walnut fill-none" strokeWidth={activeStep === 'length' ? "1.8" : "1.2"} />
                        <polyline points="98,162 102,165 106,162" className="stroke-walnut fill-none" strokeWidth={activeStep === 'length' ? "1.8" : "1.2"} />
                        {activeStep === 'length' && (
                          <g transform="rotate(90,102,95)">
                            <rect x="83" y="87" width="38" height="15" rx="3" className="fill-espresso" />
                            <text x="102" y="97" textAnchor="middle" className="fill-cream text-[7px] font-sans font-bold tracking-wider">LENGTH</text>
                          </g>
                        )}
                      </g>
                    </svg>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-walnut font-semibold bg-sand px-4 py-1.5 rounded-full border border-border2">
                    {isArabic ? stepDetails[activeStep].titleAr : stepDetails[activeStep].titleEn}
                  </span>
                </div>

                {/* Right Column: Detailed Step Instructions & Tailor's Pro Tips */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                  <div className="bg-cream/60 border border-border2/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-espresso text-cream flex items-center justify-center font-serif text-sm font-semibold shrink-0">
                        {activeStep === 'all' ? '✦' : activeStep === 'bust' ? '1' : activeStep === 'waist' ? '2' : activeStep === 'hips' ? '3' : '4'}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-espresso">
                        {isArabic ? stepDetails[activeStep].titleAr : stepDetails[activeStep].titleEn}
                      </h3>
                    </div>

                    <div className="border-t border-border2/60 pt-4">
                      <h4 className="text-xs uppercase tracking-widest text-walnut font-semibold mb-2">
                        {isArabic ? 'إرشادات أخذ القياس بدقة' : 'Clear Measurement Instructions'}
                      </h4>
                      <p className="text-sm sm:text-base text-mocha leading-relaxed font-sans">
                        {isArabic ? stepDetails[activeStep].instructionAr : stepDetails[activeStep].instructionEn}
                      </p>
                    </div>

                    {/* Tailor's Golden Tip Card */}
                    <div className="bg-sand/90 border border-walnut/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                      <span className="text-xl shrink-0 mt-0.5">✂️</span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-espresso block mb-1">
                          {isArabic ? 'نصيحة أتليه الرياض الخاصة' : 'Atelier Master Tailor Pro-Tip'}
                        </span>
                        <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                          {isArabic ? stepDetails[activeStep].proTipAr : stepDetails[activeStep].proTipEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Step Switcher Bar at bottom of instructions */}
                  <div className="flex items-center justify-between p-4 bg-cream rounded-2xl border border-border2/60">
                    <span className="text-xs text-mocha font-medium">
                      {isArabic ? 'هل ترغبين في استعراض جدول المقاسات وحاسبة الطول؟' : 'Ready to find your recommended size & length?'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('matrix')}
                      className="text-xs font-semibold text-espresso hover:text-walnut uppercase tracking-widest underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      {isArabic ? 'الانتقال لجدول المقاسات ←' : 'Go to Size Matrix →'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SIZE MATRIX & FIT ADVISOR (Beyond Standard Chart)  */}
          {/* ========================================================= */}
          {activeTab === 'matrix' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Interactive Bespoke Fit Advisor Box */}
              <div className="bg-gradient-to-r from-cream via-sand/70 to-cream border border-walnut/40 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border2/70">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block mb-1">
                      {isArabic ? 'مستشار المقاسات الذكي' : 'BESPOKE FIT ADVISOR'}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-espresso">
                      {isArabic ? 'احصلي على التوصية الفورية للطول والمقاس الملكي' : 'Find Your Tailored Abaya Proportion & Length'}
                    </h3>
                  </div>
                  <div className="bg-espresso text-cream px-4 py-2 rounded-full text-xs font-serif font-medium shrink-0 flex items-center gap-2">
                    <span>{isArabic ? 'المقاس المُوصى به لطلتك:' : 'Recommended Size:'}</span>
                    <strong className="text-walnut font-sans text-sm">{recommendedSizeName}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Selector 1: Height Range */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-espresso block mb-2.5">
                      {isArabic ? '١. اختاري طولك مع الحذاء (أو الكعب):' : '1. Select your height (including preferred heels):'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setAdvisorHeight('under160')}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer text-center",
                          advisorHeight === 'under160'
                            ? "bg-espresso text-cream shadow-sm ring-2 ring-walnut"
                            : "bg-cream border border-border2 text-mocha hover:bg-sand"
                        )}
                      >
                        {isArabic ? 'أقل من ١٦٠ سم' : 'Under 160 cm'}
                        <span className="block text-[10px] opacity-75 font-normal mt-0.5">Under 5\'3"</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAdvisorHeight('160to168')}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer text-center",
                          advisorHeight === '160to168'
                            ? "bg-espresso text-cream shadow-sm ring-2 ring-walnut"
                            : "bg-cream border border-border2 text-mocha hover:bg-sand"
                        )}
                      >
                        {isArabic ? '١٦٠ - ١٦٨ سم' : '160 - 168 cm'}
                        <span className="block text-[10px] opacity-75 font-normal mt-0.5">5\'3" - 5\'6"</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAdvisorHeight('169plus')}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer text-center",
                          advisorHeight === '169plus'
                            ? "bg-espresso text-cream shadow-sm ring-2 ring-walnut"
                            : "bg-cream border border-border2 text-mocha hover:bg-sand"
                        )}
                      >
                        {isArabic ? '١٦٩ سم وأكثر' : '169+ cm'}
                        <span className="block text-[10px] opacity-75 font-normal mt-0.5">5\'7"+</span>
                      </button>
                    </div>
                  </div>

                  {/* Selector 2: Drape Preference */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-espresso block mb-2.5">
                      {isArabic ? '٢. اختاري نمط الانسدال المفضل:' : '2. Preferred silhouette finish:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAdvisorDrape('floor')}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer text-center",
                          advisorDrape === 'floor'
                            ? "bg-espresso text-cream shadow-sm ring-2 ring-walnut"
                            : "bg-cream border border-border2 text-mocha hover:bg-sand"
                        )}
                      >
                        {isArabic ? 'انسدال ملامس للأرض (ملكي)' : 'Floor-Sweeping Drape'}
                        <span className="block text-[10px] opacity-75 font-normal mt-0.5">{isArabic ? 'يغطي الحذاء بالكامل' : 'Classic Atelier Grace'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAdvisorDrape('ankle')}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer text-center",
                          advisorDrape === 'ankle'
                            ? "bg-espresso text-cream shadow-sm ring-2 ring-walnut"
                            : "bg-cream border border-border2 text-mocha hover:bg-sand"
                        )}
                      >
                        {isArabic ? 'طول مريح يصل للكاحل' : 'Ankle-Grazing Finish'}
                        <span className="block text-[10px] opacity-75 font-normal mt-0.5">{isArabic ? 'عملي للحركة والأحذية المنخفضة' : 'Ideal for Flats & Elevation'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matrix Table */}
              <div>
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="font-serif text-lg sm:text-xl text-espresso">
                    {isArabic ? 'جدول أبعاد الأتليه القياسي' : 'Atelier Measurement Matrix'}
                  </h3>
                  <span className="text-xs text-mocha font-medium">
                    {isArabic ? `الأبعاد بوحدة: ${unit === 'cm' ? 'سنتيمتر (CM)' : 'إنش (INCHES)'}` : `Showing measurements in: ${unit.toUpperCase()}`}
                  </span>
                </div>

                <div className="overflow-x-auto border border-border2 rounded-2xl bg-cream/30 shadow-xs">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-sand border-b border-border2 text-[11px] uppercase tracking-widest text-espresso font-semibold">
                        <th className="py-4 px-5">{isArabic ? 'المقاس (Size)' : 'Size'}</th>
                        <th className="py-4 px-5">{isArabic ? 'الصدر (Bust)' : 'Bust'}</th>
                        <th className="py-4 px-5">{isArabic ? 'الخصر (Waist)' : 'Waist'}</th>
                        <th className="py-4 px-5">{isArabic ? 'الورك (Hips)' : 'Hips'}</th>
                        <th className="py-4 px-5">{isArabic ? 'الطول (Length)' : 'Length'}</th>
                        <th className="py-4 px-5">{isArabic ? 'طول القامة المُوصى به' : 'Recommended Height'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border2/70 text-xs sm:text-sm text-mocha font-sans">
                      {matrix.map((row, idx) => {
                        const isRecommended = row.size === recommendedSizeName
                        const isSelected = row.size === selectedSizeRow
                        return (
                          <tr
                            key={idx}
                            onClick={() => setSelectedSizeRow(row.size)}
                            className={cn(
                              "transition-all duration-300 cursor-pointer",
                              isRecommended
                                ? "bg-walnut/15 hover:bg-walnut/20 font-medium"
                                : isSelected
                                ? "bg-sand/90 hover:bg-sand"
                                : "hover:bg-cream/90"
                            )}
                          >
                            <td className="py-4 px-5 font-semibold text-espresso font-serif flex items-center gap-2">
                              <span>{row.size}</span>
                              {isRecommended && (
                                <span className="bg-espresso text-cream text-[9px] uppercase font-sans tracking-widest px-2 py-0.5 rounded-full">
                                  {isArabic ? 'مُوصى به' : 'Match'}
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-5">{unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn}"`}</td>
                            <td className="py-4 px-5">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn}"`}</td>
                            <td className="py-4 px-5">{unit === 'cm' ? `${row.hipsCm} cm` : `${row.hipsIn}"`}</td>
                            <td className="py-4 px-5 font-semibold text-espresso">{unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn}"`}</td>
                            <td className="py-4 px-5 text-mocha/90">{unit === 'cm' ? row.recHeightCm : row.recHeightIn}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: BESPOKE EASE & TAILORING NOTES                     */}
          {/* ========================================================= */}
          {activeTab === 'ease' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cream border border-border2/80 rounded-3xl p-6 sm:p-8 space-y-3">
                  <span className="text-2xl block">✨</span>
                  <h4 className="font-serif text-lg text-espresso">
                    {isArabic ? 'فلسفة الاتساع الانسيابي' : 'The Philosophy of Generous Ease'}
                  </h4>
                  <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                    {isArabic
                      ? 'لا تُقاس العباءات الفاخرة بالالتصاق، بل بانسيابيتها حول الجسد. نترك في كل قصة ٤ إلى ٦ بوصات إضافية عند الصدر والوركين لتمنحك حركة مهيبة تشبه انسياب الحرير.'
                      : 'Unlike traditional body-con garments, royal abayas are designed with 4 to 6 inches of intentional ease across the bust and hips, allowing the fabric to move gracefully like liquid silk.'}
                  </p>
                </div>

                <div className="bg-cream border border-border2/80 rounded-3xl p-6 sm:p-8 space-y-3">
                  <span className="text-2xl block">👠</span>
                  <h4 className="font-serif text-lg text-espresso">
                    {isArabic ? 'تنسيق الطول مع الكعب العالي' : 'Styling Length with Heels'}
                  </h4>
                  <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                    {isArabic
                      ? 'إذا كنتِ ترتدين كعباً بارتفاع ٧ سم أو أكثر في المناسبات المسائية، نوصي باختيار مقاس أكبر بدرجة واحدة في الطول (مثلاً المقاس ٥٦ بدلاً من ٥٤) للحفاظ على الانسدال الملامس للأرض.'
                      : 'If you frequently style your abaya with 3-inch (7cm) heels for evening soirées, we recommend stepping up one size in length (e.g. Size 56 instead of 54) to maintain the royal floor-sweeping drape.'}
                  </p>
                </div>

                <div className="bg-cream border border-border2/80 rounded-3xl p-6 sm:p-8 space-y-3">
                  <span className="text-2xl block">✂️</span>
                  <h4 className="font-serif text-lg text-espresso">
                    {isArabic ? 'تعديل الطول والحياكة الفرنسية' : 'French Seams & Easy Alteration'}
                  </h4>
                  <p className="text-xs sm:text-sm text-mocha leading-relaxed">
                    {isArabic
                      ? 'تُحاك جميع قطعنا بدرزات فرنسية مخفية وحواشٍ عميقة، مما يتيح لخياطك الخاص تعديل الطول أو تقصير الحاشية بكل سهولة دون التأثير على تطريز الأتليه الأصلي.'
                      : 'Every piece is crafted with clean internal French seams and generous hem allowances, making it effortless for your personal tailor to adjust the hemline while preserving the original finish.'}
                  </p>
                </div>
              </div>

              <div className="bg-sand border border-walnut/30 rounded-3xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
                <h4 className="font-serif text-xl text-espresso mb-2">
                  {isArabic ? 'هل تحتاجين استشارة خاصة لمقاسك؟' : 'Need Personal Guidance on Fit?'}
                </h4>
                <p className="text-xs sm:text-sm text-mocha leading-relaxed mb-6">
                  {isArabic
                    ? 'فريق المساعدين الشخصيين في أتليه الرياض متاح لتقديم المقاسات المخصصة ومساعدتك في اختيار القصة الأنسب لإطلالتك الفاخرة.'
                    : 'Our Riyadh Atelier concierge team is available to assist with bespoke measurements and personalized styling recommendations.'}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-espresso hover:bg-ink text-cream px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                >
                  {isArabic ? 'العودة لاختيار المقاس في الصفحة' : 'Return to Product Selection'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-sand/90 border-t border-border2/80 flex items-center justify-between shrink-0">
          <span className="text-xs text-mocha font-sans hidden sm:inline">
            {isArabic ? 'أتليه الرياض • جميع المقاسات تخضع لمعايير الجودة الملكية' : 'Atelier Riyadh • All dimensions crafted to precision'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer ms-auto"
          >
            {isArabic ? 'إغلاق الدليل' : 'Close Guide'}
          </button>
        </div>

      </div>
    </div>
  )
}
