export interface FilterState {
  categories: string[]
  sizes: string[]
  colors: string[]
  maxPrice: number
  fabrics: string[]
  collections: string[]
}

export interface CatalogFilterOptions {
  sortOptions: { id: string; label: string; labelAr?: string }[]
  categoriesList: { id: string; label: string; labelAr?: string }[]
  sizesList: string[]
  colorsList: { name: string; labelAr: string; hex: string }[]
  fabricsList: { id: string; label: string; labelAr?: string }[]
  collectionsList: { id: string; label: string; labelAr?: string }[]
  maxPriceLimit?: number
}

