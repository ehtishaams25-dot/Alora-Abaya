import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DRESSES_DATA } from '@/data/dressesData'
import { catalogService } from '../services/catalogService'

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read initial query params if user clicked a specific category from home page
  const initialCategoryParam = searchParams.get('category') || ''

  // Fetch dynamic filter options from Medusa backend API
  const { data: filterOptions, isLoading: isFilterOptionsLoading } = useQuery({
    queryKey: ['catalog-filter-options'],
    queryFn: () => catalogService.getFilterOptions(),
    staleTime: 5 * 60 * 1000,
  })

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategoryParam ? [initialCategoryParam] : []
  )
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(5000)
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])

  // Sort State: 'newest' | 'bestsellers' | 'price-asc' | 'price-desc' | 'featured'
  const [sortBy, setSortBy] = useState<string>('newest')

  // Pagination / Load More State
  const [visibleCount, setVisibleCount] = useState<number>(12)

  // Sync state with search params if category changes externally
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat])
    }
  }, [searchParams, selectedCategories])

  // Sync initial maxPrice limit when dynamic filter options load
  useEffect(() => {
    if (filterOptions?.maxPriceLimit && maxPrice === 5000) {
      setMaxPrice(filterOptions.maxPriceLimit)
    }
  }, [filterOptions, maxPrice])

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
    setMaxPrice(filterOptions?.maxPriceLimit || 5000)
    setSelectedFabrics([])
    setSelectedCollections([])
    setSearchParams({})
  }

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
  }

  const activeFilterCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    selectedFabrics.length +
    selectedCollections.length +
    (maxPrice < (filterOptions?.maxPriceLimit || 5000) ? 1 : 0)

  return {
    // State
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
    sortBy,
    setSortBy,
    
    // Computed
    filteredProducts,
    displayedProducts,
    hasMore,
    activeFilterCount,
    filterOptions,
    isFilterOptionsLoading,
    
    // Actions
    handleLoadMore,
    clearAllFilters,
    toggleArrayItem,
  }
}
