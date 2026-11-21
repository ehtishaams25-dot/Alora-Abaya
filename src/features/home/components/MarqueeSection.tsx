import { useTranslation } from 'react-i18next'

export function MarqueeSection() {
  const { i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  const features = isArabic
    ? [
        'عبايات فاخرة',
        'صنع يدوياً في الرياض',
        'مجموعات حصرية',
        'أقمشة فاخرة',
        'تصاميم راقية',
        'أناقة لا مثيل لها',
      ]
    : [
        'PREMIUM ABAYAS',
        'HANDCRAFTED IN RIYADH',
        'EXCLUSIVE COLLECTIONS',
        'SIGNATURE ATELIER',
        'LUXURY FABRICS',
        'TIMELESS ELEGANCE',
      ]

  // Duplicate the features array to ensure seamless scrolling
  const marqueeItems = [...features, ...features, ...features, ...features]

  return (
    <section className="bg-cream py-3 sm:py-4 overflow-hidden border-y border-border2">
      <div className="relative w-full flex overflow-hidden group py-2" dir="ltr">
        <div 
          className="flex whitespace-nowrap w-max"
          style={{
            animation: 'marquee 40s linear infinite',
          }}
        >
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span 
                className="text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-serif text-espresso px-8"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {item}
              </span>
              <span className="text-walnut/60 text-3xl font-serif px-4 translate-y-1">*</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* We need to add the marquee keyframes globally or here in a style block */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
