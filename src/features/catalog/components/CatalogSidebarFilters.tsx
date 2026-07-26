import { useState } from 'react'
import { TFunction } from 'i18next'
import { DRESSES_DATA } from '@/data/dressesData'
import { CatalogFilterOptions } from '../types'

interface CatalogSidebarFiltersProps {
  isArabic: boolean
  t: TFunction
  activeFilterCount: number
  clearAllFilters: () => void
  sortBy: string
  setSortBy: (val: string) => void
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  selectedSizes: string[]
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>
  selectedColors: string[]
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>
  maxPrice: number
  setMaxPrice: (val: number) => void
  selectedFabrics: string[]
  setSelectedFabrics: React.Dispatch<React.SetStateAction<string[]>>
  selectedCollections: string[]
  setSelectedCollections: React.Dispatch<React.SetStateAction<string[]>>
  toggleArrayItem: (setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => void
  filterOptions?: CatalogFilterOptions
  isFilterOptionsLoading?: boolean
}

export function CatalogSidebarFilters({
  isArabic,
  t,
  activeFilterCount,
  clearAllFilters,
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  maxPrice,
  setMaxPrice,
  selectedFabrics,
  setSelectedFabrics,
  selectedCollections,
  setSelectedCollections,
  toggleArrayItem,
  filterOptions,
  isFilterOptionsLoading,
}: CatalogSidebarFiltersProps) {
  // Helper to safely get bilingual labels as string for React children
  const getBilingualLabel = (item: { label: string; labelAr?: string }, arabic: boolean): string => {
    return (arabic && item.labelAr) ? String(item.labelAr) : String(item.label)
  }

  // Accordion Sections Open/Closed States (Primary filters open by default, secondary closed to prevent screen overflow)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sort: true,
    category: true,
    size: true,
    color: false,
    price: false,
    fabric: false,
    collection: false,
  })

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }))
  }

  const isAllOpen = Object.values(openSections).every(Boolean)
  const toggleAllSections = () => {
    const nextState = !isAllOpen
    setOpenSections({
      sort: nextState,
      category: nextState,
      size: nextState,
      color: nextState,
      price: nextState,
      fabric: nextState,
      collection: nextState,
    })
  }

  const defaultSortOptions = [
    { id: 'newest', label: isArabic ? 'الأحدث وصولاً' : 'Newest' },
    { id: 'bestsellers', label: isArabic ? 'الأكثر مبيعاً' : 'Best Sellers' },
    { id: 'price-asc', label: isArabic ? 'السعر: من الأقل للأعلى' : 'Price: Low to High' },
    { id: 'price-desc', label: isArabic ? 'السعر: من الأعلى للأقل' : 'Price: High to Low' },
    { id: 'featured', label: isArabic ? 'المختارة بالأتليه' : 'Featured' }
  ]

  const defaultCategoriesList = [
    { id: 'Abayas', label: isArabic ? 'عبايات' : 'Abayas' },
    { id: 'Dresses', label: isArabic ? 'فساتين' : 'Dresses' },
    { id: 'Kaftans', label: isArabic ? 'كفطان' : 'Kaftans' },
    { id: 'Occasion Wear', label: isArabic ? 'فساتين سهرة' : 'Occasion Wear' }
  ]

  const defaultSizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const defaultColorsList = [
    { name: 'Cream', labelAr: 'كريمي عاجي', hex: '#FAF9F6' },
    { name: 'Beige', labelAr: 'بيج رملي', hex: '#E6DCCA' },
    { name: 'Black', labelAr: 'أسود ليلي', hex: '#1A1A1A' },
    { name: 'Brown', labelAr: 'بني شوكولا', hex: '#5C4033' },
    { name: 'Olive', labelAr: 'زيتي زمردي', hex: '#4A5D23' },
    { name: 'White', labelAr: 'أبيض ناصع', hex: '#FFFFFF' },
    { name: 'Grey', labelAr: 'رمادي لؤلؤي', hex: '#808080' }
  ]

  const defaultFabricsList = [
    { id: 'Cotton', label: isArabic ? 'قطن مصري' : 'Cotton' },
    { id: 'Linen', label: isArabic ? 'كتان طبيعي' : 'Linen' },
    { id: 'Silk', label: isArabic ? 'حرير خالص' : 'Silk' },
    { id: 'Crepe', label: isArabic ? 'كريب ياباني' : 'Crepe' },
    { id: 'Satin', label: isArabic ? 'ساتان حريري' : 'Satin' }
  ]

  const defaultCollectionsList = [
    { id: 'New Arrival', label: isArabic ? 'وصل حديثاً' : 'New Arrival' },
    { id: 'Best Seller', label: isArabic ? 'الأكثر مبيعاً' : 'Best Seller' },
    { id: 'Limited Edition', label: isArabic ? 'إصدار محدود' : 'Limited Edition' },
    { id: 'Exclusive', label: isArabic ? 'حصري بالأتليه' : 'Exclusive' }
  ]

  const sortOptions = filterOptions?.sortOptions || defaultSortOptions
  const categoriesList = filterOptions?.categoriesList || defaultCategoriesList
  const sizesList = filterOptions?.sizesList || defaultSizesList
  const colorsList = filterOptions?.colorsList || defaultColorsList
  const fabricsList = filterOptions?.fabricsList || defaultFabricsList
  const collectionsList = filterOptions?.collectionsList || defaultCollectionsList
  const maxPriceLimit = filterOptions?.maxPriceLimit || 5000


  return (
    <div className="flex flex-col text-sm font-sans select-none pe-2">
      {/* Quick Actions Header: Toggle All & Clear All */}
      <div className="pb-3 mb-3 border-b border-border2 flex items-center justify-between">
        <button
          type="button"
          onClick={toggleAllSections}
          className="text-xs text-mocha hover:text-espresso font-medium transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>{isArabic ? (isAllOpen ? 'طي كافة الخيارات −' : 'توسيع كافة الخيارات +') : (isAllOpen ? 'Collapse All −' : 'Expand All +')}</span>
        </button>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-taupe hover:text-espresso underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            {isArabic ? `مسح الكل (${activeFilterCount})` : `Clear All (${activeFilterCount})`}
          </button>
        )}
      </div>

      {/* Dynamic filter loading indicator */}
      {isFilterOptionsLoading && (
        <div className="pb-3 mb-3 border-b border-border2 flex items-center gap-2 text-xs text-mocha animate-pulse">
          <span className="w-2 h-2 rounded-full bg-espresso animate-ping inline-block" />
          <span>{isArabic ? 'جاري تحميل الخيارات المتطورة...' : 'Loading dynamic filters...'}</span>
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
              const label = getBilingualLabel(opt, isArabic)
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
                  <span className={checked ? 'text-espresso font-medium' : ''}>{label}</span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 1. Category Section */}
      <div className="border-b border-border2/60 py-4">
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
              const label = getBilingualLabel(cat, isArabic)
              const count = DRESSES_DATA.filter((p) => p.category.toLowerCase() === cat.id.toLowerCase() || p.category.toLowerCase() === cat.label.toLowerCase()).length
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
                    <span className={checked ? 'text-espresso font-medium' : ''}>{label}</span>
                  </div>
                  <span className="text-xs text-mocha/60">
                    ({count})
                  </span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 2. Size Section */}
      <div className="border-b border-border2/60 py-3">
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
      <div className="border-b border-border2/60 py-4">
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
              max={maxPriceLimit}
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-espresso bg-border2 h-1.5 rounded-lg cursor-pointer transition-all"
            />
            <div className="flex justify-between text-[11px] text-mocha">
              <span>{isArabic ? `حتى ${maxPriceLimit.toLocaleString()} ر.س` : `Up to ${maxPriceLimit.toLocaleString()} SAR`}</span>
              {maxPrice < maxPriceLimit && (
                <button
                  type="button"
                  onClick={() => setMaxPrice(maxPriceLimit)}
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
      <div className="border-b border-border2/60 py-4">
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
              const label = getBilingualLabel(fab, isArabic)
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
                    <span className={checked ? 'text-espresso font-medium' : ''}>{label}</span>
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* 6. Collection Section */}
      <div className="py-4">
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
              const label = getBilingualLabel(col, isArabic)
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
                    <span className={checked ? 'text-espresso font-medium' : ''}>{label}</span>
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
