import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { type ProductDress } from '../../../data/dressesData'
import { useProductDetail } from '../hooks/useProductDetail'
import { ProductGallery } from './ProductGallery'
import { ProductPurchasePanel } from './ProductPurchasePanel'

interface ProductDetailPageProps {
  product: ProductDress
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')
  const [state, actions] = useProductDetail(product)

  const title = isArabic ? (product.nameAr || product.name) : product.name
  const categoryLabel = isArabic ? product.categoryAr : product.category

  return (
    <div className="bg-sand lg:h-[calc(100vh-80px)] flex flex-col justify-center py-4 sm:py-6 lg:py-4 animate-fade-up">
      <div className="container-layali flex flex-col h-full max-h-[760px] my-auto">
        {/* Editorial Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[11px] font-sans text-mocha mb-3 sm:mb-4 tracking-wider uppercase shrink-0">
          <Link to="/" className="hover:text-espresso transition-colors">
            {t('common.home', isArabic ? 'الرئيسية' : 'Home')}
          </Link>
          <span>/</span>
          <Link
            to={`/dresses?category=${encodeURIComponent(product.category)}`}
            className="hover:text-espresso transition-colors"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-espresso font-medium truncate max-w-[220px] sm:max-w-xs">
            {title}
          </span>
        </nav>

        {/* Zero-Scroll One-Section Layout: Exactly fills remaining screen height */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-10 items-stretch flex-1 min-h-0 lg:h-[580px] xl:h-[640px]">
          {/* Left Column: Photography Gallery (Stretch to exact container height) */}
          <div className="w-full lg:w-7/12 xl:w-2/3 h-full min-h-0">
            <ProductGallery
              product={product}
              galleryViews={state.galleryViews}
              selectedImageIdx={state.selectedImageIdx}
              onSelectImage={actions.setSelectedImageIdx}
              isArabic={isArabic}
            />
          </div>

          {/* Right Column: Purchasing Details Panel (Stretch to exact container height) */}
          <div className="w-full lg:w-5/12 xl:w-1/3 h-full min-h-0">
            <ProductPurchasePanel
              product={product}
              state={state}
              actions={actions}
              isArabic={isArabic}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
