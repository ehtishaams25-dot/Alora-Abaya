import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { type VideoCarouselItem } from '../types'
import {
  Play,
  Heart,
  MessageCircle,
  Eye,
  Sparkles
} from 'lucide-react'

export function InstagramGallerySection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith('ar') || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl')

  const trackRef = useRef<HTMLDivElement>(null)
  const trackInnerRef = useRef<HTMLDivElement>(null)

  // Drag-to-scroll state
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const offsetRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const baseItems: VideoCarouselItem[] = [
    {
      id: "vid-1",
      ratio: "vertical",
      image: "https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=800&q=80",
      title: "Royal Velvet & Silk Abaya Walk",
      titleAr: "عرض عباية المخمل والحرير الملكي",
      subtitle: "Vertical • 4K Salon Runway",
      subtitleAr: "عمودي • عرض الصالون بدقة 4K",
      duration: "0:42",
      views: "24.8K",
      likes: "1,420",
      comments: "48"
    },
    {
      id: "vid-2",
      ratio: "horizontal",
      image: "https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=1000&q=80",
      title: "Milano Cathedral Shoot Behind The Scenes",
      titleAr: "كواليس تصوير كاتدرائية ميلانو في إيطاليا",
      subtitle: "Horizontal • Cinematic BTS Film",
      subtitleAr: "أفقي • كواليس سينمائية خاصة",
      duration: "1:15",
      views: "42.1K",
      likes: "2,180",
      comments: "92"
    },
    {
      id: "vid-3",
      ratio: "square",
      image: "https://images.unsplash.com/photo-1728487235101-664d87965931?auto=format&fit=crop&w=800&q=80",
      title: "Bespoke Silk Embroidery & Crystals Detail",
      titleAr: "تفاصيل تطريز الحرير والكريستال المصنوع يدوياً",
      subtitle: "Square • Atelier Craftsmanship",
      subtitleAr: "مربع • تركيز على حرفية المشغل",
      duration: "0:28",
      views: "18.5K",
      likes: "985",
      comments: "31"
    },
    {
      id: "vid-4",
      ratio: "vertical",
      image: "https://images.unsplash.com/photo-1736342182642-e2042084f47c?auto=format&fit=crop&w=800&q=80",
      title: "Evening Gala Double-Layered Drape",
      titleAr: "انسيابية طبقات الشيفون والمخمل لسهرة الغالا",
      subtitle: "Vertical • Evening Collection",
      subtitleAr: "عمودي • مجموعة السهرة الفاخرة",
      duration: "0:54",
      views: "51.3K",
      likes: "3,450",
      comments: "142"
    },
    {
      id: "vid-5",
      ratio: "horizontal",
      image: "https://images.unsplash.com/photo-1782025419629-d69df1556e0c?auto=format&fit=crop&w=1000&q=80",
      title: "Alora Private Trunk Show — London Mayfair",
      titleAr: "عرض ألورا الخاص — لندن مايفير",
      subtitle: "Horizontal • Event Chronicle",
      subtitleAr: "أفقي • يوميات الحدث الملوكي",
      duration: "1:30",
      views: "33.9K",
      likes: "1,760",
      comments: "64"
    },
    {
      id: "vid-6",
      ratio: "square",
      image: "https://images.unsplash.com/photo-1783753592044-6b9fd217be76?auto=format&fit=crop&w=800&q=80",
      title: "Golden Hour Desert Silhouette Campaign",
      titleAr: "حملة ظلال الصحراء في الساعة الذهبية",
      subtitle: "Square • Editorial Campaign",
      subtitleAr: "مربع • افتتاحية الموسم الذهبي",
      duration: "0:35",
      views: "39.4K",
      likes: "2,890",
      comments: "115"
    },
    {
      id: "vid-7",
      ratio: "vertical",
      image: "https://images.unsplash.com/photo-1762605135376-ae5af70a5628?auto=format&fit=crop&w=800&q=80",
      title: "Fluid Chiffon Layering Movement Test",
      titleAr: "اختبار انسيابية وحركة الشيفون المزدوج",
      subtitle: "Vertical • Studio Motion Study",
      subtitleAr: "عمودي • دراسة حركية في الاستوديو",
      duration: "0:18",
      views: "19.2K",
      likes: "1,530",
      comments: "58"
    },
    {
      id: "vid-8",
      ratio: "horizontal",
      image: "https://images.unsplash.com/photo-1772474500365-c2c520545f44?auto=format&fit=crop&w=1000&q=80",
      title: "Hand-Sewn Pearls & Metallic Thread Close-Up",
      titleAr: "لقطة مقربة للؤلؤ المخيط يدوياً والخيوط المعدنية",
      subtitle: "Horizontal • Macro Film Feature",
      subtitleAr: "أفقي • فيلم ماكرو عالي الدقة",
      duration: "1:05",
      views: "48.7K",
      likes: "3,120",
      comments: "128"
    }
  ]

  // Duplicate items 3 times for seamless infinite loop dragging
  const displayItems = [
    ...baseItems.map(item => ({ ...item, uniqueKey: `${item.id}-set1` })),
    ...baseItems.map(item => ({ ...item, uniqueKey: `${item.id}-set2` })),
    ...baseItems.map(item => ({ ...item, uniqueKey: `${item.id}-set3` }))
  ]

  // Initialize track position to the middle set and run continuous infinite auto-scroll
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const trackInner = trackInnerRef.current
    if (!track || !trackInner) return

    const initOffset = () => {
      const setWidth = trackInner.scrollWidth / 3
      if (setWidth > 0) {
        offsetRef.current = -setWidth
        trackInner.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
        trackInner.style.transition = 'none'
      }
    }

    const timer = window.setTimeout(initOffset, 120)

    let animId: number
    const speed = 0.7 // smooth speed in pixels per frame

    const animate = () => {
      if (!isDraggingRef.current && !isHoveredRef.current && trackInner.scrollWidth > 0) {
        const setWidth = trackInner.scrollWidth / 3
        if (setWidth > 0) {
          const nextOffset = offsetRef.current + speed * (isRTL ? 1 : -1)

          if (nextOffset <= -setWidth * 2) {
            offsetRef.current = -setWidth
          } else if (nextOffset >= 0) {
            offsetRef.current = -setWidth
          } else {
            offsetRef.current = nextOffset
          }

          trackInner.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
          trackInner.style.transition = 'none'
        }
      }
      animId = window.requestAnimationFrame(animate)
    }

    animId = window.requestAnimationFrame(animate)
    window.addEventListener('resize', initOffset)

    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(animId)
      window.removeEventListener('resize', initOffset)
    }
  }, [isRTL])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackInnerRef.current) return
    isDraggingRef.current = true
    setIsDragging(true)
    dragStartXRef.current = e.clientX
    dragStartOffsetRef.current = offsetRef.current
    trackInnerRef.current.style.transition = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackInnerRef.current) return
    e.preventDefault()
    const deltaX = e.clientX - dragStartXRef.current
    const nextOffset = dragStartOffsetRef.current + deltaX * (isRTL ? 1 : -1)
    offsetRef.current = nextOffset
    trackInnerRef.current.style.transform = `translate3d(${nextOffset}px, 0, 0)`
  }

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
  }

  const getCardDimensions = (ratio: VideoCarouselItem['ratio']) => {
    switch (ratio) {
      case 'vertical':
        return {
          wrapperClass: 'w-[250px] sm:w-[280px] lg:w-[320px]',
          imageClass: 'aspect-[3/4] sm:aspect-[4/5]'
        }
      case 'horizontal':
        return {
          wrapperClass: 'w-[320px] sm:w-[420px] lg:w-[480px]',
          imageClass: 'aspect-[16/10] sm:aspect-[16/9]'
        }
      case 'square':
        return {
          wrapperClass: 'w-[260px] sm:w-[330px] lg:w-[370px]',
          imageClass: 'aspect-square'
        }
    }
  }

  return (
    <section id="instagram" className="section-padding bg-cream border-t border-border2 overflow-hidden relative">
      <div className="container-alora">
        {/* Section Header (Centered, focused typography) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-eyebrow text-walnut mb-2 tracking-[0.25em] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-walnut animate-pulse" />
            {t('home.instagram.eyebrow', 'Social Chronicle')}
          </span>
          <h2 className="text-h2 font-serif text-espresso">
            {t('home.instagram.title', 'Lifestyle & Journal @AloraAbaya')}
          </h2>
          <p className="text-body text-mocha mt-3 text-sm sm:text-base">
            {t('home.instagram.description', 'Tag us or use #AloraAbayas to be featured in our monthly private salon chronicle.')}
          </p>
        </div>
      </div>

      {/* Continuous Infinite Scrolling Multi-Ratio Carousel Track (Pauses on Hover/Touch) */}
      <div
        ref={trackRef}
        style={{ direction: 'ltr' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={() => {
          isHoveredRef.current = false
          handleMouseUpOrLeave()
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true
        }}
        onTouchStart={() => {
          isHoveredRef.current = true
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false
        }}
        className={`overflow-hidden pt-2 pb-6 px-4 sm:px-8 lg:px-12 transition-all ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
      >
        <div ref={trackInnerRef} className="flex items-center gap-4 sm:gap-6 w-max will-change-transform">
          {displayItems.map((item) => {
            const dims = getCardDimensions(item.ratio)
            const titleText = isRTL ? item.titleAr : item.title
            const subtitleText = isRTL ? item.subtitleAr : item.subtitle

            return (
              <div
                key={item.uniqueKey}
                className={`flex-shrink-0 group flex flex-col transition-all duration-500 ${dims.wrapperClass}`}
              >
                {/* Card Media Box (Mono -> Color Hover Effect hardcoded) */}
                <div
                  className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-sand shadow-sm hover:shadow-2xl transition-all duration-700 grayscale-[96%] contrast-[1.05] group-hover:grayscale-0 group-hover:contrast-100 opacity-92 group-hover:opacity-100 ${dims.imageClass}`}
                >
                  <img
                    src={item.image}
                    alt={titleText}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108 pointer-events-none"
                    loading="lazy"
                  />

                  {/* Top Right: Video Play Duration Badge */}
                  <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 px-2.5 py-1 rounded-full bg-espresso/75 backdrop-blur-md text-cream text-[11px] font-sans font-medium tracking-wide flex items-center gap-1.5 shadow-xs border border-cream/15 pointer-events-none group-hover:bg-walnut transition-colors">
                    <Play className="w-3 h-3 fill-current text-sand" />
                    <span>{item.duration}</span>
                  </div>

                  {/* Hover / Touch Interactive Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-4 sm:p-5 pointer-events-none">
                    <div />

                    {/* Center Floating Play Button */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream/95 text-espresso flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-500 mx-auto my-auto border border-white/40">
                      <Play className="w-6 h-6 fill-current ms-0.5 text-espresso" />
                    </div>

                    {/* Bottom Stats & Metrics */}
                    <div className="flex items-center justify-between text-cream text-xs font-sans w-full border-t border-cream/20 pt-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                          <span>{item.likes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-cream/90" />
                          <span>{item.comments}</span>
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-cream/90 text-[11px] tracking-wide">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{item.views}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Typography Below */}
                <div className="mt-3.5 sm:mt-4 px-1.5 flex flex-col gap-1">
                  <h3 className="text-base sm:text-lg font-serif font-medium text-espresso group-hover:text-walnut transition-colors leading-snug line-clamp-1">
                    {titleText}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-mocha">
                    <span className="font-sans text-mocha/90">{subtitleText}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
