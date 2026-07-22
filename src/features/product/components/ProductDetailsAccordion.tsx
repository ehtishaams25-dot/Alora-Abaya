import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'

interface ProductDetailsAccordionProps {
  product: ProductDress
  isArabic: boolean
}

interface AccordionItem {
  id: string
  title: string
  content: string
}

export function ProductDetailsAccordion({ product, isArabic }: ProductDetailsAccordionProps) {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string>('description')

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? '' : id))
  }

  const items: AccordionItem[] = [
    {
      id: 'description',
      title: t('product.accordion.descTitle', isArabic ? 'الوصف الملكي' : 'Description'),
      content: isArabic
        ? (product.descriptionAr || product.description) + ' ' + t('product.accordion.descContent', 'صُممت هذه القطعة لتنسدل بقوام انسيابي مهيب، مجسدةً الهدوء والرقي الفاخر. تتميز بقصة مريحة تتيح حرية الحركة في الأكمام والطول، لتمنحك حضوراً واثقاً من اللقاءات الصباحية وحتى السهرات الرسمية الفاخرة.')
        : product.description + ' ' + t('product.accordion.descContent', 'Designed to drape gracefully with dignified fluid poise, this creation embodies the calm sophistication of modern luxury. Cut with ample movement through the sleeves and length, offering effortless poise from daytime gatherings to formal evening affairs.')
    },
    {
      id: 'fabric',
      title: t('product.accordion.fabricTitle', isArabic ? 'القماش وإرشادات العناية' : 'Fabric & Care'),
      content: t('product.accordion.fabricContent', isArabic
        ? 'مصنوعة من خيوط طبيعية فائقة الجودة وحياكة مخصصة. يُنصح بالتنظيف الجاف فقط لدى متخصصين ذوي خبرة بالأقمشة والحرير الفاخر. تُحفظ معلقة على شماعة مبطنة بالمخمل في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة للحفاظ على بريق الحرير وتألق التطريز.'
        : 'Crafted from superior natural threads and bespoke weaves. Dry clean only at a specialist dry cleaner experienced with delicate luxury silks and crepes. Store hung on a padded velvet hanger in a cool, dry space away from direct sunlight to preserve silk luster and embroidery brilliance.')
    },
    {
      id: 'shipping',
      title: t('product.accordion.shippingTitle', isArabic ? 'معلومات الشحن والتوصيل' : 'Shipping Information'),
      content: t('product.accordion.shippingContent', isArabic
        ? 'تتمتع جميع الطلبات بشحن عالمي سريع ومجاني في تغليف ألورا الملكي الفاخر. تصل التوصيلات داخل دول الخليج خلال ١-٣ أيام عمل عبر مندوب خاص. وتصل التوصيلات الدولية خلال ٣-٥ أيام عمل مع إشعارات تتبع مباشرة من المساعد الشخصي.'
        : 'All orders receive complimentary express global dispatch in signature Alora gift packaging. GCC deliveries arrive within 1-3 business days via private courier. International deliveries arrive within 3-5 business days complete with tracked concierge notifications.')
    },
    {
      id: 'returns',
      title: t('product.accordion.returnsTitle', isArabic ? 'الاسترجاع والاستبدال الفوري' : 'Returns & Exchanges'),
      content: t('product.accordion.returnsContent', isArabic
        ? 'نقدم خدمة استرجاع واستبدال مجانية لمدة ١٤ يوماً لجميع القطع غير الملبوسة وبحالتها الأصلية الفائقة مع بطاقات الأتليه المرفقة. يتولى فريق المساعد الشخصي ترتيب استلام القطعة من منزلكم بكل سهولة ويسر.'
        : 'We offer complimentary 14-day returns and exchanges for all unworn pieces in their original pristine condition with atelier tags attached. Our concierge team manages complimentary home pickup at your convenience.')
    }
  ]

  return (
    <section className="min-h-[80svh] flex items-center py-24 sm:py-32 lg:py-40 bg-sand border-b border-border2/60 relative">
      <div className="container-alora w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 xl:gap-28 items-start">
          {/* Left Column: Editorial Header & Introduction */}
          <div className="w-full lg:w-4/12 lg:sticky lg:top-40">
            <span className="text-xs uppercase tracking-[0.28em] text-walnut font-medium block mb-4 sm:mb-5">
              {t('product.accordion.eyebrow', isArabic ? 'تفاصيل التميز الملكي' : 'The Details of Distinction')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso font-normal tracking-tight leading-[1.25] sm:leading-[1.25] mb-6 sm:mb-8">
              {t('product.accordion.title', isArabic ? 'المواصفات الهندسية وإرشادات العناية' : 'Architectural & Care Specifications')}
            </h2>
            <p className="text-sm sm:text-base text-mocha leading-relaxed font-sans max-w-md">
              {t('product.accordion.intro', isArabic
                ? 'استكشفي الملمس الفاخر، وإرشادات العناية المتخصصة بالقماش، وخدمات التوصيل الخاصة بقطعتك.'
                : 'Explore the tactile essence, meticulous fabric care notes, and bespoke delivery options associated with your piece.')}
            </p>
          </div>

          {/* Right Column: Clean, Spacious Accordion Component */}
          <div className="w-full lg:w-8/12 divide-y divide-border2/80 border-t border-b border-border2/80">
            {items.map((item) => {
              const isOpen = openId === item.id
              return (
                <div key={item.id} className="py-6 sm:py-8 lg:py-10 transition-colors duration-300">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between text-start cursor-pointer group focus:outline-none py-1"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl lg:text-2xl text-espresso group-hover:text-walnut transition-colors tracking-wide">
                      {item.title}
                    </span>
                    <span className="w-9 h-9 rounded-full border border-border2/80 flex items-center justify-center text-espresso group-hover:border-walnut transition-all duration-300 shrink-0 ms-6">
                      <svg
                        className={`w-4 h-4 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180 text-walnut' : 'rotate-0'}`}
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 sm:mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="text-sm sm:text-base text-mocha leading-relaxed pe-6 sm:pe-16 font-sans">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
