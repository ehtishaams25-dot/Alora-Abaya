import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'
import { type ProductGalleryView } from '../types'
import { ReactLenis } from 'lenis/react'

interface ProductGalleryProps {
  product: ProductDress
  galleryViews: ProductGalleryView[]
  selectedImageIdx: number
  onSelectImage: (idx: number) => void
  isArabic: boolean
}

export function ProductGallery({
  product,
  galleryViews,
  isArabic
}: ProductGalleryProps) {
  const { t } = useTranslation()
  const title = isArabic ? (product.nameAr || product.name) : product.name
  const badgeText = isArabic ? (product.badgeAr || product.badge) : product.badge

  return (
    <div className="w-full lg:h-full relative overflow-hidden bg-sand animate-[fadeIn_0.8s_ease-out_0.1s_both]">
      {/* Scrollable Gallery Container */}
      <ReactLenis className="w-full h-full overflow-x-auto overflow-y-hidden lg:overflow-y-auto lg:overflow-x-hidden no-scrollbar flex snap-x snap-mandatory lg:snap-y lg:snap-proximity" options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
        <div className="flex flex-row lg:flex-col w-full h-full">
          {galleryViews.map((view) => {
            const label = t(view.labelKey, isArabic ? view.labelAr : view.labelEn)

            return (
              <div
                key={view.id}
                className="w-full h-auto lg:h-auto flex-shrink-0 snap-center lg:snap-start relative aspect-[4/5] lg:aspect-auto"
              >
                <img
                  src={view.url}
                  alt={`${title} - ${label}`}
                  className="w-full h-full object-cover object-top block"
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      </ReactLenis>

      {/* Editorial Collection Badge Overlay */}
      {badgeText && (
        <div className="absolute top-4 start-4 z-20 bg-espresso/90 backdrop-blur-md text-cream px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] rtl:tracking-[0.05em] font-medium font-sans shadow-xs pointer-events-none">
          {badgeText}
        </div>
      )}
    </div>
  )
}
