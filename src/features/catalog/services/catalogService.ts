// Service for fetching catalog data and filter options from Medusa API
import { DRESSES_DATA, ProductDress } from '@/data/dressesData'
import { medusa } from '@/config/medusa'
import { CatalogFilterOptions } from '../types'

const DEFAULT_FILTER_OPTIONS: CatalogFilterOptions = {
  sortOptions: [
    { id: 'newest', label: 'Newest', labelAr: 'الأحدث وصولاً' },
    { id: 'bestsellers', label: 'Best Sellers', labelAr: 'الأكثر مبيعاً' },
    { id: 'price-asc', label: 'Price: Low to High', labelAr: 'السعر: من الأقل للأعلى' },
    { id: 'price-desc', label: 'Price: High to Low', labelAr: 'السعر: من الأعلى للأقل' },
    { id: 'featured', label: 'Featured', labelAr: 'المختارة بالأتليه' }
  ],
  categoriesList: [
    { id: 'Abayas', label: 'Abayas', labelAr: 'عبايات' },
    { id: 'Dresses', label: 'Dresses', labelAr: 'فساتين' },
    { id: 'Kaftans', label: 'Kaftans', labelAr: 'كفطان' },
    { id: 'Occasion Wear', label: 'Occasion Wear', labelAr: 'فساتين سهرة' }
  ],
  sizesList: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colorsList: [
    { name: 'Cream', labelAr: 'كريمي عاجي', hex: '#FAF9F6' },
    { name: 'Beige', labelAr: 'بيج رملي', hex: '#E6DCCA' },
    { name: 'Black', labelAr: 'أسود ليلي', hex: '#1A1A1A' },
    { name: 'Brown', labelAr: 'بني شوكولا', hex: '#5C4033' },
    { name: 'Olive', labelAr: 'زيتي زمردي', hex: '#4A5D23' },
    { name: 'White', labelAr: 'أبيض ناصع', hex: '#FFFFFF' },
    { name: 'Grey', labelAr: 'رمادي لؤلؤي', hex: '#808080' }
  ],
  fabricsList: [
    { id: 'Cotton', label: 'Cotton', labelAr: 'قطن مصري' },
    { id: 'Linen', label: 'Linen', labelAr: 'كتان طبيعي' },
    { id: 'Silk', label: 'Silk', labelAr: 'حرير خالص' },
    { id: 'Crepe', label: 'Crepe', labelAr: 'كريب ياباني' },
    { id: 'Satin', label: 'Satin', labelAr: 'ساتان حريري' }
  ],
  collectionsList: [
    { id: 'New Arrival', label: 'New Arrival', labelAr: 'وصل حديثاً' },
    { id: 'Best Seller', label: 'Best Seller', labelAr: 'الأكثر مبيعاً' },
    { id: 'Limited Edition', label: 'Limited Edition', labelAr: 'إصدار محدود' },
    { id: 'Exclusive', label: 'Exclusive', labelAr: 'حصري بالأتليه' }
  ],
  maxPriceLimit: 5000
}

