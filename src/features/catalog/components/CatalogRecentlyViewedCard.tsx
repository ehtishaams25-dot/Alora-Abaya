import { useNavigate } from 'react-router-dom'
import { TFunction } from 'i18next'
import { ProductDress } from '@/data/dressesData'
import { useLongPressQuickView } from '@/hooks/useLongPressQuickView'

interface CatalogRecentlyViewedCardProps {
  item: ProductDress
  isArabic: boolean
  t: TFunction
  handleProductInteract: (item: ProductDress) => void
  setQuickViewProduct: (item: ProductDress | null) => void
}

export function CatalogRecentlyViewedCard({
  item,
  isArabic,
  t,
  handleProductInteract,
  setQuickViewProduct
}: CatalogRecentlyViewedCardProps) {
  const navigate = useNavigate()
  const { longPressProps } = useLongPressQuickView({
    product: item,
    onQuickView: () => {
      handleProductInteract(item)
      setQuickViewProduct(item)
    },
    onNavigate: () => {
      handleProductInteract(item)
      navigate(`/product/${item.id}`)
    }
  })

  return (
    <div
      {...longPressProps}
      className="card-product group flex flex-col flex-shrink-0 w-[220px] sm:w-[250px] snap-start bg-cream rounded-2xl overflow-hidden cursor-pointer shadow-none transition-all duration-500 border border-border2/40 select-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img
          src={item.image}
          alt={isArabic ? (item.nameAr || item.name) : item.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3.5 sm:p-4 bg-cream">
        <h3 className="font-serif text-xs sm:text-sm text-espresso font-medium line-clamp-1 group-hover:text-walnut transition-colors">
          {isArabic ? (item.nameAr || item.name) : item.name}
        </h3>
        <p className="text-[11px] font-sans text-mocha mt-1 uppercase font-semibold">
          {item.price} {t('common.priceAed', 'SAR')}
        </p>
      </div>
    </div>
  )
}
