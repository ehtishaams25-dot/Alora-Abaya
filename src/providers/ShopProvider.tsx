import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type ProductItem } from '../features/home/types'
import { DRESSES_DATA, type ProductDress } from '../data/dressesData'

export interface CartItem extends ProductItem {
  quantity: number
  selectedColor?: string
  selectedSize?: string
  numericPrice: number
}

interface ShopContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  toggleLogin: () => void
  wishlistItems: ProductItem[]
  addToWishlist: (item: ProductItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
  cartItems: CartItem[]
  addToCart: (item: ProductItem, color?: string, size?: string) => void
  removeFromCart: (id: string, color?: string, size?: string) => void
  updateQuantity: (id: string, delta: number, color?: string, size?: string) => void
  clearCart: () => void
  subtotal: number
  shipping: number
  taxes: number
  total: number
  isCheckoutModalOpen: boolean
  openCheckoutModal: () => void
  closeCheckoutModal: () => void
  quickViewProduct: ProductDress | null
  openQuickView: (item: ProductItem) => void
  closeQuickView: () => void
  isCartDrawerOpen: boolean
  openCartDrawer: () => void
  closeCartDrawer: () => void
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

const INITIAL_WISHLIST: ProductItem[] = [
  {
    id: "bs-2",
    name: "Al-Dana Pleated Crepe Abaya",
    nameAr: "عباية الدانة كريب بكسرات أنيقة",
    price: "1,950",
    image: "https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=800&q=85",
    rating: "4.9",
    reviewsCount: "62",
    category: "Daily Modest",
    colors: ["#3B2F2F", "#B38B6D", "#1A1A1A"]
  },
  {
    id: "bs-4",
    name: "Lulwa Ivory Raw Silk Coat",
    nameAr: "معطف لولوة من الحرير الخام العاجي",
    price: "2,850",
    image: "https://images.unsplash.com/photo-1762376128087-bc29c6df08c0?auto=format&fit=crop&w=800&q=85",
    rating: "4.9",
    reviewsCount: "54",
    category: "Embroidered Silks",
    colors: ["#FAF9F6", "#B38B6D"]
  },
  {
    id: "na-1",
    name: "Royal Silk Bisht Abaya",
    nameAr: "عباية بشت ملكية من الحرير",
    price: "2,450",
    image: "https://images.unsplash.com/photo-1772474500365-c2c520545f44?auto=format&fit=crop&w=800&q=85",
    rating: "5.0",
    reviewsCount: "38",
    category: "Occasion Gowns",
    colors: ["#1A1A1A", "#3B2F2F", "#8B7355"]
  }
]

const INITIAL_CART: CartItem[] = [
  {
    id: "bs-1",
    name: "Noor Pearl-Trimmed Chiffon",
    nameAr: "عباية نور شيفون مزينة باللؤلؤ",
    price: "2,650",
    numericPrice: 2650,
    image: "https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=800&q=85",
    category: "Embroidered Silks",
    selectedColor: "Midnight Nidha",
    selectedSize: "Size 56",
    quantity: 1
  },
  {
    id: "bs-3",
    name: "Sultana Gold-Embroidered Bisht",
    nameAr: "بشت سلطانة مطرز بالذهب الملكي",
    price: "3,400",
    numericPrice: 3400,
    image: "https://images.unsplash.com/photo-1772474587292-08b3e8932acd?auto=format&fit=crop&w=800&q=85",
    category: "Occasion Gowns",
    selectedColor: "Royal Gold Zari",
    selectedSize: "Size 58",
    quantity: 1
  }
]

export function ShopProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('alora_is_logged_in')
    return saved !== null ? saved === 'true' : false
  })

  const [wishlistItems, setWishlistItems] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('alora_wishlist')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* fallback */ }
    }
    return INITIAL_WISHLIST
  })

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('alora_cart')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* fallback */ }
    }
    return INITIAL_CART
  })

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem('alora_is_logged_in', String(isLoggedIn))
  }, [isLoggedIn])

  useEffect(() => {
    localStorage.setItem('alora_wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    localStorage.setItem('alora_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev)
  }

  const addToWishlist = (item: ProductItem) => {
    setWishlistItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev
      return [item, ...prev]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some((p) => p.id === id)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0
  }

  const addToCart = (item: ProductItem, color = "Midnight Black", size = "Size 56") => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.id === item.id && ci.selectedColor === color && ci.selectedSize === size
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      }
      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          selectedColor: color,
          selectedSize: size,
          numericPrice: parsePrice(item.price)
        }
      ]
    })
    setIsCartDrawerOpen(true)
  }

  const removeFromCart = (id: string, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev.filter((ci) => {
        if (color !== undefined && size !== undefined) {
          return !(ci.id === id && ci.selectedColor === color && ci.selectedSize === size)
        }
        return ci.id !== id
      })
    )
  }

  const updateQuantity = (id: string, delta: number, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          const matches = color !== undefined && size !== undefined
            ? ci.id === id && ci.selectedColor === color && ci.selectedSize === size
            : ci.id === id
          if (matches) {
            const newQty = ci.quantity + delta
            return newQty > 0 ? { ...ci, quantity: newQty } : null
          }
          return ci
        })
        .filter((ci): ci is CartItem => ci !== null)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0)
  const shipping = subtotal > 0 ? 0 : 0 // Complimentary luxury express shipping
  const taxes = subtotal > 0 ? Math.round(subtotal * 0.15) : 0 // 15% VAT estimate
  const total = subtotal + shipping + taxes

  const openCheckoutModal = () => setIsCheckoutModalOpen(true)
  const closeCheckoutModal = () => setIsCheckoutModalOpen(false)

  const [quickViewProduct, setQuickViewProduct] = useState<ProductDress | null>(null)
  const openQuickView = (item: ProductItem) => {
    const fullProduct = DRESSES_DATA.find(p => p.id === item.id) || (item as ProductDress)
    setQuickViewProduct(fullProduct)
  }
  const closeQuickView = () => setQuickViewProduct(null)

  const openCartDrawer = () => setIsCartDrawerOpen(true)
  const closeCartDrawer = () => setIsCartDrawerOpen(false)

  return (
    <ShopContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        toggleLogin,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        taxes,
        total,
        isCheckoutModalOpen,
        openCheckoutModal,
        closeCheckoutModal,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}
