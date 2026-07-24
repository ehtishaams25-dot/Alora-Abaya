import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'

interface ProductCraftsmanshipSectionProps {
  product: ProductDress
  isArabic: boolean
}

export function ProductCraftsmanshipSection({ product, isArabic }: ProductCraftsmanshipSectionProps) {
  const { t } = useTranslation()

  const attributes = [
    {
      id: 'breathable',
      label: t('product.craftsmanship.attrBreathable', isArabic ? 'قطن وأقمشة تتنفس برفق' : 'Breathable Cotton'),
      icon: (
        <svg className="w-5 h-5 stroke-espresso/80 fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )
    },
    {
      id: 'stitching',
      label: t('product.craftsmanship.attrStitching', isArabic ? 'درزات وخياطة ملكية دقيقة' : 'Premium Stitching'),
      icon: (
        <svg className="w-5 h-5 stroke-espresso/80 fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      )
    },
    {
      id: 'lightweight',
      label: t('product.craftsmanship.attrLightweight', isArabic ? 'راحة خفيفة وانسيابية علوية' : 'Lightweight Comfort'),
      icon: (
        <svg className="w-5 h-5 stroke-espresso/80 fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      )
    },
    {
      id: 'everyday',
      label: t('product.craftsmanship.attrEveryday', isArabic ? 'أناقة يومية دائمة وخالدة' : 'Elegant Everyday Wear'),
      icon: (
        <svg className="w-5 h-5 stroke-espresso/80 fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const lifestyleImg = product.secondImage || product.image

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-cream border-b border-border2/60 relative overflow-hidden">
      {/* Editorial Decorative Background Subtle Glow */}
      <div className="absolute top-0 end-0 w-80 h-80 bg-sand/80 rounded-full blur-3xl -z-0 pointer-events-none opacity-50" />
      
      <div className="container-alora relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          {/* Refined Boutique Lifestyle Image Side */}
          <div className="w-full lg:w-5/12 shrink-0 flex justify-center">
            <div className="relative aspect-[4/5] max-h-[480px] sm:max-h-[520px] w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] mx-auto rounded-3xl overflow-hidden shadow-xl bg-sand border border-border2/70 group">
              <img
                src={lifestyleImg}
                alt={isArabic ? product.nameAr : product.name}
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-60" />
              
              {/* Floating Editorial Plate */}
              <div className="absolute bottom-4 start-4 end-4 sm:bottom-5 sm:start-5 sm:end-5 p-3.5 sm:p-4 rounded-2xl bg-cream/95 backdrop-blur-md border border-border2/60 shadow-md">
                <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block mb-0.5">
                  {t('product.craftsmanship.eyebrow', isArabic ? 'حرفية الأتليه الملكية' : 'Atelier Craftsmanship')}
                </span>
                <p className="font-serif text-xs sm:text-sm text-espresso leading-snug">
                  {isArabic ? product.nameAr : product.name}
                </p>
              </div>
            </div>
          </div>

          {/* Refined Typography Side */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center max-w-xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-3 sm:mb-4">
              {t('product.craftsmanship.eyebrow', isArabic ? 'حرفية الأتليه الملكية' : 'Atelier Craftsmanship')}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-[1.25] mb-5 sm:mb-6">
              {t('product.craftsmanship.title', isArabic
                ? 'أنشودة للانسيابية والقصات اليدوية الفاخرة'
                : 'An Ode to Fluid Motion and Masterful Tailoring')}
            </h2>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-mocha leading-relaxed font-sans mb-8 sm:mb-10">
              <p>
                {t('product.craftsmanship.para1', isArabic
                  ? 'تولد كل قطعة من إبداعات ألورا من احترام عميق لتقاليد الخياطة اليدوية الفاخرة ولمسات الأناقة المعاصرة. يتم تصميم كل قَصّة وثنية داخل صالوننا الخاص، حيث تمر بأكثر من ثلاثين مرحلة دقيقة لضمان انسيابية وقار لا تضاهى.'
                  : 'Every Alora silhouette is born from an uncompromising reverence for traditional craftsmanship combined with contemporary poise. Hand-draped inside our private salon, each piece undergoes over thirty distinct tailoring steps to ensure an unyielding graceful flow.')}
              </p>
              <p>
                {t('product.craftsmanship.para2', isArabic
                  ? 'نختار بعناية فائقة حرير التوت الطبيعي الفاخر من الدرجة الملكية والكريب المزدوج، وهي أقمشة تم اختيارها خصيصاً لمساميتها الطبيعية، وبريقها الهادئ، وثقلها الوقور. تتوارى الدرزات الفرنسية المخفية بطول كل طرف، لتمنحك قواماً متماسكاً دون أي تكلف.'
                  : 'We source only pure Grade 6A mulberry silk and bespoke double-layered crepes—fabrics chosen specifically for their natural breathability, luminous finish, and dignified weight. French seams run concealed along every edge, providing effortless structure without unnecessary stiffness.')}
              </p>
            </div>

            {/* Subtle Horizontal List of Attributes with Generous Spacing & Icons */}
            <div className="pt-8 sm:pt-10 border-t border-border2/70 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {attributes.map((attr) => (
                <div key={attr.id} className="flex flex-col gap-2.5 items-start group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sand/80 border border-border2/80 flex items-center justify-center text-espresso group-hover:border-walnut group-hover:bg-sand transition-all duration-300 shadow-xs">
                    {attr.icon}
                  </div>
                  <span className="text-xs font-medium text-espresso uppercase tracking-wider leading-snug">
                    {attr.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
