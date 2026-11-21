import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import { QuickViewModal } from '../components/QuickViewModal'
import { DRESSES_DATA, type ProductDress } from '../data/dressesData'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLongPressQuickView } from '../hooks/useLongPressQuickView'
import { useLenis } from 'lenis/react'

import { LuxuryProductCard } from '../components/ui/LuxuryProductCard'

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
  const isArabic = i18n.language.startsWith('ar')
  const [searchParams, setSearchParams] = useSearchParams()

  useDocumentTitle(isArabic ? 'الورا للفساتين | كافة الفساتين والفساتين الفاخرة' : 'Alora | All Dresses & Gowns')

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
  // Removed per request to load all automatically

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

  const lenis = useLenis()
  useEffect(() => {
    if (isMobileFiltersOpen) {
      const originalOverflow = document.body.style.overflow
      const originalHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      lenis?.stop()
      return () => {
        document.body.style.overflow = originalOverflow
        document.documentElement.style.overflow = originalHtmlOverflow
        lenis?.start()
      }
    }
  }, [isMobileFiltersOpen, lenis])

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

  const displayedProducts = filteredProducts

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

  // Filter definitions for elegant rendering
  const sortOptions = [
    { id: 'newest', label: isArabic ? 'الأحدث وصولاً' : 'Newest' },
    { id: 'bestsellers', label: isArabic ? 'الأكثر مبيعاً' : 'Best Sellers' },
    { id: 'price-asc', label: isArabic ? 'السعر: من الأقل للأعلى' : 'Price: Low to High' },
    { id: 'price-desc', label: isArabic ? 'السعر: من الأعلى للأقل' : 'Price: High to Low' },
    { id: 'featured', label: isArabic ? 'المختارة بالأتليه' : 'Featured' }
  ]

  const categoriesList = [
    { id: 'Dresses', label: isArabic ? 'فساتين' : 'Dresses' },
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
                <div
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className="flex items-center gap-4 cursor-pointer group py-2"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-300 ${checked ? 'border-espresso' : 'border-border2 group-hover:border-espresso'}`}>
                    {checked && <div className="w-2 h-2 rounded-full bg-espresso animate-fade-up" style={{ animationDuration: '0.2s' }} />}
                  </div>
                  <span className={`text-sm ${checked ? 'text-espresso font-medium' : 'text-mocha group-hover:text-espresso'} transition-colors`}>
                    {opt.label}
                  </span>
                </div>
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
            {categoriesList.map((cat, idx) => {
              // Ensure uniqueness if categoriesList has duplicates, using index for key fallback
              const uniqueKey = `${cat.id}-${idx}`
              const checked = selectedCategories.includes(cat.id)
              return (
                <div
                  key={uniqueKey}
                  onClick={() => toggleArrayItem(setSelectedCategories, cat.id)}
                  className="flex items-center justify-between gap-3 cursor-pointer group py-2"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${checked ? 'bg-espresso border-espresso' : 'border-border2 bg-transparent group-hover:border-espresso'}`}>
                      {checked && (
                        <svg className="w-3 h-3 text-cream animate-fade-up" style={{ animationDuration: '0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked ? 'text-espresso font-medium' : 'text-mocha group-hover:text-espresso'} transition-colors`}>
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-xs text-mocha/50">
                    ({DRESSES_DATA.filter((p) => p.category === cat.id).length})
                  </span>
                </div>
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
                  className={`py-2.5 rounded-none text-xs uppercase tracking-wider font-medium border transition-all cursor-pointer ${selected
                    ? 'bg-espresso text-cream border-espresso'
                    : 'bg-transparent text-espresso border-border2 hover:border-espresso hover:bg-espresso/5'
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
                <div
                  key={fab.id}
                  onClick={() => toggleArrayItem(setSelectedFabrics, fab.id)}
                  className="flex items-center justify-between gap-3 cursor-pointer group py-2"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${checked ? 'bg-espresso border-espresso' : 'border-border2 bg-transparent group-hover:border-espresso'}`}>
                      {checked && (
                        <svg className="w-3 h-3 text-cream animate-fade-up" style={{ animationDuration: '0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked ? 'text-espresso font-medium' : 'text-mocha group-hover:text-espresso'} transition-colors`}>
                      {fab.label}
                    </span>
                  </div>
                </div>
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
                <div
                  key={col.id}
                  onClick={() => toggleArrayItem(setSelectedCollections, col.id)}
                  className="flex items-center justify-between gap-3 cursor-pointer group py-2"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${checked ? 'bg-espresso border-espresso' : 'border-border2 bg-transparent group-hover:border-espresso'}`}>
                      {checked && (
                        <svg className="w-3 h-3 text-cream animate-fade-up" style={{ animationDuration: '0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked ? 'text-espresso font-medium' : 'text-mocha group-hover:text-espresso'} transition-colors`}>
                      {col.label}
                    </span>
                  </div>
                </div>
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
                <div
                  key={avail.id}
                  onClick={() => toggleArrayItem(setSelectedAvailability, avail.id)}
                  className="flex items-center justify-between gap-3 cursor-pointer group py-2"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${checked ? 'bg-espresso border-espresso' : 'border-border2 bg-transparent group-hover:border-espresso'}`}>
                      {checked && (
                        <svg className="w-3 h-3 text-cream animate-fade-up" style={{ animationDuration: '0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked ? 'text-espresso font-medium' : 'text-mocha group-hover:text-espresso'} transition-colors`}>
                      {avail.label}
                    </span>
                  </div>
                </div>
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

      {/* Hero Section — Wide Banner Image with Centered Text */}
      <div className="relative w-full h-[30vh] sm:h-[35vh] lg:h-[40vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/alora_dresses_banner.png`} 
            alt={isArabic ? 'أناقة خالدة' : 'Timeless Elegance'} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight font-normal leading-[1.1] drop-shadow-lg">
            {isArabic ? 'أناقة خالدة، مصممة لكِ' : 'Timeless Elegance, Crafted for You.'}
          </h1>
        </div>
      </div>

      {/* Main Content Area: Persistent Left Sidebar + Spacious Product Grid */}
      <main className="flex-1 container-alora px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        {/* Universal Filter & Sort Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border2/60">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-espresso font-semibold">
              {isArabic ? `عرض ${filteredProducts.length} من ${DRESSES_DATA.length} قطعة` : `Showing ${filteredProducts.length} of ${DRESSES_DATA.length} Pieces`}
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-cream border border-border2 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-mocha font-medium">
                ({activeFilterCount})
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="hidden sm:block text-xs text-taupe hover:text-espresso underline underline-offset-4 font-medium transition-colors cursor-pointer"
              >
                {isArabic ? 'مسح الفلاتر' : 'Clear Filters'}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="bg-espresso text-cream rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium flex items-center gap-2 shadow-xs cursor-pointer hover:bg-ink transition-colors"
            >
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              <span>{isArabic ? 'تصفية وترتيب' : 'Filter & Sort'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-12 xl:gap-20">
          {/* Product Grid Area (Full Width) */}
          <div className="flex-1 min-w-0 w-full">

            {filteredProducts.length === 0 ? (
              /* Editorial Empty State */
              <div className="max-w-xl mx-auto text-center py-20 sm:py-32 animate-fade-up bg-cream/50 rounded-[2rem] border border-border2/50 p-8 sm:p-16 mt-8">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-sand border border-border2 flex items-center justify-center text-taupe">
                  <svg className="w-10 h-10 stroke-current fill-none" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl text-espresso tracking-tight font-normal mb-4">
                  {isArabic ? 'لم يتم العثور على فساتين' : 'No Dresses Found'}
                </h2>
                <p className="font-sans text-sm sm:text-base text-mocha leading-relaxed max-w-md mx-auto mb-10">
                  {isArabic
                    ? 'جربي تعديل خيارات التصفية أو استكشفي مجموعتنا الملكية الكاملة بدون قيود.'
                    : 'Try adjusting your filters or explore our complete collection.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="btn-primary px-10 py-4 w-full sm:w-auto"
                  >
                    {isArabic ? 'مسح كافة الفلاتر' : 'Clear Filters'}
                  </button>
                  <Link
                    to="/"
                    className="btn-secondary py-4 px-10 w-full sm:w-auto text-center"
                  >
                    {isArabic ? 'تصفح المجموعة' : 'Browse Collection'}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Responsive Grid: Desktop 3 columns, Tablet 2 columns, Mobile 1 or 2 columns with refined gap & padding */}
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-y-16 sm:gap-y-24 gap-x-6 sm:gap-x-10 xl:gap-x-14"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                    }
                  }}
                >
                  {displayedProducts.map((item) => (
                    <motion.div key={item.id} variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                    }}>
                      <LuxuryProductCard
                        item={item}
                        isArabic={isArabic}
                        onClick={handleProductInteract}
                      />
                    </motion.div>
                  ))}
                </motion.div>
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

              <div className="flex overflow-x-auto custom-scrollbar snap-x snap-mandatory gap-4 sm:gap-6 pb-4 pe-16 sm:pe-28">
                {recentlyViewed.map((item: ProductDress) => (
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


      {/* Reusing Existing Alora Footer without modification */}
      <Footer />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Universal Slide-out Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" 
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: isArabic ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? '-100%' : '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 end-0 z-50 w-full sm:w-[420px] flex flex-col bg-cream shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-border2/60 bg-cream/98 backdrop-blur-md shrink-0">
                <span className="font-serif text-2xl text-espresso tracking-tight">
                  {isArabic ? 'تصفية وترتيب' : 'Filter & Sort'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-espresso p-2 -mr-2 hover:text-walnut cursor-pointer transition-colors"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
                {renderSidebarContent()}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-border2/60 bg-cream shrink-0 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    clearAllFilters()
                    setIsMobileFiltersOpen(false)
                  }}
                  className="w-1/3 py-4 text-center text-xs tracking-[0.2em] uppercase font-medium text-espresso border border-border2 hover:border-espresso transition-colors cursor-pointer"
                >
                  {isArabic ? 'مسح' : 'Clear'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-2/3 py-4 text-center text-xs tracking-[0.2em] uppercase font-medium bg-espresso text-cream hover:bg-ink transition-colors cursor-pointer"
                >
                  {isArabic ? `عرض ${filteredProducts.length} قطعة` : `View ${filteredProducts.length} Items`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
