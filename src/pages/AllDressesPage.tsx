import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { QuickViewModal } from '../components/QuickViewModal'
import { DRESSES_DATA, type ProductDress } from '../data/dressesData'
import { useShop } from '../providers/ShopProvider'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLongPressQuickView } from '../hooks/useLongPressQuickView'

function AllDressesProductCard({
  item,
  isArabic,
  t,
  isInWishlist,
  addToWishlist,
  removeFromWishlist,
  handleQuickAdd,
  handleProductInteract,
  setQuickViewProduct
}: {
  item: ProductDress
  isArabic: boolean
  t: any
  isInWishlist: (id: string) => boolean
  addToWishlist: (item: ProductDress) => void
  removeFromWishlist: (id: string) => void
  handleQuickAdd: (e: React.MouseEvent, item: ProductDress) => void
  handleProductInteract: (item: ProductDress) => void
  setQuickViewProduct: (item: ProductDress | null) => void
}) {
  const navigate = useNavigate()
  const inWishlist = isInWishlist(item.id)
  const title = isArabic ? (item.nameAr || item.name) : item.name
  const badgeText = isArabic ? (item.badgeAr || item.badge) : item.badge

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
      className="card-product group flex flex-col bg-cream rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-none relative select-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img
          src={item.image}
          alt={title}
          className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${item.secondImage ? 'group-hover:opacity-0 transition-opacity duration-700' : ''}`}
          loading="lazy"
        />

        {item.secondImage && (
          <img
            src={item.secondImage}
            alt={`${title} back view`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {badgeText && (
          <span className="absolute top-3 start-3 sm:top-3.5 sm:start-3.5 bg-walnut/95 backdrop-blur-md text-cream text-[9px] sm:text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium shadow-xs z-10">
            {badgeText}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (inWishlist) {
              removeFromWishlist(item.id)
            } else {
              addToWishlist(item)
            }
          }}
          className="absolute top-3 end-3 sm:top-3.5 sm:end-3.5 bg-cream/90 backdrop-blur-md text-espresso hover:text-walnut p-2 sm:p-2.5 rounded-full shadow-2xs transition-all duration-300 z-10 cursor-pointer group/heart"
          aria-label={inWishlist ? (isArabic ? 'إزالة من المفضلة' : 'Remove from Wishlist') : (isArabic ? 'أضف للمفضلة' : 'Add to Wishlist')}
        >
          <svg
            className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 ${inWishlist ? 'fill-espresso text-espresso scale-110' : 'fill-none stroke-current'}`}
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <div className="absolute bottom-3 inset-x-3 hidden lg:flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={(e) => handleQuickAdd(e, item)}
            className="bg-cream/95 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream py-1.5 px-2.5 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap border border-border2/50 shrink-0"
            title={isArabic ? 'إضافة للحقيبة' : 'Quick Add to Bag'}
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none shrink-0" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span>{isArabic ? 'إضافة' : 'Quick Add'}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleProductInteract(item)
              setQuickViewProduct(item)
            }}
            className="flex-1 bg-cream/95 backdrop-blur-md text-espresso hover:bg-walnut hover:text-cream py-1.5 px-3 rounded-xl text-[9px] uppercase tracking-[0.15em] font-medium shadow-sm transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap border border-border2/50"
          >
            <span>{isArabic ? 'نظرة سريعة' : 'Quick View'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => handleQuickAdd(e, item)}
          className="lg:hidden absolute bottom-3 end-3 w-8 h-8 rounded-full bg-cream/90 backdrop-blur-md text-espresso hover:bg-espresso hover:text-cream shadow-sm flex items-center justify-center transition-colors z-10"
          title={isArabic ? 'إضافة سريعة للحقيبة' : 'Quick Add to Bag'}
        >
          <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.6" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>

      <div className="p-3.5 sm:p-4.5 flex flex-col flex-1 justify-between bg-cream">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-mocha font-sans mb-1">
            <span className="uppercase tracking-wider">{isArabic ? item.categoryAr : item.category}</span>
            <span className="text-taupe">★ {item.rating}</span>
          </div>
          <h3 className="font-serif text-xs sm:text-sm lg:text-base text-espresso font-medium leading-snug group-hover:text-walnut transition-colors line-clamp-1">
            {title}
          </h3>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-border2/60 flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-sans text-espresso font-semibold uppercase tracking-wider truncate">
            {item.price} {t('common.priceAed', 'SAR')}
          </span>

          {item.colors && item.colors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              {item.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full border border-border2 shadow-2xs inline-block"
                  style={{ backgroundColor: col }}
                  title={isArabic ? item.colorNamesAr?.[idx] : item.colorNames?.[idx]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RecentlyViewedProductCard({
  item,
  isArabic,
  t,
  handleProductInteract,
  setQuickViewProduct
}: {
  item: ProductDress
  isArabic: boolean
  t: any
  handleProductInteract: (item: ProductDress) => void
  setQuickViewProduct: (item: ProductDress | null) => void
}) {
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

export function AllDressesPage() {
  const { t, i18n } = useTranslation()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop()
  const [searchParams, setSearchParams] = useSearchParams()
  const isArabic = i18n.language.startsWith('ar')

  useDocumentTitle(isArabic ? 'الورا للفساتين | كافة العبايات والفساتين الفاخرة' : 'Alora | All Dresses & Gowns')

  // Read initial query params if user clicked a specific category from home page
  const initialCategoryParam = searchParams.get('category') || ''

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategoryParam ? [initialCategoryParam] : []
  )
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(5000)
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  // Sort State: 'newest' | 'bestsellers' | 'price-asc' | 'price-desc' | 'featured'
  const [sortBy, setSortBy] = useState<string>('newest')

  // Pagination / Load More State
  const [visibleCount, setVisibleCount] = useState<number>(12)

  // Mobile Bottom Sheet Filter State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false)

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)

  // Recently Viewed State (stored in localStorage + state)
  const [recentlyViewed, setRecentlyViewed] = useState<ProductDress[]>(() => {
    const saved = localStorage.getItem('alora_recently_viewed')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* fallback */ }
    }
    return DRESSES_DATA.slice(0, 6)
  })

  // Toast State for Quick Add
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Accordion Sections Open/Closed States
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sort: true,
    category: true,
    size: true,
    color: true,
    price: true,
    fabric: true,
    collection: true,
    availability: true
  })

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }))
  }

  // Sync state with search params if category changes externally
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat])
    }
  }, [searchParams])

  const handleProductInteract = (product: ProductDress) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      const updated = [product, ...filtered].slice(0, 8)
      localStorage.setItem('alora_recently_viewed', JSON.stringify(updated))
      return updated
    })
  }

  // Filter & Sort Computation
  const filteredProducts = useMemo(() => {
    return DRESSES_DATA.filter((item) => {
      // Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false
      }
      // Size Filter
      if (selectedSizes.length > 0 && !item.sizes.some((s) => selectedSizes.includes(s))) {
        return false
      }
      // Color Filter (match either color hex or name)
      if (selectedColors.length > 0) {
        const matchesColor = item.colorNames.some((name) => selectedColors.includes(name)) ||
          item.colors.some((hex) => selectedColors.includes(hex))
        if (!matchesColor) return false
      }
      // Price Filter
      if (item.numericPrice > maxPrice) {
        return false
      }
      // Fabric Filter
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(item.fabric)) {
        return false
      }
      // Collection Filter
      if (selectedCollections.length > 0 && !selectedCollections.includes(item.collection)) {
        return false
      }
      // Availability Filter
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(item.availability)) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sortBy === 'bestsellers') {
        return b.salesCount - a.salesCount
      }
      if (sortBy === 'price-asc') {
        return a.numericPrice - b.numericPrice
      }
      if (sortBy === 'price-desc') {
        return b.numericPrice - a.numericPrice
      }
      return 0 // 'featured' retains DRESSES_DATA default order
    })
  }, [
    selectedCategories,
    selectedSizes,
    selectedColors,
    maxPrice,
    selectedFabrics,
    selectedCollections,
    selectedAvailability,
    sortBy
  ])

  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setMaxPrice(5000)
    setSelectedFabrics([])
    setSelectedCollections([])
    setSelectedAvailability([])
    setSearchParams({})
  }

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
  }

  const handleQuickAdd = (e: React.MouseEvent, product: ProductDress) => {
    e.stopPropagation()
    handleProductInteract(product)
    const defaultColor = product.colorNames?.[0] || "Signature"
    const defaultSize = product.sizes?.[0] || "S"
    addToCart(product, `${defaultColor} (${product.colors?.[0] || '#3B2F2F'})`, `Size ${defaultSize}`)
    setToastMessage(isArabic ? `تمت إضافة "${product.nameAr || product.name}" إلى الحقيبة` : `Added "${product.name}" to bag`)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Filter definitions for elegant rendering
  const sortOptions = [
    { id: 'newest', label: isArabic ? 'الأحدث وصولاً' : 'Newest' },
    { id: 'bestsellers', label: isArabic ? 'الأكثر مبيعاً' : 'Best Sellers' },
    { id: 'price-asc', label: isArabic ? 'السعر: من الأقل للأعلى' : 'Price: Low to High' },
    { id: 'price-desc', label: isArabic ? 'السعر: من الأعلى للأقل' : 'Price: High to Low' },
    { id: 'featured', label: isArabic ? 'المختارة بالأتليه' : 'Featured' }
  ]

  const categoriesList = [
    { id: 'Abayas', label: isArabic ? 'عبايات' : 'Abayas' },
    { id: 'Dresses', label: isArabic ? 'فساتين' : 'Dresses' },
    { id: 'Kaftans', label: isArabic ? 'كفطان' : 'Kaftans' },
    { id: 'Occasion Wear', label: isArabic ? 'فساتين سهرة' : 'Occasion Wear' }
  ]

  const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const colorsList = [
    { name: 'Cream', labelAr: 'كريمي عاجي', hex: '#FAF9F6' },
    { name: 'Beige', labelAr: 'بيج رملي', hex: '#E6DCCA' },
    { name: 'Black', labelAr: 'أسود ليلي', hex: '#1A1A1A' },
    { name: 'Brown', labelAr: 'بني شوكولا', hex: '#5C4033' },
    { name: 'Olive', labelAr: 'زيتي زمردي', hex: '#4A5D23' },
    { name: 'White', labelAr: 'أبيض ناصع', hex: '#FFFFFF' },
    { name: 'Grey', labelAr: 'رمادي لؤلؤي', hex: '#808080' }
  ]

  const fabricsList = [
    { id: 'Cotton', label: isArabic ? 'قطن مصري' : 'Cotton' },
    { id: 'Linen', label: isArabic ? 'كتان طبيعي' : 'Linen' },
    { id: 'Silk', label: isArabic ? 'حرير خالص' : 'Silk' },
    { id: 'Crepe', label: isArabic ? 'كريب ياباني' : 'Crepe' },
    { id: 'Satin', label: isArabic ? 'ساتان حريري' : 'Satin' }
  ]

  const collectionsList = [
    { id: 'New Arrival', label: isArabic ? 'وصل حديثاً' : 'New Arrival' },
    { id: 'Best Seller', label: isArabic ? 'الأكثر مبيعاً' : 'Best Seller' },
    { id: 'Limited Edition', label: isArabic ? 'إصدار محدود' : 'Limited Edition' },
    { id: 'Exclusive', label: isArabic ? 'حصري بالأتليه' : 'Exclusive' }
  ]

  const availabilityList = [
    { id: 'In Stock', label: isArabic ? 'متوفر فوراً' : 'In Stock' },
    { id: 'Pre Order', label: isArabic ? 'طلب مسبق / تفصيل' : 'Pre Order' }
  ]

  const activeFilterCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    selectedFabrics.length +
    selectedCollections.length +
    selectedAvailability.length +
    (maxPrice < 5000 ? 1 : 0)

  // Render Sidebar Content (Sort By at Top + Accordion Filter Sections)
  const renderSidebarContent = () => (
    <div className="flex flex-col text-sm font-sans select-none pe-2">
      {/* Active Filters Summary Header if any */}
      {activeFilterCount > 0 && (
        <div className="pb-4 mb-4 border-b border-border2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-espresso">
            {isArabic ? `الفلاتر المحددة (${activeFilterCount})` : `Active Filters (${activeFilterCount})`}
          </span>
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-taupe hover:text-espresso underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            {isArabic ? 'مسح الكل' : 'Clear All'}
          </button>
        </div>
      )}

      {/* 0. Sort By Section inside Left Sidebar */}
      <div className="border-b border-border2/60 pb-5 mb-1">
        <button
          type="button"
          onClick={() => toggleSection('sort')}
          className="w-full flex items-center justify-between py-1.5 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'الترتيب حسب' : 'Sort By'}</span>
          <span className="text-mocha text-sm">{openSections.sort ? '−' : '+'}</span>
        </button>
        {openSections.sort && (
          <div className="mt-3.5 flex flex-col gap-2.5 animate-fade-up">
            {sortOptions.map((opt) => {
              const checked = sortBy === opt.id
              return (
                <label
                  key={opt.id}
                  className="flex items-center gap-3 cursor-pointer text-mocha hover:text-espresso transition-colors text-xs sm:text-sm py-0.5"
                >
                  <input
                    type="radio"
                    name="sidebar-sort"
                    checked={checked}
                    onChange={() => setSortBy(opt.id)}
                    className="w-3.5 h-3.5 text-espresso border-border2 focus:ring-0 cursor-pointer accent-espresso"
                  />
                  <span className={checked ? 'text-espresso font-medium' : ''}>{opt.label}</span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 1. Category Section */}
      <div className="border-b border-border2/60 py-5">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'التصنيف الفاخر' : 'Category'}</span>
          <span className="text-mocha text-sm">{openSections.category ? '−' : '+'}</span>
        </button>
        {openSections.category && (
          <div className="mt-4 flex flex-col gap-2.5 animate-fade-up">
            {categoriesList.map((cat) => {
              const checked = selectedCategories.includes(cat.id)
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between gap-3 cursor-pointer text-mocha hover:text-espresso transition-colors text-xs sm:text-sm py-0.5 group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleArrayItem(setSelectedCategories, cat.id)}
                      className="w-4 h-4 rounded border-border2 text-espresso focus:ring-0 cursor-pointer accent-espresso"
                    />
                    <span className={checked ? 'text-espresso font-medium' : ''}>{cat.label}</span>
                  </div>
                  <span className="text-xs text-mocha/60">
                    ({DRESSES_DATA.filter((p) => p.category === cat.id).length})
                  </span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 2. Size Section */}
      <div className="border-b border-border2/60 py-5">
        <button
          type="button"
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'المقاس' : 'Size'}</span>
          <span className="text-mocha text-sm">{openSections.size ? '−' : '+'}</span>
        </button>
        {openSections.size && (
          <div className="mt-4 grid grid-cols-3 gap-2 animate-fade-up">
            {sizesList.map((size) => {
              const selected = selectedSizes.includes(size)
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleArrayItem(setSelectedSizes, size)}
                  className={`py-2 rounded-xl text-xs uppercase tracking-wider font-medium border transition-all cursor-pointer ${selected
                    ? 'bg-espresso text-cream border-espresso shadow-xs'
                    : 'bg-cream text-espresso border-border2/80 hover:border-walnut'
                    }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 3. Color Section */}
      <div className="border-b border-border2/60 py-5">
        <button
          type="button"
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'درجات الألوان' : 'Color'}</span>
          <span className="text-mocha text-sm">{openSections.color ? '−' : '+'}</span>
        </button>
        {openSections.color && (
          <div className="mt-4 flex flex-wrap gap-3 animate-fade-up">
            {colorsList.map((col) => {
              const selected = selectedColors.includes(col.name)
              return (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => toggleArrayItem(setSelectedColors, col.name)}
                  className="flex flex-col items-center gap-1.5 cursor-pointer p-1 transition-all"
                  title={isArabic ? col.labelAr : col.name}
                >
                  <span className="group relative w-7 h-7 rounded-full flex-shrink-0">
                    <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      selected ? 'border-2 border-espresso shadow-xs' : 'border border-transparent group-hover:border-border2'
                    }`} />
                    <span
                      className="absolute inset-1 rounded-full border border-black/10 shadow-inner flex items-center justify-center transition-transform duration-300"
                      style={{ backgroundColor: col.hex }}
                    >
                      {selected && (
                        <span className={`w-1 h-1 rounded-full ${col.hex.toLowerCase() === '#ffffff' || col.hex.toLowerCase() === '#faf9f6' ? 'bg-espresso' : 'bg-cream'}`} />
                      )}
                    </span>
                  </span>
                  <span className={`text-[10px] tracking-wide ${selected ? 'text-espresso font-medium' : 'text-mocha'}`}>
                    {isArabic ? col.labelAr : col.name}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 4. Luxury Price Slider Section */}
      <div className="border-b border-border2/60 py-5">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'نطاق السعر (ر.س)' : 'Price Range (SAR)'}</span>
          <span className="text-mocha text-sm">{openSections.price ? '−' : '+'}</span>
        </button>
        {openSections.price && (
          <div className="mt-5 animate-fade-up flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-semibold text-espresso">
              <span>1,000 {t('common.priceAed', 'SAR')}</span>
              <span>{maxPrice.toLocaleString()} {t('common.priceAed', 'SAR')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-espresso bg-border2 h-1.5 rounded-lg cursor-pointer transition-all"
            />
            <div className="flex justify-between text-[11px] text-mocha">
              <span>{isArabic ? 'حتى 5,000 ر.س' : 'Up to 5,000 SAR'}</span>
              {maxPrice < 5000 && (
                <button
                  type="button"
                  onClick={() => setMaxPrice(5000)}
                  className="text-taupe hover:text-espresso underline text-[10px]"
                >
                  {isArabic ? 'إعادة ضبط' : 'Reset'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Fabric Section */}
      <div className="border-b border-border2/60 py-5">
        <button
          type="button"
          onClick={() => toggleSection('fabric')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'نوع النسيج' : 'Fabric'}</span>
          <span className="text-mocha text-sm">{openSections.fabric ? '−' : '+'}</span>
        </button>
        {openSections.fabric && (
          <div className="mt-4 flex flex-col gap-2.5 animate-fade-up">
            {fabricsList.map((fab) => {
              const checked = selectedFabrics.includes(fab.id)
              return (
                <label
                  key={fab.id}
                  className="flex items-center justify-between gap-3 cursor-pointer text-mocha hover:text-espresso transition-colors text-xs sm:text-sm py-0.5"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleArrayItem(setSelectedFabrics, fab.id)}
                      className="w-4 h-4 rounded border-border2 text-espresso focus:ring-0 cursor-pointer accent-espresso"
                    />
                    <span className={checked ? 'text-espresso font-medium' : ''}>{fab.label}</span>
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 6. Collection Section */}
      <div className="border-b border-border2/60 py-5">
        <button
          type="button"
          onClick={() => toggleSection('collection')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'المجموعة والإصدار' : 'Collection'}</span>
          <span className="text-mocha text-sm">{openSections.collection ? '−' : '+'}</span>
        </button>
        {openSections.collection && (
          <div className="mt-4 flex flex-col gap-2.5 animate-fade-up">
            {collectionsList.map((col) => {
              const checked = selectedCollections.includes(col.id)
              return (
                <label
                  key={col.id}
                  className="flex items-center justify-between gap-3 cursor-pointer text-mocha hover:text-espresso transition-colors text-xs sm:text-sm py-0.5"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleArrayItem(setSelectedCollections, col.id)}
                      className="w-4 h-4 rounded border-border2 text-espresso focus:ring-0 cursor-pointer accent-espresso"
                    />
                    <span className={checked ? 'text-espresso font-medium' : ''}>{col.label}</span>
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 7. Availability Section */}
      <div className="py-5">
        <button
          type="button"
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between py-1 text-espresso font-medium uppercase tracking-[0.2em] text-xs transition-colors cursor-pointer"
        >
          <span>{isArabic ? 'حالة التوفر' : 'Availability'}</span>
          <span className="text-mocha text-sm">{openSections.availability ? '−' : '+'}</span>
        </button>
        {openSections.availability && (
          <div className="mt-4 flex flex-col gap-2.5 animate-fade-up">
            {availabilityList.map((avail) => {
              const checked = selectedAvailability.includes(avail.id)
              return (
                <label
                  key={avail.id}
                  className="flex items-center justify-between gap-3 cursor-pointer text-mocha hover:text-espresso transition-colors text-xs sm:text-sm py-0.5"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleArrayItem(setSelectedAvailability, avail.id)}
                      className="w-4 h-4 rounded border-border2 text-espresso focus:ring-0 cursor-pointer accent-espresso"
                    />
                    <span className={checked ? 'text-espresso font-medium' : ''}>{avail.label}</span>
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-sand text-espresso font-sans flex flex-col selection:bg-taupe/20 selection:text-espresso">
      {/* Navigation Top Bar */}
      <Navigation />

      {/* Toast Notification for Quick Add */}
      {toastMessage && (
        <div className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 rtl:right-auto rtl:left-6 sm:rtl:left-8 z-[100] bg-espresso text-cream px-6 py-3.5 rounded-full shadow-2xl text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2.5 animate-fade-up pointer-events-auto border border-cream/10">
          <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section — Elegant, Restrained with generous padding */}


      {/* Main Content Area: Persistent Left Sidebar + Spacious Product Grid */}
      <main className="flex-1 container-alora px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Header Bar (when sidebar is hidden on mobile screens) */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border2/60 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-espresso font-semibold">
              {isArabic ? `${filteredProducts.length} قطعة` : `${filteredProducts.length} Pieces`}
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-cream border border-border2 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-mocha font-medium">
                ({activeFilterCount})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="bg-espresso text-cream rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2 shadow-xs cursor-pointer hover:bg-ink transition-colors"
          >
            <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <span>{isArabic ? 'تصفية وترتيب' : 'Filter & Sort'}</span>
          </button>
        </div>

        <div className="flex items-start gap-8 xl:gap-12">
          {/* Desktop Persistent Left Sidebar (with Sort By right at top!) */}
          <aside aria-label="Filters" className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 border-e border-border2/80 pe-6 xl:pe-8 sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pb-10">
            {renderSidebarContent()}
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Active filters summary bar on desktop if filtered */}
            {activeFilterCount > 0 && (
              <div className="hidden lg:flex items-center justify-between pb-6 mb-6 border-b border-border2/60 text-xs text-mocha">
                <span>
                  {isArabic ? `عرض ${filteredProducts.length} من 245 قطعة` : `Showing ${filteredProducts.length} of 245 Pieces`}
                </span>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-taupe hover:text-espresso underline underline-offset-4 font-medium transition-colors cursor-pointer"
                >
                  {isArabic ? 'مسح كافة الفلاتر' : 'Clear All Filters'}
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              /* Editorial Empty State */
              <div className="max-w-xl mx-auto text-center py-16 sm:py-24 animate-fade-up bg-cream/70 rounded-3xl border border-border2 p-6 sm:p-12">
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-full bg-sand border border-border2 flex items-center justify-center text-taupe">
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 stroke-current fill-none" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal mb-3">
                  {isArabic ? 'لم يتم العثور على فساتين' : 'No Dresses Found'}
                </h2>
                <p className="font-sans text-sm sm:text-base text-mocha leading-relaxed max-w-md mx-auto mb-8">
                  {isArabic
                    ? 'جربي تعديل خيارات التصفية أو استكشفي مجموعتنا الملكية الكاملة بدون قيود.'
                    : 'Try adjusting your filters or explore our complete collection.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="btn-primary px-8 py-3.5 w-full sm:w-auto"
                  >
                    {isArabic ? 'مسح كافة الفلاتر' : 'Clear Filters'}
                  </button>
                  <Link
                    to="/"
                    className="btn-secondary py-3.5 px-6 w-full sm:w-auto text-center"
                  >
                    {isArabic ? 'تصفح المجموعة' : 'Browse Collection'}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Responsive Grid: Desktop 4 columns, Tablet 3 columns, Mobile 2 columns with refined gap & padding */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-up">
                  {displayedProducts.map((item) => (
                    <AllDressesProductCard
                      key={item.id}
                      item={item}
                      isArabic={isArabic}
                      t={t}
                      isInWishlist={isInWishlist}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      handleQuickAdd={handleQuickAdd}
                      handleProductInteract={handleProductInteract}
                      setQuickViewProduct={setQuickViewProduct}
                    />
                  ))}
                </div>

                {/* Centered Load More Rounded Pill Button */}
                {hasMore && (
                  <div className="mt-12 sm:mt-16 text-center animate-fade-up">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="rounded-full bg-espresso text-cream hover:bg-ink px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      {isArabic
                        ? `تحميل المزيد من الفساتين (${filteredProducts.length - visibleCount} باقية)`
                        : `Load More (${filteredProducts.length - visibleCount} remaining)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Recently Viewed Carousel Section — with right-side fade mask to prevent awkward hard cropping */}
      {recentlyViewed.length > 0 && (
        <section aria-label="Recently Viewed" className="py-12 sm:py-16 bg-sand border-t border-border2/60 overflow-hidden">
          <div className="container-alora px-4 sm:px-6 lg:px-8">
            <header className="mb-8 text-start flex items-center justify-between">
              <div>
                <span className="text-eyebrow text-walnut block mb-1">
                  {isArabic ? 'سجل تصفحكِ الفاخر' : 'YOUR BROWSING HISTORY'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal">
                  {isArabic ? 'شوهدت مؤخراً بالأتليه' : 'Recently Viewed'}
                </h2>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-mocha">
                {isArabic ? `${recentlyViewed.length} قطع` : `${recentlyViewed.length} Pieces`}
              </span>
            </header>

            {/* Container with right gradient fade mask so edge items fade smoothly instead of getting sliced off */}
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="absolute top-0 bottom-4 end-0 w-16 sm:w-28 bg-gradient-to-l rtl:bg-gradient-to-r from-sand via-sand/80 to-transparent pointer-events-none z-10" />

              <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 sm:gap-6 pb-4 pe-16 sm:pe-28">
                {recentlyViewed.map((item) => (
                  <RecentlyViewedProductCard
                    key={item.id}
                    item={item}
                    isArabic={isArabic}
                    t={t}
                    handleProductInteract={handleProductInteract}
                    setQuickViewProduct={setQuickViewProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Small Elegant Newsletter Section before Footer */}
      <section className="py-12 sm:py-16 bg-cream border-t border-border2/80 text-center px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <span className="text-eyebrow text-walnut block mb-2">
            {isArabic ? 'انضمي لدائرة كبار العميلات' : 'VIP ATELIER CIRCLE'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-espresso tracking-tight font-normal mb-2.5">
            {isArabic ? 'ابقِ على تواصل واستلهام' : 'Stay Inspired'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-mocha leading-relaxed mb-8">
            {isArabic
              ? 'احصلي على وصول حصري ومبكر للمجموعات الملكية الجديدة والإصدارات الخالدة قبل الجميع.'
              : 'Receive exclusive access to new collections and timeless releases.'}
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder={isArabic ? 'أدخلي بريدكِ الإلكتروني الملكي...' : 'Enter your email address...'}
              className="input-underline text-center sm:text-start w-full sm:flex-1 py-2 text-sm"
            />
            <button
              type="submit"
              className="btn-primary py-3 px-8 w-full sm:w-auto flex-shrink-0 text-xs tracking-[0.2em]"
            >
              {isArabic ? 'انضمام' : 'Join'}
            </button>
          </form>
        </div>
      </section>

      {/* Reusing Existing Alora Footer without modification */}
      <Footer />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Mobile Full-Height Bottom Sheet Filters & Sort */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-sand animate-fade-up overflow-hidden">
          {/* Bottom Sheet Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border2 bg-sand/98 backdrop-blur-md shrink-0">
            <span className="font-serif text-xl text-espresso">
              {isArabic ? 'تصفية وترتيب العبايات' : 'Filter & Sort'}
            </span>
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(false)}
              className="text-espresso p-2 hover:text-walnut cursor-pointer"
              aria-label="Close filters"
            >
              <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Bottom Sheet Content (Scrollable with Sort By right at top!) */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {renderSidebarContent()}
          </div>

          {/* Bottom Sheet Footer Actions */}
          <div className="p-6 border-t border-border2 bg-cream/90 backdrop-blur-md shrink-0 flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                clearAllFilters()
                setIsMobileFiltersOpen(false)
              }}
              className="btn-secondary py-3.5 px-6 flex-1 text-center text-xs tracking-wider"
            >
              {isArabic ? 'مسح الفلاتر' : 'Clear Filters'}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(false)}
              className="btn-primary py-3.5 px-8 flex-1 text-center text-xs tracking-wider"
            >
              {isArabic ? `عرض (${filteredProducts.length}) قطعة` : `Show (${filteredProducts.length}) Pieces`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
