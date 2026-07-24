import { type ProductDress } from '../../../data/dressesData'

interface ProductEditorialGalleryProps {
  product: ProductDress
  isArabic: boolean
}

interface EditorialFeature {
  id: string
  number: string
  eyebrowEn: string
  eyebrowAr: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  imageUrl: string
  imageAltEn: string
  imageAltAr: string
  bgClass: string
}

export function ProductEditorialGallery({ product, isArabic }: ProductEditorialGalleryProps) {

  // Sourced luxury fashion editorial photography specifically capturing high-end fabric, embroidery, tailoring seams, sleeves, and graceful motion
  const features: EditorialFeature[] = [
    {
      id: 'fabric',
      number: '01',
      eyebrowEn: 'Atelier Fabric',
      eyebrowAr: 'القماش الفاخر',
      titleEn: 'Bespoke Silk & Double Crepe',
      titleAr: 'الحرير الطبيعي والكريب المزدوج',
      descriptionEn:
        'Sourced from the most venerated mills, our signature double-layered crepe and Grade 6A mulberry silk offer exceptional breathability and a dignified, luminous drape that moves effortlessly with every step.',
      descriptionAr:
        'نختار بعناية فائقة حرير التوت الطبيعي الفاخر والكريب المزدوج ذو الحياكة الخاصة، ليمنحك ملمساً ناعماً وانسيابية فاخرة تتنفس بحرية مع كل حركة.',
      imageUrl: product.secondImage || 'https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=1600&q=88',
      imageAltEn: 'Close up of flowing luxury crepe and silk fabric texture',
      imageAltAr: 'ملمس الحرير والكريب المزدوج عن قرب',
      bgClass: 'bg-sand'
    },
    {
      id: 'embroidery',
      number: '02',
      eyebrowEn: 'Luxury Embroidery',
      eyebrowAr: 'التطريز اليدوي',
      titleEn: 'Intricate Salon Craftsmanship',
      titleAr: 'تطريز ملكي دقيق وثنيات يدوية',
      descriptionEn:
        'Each motif is delicately embroidered by master artisans inside our private salon using custom threads and subtle tonal accents, creating a quiet brilliance that catches the light naturally.',
      descriptionAr:
        'تُطرز كل تفصيلة بأيدي أمهر الحرفيين في صالوننا الخاص باستخدام خيوط مخصصة، لتضفي بريقاً هادئاً ولمسة فنية تلفت الأنظار بأناقة وبدون تكلف.',
      imageUrl: 'https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=1600&q=88',
      imageAltEn: 'Detailed luxury embroidery and delicate handwork',
      imageAltAr: 'تفاصيل التطريز اليدوي الفاخر',
      bgClass: 'bg-cream'
    },
    {
      id: 'stitching',
      number: '03',
      eyebrowEn: 'Handcrafted Stitching',
      eyebrowAr: 'الخياطة والدرزات',
      titleEn: 'Concealed French Seams',
      titleAr: 'درزات فرنسية مخفية وخياطة متقنة',
      descriptionEn:
        'We reject shortcuts. French seams run concealed across every interior edge, while hand-finished hems provide effortless structural integrity without stiffness or added weight.',
      descriptionAr:
        'نلتزم بأعلى معايير الخياطة اليدوية؛ حيث تمتد الدرزات الفرنسية المخفية على طول الحواف الداخلية لضمان تماسك القوام وأناقة المظهر الداخلي والخارجي على حد سواء.',
      imageUrl: 'https://images.unsplash.com/photo-1724412665971-114bd351a42d?auto=format&fit=crop&w=1600&q=88',
      imageAltEn: 'Tailoring detail showing precision hand stitching and seams',
      imageAltAr: 'دقة الخياطة والدرزات الفرنسية',
      bgClass: 'bg-sand'
    },
    {
      id: 'sleeves',
      number: '04',
      eyebrowEn: 'Sleeve Architecture',
      eyebrowAr: 'هندسة الأكمام',
      titleEn: 'Sculptural Sleeve Flow',
      titleAr: 'أكمام انسيابية ذات تصميم هندسي فريد',
      descriptionEn:
        'Cut with dramatic proportions and considered balance, the sleeves drape with poetic motion, framing the wrist while allowing unrestricted comfort throughout day and evening affairs.',
      descriptionAr:
        'صُممت الأكمام باتساع انسيابي وتوازن دقيق، لتنسدل بحركة شاعرية تبرز جمال المعصم وتمنحك راحة تامة وحرية فائقة في جميع أوقاتك.',
      imageUrl: product.image || 'https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=1600&q=88',
      imageAltEn: 'Flowing sculptural sleeves with elegant drape',
      imageAltAr: 'انسيابية الأكمام وحركتها الساحرة',
      bgClass: 'bg-cream'
    },
    {
      id: 'movement',
      number: '05',
      eyebrowEn: 'Graceful Movement',
      eyebrowAr: 'الحركة والانسيابية',
      titleEn: 'Poetic Motion in Every Step',
      titleAr: 'انسيابية ساحرة مع كل خطوة',
      descriptionEn:
        'More than a garment, every Alora creation is engineered for kinetic grace—capturing the air gently to create a mesmerizing, royal presence wherever you arrive.',
      descriptionAr:
        'أكثر من مجرد تصميم، تُهندس كل قطعة من ألورا لتتحرك بانسيابية ملكية ساحرة وتتفاعل مع الهواء بنعومة، لتمنحك حضوراً مهيباً ولا يُنسى في كل مكان.',
      imageUrl: product.gallery && product.gallery[0] ? product.gallery[0].url : 'https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=1600&q=88',
      imageAltEn: 'Full silhouette showing graceful movement in light',
      imageAltAr: 'إطلالة متكاملة تبرز انسيابية الحركة في الضوء',
      bgClass: 'bg-sand'
    }
  ]

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Individual Premium Feature Sections */}
      {features.map((feature, index) => {
        // Alternating layout: index 0 is Image Left, index 1 is Text Left (Image Right), etc.
        const isImageLeft = index % 2 === 0

        return (
          <section
            key={feature.id}
            className={`py-12 sm:py-16 lg:py-20 border-b border-border2/60 relative overflow-hidden transition-colors ${feature.bgClass}`}
          >
            {/* Subtle background glow */}
            <div
              className={`absolute w-80 h-80 rounded-full blur-3xl pointer-events-none -z-0 opacity-35 ${
                isImageLeft ? 'bg-walnut/15 -bottom-20 -right-20' : 'bg-sand/60 -top-20 -left-20'
              }`}
            />

            <div className="container-alora relative z-10 w-full">
              <div
                className={`flex flex-col gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center justify-center ${
                  isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Refined Boutique Photography Column */}
                <div className="w-full lg:w-5/12 xl:w-5/12 shrink-0 flex justify-center">
                  <div className="relative aspect-[4/5] max-h-[480px] sm:max-h-[520px] w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] rounded-3xl overflow-hidden shadow-xl bg-cream border border-border2/70 group">
                    <img
                      src={feature.imageUrl}
                      alt={isArabic ? feature.imageAltAr : feature.imageAltEn}
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                </div>

                {/* Elegant Typography Storytelling Column */}
                <div className="w-full lg:w-6/12 xl:w-6/12 flex flex-col justify-center text-start max-w-xl">
                  <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.28em] text-walnut font-medium mb-3 sm:mb-4">
                    <span>{feature.number}</span>
                    <span className="w-6 h-px bg-walnut/60" />
                    <span>{isArabic ? feature.eyebrowAr : feature.eyebrowEn}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal tracking-tight leading-[1.25] mb-4 sm:mb-6">
                    {isArabic ? feature.titleAr : feature.titleEn}
                  </h3>

                  <p className="text-sm sm:text-base text-mocha leading-relaxed font-sans">
                    {isArabic ? feature.descriptionAr : feature.descriptionEn}
                  </p>

                  {/* Subtle decorative signature line */}
                  <div className="mt-8 sm:mt-10 pt-5 border-t border-border2/60 flex items-center justify-between text-xs text-mocha/70 font-sans uppercase tracking-widest">
                    <span>{isArabic ? product.nameAr : product.name}</span>
                    <span className="font-serif italic text-walnut capitalize">{isArabic ? 'صُنع بكل إتقان' : 'Masterpiece Edition'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
