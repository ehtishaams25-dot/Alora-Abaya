import { useTranslation } from 'react-i18next'
import { type ProductDress } from '../data/dressesData'
import { useProductDetail, ProductGallery, ProductPurchasePanel } from '../features/product'

interface QuickViewModalProps {
  product: ProductDress | null
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { i18n } = useTranslation()
  const [state, actions] = useProductDetail(product || ({} as ProductDress))

  if (!product) return null

  const isArabic = i18n.language.startsWith('ar')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-espresso/75 backdrop-blur-md animate-fade-up">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Zero-Scroll One-Pager Modal Dialog */}
      <div className="relative w-full max-w-6xl bg-cream rounded-3xl border border-border2 shadow-2xl overflow-hidden z-10 flex flex-col lg:flex-row h-[88vh] max-h-[680px]">
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 z-30 bg-sand/90 hover:bg-espresso hover:text-cream text-espresso p-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Photography Gallery (Stretches to modal height, zero scrolling) */}
        <div className="lg:w-7/12 bg-sand relative p-3 sm:p-5 h-full min-h-0 shrink-0 border-b lg:border-b-0 lg:border-e border-border2/60 overflow-hidden">
          <ProductGallery
            product={product}
            galleryViews={state.galleryViews}
            selectedImageIdx={state.selectedImageIdx}
            onSelectImage={actions.setSelectedImageIdx}
            isArabic={isArabic}
          />
        </div>

        {/* Right Side: Editorial Product Details & Quick Actions (Stretches to modal height, zero scrolling) */}
        <div className="lg:w-5/12 p-4 sm:p-6 lg:p-7 h-full min-h-0 overflow-hidden flex flex-col justify-between">
          <ProductPurchasePanel
            product={product}
            state={state}
            actions={actions}
            isArabic={isArabic}
            isModal={true}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  )
}
