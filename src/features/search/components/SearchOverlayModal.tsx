import { useState, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { DRESSES, type ProductDress } from '../../../data/dressesData'
import { useShop } from '../../../providers/ShopProvider'

const RECENT_SEARCHES_KEY = 'alora_recent_searches'

export function SearchOverlayModal() {
  const { i18n } = useTranslation()
  const { isSearchOpen, closeSearch } = useShop()
  const navigate = useNavigate()
  const isArabic = i18n.language.startsWith('ar')

  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches on open
  useEffect(() => {
    if (isSearchOpen) {
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
        if (stored) {
          setRecentSearches(JSON.parse(stored))
        }
      } catch {
        // Fallback
      }
      // Auto focus after mount
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setActiveCategory(null)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchOpen, closeSearch])

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim()
    if (!trimmed) return
    const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6)
    setRecentSearches(updated)
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
    } catch {
      // Ignore storage errors
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    } catch {
      // Ignore
    }
  }

  const handleSelectTerm = (term: string) => {
    setQuery(term)
    saveRecentSearch(term)
  }

  const handleProductClick = (product: ProductDress) => {
    if (query.trim()) {
      saveRecentSearch(query)
    } else {
      saveRecentSearch(isArabic ? (product.nameAr || product.name) : product.name)
    }
    closeSearch()
  }

  // Trending & Category suggestions
  const trendingTermsEn = ['Royal Velvet', 'Silk Abaya', 'Midnight Noir', 'Atelier Edition', 'Embroidery', 'Linen']
  const trendingTermsAr = ['مخمل ملكي', 'عباية حرير', 'أسود ملكي', 'إصدار الأتليه', 'تطريز يدوي', 'كتان فاخر']
  const trendingTerms = isArabic ? trendingTermsAr : trendingTermsEn

  const popularCategories = [
    { labelEn: 'All', labelAr: 'الكل', value: null },
    { labelEn: 'Abayas', labelAr: 'العبايات', value: 'Abayas' },
    { labelEn: 'Occasion Wear', labelAr: 'أزياء المناسبات', value: 'Occasion Wear' },
    { labelEn: 'Kaftans', labelAr: 'القفاطين', value: 'Kaftans' },
    { labelEn: 'Dresses', labelAr: 'الفساتين', value: 'Dresses' },
  ]

  // Filter products based on search query or active category
  const results = useMemo(() => {
    if (!query.trim() && !activeCategory) {
      return []
    }
    const q = query.toLowerCase().trim()
    return DRESSES.filter((product: ProductDress) => {
      const matchCategory = !activeCategory || product.category === activeCategory || product.categoryAr === activeCategory || product.collection === activeCategory || product.tags?.includes(activeCategory)
      if (!matchCategory) return false
      if (!q) return true

      const nameMatch = product.name.toLowerCase().includes(q) || (product.nameAr && product.nameAr.toLowerCase().includes(q))
      const descMatch = product.description.toLowerCase().includes(q) || (product.descriptionAr && product.descriptionAr.toLowerCase().includes(q))
      const tagMatch = product.tags?.some((tStr: string) => tStr.toLowerCase().includes(q))
      const catMatch = product.category?.toLowerCase().includes(q) || product.categoryAr?.toLowerCase().includes(q) || product.collection?.toLowerCase().includes(q)
      const colorMatch = product.colorNames?.some(c => c.toLowerCase().includes(q)) || product.colorNamesAr?.some(c => c.toLowerCase().includes(q))
      const fabricMatch = product.fabric?.toLowerCase().includes(q) || product.fabricAr?.toLowerCase().includes(q)

      return nameMatch || descMatch || tagMatch || catMatch || colorMatch || fabricMatch
    })
  }, [query, activeCategory])

  // Autocomplete suggestions while typing
  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    const set = new Set<string>()
    DRESSES.forEach((product: ProductDress) => {
      const name = isArabic ? (product.nameAr || product.name) : product.name
      if (name.toLowerCase().includes(q)) set.add(name)
      product.tags?.forEach((tag: string) => {
        if (tag.toLowerCase().includes(q)) set.add(tag)
      })
      if (product.category && product.category.toLowerCase().includes(q)) set.add(product.category)
      product.colorNames?.forEach(color => {
        if (color.toLowerCase().includes(q)) set.add(color)
      })
      if (product.fabric && product.fabric.toLowerCase().includes(q)) set.add(product.fabric)
    })
    return Array.from(set).slice(0, 5)
  }, [query, isArabic])

  if (!isSearchOpen) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col bg-sand/98 backdrop-blur-2xl animate-fade-in overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Search Bar Header */}
      <div className="border-b border-border2/80 bg-cream/70 py-6 px-4 sm:px-8 lg:px-16 shrink-0 shadow-sm">
        <div className="container-layali flex items-center justify-between gap-4 max-w-6xl mx-auto">
          {/* Search Icon */}
          <div className="text-walnut shrink-0">
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>

          {/* Large Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                saveRecentSearch(query)
              }
            }}
            placeholder={isArabic ? 'ابحثي عن عباية، تشكيلة، قماش، أو لون...' : 'Search signature abayas, fabrics, colors, or tags...'}
            className="w-full bg-transparent border-none outline-none font-serif text-xl sm:text-2xl lg:text-3xl text-espresso placeholder:text-taupe/60 placeholder:font-sans placeholder:text-lg sm:placeholder:text-xl"
          />

          {/* Clear Query Button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-2 text-taupe hover:text-espresso transition-colors text-xs uppercase tracking-wider font-sans cursor-pointer shrink-0"
            >
              {isArabic ? 'مسح' : 'CLEAR'}
            </button>
          )}

          {/* Close Search Overlay Button */}
          <button
            type="button"
            onClick={closeSearch}
            className="w-11 h-11 rounded-full border border-border2 bg-sand text-espresso hover:bg-cream hover:border-walnut transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
            aria-label="Close search"
          >
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Body (Scrollable Results & Suggestions) */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-8 px-4 sm:px-8 lg:px-16">
        <div className="container-layali max-w-6xl mx-auto space-y-10">
          
          {/* Popular Categories Filter Pills */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block mb-3">
              {isArabic ? 'تصفحي حسب الفئة' : 'POPULAR CATEGORIES'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {popularCategories.map((cat) => {
                const isActive = activeCategory === cat.value
                return (
                  <button
                    key={cat.labelEn}
                    type="button"
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-espresso text-cream border-espresso shadow-sm'
                        : 'bg-sand text-mocha border-border2 hover:border-walnut hover:text-espresso'
                    }`}
                  >
                    {isArabic ? cat.labelAr : cat.labelEn}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Autocomplete Suggestions while typing */}
          {query.trim() && suggestions.length > 0 && (
            <div className="bg-cream/60 border border-border2 rounded-2xl p-4 sm:p-6 animate-fade-in">
              <span className="text-[10px] uppercase tracking-[0.22em] text-taupe block mb-3 font-medium">
                {isArabic ? 'مقترحات البحث المتطابقة' : 'SUGGESTIONS'}
              </span>
              <ul className="divide-y divide-border2/60">
                {suggestions.map((item, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => handleSelectTerm(item)}
                      className="w-full py-2.5 flex items-center justify-between text-left rtl:text-right text-sm sm:text-base text-espresso hover:text-walnut transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-taupe stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <span>{item}</span>
                      </span>
                      <span className="text-xs text-taupe uppercase tracking-widest">{isArabic ? 'اختيار' : 'Select'}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recent & Trending Searches (Only show when not typing query and no category filter) */}
          {!query.trim() && !activeCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Recent Searches */}
              <div className="bg-cream/40 border border-border2/80 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium">
                    {isArabic ? 'عمليات البحث السابقة' : 'RECENT SEARCHES'}
                  </span>
                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-taupe hover:text-espresso underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      {isArabic ? 'مسح الكل' : 'Clear All'}
                    </button>
                  )}
                </div>

                {recentSearches.length === 0 ? (
                  <p className="text-xs sm:text-sm text-mocha/70 italic py-4">
                    {isArabic ? 'لا توجد عمليات بحث سابقة حتى الآن.' : 'No recent searches yet.'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectTerm(term)}
                        className="px-3.5 py-2 rounded-xl bg-sand border border-border2 text-xs text-espresso hover:border-walnut hover:bg-cream transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-taupe stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Trending Searches */}
              <div className="bg-cream/40 border border-border2/80 rounded-3xl p-6 sm:p-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-walnut font-medium block mb-4">
                  {isArabic ? 'الأكثر طلباً هذا الأسبوع' : 'TRENDING ATELIER SEARCHES'}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {trendingTerms.map((term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectTerm(term)}
                      className="px-4 py-2.5 rounded-xl bg-espresso text-cream text-xs tracking-wider font-medium hover:bg-ink transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span className="text-walnut font-bold">#</span>
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results / No Results Section */}
          {(query.trim() || activeCategory) && (
            <div className="pt-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-border2 pb-4 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl text-espresso">
                  {isArabic ? 'نتائج البحث' : 'Search Results'}
                  <span className="text-sm font-sans font-normal text-mocha ms-2">
                    ({results.length} {isArabic ? 'قطعة' : results.length === 1 ? 'piece' : 'pieces'})
                  </span>
                </h3>
              </div>

              {results.length === 0 ? (
                /* No Results State */
                <div className="text-center py-16 sm:py-24 bg-cream/30 border border-border2 rounded-3xl p-8 max-w-2xl mx-auto space-y-5">
                  <div className="w-16 h-16 rounded-full bg-sand border border-border2 text-walnut mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 stroke-current fill-none" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-2xl text-espresso">
                    {isArabic ? 'لم يتم العثور على أي قطع مطابقة' : 'No matching pieces found'}
                  </h4>
                  <p className="text-sm text-mocha leading-relaxed max-w-md mx-auto">
                    {isArabic
                      ? 'جربي البحث باستخدام كلمات مختلفة أو تصفحي أحدث وصولات الأتليه الفاخرة.'
                      : 'Try searching with simpler terms, checking your spelling, or explore our signature collections below.'}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('')
                        setActiveCategory(null)
                      }}
                      className="px-6 py-3 rounded-full bg-espresso text-cream text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors cursor-pointer"
                    >
                      {isArabic ? 'مسح الفلاتر وإظهار الكل' : 'Clear Filters & Show All'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeSearch()
                        navigate('/dresses')
                      }}
                      className="px-6 py-3 rounded-full border border-espresso text-espresso text-xs uppercase tracking-widest font-medium hover:bg-cream transition-colors cursor-pointer"
                    >
                      {isArabic ? 'عرض كل العبايات' : 'Browse All Abayas'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Results Grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {results.map((product: ProductDress) => {
                    const title = isArabic ? (product.nameAr || product.name) : product.name
                    return (
                      <Link
                        key={product.id}
                        to={`/dresses/${product.id}`}
                        onClick={() => handleProductClick(product)}
                        className="group bg-cream/50 rounded-2xl overflow-hidden border border-border2/60 hover:border-walnut transition-all duration-500 flex flex-col"
                      >
                        <div className="aspect-[3/4] overflow-hidden relative bg-sand">
                          <img
                            src={product.image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {product.badge && (
                            <span className="absolute top-3 start-3 bg-espresso/90 backdrop-blur-md text-cream text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-walnut block mb-1">
                              {isArabic ? product.categoryAr || product.category : product.category}
                            </span>
                            <h4 className="font-serif text-base text-espresso font-normal tracking-tight group-hover:text-walnut transition-colors line-clamp-1">
                              {title}
                            </h4>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border2/60 flex items-center justify-between">
                            <span className="text-xs text-espresso font-semibold">
                              {product.price} <span className="text-[10px] font-normal text-mocha">SAR</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-taupe underline underline-offset-4 group-hover:text-espresso transition-colors">
                              {isArabic ? 'عرض الأتليه ←' : 'View →'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