export const catalogService = {
  /**
   * Fetches the full product catalog.
   * @returns Array of ProductDress
   */
  async getProducts(): Promise<ProductDress[]> {
    // Simulate network delay for future Medusa API integration
    // return new Promise((resolve) => setTimeout(() => resolve(DRESSES_DATA), 500))
    return DRESSES_DATA
  },

  /**
   * Fetches dynamic filter options (categories, collections, product attributes)
   * from the Medusa v2 backend API, falling back to curated defaults if offline or unseeded.
   */
  async getFilterOptions(): Promise<CatalogFilterOptions> {
    try {
      // 1. Fetch categories from Medusa store API
      const categoriesRes = await medusa.store.category.list().catch(() => null)
      const categories = categoriesRes?.product_categories || []

      // 2. Fetch collections from Medusa store API
      const collectionsRes = await medusa.store.collection.list().catch(() => null)
      const collections = collectionsRes?.collections || []

      // 3. Fetch products to dynamically extract sizes, colors, fabrics, availability, and max price
      const productsRes = await medusa.store.product.list({
        fields: "*variants, *options, *options.values, *tags, metadata"
      }).catch(() => null)
      const products = productsRes?.products || []

      // Map dynamic categories
      const categoriesList = categories.length > 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? categories.map((cat: any) => ({
            id: cat.id || cat.handle || cat.name,
            label: cat.name || cat.handle,
            labelAr: cat.metadata?.labelAr || cat.metadata?.name_ar || cat.name || cat.handle
          }))
        : DEFAULT_FILTER_OPTIONS.categoriesList

      // Map dynamic collections
      const collectionsList = collections.length > 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? collections.map((col: any) => ({
            id: col.id || col.handle || col.title,
            label: col.title || col.handle,
            labelAr: col.metadata?.labelAr || col.metadata?.title_ar || col.title || col.handle
          }))
        : DEFAULT_FILTER_OPTIONS.collectionsList

      // Dynamically extract Sizes and Colors from product options if available
      const sizesSet = new Set<string>()
      const colorsMap = new Map<string, { name: string; labelAr: string; hex: string }>()
      const fabricsSet = new Set<string>()
      let maxPriceLimit = DEFAULT_FILTER_OPTIONS.maxPriceLimit || 5000

      if (products.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        products.forEach((prod: any) => {
          // Check options (e.g. Size, Color)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prod.options?.forEach((opt: any) => {
            const title = opt.title?.toLowerCase() || ''
            if (title === 'size' || title === 'مقاس') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              opt.values?.forEach((val: any) => {
                if (val.value) sizesSet.add(val.value)
              })
            } else if (title === 'color' || title === 'لون') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              opt.values?.forEach((val: any) => {
                if (val.value) {
                  const name = val.value
                  if (!colorsMap.has(name)) {
                    const existing = DEFAULT_FILTER_OPTIONS.colorsList.find(c => c.name.toLowerCase() === name.toLowerCase())
                    colorsMap.set(name, existing || { name, labelAr: name, hex: '#1A1A1A' })
                  }
                }
              })
            } else if (title === 'fabric' || title === 'material' || title === 'النسيج' || title === 'القماش' || title === 'الخامة') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              opt.values?.forEach((val: any) => {
                if (val.value) fabricsSet.add(val.value)
              })
            }
          })

          // Check built-in Medusa material field
          if (prod.material) fabricsSet.add(String(prod.material))

          // Check metadata or tags for fabrics
          if (prod.metadata?.fabric) fabricsSet.add(String(prod.metadata.fabric))
          if (prod.metadata?.material) fabricsSet.add(String(prod.metadata.material))
          if (prod.tags) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prod.tags.forEach((t: any) => {
              if (t.value && t.value.startsWith('fabric:')) fabricsSet.add(t.value.replace('fabric:', ''))
            })
          }

          // Calculate max price from variants
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prod.variants?.forEach((varItem: any) => {
            if (varItem.calculated_price?.calculated_amount) {
              const price = Number(varItem.calculated_price.calculated_amount)
              if (price > maxPriceLimit) maxPriceLimit = price
            }
          })
        })
      }

      const sizesList = sizesSet.size > 0 ? Array.from(sizesSet) : DEFAULT_FILTER_OPTIONS.sizesList
      const colorsList = colorsMap.size > 0 ? Array.from(colorsMap.values()) : DEFAULT_FILTER_OPTIONS.colorsList
      
      const fabricsList = fabricsSet.size > 0
        ? Array.from(fabricsSet).map(f => {
            const existing = DEFAULT_FILTER_OPTIONS.fabricsList.find(ef => ef.id.toLowerCase() === f.toLowerCase())
            return existing || { id: f, label: f, labelAr: f }
          })
        : DEFAULT_FILTER_OPTIONS.fabricsList

      return {
        sortOptions: DEFAULT_FILTER_OPTIONS.sortOptions,
        categoriesList,
        sizesList,
        colorsList,
        fabricsList,
        collectionsList,
        maxPriceLimit
      }
    } catch (error) {
      console.warn("Failed to fetch dynamic filter options from Medusa API, using defaults:", error)
      return DEFAULT_FILTER_OPTIONS
    }
  }
}
