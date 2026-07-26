import { TFunction } from 'i18next'
import { CatalogSidebarFilters } from './CatalogSidebarFilters'
import { CatalogFilterOptions } from '../types'

interface CatalogMobileFiltersProps {
  isArabic: boolean
  t: TFunction
  isOpen: boolean
  onClose: () => void
  filteredCount: number
  // Pass through all sidebar filter props
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

export function CatalogMobileFilters(props: CatalogMobileFiltersProps) {
  if (!props.isOpen) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-sand animate-fade-up overflow-hidden">
      {/* Bottom Sheet Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border2 bg-sand/98 backdrop-blur-md shrink-0">
        <span className="font-serif text-xl text-espresso">
          {props.isArabic ? 'تصفية وترتيب العبايات' : 'Filter & Sort'}
        </span>
        <button
          type="button"
          onClick={props.onClose}
          className="text-espresso p-2 hover:text-walnut cursor-pointer"
          aria-label="Close filters"
        >
          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Bottom Sheet Content (Scrollable with Sort By right at top!) */}
      <div data-lenis-prevent="true" className="flex-1 overflow-y-auto px-6 py-6">

        <CatalogSidebarFilters
          isArabic={props.isArabic}
          t={props.t}
          activeFilterCount={props.activeFilterCount}
          clearAllFilters={props.clearAllFilters}
          sortBy={props.sortBy}
          setSortBy={props.setSortBy}
          selectedCategories={props.selectedCategories}
          setSelectedCategories={props.setSelectedCategories}
          selectedSizes={props.selectedSizes}
          setSelectedSizes={props.setSelectedSizes}
          selectedColors={props.selectedColors}
          setSelectedColors={props.setSelectedColors}
          maxPrice={props.maxPrice}
          setMaxPrice={props.setMaxPrice}
          selectedFabrics={props.selectedFabrics}
          setSelectedFabrics={props.setSelectedFabrics}
          selectedCollections={props.selectedCollections}
          setSelectedCollections={props.setSelectedCollections}
          toggleArrayItem={props.toggleArrayItem}
          filterOptions={props.filterOptions}
          isFilterOptionsLoading={props.isFilterOptionsLoading}
        />
      </div>

      {/* Bottom Sheet Footer Actions */}
      <div className="p-6 border-t border-border2 bg-cream/90 backdrop-blur-md shrink-0 flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            props.clearAllFilters()
            props.onClose()
          }}
          className="btn-secondary py-3.5 px-6 flex-1 text-center text-xs tracking-wider"
        >
          {props.isArabic ? 'مسح الفلاتر' : 'Clear Filters'}
        </button>
        <button
          type="button"
          onClick={props.onClose}
          className="btn-primary py-3.5 px-8 flex-1 text-center text-xs tracking-wider"
        >
          {props.isArabic ? `عرض (${props.filteredCount}) قطعة` : `Show (${props.filteredCount}) Pieces`}
        </button>
      </div>
    </div>
  )
}
