import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../../../data/dressesData'
import { type ProductGalleryView } from '../types'

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
  selectedImageIdx,
  onSelectImage,
  isArabic
}: ProductGalleryProps) {
  const { t } = useTranslation()
  const title = isArabic ? (product.nameAr || product.name) : product.name
  const badgeText = isArabic ? (product.badgeAr || product.badge) : product.badge

  return (
    <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-3 sm:gap-4 overflow-hidden">
      {/* Vertically Stacked Thumbnails beside primary image on desktop (Horizontal on mobile/tablet) */}
      <div className="flex flex-row lg:flex-col gap-2 shrink-0 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:h-full py-1 lg:py-0 px-1 lg:px-0">
        {galleryViews.map((view, idx) => {
          const isSelected = selectedImageIdx === idx
          const label = t(view.labelKey, isArabic ? view.labelAr : view.labelEn)

          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={`w-14 h-18 sm:w-16 sm:h-21 lg:w-16 lg:h-21 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 relative group ${
                isSelected
                  ? 'border-espresso shadow-md scale-102 z-10'
                  : 'border-border2/60 opacity-65 hover:opacity-100 hover:border-walnut'
              }`}
              title={label}
              aria-label={label}
            >
              <img
                src={view.url}
                alt={`${title} - ${label}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Subtle overlay indicator on active thumbnail */}
              {isSelected && (
                <div className="absolute inset-0 ring-1 ring-inset ring-espresso/20 rounded-xl pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* Primary Editorial Image Container with Smooth Crossfade Animation - Exactly fills height */}
      <div className="relative flex-1 w-full h-[380px] sm:h-[450px] lg:h-full min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-sand border border-border2/60 shadow-sm">
        {galleryViews.map((view, idx) => {
          const isSelected = selectedImageIdx === idx
          const label = t(view.labelKey, isArabic ? view.labelAr : view.labelEn)

          return (
            <div
              key={view.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isSelected ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={view.url}
                alt={`${title} - ${label}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )
        })}

        {/* Product Badge Top Corner */}
        {badgeText && (
          <span className="absolute top-4 start-4 sm:top-6 sm:start-6 bg-walnut/95 backdrop-blur-md text-cream text-[10px] sm:text-xs uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full font-medium shadow-sm z-20">
            {badgeText}
          </span>
        )}

        {/* Current View Editorial Caption Pill Bottom Corner */}
        <div className="absolute bottom-4 start-4 sm:bottom-6 sm:start-6 z-20">
          <span className="bg-espresso/85 backdrop-blur-md text-cream text-[10px] sm:text-[11px] uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full font-sans font-medium shadow-sm inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulse" />
            <span>
              {t(
                galleryViews[selectedImageIdx]?.labelKey || '',
                isArabic
                  ? galleryViews[selectedImageIdx]?.labelAr
                  : galleryViews[selectedImageIdx]?.labelEn
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
